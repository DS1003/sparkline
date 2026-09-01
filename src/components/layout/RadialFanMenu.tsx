'use client'

import React, { useEffect, useState, useRef, useCallback } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface RadialFanMenuProps {
  isOpen: boolean
  onClose: () => void
}

interface FanBlade {
  label: string
  href: string
  number: string
  // Fan trajectory parameters:
  // dx: lateral offset to the left in px (negative)
  // dy: vertical downward offset in px (positive)
  // rot: subtle fan blade rotation in degrees
  dx: number
  dy: number
  rot: number
}

// 7 Master Navlinks forming a graceful asymmetrical Japanese fan / card deck arc
const fanBlades: FanBlade[] = [
  { label: 'Accueil', href: '/', number: '01', dx: -68, dy: 54, rot: -2 },
  { label: 'À propos', href: '/about', number: '02', dx: -102, dy: 104, rot: -4 },
  { label: 'Services', href: '/services', number: '03', dx: -128, dy: 156, rot: -6 },
  { label: 'Projets', href: '/projects', number: '04', dx: -142, dy: 208, rot: -8 },
  { label: 'Équipe', href: '/team', number: '05', dx: -132, dy: 260, rot: -10 },
  { label: 'Sparklearn', href: '/sparklearn', number: '06', dx: -106, dy: 312, rot: -12 },
  { label: 'Contact', href: '/contact', number: '07', dx: -72, dy: 364, rot: -14 },
]

export function RadialFanMenu({ isOpen, onClose }: RadialFanMenuProps) {
  const pathname = usePathname()
  const [rendered, setRendered] = useState(false)
  const [animatingIn, setAnimatingIn] = useState(false)
  const closeTimerRef = useRef<NodeJS.Timeout | null>(null)

  const isActive = (path: string) => {
    if (path === '/' && pathname === '/') return true
    if (path !== '/' && pathname?.startsWith(path)) return true
    return false
  }

  // Smooth opening / closing orchestration
  useEffect(() => {
    if (isOpen) {
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current)
      setRendered(true)
      const frame = requestAnimationFrame(() => {
        setAnimatingIn(true)
      })
      return () => cancelAnimationFrame(frame)
    } else {
      setAnimatingIn(false)
      closeTimerRef.current = setTimeout(() => {
        setRendered(false)
      }, 450)
    }
  }, [isOpen])

  // Close on route change
  useEffect(() => {
    if (isOpen) {
      onClose()
    }
  }, [pathname])

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  if (!rendered) return null

  return (
    <div className="fixed inset-0 z-[120] xl:hidden pointer-events-none select-none">
      {/* ── 1. Whisper-Sheer Ambient Backdrop (Page stays visible) ── */}
      <div
        onClick={onClose}
        aria-hidden="true"
        className={`absolute inset-0 bg-black/25 backdrop-blur-[2px] transition-opacity duration-400 pointer-events-auto ${
          animatingIn ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* ── 2. Top-Right Anchor Pivot Container ── */}
      <div className="absolute top-4 right-4 sm:top-5 sm:right-6 pointer-events-auto">
        <div className="relative w-11 h-11 sm:w-12 sm:h-12">

          {/* ── 3. The 7 Fan Blades (Deploying from the Pivot Anchor) ── */}
          {fanBlades.map((blade, index) => {
            const active = isActive(blade.href)

            // Stagger timing:
            // Opening: forward stagger 38ms
            // Closing: reverse stagger 22ms
            const delay = animatingIn
              ? `${index * 38}ms`
              : `${(fanBlades.length - 1 - index) * 22}ms`

            return (
              <div
                key={blade.href}
                className="absolute top-0 right-0 origin-top-right transition-all ease-[cubic-bezier(0.16,1,0.3,1)]"
                style={{
                  transform: animatingIn
                    ? `translate3d(${blade.dx}px, ${blade.dy}px, 0) rotate(${blade.rot}deg) scale(1)`
                    : 'translate3d(0, 0, 0) rotate(0deg) scale(0.65)',
                  opacity: animatingIn ? 1 : 0,
                  transitionDuration: animatingIn ? '480ms' : '320ms',
                  transitionDelay: delay,
                  pointerEvents: animatingIn ? 'auto' : 'none',
                }}
              >
                <Link
                  href={blade.href}
                  onClick={onClose}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-full whitespace-nowrap text-xs font-mono transition-all duration-200 active:scale-95 group ${
                    active
                      ? 'bg-gradient-to-r from-[#EB4604] to-[#F05518] text-white font-semibold shadow-[0_4px_16px_rgba(235,70,4,0.35)] border border-white/20 ring-2 ring-[#EB4604]/25'
                      : 'bg-[#0E0E12]/95 hover:bg-[#181820] text-[#E5E7EB] hover:text-white border border-white/[0.09] hover:border-[#EB4604]/40 backdrop-blur-md shadow-[0_6px_20px_rgba(0,0,0,0.45)]'
                  }`}
                >
                  {/* Architectural Index Number */}
                  <span
                    className={`text-[10px] font-bold tracking-wider ${
                      active ? 'text-white/85' : 'text-[#EB4604]'
                    }`}
                  >
                    {blade.number}
                  </span>

                  {/* Label */}
                  <span className="font-medium tracking-tight text-[12.5px]">
                    {blade.label}
                  </span>

                  {/* Active Indicator or Subtle Hover Arrow */}
                  {active ? (
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse shrink-0 ml-0.5" />
                  ) : blade.href === '/contact' ? (
                    <span className="text-[11px] text-neutral-400 group-hover:text-white group-hover:translate-x-0.5 transition-transform">
                      ↗
                    </span>
                  ) : null}
                </Link>
              </div>
            )
          })}

          {/* ── 4. The Active Pivot Close Button (Morphs Burger into ✕) ── */}
          <button
            onClick={onClose}
            aria-label="Fermer le menu"
            className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all duration-300 active:scale-90 shadow-2xl cursor-pointer group z-30"
            style={{
              background: 'rgba(14, 14, 18, 0.96)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid rgba(235, 70, 4, 0.5)',
              boxShadow: '0 8px 30px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(235, 70, 4, 0.3), 0 0 16px rgba(235, 70, 4, 0.2)',
            }}
          >
            {/* Animated Morphing Cross ✕ */}
            <div className="relative w-5 h-5 flex items-center justify-center">
              <span className="absolute w-4 h-[2px] bg-white rounded-full rotate-45 transition-transform duration-300 group-hover:bg-[#EB4604]" />
              <span className="absolute w-4 h-[2px] bg-white rounded-full -rotate-45 transition-transform duration-300 group-hover:bg-[#EB4604]" />
            </div>

            {/* Pulsing Pivot Dot */}
            <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-[#EB4604] border-2 border-[#0A0A0C] shadow-[0_0_8px_#EB4604] animate-pulse" />
          </button>
        </div>
      </div>
    </div>
  )
}
