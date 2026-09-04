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

    // Generous pre-trigger margin (+350px) so fast scrolling never hits un-revealed elements
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries
        if (entry?.isIntersecting) {
          reveal()
          observer.disconnect()
        }
      },
      {
        rootMargin: '350px 0px 350px 0px',
        threshold: 0,
      }
    )

    observer.observe(el)

    const handleLoaderComplete = () => {
      if (hasTriggered.current) return
      const rect = el.getBoundingClientRect()
      if (rect.top < window.innerHeight + 350 && rect.bottom > -200) {
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
        return 'translate3d(0, 18px, 0) scale(0.99)'
      case 'down':
        return 'translate3d(0, -18px, 0) scale(0.99)'
      case 'left':
        return 'translate3d(18px, 0, 0) scale(0.99)'
      case 'right':
        return 'translate3d(-18px, 0, 0) scale(0.99)'
      case 'zoom':
        return 'scale(0.96) translate3d(0, 10px, 0)'
      case 'none':
      default:
        return 'none'
    }
  }

  // Cap transition delay to max 0.15s to guarantee instant snappy rendering
  const safeDelay = Math.min(delay, 0.15)

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translate3d(0, 0, 0) scale(1)' : getInitialTransform(),
        transition: `opacity ${duration}s cubic-bezier(0.16, 1, 0.3, 1) ${safeDelay}s, transform ${duration}s cubic-bezier(0.16, 1, 0.3, 1) ${safeDelay}s`,
        willChange: isVisible ? 'auto' : 'opacity, transform',
        backfaceVisibility: 'hidden',
      }}
    >
      {children}
    </div>
  )
}
