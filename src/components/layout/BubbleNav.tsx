'use client'

import React, { useEffect, useState, useRef, useCallback } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Logo } from '../ui/Logo'
import { MobileMenu } from './MobileMenu'

const bubbleNavLinks = [
  { label: 'Accueil', href: '/' },
  { label: 'À propos', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Projets', href: '/projects' },
  { label: 'Équipe', href: '/team' },
  { label: 'Sparklearn', href: '/sparklearn' },
  { label: 'Contact', href: '/contact' },
]

export function BubbleNav() {
  const pathname = usePathname()
  const [visible, setVisible] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [collapsed, setCollapsed] = useState(false)
  const [hovered, setHovered] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const lastScrollY = useRef(0)
  const ticking = useRef(false)
  const collapseTimerRef = useRef<NodeJS.Timeout | null>(null)
  const navRef = useRef<HTMLDivElement>(null)

  const isActive = (path: string) => {
    if (path === '/' && pathname === '/') return true
    if (path !== '/' && pathname?.startsWith(path)) return true
    return false
  }

  const handleScroll = useCallback(() => {
    if (ticking.current) return
    ticking.current = true

    requestAnimationFrame(() => {
      const scrollY = window.scrollY
      const shouldShow = scrollY > 150

      if (shouldShow !== visible) {
        setVisible(shouldShow)
        if (shouldShow && !mounted) {
          setMounted(true)
        }
      }

      lastScrollY.current = scrollY
      ticking.current = false
    })
  }, [visible, mounted])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  // Auto-collapse desktop after 3s when visible and not hovered
  useEffect(() => {
    if (collapseTimerRef.current) {
      clearTimeout(collapseTimerRef.current)
      collapseTimerRef.current = null
    }

    if (visible && !hovered) {
      collapseTimerRef.current = setTimeout(() => {
        setCollapsed(true)
      }, 3000)
    }

    return () => {
      if (collapseTimerRef.current) {
        clearTimeout(collapseTimerRef.current)
      }
    }
  }, [visible, hovered])

  // Reset collapsed state when navbar hides
  useEffect(() => {
    if (!visible) {
      setCollapsed(false)
    }
  }, [visible])

  // Close mobile nav on route change
  useEffect(() => {
    setMobileMenuOpen(false)
  }, [pathname])

  const handleMouseEnter = () => {
    setHovered(true)
    setCollapsed(false)
  }

  const handleMouseLeave = () => {
    setHovered(false)
    if (collapseTimerRef.current) {
      clearTimeout(collapseTimerRef.current)
    }
    collapseTimerRef.current = setTimeout(() => {
      setCollapsed(true)
    }, 3000)
  }

  // Whether desktop shows expanded content
  const isExpanded = !collapsed || hovered

  return (
    <>
      {/* ═══════════════════════════════════════════════════════════
          DESKTOP BUBBLE NAVBAR (≥ 1280px / xl) — 100% UNTOUCHED
          ═══════════════════════════════════════════════════════════ */}
      {mounted && (
        <div
          className={`fixed top-5 inset-x-0 z-[100] hidden xl:flex justify-center pointer-events-none ${
            visible ? 'bubble-nav-enter' : 'bubble-nav-exit'
          }`}
          onAnimationEnd={() => {
            if (!visible) setMounted(visible || lastScrollY.current > 500)
          }}
        >
          <div
            ref={navRef}
            className="pointer-events-auto"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <nav
              className="flex items-center rounded-full overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
              style={{
                background: 'rgba(10, 10, 12, 0.72)',
                backdropFilter: 'blur(24px) saturate(180%)',
                WebkitBackdropFilter: 'blur(24px) saturate(180%)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                boxShadow: collapsed && !hovered
                  ? '0 4px 20px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(235, 70, 4, 0.15), 0 0 20px rgba(235, 70, 4, 0.08)'
                  : '0 8px 32px rgba(0, 0, 0, 0.4), 0 2px 8px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
                padding: isExpanded ? '8px' : '6px',
              }}
            >
              {/* Logo pill - always visible */}
              <Link
                href="/"
                className={`flex items-center justify-center rounded-full transition-all duration-500 shrink-0 ${
                  isExpanded
                    ? 'w-9 h-9 bg-white/[0.06] hover:bg-white/[0.12]'
                    : 'w-10 h-10 bg-gradient-to-br from-[#EB4604]/20 to-[#FFB901]/10 hover:from-[#EB4604]/30 hover:to-[#FFB901]/20'
                }`}
                aria-label="Accueil"
              >
                <Logo variant="symbol" className={`transition-all duration-500 ${isExpanded ? 'w-5 h-5' : 'w-6 h-6'}`} />
              </Link>

              {/* Expandable content */}
              <div
                className="flex items-center transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] overflow-hidden"
                style={{
                  maxWidth: isExpanded ? '800px' : '0px',
                  opacity: isExpanded ? 1 : 0,
                  marginLeft: isExpanded ? '4px' : '0px',
                }}
              >
                {/* Nav links */}
                {bubbleNavLinks.map((link) => {
                  const active = isActive(link.href)
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`relative px-3.5 py-2 rounded-full text-[13px] font-medium transition-all duration-300 whitespace-nowrap ${
                        active
                          ? 'text-white bg-[#EB4604] shadow-[0_2px_12px_rgba(235,70,4,0.35)]'
                          : 'text-neutral-400 hover:text-white hover:bg-white/[0.08]'
                      }`}
                    >
                      {link.label}
                    </Link>
                  )
                })}

                {/* CTA Button */}
                <Link
                  href="/contact"
                  className="ml-1 flex items-center gap-2 px-4 py-2 rounded-full bg-white text-[#070709] text-[13px] font-semibold hover:bg-neutral-200 transition-all duration-200 shrink-0 group whitespace-nowrap"
                >
                  <span>Démarrer</span>
                  <svg
                    className="w-3 h-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M7 17L17 7M17 7H7M17 7V17"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Link>
              </div>
            </nav>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════
          MOBILE & TABLET BUBBLE NAVBAR (< 1280px / xl)
          Fixed Top-Right Scrolled Burger Menu Button with Pulsing Dot
          Appears ONLY when scrolled (scrollY > 200), never overlaps top header
          ═══════════════════════════════════════════════════════════ */}
      <div
        className={`fixed top-4 right-4 sm:top-5 sm:right-6 z-[100] xl:hidden transition-all duration-300 ${
          visible
            ? 'opacity-100 scale-100 pointer-events-auto'
            : 'opacity-0 scale-90 pointer-events-none'
        }`}
      >
        <button
          onClick={() => setMobileMenuOpen(true)}
          aria-label="Ouvrir le menu de navigation"
          className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-full flex flex-col items-center justify-center gap-1.5 transition-all duration-300 active:scale-95 shadow-2xl cursor-pointer group"
          style={{
            background: 'rgba(10, 10, 12, 0.88)',
            backdropFilter: 'blur(24px) saturate(190%)',
            WebkitBackdropFilter: 'blur(24px) saturate(190%)',
            border: '1px solid rgba(255, 255, 255, 0.14)',
            boxShadow: '0 8px 30px rgba(0, 0, 0, 0.45), 0 0 0 1px rgba(235, 70, 4, 0.25), 0 0 20px rgba(235, 70, 4, 0.15)',
          }}
        >
          {/* 3 Burger Bars */}
          <span className="w-5 h-[2px] bg-white rounded-full transition-all duration-300 group-hover:bg-[#EB4604]" />
          <span className="w-5 h-[2px] bg-white rounded-full transition-all duration-300 group-hover:bg-[#EB4604]" />
          <span className="w-3.5 h-[2px] bg-white/70 self-start ml-3 rounded-full transition-all duration-300 group-hover:bg-[#EB4604]" />
        </button>
      </div>

      {/* Floating Bento Island Navigation Sheet Overlay */}
      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
    </>
  )
}
