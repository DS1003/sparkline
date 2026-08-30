'use client'

import React, { useState, useEffect, useRef, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Project } from '@/types'

interface Curved3DProjectsGalleryProps {
  projects: Project[]
  activeIndex: number
  onActiveChange: (index: number) => void
}

export function Curved3DProjectsGallery({
  projects,
  activeIndex,
  onActiveChange,
}: Curved3DProjectsGalleryProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [offset, setOffset] = useState<number>(activeIndex)
  const [flippedProject, setFlippedProject] = useState<Project | null>(null)
  const [isFlippedState, setIsFlippedState] = useState(false)
  const [isClosingFlip, setIsClosingFlip] = useState(false)

  const isDraggingRef = useRef(false)
  const startXRef = useRef(0)
  const currentXRef = useRef(0)
  const lastXRef = useRef(0)
  const velocityRef = useRef(0)
  const hasMovedRef = useRef(false)
  const animFrameRef = useRef<number | null>(null)
  const isHoveredRef = useRef(false)
  const [isMobile, setIsMobile] = useState(false)

  // Detect mobile viewport
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Sync external activeIndex changes with smooth lerp
  useEffect(() => {
    if (!isDraggingRef.current && !flippedProject) {
      let current = offset
      const target = activeIndex
      const animateSync = () => {
        const diff = target - current
        if (Math.abs(diff) > 0.004) {
          current += diff * 0.14
          setOffset(current)
          animFrameRef.current = requestAnimationFrame(animateSync)
        } else {
          setOffset(target)
        }
      }
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current)
      animFrameRef.current = requestAnimationFrame(animateSync)
    }
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current)
    }
  }, [activeIndex, flippedProject])

  // Mouse & Touch Drag Handlers
  const handleDragStart = (clientX: number) => {
    if (flippedProject) return
    isDraggingRef.current = true
    hasMovedRef.current = false
    startXRef.current = clientX
    currentXRef.current = clientX
    lastXRef.current = clientX
    velocityRef.current = 0
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current)
  }

  const handleDragMove = (clientX: number) => {
    if (!isDraggingRef.current || flippedProject) return
    const totalDelta = Math.abs(clientX - startXRef.current)
    if (totalDelta > 6) {
      hasMovedRef.current = true
    }

    const deltaX = clientX - lastXRef.current
    velocityRef.current = deltaX
    lastXRef.current = clientX

    const sensitivity = isMobile ? 0.0038 : 0.0022
    setOffset((prev) => {
      const next = prev - deltaX * sensitivity
      return Math.max(-0.4, Math.min(projects.length - 0.6, next))
    })
  }

  const handleDragEnd = () => {
    if (!isDraggingRef.current) return
    isDraggingRef.current = false

    let current = offset
    const vel = velocityRef.current * (isMobile ? 0.008 : 0.005)

    let projectedTarget = Math.round(current - vel * 5)
    projectedTarget = Math.max(0, Math.min(projects.length - 1, projectedTarget))

    const snap = () => {
      const diff = projectedTarget - current
      if (Math.abs(diff) > 0.002) {
        current += diff * 0.14
        setOffset(current)
        animFrameRef.current = requestAnimationFrame(snap)
      } else {
        setOffset(projectedTarget)
        onActiveChange(projectedTarget)
      }
    }

    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current)
    animFrameRef.current = requestAnimationFrame(snap)
  }

  // Wheel Horizontal Scroll
  const handleWheel = useCallback(
    (e: React.WheelEvent) => {
      if (flippedProject) return
      const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY * 0.5
      if (Math.abs(delta) > 12) {
        const direction = delta > 0 ? 1 : -1
        const next = Math.max(0, Math.min(projects.length - 1, activeIndex + direction))
        if (next !== activeIndex) {
          onActiveChange(next)
        }
      }
    },
    [activeIndex, projects.length, onActiveChange, flippedProject]
  )

  // Keyboard navigation & Escape
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (flippedProject) {
        if (e.key === 'Escape') {
          closeFlippedCard()
        }
        return
      }

      if (e.key === 'ArrowLeft') {
        const next = Math.max(0, activeIndex - 1)
        onActiveChange(next)
      } else if (e.key === 'ArrowRight') {
        const next = Math.min(projects.length - 1, activeIndex + 1)
        onActiveChange(next)
      }
    },
    [activeIndex, projects.length, onActiveChange, flippedProject]
  )

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  // Open / Flip Card handler
  const handleCardClick = (project: Project, idx: number, isCenter: boolean) => {
    if (hasMovedRef.current) return

    if (!isCenter) {
      onActiveChange(idx)
    } else {
      setFlippedProject(project)
      setIsClosingFlip(false)
      requestAnimationFrame(() => {
        setIsFlippedState(true)
      })
    }
  }

  // Close Flipped Card with complete reverse 3D animation
  const closeFlippedCard = () => {
    setIsFlippedState(false)
    setIsClosingFlip(true)
    setTimeout(() => {
      setFlippedProject(null)
      setIsClosingFlip(false)
    }, 700)
  }

  const getImageSrc = (slug: string) => {
    return slug === 'ndakaru-commerce'
      ? '/images/projects/ndakaru.jpg'
      : slug === 'teranga-dashboard'
      ? '/images/services/development.jpg'
      : slug === 'baobab-fintech'
      ? '/images/services/branding.jpg'
      : slug === 'sunu-health'
      ? '/images/services/mobile.jpg'
      : '/images/services/ui-ux.jpg'
  }

  // Cylindrical 3D transformation constants
  const angleStep = isMobile ? 18 : 14
  const radius = isMobile ? 800 : 1250
  const cardWidth = isMobile ? 260 : 330
  const cardHeight = isMobile ? 370 : 460

  return (
    <>
      {/* ── 3D Panoramic Curved Gallery ── */}
      <div
        ref={containerRef}
        onWheel={handleWheel}
        className="relative w-full overflow-hidden select-none py-8 sm:py-12 cursor-grab active:cursor-grabbing"
        style={{
          perspective: '1400px',
          perspectiveOrigin: '50% 50%',
        }}
        onMouseEnter={() => {
          isHoveredRef.current = true
        }}
        onMouseLeave={() => {
          isHoveredRef.current = false
          if (isDraggingRef.current) handleDragEnd()
        }}
        onMouseDown={(e) => handleDragStart(e.clientX)}
        onMouseMove={(e) => handleDragMove(e.clientX)}
        onMouseUp={handleDragEnd}
        onTouchStart={(e) => handleDragStart(e.touches[0].clientX)}
        onTouchMove={(e) => handleDragMove(e.touches[0].clientX)}
        onTouchEnd={handleDragEnd}
      >
        {/* ── 3D Scene Cylinder Stage ── */}
        <div
          className="relative mx-auto flex items-center justify-center"
          style={{
            height: `${cardHeight + 40}px`,
            transformStyle: 'preserve-3d',
          }}
        >
          {projects.map((project, idx) => {
            const delta = idx - offset
            const angleDeg = delta * angleStep
            const angleRad = (angleDeg * Math.PI) / 180

            const translateX = Math.sin(angleRad) * radius
            const translateZ = (Math.cos(angleRad) - 1) * radius
            const rotateY = -angleDeg * 1.1

            const absDelta = Math.abs(delta)
            const scale = Math.max(0.7, 1 - absDelta * (isMobile ? 0.12 : 0.075))
            const opacity = Math.max(0.15, 1 - absDelta * (isMobile ? 0.35 : 0.22))
            const zIndex = Math.round(100 - absDelta * 10)
            const isCenter = absDelta < 0.45

            const imageSrc = getImageSrc(project.slug)

            return (
              <div
                key={project.slug}
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  handleCardClick(project, idx, isCenter)
                }}
                className={`absolute top-0 rounded-[28px] sm:rounded-[32px] overflow-hidden transition-[box-shadow,border-color] duration-500 group ${
                  isCenter
                    ? 'ring-1 ring-[#EB4604]/70 cursor-pointer'
                    : 'cursor-pointer hover:ring-1 hover:ring-white/30'
                }`}
                style={{
                  width: `${cardWidth}px`,
                  height: `${cardHeight}px`,
                  transformOrigin: '50% 50%',
                  transform: `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                  zIndex,
                  opacity,
                  transformStyle: 'preserve-3d',
                  backfaceVisibility: 'hidden',
                  willChange: 'transform, opacity',
                  boxShadow: isCenter
                    ? '0 30px 60px -15px rgba(0, 0, 0, 0.95), 0 0 50px rgba(235, 70, 4, 0.3)'
                    : '0 20px 40px -10px rgba(0, 0, 0, 0.8)',
                }}
              >
                {/* ── Card Front Frame ── */}
                <div className="relative w-full h-full bg-[#0a0a0e] border border-white/15 rounded-[28px] sm:rounded-[32px] overflow-hidden flex flex-col justify-between p-4 sm:p-5">
                  {/* Artwork Image */}
                  <div className="absolute inset-0 z-0">
                    <Image
                      src={imageSrc}
                      alt={project.title}
                      fill
                      quality={100}
                      unoptimized
                      className={`object-cover transition-transform duration-700 ease-out ${
                        isCenter ? 'group-hover:scale-105' : 'scale-100'
                      }`}
                      sizes="(max-width: 768px) 260px, 330px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#060608] via-[#060608]/40 to-black/25 pointer-events-none" />

                    {isCenter && (
                      <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-[#EB4604]/25 via-transparent to-transparent pointer-events-none" />
                    )}
                  </div>

                  {/* Top Badges */}
                  <div className="relative z-10 flex items-center justify-between gap-2">
                    <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-[10px] sm:text-[11px] font-mono font-medium uppercase tracking-wider text-white/90 border border-white/15">
                      {project.category}
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-white/10 backdrop-blur-md text-[10px] sm:text-[11px] font-mono text-white/80 border border-white/10">
                      [{project.year}]
                    </span>
                  </div>

                  {/* Bottom Content & Flip Prompt */}
                  <div className="relative z-10 space-y-2 pt-4">
                    <div className="flex items-end justify-between gap-2 pt-1">
                      <div>
                        <span className="text-[11px] font-mono text-neutral-400 block font-light">
                          {project.client}
                        </span>
                        <h3
                          className="text-xl sm:text-2xl font-bold text-white tracking-tight leading-tight"
                          style={{ fontFamily: 'var(--font-family--primary-font)' }}
                        >
                          {project.title}
                        </h3>
                      </div>

                      <button
                        type="button"
                        aria-label="Voir les détails"
                        className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/10 group-hover:bg-[#EB4604] text-white flex items-center justify-center backdrop-blur-md border border-white/20 transition-all duration-300 group-hover:scale-110 shadow-md shrink-0"
                      >
                        <span className="text-xs font-semibold">↺</span>
                      </button>
                    </div>

                    {isCenter && (
                      <div className="pt-1 text-center">
                        <span className="text-[10px] font-mono text-neutral-400 group-hover:text-white transition-colors">
                          Cliquer pour détails ↺
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* ── SPECTACULAR 3D PHYSICAL CARD FLIP & ZOOM OVERLAY ── */}
      {flippedProject && (
        <div
          onClick={closeFlippedCard}
          className={`fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 transition-all duration-700 ${
            isFlippedState && !isClosingFlip
              ? 'bg-black/85 backdrop-blur-xl opacity-100'
              : 'bg-black/0 backdrop-blur-none opacity-0 pointer-events-none'
          }`}
          style={{
            perspective: '1800px',
            transformStyle: 'preserve-3d',
          }}
        >
          {/* ── 3D Card Object (Flips 180° around Y with depth lift) ── */}
          <div
            onClick={(e) => e.stopPropagation()}
            className={`relative w-full max-w-lg max-h-[92vh] transition-all duration-700 ease-out`}
            style={{
              transformStyle: 'preserve-3d',
              transform:
                isFlippedState && !isClosingFlip
                  ? 'translate3d(0, 0, 100px) scale(1) rotateY(180deg)'
                  : 'translate3d(0, 80px, -200px) scale(0.6) rotateY(0deg)',
              transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            {/* ── FRONT FACE (Visible when rotateY = 0deg during animation) ── */}
            <div
              className="absolute inset-0 w-full h-full rounded-[28px] sm:rounded-[32px] overflow-hidden bg-[#0d0d12] border border-white/20 shadow-2xl p-5 flex flex-col justify-between"
              style={{
                backfaceVisibility: 'hidden',
                transform: 'rotateY(0deg)',
              }}
            >
              <div className="relative w-full h-full rounded-2xl overflow-hidden">
                <Image
                  src={getImageSrc(flippedProject.slug)}
                  alt={flippedProject.title}
                  fill
                  quality={100}
                  unoptimized
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 space-y-2">
                  <span className="px-3 py-1 rounded-full bg-[#EB4604] text-white text-xs font-mono font-semibold">
                    {flippedProject.category}
                  </span>
                  <h3 className="text-3xl font-bold text-white">{flippedProject.title}</h3>
                </div>
              </div>
            </div>

            {/* ── BACK FACE (VERSO) — Clean, Sober, Beautiful Layout ── */}
            <div
              className="relative w-full max-h-[88vh] rounded-[28px] sm:rounded-[32px] bg-[#0c0c10] border border-white/15 text-white shadow-[0_30px_90px_rgba(0,0,0,0.95),0_0_50px_rgba(235,70,4,0.2)] overflow-hidden flex flex-col justify-between"
              style={{
                backfaceVisibility: 'hidden',
                transform: 'rotateY(180deg)',
              }}
            >
              {/* ── 1. Top Project Image Header (Clean & Uncluttered) ── */}
              <div className="relative w-full h-44 sm:h-52 bg-neutral-900 overflow-hidden shrink-0 border-b border-white/10">
                <Image
                  src={getImageSrc(flippedProject.slug)}
                  alt={flippedProject.title}
                  fill
                  quality={100}
                  unoptimized
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 550px"
                />
                {/* Subtle dark gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c10] via-black/30 to-black/20" />

                {/* Top header pills on image */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                  <span className="px-3 py-1 rounded-full bg-black/75 backdrop-blur-md text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-white font-medium border border-white/15">
                    {flippedProject.category}
                  </span>

                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-full bg-black/75 backdrop-blur-md text-[10px] sm:text-[11px] font-mono text-white/80 border border-white/15">
                      [{flippedProject.year}]
                    </span>
                    <button
                      onClick={closeFlippedCard}
                      aria-label="Fermer la carte"
                      className="w-8 h-8 rounded-full bg-black/75 hover:bg-[#EB4604] text-white flex items-center justify-center backdrop-blur-md transition-all duration-300 border border-white/20 hover:scale-105"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              </div>

              {/* ── 2. Scrollable Body Content (Well Structured & Balanced) ── */}
              <div className="p-6 sm:p-7 overflow-y-auto space-y-5 text-left">
                {/* Title & Client Block */}
                <div className="space-y-1">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 font-medium block">
                    Client : {flippedProject.client}
                  </span>
                  <h3
                    className="text-2xl sm:text-3xl font-bold text-white tracking-tight leading-tight"
                    style={{ fontFamily: 'var(--font-family--primary-font)' }}
                  >
                    {flippedProject.title}
                  </h3>
                </div>

                {/* Description */}
                <div className="space-y-1.5">
                  <h4 className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 font-semibold">
                    Description du projet
                  </h4>
                  <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed">
                    {flippedProject.description || flippedProject.summary}
                  </p>
                </div>

                {/* Deliverables Grid (Fully wrapped, no awkward cut-offs) */}
                {flippedProject.deliverables && (
                  <div className="space-y-2">
                    <h4 className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 font-semibold">
                      Piliers & Livrables
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {flippedProject.deliverables.map((item, dIdx) => (
                        <div
                          key={dIdx}
                          className="text-xs font-mono text-neutral-300 bg-white/[0.03] border border-white/8 px-3 py-2 rounded-lg flex items-center gap-2"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-[#EB4604] shrink-0" />
                          <span className="leading-snug">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Technologies */}
                <div className="space-y-2">
                  <h4 className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 font-semibold">
                    Stack Technique
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {flippedProject.technologies.map((tech, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2.5 py-1 rounded-md bg-white/[0.04] text-[11px] font-mono text-neutral-300 border border-white/8"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Testimonial Quote */}
                {flippedProject.testimonial && (
                  <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/8 space-y-1">
                    <p className="text-xs italic text-neutral-300 font-light">
                      &ldquo;{flippedProject.testimonial.quote}&rdquo;
                    </p>
                    <span className="text-[10px] font-mono text-[#EB4604] block">
                      — {flippedProject.testimonial.author}, {flippedProject.testimonial.role}
                    </span>
                  </div>
                )}
              </div>

              {/* ── 3. Footer Action Buttons ── */}
              <div className="p-5 sm:p-6 pt-3.5 border-t border-white/10 flex items-center justify-between gap-3 bg-[#08080c] shrink-0">
                <Link
                  href={`/projects/${flippedProject.slug}`}
                  className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-5 rounded-full bg-[#EB4604] hover:bg-[#D43D00] text-white text-xs sm:text-sm font-semibold transition-all duration-300 shadow-md shadow-[#EB4604]/25 group"
                >
                  <span>Consulter l&apos;étude de cas</span>
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </Link>

                <button
                  onClick={closeFlippedCard}
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-3 rounded-full bg-white/[0.04] hover:bg-white/[0.08] text-neutral-300 hover:text-white border border-white/10 text-xs font-medium transition-all"
                >
                  <span>Retourner ↺</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
