'use client'

import React, { useEffect, useRef, useState } from 'react'

interface CounterProps {
  value: number
  suffix?: string
  label: string
  description: string
}

function easeOutExpo(t: number): number {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t)
}

export function Counter({ value, suffix = '+', label, description }: CounterProps) {
  const [displayValue, setDisplayValue] = useState(0)
  const [started, setStarted] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  // Simple scroll-based visibility check with fallback
  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Try IntersectionObserver first
    if (typeof IntersectionObserver !== 'undefined') {
      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              setStarted(true)
              observer.disconnect()
              break
            }
          }
        },
        { threshold: 0.1, rootMargin: '50px' }
      )
      observer.observe(el)

      // Fallback: if not triggered after 3s, force start
      const fallback = setTimeout(() => {
        setStarted(true)
        observer.disconnect()
      }, 3000)

      return () => {
        observer.disconnect()
        clearTimeout(fallback)
      }
    } else {
      // No IntersectionObserver — just start immediately
      setStarted(true)
    }
  }, [])

  // Animate the count
  useEffect(() => {
    if (!started) return

    const duration = 2000
    let startTime: number | null = null
    let frameId: number

    function step(timestamp: number) {
      if (startTime === null) startTime = timestamp
      const elapsed = timestamp - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = easeOutExpo(progress)

      setDisplayValue(Math.round(eased * value))

      if (progress < 1) {
        frameId = requestAnimationFrame(step)
      }
    }

    frameId = requestAnimationFrame(step)
    return () => cancelAnimationFrame(frameId)
  }, [started, value])

  return (
    <div ref={ref} className="flex flex-col">
      {/* ── Large Number (h2.digit.counter.v2 - 96px Geist, sans-serif, #0A0A0A) ── */}
      <h2
        className="digit counter v2 flex items-baseline mb-4 sm:mb-5 text-[clamp(3.5rem,6vw,96px)] lg:text-[96px] font-bold text-[#0A0A0A] leading-[1.1] tracking-[-0.03em]"
        style={{ fontFamily: 'var(--font-family--primary-font)', fontFeatureSettings: '"tnum" 1' }}
      >
        <span>{displayValue}</span>
        <span>{suffix}</span>
      </h2>

      {/* ── Dotted Separator ── */}
      <div className="w-full mb-3.5 sm:mb-4 border-t border-dotted border-[#c8c8cc]" />

      {/* ── Label ── */}
      <h3
        className="text-[16px] sm:text-[17px] font-semibold text-[#0A0A0A] tracking-[-0.01em] mb-1.5 leading-snug"
        style={{ fontFamily: 'var(--font-family--primary-font)' }}
      >
        {label}
      </h3>

      {/* ── Description ── */}
      <p
        className="text-[13px] sm:text-[14px] text-[#555555] font-normal leading-[1.5] max-w-[280px]"
        style={{ fontFamily: 'var(--font-family--primary-font)' }}
      >
        {description}
      </p>
    </div>
  )
}
