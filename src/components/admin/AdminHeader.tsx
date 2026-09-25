'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import {
  Search,
  Bell,
  Mail,
  ShieldCheck,
  Menu,
  X,
  LayoutDashboard,
  Inbox,
  LogOut,
  ExternalLink,
  ChevronDown,
} from 'lucide-react'
import { LogoutModal } from './LogoutModal'

interface AdminHeaderProps {
  userName: string
  userEmail: string
  newLeadsCount?: number
}

export function AdminHeader({ userName, userEmail, newLeadsCount = 0 }: AdminHeaderProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [search, setSearch] = useState('')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const [showLogoutModal, setShowLogoutModal] = useState(false)
  const [loggingOut, setLoggingOut] = useState(false)
  const userMenuRef = React.useRef<HTMLDivElement>(null)

  // Click outside listener for user dropdown
  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false)
      }
    }
    if (userMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [userMenuOpen])

  React.useEffect(() => {
    if (mobileMenuOpen) {
      const originalBodyOverflow = document.body.style.overflow
      const originalHtmlOverflow = document.documentElement.style.overflow
      document.body.style.overflow = 'hidden'
      document.documentElement.style.overflow = 'hidden'
      return () => {
        document.body.style.overflow = originalBodyOverflow
        document.documentElement.style.overflow = originalHtmlOverflow
      }
    }
  }, [mobileMenuOpen])

  const searchInputRef = React.useRef<HTMLInputElement>(null)

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        searchInputRef.current?.focus()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (search.trim()) {
      router.push(`/admin/leads?search=${encodeURIComponent(search.trim())}`)
    }
  }

  const handleLogout = async () => {
    if (loggingOut) return
    setLoggingOut(true)
    try {
      await fetch('/api/admin/logout', { method: 'POST' })
      router.push('/admin/login')
      router.refresh()
    } catch {
      router.push('/admin/login')
    } finally {
      setLoggingOut(false)
      setShowLogoutModal(false)
    }
  }

  return (
    <>
      <header className="sticky top-0 z-20 bg-[#F4F5F7]/85 backdrop-blur-md px-3 sm:px-6 py-2.5 sm:py-3.5 flex items-center justify-between gap-2.5 sm:gap-3">
        {/* Left: Mobile Menu Toggle Button + Search Pill */}
        <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0 max-w-md">
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="md:hidden w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white border border-neutral-200/80 flex items-center justify-center text-neutral-700 hover:text-black shadow-2xs cursor-pointer shrink-0"
            title="Menu de navigation"
          >
            <Menu className="w-4 h-4" />
          </button>

          {/* Search Pill (matching reference with keyboard shortcut) */}
          <form onSubmit={handleSearchSubmit} className="relative w-full min-w-0">
            <div className="relative flex items-center">
              <div className="absolute inset-y-0 left-0 pl-3 sm:pl-3.5 flex items-center pointer-events-none text-neutral-400">
                <Search className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </div>
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Rechercher..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-8 sm:pl-10 pr-4 sm:pr-12 py-1.5 sm:py-2 rounded-full bg-white border border-neutral-200/80 text-xs text-[#0A0A0A] placeholder:text-neutral-400 focus:outline-none focus:border-[#EB4604] shadow-2xs transition-colors"
              />
              <div className="absolute inset-y-0 right-0 pr-3 hidden sm:flex items-center pointer-events-none">
                <kbd className="px-1.5 py-0.5 text-[10px] font-mono font-medium text-neutral-400 bg-neutral-100 border border-neutral-200 rounded-md">
                  ⌘K
                </kbd>
              </div>
            </div>
          </form>
        </div>

        {/* Right: Notification Pills & User Profile */}
        <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
          {/* Newsletter Quick Action (Desktop & Tablet) */}
          <button
            onClick={() => router.push('/admin/newsletter')}
            className="hidden sm:flex w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white border border-neutral-200/80 items-center justify-center text-neutral-600 hover:text-black hover:bg-neutral-50 transition-colors shadow-2xs cursor-pointer"
            title="Abonnés Newsletter"
          >
            <Mail className="w-4 h-4" />
          </button>

          {/* Notifications Bell */}
          <button
            onClick={() => router.push('/admin/leads?status=NEW')}
            className="relative w-8.5 h-8.5 sm:w-10 sm:h-10 rounded-full bg-white border border-neutral-200/80 flex items-center justify-center text-neutral-600 hover:text-black hover:bg-neutral-50 transition-colors shadow-2xs cursor-pointer"
            title="Nouveaux leads"
          >
            <Bell className="w-4 h-4" />
            {newLeadsCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-[#EB4604] text-white text-[9px] font-bold rounded-full flex items-center justify-center animate-pulse">
                {newLeadsCount}
              </span>
            )}
          </button>

          {/* User Profile Pill with Interactive Dropdown */}
          <div ref={userMenuRef} className="relative">
            <button
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              className="flex items-center gap-1.5 sm:gap-3 pl-1 sm:pl-2.5 bg-white hover:bg-neutral-50/80 border border-neutral-200/80 hover:border-neutral-300 rounded-full py-1 pr-1.5 sm:pr-3 shadow-2xs transition-all cursor-pointer group"
            >
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#0A0D14] text-white flex items-center justify-center text-xs font-bold shadow-xs shrink-0">
                {userName.charAt(0).toUpperCase()}
              </div>
              <div className="hidden sm:flex flex-col text-left">
                <span className="text-xs font-bold text-[#0A0D14] leading-tight flex items-center gap-1">
                  {userName}
                  <ShieldCheck className="w-3 h-3 text-[#EB4604]" />
                </span>
                <span className="text-[10px] font-mono text-neutral-400 leading-tight truncate max-w-[120px]">
                  {userEmail}
                </span>
              </div>
              <ChevronDown className={`w-3.5 h-3.5 text-neutral-400 transition-transform duration-200 ${userMenuOpen ? 'rotate-180 text-black' : ''}`} />
            </button>

            {/* Dropdown Menu Modal */}
            {userMenuOpen && (
              <div className="absolute right-0 top-full mt-2 w-64 max-w-[calc(100vw-24px)] bg-white rounded-2xl border border-neutral-200/90 shadow-[0_16px_40px_-10px_rgba(0,0,0,0.12)] p-2 z-50 animate-in fade-in zoom-in-95 duration-150 text-xs">
                {/* Account info header */}
                <div className="p-3 bg-neutral-50/80 rounded-xl mb-1.5 border border-neutral-100">
                  <div className="font-bold text-neutral-900 leading-tight">{userName}</div>
                  <div className="text-[11px] font-mono text-neutral-400 truncate mt-0.5">{userEmail}</div>
                  <div className="mt-2 inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#EB4604]/10 text-[#EB4604] font-mono text-[9.5px] font-bold uppercase tracking-wider">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#EB4604]" />
                    Accès Super Admin
                  </div>
                </div>

                {/* Quick Navigation Links */}
                <div className="space-y-0.5">
                  <button
                    onClick={() => {
                      setUserMenuOpen(false)
                      router.push('/admin')
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-neutral-700 hover:text-black hover:bg-neutral-100/70 transition-colors text-left cursor-pointer"
                  >
                    <LayoutDashboard className="w-4 h-4 text-neutral-400" />
                    <span>Tableau de bord</span>
                  </button>

                  <button
                    onClick={() => {
                      setUserMenuOpen(false)
                      router.push('/admin/leads')
                    }}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-neutral-700 hover:text-black hover:bg-neutral-100/70 transition-colors text-left cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5">
                      <Inbox className="w-4 h-4 text-neutral-400" />
                      <span>Leads & Devis</span>
                    </div>
                    {newLeadsCount > 0 && (
                      <span className="px-1.5 py-0.5 rounded-full bg-[#EB4604] text-white text-[9px] font-bold">
                        {newLeadsCount}
                      </span>
                    )}
                  </button>

                  <button
                    onClick={() => {
                      setUserMenuOpen(false)
                      router.push('/admin/newsletter')
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-neutral-700 hover:text-black hover:bg-neutral-100/70 transition-colors text-left cursor-pointer"
                  >
                    <Mail className="w-4 h-4 text-neutral-400" />
                    <span>Abonnés Newsletter</span>
                  </button>

                  <a
                    href="/"
                    target="_blank"
                    className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-neutral-700 hover:text-black hover:bg-neutral-100/70 transition-colors text-left cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5">
                      <ExternalLink className="w-4 h-4 text-neutral-400" />
                      <span>Voir le site public</span>
                    </div>
                    <span className="text-[10px] text-neutral-400">↗</span>
                  </a>
                </div>

                <div className="my-1.5 border-t border-neutral-100" />

                {/* Logout Action */}
                <button
                  onClick={() => {
                    setUserMenuOpen(false)
                    setShowLogoutModal(true)
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-red-600 hover:bg-red-50 transition-colors text-left cursor-pointer font-medium"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Déconnexion</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          {/* Backdrop */}
          <div
            onClick={() => setMobileMenuOpen(false)}
            className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
          />

          {/* Slide-in Menu Panel */}
          <div className="relative w-80 max-w-[85vw] bg-white h-full p-5 sm:p-6 flex flex-col justify-between shadow-2xl z-10 animate-in slide-in-from-left duration-250 ease-out">
            <div className="space-y-5">
              {/* Header */}
              <div className="flex items-center justify-between pb-3.5 border-b border-neutral-100">
                <Image
                  src="/images/brand/sparkline-logo-dark.svg"
                  alt="SPARKLINE"
                  width={130}
                  height={30}
                  className="h-6 w-auto object-contain"
                />
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-600 hover:text-black cursor-pointer"
                  title="Fermer le menu"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* User Account Info Card */}
              <div className="p-3 bg-neutral-50/90 rounded-2xl border border-neutral-100/80 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#0A0D14] text-white flex items-center justify-center text-sm font-bold shadow-xs shrink-0">
                  {userName.charAt(0).toUpperCase()}
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-bold text-neutral-900 truncate flex items-center gap-1">
                    {userName}
                    <ShieldCheck className="w-3.5 h-3.5 text-[#EB4604] shrink-0" />
                  </div>
                  <div className="text-[10.5px] font-mono text-neutral-400 truncate">{userEmail}</div>
                </div>
              </div>

              {/* Navigation Links */}
              <div className="space-y-1">
                <div className="text-[10.5px] font-mono uppercase tracking-wider text-neutral-400 font-semibold px-2 mb-1">
                  Menu
                </div>
                <nav className="space-y-1">
                  {[
                    { label: 'Dashboard', href: '/admin', icon: LayoutDashboard, badge: null },
                    {
                      label: 'Leads & Devis',
                      href: '/admin/leads',
                      icon: Inbox,
                      badge: newLeadsCount > 0 ? `${newLeadsCount}` : null,
                    },
                    { label: 'Newsletter', href: '/admin/newsletter', icon: Mail, badge: null },
                  ].map((item) => {
                    const Icon = item.icon
                    const isActive = pathname === item.href
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-sm font-medium transition-colors ${
                          isActive
                            ? 'bg-[#0A0D14] text-white shadow-xs font-semibold'
                            : 'text-neutral-700 hover:bg-neutral-100'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-[#EB4604]' : 'text-neutral-400'}`} />
                          <span>{item.label}</span>
                        </div>
                        {item.badge && (
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                              isActive ? 'bg-[#EB4604] text-white' : 'bg-[#EB4604]/10 text-[#EB4604]'
                            }`}
                          >
                            {item.badge}
                          </span>
                        )}
                      </Link>
                    )
                  })}
                </nav>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="space-y-2 pt-4 border-t border-neutral-100">
              <Link
                href="/"
                target="_blank"
                className="w-full py-2.5 px-3 rounded-2xl bg-neutral-50 hover:bg-neutral-100 border border-neutral-200/60 text-neutral-800 text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
              >
                <span>Voir le site public</span>
                <ExternalLink className="w-3.5 h-3.5 text-neutral-400" />
              </Link>
              <button
                onClick={() => {
                  setMobileMenuOpen(false)
                  setShowLogoutModal(true)
                }}
                className="w-full py-2.5 px-3 rounded-2xl bg-red-50 hover:bg-red-100/70 text-red-600 text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer transition-colors"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Déconnexion</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Logout Confirmation Modal */}
      <LogoutModal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={handleLogout}
        loading={loggingOut}
      />
    </>
  )
}
