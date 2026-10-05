'use client'

import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Sparkles, ShieldCheck, Heart, ExternalLink } from 'lucide-react'

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
                    src="/images/heroes/Glossy%20Pink%20Awareness%20Ribbon.png"
                    alt="Ruban rose Octobre Rose SPARKLINE"
                    width={208}
                    height={208}
                    priority
                    unoptimized
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
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-500/20 border border-pink-500/40 text-pink-300 text-[10.5px] sm:text-[11.5px] font-bold tracking-[0.2em] uppercase backdrop-blur-md shadow-[0_0_16px_rgba(244,63,94,0.35)] mb-2.5">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-pink-500 shadow-[0_0_8px_#F43F5E]" />
                  </span>
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
      {/* ─── 3. Awareness & Information Modal (Épuré Light Mode: Blanc & Rose) ─── */}
      <AnimatePresence>
        {isModalOpen && (
          <div
            onClick={() => setIsModalOpen(false)}
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/45 backdrop-blur-md animate-in fade-in duration-200 select-none"
          >
            <motion.div
              initial={{ scale: 0.94, opacity: 0, y: 14 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.94, opacity: 0, y: 14 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-lg bg-white/98 text-neutral-900 rounded-[32px] p-6 sm:p-8 border border-pink-100 shadow-[0_25px_70px_-12px_rgba(244,63,94,0.22),0_12px_32px_-8px_rgba(0,0,0,0.08),0_0_0_1px_rgba(255,241,242,0.9)] relative overflow-hidden"
            >
              {/* Top Soft Rose Ambient Glow */}
              <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-48 bg-gradient-to-b from-pink-200/50 via-rose-100/30 to-transparent blur-3xl pointer-events-none rounded-full" />

              {/* Close Button */}
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-5 right-5 w-9 h-9 rounded-full bg-pink-50 hover:bg-pink-100/80 border border-pink-200/60 flex items-center justify-center text-pink-700/80 hover:text-pink-900 transition-all duration-200 cursor-pointer z-20 shadow-sm"
                aria-label="Fermer la boîte de dialogue"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Modal Header */}
              <div className="relative z-10 flex items-start gap-4 mb-6">
                <div className="relative w-15 h-15 sm:w-16 sm:h-16 shrink-0 rounded-2xl bg-gradient-to-b from-pink-50 to-white border border-pink-200 shadow-[0_8px_20px_-6px_rgba(244,63,94,0.22)] ring-4 ring-pink-50/70 flex items-center justify-center">
                  <Image
                    src="/images/heroes/Glossy%20Pink%20Awareness%20Ribbon.png"
                    alt="Ruban rose"
                    width={80}
                    height={80}
                    unoptimized
                    className="w-10 h-10 sm:w-11 sm:h-11 object-contain drop-shadow-[0_4px_10px_rgba(244,63,94,0.35)]"
                  />
                </div>

                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-50 border border-pink-200 text-pink-700 text-[10.5px] font-bold tracking-wider uppercase mb-1.5 shadow-sm">
                    Campagne Nationale
                  </div>
                  <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight text-neutral-950">
                    Octobre Rose chez Sparkline
                  </h3>
                  <p className="text-xs sm:text-[13px] text-neutral-500 font-normal mt-0.5 leading-snug">
                    Ensemble, faisons rayonner la prévention & le dépistage précoce.
                  </p>
                </div>
              </div>

              {/* Key Prevention Stat Cards */}
              <div className="relative z-10 grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3 mb-5">
                <div className="p-3.5 sm:p-4 rounded-2xl bg-gradient-to-b from-pink-50/70 to-white border border-pink-100/90 shadow-[0_2px_10px_rgba(244,63,94,0.04)] text-center transition-all hover:border-pink-200">
                  <div className="text-xl sm:text-2xl font-black text-pink-600 tracking-tight">1 sur 8</div>
                  <p className="text-[11px] text-neutral-600 font-medium mt-1 leading-snug">
                    femme concernée au cours de sa vie
                  </p>
                </div>

                <div className="p-3.5 sm:p-4 rounded-2xl bg-gradient-to-b from-rose-50/70 to-white border border-rose-100/90 shadow-[0_2px_10px_rgba(244,63,94,0.04)] text-center transition-all hover:border-rose-200">
                  <div className="text-xl sm:text-2xl font-black text-rose-500 tracking-tight">90%</div>
                  <p className="text-[11px] text-neutral-600 font-medium mt-1 leading-snug">
                    de guérison si détecté à un stade précoce
                  </p>
                </div>

                <div className="p-3.5 sm:p-4 rounded-2xl bg-gradient-to-b from-pink-50/70 to-white border border-pink-100/90 shadow-[0_2px_10px_rgba(244,63,94,0.04)] text-center transition-all hover:border-pink-200">
                  <div className="text-xl sm:text-2xl font-black text-pink-700 tracking-tight">Dès 25 ans</div>
                  <p className="text-[11px] text-neutral-600 font-medium mt-1 leading-snug">
                    un examen clinique annuel recommandé
                  </p>
                </div>
              </div>

              {/* Core Message */}
              <div className="relative z-10 text-xs sm:text-[12.5px] text-neutral-700 leading-relaxed space-y-3 mb-6 bg-pink-50/45 p-4 sm:p-4.5 rounded-2xl border border-pink-100/80">
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-xl bg-white border border-pink-200/80 shadow-xs flex items-center justify-center text-pink-600 shrink-0 mt-0.5">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <p className="leading-snug">
                    <strong className="text-neutral-900 font-semibold">L'importance du dépistage :</strong> La mammographie de dépistage est prise en charge à 100% tous les deux ans pour les femmes de 50 à 74 ans.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-xl bg-white border border-pink-200/80 shadow-xs flex items-center justify-center text-pink-600 shrink-0 mt-0.5">
                    <Heart className="w-4 h-4" />
                  </div>
                  <p className="leading-snug">
                    <strong className="text-neutral-900 font-semibold">Prenez soin de vous :</strong> Parlez-en à vos proches, mères, sœurs, amies et collègues. Le dialogue et l'information sauvent des vies.
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="relative z-10 flex flex-col sm:flex-row items-center gap-2.5">
                <a
                  href="https://www.rubanrose.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-pink-600 via-rose-500 to-pink-600 hover:from-pink-700 hover:to-rose-600 text-white text-xs sm:text-[13px] font-semibold tracking-wide shadow-[0_6px_20px_rgba(244,63,94,0.35)] hover:shadow-[0_8px_25px_rgba(244,63,94,0.45)] hover:scale-[1.01] active:scale-[0.99] transition-all duration-200"
                >
                  <span>En savoir plus sur RubanRose.org</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="w-full sm:w-auto px-5 py-3 rounded-xl bg-neutral-100 hover:bg-neutral-200/80 text-neutral-700 text-xs sm:text-[13px] font-medium transition-colors cursor-pointer"
                >
                  Fermer
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}
