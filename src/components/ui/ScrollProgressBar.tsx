'use client'

import React from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'

export function ScrollProgressBar() {
  const { scrollYProgress } = useScroll()

  // Spring physics for butter-smooth progress tracking
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 160,
    damping: 28,
    restDelta: 0.001,
  })

  return (
    <div
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 h-[2.5px] z-[9999] pointer-events-none"
    >
      {/* Dynamic Laser Progress Beam with SPARKLINE signature fiery gradient */}
      <motion.div
        style={{ scaleX }}
        className="origin-left h-full bg-gradient-to-r from-[#FFB901] via-[#FF6A1A] to-[#EB4604] relative shadow-[0_1px_8px_rgba(235,70,4,0.4)]"
      >
        {/* White-Hot Leading Spark Tip */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-4 h-4 bg-[#FFB901]/40 rounded-full blur-[3px]" />
        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-2 h-2 bg-[#EB4604] rounded-full blur-[1px]" />
        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-1 h-1 bg-white rounded-full shadow-[0_0_6px_#ffffff,0_0_10px_#FFB901]" />
      </motion.div>
    </div>
  )
}
