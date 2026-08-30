'use client'

import React from 'react'
import { approach } from '@/config/content/sparklearn'
import { Container } from '@/components/layout/Container'
import { Section } from '@/components/layout/Section'
import { Tag } from '@/components/ui/Tag'
import { RevealOnScroll } from '@/components/motion/RevealOnScroll'
import { SpotlightCard } from '@/components/motion/SpotlightCard'

export function Approach() {
  return (
    <Section id="approach" className="py-16 sm:py-20 lg:py-28 bg-white">
      <Container>
        {/* ── Editorial Header ── */}
        <div className="space-y-6 mb-12 sm:mb-16">
          <RevealOnScroll>
            <Tag variant="v2">Notre Approche</Tag>
          </RevealOnScroll>

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 lg:gap-16">
            <RevealOnScroll delay={0.1}>
              <h2
                className="text-[clamp(2.25rem,4.5vw,56px)] font-normal text-[#0A0A0A] leading-[1.06] tracking-[-0.03em] max-w-xl"
                style={{ fontFamily: 'var(--font-family--primary-font)' }}
              >
                Une méthodologie éprouvée, de l’idée à l’impact.
              </h2>
            </RevealOnScroll>

            <RevealOnScroll delay={0.2}>
              <p className="text-sm sm:text-base text-neutral-500 font-normal leading-relaxed max-w-md">
                Comment nous structurons chaque projet pour garantir une vélocité maximale, une rigueur sans faille et des résultats mesurables.
              </p>
            </RevealOnScroll>
          </div>
        </div>

        {/* ── Step Cards Grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 sm:gap-6">
          {approach.map((step, idx) => (
            <RevealOnScroll key={step.id} delay={0.08 + idx * 0.08} direction="up">
              <SpotlightCard className="p-6 sm:p-7 rounded-[24px] bg-[#f8f9fa] border border-[#e8e9ed] hover:border-[#EB4604]/50 transition-all duration-500 hover:shadow-lg h-full flex flex-col justify-between space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <span className="text-[#EB4604] font-mono text-xl font-bold">
                      [{step.number}]
                    </span>
                    <span className="w-2 h-2 rounded-full bg-[#EB4604]" />
                  </div>

                  <h3
                    className="text-lg font-semibold text-[#0A0A0A] mb-2"
                    style={{ fontFamily: 'var(--font-family--primary-font)' }}
                  >
                    {step.title}
                  </h3>

                  <p className="text-neutral-600 text-xs sm:text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Progress bar line */}
                <div className="w-full h-1 bg-neutral-200/80 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#FFB901] to-[#EB4604]"
                    style={{ width: `${((idx + 1) / approach.length) * 100}%` }}
                  />
                </div>
              </SpotlightCard>
            </RevealOnScroll>
          ))}
        </div>
      </Container>
    </Section>
  )
}
