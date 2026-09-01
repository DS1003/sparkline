'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'

export function Preloader() {
  const [stage, setStage] = useState<'spark' | 'line' | 'logo' | 'fading' | 'complete'>('spark')

  useEffect(() => {
    // Fast, elegant sequence: Spark (0-300ms) -> Line/Energy (300-650ms) -> Logo (650-1350ms) -> Fading -> Complete
    const t1 = setTimeout(() => setStage('line'), 300)
    const t2 = setTimeout(() => setStage('logo'), 650)
    const t3 = setTimeout(() => {
      setStage('fading')
      if (typeof window !== 'undefined') {
        ;(window as unknown as { __SPARKLINE_LOADED__?: boolean }).__SPARKLINE_LOADED__ = true
        window.dispatchEvent(new CustomEvent('sparkline:loader-complete'))
      }
    }, 1350)

    const t4 = setTimeout(() => {
      setStage('complete')
    }, 1700)

    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
      clearTimeout(t4)
    }
  }, [])

  if (stage === 'complete') return null

  return (
    <div
      className={`fixed inset-0 z-50 bg-[#070709] flex flex-col items-center justify-center transition-opacity duration-400 select-none ${
        stage === 'fading' ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="relative flex flex-col items-center justify-center">
        {/* Glow ambient background */}
        <div className="absolute w-72 h-72 rounded-full bg-[#EB4604]/20 blur-[90px] pointer-events-none" />

        {/* Phase 1 & 2: Spark & Energy Line Animation */}
        {stage !== 'logo' && stage !== 'fading' && (
          <div className="flex flex-col items-center justify-center space-y-4">
            {/* Spark point */}
            <div className="w-4 h-4 rounded-full bg-gradient-to-r from-[#FFB901] to-[#EB4604] shadow-[0_0_25px_#FFB901] animate-ping" />
            
            {/* Energy Line */}
            <div
              className={`h-0.5 bg-gradient-to-r from-[#FFB901] via-[#EB4604] to-transparent rounded-full transition-all duration-500 ${
                stage === 'line' ? 'w-48 opacity-100' : 'w-0 opacity-0'
              }`}
            />
          </div>
        )}

        {/* Phase 3: Official SPARKLINE Logo Reveal */}
        {(stage === 'logo' || stage === 'fading') && (
          <div className="flex flex-col items-center space-y-4 animate-fadeIn">
            {/* Official Symbol / Logo with subtle spark glow */}
            <div className="relative w-56 h-14 sm:w-64 sm:h-16 flex items-center justify-center">
              <Image
                src="/images/brand/sparkline-logo-white.svg"
                alt="SPARKLINE Official Logo"
                width={256}
                height={52}
                priority
                className="w-full h-auto object-contain animate-spark-pulse"
              />
            </div>

            <p className="text-[11px] font-mono tracking-widest text-neutral-400 uppercase">
              Déclenchez le changement <span className="text-[#EB4604]">•</span> Illuminez le succès
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
