'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'

interface MobileBottomBarProps {
  visible: boolean
  onOpenMenu: () => void
  isMenuOpen: boolean
}

interface BottomNavItem {
  id: string
  label: string
  href?: string
  icon: (active: boolean) => React.ReactNode
}

export function MobileBottomBar({ visible, onOpenMenu, isMenuOpen }: MobileBottomBarProps) {
  const pathname = usePathname()

  const isActive = (path?: string) => {
    if (!path) return false
    if (path === '/' && pathname === '/') return true
    if (path !== '/' && pathname?.startsWith(path)) return true
    return false
  }

  const isMenuSectionActive =
    isMenuOpen ||
    pathname === '/about' ||
    pathname === '/team' ||
    pathname === '/contact' ||
    pathname?.startsWith('/insights') ||
    pathname === '/terms' ||
    pathname === '/privacy'

  const items: BottomNavItem[] = [
    {
      id: 'home',
      label: 'Accueil',
      href: '/',
      icon: (active) => (
        <svg
          viewBox="0 0 24 24"
          className="w-5 h-5 transition-transform duration-200"
          fill="none"
          stroke="currentColor"
          strokeWidth={active ? 2.2 : 1.8}
        >
          <path
            d="M3 10.5L12 3l9 7.5V20a1.5 1.5 0 0 1-1.5 1.5H4.5A1.5 1.5 0 0 1 3 20v-9.5z"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M9 21v-6a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      id: 'services',
      label: 'Services',
      href: '/services',
      icon: (active) => (
        <svg
          viewBox="0 0 24 24"
          className="w-5 h-5 transition-transform duration-200"
          fill="none"
          stroke="currentColor"
          strokeWidth={active ? 2.2 : 1.8}
        >
          <path
            d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      id: 'projects',
      label: 'Projets',
      href: '/projects',
      icon: (active) => (
        <svg
          viewBox="0 0 24 24"
          className="w-5 h-5 transition-transform duration-200"
          fill="none"
          stroke="currentColor"
          strokeWidth={active ? 2.2 : 1.8}
        >
          <rect x="3" y="3" width="7" height="7" rx="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <rect x="14" y="3" width="7" height="7" rx="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <rect x="14" y="14" width="7" height="7" rx="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <rect x="3" y="14" width="7" height="7" rx="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      id: 'sparklearn',
      label: 'Sparklearn',
      href: '/sparklearn',
      icon: (active) => (
        <svg
          viewBox="0 0 24 24"
          className="w-5 h-5 transition-transform duration-200"
          fill="none"
          stroke="currentColor"
          strokeWidth={active ? 2.2 : 1.8}
        >
          <path d="M22 10v6M2 10l10-5 10 5-10 5z" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M6 12v5c0 2 3 3 6 3s6-1 6-3v-5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      id: 'menu',
      label: 'Menu',
      icon: (active) => (
        <div className="relative w-5 h-5 flex flex-col items-center justify-center gap-1">
          <span
            className={`h-[2px] rounded-full transition-all duration-300 ${
              active ? 'bg-white' : 'bg-neutral-400'
            } ${
              isMenuOpen ? 'w-4.5 rotate-45 translate-y-1.5' : 'w-4.5'
            }`}
          />
          <span
            className={`h-[2px] rounded-full transition-all duration-300 ${
              active ? 'bg-white' : 'bg-neutral-400'
            } ${
              isMenuOpen ? 'opacity-0 w-0' : 'w-4.5'
            }`}
          />
          <span
            className={`h-[2px] rounded-full transition-all duration-300 ${
              active ? 'bg-white' : 'bg-neutral-400'
            } ${
              isMenuOpen ? 'w-4.5 -rotate-45 -translate-y-1.5' : 'w-3 self-start ml-0.5'
            }`}
          />
        </div>
      ),
    },
  ]

  return (
    <motion.div
      initial={false}
      animate={{
        y: visible ? 0 : 96,
        opacity: visible ? 1 : 0,
        scale: visible ? 1 : 0.94,
      }}
      transition={{
        type: 'spring',
        stiffness: 380,
        damping: 30,
        mass: 0.8,
      }}
      className={`fixed inset-x-0 z-[100] px-3 sm:px-6 flex justify-center xl:hidden ${
        visible ? 'pointer-events-auto' : 'pointer-events-none'
      }`}
      style={{
        bottom: 'max(14px, env(safe-area-inset-bottom, 14px))',
      }}
    >
      <nav
        aria-label="Navigation mobile rapide PWA"
        className="relative w-full max-w-[392px] h-[66px] rounded-[33px] px-2 py-1.5 flex items-center justify-between select-none shadow-2xl overflow-hidden"
        style={{
          background: 'rgba(12, 12, 16, 0.88)',
          backdropFilter: 'blur(30px) saturate(210%)',
          WebkitBackdropFilter: 'blur(30px) saturate(210%)',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          boxShadow:
            '0 20px 45px -8px rgba(0, 0, 0, 0.85), 0 0 0 1px rgba(255, 255, 255, 0.06), inset 0 1px 1px rgba(255, 255, 255, 0.25)',
        }}
      >
        {/* Subtle Specular Rim Light on Top Edge */}
        <div className="absolute top-0 inset-x-8 h-[1px] bg-gradient-to-r from-transparent via-white/35 to-transparent pointer-events-none" />

        {items.map((item) => {
          const isItemActive = item.id === 'menu' ? isMenuSectionActive : isActive(item.href)

          const content = (
            <div className="relative flex flex-col items-center justify-center w-full h-full gap-1 z-10 select-none">
              {/* Dynamic Sliding 3D Tactile Orange Pill Background (No glow, pure physical depth) */}
              {isItemActive && (
                <motion.div
                  layoutId="pwa-bottom-pill"
                  className="absolute inset-x-0.5 inset-y-1 rounded-[24px] pointer-events-none"
                  style={{
                    background: 'linear-gradient(180deg, #FF6622 0%, #EB4604 50%, #B83200 100%)',
                    boxShadow:
                      '0 3px 6px -1px rgba(0, 0, 0, 0.6), 0 1px 2px rgba(0, 0, 0, 0.35), inset 0 1px 0.5px rgba(255, 255, 255, 0.7), inset 0 2px 2px rgba(255, 255, 255, 0.22), inset 0 -1.5px 1.5px rgba(0, 0, 0, 0.45)',
                    border: '1px solid rgba(255, 255, 255, 0.18)',
                    borderBottomColor: 'rgba(0, 0, 0, 0.45)',
                  }}
                  transition={{
                    type: 'spring',
                    stiffness: 420,
                    damping: 32,
                    mass: 0.8,
                  }}
                />
              )}

              {/* Icon Container with subtle tactile lift */}
              <div
                className={`relative flex items-center justify-center transition-transform duration-200 shrink-0 ${
                  isItemActive
                    ? 'text-white scale-[1.02] drop-shadow-[0_1px_1.5px_rgba(0,0,0,0.45)]'
                    : 'text-neutral-400 group-hover:text-neutral-200'
                }`}
              >
                {item.icon(isItemActive)}
              </div>

              {/* Label */}
              <span
                className={`text-[9.5px] leading-none tracking-tight transition-colors duration-200 ${
                  isItemActive
                    ? 'text-white font-semibold drop-shadow-[0_1px_1px_rgba(0,0,0,0.4)]'
                    : 'text-neutral-400 font-medium group-hover:text-neutral-200'
                }`}
              >
                {item.label}
              </span>
            </div>
          )

          if (item.id === 'menu') {
            return (
              <button
                key={item.id}
                onClick={onOpenMenu}
                aria-label="Ouvrir le menu complet"
                className="relative flex-1 h-full flex flex-col items-center justify-center rounded-[24px] transition-transform active:scale-95 cursor-pointer group"
              >
                {content}
              </button>
            )
          }

          return (
            <Link
              key={item.id}
              href={item.href!}
              aria-label={item.label}
              className="relative flex-1 h-full flex flex-col items-center justify-center rounded-[24px] transition-transform active:scale-95 cursor-pointer group"
            >
              {content}
            </Link>
          )
        })}
      </nav>
    </motion.div>
  )
}
