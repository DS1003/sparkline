import React from 'react'
import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { SectionCTA } from '@/components/layout/SectionCTA'
import { Container } from '@/components/layout/Container'
import { Section } from '@/components/layout/Section'
import { RevealOnScroll } from '@/components/motion/RevealOnScroll'
import { Tag } from '@/components/ui/Tag'
import { WhatDrivesUs } from '@/features/about/components/WhatDrivesUs'
import { TechConstellation } from '@/features/about/components/TechConstellation'
import { OurStoryBento } from '@/features/about/components/OurStoryBento'

export const metadata: Metadata = {
  title: 'À propos | SPARKLINE — Manifeste, Vision & Ingénierie Digitale',
  description:
    'SPARKLINE crée une ligne directe entre les idées, la stratégie et la technologie pour métamorphoser les ambitions en solutions concrètes et durables.',
}

export default async function AboutPage() {

  return (
    <main className="min-h-screen bg-white text-neutral-900">
      {/* 1. Stodio-Inspired About Hero Section */}
      <section className="w-full bg-white p-2.5 sm:p-3.5 md:p-4 lg:p-5">
        <div className="relative rounded-2xl md:rounded-[20px] bg-[#070709] text-white overflow-hidden p-5 sm:p-7 lg:p-8 xl:p-11 min-h-[440px] sm:min-h-[480px] lg:min-h-[500px] xl:min-h-[560px] flex flex-col justify-between items-center text-center shadow-2xl">
          {/* High-Performance Lightweight Ambient Lighting (Zero External Network Overhead) */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(235,70,4,0.14)_0%,transparent_65%)] pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(255,185,1,0.06)_0%,transparent_60%)] pointer-events-none" />

          {/* Central Radial Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] bg-gradient-to-tr from-[#EB4604]/20 via-[#FFB901]/10 to-transparent rounded-full blur-[100px] sm:blur-[150px] pointer-events-none" />

          {/* Integrated Navbar Inside Hero Card (Matches Homepage) */}
          <Navbar />

          {/* Top: Tag Badge matching official design */}
          <div className="relative z-10 pt-2 sm:pt-4 flex justify-center">
            <RevealOnScroll>
              <Tag variant="base">Qui sommes-nous</Tag>
            </RevealOnScroll>
          </div>

          {/* Center: Hero Headline with Inline Portrait Pill */}
          <div className="relative z-10 my-auto max-w-5xl py-4 sm:py-6 space-y-3 sm:space-y-4">
            <RevealOnScroll delay={0.1}>
              <h1
                className="text-3xl sm:text-5xl md:text-5xl lg:text-[56px] xl:text-7xl 2xl:text-8xl font-bold tracking-tight text-white leading-[1.08]"
                style={{ fontFamily: 'var(--font-family--primary-font)' }}
              >
                Bâtir des réussites
                <br className="hidden sm:inline" />
                {' '}<span className="text-[#EB4604]">digitales</span>{' '}
                <span className="inline-flex items-center align-middle mx-1 sm:mx-2.5 my-0.5 overflow-hidden rounded-full w-12 h-7 sm:w-16 sm:h-10 md:w-18 md:h-11 xl:w-24 xl:h-14 border-2 border-white/30 shadow-lg relative shrink-0 transition-transform duration-300 hover:scale-105">
                  <Image
                    src="/images/asset-usage/ChatGPT Image Sep 3, 2026, 12_52_44 AM.webp"
                    alt="Créateur SPARKLINE"
                    fill
                    priority
                    quality={95}
                    className="object-cover"
                    sizes="120px"
                  />
                </span>{' '}
                <span className="text-[#EB4604]">durables.</span>
              </h1>
            </RevealOnScroll>
          </div>

          {/* Bottom Bar: Agency Category & Breadcrumbs (Unified with all sub-pages) */}
          <div className="relative z-10 w-full pt-3 sm:pt-5 border-t border-white/10 flex items-center justify-between text-[9px] sm:text-xs font-mono text-neutral-400 uppercase tracking-wider xl:tracking-widest px-0.5 sm:px-2 whitespace-nowrap gap-2 overflow-hidden">
            <span className="shrink-0 truncate">STUDIO DIGITAL & CRÉATIF</span>
            <span className="shrink-0 font-medium inline-flex items-center gap-1 sm:gap-1.5">
              <Link href="/" className="hover:text-white transition-colors duration-200">
                Accueil
              </Link>
              <span className="text-white/40">/</span>
              <span className="text-[#EB4604]">À propos</span>
            </span>
          </div>
        </div>
      </section>

      {/* 2. OUR STORY Bento Section (Adapted from Reference Design) */}
      <OurStoryBento />

      {/* 3. The Core Concept: Spark & Line (Adapted from Reference Design) */}
      <section className="py-20 lg:py-28 bg-white border-b border-[#e2e2e7]" id="concept">
        <Container>
          {/* ── Top Editorial Header (Exact Match to Tech Constellation) ── */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 lg:gap-16 mb-12 sm:mb-16">
            <div className="space-y-4 max-w-xl">
              <RevealOnScroll>
                <Tag variant="v2">La Dualité Fondatrice</Tag>
              </RevealOnScroll>
              <RevealOnScroll delay={0.1}>
                <h2
                  className="text-3xl sm:text-5xl lg:text-[52px] font-normal text-[#0A0A0A] leading-[1.08] tracking-[-0.035em]"
                  style={{ fontFamily: 'var(--font-family--primary-font)' }}
                >
                  L’Anatomie de SPARKLINE <br className="hidden sm:inline" />
                  Énergie &amp; Direction.
                </h2>
              </RevealOnScroll>
            </div>

            <RevealOnScroll delay={0.15}>
              <p className="text-sm sm:text-base text-neutral-500 font-light leading-relaxed max-w-md lg:text-right">
                Notre identité s’articule autour de deux principes complémentaires qui guident chaque produit que nous concevons : l’audace de l’étincelle créative et la rigueur de la trajectoire stratégique.
              </p>
            </RevealOnScroll>
          </div>

          {/* Master Bento Container (Inverted Pyramid Layout on Mobile: SPARK & LINE side-by-side, Image centered below) */}
          <RevealOnScroll delay={0.2}>
            <div className="rounded-[28px] sm:rounded-[44px] bg-[#070709] p-2.5 sm:p-4 md:p-5 border border-white/10 shadow-2xl overflow-hidden">
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-4 items-stretch">
                {/* ── Block 01: SPARK (Highlighted Accent Card - Solid Orange #EB4604) ── */}
                <div className="col-span-1 rounded-[20px] sm:rounded-[32px] bg-[#EB4604] text-white p-4 sm:p-7 md:p-9 flex flex-col justify-between space-y-3 sm:space-y-6 shadow-md min-h-[240px] sm:min-h-[300px] group transition-all duration-300 hover:scale-[1.01]">
                  <div>
                    <span className="text-base sm:text-2xl font-bold font-mono block mb-2 sm:mb-4">
                      01
                    </span>
                    <h3
                      className="text-sm sm:text-2xl lg:text-3xl font-bold text-white tracking-tight leading-snug sm:leading-tight mb-2 sm:mb-3"
                      style={{ fontFamily: 'var(--font-family--primary-font)' }}
                    >
                      SPARK (L&apos;Étincelle)
                    </h3>
                    <p className="text-white/90 text-[11px] sm:text-sm lg:text-base leading-snug sm:leading-relaxed font-light">
                      L&apos;impulsion créative, la vision de rupture, l&apos;intuition esthétique et l&apos;ambition qui bousculent le statu quo. Sans étincelle, aucune transformation ne prend vie.
                    </p>
                  </div>

                  <div className="pt-2 sm:pt-4 border-t border-white/20">
                    <span className="text-[9px] sm:text-xs font-mono font-semibold uppercase tracking-wider text-white/80 block">
                      [ CRÉATIVITÉ • AUDACE ]
                    </span>
                  </div>
                </div>

                {/* ── Block 02: LINE (White Background Card) ── */}
                <div className="col-span-1 rounded-[20px] sm:rounded-[32px] bg-white text-neutral-900 p-4 sm:p-7 md:p-9 flex flex-col justify-between space-y-3 sm:space-y-6 min-h-[240px] sm:min-h-[300px] shadow-md group transition-all duration-300 hover:scale-[1.01]">
                  <div>
                    <span className="text-base sm:text-2xl font-bold font-mono text-neutral-900 block mb-2 sm:mb-4">
                      02
                    </span>
                    <h3
                      className="text-sm sm:text-2xl lg:text-3xl font-bold text-neutral-900 tracking-tight leading-snug sm:leading-tight mb-2 sm:mb-3"
                      style={{ fontFamily: 'var(--font-family--primary-font)' }}
                    >
                      LINE (La Ligne)
                    </h3>
                    <p className="text-neutral-600 text-[11px] sm:text-sm lg:text-base leading-snug sm:leading-relaxed font-light">
                      La trajectoire d&apos;impact. L&apos;ingénierie logicielle rigoureuse, la direction claire et la discipline qui relient une idée brute à un impact économique mesurable et pérenne.
                    </p>
                  </div>

                  <div className="pt-2 sm:pt-4 border-t border-neutral-200/80">
                    <span className="text-[9px] sm:text-xs font-mono font-semibold uppercase tracking-wider text-neutral-500 block">
                      [ STRATÉGIE • IMPACT ]
                    </span>
                  </div>
                </div>

                {/* ── Block 03: 3D Abstract Ribbon Sculpture Window (Centered below across both columns on mobile) ── */}
                <div className="col-span-2 lg:col-span-1 rounded-[20px] sm:rounded-[32px] overflow-hidden relative min-h-[190px] sm:min-h-[260px] lg:min-h-[300px] bg-neutral-900 border border-white/10 group">
                  <Image
                    src="/images/approach/sparkline-synergy.webp"
                    alt="SPARKLINE 3D Creative Synergy"
                    fill
                    quality={90}
                    sizes="(max-width: 1024px) 100vw, 400px"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                </div>
              </div>
            </div>
          </RevealOnScroll>
        </Container>
      </section>

      {/* 4. Connected Landscape Tech Constellation */}
      <TechConstellation />

      {/* 5. Section CTA */}
      <SectionCTA
        title="BÂTISSONS VOTRE EMPREINTE DIGITALE."
        subtitle="Transformez vos idées en solutions numériques d'exception avec SPARKLINE."
        primaryLabel="Démarrer un projet"
        primaryHref="/contact?inquiry=project"
      />

      <Footer />
    </main>
  )
}
