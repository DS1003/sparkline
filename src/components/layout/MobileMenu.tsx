'use client'

import React, { useEffect, useState, useCallback, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Logo } from '../ui/Logo'
import { siteConfig } from '@/config/site'

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
}

const navLinks = [
  { label: 'Accueil', href: '/' },
  { label: 'À propos', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Projets', href: '/projects' },
  { label: 'Équipe', href: '/team' },
  { label: 'Sparklearn', href: '/sparklearn' },
  { label: 'Contact', href: '/contact' },
]

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const pathname = usePathname()
  const [isClosing, setIsClosing] = useState(false)
  const isClosingRef = useRef(false)

  const isActive = (path: string) => {
    if (path === '/' && pathname === '/') return true
    if (path !== '/' && pathname?.startsWith(path)) return true
    return false
  }

  const handleClose = useCallback(() => {
    if (isClosingRef.current) return
    isClosingRef.current = true
    setIsClosing(true)
    setTimeout(() => {
      onClose()
      setIsClosing(false)
      isClosingRef.current = false
    }, 270) // matches mobile-menu-card-exit duration
  }, [onClose])

  // Reset closing flag when opened
  useEffect(() => {
    if (isOpen) {
      setIsClosing(false)
      isClosingRef.current = false
    }
  }, [isOpen])

  // Close on route change
  useEffect(() => {
    if (isOpen && !isClosingRef.current) {
      handleClose()
    }
  }, [pathname])

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen && !isClosingRef.current) {
        handleClose()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, handleClose])

  if (!isOpen && !isClosing) return null

  return (
    <div className="fixed inset-0 z-[120] xl:hidden pointer-events-auto select-none">
      {/* ── 1. Soft Ambient Backdrop ── */}
      <div
        onClick={handleClose}
        aria-hidden="true"
        className={`absolute inset-0 bg-black/25 backdrop-blur-[3px] ${
          isClosing ? 'mobile-backdrop-exit' : 'mobile-backdrop-enter'
        }`}
      />

      {/* ── 2. Floating Island Bento Card (Ultra-Modern, Sleek & Editorial Light Mode) ── */}
      <div className="relative z-10 p-3.5 sm:p-5 max-w-[420px] mx-auto h-full flex flex-col justify-start pt-3.5 sm:pt-5 pointer-events-none">
        <div
          className={`w-full rounded-[30px] overflow-hidden flex flex-col pointer-events-auto shadow-2xl ${
            isClosing ? 'mobile-menu-card-exit' : 'mobile-menu-card-enter'
          }`}
          style={{
            background: 'rgba(255, 255, 255, 0.98)',
            backdropFilter: 'blur(36px) saturate(190%)',
            WebkitBackdropFilter: 'blur(36px) saturate(190%)',
            border: '1px solid rgba(0, 0, 0, 0.07)',
            boxShadow: '0 24px 70px rgba(0, 0, 0, 0.14), 0 4px 16px rgba(0, 0, 0, 0.04)',
          }}
        >
          {/* Card Header Bar */}
          <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-neutral-100">
            <Link href="/" onClick={handleClose} aria-label="Accueil" className="flex items-center">
              <Logo variant="dark" size="sm" />
            </Link>

            {/* Tactile Close Button */}
            <button
              onClick={handleClose}
              aria-label="Fermer le menu"
              className="w-10 h-10 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-700 flex items-center justify-center transition-all duration-200 active:scale-90"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          {/* Editorial Navlinks List with Silky Stagger Animation */}
          <nav className="px-6 py-3.5 flex flex-col divide-y divide-neutral-100/70 max-h-[62vh] overflow-y-auto no-scrollbar">
            {navLinks.map((item, idx) => {
              const active = isActive(item.href)

              return (
                <div
                  key={item.href}
                  className={!isClosing ? 'mobile-nav-item-enter' : ''}
                  style={{
                    animationDelay: !isClosing ? `${idx * 35}ms` : '0ms',
                  }}
                >
                  <Link
                    href={item.href}
                    onClick={handleClose}
                    className={`py-3 flex items-center justify-between group transition-colors duration-200 ${
                      active
                        ? 'text-[#EB4604] font-medium'
                        : 'text-neutral-800 hover:text-[#EB4604]'
                    }`}
                  >
                    <span className="text-[17px] sm:text-[18px] tracking-[-0.02em]">
                      {item.label}
                    </span>

                    <div className="flex items-center gap-2">
                      {active ? (
                        <span className="w-2 h-2 rounded-full bg-[#EB4604] shadow-[0_0_8px_rgba(235,70,4,0.7)] animate-pulse" />
                      ) : (
                        <svg
                          className="w-4 h-4 text-neutral-300 group-hover:text-[#EB4604] group-hover:translate-x-0.5 transition-all duration-200"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="9 18 15 12 9 6" />
                        </svg>
                      )}
                    </div>
                  </Link>
                </div>
              )
            })}
          </nav>

          {/* Card Footer CTA */}
          <div className="p-5 pt-3 border-t border-neutral-100 bg-neutral-50/60 flex flex-col gap-3">
            <Link
              href="/contact"
              onClick={handleClose}
              className="w-full flex items-center justify-between py-3.5 px-5 rounded-full bg-[#0A0A0A] hover:bg-[#EB4604] text-white text-xs font-semibold tracking-wide transition-all duration-300 shadow-md shadow-black/10 active:scale-[0.98] group"
            >
              <span>Démarrer un projet</span>
              <div className="w-6 h-6 rounded-full bg-white/15 flex items-center justify-center transition-transform group-hover:translate-x-0.5">
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="7" y1="17" x2="17" y2="7" />
                  <polyline points="7 7 17 7 17 17" />
                </svg>
              </div>
            </Link>

            {/* Direct Contact Info */}
            <div className="flex items-center justify-between text-[11px] font-mono text-neutral-400 px-1 pt-0.5">
              <a href={`mailto:${siteConfig.contact.email}`} className="hover:text-neutral-900 transition-colors truncate">
                {siteConfig.contact.email}
              </a>
              <span className="text-neutral-300">•</span>
              <a href={`tel:${siteConfig.contact.phone.replace(/\s+/g, '')}`} className="hover:text-neutral-900 transition-colors shrink-0">
                {siteConfig.contact.phone}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
