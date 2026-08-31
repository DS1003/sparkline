'use client'

import React, { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
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
  const [expandedProject, setExpandedProject] = useState<Project | null>(null)
  const [activeGalleryIndex, setActiveGalleryIndex] = useState(0)
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

  // Auto-close modal when activeIndex changes externally
  useEffect(() => {
    setExpandedProject(null)
    setActiveGalleryIndex(0)
  }, [activeIndex])

  // Reset gallery index when opening a new project
  useEffect(() => {
    setActiveGalleryIndex(0)
  }, [expandedProject])

  // Keyboard navigation & Escape to close
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape' && expandedProject) {
        setExpandedProject(null)
        return
      }

      if (!expandedProject) {
        if (e.key === 'ArrowLeft') {
          onActiveChange(Math.max(0, activeIndex - 1))
        } else if (e.key === 'ArrowRight') {
          onActiveChange(Math.min(projects.length - 1, activeIndex + 1))
        }
      } else {
        // Gallery keyboard navigation when modal is open
        const galleryImages = expandedProject.galleryImages || [getImageSrc(expandedProject.slug)]
        if (e.key === 'ArrowLeft') {
          setActiveGalleryIndex((prev) => (prev > 0 ? prev - 1 : galleryImages.length - 1))
        } else if (e.key === 'ArrowRight') {
          setActiveGalleryIndex((prev) => (prev < galleryImages.length - 1 ? prev + 1 : 0))
        }
      }
    },
    [activeIndex, projects.length, onActiveChange, expandedProject]
  )

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  // Lock body scroll when modal is open
  useEffect(() => {
    if (expandedProject) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [expandedProject])

  // Card click / expand handler
  const handleCardClick = (project: Project, idx: number, isCenter: boolean) => {
    if (!isCenter) {
      // If clicking a side card, center it smoothly
      setExpandedProject(null)
      onActiveChange(idx)
    } else {
      // If clicking center card, expand smoothly into modal
      setExpandedProject(project)
    }
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

  // Dimensions for 3D stage
  const cardWidth = isMobile ? 270 : 340
  const cardHeight = isMobile ? 380 : 470

  return (
    <>
      {/* ── Symmetrical 3D Stage Container ── */}
      <div
        className="relative w-full overflow-hidden select-none py-6 sm:py-10"
        style={{
          perspective: '1500px',
          perspectiveOrigin: '50% 50%',
        }}
      >
        {/* ── 3D Stage ── */}
        <div
          className="relative mx-auto flex items-center justify-center"
          style={{
            height: `${cardHeight + 40}px`,
            transformStyle: 'preserve-3d',
          }}
        >
          {projects.map((project, idx) => {
            let diff = idx - activeIndex
            if (projects.length >= 4) {
              const half = projects.length / 2
              if (diff > half) diff -= projects.length
              if (diff < -half) diff += projects.length
            }
            const absDiff = Math.abs(diff)
            const isCenter = diff === 0
            const isExpanded = expandedProject?.slug === project.slug

            // Exact Symmetrical 3D Transformation Math
            let translateX = 0
            let translateZ = 0
            let rotateY = 0
            let scale = 1
            let opacity = 1
            let zIndex = 50

            if (diff === 0) {
              translateX = 0
              translateZ = 0
              rotateY = 0
              scale = 1
              opacity = 1
              zIndex = 50
            } else if (diff === 1) {
              translateX = isMobile ? 210 : 280
              translateZ = isMobile ? -90 : -120
              rotateY = -18
              scale = isMobile ? 0.88 : 0.88
              opacity = 0.85
              zIndex = 40
            } else if (diff === -1) {
              translateX = isMobile ? -210 : -280
              translateZ = isMobile ? -90 : -120
              rotateY = 18
              scale = isMobile ? 0.88 : 0.88
              opacity = 0.85
              zIndex = 40
            } else if (diff === 2) {
              translateX = isMobile ? 380 : 510
              translateZ = isMobile ? -180 : -240
              rotateY = -32
              scale = isMobile ? 0.76 : 0.76
              opacity = 0.55
              zIndex = 30
            } else if (diff === -2) {
              translateX = isMobile ? -380 : -510
              translateZ = isMobile ? -180 : -240
              rotateY = 32
              scale = isMobile ? 0.76 : 0.76
              opacity = 0.55
              zIndex = 30
            } else {
              translateX = diff > 0 ? (isMobile ? 500 : 700) : (isMobile ? -500 : -700)
              translateZ = -350
              rotateY = diff > 0 ? -45 : 45
              scale = 0.65
              opacity = 0
              zIndex = 10
            }

            const imageSrc = project.coverImage || getImageSrc(project.slug)

            return (
              <div
                key={project.slug}
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  handleCardClick(project, idx, isCenter)
                }}
                className="absolute top-0 cursor-pointer will-change-transform"
                style={{
                  width: `${cardWidth}px`,
                  height: `${cardHeight}px`,
                  transformOrigin: '50% 50%',
                  transform: `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                  zIndex: isExpanded ? 100 : zIndex,
                  opacity,
                  transformStyle: 'preserve-3d',
                  transition: 'transform 0.65s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.5s ease',
                  pointerEvents: absDiff > 2 ? 'none' : 'auto',
                }}
              >
                {/* ── 3D Card Flipper & Frame ── */}
                <div
                  className="relative w-full h-full rounded-[28px] sm:rounded-[32px] bg-[#08080a] border border-white/12 overflow-hidden flex flex-col justify-between p-4 sm:p-5 group"
                  style={{
                    boxShadow: isCenter
                      ? '0 30px 70px -15px rgba(0, 0, 0, 0.98), 0 10px 30px rgba(0, 0, 0, 0.8)'
                      : '0 20px 40px -10px rgba(0, 0, 0, 0.8)',
                    transformStyle: 'preserve-3d',
                    transform: isExpanded ? 'rotateY(180deg) scale(0.95)' : 'rotateY(0deg) scale(1)',
                    transition: 'transform 0.65s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                >
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
                      sizes="(max-width: 768px) 270px, 340px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-black/20 pointer-events-none" />
                  </div>

                  {/* Top Badges */}
                  <div className="relative z-10 flex items-center justify-between gap-2">
                    <span className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-[10px] sm:text-[11px] font-mono font-medium uppercase tracking-wider text-white/90 border border-white/15">
                      {project.category}
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-[10px] sm:text-[11px] font-mono text-white/80 border border-white/10">
                      [{project.year}]
                    </span>
                  </div>

                  {/* Bottom Content & Interactive Expand Prompt */}
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
                        onClick={(e) => {
                          e.stopPropagation()
                          handleCardClick(project, idx, isCenter)
                        }}
                        aria-label="Explorer les détails"
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

      {/* ── EXPANSIVE LUXURY ZERO-SCROLL 2-COLUMN PROJECT MODAL ── */}
      <AnimatePresence>
        {expandedProject && (() => {
          const gallery = expandedProject.galleryImages || [
            expandedProject.coverImage || getImageSrc(expandedProject.slug),
          ]
          const currentHeroImage = gallery[activeGalleryIndex] || gallery[0]

          return (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 lg:p-6">
              {/* Backdrop Blur Overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                onClick={() => setExpandedProject(null)}
                className="absolute inset-0 bg-black/90 backdrop-blur-2xl"
              />

              {/* Morphing Minimalist 2-Column Modal Window (Zero Scroll, Perfectly Proportioned) */}
              <motion.div
                initial={{
                  opacity: 0,
                  scale: 0.65,
                  rotateY: 90,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  rotateY: 0,
                  y: 0,
                  transition: {
                    duration: 0.5,
                    ease: [0.16, 1, 0.3, 1],
                  },
                }}
                exit={{
                  opacity: 0,
                  scale: 0.65,
                  rotateY: 90,
                  y: 20,
                  transition: {
                    duration: 0.35,
                    ease: [0.16, 1, 0.3, 1],
                  },
                }}
                className="relative w-full max-w-5xl bg-[#0A0A0E] border border-white/15 rounded-[24px] sm:rounded-[32px] shadow-[0_40px_120px_rgba(0,0,0,0.98)] overflow-hidden flex flex-col z-10 my-auto"
                style={{
                  perspective: '1200px',
                  transformStyle: 'preserve-3d',
                }}
              >
                {/* ── 1. Top Compact Header Bar ── */}
                <div className="px-5 py-3 sm:px-7 sm:py-4 border-b border-white/10 flex items-center justify-between bg-black/40 backdrop-blur-md shrink-0">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <span className="px-3 py-1 rounded-full bg-[#EB4604]/15 border border-[#EB4604]/30 text-[#EB4604] text-[10px] sm:text-[11px] font-mono font-semibold uppercase tracking-wider">
                      {expandedProject.category}
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-white/[0.05] border border-white/10 text-[10px] sm:text-[11px] font-mono text-neutral-400">
                      [{expandedProject.year}]
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => setExpandedProject(null)}
                    aria-label="Fermer le modal"
                    className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/[0.06] hover:bg-[#EB4604] text-white flex items-center justify-center text-xs font-semibold transition-all duration-300 border border-white/15 hover:scale-105 active:scale-95"
                  >
                    ✕
                  </button>
                </div>

                {/* ── 2. Two-Column Minimalist Content Grid (Zero Scroll) ── */}
                <div className="p-5 sm:p-7 grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8 items-center text-left">
                  {/* Left Column: Title, Description, Stack, Actions */}
                  <div className="md:col-span-5 flex flex-col justify-between space-y-4">
                    {/* Title & Client */}
                    <div className="space-y-1">
                      <span className="text-[11px] font-mono uppercase tracking-widest text-[#EB4604] font-semibold block">
                        Client : {expandedProject.client}
                      </span>
                      <h3
                        className="text-xl sm:text-3xl font-bold text-white tracking-tight leading-tight"
                        style={{ fontFamily: 'var(--font-family--primary-font)' }}
                      >
                        {expandedProject.title}
                      </h3>
                    </div>

                    {/* Project Description */}
                    <div className="space-y-1.5">
                      <span className="text-[9px] font-mono uppercase tracking-widest text-neutral-400 font-semibold block">
                        Description du projet
                      </span>
                      <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed">
                        {expandedProject.description || expandedProject.summary}
                      </p>
                    </div>

                    {/* Technologies Used */}
                    {expandedProject.technologies && (
                      <div className="space-y-2">
                        <span className="text-[9px] font-mono uppercase tracking-widest text-neutral-400 font-semibold block">
                          Technologies utilisées
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {expandedProject.technologies.map((tech, tIdx) => (
                            <span
                              key={tIdx}
                              className="px-2.5 py-1 rounded-md bg-white/[0.05] border border-white/10 text-[11px] font-mono text-neutral-200"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Action Buttons Integrated into Left Column */}
                    <div className="pt-2 flex items-center gap-3">
                      <Link
                        href={`/projects/${expandedProject.slug}`}
                        className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-5 rounded-full bg-[#EB4604] hover:bg-[#D43D00] text-white text-xs sm:text-sm font-semibold transition-all duration-300 shadow-md shadow-[#EB4604]/25 group"
                      >
                        <span>Consulter l&apos;étude de cas</span>
                        <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                      </Link>

                      <button
                        type="button"
                        onClick={() => setExpandedProject(null)}
                        className="inline-flex items-center justify-center px-4 py-3 rounded-full bg-white/[0.06] hover:bg-white/[0.12] text-neutral-300 hover:text-white border border-white/10 text-xs sm:text-sm font-medium transition-all"
                      >
                        <span>Fermer ✕</span>
                      </button>
                    </div>
                  </div>

                  {/* Right Column: Full Landscape Interactive Gallery */}
                  <div className="md:col-span-7 flex flex-col space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] font-mono uppercase tracking-widest text-neutral-400 font-semibold block">
                        Galerie du projet
                      </span>
                      <span className="text-[10px] font-mono text-neutral-500">
                        0{activeGalleryIndex + 1} / 0{gallery.length}
                      </span>
                    </div>

                    {/* Main Landscape Visual Viewport */}
                    <div className="relative w-full h-52 sm:h-64 md:h-72 lg:h-80 rounded-2xl overflow-hidden bg-neutral-950 border border-white/10 shadow-2xl group">
                      <Image
                        src={currentHeroImage}
                        alt={`${expandedProject.title} preview ${activeGalleryIndex + 1}`}
                        fill
                        quality={100}
                        unoptimized
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        sizes="(max-width: 1024px) 100vw, 600px"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20 pointer-events-none" />

                      {/* Direction Arrows on Landscape Image */}
                      {gallery.length > 1 && (
                        <div className="absolute inset-x-3 top-1/2 -translate-y-1/2 flex items-center justify-between pointer-events-none">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation()
                              setActiveGalleryIndex((prev) => (prev > 0 ? prev - 1 : gallery.length - 1))
                            }}
                            aria-label="Image précédente"
                            className="w-9 h-9 rounded-full bg-black/75 hover:bg-[#EB4604] border border-white/20 text-white flex items-center justify-center text-xs transition-all duration-200 pointer-events-auto backdrop-blur-md shadow-lg active:scale-95"
                          >
                            ←
                          </button>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation()
                              setActiveGalleryIndex((prev) => (prev < gallery.length - 1 ? prev + 1 : 0))
                            }}
                            aria-label="Image suivante"
                            className="w-9 h-9 rounded-full bg-black/75 hover:bg-[#EB4604] border border-white/20 text-white flex items-center justify-center text-xs transition-all duration-200 pointer-events-auto backdrop-blur-md shadow-lg active:scale-95"
                          >
                            →
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Interactive Thumbnail Strip */}
                    {gallery.length > 1 && (
                      <div className="grid grid-cols-4 gap-2 pt-0.5">
                        {gallery.map((imgUrl, thumbIdx) => {
                          const isActive = activeGalleryIndex === thumbIdx
                          return (
                            <button
                              key={thumbIdx}
                              type="button"
                              onClick={() => setActiveGalleryIndex(thumbIdx)}
                              className={`relative h-14 sm:h-16 rounded-xl overflow-hidden border transition-all duration-300 ${
                                isActive
                                  ? 'border-[#EB4604] ring-2 ring-[#EB4604]/40 scale-[1.02]'
                                  : 'border-white/10 opacity-60 hover:opacity-100 hover:border-white/30'
                              }`}
                            >
                              <Image
                                src={imgUrl}
                                alt={`Thumbnail ${thumbIdx + 1}`}
                                fill
                                quality={75}
                                unoptimized
                                className="object-cover"
                                sizes="150px"
                              />
                            </button>
                          )
                        })}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            </div>
          )
        })()}
      </AnimatePresence>
    </>
  )
}
