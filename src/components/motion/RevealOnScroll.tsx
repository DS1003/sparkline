'use client'

import React, { useEffect, useRef, useState, useCallback } from 'react'

interface RevealOnScrollProps {
  children: React.ReactNode
  className?: string
  delay?: number
  direction?: 'up' | 'down' | 'left' | 'right' | 'none' | 'zoom' | 'blur' | 'mask'
  blur?: boolean
  duration?: number
  threshold?: number
  rootMargin?: string
  once?: boolean
}

const directionClasses: Record<string, string> = {
  up: 'reveal-up',
  down: 'reveal-down',
  left: 'reveal-left',
  right: 'reveal-right',
  zoom: 'reveal-zoom',
  blur: 'reveal-blur',
  mask: 'reveal-mask',
  none: 'reveal-none',
}

// ── Shared High-Performance IntersectionObserver Pool ──
// Avoids creating dozens of separate observer instances, dramatically reducing CPU/memory footprint
type ObserverCallback = (isIntersecting: boolean) => void
const observerCallbacks = new Map<Element, ObserverCallback>()
let sharedObserver: IntersectionObserver | null = null

function getSharedObserver(): IntersectionObserver | null {
  if (typeof window === 'undefined' || typeof IntersectionObserver === 'undefined') {
    return null
  }
  if (!sharedObserver) {
    const isMobile = window.innerWidth < 768
    sharedObserver = new IntersectionObserver(
      (entries) => {
        for (let i = 0; i < entries.length; i++) {
          const entry = entries[i]
          const cb = observerCallbacks.get(entry.target)
          if (cb) {
            cb(entry.isIntersecting)
          }
        }
      },
      {
        rootMargin: isMobile ? '0px 0px -20px 0px' : '0px 0px -50px 0px',
        threshold: 0.08,
      }
    )
  }
  return sharedObserver
}

export function RevealOnScroll({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  blur = false,
  duration = 0.55,
  threshold,
  rootMargin,
  once = true,
}: RevealOnScrollProps) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const hasTriggered = useRef(false)

  const reveal = useCallback(() => {
    if (hasTriggered.current && once) return
    hasTriggered.current = true
    setIsVisible(true)
  }, [once])

  useEffect(() => {
    const el = ref.current
    if (!el || (hasTriggered.current && once)) return

    // Accessibility check: Reduced motion
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      reveal()
      return
    }

    // Fast check: If custom rootMargin or threshold is provided, use dedicated observer, otherwise shared observer
    const isCustom = rootMargin !== undefined || threshold !== undefined

    if (isCustom) {
      if (typeof IntersectionObserver === 'undefined') {
        reveal()
        return
      }
      const isMobile = window.innerWidth < 768
      const customObserver = new IntersectionObserver(
        (entries) => {
          const [entry] = entries
          if (entry?.isIntersecting) {
            reveal()
            if (once) customObserver.disconnect()
          } else if (!once) {
            setIsVisible(false)
          }
        },
        {
          rootMargin: rootMargin ?? (isMobile ? '0px 0px -20px 0px' : '0px 0px -50px 0px'),
          threshold: threshold ?? 0.08,
        }
      )

      customObserver.observe(el)
      return () => customObserver.disconnect()
    }

    const observer = getSharedObserver()
    if (!observer) {
      reveal()
      return
    }

    const handleIntersect: ObserverCallback = (isIntersecting) => {
      if (isIntersecting) {
        reveal()
        if (once) {
          observer.unobserve(el)
          observerCallbacks.delete(el)
        }
      } else if (!once) {
        setIsVisible(false)
      }
    }

    // Register callback and observe
    observerCallbacks.set(el, handleIntersect)
    observer.observe(el)

    // Check if element is already inside viewport on mount
    const rect = el.getBoundingClientRect()
    if (rect.top < window.innerHeight - 40 && rect.bottom > 20) {
      reveal()
      if (once) {
        observer.unobserve(el)
        observerCallbacks.delete(el)
      }
    }

    return () => {
      observer.unobserve(el)
      observerCallbacks.delete(el)
    }
  }, [reveal, once, rootMargin, threshold])

  // Determine direction class (support blur prop as shortcut)
  const activeDirection = blur && direction === 'up' ? 'blur' : direction
  const dirClass = directionClasses[activeDirection] || 'reveal-up'

  const styleObj: React.CSSProperties = {
    '--reveal-delay': delay > 0 ? `${delay}s` : undefined,
    '--reveal-duration': duration !== 0.55 ? `${duration}s` : undefined,
  } as React.CSSProperties

  const revealedClass = isVisible ? ' is-revealed' : ''
  const combinedClassName = `reveal-item ${dirClass}${revealedClass}${className ? ` ${className}` : ''}`

  return (
    <div
      ref={ref}
      className={combinedClassName}
      style={styleObj}
    >
      {children}
    </div>
  )
}
