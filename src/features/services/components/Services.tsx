'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Container } from '@/components/layout/Container'
import { Section } from '@/components/layout/Section'
import { Tag } from '@/components/ui/Tag'
import { RevealOnScroll } from '@/components/motion/RevealOnScroll'
import { SpotlightCard } from '@/components/motion/SpotlightCard'
import ScrollStack, { ScrollStackItem } from '@/components/motion/ScrollStack'

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
    title: 'Solutions Digitales Web & Mobile',
    category: 'INGÉNIERIE & TECH',
    tag: 'DÉVELOPPEMENT & ARCHITECTURE',
    description:
      'Développement de plateformes web sur mesure, applications mobiles iOS & Android, architectures logicielles évolutives et API ultra-performantes.',
    deliverables: [
      'Plateformes Web & Portails',
      'Applications Mobiles (iOS & Android)',
      'Applications SaaS & Métier',
      'Architectures API & Microservices',
    ],
    image: '/images/services/card1.png',
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
    image: '/images/services/card2.png',
    href: '/services/ui-ux-design',
  },
  {
    id: 'cloud-devops',
    number: '03',
    title: 'Cloud & DevOps',
    category: 'INFRASTRUCTURE & CLOUD',
    tag: 'DÉPLOIEMENT & SÉCURITÉ',
    description:
      'Conception d’infrastructures cloud résilientes, automatisation de pipelines CI/CD, conteneurisation et monitoring proactif pour garantir une haute disponibilité.',
    deliverables: [
      'Architectures Cloud (AWS, Vercel, GCP)',
      'Pipelines CI/CD & Automatisation',
      'Conteneurisation Docker & Orchestration',
      'Sécurité, Monitoring & 99.9% Uptime',
    ],
    image: '/images/services/card3.png',
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
    image: '/images/services/card4.png',
    href: '/services/branding-communication',
  },
  {
    id: 'audiovisual',
    number: '05',
    title: 'Audiovisuel & Voix Off',
    category: 'PRODUCTION & MOTION',
    tag: 'CONTENUS & MOTION DESIGN',
    description:
      'Production de contenus vidéo percutants, animations 2D/3D immersives, identités sonores et voix off professionnelles pour sublimer vos messages.',
    deliverables: [
      'Vidéos & Spots Produit',
      'Motion Design 2D & 3D',
      'Voix Off & Sound Design',
      'Contenus Vidéo Réseaux Sociaux',
    ],
    image: '/images/services/card5.png',
    href: '/services/audiovisual',
  },
]

interface ServicesProps {
  isServicesPage?: boolean
  hideHeader?: boolean
}

