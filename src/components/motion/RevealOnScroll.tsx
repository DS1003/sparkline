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
  blur = false,
  duration = 0.65,
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

    const checkVisibility = () => {
      if (hasTriggered.current) return
      const rect = el.getBoundingClientRect()
      if (rect.top < window.innerHeight + 80 && rect.bottom > -80) {
        reveal()
      }
    }

    requestAnimationFrame(() => {
      checkVisibility()
    })

    const hydrationTimer = setTimeout(checkVisibility, 100)

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
        return 'translate3d(0, 26px, 0) scale(0.985)'
      case 'down':
        return 'translate3d(0, -26px, 0) scale(0.985)'
      case 'left':
        return 'translate3d(26px, 0, 0) scale(0.985)'
      case 'right':
        return 'translate3d(-26px, 0, 0) scale(0.985)'
      case 'zoom':
        return 'scale(0.94) translate3d(0, 16px, 0)'
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
        transition: `opacity ${duration}s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s, transform ${duration}s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`,
        willChange: isVisible ? 'auto' : 'opacity, transform',
        backfaceVisibility: 'hidden',
      }}
    >
      {children}
    </div>
  )
}
