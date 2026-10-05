'use client'

import React, { useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ExternalLink } from 'lucide-react'

interface PinkOctoberModalProps {
  isOpen: boolean
  onClose: () => void
}

export function PinkOctoberModal({ isOpen, onClose }: PinkOctoberModalProps) {
  // Close with Escape key
  useEffect(() => {
    if (!isOpen) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-md select-none"
        >
          <motion.div
            initial={{ scale: 0.94, opacity: 0, y: 16 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.94, opacity: 0, y: 16 }}
            transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-[620px] max-h-[92vh] flex flex-col bg-white text-neutral-900 rounded-[28px] sm:rounded-[32px] border border-[#FFE4EC] shadow-[0_25px_70px_-12px_rgba(233,30,99,0.22),0_12px_32px_-8px_rgba(0,0,0,0.06),0_0_0_1px_rgba(255,240,243,0.9)] overflow-hidden"
          >
            {/* ── Top-Right Flowing Corner Ribbon Decoration ── */}
            <div className="absolute top-0 right-0 w-44 sm:w-56 md:w-64 h-36 sm:h-44 md:h-52 pointer-events-none z-0 select-none opacity-90 sm:opacity-100 overflow-hidden">
              <Image
                src="/images/heroes/ChatGPT%20Image%20Oct%205,%202026,%2010_22_38%20PM-1.png"
                alt=""
                fill
                priority
                unoptimized
                className="object-contain object-top-right"
              />
            </div>

            {/* Soft Ambient Rose Blush Glow in Header */}
            <div className="absolute top-0 right-0 w-64 h-48 bg-pink-100/50 blur-3xl rounded-full pointer-events-none" />

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 sm:top-5 sm:right-5 z-20 w-8 h-8 sm:w-8.5 sm:h-8.5 rounded-full bg-white/90 hover:bg-white text-neutral-400 hover:text-neutral-700 shadow-[0_2px_8px_rgba(0,0,0,0.08)] border border-pink-100/80 flex items-center justify-center transition-all duration-200 cursor-pointer"
              aria-label="Fermer la boîte de dialogue"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Scrollable Modal Content Container */}
            <div className="overflow-y-auto p-5 sm:p-7 md:p-8 space-y-4 sm:space-y-5 relative z-10">
              {/* ── 1. Modal Header ── */}
              <div className="flex items-start gap-3.5 sm:gap-4 pr-10 sm:pr-14">
                {/* 3D Ribbon Badge */}
                <div className="relative w-14 h-14 sm:w-16 sm:h-16 shrink-0 rounded-2xl bg-gradient-to-b from-[#FFF5F8] to-white border border-[#FFDCE5] shadow-[0_6px_18px_rgba(244,63,94,0.14)] ring-4 ring-[#FFF0F4] flex items-center justify-center">
                  <Image
                    src="/images/heroes/ChatGPT%20Image%20Oct%205,%202026,%2010_22_40%20PM-2.png"
                    alt="Ruban rose"
                    width={80}
                    height={80}
                    unoptimized
                    priority
                    className="w-10 h-10 sm:w-11 sm:h-11 object-contain drop-shadow-[0_2px_8px_rgba(244,63,94,0.3)]"
                  />
                </div>

                <div className="flex flex-col">
                  {/* Tag Pill */}
                  <div className="self-start inline-flex items-center px-3 py-0.5 sm:py-1 rounded-full bg-[#FFF0F4] border border-[#FFD6E2] text-[#D81B60] text-[10px] sm:text-[10.5px] font-bold tracking-[0.14em] uppercase mb-1 shadow-2xs">
                    CAMPAGNE OCTOBRE ROSE
                  </div>

                  {/* Title */}
                  <h3 className="text-lg sm:text-[22px] md:text-[23px] font-extrabold tracking-tight text-neutral-900 leading-tight">
                    Octobre Rose chez Sparkline
                  </h3>

                  {/* Subtitle */}
                  <p className="text-xs sm:text-[13px] text-neutral-500 font-normal mt-0.5 leading-snug">
                    Ensemble, faisons rayonner la prévention et le dépistage précoce.
                  </p>
                </div>
              </div>

              {/* ── 2. Stat Cards (3 Columns) ── */}
              <div className="grid grid-cols-3 gap-2 sm:gap-3">
                {/* Stat 1: 1 sur 8 */}
                <div className="p-2.5 sm:p-4 rounded-2xl bg-white border border-[#FFE4EC] shadow-[0_2px_12px_rgba(244,63,94,0.04)] flex flex-col items-center text-center transition-all hover:border-pink-200">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 relative mb-1.5 sm:mb-2 shrink-0">
                    <Image
                      src="/images/heroes/ChatGPT%20Image%20Oct%205,%202026,%2010_22_42%20PM-3.png"
                      alt="Femmes concernées"
                      width={48}
                      height={48}
                      unoptimized
                      className="w-full h-full object-contain drop-shadow-[0_2px_6px_rgba(244,63,94,0.2)]"
                    />
                  </div>
                  <div className="text-sm sm:text-xl md:text-2xl font-black text-[#D81B60] tracking-tight">
                    1 sur 8
                  </div>
                  <p className="text-[9.5px] sm:text-[11.5px] text-neutral-600 font-normal mt-0.5 leading-tight sm:leading-snug">
                    femme est concernée
                    <br />
                    au cours de sa vie.
                  </p>
                </div>

                {/* Stat 2: 90% */}
                <div className="p-2.5 sm:p-4 rounded-2xl bg-white border border-[#FFE4EC] shadow-[0_2px_12px_rgba(244,63,94,0.04)] flex flex-col items-center text-center transition-all hover:border-pink-200">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 relative mb-1.5 sm:mb-2 shrink-0">
                    <Image
                      src="/images/heroes/ChatGPT%20Image%20Oct%205,%202026,%2010_22_44%20PM-4.png"
                      alt="Guérison précoce"
                      width={48}
                      height={48}
                      unoptimized
                      className="w-full h-full object-contain drop-shadow-[0_2px_6px_rgba(244,63,94,0.2)]"
                    />
                  </div>
                  <div className="text-sm sm:text-xl md:text-2xl font-black text-[#D81B60] tracking-tight">
                    90%
                  </div>
                  <p className="text-[9.5px] sm:text-[11.5px] text-neutral-600 font-normal mt-0.5 leading-tight sm:leading-snug">
                    de guérison si
                    <br />
                    détecté à un stade précoce.
                  </p>
                </div>

                {/* Stat 3: Dès 25 ans */}
                <div className="p-2.5 sm:p-4 rounded-2xl bg-white border border-[#FFE4EC] shadow-[0_2px_12px_rgba(244,63,94,0.04)] flex flex-col items-center text-center transition-all hover:border-pink-200">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 relative mb-1.5 sm:mb-2 shrink-0">
                    <Image
                      src="/images/heroes/ChatGPT%20Image%20Oct%205,%202026,%2010_22_45%20PM-5.png"
                      alt="Examen clinique"
                      width={48}
                      height={48}
                      unoptimized
                      className="w-full h-full object-contain drop-shadow-[0_2px_6px_rgba(244,63,94,0.2)]"
                    />
                  </div>
                  <div className="text-sm sm:text-xl md:text-2xl font-black text-[#D81B60] tracking-tight whitespace-nowrap">
                    Dès 25 ans
                  </div>
                  <p className="text-[9.5px] sm:text-[11.5px] text-neutral-600 font-normal mt-0.5 leading-tight sm:leading-snug">
                    un examen clinique
                    <br />
                    annuel est recommandé.
                  </p>
                </div>
              </div>

              {/* ── 3. Information List Rows (3 Items) ── */}
              <div className="bg-[#FFF8FA] rounded-2xl border border-[#FFE4EC] p-3.5 sm:p-4.5 space-y-3 sm:space-y-3.5">
                {/* Row 1: Le dépistage sauve des vies */}
                <div className="flex items-start gap-2.5 sm:gap-3.5">
                  <div className="w-7 h-7 sm:w-8.5 sm:h-8.5 relative shrink-0 mt-0.5">
                    <Image
                      src="/images/heroes/ChatGPT%20Image%20Oct%205,%202026,%2010_22_46%20PM-6.png"
                      alt="Bouclier dépistage"
                      width={40}
                      height={40}
                      unoptimized
                      className="w-full h-full object-contain drop-shadow-[0_2px_6px_rgba(244,63,94,0.18)]"
                    />
                  </div>
                  <div className="flex flex-col">
                    <strong className="text-xs sm:text-[13px] font-bold text-neutral-900 leading-snug">
                      Le dépistage sauve des vies
                    </strong>
                    <p className="text-[11px] sm:text-[12px] text-neutral-600 leading-relaxed mt-0.5">
                      La mammographie de dépistage est prise en charge à 100% tous les deux ans pour les femmes de 50 à 74 ans.
                    </p>
                  </div>
                </div>

                {/* Row 2: Parlez-en autour de vous */}
                <div className="flex items-start gap-2.5 sm:gap-3.5">
                  <div className="w-7 h-7 sm:w-8.5 sm:h-8.5 relative shrink-0 mt-0.5">
                    <Image
                      src="/images/heroes/ChatGPT%20Image%20Oct%205,%202026,%2010_22_48%20PM-7.png"
                      alt="Dialogue et écoute"
                      width={40}
                      height={40}
                      unoptimized
                      className="w-full h-full object-contain drop-shadow-[0_2px_6px_rgba(244,63,94,0.18)]"
                    />
                  </div>
                  <div className="flex flex-col">
                    <strong className="text-xs sm:text-[13px] font-bold text-neutral-900 leading-snug">
                      Parlez-en autour de vous
                    </strong>
                    <p className="text-[11px] sm:text-[12px] text-neutral-600 leading-relaxed mt-0.5">
                      Échangez avec vos proches, mères, sœurs, amies et collègues. Le dialogue et l'information sauvent des vies.
                    </p>
                  </div>
                </div>

                {/* Row 3: Agissons ensemble */}
                <div className="flex items-start gap-2.5 sm:gap-3.5">
                  <div className="w-7 h-7 sm:w-8.5 sm:h-8.5 relative shrink-0 mt-0.5">
                    <Image
                      src="/images/heroes/ChatGPT%20Image%20Oct%205,%202026,%2010_22_49%20PM-8.png"
                      alt="Agissons ensemble"
                      width={40}
                      height={40}
                      unoptimized
                      className="w-full h-full object-contain drop-shadow-[0_2px_6px_rgba(244,63,94,0.18)]"
                    />
                  </div>
                  <div className="flex flex-col">
                    <strong className="text-xs sm:text-[13px] font-bold text-neutral-900 leading-snug">
                      Agissons ensemble
                    </strong>
                    <p className="text-[11px] sm:text-[12px] text-neutral-600 leading-relaxed mt-0.5">
                      La prévention, l'écoute et un suivi régulier permettent de détecter plus tôt et d'augmenter considérablement les chances de guérison.
                    </p>
                  </div>
                </div>
              </div>

              {/* ── 4. Action Buttons ── */}
              <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 pt-1">
                <a
                  href="https://www.rubanrose.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-[#E91E63] via-[#E11D5A] to-[#D81B60] hover:from-[#D81B60] hover:to-[#C2185B] text-white text-xs sm:text-[13px] font-semibold tracking-wide shadow-[0_6px_20px_rgba(233,30,99,0.35)] hover:shadow-[0_8px_25px_rgba(233,30,99,0.45)] hover:scale-[1.01] active:scale-[0.99] transition-all duration-200"
                >
                  <span>En savoir plus sur RubanRose.org</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <button
                  type="button"
                  onClick={onClose}
                  className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-[#F5F5F7] hover:bg-[#EBEBED] text-neutral-700 text-xs sm:text-[13px] font-medium transition-colors cursor-pointer"
                >
                  Fermer
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
