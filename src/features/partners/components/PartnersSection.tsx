'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Container } from '@/components/layout/Container'
import { Section } from '@/components/layout/Section'
import { Tag } from '@/components/ui/Tag'
import { RevealOnScroll } from '@/components/motion/RevealOnScroll'

interface PartnerItem {
  id: string
  name: string
  role: string
  color?: string
  logo?: string
  type?: 'partner' | 'badge'
  badgeText?: string
}

const row1: PartnerItem[] = [
  { id: '1-1', name: 'Sonatel', role: 'Télécoms & Réseaux', logo: '/images/partners/sonatel.webp', color: '#008775' },
  { id: '1-2', name: 'Orange Digital Center', role: 'Incubateur & Innovation', logo: '/images/partners/orange-digital-center.webp', color: '#FF7900' },
  { id: '1-b1', name: '', role: '', color: '#EB4604', type: 'badge', badgeText: 'REJOINDRE LE RÉSEAU' },
  { id: '1-3', name: 'Baraka', role: 'E-Commerce & High-Tech', logo: '/images/partners/baraka.webp', color: '#EB4604' },
  { id: '1-4', name: 'Saphir Alpha', role: 'Conseil & Stratégie Digitale', logo: '/images/partners/saphir-alpha.webp', color: '#6C00FF' },
  { id: '1-b2', name: '', role: '', color: '#0A0A0A', type: 'badge', badgeText: 'JOIN US ↗' },
  { id: '1-5', name: 'Sonatel Academy', role: 'Formation & Tech Coding', logo: '/images/partners/sonatel-academy.webp', color: '#008775' },
  { id: '1-6', name: 'FIDELE Sarl', role: 'BTP & Ingénierie', logo: '/images/partners/fidele-sarl.webp', color: '#0055A5' },
  { id: '1-7', name: 'Mbor', role: 'Retail & Sportswear', logo: '/images/partners/mbor.webp', color: '#FFB901' },
]

const row2: PartnerItem[] = [
  { id: '2-1', name: 'FIDELE Sarl', role: 'BTP & Ingénierie', logo: '/images/partners/fidele-sarl.webp', color: '#0055A5' },
  { id: '2-2', name: 'Sonatel Academy', role: 'Formation & Tech Coding', logo: '/images/partners/sonatel-academy.webp', color: '#008775' },
  { id: '2-b1', name: '', role: '', color: '#EB4604', type: 'badge', badgeText: 'DEVENIR PARTENAIRE' },
  { id: '2-3', name: 'Mbor', role: 'Retail & Sportswear', logo: '/images/partners/mbor.webp', color: '#FFB901' },
  { id: '2-4', name: 'Orange Digital Center', role: 'Incubateur & Innovation', logo: '/images/partners/orange-digital-center.webp', color: '#FF7900' },
  { id: '2-b2', name: '', role: '', color: '#0A0A0A', type: 'badge', badgeText: 'COLLABORER AVEC NOUS' },
  { id: '2-5', name: 'Baraka', role: 'E-Commerce & High-Tech', logo: '/images/partners/baraka.webp', color: '#EB4604' },
  { id: '2-6', name: 'Saphir Alpha', role: 'Conseil & Stratégie Digitale', logo: '/images/partners/saphir-alpha.webp', color: '#6C00FF' },
  { id: '2-7', name: 'Sonatel', role: 'Télécoms & Réseaux', logo: '/images/partners/sonatel.webp', color: '#008775' },
]

