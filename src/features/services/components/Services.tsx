'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Container } from '@/components/layout/Container'
import { Section } from '@/components/layout/Section'
import { Tag } from '@/components/ui/Tag'
import { RevealOnScroll } from '@/components/motion/RevealOnScroll'

interface ServiceItem {
  id: string
  number: string
  title: string
  category: string
  tag: string
  description: string
  image: string
  href: string
}

const serviceItems: ServiceItem[] = [
  {
    id: 'ui-ux-design',
    number: '01',
    title: 'UI/UX Design',
    category: 'UI/UX DESIGN',
    tag: 'UI/UX DESIGN',
    description:
      'Concevoir des interfaces intuitives et des parcours fluides qui transforment les visiteurs en clients fidèles.',
    image: '/images/services/ui-ux.jpg',
    href: '/services/ui-ux-design',
  },
  {
    id: 'mobile-design',
    number: '02',
    title: 'Mobile Design',
    category: 'MOBILE DESIGN',
    tag: 'DESIGN MOBILE & APPS',
    description:
      "Développer des applications mobiles immersives, rapides et centrées sur l'utilisateur sur iOS et Android.",
    image: '/images/services/mobile.jpg',
    href: '/services/digital-solutions',
  },
  {
    id: 'development',
    number: '03',
    title: 'Development',
    category: 'DEVELOPMENT',
    tag: 'DÉVELOPPEMENT & TECH',
    description:
      'Bâtir des architectures techniques robustes, des plateformes web sur mesure et des solutions digitales scalables.',
    image: '/images/services/development.jpg',
    href: '/services/digital-solutions',
  },
  {
    id: 'branding-design',
    number: '04',
    title: 'Branding Design',
    category: 'BRANDING DESIGN',
    tag: 'IDENTITÉ VISUELLE & BRANDING',
    description:
      'Créer des identités de marque mémorables, des chartes graphiques fortes et des systèmes visuels distinctifs.',
    image: '/images/services/branding.jpg',
    href: '/services/branding-communication',
  },
]

