'use client'

import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { HolidayModal } from './HolidayModal'

interface HolidayHeroSequenceProps {
  isHeroCompleted: boolean
  onDockComplete: () => void
  isDocked: boolean
  isModalOpen: boolean
  setIsModalOpen: (open: boolean) => void
}

type SequencePhase = 'idle' | 'center' | 'flying' | 'docked'

export function HolidayHeroSequence({
  isHeroCompleted,
  onDockComplete,
  isDocked,
  isModalOpen,
  setIsModalOpen,
}: HolidayHeroSequenceProps) {
  const [phase, setPhase] = useState<SequencePhase>(isDocked ? 'docked' : 'idle')
  const [flightVector, setFlightVector] = useState<{
    deltaX: number
    deltaY: number
    targetScale: number
  }>({
    deltaX: 0,
    deltaY: 0,
    targetScale: 0.32,
  })

  const centerOrnamentRef = useRef<HTMLDivElement>(null)
  const hasTriggeredRef = useRef(false)

  // 1. Trigger center animation once the normal hero animation completes
  useEffect(() => {
    if (!isHeroCompleted || hasTriggeredRef.current || isDocked) return
    hasTriggeredRef.current = true

    // Graceful beat after hero title writing finishes before opening holiday showcase
    const timer = setTimeout(() => {
      setPhase('center')
    }, 400)

    return () => clearTimeout(timer)
  }, [isHeroCompleted, isDocked])

  // 2. Center stage duration -> Measure and trigger seamless fluid flight to logo dock
  useEffect(() => {
    if (phase !== 'center') return

    // Display in center for ~2.8s so users can fully absorb the holiday message with backdrop blur
    const centerHoldTimer = setTimeout(() => {
      const dockEl = document.getElementById('holiday-dock') || document.getElementById('octobre-rose-dock')
      const ornamentEl = centerOrnamentRef.current

      if (dockEl && ornamentEl) {
        const dockRect = dockEl.getBoundingClientRect()
        const ornamentRect = ornamentEl.getBoundingClientRect()

        // Center-to-center displacement vector
        const centerOrnamentX = ornamentRect.left + ornamentRect.width / 2
        const centerOrnamentY = ornamentRect.top + ornamentRect.height / 2
        const targetDockX = dockRect.left + dockRect.width / 2
        const targetDockY = dockRect.top + dockRect.height / 2

        const deltaX = targetDockX - centerOrnamentX
        const deltaY = targetDockY - centerOrnamentY

        // Target dock ornament size is ~38px
        const currentSize = ornamentRect.height || 104
        const targetDockHeight = dockRect.height || 38
        const targetScale = Math.max(0.32, Math.min(0.44, targetDockHeight / currentSize))

        setFlightVector({ deltaX, deltaY, targetScale })
      } else {
        // Safe fallback vector toward top-left navbar
        const isMobile = typeof window !== 'undefined' && window.innerWidth < 768
        setFlightVector({
          deltaX: isMobile ? -window.innerWidth * 0.32 : -window.innerWidth * 0.38,
          deltaY: isMobile ? -window.innerHeight * 0.32 : -window.innerHeight * 0.36,
          targetScale: 0.36,
        })
      }

      setPhase('flying')
    }, 2800)

    return () => clearTimeout(centerHoldTimer)
  }, [phase])

  return (
    <>
      {/* ─── 1. Full-Screen Frosted Glass Scrim Backdrop ─── */}
      <AnimatePresence>
        {(phase === 'center' || phase === 'flying') && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{
              opacity: phase === 'center' ? 1 : 0,
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: phase === 'center' ? 0.45 : 0.65,
              ease: 'easeInOut',
            }}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-md pointer-events-none"
          />
        )}
      </AnimatePresence>

      {/* ─── 2. Center Stage & Fluid Flight Presentation Layer ─── */}
      <AnimatePresence>
        {(phase === 'center' || phase === 'flying') && (
          <div className="fixed inset-0 z-40 pointer-events-none flex items-center justify-center select-none overflow-visible">
            {/* Ambient Radial Champagne Flare in Center */}
            <motion.div
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{
                opacity: phase === 'center' ? 0.85 : 0,
                scale: phase === 'center' ? 1 : 0.75,
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.55, ease: 'easeOut' }}
              className="absolute w-[380px] h-[380px] sm:w-[500px] sm:h-[500px] bg-[radial-gradient(circle,rgba(217,119,6,0.32)_0%,rgba(217,119,6,0.08)_45%,transparent_70%)] rounded-full blur-3xl pointer-events-none"
            />

            {/* Central Stage: Fully centered vertically & horizontally */}
            <div className="relative flex flex-col items-center justify-center text-center max-w-xl mx-auto px-4">
              {/* ── 3D Glossy Starburst Ornament: Reveals at center, then glides to the logo ── */}
              <div
                ref={centerOrnamentRef}
                className="relative z-30 flex items-center justify-center w-[92px] h-[92px] sm:w-[108px] sm:h-[108px] mb-3 sm:mb-4"
              >
                {/* Radial warm golden halo underneath ornament */}
                <motion.div
                  animate={{
                    opacity: phase === 'center' ? [0.65, 0.95, 0.65] : 0.35,
                    scale: phase === 'center' ? [0.95, 1.08, 0.95] : 0.7,
                  }}
                  transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute inset-0 bg-amber-500/35 rounded-full blur-xl pointer-events-none"
                />

                <motion.div
                  initial={{ scale: 0.2, opacity: 0, y: 30, rotate: -6 }}
                  animate={
                    phase === 'center'
                      ? {
                        scale: 1,
                        opacity: 1,
                        x: 0,
                        y: 0,
                        rotate: 0,
                      }
                      : {
                        x: flightVector.deltaX,
                        y: flightVector.deltaY,
                        scale: flightVector.targetScale,
                        rotate: -2,
                        opacity: 1,
                      }
                  }
                  transition={
                    phase === 'center'
                      ? {
                        type: 'spring',
                        damping: 18,
                        stiffness: 200,
                        mass: 0.8,
                      }
                      : {
                        duration: 0.95,
                        ease: [0.16, 1, 0.3, 1],
                      }
                  }
                  onAnimationComplete={() => {
                    if (phase === 'flying') {
                      setPhase('docked')
                      onDockComplete()
                    }
                  }}
                  onClick={() => setIsModalOpen(true)}
                  className="w-full h-full cursor-pointer pointer-events-auto filter drop-shadow-[0_12px_32px_rgba(217,119,6,0.65)]"
                >
                  <Image
                    src="/images/heroes/holiday-starburst-ornament.webp"
                    alt="Emblème de Noël SPARKLINE"
                    width={216}
                    height={216}
                    priority
                    className="w-full h-full object-contain"
                  />
                </motion.div>
              </div>

              {/* ── Text Container ── */}
              <motion.div
                initial={{ opacity: 0, y: 14, filter: 'blur(6px)' }}
                animate={{
                  opacity: phase === 'center' ? 1 : 0,
                  y: phase === 'center' ? 0 : -8,
                  filter: phase === 'center' ? 'blur(0px)' : 'blur(4px)',
                }}
                transition={{
                  duration: phase === 'center' ? 0.55 : 0.35,
                  delay: phase === 'center' ? 0.15 : 0,
                  ease: 'easeOut',
                }}
                className="flex flex-col items-center justify-center text-center"
              >
                {/* Tag Pill */}
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-400/35 text-amber-300 text-[10px] sm:text-[11px] font-bold tracking-[0.2em] uppercase mb-2 shadow-[0_0_16px_rgba(217,119,6,0.3)]">
                  ✨ FÊTES DE FIN D'ANNÉE • SPARKLINE
                </span>

                {/* Slogan Lines */}
                <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight text-white leading-tight drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
                  Célébrons l'audace,{' '}
                  <span className="bg-gradient-to-r from-amber-200 via-amber-100 to-yellow-300 bg-clip-text text-transparent drop-shadow-[0_0_16px_rgba(245,158,11,0.6)]">
                    faisons rayonner vos ambitions.
                  </span>
                </h2>

                <p className="text-xs sm:text-sm text-neutral-300 mt-1.5 max-w-md font-normal leading-relaxed drop-shadow-[0_1px_6px_rgba(0,0,0,0.9)]">
                  Toute l'équipe SPARKLINE vous souhaite de lumineuses fêtes et un cap ambitieux vers la nouvelle année.
                </p>

                {/* Micro Hint */}
                <span className="inline-flex items-center gap-1 text-[11px] text-amber-200/80 mt-2 font-mono">
                  <span>Cliquez sur l'emblème pour découvrir nos vœux</span>
                  <span className="text-xs">↗</span>
                </span>
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* ─── 3. Full Holiday Interactive Modal ─── */}
      <HolidayModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  )
}
