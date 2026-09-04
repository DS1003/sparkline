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
      <div className="scroll-stack-inner">
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
