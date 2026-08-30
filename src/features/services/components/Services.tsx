'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Container } from '@/components/layout/Container'
import { Section } from '@/components/layout/Section'
import { Tag } from '@/components/ui/Tag'
import { RevealOnScroll } from '@/components/motion/RevealOnScroll'
import { SpotlightCard } from '@/components/motion/SpotlightCard'

interface ServiceStackItemData {
  id: string
  number: string
  title: string
  category: string
  tag: string
  description: string
  deliverables: string[]
  image: string
  href: string
}

const serviceStackItems: ServiceStackItemData[] = [
  {
    id: 'digital-solutions',
    number: '01',
    title: 'Solutions Digitales & Web',
    category: 'INGÉNIERIE & TECH',
    tag: 'DÉVELOPPEMENT & ARCHITECTURE',
    description:
      'Développement de plateformes web sur mesure, applications SaaS complexes, architectures cloud évolutives et API ultra-performantes.',
    deliverables: [
      'Plateformes Web & Portails',
      'Applications SaaS & Métier',
      'Architectures Cloud & API',
      'E-commerce & Mobile Money',
    ],
    image: '/images/services/development.jpg',
    href: '/services/digital-solutions',
  },
  {
    id: 'ui-ux-design',
    number: '02',
    title: 'UI/UX Design & Produit',
    category: 'DESIGN PRODUIT',
    tag: 'EXPÉRIENCE UTILISATEUR',
    description:
      "Conception d'expériences utilisateurs intuitives, wireframes, prototypes interactifs et design systems pérennes pour maximiser la rétention.",
    deliverables: [
      'UX Research & Parcours Utilisateur',
      'Prototypage Haute Fidélité',
      'Design Systems sur mesure',
      'Audits d’ergonomie & Accessibilité',
    ],
    image: '/images/services/ui-ux.jpg',
    href: '/services/ui-ux-design',
  },
  {
    id: 'mobile-design',
    number: '03',
    title: 'Design & Apps Mobiles',
    category: 'APPLICATIONS MOBILES',
    tag: 'IOS & ANDROID',
    description:
      'Création d’applications mobiles immersives, ergonomiques et véloces, pensées pour offrir un parcours fluide et engageant au quotidien.',
    deliverables: [
      'Applications iOS & Android',
      'Expériences Mobiles First',
      'PWA & Micro-interactions',
      'Intégration d’API & Temps Réel',
    ],
    image: '/images/services/mobile.jpg',
    href: '/services/digital-solutions',
  },
  {
    id: 'branding-design',
    number: '04',
    title: 'Identité Visuelle & Branding',
    category: 'IMAGE DE MARQUE',
    tag: 'STRATÉGIE & IDENTITÉ',
    description:
      'Création d’identités de marque mémorables, chartes graphiques complètes, systèmes visuels distinctifs et supports de communication stratégiques.',
    deliverables: [
      'Logo & Univers Visuel',
      'Charte Graphique & Guidelines',
      'Storytelling & Territoire de Marque',
      'Direction Artistique Globale',
    ],
    image: '/images/services/branding.jpg',
    href: '/services/branding-communication',
  },
]

