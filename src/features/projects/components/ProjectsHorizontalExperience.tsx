'use client'

import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Project } from '@/types'
import { Container } from '@/components/layout/Container'
import { Tag } from '@/components/ui/Tag'
import { RevealOnScroll } from '@/components/motion/RevealOnScroll'

interface ProjectsHorizontalExperienceProps {
  projects: Project[]
}

const getImageSrc = (slug: string) => {
  return slug === 'ndakaru-commerce'
    ? '/images/projects/ndakaru.webp'
    : slug === 'teranga-dashboard'
      ? '/images/services/development.webp'
      : slug === 'baobab-fintech'
        ? '/images/services/branding.webp'
        : slug === 'sunu-health'
          ? '/images/services/mobile.webp'
          : '/images/services/ui-ux.webp'
}

export function ProjectsHorizontalExperience({ projects }: ProjectsHorizontalExperienceProps) {
  const [viewMode, setViewMode] = useState<'reel' | 'archive'>('reel')
  const [activeCategory, setActiveCategory] = useState<string>('Tous')
  const [activeSlideIndex, setActiveSlideIndex] = useState(0)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [hoveredProject, setHoveredProject] = useState<Project | null>(null)
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 })
  const [cursorText, setCursorText] = useState<'Glisser ↔' | 'Explorer ↗'>('Glisser ↔')
  const [isHoveringReel, setIsHoveringReel] = useState(false)
  const [isTouchDevice, setIsTouchDevice] = useState(false)

  const reelRef = useRef<HTMLDivElement>(null)
  const isDragging = useRef(false)
  const startX = useRef(0)
  const scrollLeft = useRef(0)

  // Detect touch devices
  useEffect(() => {
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0)
  }, [])

  // Categories
  const categories = useMemo(() => {
    const list = ['Tous']
    projects.forEach((p) => {
      const cats = p.categories && p.categories.length > 0 ? p.categories : [p.category]
      cats.forEach((c) => {
        if (!list.includes(c)) list.push(c)
      })
    })
    return list
  }, [projects])

  // Filtered projects
  const filteredProjects = useMemo(() => {
    if (activeCategory === 'Tous') return projects
    return projects.filter(
      (p) => p.category === activeCategory || p.categories?.includes(activeCategory)
    )
  }, [projects, activeCategory])

  // Track scroll position of the horizontal reel
  const handleScroll = useCallback(() => {
    if (!reelRef.current) return
    const el = reelRef.current
    const maxScroll = el.scrollWidth - el.clientWidth
    if (maxScroll <= 0) {
      setScrollProgress(0)
      setActiveSlideIndex(0)
      return
    }
    const currentScroll = el.scrollLeft
    const progress = Math.min(Math.max(currentScroll / maxScroll, 0), 1)
    setScrollProgress(progress)

    // Calculate current slide index based on width
    const slideWidth = el.clientWidth * 0.82
    const index = Math.round(currentScroll / slideWidth)
    setActiveSlideIndex(Math.min(Math.max(index, 0), filteredProjects.length - 1))
  }, [filteredProjects.length])

  // Wheel horizontal scrolling support
  const handleWheel = useCallback((e: React.WheelEvent<HTMLDivElement>) => {
    if (!reelRef.current) return
    // If predominantly vertical scroll, translate to horizontal on the reel
    if (Math.abs(e.deltaY) > Math.abs(e.deltaX) && Math.abs(e.deltaY) > 5) {
      const el = reelRef.current
      const maxScroll = el.scrollWidth - el.clientWidth
      const atStart = el.scrollLeft <= 0 && e.deltaY < 0
      const atEnd = el.scrollLeft >= maxScroll - 2 && e.deltaY > 0

      // Only hijack if not at the absolute boundaries to allow smooth page scroll
      if (!atStart && !atEnd) {
        e.preventDefault()
        el.scrollLeft += e.deltaY * 1.2
      }
    }
  }, [])

  // Drag-to-scroll implementation
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!reelRef.current || isTouchDevice) return
    isDragging.current = true
    startX.current = e.pageX - reelRef.current.offsetLeft
    scrollLeft.current = reelRef.current.scrollLeft
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isTouchDevice) {
      setCursorPos({ x: e.clientX, y: e.clientY })
    }

    if (!isDragging.current || !reelRef.current) return
    e.preventDefault()
    const x = e.pageX - reelRef.current.offsetLeft
    const walk = (x - startX.current) * 1.6
    reelRef.current.scrollLeft = scrollLeft.current - walk
  }

  const handleMouseUp = () => {
    isDragging.current = false
  }

  // Slide navigation buttons
  const scrollToIndex = (index: number) => {
    if (!reelRef.current) return
    const el = reelRef.current
    const targetCard = el.children[index] as HTMLElement
    if (targetCard) {
      targetCard.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
    }
  }

  const handlePrev = () => {
    const nextIdx = Math.max(0, activeSlideIndex - 1)
    scrollToIndex(nextIdx)
  }

  const handleNext = () => {
    const nextIdx = Math.min(filteredProjects.length - 1, activeSlideIndex + 1)
    scrollToIndex(nextIdx)
  }

  return (
    <div className="relative w-full bg-white text-neutral-900 pb-24 sm:pb-32 overflow-x-clip">
      {/* ── Magnetic Floating Cursor Indicator (Reel Mode, Desktop Only) ── */}
      {!isTouchDevice && isHoveringReel && viewMode === 'reel' && (
        <div
          className="fixed pointer-events-none z-50 transition-opacity duration-200"
          style={{
            transform: `translate3d(${cursorPos.x - 45}px, ${cursorPos.y - 45}px, 0)`,
            opacity: isHoveringReel ? 1 : 0,
            willChange: 'transform',
          }}
        >
          <div className="w-[90px] h-[90px] rounded-full bg-[#0A0A0A]/90 text-white backdrop-blur-md border border-white/20 flex items-center justify-center text-center p-2 shadow-2xl scale-95 transition-transform duration-200">
            <span className="text-[11px] font-mono tracking-tight leading-tight select-none">
              {cursorText}
            </span>
          </div>
        </div>
      )}

      {/* ── Magnetic Floating Image Preview (Archive Table Mode, Desktop Only) ── */}
      {!isTouchDevice && hoveredProject && viewMode === 'archive' && (
        <div
          className="fixed pointer-events-none z-50 transition-opacity duration-300 ease-out"
          style={{
            transform: `translate3d(${cursorPos.x + 24}px, ${cursorPos.y - 100}px, 0)`,
            opacity: hoveredProject ? 1 : 0,
            willChange: 'transform, opacity',
          }}
        >
          <div className="w-80 h-52 rounded-2xl overflow-hidden bg-neutral-900 border border-neutral-200/90 shadow-[0_24px_60px_rgba(0,0,0,0.2)] relative rotate-1">
            <Image
              src={hoveredProject.coverImage || getImageSrc(hoveredProject.slug)}
              alt={hoveredProject.title}
              fill
              className="object-cover"
              sizes="320px"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white">
              <span className="text-xs font-mono tracking-widest text-[#EB4604] font-semibold">
                {hoveredProject.client}
              </span>
              <span className="text-[11px] font-mono text-neutral-300">
                {hoveredProject.year}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* ── Architectural Studio Controls Header ── */}
      <section className="sticky top-20 z-40 w-full bg-white/95 backdrop-blur-xl border-b border-neutral-200/80 py-4">
        <Container>
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Category Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto max-w-full no-scrollbar py-0.5">
              {categories.map((cat) => {
                const isSelected = activeCategory === cat
                return (
                  <button
                    key={cat}
                    onClick={() => {
                      setActiveCategory(cat)
                      if (reelRef.current) reelRef.current.scrollLeft = 0
                    }}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-mono transition-all duration-200 cursor-pointer shrink-0 ${isSelected
                        ? 'bg-[#0A0A0A] text-white font-medium shadow-xs'
                        : 'bg-neutral-100 hover:bg-neutral-200/80 text-neutral-600 hover:text-neutral-900'
                      }`}
                  >
                    <span>{cat}</span>
                  </button>
                )
              })}
            </div>

            {/* View Mode Toggle: Cinematic Reel vs Architectural Archive Table */}
            <div className="flex items-center gap-1 p-1 rounded-full bg-neutral-100 border border-neutral-200/80 shrink-0">
              <button
                type="button"
                onClick={() => setViewMode('reel')}
                className={`px-3.5 py-1.5 rounded-full text-xs font-mono flex items-center gap-1.5 transition-all cursor-pointer ${viewMode === 'reel'
                    ? 'bg-white text-neutral-900 shadow-xs font-medium'
                    : 'text-neutral-500 hover:text-neutral-900'
                  }`}
              >
                <span className={`w-2 h-2 rounded-full ${viewMode === 'reel' ? 'bg-[#EB4604]' : 'bg-neutral-300'}`} />
                <span>Reel Cinématographique</span>
              </button>

              <button
                type="button"
                onClick={() => setViewMode('archive')}
                className={`px-3.5 py-1.5 rounded-full text-xs font-mono flex items-center gap-1.5 transition-all cursor-pointer ${viewMode === 'archive'
                    ? 'bg-white text-neutral-900 shadow-xs font-medium'
                    : 'text-neutral-500 hover:text-neutral-900'
                  }`}
              >
                <span className={`w-2 h-2 rounded-full ${viewMode === 'archive' ? 'bg-[#EB4604]' : 'bg-neutral-300'}`} />
                <span>Table d’Archive</span>
              </button>
            </div>
          </div>
        </Container>
      </section>

      {/* ── MODE 1: PARCOURS HORIZONTAL GRAND FORMAT (Cinematic Reel) ── */}
      {viewMode === 'reel' && (
        <div className="pt-10 sm:pt-14 space-y-8">
          {/* Reel Header & Navigation Arrows */}
          <Container>
            <div className="flex items-end justify-between border-b border-neutral-200/80 pb-6">
              <div className="space-y-1">
                <span className="text-xs font-mono text-[#EB4604] tracking-widest font-semibold block">
                  SHOWCASE // {String(filteredProjects.length).padStart(2, '0')} RÉALISATIONS
                </span>
                <p className="text-sm text-neutral-500 font-light">
                  Glissez horizontalement ou utilisez les commandes pour explorer la collection.
                </p>
              </div>

              {/* Prev / Next Circular Controls */}
              <div className="flex items-center gap-3">
                <button
                  onClick={handlePrev}
                  disabled={activeSlideIndex === 0}
                  aria-label="Projet précédent"
                  className="w-11 h-11 rounded-full border border-neutral-200 hover:border-[#0A0A0A] hover:bg-[#0A0A0A] hover:text-white flex items-center justify-center transition-all duration-200 disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path d="M19 12H5M12 19l-7-7 7-7" />
                  </svg>
                </button>

                <button
                  onClick={handleNext}
                  disabled={activeSlideIndex === filteredProjects.length - 1}
                  aria-label="Projet suivant"
                  className="w-11 h-11 rounded-full border border-neutral-200 hover:border-[#0A0A0A] hover:bg-[#0A0A0A] hover:text-white flex items-center justify-center transition-all duration-200 disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </Container>

          {/* Full-Width Horizontal Cinematic Track */}
          <div
            ref={reelRef}
            onScroll={handleScroll}
            onWheel={handleWheel}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseEnter={() => setIsHoveringReel(true)}
            onMouseLeave={() => {
              setIsHoveringReel(false)
              isDragging.current = false
            }}
            className="flex gap-6 sm:gap-10 overflow-x-auto no-scrollbar scroll-smooth px-4 sm:px-8 lg:px-16 py-4 cursor-grab active:cursor-grabbing select-none"
            style={{ scrollSnapType: 'x mandatory' }}
          >
            {filteredProjects.map((project, index) => {
              const projectNumber = String(index + 1).padStart(2, '0')
              const cover = project.coverImage || getImageSrc(project.slug)

              return (
                <div
                  key={project.slug}
                  className="shrink-0 w-[84vw] sm:w-[78vw] lg:w-[68vw] xl:w-[62vw] max-w-[1040px] space-y-6"
                  style={{ scrollSnapAlign: 'center' }}
                >
                  {/* Top Slide Metadata Bar */}
                  <div className="flex items-center justify-between text-xs font-mono border-b border-neutral-200/80 pb-3">
                    <div className="flex items-center gap-3">
                      <span className="text-[#EB4604] font-bold tracking-widest">
                        {projectNumber} // {String(filteredProjects.length).padStart(2, '0')}
                      </span>
                      <span className="h-3 w-[1px] bg-neutral-300" />
                      <span className="text-neutral-500 uppercase">{project.client}</span>
                    </div>

                    <div className="flex items-center gap-3 text-neutral-400">
                      <span>{project.type || project.category}</span>
                      <span className="h-3 w-[1px] bg-neutral-300" />
                      <span>{project.year}</span>
                    </div>
                  </div>

                  {/* Panoramic Visual Canvas Frame */}
                  <div
                    onMouseEnter={() => setCursorText('Explorer ↗')}
                    onMouseLeave={() => setCursorText('Glisser ↔')}
                    className="relative rounded-3xl overflow-hidden bg-neutral-900 border border-neutral-200/90 shadow-[0_20px_50px_rgba(0,0,0,0.08)] aspect-[16/10] sm:aspect-[16/9] group/card"
                  >
                    <Link href={`/projects/${project.slug}`} className="block w-full h-full relative">
                      <Image
                        src={cover}
                        alt={project.title}
                        fill
                        quality={92}
                        className="object-cover transition-transform duration-700 ease-out group-hover/card:scale-105"
                        sizes="(max-width: 1024px) 90vw, 65vw"
                        priority={index === 0}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover/card:opacity-30 transition-opacity" />

                      {/* Floating Direct Case Study Button */}
                      <div className="absolute bottom-5 right-5 sm:bottom-6 sm:right-6 px-4 py-2 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs font-mono flex items-center gap-2 group-hover/card:bg-[#EB4604] group-hover/card:border-[#EB4604] transition-all">
                        <span>Explorer l’étude</span>
                        <span>→</span>
                      </div>
                    </Link>
                  </div>

                  {/* Asymmetrical Bottom Editorial Strip */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start pt-2">
                    {/* Title + Hook (7 cols) */}
                    <div className="lg:col-span-7 space-y-2">
                      <Link href={`/projects/${project.slug}`}>
                        <h3
                          className="text-2xl sm:text-3xl lg:text-4xl font-normal text-[#0A0A0A] hover:text-[#EB4604] transition-colors tracking-tight leading-tight"
                          style={{ fontFamily: 'var(--font-family--primary-font)' }}
                        >
                          {project.title}
                        </h3>
                      </Link>
                      <p className="text-xs sm:text-sm text-neutral-600 font-light leading-relaxed max-w-xl">
                        {project.summary || project.description}
                      </p>
                    </div>

                    {/* Impact Metric & Quick Links (5 cols) */}
                    <div className="lg:col-span-5 space-y-4 lg:text-right">
                      {project.impact && (
                        <div className="inline-block text-left p-3.5 rounded-2xl bg-[#FAFBFD] border border-neutral-200/80">
                          <span className="text-[10px] font-mono text-[#EB4604] uppercase tracking-widest block font-semibold">
                            Impact Clé
                          </span>
                          <p className="text-xs font-medium text-neutral-800 leading-snug">
                            {project.impact}
                          </p>
                        </div>
                      )}

                      <div className="flex items-center gap-2 lg:justify-end">
                        <Link
                          href={`/projects/${project.slug}`}
                          className="text-xs font-mono text-neutral-900 hover:text-[#EB4604] font-medium underline underline-offset-4 transition-colors"
                        >
                          Voir l’étude complète →
                        </Link>
                        {project.url && (
                          <a
                            href={project.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs font-mono text-neutral-400 hover:text-neutral-900 transition-colors ml-3"
                          >
                            Site live ↗
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Bottom Scrub Progress Bar */}
          <Container>
            <div className="pt-8 border-t border-neutral-200/80 flex items-center justify-between gap-6">
              <div className="flex items-center gap-3 text-xs font-mono text-neutral-400">
                <span className="text-[#0A0A0A] font-bold">
                  {String(activeSlideIndex + 1).padStart(2, '0')}
                </span>
                <span>/</span>
                <span>{String(filteredProjects.length).padStart(2, '0')}</span>
              </div>

              {/* Progress Track */}
              <div className="relative flex-1 h-[2px] bg-neutral-200 rounded-full overflow-hidden max-w-xl">
                <div
                  className="absolute top-0 bottom-0 left-0 bg-[#EB4604] transition-all duration-150 rounded-full"
                  style={{ width: `${Math.max(scrollProgress * 100, 8)}%` }}
                />
              </div>

              <span className="text-xs font-mono text-neutral-400 hidden sm:inline">
                SPARKLINE ARCHIVE
              </span>
            </div>
          </Container>
        </div>
      )}

      {/* ── MODE 2: TABLE D’ARCHIVE ÉDITORIALE (Swiss Studio Archive Table) ── */}
      {viewMode === 'archive' && (
        <Container className="pt-12 sm:pt-16">
          <div className="divide-y divide-neutral-200/80 border-t border-b border-neutral-200/80">
            {/* Table Header */}
            <div className="py-4 grid grid-cols-12 gap-4 text-xs font-mono text-neutral-400 uppercase tracking-widest">
              <span className="col-span-1">N°</span>
              <span className="col-span-4 sm:col-span-3">Projet</span>
              <span className="col-span-3 hidden sm:inline">Client</span>
              <span className="col-span-4 sm:col-span-3">Secteur / Format</span>
              <span className="col-span-1 hidden md:inline">Année</span>
              <span className="col-span-3 sm:col-span-1 text-right">Étude</span>
            </div>

            {/* Project Rows with Hover Reveal Preview */}
            {filteredProjects.map((project, idx) => {
              const projectNumber = String(idx + 1).padStart(2, '0')

              return (
                <div
                  key={project.slug}
                  onMouseEnter={() => setHoveredProject(project)}
                  onMouseLeave={() => setHoveredProject(null)}
                  className="group py-6 grid grid-cols-12 gap-4 items-center transition-colors hover:bg-neutral-50/60 cursor-pointer"
                >
                  <span className="col-span-1 font-mono text-xs text-neutral-400 group-hover:text-[#EB4604] font-medium">
                    {projectNumber}
                  </span>

                  <div className="col-span-4 sm:col-span-3 space-y-1">
                    <Link
                      href={`/projects/${project.slug}`}
                      className="text-lg sm:text-xl font-normal text-[#0A0A0A] group-hover:text-[#EB4604] transition-colors block"
                      style={{ fontFamily: 'var(--font-family--primary-font)' }}
                    >
                      {project.title}
                    </Link>
                    <span className="text-xs text-neutral-400 font-light block sm:hidden">
                      {project.client}
                    </span>
                  </div>

                  <span className="col-span-3 hidden sm:inline text-xs text-neutral-600 font-light">
                    {project.client}
                  </span>

                  <div className="col-span-4 sm:col-span-3 space-y-0.5">
                    <span className="text-xs font-mono text-neutral-700 block">
                      {project.type || project.category}
                    </span>
                    {project.impact && (
                      <span className="text-[11px] text-[#EB4604] font-light line-clamp-1">
                        {project.impact}
                      </span>
                    )}
                  </div>

                  <span className="col-span-1 hidden md:inline text-xs font-mono text-neutral-400">
                    {project.year}
                  </span>

                  <div className="col-span-3 sm:col-span-1 text-right">
                    <Link
                      href={`/projects/${project.slug}`}
                      className="inline-flex items-center gap-1 text-xs font-mono font-medium text-neutral-900 group-hover:text-[#EB4604] transition-colors"
                    >
                      <span>Voir</span>
                      <span>→</span>
                    </Link>
                  </div>
                </div>
              )
            })}
          </div>
        </Container>
      )}

      {/* ── Production Standards Metric Ribbon ── */}
      <section className="mt-28 sm:mt-36 pt-12 border-t border-neutral-200/80">
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="space-y-1">
              <span className="text-3xl sm:text-4xl font-bold text-[#EB4604] block font-mono">100%</span>
              <span className="text-xs text-neutral-500 uppercase tracking-widest font-mono">Projets livrés clés en main</span>
            </div>
            <div className="space-y-1">
              <span className="text-3xl sm:text-4xl font-bold text-[#0A0A0A] block font-mono">&lt; 800ms</span>
              <span className="text-xs text-neutral-500 uppercase tracking-widest font-mono">Vitesse moyenne d’affichage</span>
            </div>
            <div className="space-y-1">
              <span className="text-3xl sm:text-4xl font-bold text-[#0A0A0A] block font-mono">99.9%</span>
              <span className="text-xs text-neutral-500 uppercase tracking-widest font-mono">Résilience d’infrastructure</span>
            </div>
            <div className="space-y-1">
              <span className="text-3xl sm:text-4xl font-bold text-[#EB4604] block font-mono">360°</span>
              <span className="text-xs text-neutral-500 uppercase tracking-widest font-mono">Accompagnement continu</span>
            </div>
          </div>
        </Container>
      </section>
    </div>
  )
}
