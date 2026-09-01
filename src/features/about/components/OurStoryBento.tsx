'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Container } from '@/components/layout/Container'
import { RevealOnScroll } from '@/components/motion/RevealOnScroll'
import { Tag } from '@/components/ui/Tag'

export function OurStoryBento() {
  return (
    <section id="notre-histoire" className="py-20 sm:py-24 lg:py-32 bg-[#FAFBFD] border-b border-[#E5E7EB]">
      <Container>
        {/* ── 1. Top Centered Editorial Header with Inline Image Capsule ── */}
        <div className="text-center max-w-4xl mx-auto space-y-6 mb-14 sm:mb-18 lg:mb-20">
          <RevealOnScroll>
            <div className="inline-flex justify-center">
              <Tag variant="v2">Notre Histoire</Tag>
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={0.1}>
            <h2
              className="text-3xl sm:text-5xl lg:text-[54px] font-normal text-[#0A0A0A] leading-[1.12] tracking-[-0.035em]"
              style={{ fontFamily: 'var(--font-family--primary-font)' }}
            >
              <span>Depuis 2024, nous transformons des idées audacieuses </span>
              <span className="inline-flex items-center align-middle mx-1.5 sm:mx-2.5 my-1 overflow-hidden rounded-full w-12 h-7 sm:w-16 sm:h-9 md:w-20 md:h-11 border-2 border-neutral-200 shadow-sm relative shrink-0 transition-transform duration-300 hover:scale-105">
                <Image
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop"
                  alt="Créativité & Ingénierie SPARKLINE"
                  fill
                  unoptimized
                  className="object-cover"
                  sizes="80px"
                />
              </span>
              <span> en marques et produits leaders ↗</span>
            </h2>
          </RevealOnScroll>

          <RevealOnScroll delay={0.15}>
            <p className="text-neutral-600 text-sm sm:text-base lg:text-lg font-light leading-relaxed max-w-2xl mx-auto">
              Grâce à l’alliance indissociable de la stratégie technique et du design centré sur l’humain, nous comblons le fossé entre la créativité et la rigueur d’ingénierie logicielle.
            </p>
          </RevealOnScroll>

          <RevealOnScroll delay={0.2}>
            <div className="pt-2">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-3 px-8 py-3.5 rounded-full bg-[#EB4604] hover:bg-[#D43D00] text-white font-semibold text-sm shadow-md transition-all duration-300 hover:scale-[1.02]"
              >
                <span>Démarrer un projet avec nous</span>
                <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-xs transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                  ↗
                </span>
              </Link>
            </div>
          </RevealOnScroll>
        </div>

        {/* ── 2. Three-Column Bento Grid (Ultra Épuré & Moderne, Zero Glowing) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-stretch">
          {/* ═══════════════════════════════════════════════════════════
              CARD 1 (Left): "02 Précision & Craft" — Tilted Tags & Capabilities
              ═══════════════════════════════════════════════════════════ */}
          <div className="lg:col-span-4 flex">
            <RevealOnScroll delay={0.25} className="w-full">
              <div className="w-full h-full min-h-[380px] sm:min-h-[420px] rounded-[28px] sm:rounded-[32px] bg-white border border-[#E5E7EB] p-7 sm:p-9 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_35px_rgba(0,0,0,0.06)] hover:border-neutral-300 transition-all duration-500 flex flex-col justify-between group">
                {/* Header */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-[#EB4604] font-bold">
                    <span>02</span>
                    <span className="w-4 h-px bg-[#EB4604]/40" />
                    <span>Précision &amp; Craft</span>
                  </div>
                  <h3
                    className="text-xl sm:text-2xl font-bold text-[#0A0A0A] tracking-tight leading-snug"
                    style={{ fontFamily: 'var(--font-family--primary-font)' }}
                  >
                    Du code robuste au design d&apos;exception.
                  </h3>
                </div>

                {/* Floating Staggered Badges Cluster */}
                <div className="my-auto py-6 flex flex-col gap-2.5 items-center justify-center">
                  {/* Row 1 */}
                  <div className="flex flex-wrap items-center justify-center gap-2">
                    <span className="px-4 py-2 rounded-full bg-[#0A0A0A] text-white text-xs font-medium shadow-xs transition-transform duration-300 -rotate-2 hover:rotate-0 hover:scale-105 select-none">
                      Applications Web
                    </span>
                    <span className="px-4 py-2 rounded-full bg-white border border-neutral-300 text-[#0A0A0A] text-xs font-medium shadow-xs transition-transform duration-300 rotate-3 hover:rotate-0 hover:scale-105 select-none">
                      Architectures UX
                    </span>
                  </div>

                  {/* Row 2 */}
                  <div className="flex flex-wrap items-center justify-center gap-2">
                    <span className="px-4 py-2 rounded-full bg-[#0A0A0A] text-white text-xs font-medium shadow-xs transition-transform duration-300 rotate-1 hover:rotate-0 hover:scale-105 select-none">
                      Code Robuste
                    </span>
                    <span className="px-4 py-2 rounded-full bg-white border border-neutral-300 text-[#0A0A0A] text-xs font-medium shadow-xs transition-transform duration-300 -rotate-3 hover:rotate-0 hover:scale-105 select-none">
                      Identités Visuelles
                    </span>
                  </div>

                  {/* Row 3 */}
                  <div className="flex flex-wrap items-center justify-center gap-2">
                    <span className="px-4 py-2 rounded-full bg-white border border-neutral-300 text-[#0A0A0A] text-xs font-medium shadow-xs transition-transform duration-300 rotate-2 hover:rotate-0 hover:scale-105 select-none">
                      SPARKlearn
                    </span>
                    <span className="px-4 py-2 rounded-full bg-[#0A0A0A] text-white text-xs font-medium shadow-xs transition-transform duration-300 -rotate-2 hover:rotate-0 hover:scale-105 select-none">
                      Design Systems
                    </span>
                  </div>
                </div>

                {/* Footer text */}
                <div className="pt-4 border-t border-neutral-100 flex items-center justify-between text-[11px] font-mono text-neutral-400">
                  <span>EXIGENCE ABSOLUE</span>
                  <span className="text-[#EB4604] font-semibold">100% IMPACT</span>
                </div>
              </div>
            </RevealOnScroll>
          </div>

          {/* ═══════════════════════════════════════════════════════════
              CARD 2 (Center): Fondation (EST. 2024) & Ancrage (Dakar)
              ═══════════════════════════════════════════════════════════ */}
          <div className="lg:col-span-4 flex flex-col justify-between gap-5 sm:gap-6">
            {/* Top Stat: Fondation EST. 2024 (Solid Matte Black Card, Zero Glow) */}
            <RevealOnScroll delay={0.3} className="flex-1 flex">
              <div className="w-full rounded-[24px] sm:rounded-[28px] bg-[#0A0A0A] text-white p-7 sm:p-8 border border-neutral-800 shadow-md flex flex-col justify-between hover:border-neutral-700 transition-all duration-300">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#EB4604] font-bold">
                      Fondation
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-white/10 text-[10px] font-mono text-neutral-300">
                      Collectif Tech &amp; Design
                    </span>
                  </div>
                  <div className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white font-mono pt-1">
                    EST. 2024
                  </div>
                  <p className="text-neutral-300 text-xs sm:text-sm font-light leading-relaxed pt-1">
                    Un collectif d&apos;ingénieurs et de designers unis pour concevoir des moteurs numériques durables.
                  </p>
                </div>
              </div>
            </RevealOnScroll>

            {/* Bottom Stat: Ancrage Dakar (Solid Crisp White Card) */}
            <RevealOnScroll delay={0.35} className="flex-1 flex">
              <div className="w-full rounded-[24px] sm:rounded-[28px] bg-white p-7 sm:p-8 border border-[#E5E7EB] shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_35px_rgba(0,0,0,0.06)] hover:border-neutral-300 transition-all duration-300 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 font-bold">
                      Ancrage &amp; Portée
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-neutral-100 text-[10px] font-mono text-neutral-600">
                      International
                    </span>
                  </div>
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#0A0A0A] font-mono pt-1">
                    Dakar, Sénégal
                  </div>
                  <p className="text-neutral-600 text-xs sm:text-sm font-light leading-relaxed pt-1">
                    Fondé à Dakar avec un rayonnement global pour propulser les leaders africains et internationaux.
                  </p>
                </div>
              </div>
            </RevealOnScroll>
          </div>

          {/* ═══════════════════════════════════════════════════════════
              CARD 3 (Right): "01 Ancrage & Vision" — Manifesto Quote & Collective
              ═══════════════════════════════════════════════════════════ */}
          <div className="lg:col-span-4 flex">
            <RevealOnScroll delay={0.4} className="w-full">
              <div className="w-full h-full min-h-[380px] sm:min-h-[420px] rounded-[28px] sm:rounded-[32px] bg-white border border-[#E5E7EB] p-7 sm:p-9 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_35px_rgba(0,0,0,0.06)] hover:border-neutral-300 transition-all duration-500 flex flex-col justify-between group">
                {/* Header & Quote Statement */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-[#EB4604] font-bold">
                    <span>01</span>
                    <span className="w-4 h-px bg-[#EB4604]/40" />
                    <span>Ancrage &amp; Vision</span>
                  </div>

                  <div className="text-4xl sm:text-5xl text-[#0A0A0A] font-serif leading-none select-none">
                    “
                  </div>
                  <blockquote className="text-base sm:text-[17px] text-[#0A0A0A] font-medium leading-relaxed">
                    Nous ne créons pas de simples vitrines ; nous bâtissons des moteurs numériques évolutifs permettant aux entreprises de dominer leurs secteurs.
                  </blockquote>
                </div>

                {/* Bottom Collective Identity & Team Avatars */}
                <div className="pt-6 border-t border-neutral-100 space-y-3">
                  <div className="flex items-center gap-3">
                    {/* Overlapping Founders Avatars */}
                    <div className="flex -space-x-2 shrink-0">
                      <div className="relative w-8 h-8 rounded-full overflow-hidden border-2 border-white shadow-xs">
                        <Image
                          src="/images/brand/Ndiaga.png"
                          alt="Ndiaga Lo"
                          fill
                          sizes="32px"
                          className="object-cover"
                        />
                      </div>
                      <div className="relative w-8 h-8 rounded-full overflow-hidden border-2 border-white shadow-xs">
                        <Image
                          src="/images/brand/Fanta.png"
                          alt="Fanta Ndao Tine"
                          fill
                          sizes="32px"
                          className="object-cover"
                        />
                      </div>
                      <div className="relative w-8 h-8 rounded-full overflow-hidden border-2 border-white shadow-xs">
                        <Image
                          src="/images/brand/Seydina.png"
                          alt="Seydina Mohamed Diop"
                          fill
                          sizes="32px"
                          className="object-cover"
                        />
                      </div>
                      <div className="relative w-8 h-8 rounded-full overflow-hidden border-2 border-white shadow-xs">
                        <Image
                          src="/images/brand/Serigne fallou.png"
                          alt="Serigne Fallou Seck"
                          fill
                          sizes="32px"
                          className="object-cover"
                        />
                      </div>
                    </div>

                    <div className="space-y-0.5 min-w-0">
                      <p className="text-xs font-semibold text-neutral-900 truncate">
                        Le Collectif SPARKLINE
                      </p>
                      <p className="text-[10px] font-mono text-neutral-500 truncate">
                        Ingénieurs, Designers &amp; Stratèges
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </Container>
    </section>
  )
}
