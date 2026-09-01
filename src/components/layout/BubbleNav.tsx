'use client'

import React, { useEffect, useState, useRef, useCallback } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Logo } from '../ui/Logo'

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
  const [mobileOpen, setMobileOpen] = useState(false)
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
      const shouldShow = scrollY > 500

      if (shouldShow !== visible) {
        setVisible(shouldShow)
        if (shouldShow && !mounted) {
          setMounted(true)
        }
      }

      if (mobileOpen && Math.abs(scrollY - lastScrollY.current) > 50) {
        setMobileOpen(false)
      }

      lastScrollY.current = scrollY
      ticking.current = false
    })
  }, [visible, mounted, mobileOpen])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  // Auto-collapse after 3s when visible and not hovered
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
    setMobileOpen(false)
  }, [pathname])

  const handleMouseEnter = () => {
    setHovered(true)
    setCollapsed(false)
  }

  const handleMouseLeave = () => {
    setHovered(false)
    // Restart collapse timer
    if (collapseTimerRef.current) {
      clearTimeout(collapseTimerRef.current)
    }
    collapseTimerRef.current = setTimeout(() => {
      setCollapsed(true)
    }, 3000)
  }

  // Whether to show expanded content
  const isExpanded = !collapsed || hovered

  if (!mounted) return null

  return (
    <>
      {/* Desktop Bubble Nav */}
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

      {/* Mobile Bubble Nav */}
      <div
        className={`fixed top-5 inset-x-0 z-[100] xl:hidden flex justify-center pointer-events-none ${
          visible ? 'bubble-nav-enter' : 'bubble-nav-exit'
        }`}
        onAnimationEnd={() => {
          if (!visible) setMounted(visible || lastScrollY.current > 500)
        }}
      >
        <div className="pointer-events-auto flex flex-col items-center">
          <div
            className="flex items-center gap-3 px-4 py-2.5 rounded-full"
            style={{
              background: 'rgba(10, 10, 12, 0.78)',
              backdropFilter: 'blur(24px) saturate(180%)',
              WebkitBackdropFilter: 'blur(24px) saturate(180%)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), 0 2px 8px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
            }}
          >
            <Link href="/" className="flex items-center shrink-0">
              <Logo variant="white" size="sm" className="!h-6" />
            </Link>

            <div className="w-px h-5 bg-white/10" />

            {/* Top 3 quick links on mobile */}
            <div className="flex items-center gap-1">
              {bubbleNavLinks.slice(0, 3).map((link) => {
                const active = isActive(link.href)
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`px-2.5 py-1.5 rounded-full text-[11px] font-medium transition-all duration-200 ${
                      active
                        ? 'text-white bg-[#EB4604]'
                        : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    {link.label}
                  </Link>
                )
              })}
            </div>

            {/* Hamburger to expand full menu */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="w-8 h-8 rounded-full bg-white/[0.08] hover:bg-white/[0.15] flex items-center justify-center transition-colors ml-1 shrink-0"
              aria-label="Menu"
            >
              <div className="flex flex-col items-center justify-center gap-[3px]">
                <span
                  className={`w-3.5 h-[1.5px] bg-white rounded-full transition-transform duration-300 ${
                    mobileOpen ? 'rotate-45 translate-y-[2.5px]' : ''
                  }`}
                />
                <span
                  className={`w-3.5 h-[1.5px] bg-white rounded-full transition-all duration-300 ${
                    mobileOpen ? 'opacity-0 scale-0' : 'opacity-100'
                  }`}
                />
                <span
                  className={`w-3.5 h-[1.5px] bg-white rounded-full transition-transform duration-300 ${
                    mobileOpen ? '-rotate-45 -translate-y-[2.5px]' : ''
                  }`}
                />
              </div>
            </button>
          </div>

          {/* Mobile Dropdown */}
          <div
            className={`mt-2 rounded-2xl overflow-hidden transition-all duration-400 ${
              mobileOpen
                ? 'bubble-dropdown-enter'
                : 'bubble-dropdown-exit pointer-events-none'
            }`}
            style={{
              background: 'rgba(10, 10, 12, 0.92)',
              backdropFilter: 'blur(32px) saturate(200%)',
              WebkitBackdropFilter: 'blur(32px) saturate(200%)',
              border: '1px solid rgba(255, 255, 255, 0.06)',
              boxShadow: '0 16px 48px rgba(0, 0, 0, 0.5)',
            }}
          >
            <div className="px-4 py-3 flex flex-col gap-0.5">
              {bubbleNavLinks.map((link, idx) => {
                const active = isActive(link.href)
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center justify-between px-3 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                      active
                        ? 'text-white bg-[#EB4604]/15'
                        : 'text-neutral-300 hover:text-white hover:bg-white/[0.05]'
                    }`}
                    style={{
                      animationDelay: mobileOpen ? `${idx * 40}ms` : '0ms',
                    }}
                  >
                    <div className="flex items-center gap-3">
                      {active && (
                        <span className="w-1.5 h-1.5 rounded-full bg-[#EB4604] shrink-0" />
                      )}
                      <span>{link.label}</span>
                    </div>
                    <svg
                      className="w-3.5 h-3.5 text-neutral-600"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M9 18L15 12L9 6"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </Link>
                )
              })}
            </div>

            <div className="px-4 pb-4 pt-1">
              <Link
                href="/contact"
                onClick={() => setMobileOpen(false)}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#EB4604] text-white text-sm font-semibold hover:bg-[#D43D00] transition-colors"
              >
                Démarrer un projet
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M7 17L17 7M17 7H7M17 7V17"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
