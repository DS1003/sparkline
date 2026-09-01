'use client'

import React from 'react'
import Image from 'next/image'
import { Container } from '@/components/layout/Container'
import { Section } from '@/components/layout/Section'
import { Tag } from '@/components/ui/Tag'
import { RevealOnScroll } from '@/components/motion/RevealOnScroll'

const fanCards = [
  {
    src: '/images/services/branding.jpg',
    alt: 'Design & Direction Artistique',
    rotation: '-rotate-3 sm:-rotate-4 hover:rotate-0',
    translate: 'translate-y-2 sm:translate-y-3',
  },
  {
    src: '/images/services/ui-ux.jpg',
    alt: 'UI/UX & Expérience Produit',
    rotation: '-rotate-1 sm:-rotate-2 hover:rotate-0',
    translate: '-translate-y-2 sm:-translate-y-4',
  },
  {
    src: '/images/services/development.jpg',
    alt: 'Ingénierie & Architecture Digitale',
    rotation: 'rotate-1 sm:rotate-2 hover:rotate-0',
    translate: '-translate-y-2 sm:-translate-y-4',
  },
  {
    src: '/images/services/mobile.jpg',
    alt: 'Stratégie & Solutions Mobiles',
    rotation: 'rotate-3 sm:rotate-4 hover:rotate-0',
    translate: 'translate-y-2 sm:translate-y-3',
  },
]

export function WhatDrivesUs() {
  return (
    <Section id="drives-us" className="py-20 sm:py-24 lg:py-32 bg-white overflow-hidden">
      <Container>
        {/* ── Centered Header & Headline ── */}
        <div className="text-center space-y-6 max-w-4xl mx-auto mb-16 sm:mb-20">
          <RevealOnScroll>
            <div className="flex justify-center">
              <Tag variant="v2">Ce qui nous anime</Tag>
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={0.1}>
            <h2
              className="text-[clamp(2.25rem,4.8vw,64px)] font-normal text-[#0A0A0A] leading-[1.08] tracking-[-0.03em]"
              style={{ fontFamily: 'var(--font-family--primary-font)' }}
            >
              <span>De l’idée initiale au</span><br className="hidden sm:inline" />
              <span> lancement final</span>{' '}
              <span className="inline-flex items-center justify-center w-12 h-7 sm:w-16 sm:h-9 md:w-20 md:h-11 rounded-full overflow-hidden border border-neutral-300 shadow-md relative align-middle mx-1 sm:mx-2 -translate-y-0.5 sm:-translate-y-1 shrink-0">
                <Image
                  src="/images/services/header-avatar.jpg"
                  alt="Portrait"
                  fill
                  quality={85}
                  sizes="80px"
                  className="object-cover"
                />
              </span>{' '}
              <span>porté par plus de</span><br className="hidden sm:inline" />
              <span> 3+ ans d’expertise.</span>
            </h2>
          </RevealOnScroll>
        </div>

        {/* ── 4 Fan-Out Portrait Visual Cards ── */}
        <RevealOnScroll delay={0.2} direction="up">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 md:gap-6 max-w-6xl mx-auto pt-4 pb-8">
            {fanCards.map((card, idx) => (
              <div
                key={idx}
                className={`relative aspect-[3/4] sm:aspect-[3/4.2] rounded-[22px] sm:rounded-[30px] lg:rounded-[34px] overflow-hidden shadow-xl sm:shadow-2xl border border-neutral-200/80 bg-neutral-900 transition-all duration-500 ease-out transform group ${card.rotation} ${card.translate}`}
              >
                <Image
                  src={card.src}
                  alt={card.alt}
                  fill
                  quality={85}
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  sizes="(max-width: 640px) 50vw, 300px"
                />

                {/* Subtle bottom vignette gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60 pointer-events-none" />
              </div>
            ))}
          </div>
        </RevealOnScroll>
      </Container>
    </Section>
  )
}
