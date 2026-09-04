'use client'

import React, { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { cn } from '@/lib/utils'

interface CounterProps {
  value: number
  suffix?: string
  label: string
  description: string
  delay?: number
  index?: number
  className?: string
}

function easeOutExpo(t: number): number {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t)
}

export function Counter({
  value,
  suffix = '+',
  label,
  description,
  delay = 0,
  index,
  className,
}: CounterProps) {
  const [displayValue, setDisplayValue] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

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
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{
        duration: 0.7,
        delay: delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={cn(
        'group relative flex flex-col justify-between py-2 sm:py-3 will-change-transform',
        className
      )}
    >
      {/* ── Minimalist Top Indicator & Progress Line ── */}
      <div className="flex items-center justify-between mb-3 sm:mb-5">
        <div className="h-[2px] w-6 sm:w-8 bg-neutral-200 group-hover:w-12 group-hover:bg-[#EB4604] transition-all duration-500 rounded-full" />
      </div>

      {/* ── Large Counter Number ── */}
      <div className="mb-2 sm:mb-3">
        <h3
          className="text-[clamp(2.5rem,5vw,64px)] font-light text-[#0A0A0A] leading-none tracking-[-0.04em] flex items-baseline gap-0.5"
          style={{ fontFamily: 'var(--font-family--primary-font)', fontFeatureSettings: '"tnum" 1' }}
        >
          <span>{displayValue}</span>
          <span className="text-[#EB4604] font-normal text-[0.8em]">{suffix}</span>
        </h3>
      </div>

      {/* ── Clean Label & Subtle Description ── */}
      <div className="space-y-1 sm:space-y-1.5 pt-2 sm:pt-3 border-t border-neutral-100">
        <h4
          className="text-sm sm:text-base font-semibold text-[#0A0A0A] tracking-[-0.01em] leading-snug group-hover:text-[#EB4604] transition-colors duration-300"
          style={{ fontFamily: 'var(--font-family--primary-font)' }}
        >
          {label}
        </h4>
        <p className="text-xs sm:text-[13px] text-neutral-500 font-light leading-relaxed max-w-[260px]">
          {description}
        </p>
      </div>
    </motion.div>
  )
}
