'use client'

import React, { useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useInView, type Variants } from 'framer-motion'
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

// ── Motion Variants for Staggered Sequential Scroll Animation (Zero Overlapping) ──
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.18,
      delayChildren: 0.05,
    },
  },
}

const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 35,
    scale: 0.96,
    filter: 'blur(6px)',
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 18,
      mass: 0.8,
    },
  },
}

export function Approach() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: false, amount: 0.2 })
  const [, setHoveredIdx] = useState<number | null>(null)

  return (
    <Section id="approach" className="relative py-16 sm:py-20 lg:py-24 bg-[#FAFAFC] overflow-hidden">
      {/* ── Soft Ambient Background Lighting ── */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-gradient-to-br from-[#EB4604]/4 via-[#FFB901]/2 to-transparent rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-[450px] h-[450px] bg-gradient-to-tr from-[#EB4604]/3 to-transparent rounded-full blur-[120px] pointer-events-none" />

      <Container className="relative z-10">
        {/* ── Top Editorial Header ── */}
        <div className="space-y-5 mb-10 sm:mb-14">
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

        {/* ── Sequential Animated 2x2 Grid of Step Cards ── */}
        <motion.div
          ref={containerRef}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6"
        >
          {steps.map((step, idx) => (
            <motion.div
              key={step.number}
              variants={cardVariants}
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
              className="relative h-[240px] sm:h-[260px] lg:h-[280px] rounded-[28px] sm:rounded-[32px] overflow-hidden group shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_24px_60px_rgba(0,0,0,0.2)] border border-neutral-200/80 hover:border-[#EB4604]/50 transition-all duration-700 cursor-pointer bg-[#0A0A0E] will-change-transform"
            >
              {/* Background High-Definition Photography with Parallax Zoom */}
              <Image
                src={step.image}
                alt={step.title}
                fill
                quality={100}
                unoptimized
                className="object-cover transition-transform duration-1000 ease-out group-hover:scale-108 filter brightness-[0.72] contrast-[1.06]"
                sizes="(max-width: 768px) 100vw, 50vw"
              />

              {/* Dark Gradient Overlay for Maximum Readability */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/92 via-black/70 to-black/45 transition-opacity duration-500 group-hover:opacity-85" />

              {/* Signature Orange Atmospheric Light Accent on Hover */}
              <div className="absolute top-0 right-0 w-72 h-72 bg-[#EB4604]/25 rounded-full blur-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

              {/* Card Content Layout */}
              <div className="relative z-10 w-full h-full p-6 sm:p-8 lg:p-10 flex items-center justify-between gap-4 sm:gap-8">
                {/* Left: Giant Outline Glass Number with Smooth Entrance */}
                <motion.div
                  initial={{ scale: 0.85, opacity: 0 }}
                  animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.85, opacity: 0 }}
                  transition={{ delay: 0.15 + idx * 0.15, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  className="shrink-0"
                >
                  <span
                    className="text-[85px] sm:text-[110px] lg:text-[130px] font-extralight tracking-tighter text-white/30 group-hover:text-white/65 transition-all duration-500 select-none leading-none block group-hover:scale-105"
                    style={{
                      fontFamily: 'var(--font-family--primary-font)',
                      fontVariantNumeric: 'tabular-nums',
                    }}
                  >
                    {step.number}
                  </span>
                </motion.div>

                {/* Right: Step Subtitle, Title & Description with Staggered Entrance */}
                <motion.div
                  initial={{ x: 15, opacity: 0 }}
                  animate={isInView ? { x: 0, opacity: 1 } : { x: 15, opacity: 0 }}
                  transition={{ delay: 0.2 + idx * 0.15, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="space-y-1.5 sm:space-y-2 max-w-[250px] sm:max-w-[310px] text-left"
                >
                  <div className="inline-flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#EB4604]" />
                    <span className="text-[10px] sm:text-[11px] font-mono font-semibold uppercase tracking-widest text-[#EB4604] block">
                      {step.subtitle}
                    </span>
                  </div>

                  <h3
                    className="text-lg sm:text-xl lg:text-2xl font-bold text-white tracking-tight leading-snug group-hover:text-white transition-colors"
                    style={{ fontFamily: 'var(--font-family--primary-font)' }}
                  >
                    {step.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed">
                    {step.description}
                  </p>
                </motion.div>
              </div>

              {/* Bottom Subtle Glowing Border Highlight */}
              <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#EB4604]/0 group-hover:via-[#EB4604]/80 to-transparent transition-all duration-700" />
            </motion.div>
          ))}
        </motion.div>

        {/* ── Refined Studio Action Dock (No Overlapping & Balanced Spacing) ── */}
        <RevealOnScroll delay={0.35}>
          <div className="flex justify-center mt-10 sm:mt-12">
            <div className="inline-flex flex-col sm:flex-row items-center gap-3 sm:gap-6 p-2 sm:p-2.5 sm:pl-6 rounded-[28px] sm:rounded-full bg-white border border-neutral-200/90 shadow-[0_10px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_16px_40px_rgba(0,0,0,0.08)] hover:border-neutral-300 transition-all duration-300 group">
              {/* Left Live Status indicator */}
              <div className="flex items-center gap-2.5 px-3 py-1 sm:px-0 sm:py-0">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#EB4604] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#EB4604]" />
                </span>
                <span className="text-xs sm:text-sm font-medium text-neutral-600">
                  Prêt à donner vie à votre projet ?
                </span>
              </div>

              {/* Right Action Button with Interactive Arrow */}
              <Link
                href="/contact"
                className="inline-flex items-center gap-2.5 px-6 py-2.5 sm:py-3 rounded-full bg-[#0A0A0E] group-hover:bg-[#EB4604] text-white text-xs sm:text-sm font-semibold transition-all duration-300 shadow-md group-hover:shadow-lg group-hover:shadow-[#EB4604]/25 shrink-0"
              >
                <span>Démarrer maintenant</span>
                <span className="w-5 h-5 rounded-full bg-white/15 flex items-center justify-center text-[10px] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                  ↗
                </span>
              </Link>
            </div>
          </div>
        </RevealOnScroll>
      </Container>
    </Section>
  )
}
