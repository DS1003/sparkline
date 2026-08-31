'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Container } from '@/components/layout/Container'
import { Section } from '@/components/layout/Section'
import { Tag } from '@/components/ui/Tag'
import { RevealOnScroll } from '@/components/motion/RevealOnScroll'

interface Step {
  number: string
  subtitle: string
  title: string
  description: string
  image: string
}

const steps: Step[] = [
  {
    number: '01',
    subtitle: 'Immersion & Stratégie',
    title: 'Cadrage & Découverte',
    description:
      'Analyse approfondie de votre vision, de vos défis clés et alignement des objectifs stratégiques pour poser des fondations inébranlables.',
    image: '/images/approach/step-1.jpg',
  },
  {
    number: '02',
    subtitle: 'Conception & Ergonomie',
    title: 'Architecture & UX/UI',
    description:
      'Création d’interfaces intuitives, design systems pérennes et modélisation technique prête à absorber votre croissance.',
    image: '/images/approach/step-2.jpg',
  },
  {
    number: '03',
    subtitle: 'Ingénierie de Pointe',
    title: 'Développement Agile',
    description:
      'Développement logiciel haute performance, code maintenable et intégration continue selon les meilleurs standards.',
    image: '/images/approach/step-3.jpg',
  },
  {
    number: '04',
    subtitle: 'Production & Croissance',
    title: 'Mise en Ligne & Impact',
    description:
      'Déploiement sécurisé, monitoring en temps réel et optimisations continues pour maximiser durablement votre retour sur investissement.',
    image: '/images/approach/step-4.jpg',
  },
]

export function Approach() {
  return (
    <Section id="approach" className="relative py-20 sm:py-28 lg:py-36 bg-[#FAFAFC] overflow-hidden">
      {/* ── Soft Ambient Glow ── */}
      <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-gradient-to-br from-[#EB4604]/5 via-[#FFB901]/3 to-transparent rounded-full blur-[140px] pointer-events-none" />

      <Container className="relative z-10">
        {/* ── Top Editorial Header (Matching Reference Style) ── */}
        <div className="space-y-6 mb-12 sm:mb-16">
          <RevealOnScroll>
            <Tag variant="v2">Notre Méthodologie</Tag>
          </RevealOnScroll>

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 lg:gap-16">
            <RevealOnScroll delay={0.1}>
              <h2
                className="text-[clamp(2.25rem,4.5vw,56px)] font-normal text-[#0A0A0A] leading-[1.06] tracking-[-0.03em] max-w-2xl"
                style={{ fontFamily: 'var(--font-family--primary-font)' }}
              >
                De l’idée à l’impact en quatre étapes.
              </h2>
            </RevealOnScroll>

            <RevealOnScroll delay={0.15}>
              <p className="text-sm sm:text-base text-neutral-500 font-normal leading-relaxed max-w-sm lg:text-right">
                Une méthode éprouvée pour structurer chaque projet, garantissant une vélocité maximale et des résultats mesurables.
              </p>
            </RevealOnScroll>
          </div>
        </div>

        {/* ── 2x2 Grid of Cinematic Photographic Step Cards ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {steps.map((step, idx) => (
            <RevealOnScroll key={step.number} delay={0.1 + idx * 0.1}>
              <div className="relative h-[240px] sm:h-[260px] lg:h-[280px] rounded-[32px] overflow-hidden group shadow-[0_12px_36px_rgba(0,0,0,0.06)] hover:shadow-[0_24px_60px_rgba(0,0,0,0.2)] border border-neutral-200/70 hover:border-[#EB4604]/40 transition-all duration-700 cursor-pointer bg-neutral-900">
                {/* Background High-Definition Photography */}
                <Image
                  src={step.image}
                  alt={step.title}
                  fill
                  quality={100}
                  unoptimized
                  className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105 filter brightness-[0.72] contrast-[1.06]"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />

                {/* Dark Gradient Overlay for Maximum Readability */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/65 to-black/45 transition-opacity duration-500 group-hover:opacity-85" />

                {/* Warm Atmospheric Light Accent on Hover */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#EB4604]/20 rounded-full blur-[90px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                {/* Card Content Layout (Left Giant Outline Number + Right Text Block) */}
                <div className="relative z-10 w-full h-full p-6 sm:p-8 lg:p-10 flex items-center justify-between gap-4 sm:gap-8">
                  {/* Left: Giant Outline Glass Number */}
                  <div className="shrink-0">
                    <span
                      className="text-[90px] sm:text-[115px] lg:text-[135px] font-extralight tracking-tighter text-white/30 group-hover:text-white/60 transition-all duration-500 select-none leading-none block group-hover:scale-105"
                      style={{
                        fontFamily: 'var(--font-family--primary-font)',
                        fontVariantNumeric: 'tabular-nums',
                      }}
                    >
                      {step.number}
                    </span>
                  </div>

                  {/* Right: Step Subtitle, Title & Description */}
                  <div className="space-y-1.5 sm:space-y-2 max-w-[250px] sm:max-w-[300px] text-left">
                    <span className="text-[10px] sm:text-[11px] font-mono font-semibold uppercase tracking-widest text-[#EB4604] block">
                      {step.subtitle}
                    </span>

                    <h3
                      className="text-lg sm:text-xl lg:text-2xl font-bold text-white tracking-tight leading-snug group-hover:text-white transition-colors"
                      style={{ fontFamily: 'var(--font-family--primary-font)' }}
                    >
                      {step.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>

        {/* ── Bottom CTA ── */}
        <RevealOnScroll delay={0.4}>
          <div className="flex justify-center mt-12 sm:mt-16">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#EB4604] hover:bg-[#D43D00] text-white text-sm font-semibold transition-all duration-300 shadow-lg shadow-[#EB4604]/25 hover:shadow-[#EB4604]/40 hover:scale-[1.02] group"
            >
              <span>Démarrer votre projet</span>
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </RevealOnScroll>
      </Container>
    </Section>
  )
}
