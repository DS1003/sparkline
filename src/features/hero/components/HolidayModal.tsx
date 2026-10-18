'use client'

import React, { useEffect } from 'react'
import Image from 'next/image'
import { X, Sparkles, ExternalLink, ArrowRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface HolidayModalProps {
  isOpen: boolean
  onClose: () => void
}

export function HolidayModal({ isOpen, onClose }: HolidayModalProps) {
  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  // Lock background scroll when open
  useEffect(() => {
    if (isOpen) {
      const prevOverflow = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      return () => {
        document.body.style.overflow = prevOverflow
      }
    }
  }, [isOpen])

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/65 backdrop-blur-md select-none"
        >
          <motion.div
            initial={{ scale: 0.94, opacity: 0, y: 16 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.94, opacity: 0, y: 16 }}
            transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-[620px] max-h-[92vh] flex flex-col bg-white text-neutral-900 rounded-[28px] sm:rounded-[32px] border border-[#FDE68A]/60 shadow-[0_25px_70px_-12px_rgba(217,119,6,0.25),0_12px_32px_-8px_rgba(0,0,0,0.06),0_0_0_1px_rgba(254,243,199,0.9)] overflow-hidden"
          >
            {/* ── Top-Right Flowing Corner Ribbon Decoration ── */}
            <div className="absolute top-0 right-0 w-44 sm:w-56 md:w-64 h-36 sm:h-44 md:h-52 pointer-events-none z-0 select-none opacity-90 sm:opacity-100 overflow-hidden">
              <Image
                src="/images/heroes/holiday-corner-ribbon.webp"
                alt=""
                fill
                priority
                className="object-contain object-top-right"
              />
            </div>

            {/* Soft Ambient Champagne Gold Glow in Header */}
            <div className="absolute top-0 right-0 w-64 h-48 bg-amber-100/60 blur-3xl rounded-full pointer-events-none" />

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 sm:top-5 sm:right-5 z-20 w-8 h-8 sm:w-8.5 sm:h-8.5 rounded-full bg-white/90 hover:bg-white text-neutral-400 hover:text-neutral-700 shadow-[0_2px_8px_rgba(0,0,0,0.08)] border border-amber-100 flex items-center justify-center transition-all duration-200 cursor-pointer"
              aria-label="Fermer la boîte de dialogue"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Scrollable Modal Content Container */}
            <div className="overflow-y-auto p-5 sm:p-7 md:p-8 space-y-4 sm:space-y-5 relative z-10">
              {/* ── 1. Modal Header ── */}
              <div className="flex items-start gap-3.5 sm:gap-4 pr-10 sm:pr-14">
                {/* 3D Starburst Ornament Badge */}
                <div className="relative w-14 h-14 sm:w-16 sm:h-16 shrink-0 rounded-2xl bg-gradient-to-b from-[#FFFBEB] to-white border border-[#FDE68A] shadow-[0_6px_18px_rgba(217,119,6,0.18)] ring-4 ring-[#FEF3C7]/60 flex items-center justify-center">
                  <Image
                    src="/images/heroes/holiday-starburst-ornament.webp"
                    alt="Emblème de Noël SPARKLINE"
                    width={80}
                    height={80}
                    priority
                    className="w-11 h-11 sm:w-12 sm:h-12 object-contain drop-shadow-[0_2px_8px_rgba(217,119,6,0.35)]"
                  />
                </div>

                <div className="flex flex-col">
                  {/* Tag Pill */}
                  <div className="self-start inline-flex items-center gap-1.5 px-3 py-0.5 sm:py-1 rounded-full bg-[#FEF3C7] border border-[#FDE68A] text-[#B45309] text-[10px] sm:text-[10.5px] font-bold tracking-[0.14em] uppercase mb-1 shadow-2xs">
                    <Sparkles className="w-3 h-3 text-[#D97706]" />
                    <span>CÉLÉBRATION & FÊTES DE FIN D'ANNÉE</span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg sm:text-[22px] md:text-[23px] font-extrabold tracking-tight text-neutral-900 leading-tight">
                    Meilleurs Vœux de l'équipe SPARKLINE
                  </h3>

                  {/* Subtitle */}
                  <p className="text-xs sm:text-[13px] text-neutral-500 font-normal mt-0.5 leading-snug">
                    Célébrons les réussites partagées et préparons ensemble un futur digital d'exception.
                  </p>
                </div>
              </div>

              {/* ── 2. Key Pillars / Highlight Cards (3 Columns) ── */}
              <div className="grid grid-cols-3 gap-2 sm:gap-3">
                {/* Card 1: Innovation & Impact */}
                <div className="p-2.5 sm:p-4 rounded-2xl bg-white border border-[#FDE68A]/70 shadow-[0_2px_12px_rgba(217,119,6,0.06)] flex flex-col items-center text-center transition-all hover:border-amber-300">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 relative mb-1.5 sm:mb-2 shrink-0">
                    <Image
                      src="/images/heroes/holiday-icon-star.webp"
                      alt="Étoile Innovation"
                      width={48}
                      height={48}
                      className="w-full h-full object-contain drop-shadow-[0_2px_6px_rgba(217,119,6,0.25)]"
                    />
                  </div>
                  <div className="text-sm sm:text-xl md:text-2xl font-black text-[#B45309] tracking-tight">
                    +100%
                  </div>
                  <p className="text-[9.5px] sm:text-[11.5px] text-neutral-600 font-normal mt-0.5 leading-tight sm:leading-snug">
                    d'audace & d'impact
                    <br />
                    sur vos projets digitaux.
                  </p>
                </div>

                {/* Card 2: Gratitude & Partenariats */}
                <div className="p-2.5 sm:p-4 rounded-2xl bg-white border border-[#FDE68A]/70 shadow-[0_2px_12px_rgba(217,119,6,0.06)] flex flex-col items-center text-center transition-all hover:border-amber-300">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 relative mb-1.5 sm:mb-2 shrink-0">
                    <Image
                      src="/images/heroes/holiday-icon-gift.webp"
                      alt="Écrin Partenariat"
                      width={48}
                      height={48}
                      className="w-full h-full object-contain drop-shadow-[0_2px_6px_rgba(217,119,6,0.25)]"
                    />
                  </div>
                  <div className="text-sm sm:text-xl md:text-2xl font-black text-[#B45309] tracking-tight">
                    Confiance
                  </div>
                  <p className="text-[9.5px] sm:text-[11.5px] text-neutral-600 font-normal mt-0.5 leading-tight sm:leading-snug">
                    partagée avec nos
                    <br />
                    clients et partenaires.
                  </p>
                </div>

                {/* Card 3: Horizon & Cap 2027 */}
                <div className="p-2.5 sm:p-4 rounded-2xl bg-white border border-[#FDE68A]/70 shadow-[0_2px_12px_rgba(217,119,6,0.06)] flex flex-col items-center text-center transition-all hover:border-amber-300">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 relative mb-1.5 sm:mb-2 shrink-0">
                    <Image
                      src="/images/heroes/holiday-icon-hourglass.webp"
                      alt="Sablier Horizon"
                      width={48}
                      height={48}
                      className="w-full h-full object-contain drop-shadow-[0_2px_6px_rgba(217,119,6,0.25)]"
                    />
                  </div>
                  <div className="text-sm sm:text-xl md:text-2xl font-black text-[#B45309] tracking-tight whitespace-nowrap">
                    Cap 2027
                  </div>
                  <p className="text-[9.5px] sm:text-[11.5px] text-neutral-600 font-normal mt-0.5 leading-tight sm:leading-snug">
                    bâtissons ensemble
                    <br />
                    la nouvelle ère tech.
                  </p>
                </div>
              </div>

              {/* ── 3. Information List Rows (3 Items) ── */}
              <div className="bg-[#FFFDF7] rounded-2xl border border-[#FDE68A]/60 p-3.5 sm:p-4.5 space-y-3 sm:space-y-3.5">
                {/* Row 1: Une année de création */}
                <div className="flex items-start gap-2.5 sm:gap-3.5">
                  <div className="w-7 h-7 sm:w-8.5 sm:h-8.5 relative shrink-0 mt-0.5">
                    <Image
                      src="/images/heroes/holiday-icon-snowflake.webp"
                      alt="Flocon Création"
                      width={40}
                      height={40}
                      className="w-full h-full object-contain drop-shadow-[0_2px_6px_rgba(217,119,6,0.2)]"
                    />
                  </div>
                  <div className="flex flex-col">
                    <strong className="text-xs sm:text-[13px] font-bold text-neutral-900 leading-snug">
                      Une année de création et de défis relevés
                    </strong>
                    <p className="text-[11px] sm:text-[12px] text-neutral-600 leading-relaxed mt-0.5">
                      Merci à l'ensemble de nos clients et collaborateurs d'avoir fait rayonner nos plateformes, designs et innovations technologiques.
                    </p>
                  </div>
                </div>

                {/* Row 2: La confiance au cœur de chaque relation */}
                <div className="flex items-start gap-2.5 sm:gap-3.5">
                  <div className="w-7 h-7 sm:w-8.5 sm:h-8.5 relative shrink-0 mt-0.5">
                    <Image
                      src="/images/heroes/holiday-icon-heart.webp"
                      alt="Cœur Confiance"
                      width={40}
                      height={40}
                      className="w-full h-full object-contain drop-shadow-[0_2px_6px_rgba(217,119,6,0.2)]"
                    />
                  </div>
                  <div className="flex flex-col">
                    <strong className="text-xs sm:text-[13px] font-bold text-neutral-900 leading-snug">
                      La confiance au cœur de chaque partenariat
                    </strong>
                    <p className="text-[11px] sm:text-[12px] text-neutral-600 leading-relaxed mt-0.5">
                      Parce que les produits d'exception reposent d'abord sur une relation humaine forte, nous nous engageons chaque jour pour votre succès.
                    </p>
                  </div>
                </div>

                {/* Row 3: Ensemble vers de nouveaux sommets */}
                <div className="flex items-start gap-2.5 sm:gap-3.5">
                  <div className="w-7 h-7 sm:w-8.5 sm:h-8.5 relative shrink-0 mt-0.5">
                    <Image
                      src="/images/heroes/holiday-icon-champagne.webp"
                      alt="Champagne Célébration"
                      width={40}
                      height={40}
                      className="w-full h-full object-contain drop-shadow-[0_2px_6px_rgba(217,119,6,0.2)]"
                    />
                  </div>
                  <div className="flex flex-col">
                    <strong className="text-xs sm:text-[13px] font-bold text-neutral-900 leading-snug">
                      Ensemble vers de nouveaux sommets
                    </strong>
                    <p className="text-[11px] sm:text-[12px] text-neutral-600 leading-relaxed mt-0.5">
                      Préparez dès à présent vos lancements majeurs, vos refontes et votre transformation digitale avec l'ingénierie et le design SPARKLINE.
                    </p>
                  </div>
                </div>
              </div>

              {/* ── 4. Action Buttons ── */}
              <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 pt-1">
                <a
                  href="/contact"
                  className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 sm:py-3 rounded-xl bg-gradient-to-r from-[#D97706] via-[#B45309] to-[#92400E] hover:from-[#B45309] hover:to-[#78350F] text-white text-xs sm:text-[13px] font-bold tracking-wide shadow-[0_4px_16px_rgba(217,119,6,0.35)] transition-all duration-200"
                >
                  <span>Démarrer un projet pour la nouvelle année</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>

                <button
                  type="button"
                  onClick={onClose}
                  className="w-full sm:w-auto px-4 py-2.5 sm:py-3 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-700 text-xs sm:text-[13px] font-semibold transition-colors cursor-pointer"
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
