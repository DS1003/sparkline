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

export function RevealOnScroll({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  blur = false,
  duration = 0.7,
  threshold = 0.1,
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

    if (typeof IntersectionObserver === 'undefined') {
      reveal()
      return
    }

    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768
    // High-end trigger point: elements reveal right as they enter lower 8-10% of viewport
    const effectiveRootMargin = rootMargin ?? (isMobile ? '0px 0px -30px 0px' : '0px 0px -75px 0px')

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries
        if (entry?.isIntersecting) {
          reveal()
          if (once) {
            observer.disconnect()
          }
        } else if (!once) {
          setIsVisible(false)
        }
      },
      {
        rootMargin: effectiveRootMargin,
        threshold: threshold,
      }
    )

    // Check if element is already in the viewport on mount
    const checkInitialVisibility = () => {
      if (hasTriggered.current) return
      const rect = el.getBoundingClientRect()
      // Only trigger if truly visible within the screen bounds right now
      if (rect.top < window.innerHeight - 60 && rect.bottom > 40) {
        reveal()
        if (once) observer.disconnect()
      } else {
        observer.observe(el)
      }
    }

    const isLoaded =
      typeof window !== 'undefined' &&
      (window as unknown as { __SPARKLINE_LOADED__?: boolean }).__SPARKLINE_LOADED__

    if (isLoaded) {
      checkInitialVisibility()
    } else {
      observer.observe(el)

      const handleLoaderComplete = () => {
        checkInitialVisibility()
      }

      window.addEventListener('sparkline:loader-complete', handleLoaderComplete, { once: true })
      return () => {
        observer.disconnect()
        window.removeEventListener('sparkline:loader-complete', handleLoaderComplete)
      }
    }

    return () => {
      observer.disconnect()
    }
  }, [reveal, once, rootMargin, threshold])

  // Determine direction class (support blur prop as shortcut)
  const activeDirection = blur && direction === 'up' ? 'blur' : direction
  const dirClass = directionClasses[activeDirection] || 'reveal-up'

  const styleObj: React.CSSProperties = {
    '--reveal-delay': `${delay}s`,
    '--reveal-duration': `${duration}s`,
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


