'use client'

import React from 'react'
import Image from 'next/image'
import { Container } from '../layout/Container'

const partnerLogos = [
  { name: 'LuxeAura', symbol: '❖' },
  { name: 'DigiMinds', symbol: '✻' },
  { name: 'Energetix', symbol: '⎈' },
  { name: 'ZestyBite', symbol: '✣' },
  { name: 'NexaTech', symbol: '⬡' },
  { name: 'TerangaPay', symbol: '✦' },
  { name: 'BaobabLabs', symbol: '✧' },
]

export function MarqueeStrip() {
  return (
    <div className="w-full bg-white border-y border-[#e5e5e7] py-3 sm:py-4 md:py-5 overflow-hidden select-none">
      <style>{`
        @keyframes marquee-partner-scroll {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-50%, 0, 0); }
        }
        .animate-marquee-partners {
          display: flex;
          width: max-content;
          animation: marquee-partner-scroll 26s linear infinite;
        }
        .animate-marquee-partners:hover {
          animation-play-state: paused;
        }
      `}</style>

      <Container className="flex flex-col md:flex-row items-center justify-between gap-3 sm:gap-5 md:gap-8">
        {/* Left Intro Text with Official Symbol Icon */}
        <div className="flex items-center gap-3 sm:gap-4 shrink-0 text-xs sm:text-sm font-mono font-bold tracking-wider text-neutral-800 uppercase w-full md:w-auto justify-center md:justify-start">
          <span className="w-10 h-10 sm:w-12 sm:h-12 relative flex items-center justify-center shrink-0">
            <Image
              src="/images/brand/sparkline-symbol.svg"
              alt="Spark"
              width={48}
              height={48}
              className="w-full h-full object-contain"
            />
          </span>
          <span className="max-w-xs sm:max-w-none leading-snug">
            +50 solutions digitales déployées avec succès.
          </span>
        </div>

        {/* Vertical Separator for Desktop */}
        <div className="hidden md:block w-px h-8 bg-neutral-200 shrink-0" />

        {/* Infinite Logo Marquee with Smooth Left & Right Gradient Mask */}
        <div className="overflow-hidden relative w-full flex-1 flex items-center min-h-[36px] sm:min-h-[44px]">
          {/* Left / Right Vignette Fades */}
          <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-12 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-12 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

          {/* Duplicated set for seamless -50% translation */}
          <div className="animate-marquee-partners items-center gap-8 sm:gap-12 py-1.5">
            {[...partnerLogos, ...partnerLogos].map((logo, idx) => (
              <div key={idx} className="inline-flex items-center gap-2.5 sm:gap-3 shrink-0">
                <span className="text-[#EB4604] text-base sm:text-lg font-bold">{logo.symbol}</span>
                <span className="text-sm sm:text-base md:text-lg text-neutral-900 font-bold tracking-tight whitespace-nowrap">
                  {logo.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </div>
  )
}
