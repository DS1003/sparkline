'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion'

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false)
  const { scrollY, scrollYProgress } = useScroll()

  // Silky smooth spring progress
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
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  // Exact geometry with generous breathing room
  const radius = 18
  const circumference = 2 * Math.PI * radius

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.75, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.75, y: 15 }}
          transition={{
            type: 'spring',
            stiffness: 320,
            damping: 24,
          }}
          className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-50 pointer-events-auto"
        >
          <button
            onClick={scrollToTop}
            aria-label="Retourner en haut de la page"
            className="group relative flex items-center p-1.5 rounded-full bg-[#0E0E12]/95 hover:bg-[#0E0E12] text-white border border-white/20 shadow-[0_14px_36px_rgba(0,0,0,0.55)] backdrop-blur-xl transition-all duration-300 cursor-pointer overflow-hidden active:scale-95"
          >
            {/* SVG Circular Scroll Progress Ring */}
            <div className="relative w-11 h-11 flex items-center justify-center shrink-0">
              <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 48 48">
                {/* Background track circle */}
                <circle
                  cx="24"
                  cy="24"
                  r={radius}
                  stroke="currentColor"
                  strokeWidth="2.5"
                  className="text-white/10"
                  fill="transparent"
                />
                {/* Dynamic animated progress stroke */}
                <motion.circle
                  cx="24"
                  cy="24"
                  r={radius}
                  stroke="#EB4604"
                  strokeWidth="2.5"
                  strokeDasharray={circumference}
                  style={{
                    pathLength: smoothProgress,
                  }}
                  strokeLinecap="round"
                  fill="transparent"
                />
              </svg>

              {/* Center Content: Percent (Default) <-> Arrow (Hover) with optimal centering */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
                {/* Default Percentage */}
                <span className="text-[10px] font-mono font-bold text-white tracking-tighter flex items-center justify-center transition-all duration-200 group-hover:opacity-0 group-hover:scale-75">
                  {percent}
                  <span className="text-[7.5px] text-[#EB4604] font-bold leading-none ml-px">%</span>
                </span>

                {/* Hover Up Arrow */}
                <svg
                  className="absolute w-4 h-4 text-[#EB4604] transition-all duration-200 opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 19V5M5 12l7-7 7 7" />
                </svg>
              </div>
            </div>

            {/* Smooth CSS Expandable Label on Hover (GPU accelerated) */}
            <div className="max-w-0 opacity-0 group-hover:max-w-[130px] group-hover:opacity-100 transition-all duration-350 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden whitespace-nowrap">
              <span className="text-xs font-medium tracking-normal text-white pl-1.5 pr-4 block">
                Haut de page
              </span>
            </div>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
