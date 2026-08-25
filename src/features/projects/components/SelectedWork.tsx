'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Container } from '@/components/layout/Container'
import { Section } from '@/components/layout/Section'
import { Tag } from '@/components/ui/Tag'
import { RevealOnScroll } from '@/components/motion/RevealOnScroll'
import { projectsData } from '@/lib/repositories/projects'

interface FeaturedProject {
  slug: string
  title: string
  category: string
  year: string
  summary: string
  impact: string
  image: string
  tags: string[]
}

const featuredProjects: FeaturedProject[] = [
  {
    slug: 'ndakaru-commerce',
    title: 'NDAKARU Commerce',
    category: 'Plateforme E-commerce',
    year: '2024',
    summary:
      'Un écosystème e-commerce headless conçu pour des performances extrêmes et un taux de conversion mobile optimal.',
    impact: '+142% conversion mobile',
    image: '/images/projects/ndakaru.jpg',
    tags: ['Next.js 15', 'Headless', 'Mobile Money', 'Design System'],
  },
  {
    slug: 'teranga-dashboard',
    title: 'TERANGA Insights',
    category: 'Tableau de bord SaaS',
    year: '2024',
    summary:
      'Tableau de bord décisionnel intelligent fournissant des métriques financières et opérationnelles en temps réel.',
    impact: '12M$+ transactions suivies',
    image: '/images/services/development.jpg',
    tags: ['React 19', 'WebSockets', 'Telemetry', 'Tailwind CSS'],
  },
  {
    slug: 'baobab-fintech',
    title: 'BAOBAB Labs',
    category: 'Identité & Plateforme',
    year: '2024',
    summary:
      'Système d’identité de marque complet et plateforme digitale mobile-first pour une startup fintech pionnière.',
    impact: '1.5M$ levés en pré-amorçage',
    image: '/images/services/mobile.jpg',
    tags: ['Brand Identity', '3D WebGL', 'Figma', 'Framer Motion'],
  },
  {
    slug: 'sunu-health',
    title: 'SUNU Santé',
    category: 'Application Mobile',
    year: '2023',
    summary:
      'Plateforme mobile de prise de rendez-vous médicaux et de télémédecine connectant patients et spécialistes.',
    impact: '20 000+ consultations',
    image: '/images/services/ui-ux.jpg',
    tags: ['React Native', 'WebRTC', 'PWA', 'Telehealth'],
  },
]

export function SelectedWork() {
  return (
    <Section id="work" className="py-16 sm:py-20 lg:py-28 bg-[#fafafc]">
      <Container>
        {/* ── Editorial Header Row ── */}
        <div className="space-y-6">
          <RevealOnScroll>
            <Tag variant="v2">Projets récents</Tag>
          </RevealOnScroll>

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 lg:gap-16">
            <RevealOnScroll delay={0.1}>
              <h2
                className="text-[clamp(2.25rem,4.5vw,56px)] font-normal text-[#0A0A0A] leading-[1.06] tracking-[-0.03em] max-w-xl"
                style={{ fontFamily: 'var(--font-family--primary-font)' }}
              >
                Des réalisations qui propulsent la croissance.
              </h2>
            </RevealOnScroll>

            <RevealOnScroll delay={0.2}>
              <div className="space-y-3 max-w-sm">
                <p className="text-sm sm:text-base text-neutral-500 font-normal leading-relaxed">
                  Découvrez comment nous métamorphosons les visions ambitieuses en solutions concrètes, pérennes et performantes.
                </p>
                <Link
                  href="/projects"
                  className="group inline-flex items-center gap-2 text-[#0A0A0A] font-medium text-sm whitespace-nowrap pb-1 border-b border-dashed border-neutral-400 hover:border-[#EB4604] hover:text-[#EB4604] transition-colors"
                >
                  <span>Voir toutes les études de cas</span>
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </Link>
              </div>
            </RevealOnScroll>
          </div>
        </div>

        {/* ── Project Cards Grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 mt-12 sm:mt-16">
          {featuredProjects.map((project, idx) => (
            <RevealOnScroll key={project.slug} delay={0.1 + idx * 0.08}>
              <Link
                href={`/projects/${project.slug}`}
                className="group block relative rounded-[28px] sm:rounded-[32px] bg-white border border-[#e2e2e8] overflow-hidden hover:border-[#EB4604]/50 transition-all duration-500 hover:shadow-xl p-5 sm:p-7"
              >
                {/* ── Project Visual Image (16:10) ── */}
                <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden bg-[#111114] mb-6">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    quality={100}
                    unoptimized
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                    sizes="(max-width: 1024px) 100vw, 600px"
                  />

                  {/* Floating Badges on Image */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none z-10">
                    <span className="px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md text-[11px] font-mono font-semibold text-neutral-900 border border-neutral-200/60 shadow-sm">
                      {project.category}
                    </span>
                    <span className="px-3 py-1.5 rounded-full bg-[#0A0A0A]/80 backdrop-blur-md text-[11px] font-mono font-semibold text-white border border-white/10 shadow-sm">
                      [{project.year}]
                    </span>
                  </div>

                  {/* Impact Metric Pill at Bottom Right */}
                  <div className="absolute bottom-4 right-4 pointer-events-none z-10">
                    <span className="px-3.5 py-1.5 rounded-full bg-[#EB4604] text-white text-[11px] font-mono font-semibold shadow-lg shadow-[#EB4604]/30">
                      ✦ {project.impact}
                    </span>
                  </div>
                </div>

                {/* ── Project Content Info ── */}
                <div className="space-y-3.5">
                  <div className="flex items-center justify-between gap-4">
                    <h3
                      className="text-2xl sm:text-3xl font-semibold text-[#0A0A0A] group-hover:text-[#EB4604] transition-colors duration-300 tracking-tight flex items-center gap-2"
                      style={{ fontFamily: 'var(--font-family--primary-font)' }}
                    >
                      <span>{project.title}</span>
                      <span className="text-xl sm:text-2xl text-neutral-400 group-hover:text-[#EB4604] group-hover:translate-x-1.5 transition-all duration-300">
                        →
                      </span>
                    </h3>
                  </div>

                  <p className="text-sm sm:text-base text-neutral-600 font-normal leading-relaxed line-clamp-2">
                    {project.summary}
                  </p>

                  {/* Technology Tags */}
                  <div className="flex flex-wrap gap-2 pt-2 border-t border-neutral-100">
                    {project.tags.map((t, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 rounded-md bg-[#f4f5f8] text-[11px] font-mono text-neutral-600 font-medium"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            </RevealOnScroll>
          ))}
        </div>
      </Container>
    </Section>
  )
}
