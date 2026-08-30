'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { teamMembers } from '@/config/content/team'
import { Container } from '@/components/layout/Container'
import { Section } from '@/components/layout/Section'
import { Tag } from '@/components/ui/Tag'
import { RevealOnScroll } from '@/components/motion/RevealOnScroll'
import { SpotlightCard } from '@/components/motion/SpotlightCard'

const memberImages: Record<string, string> = {
  seydina: '/images/brand/Seydina.png',
  fanta: '/images/brand/Fanta.png',
  ndiaga: '/images/brand/Ndiaga.png',
  fallou: '/images/brand/Serigne fallou.png',
}

export function TeamSection() {
  return (
    <Section id="team" className="py-16 sm:py-20 lg:py-28 bg-[#fafafc]">
      <Container>
        {/* ── Editorial Header ── */}
        <div className="space-y-6 mb-12 sm:mb-16">
          <RevealOnScroll>
            <Tag variant="v2">Notre Équipe</Tag>
          </RevealOnScroll>

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 lg:gap-16">
            <RevealOnScroll delay={0.1}>
              <h2
                className="text-[clamp(2.25rem,4.5vw,56px)] font-normal text-[#0A0A0A] leading-[1.06] tracking-[-0.03em] max-w-xl"
                style={{ fontFamily: 'var(--font-family--primary-font)' }}
              >
                Des talents multidisciplinaires unis par l’excellence.
              </h2>
            </RevealOnScroll>

            <RevealOnScroll delay={0.2}>
              <div className="space-y-3 max-w-sm">
                <p className="text-sm sm:text-base text-neutral-500 font-normal leading-relaxed">
                  Ingénieurs, designers, architectes et stratèges dédiés à la création de solutions numériques d’exception.
                </p>
                <Link
                  href="/team"
                  className="group inline-flex items-center gap-2 text-[#0A0A0A] font-medium text-sm whitespace-nowrap pb-1 border-b border-dashed border-neutral-400 hover:border-[#EB4604] hover:text-[#EB4604] transition-colors"
                >
                  <span>Rencontrer toute l'équipe</span>
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </Link>
              </div>
            </RevealOnScroll>
          </div>
        </div>

        {/* ── Team Grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {teamMembers.map((member, idx) => {
            const avatarSrc = memberImages[member.id]

            return (
              <RevealOnScroll key={member.id} delay={0.08 + idx * 0.08} direction="up">
                <Link href="/team" className="block group">
                  <SpotlightCard className="rounded-[28px] sm:rounded-[32px] bg-white border border-[#e8e9ed] hover:border-[#EB4604]/50 transition-all duration-500 hover:shadow-xl p-7 sm:p-8 flex flex-col justify-between h-full space-y-6">
                    <div>
                      {/* Avatar Image with zoom */}
                      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white border border-[#e2e2e7] shadow-sm overflow-hidden flex items-center justify-center font-mono font-bold text-xl text-[#EB4604] mb-6 group-hover:scale-105 transition-transform duration-500 relative">
                        {avatarSrc ? (
                          <Image
                            src={avatarSrc}
                            alt={member.name}
                            fill
                            quality={100}
                            unoptimized
                            className="object-cover object-top"
                            sizes="80px"
                          />
                        ) : (
                          <span>{member.name.split(' ').map((n) => n[0]).join('')}</span>
                        )}
                      </div>

                      <h3
                        className="text-xl sm:text-2xl font-semibold text-[#0A0A0A] mb-1 group-hover:text-[#EB4604] transition-colors duration-300 tracking-tight"
                        style={{ fontFamily: 'var(--font-family--primary-font)' }}
                      >
                        {member.name}
                      </h3>

                      <p className="text-xs font-mono uppercase tracking-wider text-[#EB4604] mb-4 font-semibold">
                        {member.title}
                      </p>

                      <p className="text-neutral-600 text-sm leading-relaxed line-clamp-3">
                        {member.description}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-neutral-100 flex items-center justify-between text-xs font-mono text-neutral-400">
                      <span>SPARKLINE CORE</span>
                      <span className="text-[#EB4604] font-semibold">[0{idx + 1}]</span>
                    </div>
                  </SpotlightCard>
                </Link>
              </RevealOnScroll>
            )
          })}
        </div>
      </Container>
    </Section>
  )
}
