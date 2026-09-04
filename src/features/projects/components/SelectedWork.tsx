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
  'App web',
  'Branding',
  'UI/UX',
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
    return projectsData.filter(
      (p) => p.category === activeCategory || p.categories?.includes(activeCategory)
    )
  }, [activeCategory])

  const handleCategoryChange = (category: string) => {
    // If clicking an already active filter (other than 'Tous'), toggle back to 'Tous'
    const nextCategory = activeCategory === category && category !== 'Tous' ? 'Tous' : category
    setActiveCategory(nextCategory)
    const list =
      nextCategory === 'Tous'
        ? projectsData
        : projectsData.filter(
            (p) => p.category === nextCategory || p.categories?.includes(nextCategory)
          )
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
        isProjectsPage ? 'py-10 sm:py-14 lg:py-16' : 'py-12 sm:py-16 lg:py-20 xl:py-24'
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

        {/* ── Minimalist Category Filter Pills (Centered & Zero Horizontal Scroll) ── */}
        <div className="mb-8 sm:mb-10">
          <RevealOnScroll delay={0.1}>
            {/* Desktop / Tablet: Unified Centered Capsule */}
            <div className="hidden sm:flex justify-center">
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
                      className={`px-3.5 py-1.5 rounded-full text-xs font-mono transition-all duration-300 cursor-pointer ${
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
            </div>

            {/* Mobile: Centered Flex-Wrap Chips (Zero Horizontal Scroll) */}
            <div className="sm:hidden flex flex-wrap items-center justify-center gap-1.5 px-2">
              {categories.map((cat) => {
                const isSelected = activeCategory === cat
                return (
                  <button
                    key={cat}
                    onClick={() => handleCategoryChange(cat)}
                    className={`px-3 py-1.5 rounded-full text-[11px] font-mono transition-all duration-300 cursor-pointer ${
                      isSelected
                        ? 'bg-[#EB4604] text-white font-semibold shadow-sm shadow-[#EB4604]/25'
                        : theme === 'light'
                        ? 'bg-white text-neutral-600 border border-neutral-200 shadow-2xs active:bg-neutral-100'
                        : 'bg-white/[0.06] text-neutral-300 border border-white/10 active:bg-white/10'
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

        {/* ── Ultra-Modern Minimalist Navigation Controller Dock ── */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pt-6">
          {/* Navigation Island Pill */}
          <div
            className={`h-11 sm:h-12 inline-flex items-center gap-2 sm:gap-3 px-3 sm:px-4 rounded-full transition-all duration-300 ${
              theme === 'light'
                ? 'bg-white/90 border border-neutral-200/80 shadow-[0_12px_32px_-8px_rgba(0,0,0,0.08)] backdrop-blur-md'
                : 'bg-white/[0.04] border border-white/10 backdrop-blur-xl shadow-[0_16px_40px_-10px_rgba(0,0,0,0.6)]'
            }`}
          >
            {/* Prev Button */}
            <button
              onClick={handlePrev}
              type="button"
              aria-label="Projet précédent"
              className={`group relative w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 active:scale-90 ${
                theme === 'light'
                  ? 'bg-neutral-100 hover:bg-[#EB4604] text-neutral-600 hover:text-white'
                  : 'bg-white/5 hover:bg-[#EB4604] text-neutral-300 hover:text-white'
              }`}
            >
              <svg
                className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>

            {/* Dynamic Sleek Pagination Dots */}
            <div className="flex items-center gap-1.5 sm:gap-2 px-1">
              {filteredProjects.map((project, dotIdx) => {
                const isActive = activeIndex === dotIdx
                return (
                  <button
                    key={project.slug || dotIdx}
                    onClick={() => setActiveIndex(dotIdx)}
                    type="button"
                    aria-label={`Aller au projet ${dotIdx + 1}`}
                    className={`relative h-2 rounded-full transition-all duration-500 ease-out cursor-pointer ${
                      isActive
                        ? 'w-7 sm:w-8 bg-[#EB4604] shadow-sm shadow-[#EB4604]/40'
                        : theme === 'light'
                        ? 'w-2 bg-neutral-300 hover:bg-neutral-400 hover:w-3'
                        : 'w-2 bg-white/20 hover:bg-white/50 hover:w-3'
                    }`}
                  />
                )
              })}
            </div>

            {/* Next Button */}
            <button
              onClick={handleNext}
              type="button"
              aria-label="Projet suivant"
              className={`group relative w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 active:scale-90 ${
                theme === 'light'
                  ? 'bg-neutral-100 hover:bg-[#EB4604] text-neutral-600 hover:text-white'
                  : 'bg-white/5 hover:bg-[#EB4604] text-neutral-300 hover:text-white'
              }`}
            >
              <svg
                className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 18l6-6-6-6" />
              </svg>
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
