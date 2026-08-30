'use client'

import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface ScrollFloatProps {
  children: React.ReactNode
  className?: string
  animationDuration?: number
  ease?: string
  scrollStart?: string
  scrollEnd?: string
  stagger?: number
  scrub?: boolean | number
}

export function ScrollFloat({
  children,
  className = '',
  animationDuration = 1,
  ease = 'back.inOut(2)',
  scrollStart = 'top 85%',
  scrollEnd = 'bottom 30%',
  stagger = 0.04,
  scrub = false,
}: ScrollFloatProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    // Find all direct children or words
    const targets = el.querySelectorAll('.scroll-float-item')
    if (!targets.length) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        targets,
        {
          opacity: 0,
          y: 40,
          scale: 0.92,
          rotateX: 35,
          filter: 'blur(8px)',
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotateX: 0,
          filter: 'blur(0px)',
          duration: animationDuration,
          ease: ease,
          stagger: stagger,
          scrollTrigger: {
            trigger: el,
            start: scrollStart,
            end: scrollEnd,
            scrub: scrub,
            toggleActions: 'play none none reverse',
          },
        }
      )
    }, containerRef)

    return () => ctx.revert()
  }, [animationDuration, ease, scrollStart, scrollEnd, stagger, scrub])

  return (
    <div ref={containerRef} className={`perspective-[1000px] ${className}`}>
      {children}
    </div>
  )
}
