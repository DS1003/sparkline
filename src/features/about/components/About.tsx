'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Section } from '@/components/layout/Section'
import { RevealOnScroll } from '@/components/motion/RevealOnScroll'
import { Counter } from '@/components/ui/Counter'
import { Tag } from '@/components/ui/Tag'
import { Container } from '@/components/layout/Container'
import { stats } from '@/config/content/sparklearn'

const teamPortraits = [
  { src: '/images/brand/Seydina.png', alt: 'Seydina Diop' },
  { src: '/images/brand/Ndiaga.png', alt: 'Ndiaga Lo' },
  { src: '/images/brand/Fanta.png', alt: 'Fanta Ndao' },
  { src: '/images/brand/Serigne fallou.png', alt: 'Serigne Fallou' },
]

export function About() {
  return (
    <Section id="about" className="pt-12 sm:pt-16 lg:pt-20 pb-16 sm:pb-20 lg:pb-24">
      {/* ── Top Editorial Block ── */}
      <Container className="pt-0 pb-6 sm:pb-8">
        {/* WHO WE ARE tag */}
        <RevealOnScroll>
          <Tag variant="v2">Qui sommes-nous</Tag>
        </RevealOnScroll>

        {/* Headline + CTA row */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 lg:gap-16 mt-[24px]">
          <RevealOnScroll delay={0.1}>
            <h2 className="text-[clamp(2rem,4.5vw,64px)] font-normal text-[#0A0A0A] leading-[1.0] tracking-[-0.02em] max-w-[680px]">
              Nous bâtissons des systèmes digitaux pour propulser les leaders.
            </h2>
          </RevealOnScroll>

          <RevealOnScroll delay={0.2}>
            <Link
              href="/about"
              className="group flex items-center gap-2 text-[#0A0A0A] font-medium text-sm lg:text-base whitespace-nowrap shrink-0 pb-1 border-b border-dashed border-neutral-400 hover:border-[#EB4604] hover:text-[#EB4604] transition-colors mb-1"
            >
              Découvrir le Studio
            </Link>
          </RevealOnScroll>
        </div>
      </Container>

      {/* ── Auto-Scrolling Portrait Photo Strip (4K HD) ── */}
      <RevealOnScroll delay={0.3}>
        <div className="w-full overflow-hidden">
          {/* CSS Keyframes for infinite scroll */}
          <style jsx>{`
            @keyframes scroll-portraits {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
            .portrait-marquee {
              animation: scroll-portraits 30s linear infinite;
            }
            .portrait-marquee:hover {
              animation-play-state: paused;
            }
          `}</style>

          <div className="portrait-marquee flex gap-2 sm:gap-3 lg:gap-4 w-max">
            {/* First set */}
            {teamPortraits.map((portrait, idx) => (
              <div
                key={`a-${idx}`}
                className="relative shrink-0 w-[180px] sm:w-[240px] md:w-[300px] lg:w-[360px] xl:w-[400px] aspect-[3/4.2] rounded-xl overflow-hidden group"
              >
                <Image
                  src={portrait.src}
                  alt={portrait.alt}
                  fill
                  quality={85}
                  className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 640px) 180px, (max-width: 768px) 240px, (max-width: 1024px) 300px, (max-width: 1280px) 360px, 400px"
                />
              </div>
            ))}
            {/* Duplicate set for seamless loop */}
            {teamPortraits.map((portrait, idx) => (
              <div
                key={`b-${idx}`}
                className="relative shrink-0 w-[180px] sm:w-[240px] md:w-[300px] lg:w-[360px] xl:w-[400px] aspect-[3/4.2] rounded-xl overflow-hidden group"
              >
                <Image
                  src={portrait.src}
                  alt={portrait.alt}
                  fill
                  quality={85}
                  className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 640px) 180px, (max-width: 768px) 240px, (max-width: 1024px) 300px, (max-width: 1280px) 360px, 400px"
                />
              </div>
            ))}
          </div>
        </div>
      </RevealOnScroll>

      {/* ── Stats counter row (En chiffres) ── */}
      <Container className="pt-12 sm:pt-16 lg:pt-28 pb-8 sm:pb-12 lg:pb-20">
        {/* Tag — capsule style like other sections */}
        <RevealOnScroll>
          <div className="mb-8 sm:mb-12 lg:mb-16">
            <Tag variant="v2">En chiffres</Tag>
          </div>
        </RevealOnScroll>

        {/* Stats grid — Compact 2x2 grid on mobile, 4 columns on desktop */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {stats.map((stat, idx) => (
            <Counter
              key={stat.id}
              delay={idx * 0.1}
              value={stat.value}
              suffix={stat.suffix}
              label={stat.label}
              description={stat.description}
            />
          ))}
        </div>
      </Container>
    </Section>
  )
}