export function Services() {
  const [activeId, setActiveId] = useState<string>(serviceItems[0].id)
  const activeService = serviceItems.find((s) => s.id === activeId) || serviceItems[0]

  return (
    <Section id="services" className="pt-8 sm:pt-12 lg:pt-16 pb-16 sm:pb-20 lg:pb-28">
      <Container>
        {/* ── Dark Inset Container matching Reference Style ── */}
        <div className="relative rounded-[24px] sm:rounded-[32px] bg-[#070709] text-white p-6 sm:p-10 lg:p-14 overflow-hidden border border-white/10">
          
          {/* ── Top Header Row ── */}
          <div className="space-y-6">
            <RevealOnScroll>
              <Tag variant="v2" className="bg-[#141418] border-[#25252b] text-white">
                Services
              </Tag>
            </RevealOnScroll>

            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 lg:gap-16">
              <RevealOnScroll delay={0.1}>
                <h2 className="text-[clamp(2rem,4.5vw,60px)] font-normal text-white leading-[1.08] tracking-[-0.03em] max-w-[620px] flex flex-wrap items-center gap-x-3 gap-y-2">
                  <span>Tout ce dont</span>
                  <span className="inline-flex items-center justify-center w-12 h-7 sm:w-16 sm:h-9 rounded-full overflow-hidden border border-white/20 relative align-middle shadow-inner shrink-0 -translate-y-0.5">
                    <Image
                      src="/images/services/header-avatar.jpg"
                      alt="Portrait"
                      fill
                      quality={100}
                      sizes="(max-width: 640px) 48px, 64px"
                      className="object-cover"
                    />
                  </span>
                  <span>votre marque a besoin</span>
                </h2>
              </RevealOnScroll>

              <RevealOnScroll delay={0.2}>
                <p className="text-sm sm:text-base text-neutral-400 max-w-sm font-normal leading-relaxed">
                  Nous concevons des expériences digitales à fort impact grâce à un design stratégique, un développement rigoureux et une vision créative.
                </p>
              </RevealOnScroll>
            </div>
          </div>

          {/* ── Separator Line ── */}
          <div className="w-full border-t border-[#1e1e24] my-8 sm:my-12 lg:my-14" />

          {/* ── Mobile Layout (< 1024px): Stacked Service Cards ── */}
          <div className="lg:hidden flex flex-col space-y-10 divide-y divide-[#222228]">
            {serviceItems.map((service, idx) => (
              <div key={service.id} className={idx > 0 ? 'pt-10' : ''}>
                {/* Title + Index Number */}
                <div className="flex items-center justify-between gap-4 mb-4">
                  <h3
                    className="text-2xl sm:text-3xl font-normal text-white tracking-tight"
                    style={{ fontFamily: 'var(--font-family--primary-font)' }}
                  >
                    {service.title}
                  </h3>
                  <span className="text-xs sm:text-sm font-mono text-neutral-400 font-semibold">
                    [{service.number}]
                  </span>
                </div>

                {/* Service Visual Image */}
                <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 bg-[#111114] shadow-xl my-4">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    quality={100}
                    sizes="(max-width: 1024px) 100vw, 450px"
                    className="object-cover"
                  />
                </div>

                {/* Category Tag + Description + Link */}
                <div className="space-y-2 mt-4">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[#EB4604] text-xs font-mono font-bold">+</span>
                    <span className="text-xs font-mono uppercase tracking-widest text-[#EB4604] font-semibold">
                      {service.tag}
                    </span>
                  </div>

                  <p className="text-sm sm:text-base text-neutral-300 font-normal leading-relaxed">
                    {service.description}
                  </p>

                  <div className="pt-2">
                    <Link
                      href={service.href}
                      className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-white hover:text-[#EB4604] transition-colors border-b border-dashed border-neutral-600 hover:border-[#EB4604] pb-1"
                    >
                      Explorer le service →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* ── Desktop Layout (>= 1024px): Interactive Split Layout ── */}
          <div className="hidden lg:grid grid-cols-12 gap-10 lg:gap-16 items-start">
            
            {/* Left Column: Interactive Service Titles */}
            <div className="col-span-7 flex flex-col">
              {serviceItems.map((service, idx) => {
                const isActive = activeId === service.id

                return (
                  <div
                    key={service.id}
                    onMouseEnter={() => setActiveId(service.id)}
                    onClick={() => setActiveId(service.id)}
                    className={`group cursor-pointer transition-all duration-300 py-6 sm:py-8 border-b border-dotted border-[#222228] ${
                      idx === 0 ? 'border-t' : ''
                    }`}
                  >
                    <div className="flex items-center justify-between gap-4">
                      {/* Left: Arrow + Title */}
                      <div className="flex items-center gap-3 sm:gap-4">
                        {/* Red arrow on active */}
                        <span
                          className={`text-[#EB4604] text-3xl sm:text-4xl lg:text-5xl font-light transition-all duration-300 transform shrink-0 ${
                            isActive
                              ? 'opacity-100 translate-x-0 w-8 sm:w-10'
                              : 'opacity-0 -translate-x-4 w-0 overflow-hidden'
                          }`}
                        >
                          →
                        </span>

                        {/* Title text */}
                        <h3
                          className={`text-3xl sm:text-5xl lg:text-[64px] xl:text-[72px] font-normal leading-[1.05] tracking-[-0.03em] transition-colors duration-300 ${
                            isActive
                              ? 'text-white'
                              : 'text-[#484852] group-hover:text-[#888896]'
                          }`}
                          style={{ fontFamily: 'var(--font-family--primary-font)' }}
                        >
                          {service.title}
                        </h3>
                      </div>

                      {/* Right: Index Number */}
                      <span
                        className={`text-xs sm:text-sm font-mono tracking-widest font-semibold transition-colors duration-300 shrink-0 self-start mt-2 ${
                          isActive
                            ? 'text-[#EB4604]'
                            : 'text-[#484852] group-hover:text-[#777782]'
                        }`}
                      >
                        [{service.number}]
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Right Column: Dynamic Preview Card */}
            <div className="col-span-5 sticky top-28">
              <div className="flex flex-col space-y-6 animate-fadeIn">
                {/* Image card with rounded corners */}
                <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 bg-[#111114] shadow-2xl">
                  <Image
                    key={activeService.id}
                    src={activeService.image}
                    alt={activeService.title}
                    fill
                    quality={100}
                    unoptimized
                    className="object-cover transition-opacity duration-500"
                    sizes="450px"
                  />
                </div>

                {/* Info below card */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[#EB4604] text-xs font-mono font-bold">+</span>
                    <span className="text-xs font-mono uppercase tracking-widest text-[#EB4604] font-semibold">
                      {activeService.tag}
                    </span>
                  </div>

                  <p className="text-sm sm:text-base text-neutral-300 font-normal leading-relaxed">
                    {activeService.description}
                  </p>

                  <div className="pt-2">
                    <Link
                      href={activeService.href}
                      className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-white hover:text-[#EB4604] transition-colors border-b border-dashed border-neutral-600 hover:border-[#EB4604] pb-1"
                    >
                      Explorer le service →
                    </Link>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </Container>
    </Section>
  )
}
