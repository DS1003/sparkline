'use client'

import React, { useEffect, useRef, useState } from 'react'

interface BlurTextProps {
  text: string
  className?: string
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span'
  delay?: number
  animateBy?: 'words' | 'letters'
  style?: React.CSSProperties
}

export function BlurText({
  text,
  className = '',
  as: Component = 'span',
  delay = 0,
  animateBy = 'words',
  style,
}: BlurTextProps) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.15, rootMargin: '40px' }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const elements = animateBy === 'words' ? text.split(' ') : text.split('')

  return (
    <Component
      ref={ref as any}
      className={`inline-block ${className}`}
      style={style}
    >
      {elements.map((el, index) => (
        <span
          key={index}
          className="inline-block transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(24px) scale(0.98)',
            filter: isVisible ? 'blur(0px)' : 'blur(10px)',
            transitionDelay: `${delay + index * (animateBy === 'words' ? 0.06 : 0.02)}s`,
            marginRight: animateBy === 'words' ? '0.25em' : '0em',
          }}
        >
          {el === ' ' ? '\u00A0' : el}
        </span>
      ))}
    </Component>
  )
}
