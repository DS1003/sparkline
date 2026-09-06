'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
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
  const [hoveredPath, setHoveredPath] = useState<string | null>(null)

  const isActive = (path: string) => {
    if (path === '/' && pathname === '/') return true
    if (path !== '/' && pathname?.startsWith(path)) return true
    return false
  }

  const activeLink = navLinks.find((link) => isActive(link.href))
  const highlightedPath = hoveredPath ?? activeLink?.href ?? null

  return (
    <>
      <nav className="w-full flex items-center justify-between py-1 sm:py-2 mb-3 sm:mb-6 lg:mb-8 relative z-30">
        {/* Official SPARKLINE Logo */}
        <Link href="/" id="navbar-logo" className="flex items-center group transition-transform group-hover:opacity-95">
          <Logo variant="white" size="md" />
        </Link>

        {/* Desktop Nav Links — Sleek Floating Glassmorphic Capsule Tube */}
        <div
          onMouseLeave={() => setHoveredPath(null)}
          className="navbar-navlinks hidden xl:flex items-center gap-1 p-1.5 rounded-full bg-neutral-900/60 backdrop-blur-2xl border border-white/10 shadow-[0_8px_32px_-4px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.12)] relative"
        >
          {navLinks.map((link) => {
            const active = isActive(link.href)
            const isHighlighted = highlightedPath === link.href

            return (
              <Link
                key={link.href}
                href={link.href}
                onMouseEnter={() => setHoveredPath(link.href)}
                className={`relative px-4 py-1.5 rounded-full text-[13px] tracking-wide transition-colors duration-200 flex items-center gap-1.5 select-none ${
                  isHighlighted || active
                    ? 'text-white font-medium'
                    : 'text-neutral-400 font-medium hover:text-neutral-200'
                }`}
              >
                {/* 3D Smooth Sliding Pill (Glides inside the tube like a capsule) */}
                {isHighlighted && (
                  <motion.div
                    layoutId="navbar-sliding-pill"
                    className="absolute inset-0 rounded-full bg-white/[0.13] border border-white/15 shadow-[0_2px_10px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.25)] pointer-events-none"
                    transition={{
                      type: 'spring',
                      stiffness: 380,
                      damping: 30,
                      mass: 0.8,
                    }}
                  />
                )}

                {/* Active Indicator Spark Icon */}
                {active && (
                  <motion.span
                    layoutId="navbar-active-spark"
                    className="relative z-10 flex items-center justify-center shrink-0 text-[#EB4604] drop-shadow-[0_0_6px_rgba(235,70,4,0.85)]"
                    transition={{
                      type: 'spring',
                      stiffness: 380,
                      damping: 30,
                    }}
                  >
                    <svg viewBox="0 0 24 24" className="w-3 h-3" fill="currentColor">
                      <path d="M12 0C12 0 12 10.5 24 12C24 12 12 13.5 12 24C12 24 12 13.5 0 12C0 12 12 10.5 12 0Z" />
                    </svg>
                  </motion.span>
                )}

                <span className="relative z-10">{link.label}</span>
              </Link>
            )
          })}
        </div>

        {/* Action Button & Mobile Hamburger */}
        <div className="navbar-actions flex items-center gap-4">
          <Link
            href="/contact"
            className="hidden sm:inline-flex items-center gap-3 pl-3.5 pr-3 py-2 rounded-full bg-white text-neutral-950 text-xs font-semibold tracking-tight border border-white/90 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.35),inset_0_1px_1px_rgba(255,255,255,1),inset_0_-2px_4px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_28px_-4px_rgba(235,70,4,0.4),0_4px_16px_rgba(0,0,0,0.2)] hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 relative overflow-hidden group select-none"
          >
            {/* Specular shimmer light beam sweep on hover */}
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out pointer-events-none" />

            {/* Glowing Brand Icon Capsule */}
            <div className="relative z-10 w-6 h-6 rounded-full bg-gradient-to-tr from-[#EB4604] via-[#FF5714] to-[#FFB901] flex items-center justify-center p-1.5 shadow-sm shadow-[#EB4604]/40 group-hover:scale-105 group-hover:shadow-[0_0_12px_rgba(235,70,4,0.6)] transition-all duration-300 shrink-0">
              <Logo variant="symbol" className="w-full h-full brightness-0 invert" />
            </div>

            <span className="relative z-10 font-semibold text-neutral-900 group-hover:text-black transition-colors">
              Démarrer un projet
            </span>

            {/* Circular Arrow Badge with smooth hover inversion */}
            <span className="relative z-10 w-5.5 h-5.5 rounded-full bg-neutral-900/[0.08] flex items-center justify-center text-neutral-800 group-hover:bg-[#EB4604] group-hover:text-white transition-all duration-300 shrink-0">
              <svg
                className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7 17L17 7M17 7H7M17 7V17"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
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
