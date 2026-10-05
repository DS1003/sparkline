'use client'

import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { PinkOctoberModal } from './PinkOctoberModal'

interface OctobreRoseHeroSequenceProps {
  isHeroCompleted: boolean
  onDockComplete: () => void
  isDocked: boolean
  isModalOpen: boolean
  setIsModalOpen: (open: boolean) => void
}

type SequencePhase = 'idle' | 'center' | 'flying' | 'docked'

export function OctobreRoseHeroSequence({
  isHeroCompleted,
  onDockComplete,
  isDocked,
  isModalOpen,
  setIsModalOpen,
}: OctobreRoseHeroSequenceProps) {
  const [phase, setPhase] = useState<SequencePhase>(isDocked ? 'docked' : 'idle')
  const [flightVector, setFlightVector] = useState<{
    deltaX: number
    deltaY: number
    targetScale: number
  }>({
    deltaX: 0,
    deltaY: 0,
    targetScale: 0.28,
  })

  const centerRibbonRef = useRef<HTMLDivElement>(null)
  const hasTriggeredRef = useRef(false)

  // 1. Trigger center animation once the normal hero animation completes
  useEffect(() => {
    if (!isHeroCompleted || hasTriggeredRef.current || isDocked) return
    hasTriggeredRef.current = true

    // Graceful beat after hero title writing finishes before opening Octobre Rose showcase
    const timer = setTimeout(() => {
      setPhase('center')
    }, 400)

    return () => clearTimeout(timer)
  }, [isHeroCompleted, isDocked])

  // 2. Center stage duration -> Measure and trigger seamless fluid flight to logo dock
  useEffect(() => {
    if (phase !== 'center') return

    // Display in center for ~2.8s so users can fully absorb the message with backdrop blur
    const centerHoldTimer = setTimeout(() => {
      const dockEl = document.getElementById('octobre-rose-dock')
      const ribbonEl = centerRibbonRef.current

      if (dockEl && ribbonEl) {
        const dockRect = dockEl.getBoundingClientRect()
        const ribbonRect = ribbonEl.getBoundingClientRect()

        // Center-to-center displacement vector
        const centerRibbonX = ribbonRect.left + ribbonRect.width / 2
        const centerRibbonY = ribbonRect.top + ribbonRect.height / 2
        const targetDockX = dockRect.left + dockRect.width / 2
        const targetDockY = dockRect.top + dockRect.height / 2

        const deltaX = targetDockX - centerRibbonX
        const deltaY = targetDockY - centerRibbonY

        // Target dock ribbon size is ~36px (matching logo height)
        const currentSize = ribbonRect.height || 104
        const targetDockHeight = dockRect.height || 36
        const targetScale = Math.max(0.3, Math.min(0.42, targetDockHeight / currentSize))

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

  // Close awareness modal with Escape key
  useEffect(() => {
    if (!isModalOpen) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsModalOpen(false)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isModalOpen, setIsModalOpen])

  return (
    <>
      {/* ─── 1. Full-Screen Frosted Glass Scrim Backdrop (Blurs the rest of the screen) ─── */}
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
            {/* Ambient Radial Pink Flare in Center */}
            <motion.div
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{
                opacity: phase === 'center' ? 0.85 : 0,
                scale: phase === 'center' ? 1 : 0.75,
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.55, ease: 'easeOut' }}
              className="absolute w-[380px] h-[380px] sm:w-[500px] sm:h-[500px] bg-[radial-gradient(circle,rgba(244,63,94,0.28)_0%,rgba(244,63,94,0.08)_45%,transparent_70%)] rounded-full blur-3xl pointer-events-none"
            />

            {/* Central Stage: Unified column fully centered vertically & horizontally */}
            <div className="relative flex flex-col items-center justify-center text-center max-w-xl mx-auto px-4">
              {/* ── 3D Glossy Ribbon: Reveals at center, then glides in a pure fluid motion to the logo ── */}
              <div
                ref={centerRibbonRef}
                className="relative z-30 flex items-center justify-center w-[88px] h-[88px] sm:w-[100px] sm:h-[100px] mb-3 sm:mb-4"
              >
                {/* Radial pink halo underneath ribbon */}
                <motion.div
                  animate={{
                    opacity: phase === 'center' ? [0.65, 0.95, 0.65] : 0.35,
                    scale: phase === 'center' ? [0.95, 1.06, 0.95] : 0.7,
                  }}
                  transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute inset-0 bg-pink-500/40 rounded-full blur-xl pointer-events-none"
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
                        // Ultra-smooth, non-saccadé continuous glide to logo
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
                        // Deceleration curve for luxury cinematic glide
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
                  className="w-full h-full cursor-pointer pointer-events-auto filter drop-shadow-[0_12px_32px_rgba(244,63,94,0.65)]"
                >
                  <Image
                    src="/images/heroes/pink-october-ribbon-dock.webp"
                    alt="Ruban rose Octobre Rose SPARKLINE"
                    width={208}
                    height={208}
                    priority
                    className="w-full h-full object-contain"
                  />
                </motion.div>
              </div>

              {/* ── Text Container: Preserves layout space so ribbon never shifts on fade-out ── */}
              <motion.div
                initial={{ opacity: 0, y: 14, filter: 'blur(6px)' }}
                animate={{
                  opacity: phase === 'center' ? 1 : 0,
                  y: phase === 'center' ? 0 : -8,
                  filter: phase === 'center' ? 'blur(0px)' : 'blur(4px)',
                }}
                transition={{
                  duration: phase === 'center' ? 0.45 : 0.3,
                  delay: phase === 'center' ? 0.16 : 0,
                  ease: 'easeOut',
                }}
                className={`flex flex-col items-center text-center ${phase === 'center' ? 'pointer-events-auto cursor-pointer' : 'pointer-events-none'
                  }`}
                onClick={() => setIsModalOpen(true)}
              >
                {/* Badge Tag: OCTOBRE ROSE */}
                <div className="inline-flex items-center px-3.5 py-1 rounded-full bg-pink-500/20 border border-pink-500/40 text-pink-300 text-[10.5px] sm:text-[11.5px] font-bold tracking-[0.2em] uppercase backdrop-blur-md shadow-[0_0_16px_rgba(244,63,94,0.35)] mb-2.5">
                  <span>OCTOBRE ROSE</span>
                </div>

                {/* Headline */}
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight leading-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)] mb-2">
                  Ensemble, faisons rayonner
                  <br />
                  <span className="bg-gradient-to-r from-pink-300 via-rose-200 to-pink-400 bg-clip-text text-transparent drop-shadow-[0_0_12px_rgba(244,63,94,0.5)]">
                    la prévention.
                  </span>
                </h3>

                {/* Subtitle */}
                <p className="text-xs sm:text-sm text-neutral-300 font-normal max-w-sm mx-auto leading-relaxed drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)]">
                  Mois de sensibilisation au dépistage du cancer du sein.
                </p>
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* ─── 3. Awareness & Information Modal ─── */}
      <PinkOctoberModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  )
}
