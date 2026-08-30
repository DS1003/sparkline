'use client'

import React from 'react'
import Link from 'next/link'
import { sparklearn } from '@/config/content/sparklearn'
import { Tag } from '@/components/ui/Tag'
import { Container } from '@/components/layout/Container'
import { Section } from '@/components/layout/Section'
import { RevealOnScroll } from '@/components/motion/RevealOnScroll'
import { SpotlightCard } from '@/components/motion/SpotlightCard'

export function SparkLearnSection() {
  return (
    <Section id="sparklearn" className="py-16 sm:py-20 lg:py-28 bg-[#f4f5f8]">
      <Container>
        {/* ── Editorial Header ── */}
        <div className="space-y-6 mb-12 sm:mb-16">
          <RevealOnScroll>
            <Tag variant="v2">Initiative Éducative</Tag>
          </RevealOnScroll>

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 lg:gap-16">
            <RevealOnScroll delay={0.1}>
              <h2
                className="text-[clamp(2.25rem,4.5vw,56px)] font-normal text-[#0A0A0A] leading-[1.06] tracking-[-0.03em] max-w-xl"
                style={{ fontFamily: 'var(--font-family--primary-font)' }}
              >
                Transmettre l’excellence digitale & former les talents de demain.
              </h2>
            </RevealOnScroll>

            <RevealOnScroll delay={0.2}>
              <div className="space-y-3 max-w-sm">
                <p className="text-sm sm:text-base text-neutral-500 font-normal leading-relaxed">
                  {sparklearn.description}
                </p>
                <div className="flex items-center gap-4">
                  <Link
                    href="/sparklearn/masterclasses"
                    className="group inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-[#0A0A0A] hover:text-[#EB4604] transition-colors border-b border-dashed border-neutral-400 pb-1"
                  >
                    <span>Masterclasses</span>
                    <span className="transition-transform group-hover:translate-x-1">→</span>
                  </Link>
                  <Link
                    href="/sparklearn/formations"
                    className="group inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-[#0A0A0A] hover:text-[#EB4604] transition-colors border-b border-dashed border-neutral-400 pb-1"
                  >
                    <span>Formations</span>
                    <span className="transition-transform group-hover:translate-x-1">→</span>
                  </Link>
                </div>
              </div>
            </RevealOnScroll>
          </div>
        </div>

        {/* ── 2 Main Pillars of SPARKlearn ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
          {sparklearn.activities.map((activity, idx) => (
            <RevealOnScroll key={activity.id} delay={0.1 + idx * 0.1} direction="up">
              <SpotlightCard className="p-8 sm:p-10 lg:p-12 rounded-[28px] sm:rounded-[32px] bg-white border border-[#e2e2e8] hover:border-[#EB4604]/50 transition-all duration-500 hover:shadow-xl flex flex-col justify-between h-full space-y-8">
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-[#EB4604]/10 text-[#EB4604] flex items-center justify-center font-mono font-bold text-lg">
                      0{idx + 1}
                    </div>
                    <span className="text-xs font-mono uppercase tracking-widest text-neutral-400">
                      SPARKlearn Pillar
                    </span>
                  </div>

                  <h3
                    className="text-2xl sm:text-3xl font-semibold text-[#0A0A0A] mb-4 tracking-tight"
                    style={{ fontFamily: 'var(--font-family--primary-font)' }}
                  >
                    {activity.title}
                  </h3>

                  <p className="text-neutral-600 text-sm sm:text-base leading-relaxed mb-6">
                    {activity.description}
                  </p>

                  <div className="space-y-3 pt-4 border-t border-neutral-100">
                    <h4 className="text-xs uppercase font-mono tracking-wider text-neutral-400 font-semibold">
                      Objectifs & Compétences Clés
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {activity.goals.map((goal, gIdx) => (
                        <div key={gIdx} className="flex items-center gap-2 text-xs sm:text-sm text-neutral-800 font-medium">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#EB4604] shrink-0" />
                          <span>{goal}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <Link
                    href={idx === 0 ? '/sparklearn/masterclasses' : '/sparklearn/formations'}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#0A0A0A] text-white text-xs sm:text-sm font-semibold hover:bg-[#EB4604] transition-all duration-300 shadow-md group"
                  >
                    <span>Explorer le programme</span>
                    <span className="transition-transform group-hover:translate-x-1">→</span>
                  </Link>
                </div>
              </SpotlightCard>
            </RevealOnScroll>
          ))}
        </div>
      </Container>
    </Section>
  )
}
