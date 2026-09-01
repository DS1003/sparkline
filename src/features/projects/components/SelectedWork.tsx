'use client'

import React, { useState, useMemo } from 'react'
import Link from 'next/link'
import { Container } from '@/components/layout/Container'
import { Section } from '@/components/layout/Section'
import { Tag } from '@/components/ui/Tag'
import { RevealOnScroll } from '@/components/motion/RevealOnScroll'
import { projectsData } from '@/lib/repositories/projects'
import { Curved3DProjectsGallery } from './Curved3DProjectsGallery'

const categories = [
  'Tous',
  'Plateforme E-commerce',
  'Tableau de bord SaaS',
  'Identité & Plateforme',
  'Application Mobile',
]

interface SelectedWorkProps {
  isProjectsPage?: boolean
  hideHeader?: boolean
  theme?: 'dark' | 'light'
}

export function SelectedWork({
  isProjectsPage = false,
  hideHeader = false,
  theme = 'dark',
}: SelectedWorkProps) {
  const [activeCategory, setActiveCategory] = useState('Tous')
  const [activeIndex, setActiveIndex] = useState(() => Math.floor(projectsData.length / 2))

  // Filter projects by active category tab
  const filteredProjects = useMemo(() => {
    if (activeCategory === 'Tous') return projectsData
    return projectsData.filter((p) => p.category === activeCategory)
  }, [activeCategory])

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category)
    const list = category === 'Tous' ? projectsData : projectsData.filter((p) => p.category === category)
    setActiveIndex(Math.floor(list.length / 2))
  }

  const handlePrev = () => {
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : filteredProjects.length - 1))
  }

  const handleNext = () => {
    setActiveIndex((prev) => (prev < filteredProjects.length - 1 ? prev + 1 : 0))
  }

  return (
    <Section
      id="work"
      className={`relative ${
        isProjectsPage ? 'py-12 sm:py-16 lg:py-20' : 'py-20 sm:py-28 lg:py-32'
      } ${
        theme === 'light'
          ? 'bg-[#FAFBFD] text-neutral-900 border-b border-[#e2e2e7]'
          : 'bg-black text-white'
      } overflow-hidden`}
    >
      <Container className="relative z-10">
        {/* ── Top Header (Omitted if hideHeader is true, e.g. on /projects where PageHero exists) ── */}
        {!hideHeader && (
          <div className="space-y-5 text-center max-w-3xl mx-auto mb-8 sm:mb-10">
            <RevealOnScroll>
              <div className="inline-flex items-center justify-center">
                <Tag variant={theme === 'light' ? 'v2' : 'base'}>Nos Projets Récents</Tag>
              </div>
            </RevealOnScroll>

            <RevealOnScroll delay={0.1}>
              <h2
                className={`text-[clamp(2.25rem,4.5vw,56px)] font-normal ${
                  theme === 'light' ? 'text-neutral-900' : 'text-white'
                } leading-[1.08] tracking-[-0.03em]`}
                style={{ fontFamily: 'var(--font-family--primary-font)' }}
              >
                Des réalisations d&apos;exception qui façonnent l&apos;avenir.
              </h2>
            </RevealOnScroll>

            <RevealOnScroll delay={0.15}>
              <p
                className={`text-sm sm:text-base ${
                  theme === 'light' ? 'text-neutral-500' : 'text-neutral-400'
                } font-light max-w-xl mx-auto leading-relaxed`}
              >
                Cliquez sur un projet pour retourner la carte ou utilisez les contrôles pour naviguer.
              </p>
            </RevealOnScroll>
          </div>
        )}

        {/* ── Minimalist Category Filter Pills ── */}
        <div className="text-center mb-8 sm:mb-10">
          <RevealOnScroll delay={0.1}>
            <div
              className={`inline-flex flex-wrap items-center justify-center gap-1.5 p-1.5 rounded-full ${
                theme === 'light'
                  ? 'bg-white border border-neutral-200/90 shadow-sm'
                  : 'bg-white/[0.04] border border-white/10 backdrop-blur-md'
              }`}
            >
              {categories.map((cat) => {
                const isSelected = activeCategory === cat
                return (
                  <button
                    key={cat}
                    onClick={() => handleCategoryChange(cat)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-mono transition-all duration-300 ${
                      isSelected
                        ? 'bg-[#EB4604] text-white font-semibold shadow-md shadow-[#EB4604]/25'
                        : theme === 'light'
                        ? 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
                        : 'text-neutral-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {cat}
                  </button>
                )
              })}
            </div>
          </RevealOnScroll>
        </div>

        {/* ── 3D Panoramic Curved Gallery with Card Flip & Modal ── */}
        <div className="relative">
          <Curved3DProjectsGallery
            projects={filteredProjects}
            activeIndex={activeIndex}
            onActiveChange={setActiveIndex}
            theme={theme}
          />
        </div>

        {/* ── Ultra-Modern Unified Controller & CTA Dock ── */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pt-6">
          {/* Navigation Island */}
          <div
            className={`h-11 sm:h-12 inline-flex items-center gap-3 px-2.5 sm:px-3 rounded-full ${
              theme === 'light'
                ? 'bg-white border border-neutral-200/90 shadow-[0_10px_25px_rgba(0,0,0,0.06)]'
                : 'bg-white/[0.05] border border-white/10 backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.5)]'
            }`}
          >
            {/* Prev Button */}
            <button
              onClick={handlePrev}
              aria-label="Projet précédent"
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 active:scale-95 text-xs font-semibold ${
                theme === 'light'
                  ? 'bg-neutral-100 hover:bg-[#EB4604] text-neutral-700 hover:text-white'
                  : 'bg-white/5 hover:bg-[#EB4604] text-white/70 hover:text-white'
              }`}
            >
              ←
            </button>

            {/* Monospace Slide Index & Visual Dots */}
            <div className="flex items-center gap-2.5 px-1.5">
              <span
                className={`text-xs font-mono font-bold tracking-wider ${
                  theme === 'light' ? 'text-neutral-900' : 'text-white'
                }`}
              >
                0{activeIndex + 1}
              </span>
              <div className="flex items-center gap-1.5">
                {filteredProjects.map((_, dotIdx) => (
                  <button
                    key={dotIdx}
                    onClick={() => setActiveIndex(dotIdx)}
                    aria-label={`Aller au projet ${dotIdx + 1}`}
                    className={`transition-all duration-300 rounded-full ${
                      activeIndex === dotIdx
                        ? 'w-4 h-1.5 bg-[#EB4604]'
                        : theme === 'light'
                        ? 'w-1.5 h-1.5 bg-neutral-300 hover:bg-neutral-400'
                        : 'w-1.5 h-1.5 bg-white/20 hover:bg-white/50'
                    }`}
                  />
                ))}
              </div>
              <span
                className={`text-xs font-mono font-light ${
                  theme === 'light' ? 'text-neutral-400' : 'text-neutral-500'
                }`}
              >
                0{filteredProjects.length}
              </span>
            </div>

            {/* Next Button */}
            <button
              onClick={handleNext}
              aria-label="Projet suivant"
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 active:scale-95 text-xs font-semibold ${
                theme === 'light'
                  ? 'bg-neutral-100 hover:bg-[#EB4604] text-neutral-700 hover:text-white'
                  : 'bg-white/5 hover:bg-[#EB4604] text-white/70 hover:text-white'
              }`}
            >
              →
            </button>
          </div>

          {/* Explorer Action Pill (Only shown on homepage, hidden on projects page) */}
          {!isProjectsPage && (
            <Link
              href="/projects"
              className="h-11 sm:h-12 inline-flex items-center justify-center gap-2.5 px-6 rounded-full bg-white/[0.05] hover:bg-white/[0.09] border border-white/10 hover:border-[#EB4604]/50 text-white text-xs sm:text-sm font-medium transition-all duration-300 backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.5)] group"
            >
              <span>Explorer toutes les réalisations</span>
              <span className="text-[#EB4604] font-semibold transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                ↗
              </span>
            </Link>
          )}
        </div>
      </Container>
    </Section>
  )
}
