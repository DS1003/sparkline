'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { PinkOctoberModal } from './PinkOctoberModal'

interface PinkOctoberBadgeProps {
  className?: string
  variant?: 'floating' | 'inline'
}

export function PinkOctoberBadge({ className = '', variant = 'floating' }: PinkOctoberBadgeProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      {/* ─── Main Badge Component ─── */}
      {variant === 'floating' ? (
        <div
          role="button"
          tabIndex={0}
          onClick={() => setIsModalOpen(true)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault()
              setIsModalOpen(true)
            }
          }}
          title="Octobre Rose • Ensemble pour la prévention (Cliquez pour en savoir plus)"
          aria-label="Octobre Rose : Ensemble, faisons rayonner la prévention. Cliquez pour en savoir plus."
          className={`group relative cursor-pointer select-none transition-all duration-300 hover:scale-[1.02] focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-400/80 rounded-2xl ${className}`}
        >
          {/* Soft Diffused Atmospheric Backlight Halo */}
          <div className="absolute -inset-3 bg-gradient-to-r from-pink-500/25 via-rose-500/15 to-transparent rounded-full blur-2xl opacity-70 group-hover:opacity-100 group-hover:from-pink-500/45 transition-all duration-500 pointer-events-none" />

          {/* Seamless Floating Container (Zero dark box artifact) */}
          <div className="relative flex items-center gap-3 sm:gap-3.5 transition-all duration-300">
            {/* 3D Glossy Ribbon with Levitation Floating Animation */}
            <div className="relative shrink-0 flex items-center justify-center">
              {/* Radial Pink Aura directly beneath ribbon */}
              <div className="absolute inset-0 bg-pink-500/35 rounded-full blur-xl animate-pink-aura pointer-events-none" />

              <div className="relative w-[72px] h-[72px] sm:w-[78px] sm:h-[78px] xl:w-[84px] xl:h-[84px] animate-pink-ribbon">
                <Image
                  src="/images/heroes/Glossy%20Pink%20Awareness%20Ribbon.png"
                  alt="Ruban rose Octobre Rose SPARKLINE"
                  width={168}
                  height={168}
                  priority
                  unoptimized
                  className="w-full h-full object-contain drop-shadow-[0_8px_24px_rgba(244,63,94,0.55)] group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>

            {/* Typography & Luminous Wave Composition */}
            <div className="flex flex-col justify-center text-left">
              {/* Tag / Header: OCTOBRE ROSE */}
              <div className="flex items-center mb-0.5">
                <span className="text-[10.5px] sm:text-[11px] font-bold tracking-[0.18em] uppercase bg-gradient-to-r from-pink-200 via-rose-100 to-pink-300 bg-clip-text text-transparent drop-shadow-[0_0_8px_rgba(244,63,94,0.5)]">
                  OCTOBRE ROSE
                </span>
              </div>

              {/* Slogan Line 1 */}
              <p className="text-[12.5px] sm:text-[13px] font-normal text-white/95 leading-[1.3] drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)]">
                Ensemble, faisons rayonner
              </p>

              {/* Slogan Line 2 + Continuous Luminous Neon Wave Trace */}
              <div className="flex items-center gap-1.5 overflow-visible">
                <span className="text-[12.5px] sm:text-[13px] font-medium text-white leading-[1.3] drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)] whitespace-nowrap">
                  la prévention.
                </span>

                {/* Luminous Neon Wave & Spark Beacon Line */}
                <div className="relative inline-flex items-center overflow-visible">
                  <svg
                    width="110"
                    height="22"
                    viewBox="0 0 110 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="overflow-visible"
                  >
                    <defs>
                      <linearGradient id="pinkWaveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#FB7185" stopOpacity="0.9" />
                        <stop offset="65%" stopColor="#F43F5E" stopOpacity="0.85" />
                        <stop offset="100%" stopColor="#FDA4AF" stopOpacity="1" />
                      </linearGradient>
                      <filter id="pinkGlowFilter" x="-20%" y="-40%" width="140%" height="180%">
                        <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur" />
                        <feMerge>
                          <feMergeNode in="blur" />
                          <feMergeNode in="SourceGraphic" />
                        </feMerge>
                      </filter>
                    </defs>

                    {/* Gentle Sine-Like Contour Wave */}
                    <path
                      d="M 2 11 C 16 11, 24 16, 38 14 C 52 12, 64 3, 78 5 C 90 7, 98 12, 104 11"
                      stroke="url(#pinkWaveGrad)"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      filter="url(#pinkGlowFilter)"
                    />

                    {/* Pulsing Luminous Beacon Point at Tip */}
                    <circle cx="104" cy="11" r="5" fill="#F43F5E" opacity="0.35" className="animate-ping" />
                    <circle cx="104" cy="11" r="3" fill="#FB7185" />
                    <circle cx="104" cy="11" r="1.5" fill="#FFFFFF" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* ─── Compact Inline / Mobile Variant ─── */
        <div
          role="button"
          tabIndex={0}
          onClick={() => setIsModalOpen(true)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault()
              setIsModalOpen(true)
            }
          }}
          className={`group inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-md border border-pink-500/25 hover:border-pink-400/50 shadow-[0_4px_16px_rgba(0,0,0,0.4)] transition-all duration-300 cursor-pointer select-none ${className}`}
        >
          {/* Mini Ribbon */}
          <div className="relative w-6 h-6 shrink-0 animate-pink-ribbon">
            <Image
              src="/images/heroes/Glossy%20Pink%20Awareness%20Ribbon.png"
              alt="Ruban rose Octobre Rose"
              width={48}
              height={48}
              unoptimized
              className="w-full h-full object-contain drop-shadow-[0_2px_6px_rgba(244,63,94,0.5)]"
            />
          </div>

          <div className="flex items-center gap-1.5 text-xs text-white">
            <span className="font-bold tracking-wider uppercase text-[10px] text-pink-300">
              Octobre Rose
            </span>
            <span className="w-1 h-1 rounded-full bg-pink-400/60" />
            <span className="text-[11px] text-white/90 font-medium">
              Faisons rayonner la prévention
            </span>
          </div>

          <span className="w-4 h-4 rounded-full bg-white/10 flex items-center justify-center text-[9px] text-pink-300 group-hover:bg-pink-500 group-hover:text-white transition-colors">
            ↗
          </span>
        </div>
      )}

      {/* ─── Awareness & Information Modal ─── */}
      <PinkOctoberModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  )
}
