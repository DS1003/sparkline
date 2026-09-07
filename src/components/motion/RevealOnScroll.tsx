'use client'

import React, { useEffect, useRef, useState, useCallback } from 'react'

interface RevealOnScrollProps {
  children: React.ReactNode
  className?: string
  delay?: number
  direction?: 'up' | 'down' | 'left' | 'right' | 'none' | 'zoom'
  blur?: boolean
  duration?: number
  threshold?: number
}

export function RevealOnScroll({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  duration = 0.45,
}: RevealOnScrollProps) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const hasTriggered = useRef(false)

  const reveal = useCallback(() => {
    if (hasTriggered.current) return
    hasTriggered.current = true
    setIsVisible(true)
  }, [])

  useEffect(() => {
    const el = ref.current
    if (!el || hasTriggered.current) return

    if (typeof IntersectionObserver === 'undefined') {
      reveal()
      return
    }

    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768
    const rootMargin = isMobile ? '800px 0px 800px 0px' : '400px 0px 400px 0px'

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries
        if (entry?.isIntersecting) {
          reveal()
          observer.disconnect()
        }
      },
      {
        rootMargin,
        threshold: 0,
      }
    )

    observer.observe(el)

    const handleLoaderComplete = () => {
      if (hasTriggered.current) return
      const rect = el.getBoundingClientRect()
      const extraMargin = isMobile ? 800 : 400
      if (rect.top < window.innerHeight + extraMargin && rect.bottom > -200) {
        reveal()
        observer.disconnect()
      }
    }

    window.addEventListener('sparkline:loader-complete', handleLoaderComplete)

    return () => {
      observer.disconnect()
      window.removeEventListener('sparkline:loader-complete', handleLoaderComplete)
    }
  }, [reveal])

  const getInitialTransform = () => {
    switch (direction) {
      case 'up':
        return 'translate3d(0, 14px, 0) scale(0.99)'
      case 'down':
        return 'translate3d(0, -14px, 0) scale(0.99)'
      case 'left':
        return 'translate3d(14px, 0, 0) scale(0.99)'
      case 'right':
        return 'translate3d(-14px, 0, 0) scale(0.99)'
      case 'zoom':
        return 'scale(0.97) translate3d(0, 8px, 0)'
      case 'none':
      default:
        return 'none'
    }
  }

  // Snappy timing on mobile: 0s delay and faster transition to eliminate any perceived scroll delay
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768
  const safeDelay = isMobile ? 0 : Math.min(delay, 0.12)
  const animDuration = isMobile ? Math.min(duration, 0.24) : duration

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translate3d(0, 0, 0) scale(1)' : getInitialTransform(),
        transition: `opacity ${animDuration}s cubic-bezier(0.16, 1, 0.3, 1) ${safeDelay}s, transform ${animDuration}s cubic-bezier(0.16, 1, 0.3, 1) ${safeDelay}s`,
        willChange: isVisible ? 'auto' : 'opacity, transform',
        backfaceVisibility: 'hidden',
      }}
    >
      {children}
    </div>
  )
}
