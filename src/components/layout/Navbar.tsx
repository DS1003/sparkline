'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Logo } from '../ui/Logo'
import { MobileMenu } from './MobileMenu'

const navLinks = [
  { label: 'Accueil', href: '/' },
  { label: 'À propos', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Projets', href: '/projects' },
  { label: 'Équipe', href: '/team' },
  { label: 'Sparklearn', href: '/sparklearn' },
  { label: 'Contact', href: '/contact' },
]

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  const isActive = (path: string) => {
    if (path === '/' && pathname === '/') return true
    if (path !== '/' && pathname?.startsWith(path)) return true
    return false
  }

  return (
    <>
      <nav className="w-full flex items-center justify-between py-1 sm:py-2 mb-3 sm:mb-6 lg:mb-8 relative z-30">
        {/* Official SPARKLINE Logo */}
        <Link href="/" className="flex items-center group transition-transform group-hover:opacity-95">
          <Logo variant="white" size="md" />
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden xl:flex items-center gap-7 text-sm font-medium text-neutral-300">
          {navLinks.map((link) => {
            const active = isActive(link.href)
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`transition-colors py-1 ${active ? 'text-[#EB4604] font-semibold' : 'hover:text-white'
                  }`}
              >
                {link.label}
              </Link>
            )
          })}
        </div>

        {/* Action Button & Mobile Hamburger */}
        <div className="flex items-center gap-4">
          <Link
            href="/contact"
            className="hidden sm:inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-white text-black text-xs font-semibold hover:bg-neutral-200 transition-all group shadow-md"
          >
            <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-[#EB4604] to-[#FFB901] flex items-center justify-center p-0.5">
              <Logo variant="symbol" className="w-full h-full" />
            </div>
            <span>Démarrer un projet</span>
            <svg
              className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7 17L17 7M17 7H7M17 7V17"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>

          {/* Hamburger button (44x44px accessible touch target) */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden w-11 h-11 rounded-full border border-white/15 bg-white/[0.06] hover:bg-white/10 text-white flex flex-col items-center justify-center gap-1.5 p-2.5 focus:outline-none active:scale-95 transition-transform"
            aria-label="Toggle menu"
          >
            <span
              className={`w-5 h-0.5 bg-white transition-transform duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-1' : ''
                }`}
            />
            <span
              className={`w-5 h-0.5 bg-white transition-opacity duration-300 ${mobileMenuOpen ? 'opacity-0' : 'opacity-100'
                }`}
            />
            <span
              className={`w-5 h-0.5 bg-white transition-transform duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-1' : ''
                }`}
            />
          </button>
        </div>
      </nav>

      {/* Floating Bento Island Navigation Sheet (Mobile & Tablet) */}
      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
    </>
  )
}
