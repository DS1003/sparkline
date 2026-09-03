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
              className="group inline-flex items-center gap-2.5 px-4.5 py-2.5 rounded-full bg-neutral-100/90 hover:bg-[#0A0A0A] text-neutral-900 hover:text-white border border-neutral-200/90 hover:border-[#0A0A0A] text-xs sm:text-sm font-medium transition-all duration-300 shadow-2xs hover:shadow-md shrink-0 mb-1"
            >
              <span>Découvrir le Studio</span>
              <span className="w-5 h-5 rounded-full bg-white group-hover:bg-[#EB4604] group-hover:text-white text-neutral-900 flex items-center justify-center text-xs transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shadow-2xs">
                ↗
              </span>
            </Link>
          </RevealOnScroll>
        </div>
      </Container>

      {/* ── Auto-Scrolling Portrait Photo Strip (4K HD) ── */}
      <RevealOnScroll delay={0.3}>
        <div className="w-full overflow-hidden">
          {/* CSS Keyframes for continuous uninterrupted infinite scroll */}
          <style jsx>{`
            @keyframes scroll-portraits {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
            .portrait-marquee {
              animation: scroll-portraits 30s linear infinite;
            }
          `}</style>

          <div className="portrait-marquee flex gap-3 sm:gap-4 lg:gap-5 w-max">
            {/* First set */}
            {teamPortraits.map((portrait, idx) => (
              <div
                key={`a-${idx}`}
                className="relative shrink-0 w-[280px] sm:w-[320px] md:w-[350px] lg:w-[380px] xl:w-[410px] aspect-[3/4.2] rounded-2xl sm:rounded-3xl overflow-hidden group shadow-md"
              >
                <Image
                  src={portrait.src}
                  alt={portrait.alt}
                  fill
                  quality={90}
                  className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 640px) 280px, (max-width: 768px) 320px, (max-width: 1024px) 350px, (max-width: 1280px) 380px, 410px"
                />
              </div>
            ))}
            {/* Duplicate set for seamless loop */}
            {teamPortraits.map((portrait, idx) => (
              <div
                key={`b-${idx}`}
                className="relative shrink-0 w-[280px] sm:w-[320px] md:w-[350px] lg:w-[380px] xl:w-[410px] aspect-[3/4.2] rounded-2xl sm:rounded-3xl overflow-hidden group shadow-md"
              >
                <Image
                  src={portrait.src}
                  alt={portrait.alt}
                  fill
                  quality={90}
                  className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 640px) 280px, (max-width: 768px) 320px, (max-width: 1024px) 350px, (max-width: 1280px) 380px, 410px"
                />
              </div>
            ))}
          </div>
        </div>
      </RevealOnScroll>

      {/* ── Stats counter row (En chiffres) ── */}
      <Container className="pt-14 sm:pt-20 lg:pt-28 pb-10 sm:pb-16 lg:pb-24">
        {/* Header Row — Tag only */}
        <RevealOnScroll>
          <div className="pb-6 sm:pb-8 border-b border-neutral-200/80 mb-8 sm:mb-12">
            <Tag variant="v2">En chiffres</Tag>
          </div>
        </RevealOnScroll>

        {/* Minimalist Stats Grid (Clean Architectural Dividers, No Boxy Cards) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-0 lg:divide-x lg:divide-neutral-200/70">
          {stats.map((stat, idx) => (
            <div key={stat.id} className="lg:px-8 xl:px-10">
              <Counter
                index={idx}
                delay={idx * 0.08}
                value={stat.value}
                suffix={stat.suffix}
                label={stat.label}
                description={stat.description}
              />
            </div>
          ))}
        </div>
      </Container>
    </Section>
  )
}