function PartnerPill({ item }: { item: PartnerItem }) {
  if (item.type === 'badge') {
    return (
      <Link
        href="/contact"
        className="h-16 sm:h-20 inline-flex items-center justify-center gap-2 px-6 sm:px-8 rounded-full text-white text-xs sm:text-sm font-mono font-bold tracking-wider uppercase transition-all duration-300 hover:scale-105 shadow-md shrink-0"
        style={{ backgroundColor: item.color }}
      >
        <span>{item.badgeText}</span>
      </Link>
    )
  }

  return (
    <div className="h-16 sm:h-20 inline-flex items-center gap-4 sm:gap-5 px-4 sm:px-5 rounded-full bg-white hover:bg-neutral-50/80 border border-neutral-200/80 hover:border-[#EB4604]/50 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer shrink-0 group">
      {/* Seamless logo container without inner card styling */}
      <div className="relative h-10 sm:h-12 w-24 sm:w-32 flex items-center justify-center shrink-0">
        {item.logo ? (
          <Image
            src={item.logo}
            alt={item.name}
            fill
            sizes="(max-width: 640px) 112px, 144px"
            className="object-contain p-0.5"
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center text-white text-xs font-bold"
            style={{ backgroundColor: item.color }}
          >
            {item.name.slice(0, 2).toUpperCase()}
          </div>
        )}
      </div>
      <div className="text-left pr-2">
        <span className="text-xs sm:text-sm font-bold text-[#0A0A0A] group-hover:text-[#EB4604] transition-colors block leading-tight">
          {item.name}
        </span>
        <span className="text-[10px] sm:text-[11px] text-neutral-400 font-mono block mt-0.5">
          {item.role}
        </span>
      </div>
    </div>
  )
}

export function PartnersSection() {
  return (
    <Section id="partners" className="py-20 sm:py-28 lg:py-36 bg-white text-neutral-900 overflow-hidden relative">
      {/* ── CSS Keyframes for Infinite Smooth Ribbon Marquee ── */}
      <style jsx>{`
        @keyframes marquee-left {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-50%, 0, 0); }
        }
        @keyframes marquee-right {
          0% { transform: translate3d(-50%, 0, 0); }
          100% { transform: translate3d(0, 0, 0); }
        }
        .animate-ribbon-left {
          animation: marquee-left 38s linear infinite;
          will-change: transform;
          backface-visibility: hidden;
        }
        .animate-ribbon-right {
          animation: marquee-right 40s linear infinite;
          will-change: transform;
          backface-visibility: hidden;
        }
        .ribbon-container:hover .animate-ribbon-left,
        .ribbon-container:hover .animate-ribbon-right {
          animation-play-state: paused;
        }
      `}</style>

      {/* ── Top Editorial Header ── */}
      <Container className="mb-14 sm:mb-18">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 lg:gap-16">
          <div className="space-y-4 max-w-xl">
            <RevealOnScroll>
              <Tag variant="v2">Nos Partenaires & Écosystème</Tag>
            </RevealOnScroll>
            <RevealOnScroll delay={0.1}>
              <h2
                className="text-[clamp(2.25rem,4.5vw,56px)] font-normal text-[#0A0A0A] leading-[1.05] tracking-[-0.035em]"
                style={{ fontFamily: 'var(--font-family--primary-font)' }}
              >
                Une alliance d’acteurs visionnaires.
              </h2>
            </RevealOnScroll>
          </div>

          <RevealOnScroll delay={0.15}>
            <p className="text-sm sm:text-base text-neutral-500 font-light leading-relaxed max-w-md lg:text-right">
              Startups audacieuses, grands groupes et institutions publiques font confiance à SPARKLINE pour concevoir et déployer leurs plateformes critiques.
            </p>
          </RevealOnScroll>
        </div>
      </Container>

      {/* ── Floating Pill Capsule Marquee Ribbons (2 rows only) ── */}
      <div className="ribbon-container relative w-full select-none py-2 overflow-hidden">
        {/* Subtle edge fades */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-12 sm:w-28 bg-gradient-to-r from-white to-transparent z-10" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-12 sm:w-28 bg-gradient-to-l from-white to-transparent z-10" />

        {/* Ribbon Stream: 2 Rows */}
        <div className="space-y-4 sm:space-y-5">
          {/* ── ROW 1 (Moving Left) ── */}
          <div className="flex w-full overflow-visible">
            <div className="animate-ribbon-left flex gap-3 sm:gap-4 items-center shrink-0 w-max pr-3 sm:pr-4 py-1">
              {[...row1, ...row1].map((item, idx) => (
                <PartnerPill key={`r1-${idx}`} item={item} />
              ))}
            </div>
          </div>

          {/* ── ROW 2 (Moving Right) ── */}
          <div className="flex w-full overflow-visible">
            <div className="animate-ribbon-right flex gap-3 sm:gap-4 items-center shrink-0 w-max pr-3 sm:pr-4 py-1">
              {[...row2, ...row2].map((item, idx) => (
                <PartnerPill key={`r2-${idx}`} item={item} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}
