'use client'

import React from 'react'

const marqueeItems = [
  {
    title: 'Solutions Hybrides',
    icon: (
      <svg className="w-5 h-5 sm:w-6 sm:h-6 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    ),
  },
  {
    title: 'Réseaux Sécurisés & Scalables',
    icon: (
      <svg className="w-5 h-5 sm:w-6 sm:h-6 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="9" y="2" width="6" height="6" rx="1" />
        <rect x="2" y="16" width="6" height="6" rx="1" />
        <rect x="16" y="16" width="6" height="6" rx="1" />
        <path d="M5 16v-4h14v4" />
        <path d="M12 8v4" />
      </svg>
    ),
  },
  {
    title: 'Observabilité & Monitoring',
    icon: (
      <svg className="w-5 h-5 sm:w-6 sm:h-6 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
  },
  {
    title: 'Architecture Haute Disponibilité',
    icon: (
      <svg className="w-5 h-5 sm:w-6 sm:h-6 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="8" rx="2" />
        <rect x="2" y="14" width="20" height="8" rx="2" />
        <line x1="6" y1="6" x2="6.01" y2="6" />
        <line x1="6" y1="18" x2="6.01" y2="18" />
      </svg>
    ),
  },
  {
    title: 'Sécurité & Conformité',
    icon: (
      <svg className="w-5 h-5 sm:w-6 sm:h-6 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    ),
  },
  {
    title: 'Performance & Vélocité',
    icon: (
      <svg className="w-5 h-5 sm:w-6 sm:h-6 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
  },
]

export function ExpertiseMarqueeStrip() {
  return (
    <div className="w-full bg-[#EB4604] text-white py-3.5 sm:py-4.5 overflow-hidden select-none border-y border-[#D43D00] shadow-sm relative z-10">
      <style jsx>{`
        @keyframes marquee-expertise {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee-expertise {
          animation: marquee-expertise 35s linear infinite;
        }
        .animate-marquee-expertise:hover {
          animation-play-state: paused;
        }
      `}</style>

      <div className="flex w-max animate-marquee-expertise items-center">
        {/* First Set */}
        <div className="flex items-center gap-10 sm:gap-14 lg:gap-16 pr-10 sm:pr-14 lg:pr-16">
          {marqueeItems.map((item, idx) => (
            <div
              key={`a-${idx}`}
              className="flex items-center gap-3 sm:gap-3.5 text-white font-medium text-base sm:text-lg lg:text-xl whitespace-nowrap tracking-tight"
              style={{ fontFamily: 'var(--font-family--primary-font)' }}
            >
              <span className="text-white/90">{item.icon}</span>
              <span>{item.title}</span>
            </div>
          ))}
        </div>

        {/* Duplicate Set for Seamless Infinite Loop */}
        <div className="flex items-center gap-10 sm:gap-14 lg:gap-16 pr-10 sm:pr-14 lg:pr-16" aria-hidden="true">
          {marqueeItems.map((item, idx) => (
            <div
              key={`b-${idx}`}
              className="flex items-center gap-3 sm:gap-3.5 text-white font-medium text-base sm:text-lg lg:text-xl whitespace-nowrap tracking-tight"
              style={{ fontFamily: 'var(--font-family--primary-font)' }}
            >
              <span className="text-white/90">{item.icon}</span>
              <span>{item.title}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