export function Services({ isServicesPage = false, hideHeader = false }: ServicesProps) {
  return (
    <Section
      id="services"
      className={`${
        isServicesPage ? 'pt-8 sm:pt-12 pb-16 sm:pb-24 lg:pb-32' : 'pt-8 sm:pt-14 lg:pt-16 pb-16 sm:pb-24 lg:pb-32'
      } bg-white`}
    >
      <Container>
        {/* ── Top Editorial Header (Omitted if hideHeader is true, e.g. on /services where PageHero exists) ── */}
        {!hideHeader && (
          <div className="space-y-4 sm:space-y-6 mb-8 sm:mb-12 lg:mb-16">
            <RevealOnScroll>
              <Tag variant="v2">Nos Expertises</Tag>
            </RevealOnScroll>

            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 sm:gap-6 lg:gap-16">
              <RevealOnScroll delay={0.1}>
                <h2
                  className="text-[clamp(2rem,4vw,54px)] font-normal text-[#0A0A0A] leading-[1.12] tracking-[-0.03em] max-w-2xl"
                  style={{ fontFamily: 'var(--font-family--primary-font)' }}
                >
                  Tout ce dont{' '}
                  <span className="inline-flex items-center justify-center align-middle mx-1.5 sm:mx-2.5 -translate-y-[0.1em] w-11 h-6 sm:w-15 sm:h-8 md:w-18 md:h-9.5 rounded-full overflow-hidden border border-neutral-300/90 shadow-sm relative shrink-0 transition-transform duration-300 hover:scale-105">
                    <Image
                      src="/images/services/header-avatar.jpg"
                      alt="Portrait"
                      fill
                      quality={100}
                      sizes="80px"
                      className="object-cover"
                    />
                  </span>{' '}
                  vous avez besoin pour dominer votre marché.
                </h2>
              </RevealOnScroll>

              <RevealOnScroll delay={0.2}>
                <div className="space-y-2.5 max-w-sm">
                  <p className="text-xs sm:text-sm lg:text-base text-neutral-500 font-normal leading-relaxed">
                    Nous combinons stratégie, design de haut niveau et ingénierie de précision pour propulser votre entreprise.
                  </p>
                  {!isServicesPage && (
                    <Link
                      href="/services"
                      className="group inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-neutral-100/90 hover:bg-[#0A0A0A] text-neutral-900 hover:text-white border border-neutral-200/90 hover:border-[#0A0A0A] text-xs font-medium transition-all duration-300 shadow-2xs hover:shadow-md"
                    >
                      <span>Explorer toutes nos expertises</span>
                      <span className="w-4.5 h-4.5 rounded-full bg-white group-hover:bg-[#EB4604] group-hover:text-white text-neutral-900 flex items-center justify-center text-[10px] transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shadow-2xs">
                        ↗
                      </span>
                    </Link>
                  )}
                </div>
              </RevealOnScroll>
            </div>
          </div>
        )}

        {/* ── Ultra-Smooth GPU Hardware-Accelerated Scroll Stack (Responsive on Compact Laptops & Ultrawides) ── */}
        <ScrollStack
          useWindowScroll={true}
          itemDistance={65}
          itemScale={0.025}
          itemStackDistance={16}
          stackPosition="10%"
          scaleEndPosition="4%"
          baseScale={0.92}
          rotationAmount={0}
          blurAmount={0}
        >
          {serviceStackItems.map((service) => (
            <ScrollStackItem key={service.id}>
              <SpotlightCard className="rounded-[22px] sm:rounded-[32px] lg:rounded-[36px] bg-[#070709] text-white border border-neutral-800/90 shadow-[0_20px_50px_rgba(0,0,0,0.5)] p-5 sm:p-7 lg:p-8 xl:p-11 overflow-hidden">
                {/* Subtle ambient orbital glow */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-[#EB4604]/20 via-transparent to-transparent rounded-full blur-3xl pointer-events-none" />

                <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 lg:gap-8 xl:gap-12 items-center">
                  {/* Left Column: Text Content & Deliverables */}
                  <div className="lg:col-span-7 space-y-3 sm:space-y-4 xl:space-y-5">
                    <div className="flex items-center gap-2 sm:gap-2.5">
                      <span className="text-[#EB4604] font-mono text-base sm:text-xl xl:text-2xl font-bold tracking-tight">
                        [{service.number}]
                      </span>
                      <span className="px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-white/10 text-white text-[9.5px] sm:text-[10.5px] font-mono font-medium uppercase tracking-wider backdrop-blur-sm border border-white/10 truncate">
                        {service.tag}
                      </span>
                    </div>

                    <h3
                      className="text-lg sm:text-2xl lg:text-3xl xl:text-4xl font-semibold text-white tracking-tight leading-[1.12]"
                      style={{ fontFamily: 'var(--font-family--primary-font)' }}
                    >
                      {service.title}
                    </h3>

                    <p className="text-neutral-300 text-xs sm:text-sm xl:text-base leading-relaxed font-light line-clamp-3 lg:line-clamp-none">
                      {service.description}
                    </p>

                    {/* Deliverables Grid */}
                    <div className="pt-2 sm:pt-3 border-t border-white/10 space-y-1.5 sm:space-y-2">
                      <h4 className="text-[9.5px] sm:text-[11px] uppercase font-mono tracking-wider text-neutral-400 font-semibold">
                        Livrables & Piliers Clés
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 sm:gap-2">
                        {service.deliverables.map((item, dIdx) => (
                          <div key={dIdx} className="flex items-center gap-2 text-[11px] sm:text-xs xl:text-sm text-neutral-200 font-medium">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#EB4604] shrink-0" />
                            <span className="truncate">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* CTA Button */}
                    <div className="pt-1">
                      <Link
                        href="/contact?inquiry=services"
                        className="inline-flex items-center gap-2 px-4 sm:px-5 xl:px-6 py-2 sm:py-2.5 rounded-full bg-[#EB4604] text-white text-xs sm:text-sm font-semibold hover:bg-[#D43D00] transition-all duration-300 shadow-lg shadow-[#EB4604]/25 group"
                      >
                        <span>Contactez-nous</span>
                        <span className="transition-transform group-hover:translate-x-1">→</span>
                      </Link>
                    </div>
                  </div>

                  {/* Right Column: Visual Image (Full Artwork Integrity: 0% Cropping, 0% Zoom) */}
                  <div className="lg:col-span-5 flex items-center justify-center">
                    <div className="relative w-full aspect-[3/2] rounded-xl sm:rounded-2xl lg:rounded-3xl overflow-hidden bg-[#0A0A0C] border border-white/10 shadow-2xl flex items-center justify-center">
                      <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        quality={90}
                        className="object-contain p-0.5 sm:p-1"
                        sizes="(max-width: 1024px) 100vw, 480px"
                      />
                    </div>
                  </div>
                </div>
              </SpotlightCard>
            </ScrollStackItem>
          ))}
        </ScrollStack>
      </Container>
    </Section>
  )
}