export function Services() {
  return (
    <Section id="services" className="pt-10 sm:pt-16 lg:pt-20 pb-20 sm:pb-28 lg:pb-36 bg-white">
      <Container>
        {/* ── Top Editorial Header ── */}
        <div className="space-y-6 mb-12 sm:mb-16 lg:mb-20">
          <RevealOnScroll>
            <Tag variant="v2">Nos Expertises</Tag>
          </RevealOnScroll>

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 lg:gap-16">
            <RevealOnScroll delay={0.1}>
              <h2
                className="text-[clamp(2.25rem,4.8vw,60px)] font-normal text-[#0A0A0A] leading-[1.08] tracking-[-0.03em] max-w-2xl flex flex-wrap items-center gap-x-3 gap-y-2"
                style={{ fontFamily: 'var(--font-family--primary-font)' }}
              >
                <span>Tout ce dont</span>
                <span className="inline-flex items-center justify-center w-12 h-7 sm:w-16 sm:h-9 rounded-full overflow-hidden border border-neutral-300 relative align-middle shadow-md shrink-0 -translate-y-0.5">
                  <Image
                    src="/images/services/header-avatar.jpg"
                    alt="Portrait"
                    fill
                    quality={100}
                    sizes="64px"
                    className="object-cover"
                  />
                </span>
                <span>vous avez besoin pour dominer votre marché.</span>
              </h2>
            </RevealOnScroll>

            <RevealOnScroll delay={0.2}>
              <div className="space-y-3 max-w-sm">
                <p className="text-sm sm:text-base text-neutral-500 font-normal leading-relaxed">
                  Nous combinons stratégie, design de haut niveau et ingénierie de précision pour propulser votre entreprise.
                </p>
                <Link
                  href="/services"
                  className="group inline-flex items-center gap-2 text-[#0A0A0A] font-medium text-sm whitespace-nowrap pb-1 border-b border-dashed border-neutral-400 hover:border-[#EB4604] hover:text-[#EB4604] transition-colors"
                >
                  <span>Explorer toutes nos expertises</span>
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </Link>
              </div>
            </RevealOnScroll>
          </div>
        </div>

        {/* ── Ultra-Smooth GPU Hardware-Accelerated Scroll Stack ── */}
        <div className="relative pb-12">
          {serviceStackItems.map((service, idx) => {
            // Precise incremental sticky top offset
            const topOffset = `calc(5.5rem + ${idx * 28}px)`

            return (
              <div
                key={service.id}
                className="sticky mb-8 sm:mb-12 last:mb-0 transition-all duration-300"
                style={{
                  top: topOffset,
                  zIndex: (idx + 1) * 10,
                  transform: 'translateZ(0)',
                  willChange: 'transform',
                }}
              >
                <SpotlightCard className="rounded-[28px] sm:rounded-[36px] bg-[#070709] text-white border border-neutral-800/90 shadow-[0_20px_50px_rgba(0,0,0,0.5)] p-6 sm:p-10 lg:p-14 overflow-hidden">
                  {/* Subtle ambient orbital glow */}
                  <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-[#EB4604]/20 via-transparent to-transparent rounded-full blur-3xl pointer-events-none" />

                  <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
                    {/* Left Column: Text Content & Deliverables */}
                    <div className="lg:col-span-7 space-y-6">
                      <div className="flex items-center gap-3">
                        <span className="text-[#EB4604] font-mono text-xl sm:text-2xl font-bold tracking-tight">
                          [{service.number}]
                        </span>
                        <span className="px-3.5 py-1 rounded-full bg-white/10 text-white text-[11px] font-mono font-medium uppercase tracking-wider backdrop-blur-sm border border-white/10">
                          {service.tag}
                        </span>
                      </div>

                      <h3
                        className="text-2xl sm:text-4xl lg:text-5xl font-semibold text-white tracking-tight leading-[1.1]"
                        style={{ fontFamily: 'var(--font-family--primary-font)' }}
                      >
                        {service.title}
                      </h3>

                      <p className="text-neutral-300 text-sm sm:text-base lg:text-lg leading-relaxed font-light">
                        {service.description}
                      </p>

                      {/* Deliverables Grid */}
                      <div className="pt-4 border-t border-white/10 space-y-3">
                        <h4 className="text-xs uppercase font-mono tracking-wider text-neutral-400 font-semibold">
                          Livrables & Piliers Clés
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                          {service.deliverables.map((item, dIdx) => (
                            <div key={dIdx} className="flex items-center gap-2 text-xs sm:text-sm text-neutral-200 font-medium">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#EB4604] shrink-0" />
                              <span>{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* CTA Button */}
                      <div className="pt-2">
                        <Link
                          href={service.href}
                          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#EB4604] text-white text-xs sm:text-sm font-semibold hover:bg-[#D43D00] transition-all duration-300 shadow-lg shadow-[#EB4604]/25 group"
                        >
                          <span>Découvrir le service</span>
                          <span className="transition-transform group-hover:translate-x-1">→</span>
                        </Link>
                      </div>
                    </div>

                    {/* Right Column: 4:3 Visual Image */}
                    <div className="lg:col-span-5">
                      <div className="relative aspect-[4/3] rounded-2xl sm:rounded-3xl overflow-hidden bg-neutral-900 border border-white/10 shadow-2xl group/img">
                        <Image
                          src={service.image}
                          alt={service.title}
                          fill
                          quality={100}
                          unoptimized
                          className="object-cover transition-transform duration-700 ease-out group-hover/img:scale-105"
                          sizes="(max-width: 1024px) 100vw, 450px"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between pointer-events-none z-10">
                          <span className="px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md text-[11px] font-mono text-white border border-white/10">
                            SPARKLINE • {service.category}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </SpotlightCard>
              </div>
            )
          })}
        </div>
      </Container>
    </Section>
  )
}
