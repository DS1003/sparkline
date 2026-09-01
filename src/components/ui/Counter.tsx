'use client'

import React, { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

interface CounterProps {
  value: number
  suffix?: string
  label: string
  description: string
  delay?: number
}

function easeOutExpo(t: number): number {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t)
}

export function Counter({ value, suffix = '+', label, description, delay = 0 }: CounterProps) {
  const [displayValue, setDisplayValue] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: false, amount: 0.3 })

  // Animate the count whenever the card enters the viewport on scroll
  useEffect(() => {
    if (!isInView) {
      setDisplayValue(0)
      return
    }

    const duration = 2000
    let startTime: number | null = null
    let frameId: number

    // Optional slight stagger delay before counting
    const timeoutId = setTimeout(() => {
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
    }, delay * 1000)

    return () => {
      clearTimeout(timeoutId)
      cancelAnimationFrame(frameId)
    }
  }, [isInView, value, delay])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 50, scale: 0.95 }}
      transition={{
        duration: 0.8,
        delay: delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="relative flex flex-col justify-between p-6 sm:p-7 lg:p-8 rounded-[24px] sm:rounded-[28px] bg-white border border-neutral-200/90 shadow-[0_8px_30px_rgba(0,0,0,0.03)] h-full will-change-transform"
    >
      {/* ── Large Counter Number ── */}
      <div className="mb-4">
        <h3
          className="text-[clamp(2.75rem,5vw,68px)] font-light text-[#0A0A0A] leading-[1.0] tracking-[-0.04em] flex items-baseline gap-0.5"
          style={{ fontFamily: 'var(--font-family--primary-font)', fontFeatureSettings: '"tnum" 1' }}
        >
          <span>{displayValue}</span>
          <span className="text-[#EB4604] font-normal">{suffix}</span>
        </h3>
      </div>

      {/* ── Solid Hairline Separator & Text ── */}
      <div className="space-y-1.5 pt-4 border-t border-neutral-100">
        <h4
          className="text-[15px] sm:text-[16px] font-semibold text-[#0A0A0A] tracking-[-0.01em] leading-snug"
          style={{ fontFamily: 'var(--font-family--primary-font)' }}
        >
          {label}
        </h4>
        <p className="text-[13px] text-neutral-500 font-light leading-[1.5]">
          {description}
        </p>
      </div>
    </motion.div>
  )
}
