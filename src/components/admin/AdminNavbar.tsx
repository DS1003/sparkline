'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { LayoutDashboard, Inbox, Mail, ExternalLink, LogOut, ShieldCheck } from 'lucide-react'

interface AdminNavbarProps {
  userName: string
  userEmail: string
}

export function AdminNavbar({ userName, userEmail }: AdminNavbarProps) {
  const pathname = usePathname()
  const router = useRouter()
  const [loggingOut, setLoggingOut] = React.useState(false)

  // Don't render header on login page
  if (pathname === '/admin/login') return null

  const handleLogout = async () => {
    if (loggingOut) return
    setLoggingOut(true)
    try {
      await fetch('/api/admin/logout', { method: 'POST' })
      router.push('/admin/login')
      router.refresh()
    } catch {
      router.push('/admin/login')
    }
  }

  const navItems = [
    { label: 'Vue d’ensemble', href: '/admin', icon: LayoutDashboard },
    { label: 'Leads & Devis', href: '/admin/leads', icon: Inbox },
    { label: 'Abonnés Newsletter', href: '/admin/newsletter', icon: Mail },
  ]

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-neutral-200/80 px-4 sm:px-8 py-3 flex items-center justify-between shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
      {/* Left: Brand + Console badge */}
      <div className="flex items-center gap-4 sm:gap-6">
        <Link href="/admin" className="flex items-center gap-3 group">
          <div className="relative h-7 w-32 sm:w-36 flex items-center">
            <Image
              src="/images/brand/sparkline-logo-dark.svg"
              alt="SPARKLINE"
              width={140}
              height={32}
              priority
              className="object-contain h-6 w-auto"
            />
          </div>
          <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#EB4604]/10 border border-[#EB4604]/20 text-[10px] font-mono font-bold tracking-wider uppercase text-[#EB4604]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#EB4604] animate-pulse" />
            Console Admin
          </span>
        </Link>

        {/* Navigation Tabs */}
        <nav className="hidden md:flex items-center gap-1.5 pl-5 border-l border-neutral-200">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-[#0A0A0A] text-white shadow-sm'
                    : 'text-neutral-600 hover:text-[#0A0A0A] hover:bg-neutral-100'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#EB4604]' : 'text-neutral-500'}`} />
                <span>{item.label}</span>
              </Link>
            )
          })}
        </nav>
      </div>

      {/* Right: Live pill + User profile + Logout */}
      <div className="flex items-center gap-3 sm:gap-4">
        <Link
          href="/"
          target="_blank"
          className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-neutral-100 hover:bg-neutral-200/80 border border-neutral-200 text-xs font-medium text-neutral-700 hover:text-black transition-colors"
        >
          <span>Voir le site</span>
          <ExternalLink className="w-3 h-3 text-neutral-500" />
        </Link>

        <div className="hidden lg:flex items-center gap-2.5 pl-3 border-l border-neutral-200">
          <div className="w-7 h-7 rounded-full bg-[#EB4604]/10 border border-[#EB4604]/20 flex items-center justify-center text-xs font-bold text-[#EB4604]">
            {userName.charAt(0).toUpperCase()}
          </div>
          <div className="flex flex-col text-left">
            <span className="text-xs font-semibold text-[#0A0A0A] leading-tight flex items-center gap-1">
              {userName}
              <ShieldCheck className="w-3 h-3 text-[#EB4604]" />
            </span>
            <span className="text-[10px] font-mono text-neutral-500 truncate max-w-[140px] leading-tight">
              {userEmail}
            </span>
          </div>
        </div>

        <button
          onClick={handleLogout}
          disabled={loggingOut}
          className="px-3 py-1.5 rounded-xl bg-neutral-100 hover:bg-red-50 border border-neutral-200 hover:border-red-200 text-neutral-600 hover:text-red-600 text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
          title="Se déconnecter"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">{loggingOut ? 'Sortie...' : 'Déconnexion'}</span>
        </button>
      </div>
    </header>
  )
}
