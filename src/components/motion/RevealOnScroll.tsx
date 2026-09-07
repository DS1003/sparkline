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

const directionClasses: Record<string, string> = {
  up: 'reveal-up',
  down: 'reveal-down',
  left: 'reveal-left',
  right: 'reveal-right',
  zoom: 'reveal-zoom',
  none: 'reveal-none',
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

    const isMobile = window.innerWidth < 768
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

  const dirClass = directionClasses[direction] || 'reveal-up'
  const safeDelay = Math.min(delay, 0.12)
  const safeDuration = Math.min(duration, 0.5)

  // Style uses CSS variables for desktop delay/duration.
  // On mobile (<768px), CSS media query @media (max-width: 767px) in globals.css
  // overrides with 0s delay and 0.24s duration (!important).
  // Both server and client render the exact same DOM -> ZERO hydration mismatch!
  const styleObj: React.CSSProperties | undefined =
    safeDelay > 0 || safeDuration !== 0.45
      ? ({
          '--reveal-delay': `${safeDelay}s`,
          '--reveal-duration': `${safeDuration}s`,
        } as React.CSSProperties)
      : undefined

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

