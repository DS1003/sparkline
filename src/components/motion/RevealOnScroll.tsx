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
  blur = true,
  duration = 0.7,
  threshold = 0.01,
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

    // Use a scroll listener as the primary mechanism — it's the most reliable
    // across all browsers and container configurations (sticky, overflow, etc.)
    const checkVisibility = () => {
      if (hasTriggered.current) return
      const rect = el.getBoundingClientRect()
      // Element is considered visible when its top edge is within the viewport
      // plus a generous bottom margin, OR its bottom edge is above the viewport top
      if (rect.top < window.innerHeight + 80 && rect.bottom > -80) {
        reveal()
      }
    }

    // Check immediately on mount (for elements already in viewport)
    // Use requestAnimationFrame to ensure layout has settled
    requestAnimationFrame(() => {
      checkVisibility()
    })

    // Also check after a short delay for SSR hydration edge cases
    const hydrationTimer = setTimeout(checkVisibility, 100)

    // Passive scroll listener — extremely lightweight, ~0.01ms per frame
    window.addEventListener('scroll', checkVisibility, { passive: true })
    window.addEventListener('resize', checkVisibility, { passive: true })

    return () => {
      window.removeEventListener('scroll', checkVisibility)
      window.removeEventListener('resize', checkVisibility)
      clearTimeout(hydrationTimer)
    }
  }, [reveal])

  const getInitialTransform = () => {
    switch (direction) {
      case 'up':
        return 'translateY(32px)'
      case 'down':
        return 'translateY(-32px)'
      case 'left':
        return 'translateX(32px)'
      case 'right':
        return 'translateX(-32px)'
      case 'zoom':
        return 'scale(0.95) translateY(18px)'
      case 'none':
      default:
        return 'none'
    }
  }

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translate3d(0, 0, 0) scale(1)' : getInitialTransform(),
        filter: blur ? (isVisible ? 'blur(0px)' : 'blur(6px)') : 'none',
        transition: `opacity ${duration}s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s, transform ${duration}s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s, filter ${duration}s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`,
        willChange: isVisible ? 'auto' : 'opacity, transform, filter',
      }}
    >
      {children}
    </div>
  )
}
