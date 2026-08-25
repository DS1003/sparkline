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
  const repeatedLogos = [...partnerLogos, ...partnerLogos, ...partnerLogos, ...partnerLogos]

  return (
    <div className="w-full bg-white border-y border-[#e5e5e7] py-4 sm:py-5 overflow-hidden select-none">
      <Container className="flex flex-col md:flex-row items-center gap-6 sm:gap-8">
        {/* Left Intro Text with Enlarged Official Symbol Icon */}
        <div className="flex items-center gap-4 sm:gap-4.5 shrink-0 text-xs sm:text-sm font-mono font-bold tracking-wider text-neutral-800 uppercase">
          <span className="w-12 h-12 sm:w-14 sm:h-14 relative flex items-center justify-center shrink-0">
            <Image
              src="/images/brand/sparkline-symbol.svg"
              alt="Spark"
              width={56}
              height={56}
              className="w-full h-full object-contain"
            />
          </span>
          <span className="max-w-xs sm:max-w-none leading-snug">
            +50 solutions digitales déployées avec succès.
          </span>
        </div>

        {/* Vertical Separator */}
        <div className="hidden md:block w-px h-8 bg-neutral-200 shrink-0" />

        {/* Infinite Logo Marquee */}
        <div className="overflow-hidden flex-1 relative w-full">
          <div className="inline-flex gap-12 items-center animate-marquee whitespace-nowrap">
            {repeatedLogos.map((logo, idx) => (
              <div key={idx} className="inline-flex items-center gap-3">
                <span className="text-[#EB4604] text-lg font-bold">{logo.symbol}</span>
                <span className="heading-04 text-neutral-900 font-bold tracking-tight">
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
