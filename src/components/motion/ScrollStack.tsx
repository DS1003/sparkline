'use client'

import React, { useRef, useEffect } from 'react'
import type { ReactNode } from 'react'
import './ScrollStack.css'

export interface ScrollStackItemProps {
  itemClassName?: string
  children: ReactNode
  style?: React.CSSProperties
  className?: string
}

export const ScrollStackItem: React.FC<ScrollStackItemProps> = ({
  children,
  itemClassName = '',
  style,
  className = '',
  ...rest
}) => (
  <div className={`scroll-stack-card-wrapper ${className}`.trim()} style={style} {...rest}>
    <div className={`scroll-stack-card ${itemClassName}`.trim()}>{children}</div>
  </div>
)

export interface ScrollStackProps {
  className?: string
  children: ReactNode
  itemDistance?: number
  itemScale?: number
  itemStackDistance?: number
  stackPosition?: string
  scaleEndPosition?: string
  baseScale?: number
  scaleDuration?: number
  rotationAmount?: number
  blurAmount?: number
  useWindowScroll?: boolean
  onStackComplete?: () => void
}

export const ScrollStack: React.FC<ScrollStackProps> = ({
  children,
  className = '',
  itemDistance = 60,
  itemStackDistance = 20,
  onStackComplete,
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const endRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!onStackComplete || !endRef.current) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          onStackComplete()
        }
      },
      { threshold: 0.5 }
    )

    observer.observe(endRef.current)
    return () => observer.disconnect()
  }, [onStackComplete])

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let rafId: number
    const updateCardTransforms = () => {
      if (!containerRef.current) return
      const wrappers = containerRef.current.querySelectorAll<HTMLElement>('.scroll-stack-card-wrapper')
      const total = wrappers.length
      if (total <= 1) return

      const isMobile = window.innerWidth < 640
      const baseStickyTop = isMobile ? 72 : window.innerWidth < 1024 ? 80 : 88
      const stepOffset = isMobile ? 12 : window.innerWidth < 1024 ? 16 : 20

      wrappers.forEach((wrapper, i) => {
        const card = wrapper.querySelector<HTMLElement>('.scroll-stack-card')
        if (!card) return

        const stickyTop = baseStickyTop + i * stepOffset
        const rect = wrapper.getBoundingClientRect()
        const isStuck = rect.top <= stickyTop + 3

        if (!isStuck) {
          card.style.transform = 'scale(1)'
          card.style.filter = 'brightness(1)'
          return
        }

        // Calculate compounding depth scale as following cards slide up over it
        let scaleReduction = 0
        let brightnessDim = 0

        for (let j = i + 1; j < total; j++) {
          const nextWrapper = wrappers[j]
          const nextRect = nextWrapper.getBoundingClientRect()
          const nextStickyTop = baseStickyTop + j * stepOffset
          const threshold = window.innerHeight * 0.7
          const dist = Math.max(0, nextRect.top - nextStickyTop)
          if (dist < threshold) {
            const factor = 1 - dist / threshold
            scaleReduction += factor * 0.038
            brightnessDim += factor * 0.05
          }
        }

        const finalScale = Math.max(0.88, 1 - scaleReduction)
        const finalBrightness = Math.max(0.84, 1 - brightnessDim)

        card.style.transform = `scale(${finalScale.toFixed(4)})`
        card.style.filter = `brightness(${finalBrightness.toFixed(3)})`
        card.style.transformOrigin = 'top center'
      })
    }

    const onScroll = () => {
      cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(updateCardTransforms)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    updateCardTransforms()

    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <div
      className={`scroll-stack-scroller ${className}`.trim()}
      style={
        {
          '--item-distance': `${itemDistance}px`,
          '--item-stack-distance': `${itemStackDistance}px`,
        } as React.CSSProperties
      }
    >
      <div className="scroll-stack-inner" ref={containerRef}>
        {React.Children.map(children, (child, i) => {
          if (!React.isValidElement(child)) return child
          const el = child as React.ReactElement<{
            style?: React.CSSProperties
            'data-stack-index'?: number
          }>
          return React.cloneElement(el, {
            style: {
              ...(el.props.style || {}),
              '--stack-index': i,
              zIndex: i + 1,
            } as React.CSSProperties,
            'data-stack-index': i,
          })
        })}
        <div className="scroll-stack-end" ref={endRef} />
      </div>
    </div>
  )
}

export default ScrollStack
