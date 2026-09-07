'use client'

import React, { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import Lenis from 'lenis'

interface SmoothScrollProviderProps {
  children: React.ReactNode
}

export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  const lenisRef = useRef<Lenis | null>(null)
  const pathname = usePathname()

  useEffect(() => {
    // Honor reduced motion accessibility
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    // Disable Lenis on mobile/touch devices so mobile browsers use native 120Hz GPU momentum scrolling
    const isTouchDevice =
      window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 1024
    if (isTouchDevice) return

    const lenis = new Lenis({
      duration: 1.0,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 0,
      syncTouch: false,
      infinite: false,
      autoResize: true,
    })

    lenisRef.current = lenis

    let rafId: number

    function raf(time: number) {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }

    rafId = requestAnimationFrame(raf)

    // Expose lenis globally for any component needing custom scroll targeting
    if (typeof window !== 'undefined') {
      ;(window as unknown as { __lenis?: Lenis }).__lenis = lenis
    }

    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
      lenisRef.current = null
      if (typeof window !== 'undefined') {
        delete (window as unknown as { __lenis?: Lenis }).__lenis
      }
    }
  }, [])

  // Automatically reset scroll to top on page navigation
  useEffect(() => {
    // Handle anchor links if present
    if (typeof window !== 'undefined' && window.location.hash) {
      const targetEl = document.querySelector(window.location.hash)
      if (targetEl && lenisRef.current) {
        lenisRef.current.scrollTo(targetEl as HTMLElement, { immediate: true })
        return
      }
    }

    // Otherwise scroll immediately to the very top of the new page
    window.scrollTo(0, 0)
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true })
    }

    // Double-check on next frame after DOM rendering
    const frameId = requestAnimationFrame(() => {
      if (typeof window !== 'undefined' && !window.location.hash) {
        window.scrollTo(0, 0)
        if (lenisRef.current) {
          lenisRef.current.scrollTo(0, { immediate: true })
        }
      }
    })

    return () => cancelAnimationFrame(frameId)
  }, [pathname])

  return <>{children}</>
}
