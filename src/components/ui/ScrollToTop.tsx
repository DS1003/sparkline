'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion'

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false)
  const { scrollY, scrollYProgress } = useScroll()

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 24,
    mass: 0.2,
  })

  const [percent, setPercent] = useState(0)

  useEffect(() => {
    const unsubScroll = scrollY.on('change', (latest) => {
      setIsVisible(latest > 200)
    })
    const unsubProgress = smoothProgress.on('change', (latest) => {
      setPercent(Math.round(latest * 100))
    })
    return () => {
      unsubScroll()
      unsubProgress()
    }
  }, [scrollY, smoothProgress])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const size = 56
  const strokeWidth = 2.5
  const radius = (size - strokeWidth * 2) / 2
  const circumference = 2 * Math.PI * radius

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          onClick={scrollToTop}
          aria-label="Retourner en haut de la page"
          initial={{ opacity: 0, scale: 0.7, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.7, y: 12 }}
          transition={{ type: 'spring', stiffness: 340, damping: 26 }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.93 }}
          className="group fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-50 cursor-pointer"
        >
          {/* Outer container */}
          <div
            className="relative flex items-center justify-center rounded-full bg-[#0C0C10]/90 border border-white/12 shadow-[0_16px_40px_rgba(0,0,0,0.6)] backdrop-blur-2xl transition-all duration-300 group-hover:border-white/22 group-hover:shadow-[0_20px_50px_rgba(0,0,0,0.7),0_0_0_1px_rgba(235,70,4,0.15)]"
            style={{ width: size, height: size }}
          >
            {/* Progress ring */}
            <svg
              className="absolute inset-0 w-full h-full -rotate-90"
              viewBox={`0 0 ${size} ${size}`}
            >
              {/* Track */}
              <circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                stroke="rgba(255,255,255,0.08)"
                strokeWidth={strokeWidth}
                fill="none"
              />
              {/* Progress */}
              <motion.circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                stroke="#EB4604"
                strokeWidth={strokeWidth}
                strokeDasharray={circumference}
                style={{ pathLength: smoothProgress }}
                strokeLinecap="round"
                fill="none"
              />
            </svg>

            {/* Center: number (default) / arrow (hover) */}
            <div className="relative z-10 flex items-center justify-center w-full h-full">
              {/* Number — no % */}
              <span
                className="absolute text-[11px] font-mono font-semibold text-white tabular-nums leading-none transition-all duration-200 group-hover:opacity-0 group-hover:scale-75"
              >
                {percent}
              </span>

              {/* Up arrow on hover */}
              <svg
                className="absolute w-[18px] h-[18px] text-[#EB4604] opacity-0 scale-75 transition-all duration-200 group-hover:opacity-100 group-hover:scale-100"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 19V5M5 12l7-7 7 7" />
              </svg>
            </div>
          </div>
        </motion.button>
      )}
    </AnimatePresence>
  )
}
