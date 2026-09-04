'use client'

import React, { useState, useEffect, useCallback, useRef } from 'react'
import { createPortal } from 'react-dom'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Project } from '@/types'

interface Curved3DProjectsGalleryProps {
  projects: Project[]
  activeIndex: number
  onActiveChange: (index: number) => void
  theme?: 'dark' | 'light'
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

export function Curved3DProjectsGallery({
  projects,
  activeIndex,
  onActiveChange,
  theme = 'dark',
}: Curved3DProjectsGalleryProps) {
  const [expandedProject, setExpandedProject] = useState<Project | null>(null)
  const [activeGalleryIndex, setActiveGalleryIndex] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const [isCompactDesktop, setIsCompactDesktop] = useState(false)
  const [portalMounted, setPortalMounted] = useState(false)

  // Ensure portal only renders client-side
  useEffect(() => { setPortalMounted(true) }, [])

  // Detect mobile & compact desktop viewport
  useEffect(() => {
    const checkDimensions = () => {
      setIsMobile(window.innerWidth < 768)
      setIsCompactDesktop(window.innerWidth >= 768 && window.innerWidth < 1440)
    }
    checkDimensions()
    window.addEventListener('resize', checkDimensions)
    return () => window.removeEventListener('resize', checkDimensions)
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

  // Lock body & document scroll completely when modal is open (Bulletproof for iOS & Mobile)
  useEffect(() => {
    if (expandedProject) {
      const scrollY = window.scrollY
      const originalStyle = {
        position: document.body.style.position,
        top: document.body.style.top,
        width: document.body.style.width,
        overflow: document.body.style.overflow,
        htmlOverflow: document.documentElement.style.overflow,
      }

      document.body.style.position = 'fixed'
      document.body.style.top = `-${scrollY}px`
      document.body.style.width = '100%'
      document.body.style.overflow = 'hidden'
      document.documentElement.style.overflow = 'hidden'

      return () => {
        document.body.style.position = originalStyle.position
        document.body.style.top = originalStyle.top
        document.body.style.width = originalStyle.width
        document.body.style.overflow = originalStyle.overflow
        document.documentElement.style.overflow = originalStyle.htmlOverflow
        window.scrollTo(0, scrollY)
      }
    }
  }, [expandedProject])

  // ── High-Performance Smooth Swipe & Drag Controller (Zero Section Trembling) ──
  const [isDragging, setIsDragging] = useState(false)
  const touchStartX = useRef(0)
  const touchStartY = useRef(0)
  const touchDeltaX = useRef(0)
  const isHorizontalSwipe = useRef<boolean | null>(null)

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
    touchStartY.current = e.touches[0].clientY
    touchDeltaX.current = 0
    isHorizontalSwipe.current = null
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    const currentX = e.touches[0].clientX
    const currentY = e.touches[0].clientY
    const deltaX = currentX - touchStartX.current
    const deltaY = currentY - touchStartY.current

    // Lock direction once movement exceeds 8px: if vertical, never block page scroll
    if (isHorizontalSwipe.current === null && (Math.abs(deltaX) > 8 || Math.abs(deltaY) > 8)) {
      isHorizontalSwipe.current = Math.abs(deltaX) > Math.abs(deltaY)
    }

    if (isHorizontalSwipe.current) {
      touchDeltaX.current = deltaX
      if (Math.abs(deltaX) > 10) {
        setIsDragging(true)
      }
    }
  }

  const handleTouchEnd = () => {
    if (isHorizontalSwipe.current && Math.abs(touchDeltaX.current) > 35 && projects.length > 0) {
      const direction = touchDeltaX.current < 0 ? 1 : -1
      const nextIndex = (activeIndex + direction + projects.length) % projects.length
      onActiveChange(nextIndex)
    }
    setTimeout(() => setIsDragging(false), 80)
    isHorizontalSwipe.current = null
    touchDeltaX.current = 0
  }

  // Desktop Mouse Drag Controller
  const mouseStartX = useRef(0)
  const isMouseDown = useRef(false)

  const handleMouseDown = (e: React.MouseEvent) => {
    mouseStartX.current = e.clientX
    isMouseDown.current = true
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isMouseDown.current) return
    const deltaX = e.clientX - mouseStartX.current
    if (Math.abs(deltaX) > 10) {
      setIsDragging(true)
    }
  }

  const handleMouseUp = (e: React.MouseEvent) => {
    if (!isMouseDown.current) return
    isMouseDown.current = false
    const deltaX = e.clientX - mouseStartX.current
    if (Math.abs(deltaX) > 35 && projects.length > 0) {
      const direction = deltaX < 0 ? 1 : -1
      const nextIndex = (activeIndex + direction + projects.length) % projects.length
      onActiveChange(nextIndex)
    }
    setTimeout(() => setIsDragging(false), 80)
  }

  // Card click / expand handler
  const handleCardClick = (project: Project, idx: number, isCenter: boolean) => {
    if (isDragging) return
    if (!isCenter) {
      // If clicking a side card, center it smoothly
      setExpandedProject(null)
      onActiveChange(idx)
    } else {
      // If clicking center card, expand smoothly into modal
      setExpandedProject(project)
    }
  }

  // Dimensions for 3D stage
  const cardWidth = isMobile ? 260 : isCompactDesktop ? 295 : 340
  const cardHeight = isMobile ? 360 : isCompactDesktop ? 410 : 470
  const step1X = isMobile ? 210 : isCompactDesktop ? 245 : 280
  const step2X = isMobile ? 380 : isCompactDesktop ? 440 : 510

  return (
    <>
      {/* ── Symmetrical 3D Stage Container (Stable, Zero-Tremble) ── */}
      <div
        className="relative w-full overflow-hidden select-none py-4 sm:py-8 lg:py-10 cursor-grab active:cursor-grabbing touch-pan-y"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        style={{
          perspective: '1500px',
          perspectiveOrigin: '50% 50%',
        }}
      >
        {/* ── 3D Stage ── */}
        <div
          className="relative mx-auto flex items-center justify-center"
          style={{
            height: `${cardHeight + 35}px`,
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
              translateX = step1X
              translateZ = isMobile ? -90 : -110
              rotateY = -18
              scale = 0.88
              opacity = 0.85
              zIndex = 40
            } else if (diff === -1) {
              translateX = -step1X
              translateZ = isMobile ? -90 : -110
              rotateY = 18
              scale = 0.88
              opacity = 0.85
              zIndex = 40
            } else if (diff === 2) {
              translateX = step2X
              translateZ = isMobile ? -180 : -220
              rotateY = -32
              scale = 0.76
              opacity = 0.55
              zIndex = 30
            } else if (diff === -2) {
              translateX = -step2X
              translateZ = isMobile ? -180 : -220
              rotateY = 32
              scale = 0.76
              opacity = 0.55
              zIndex = 30
            } else {
              translateX = diff > 0 ? (isMobile ? 500 : isCompactDesktop ? 580 : 680) : (isMobile ? -500 : isCompactDesktop ? -580 : -680)
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
                  onDragStart={(e) => e.preventDefault()}
                  className="relative w-full h-full rounded-[28px] sm:rounded-[32px] bg-white/[0.03] backdrop-blur-md border border-white/10 group-hover:border-white/25 overflow-hidden flex flex-col justify-end p-4 sm:p-5 group select-none"
                  style={{
                    boxShadow: isCenter
                      ? '0 40px 80px -20px rgba(0, 0, 0, 0.9), inset 0 0 0 1px rgba(255,255,255,0.05)'
                      : '0 20px 40px -10px rgba(0, 0, 0, 0.6)',
                    transform: isExpanded ? 'scale(1.02)' : 'scale(1)',
                    opacity: isExpanded ? 0.35 : 1,
                    transition: 'transform 0.45s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.35s ease, border-color 0.3s ease',
                  }}
                >
                  {/* Artwork Image (Draggable false to prevent browser native ghost dragging) */}
                  <div className="absolute inset-0 z-0 pointer-events-none select-none">
                    <Image
                      src={imageSrc}
                      alt={project.title}
                      fill
                      quality={85}
                      draggable={false}
                      className={`object-cover transition-transform duration-700 ease-out pointer-events-none select-none ${
                        isCenter ? 'group-hover:scale-105' : 'scale-100'
                      }`}
                      sizes="(max-width: 768px) 270px, 340px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none" />
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
                        <span className="text-xs font-semibold transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
                      </button>
                    </div>

                    {isCenter && (
                      <div className="pt-1 text-center">
                        <span className="text-[10px] font-mono text-neutral-400 group-hover:text-white transition-colors">
                          Cliquer pour détails ↗
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

      {/* ── PROJECT MODAL — rendered via Portal into document.body to escape 3D transform stacking context ── */}
      {portalMounted && createPortal(
        <AnimatePresence>
        {expandedProject && (() => {
          const gallery = expandedProject.galleryImages || [
            expandedProject.coverImage || getImageSrc(expandedProject.slug),
          ]
          const currentHeroImage = gallery[activeGalleryIndex] || gallery[0]

          return (
            <div
              className="fixed inset-0 z-[9999] flex items-end sm:items-center justify-center sm:p-5 lg:p-6 overscroll-contain"
              onTouchMove={(e) => e.stopPropagation()}
            >
              {/* Backdrop Blur Overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                onClick={() => setExpandedProject(null)}
                className="absolute inset-0 bg-black/80 sm:bg-black/90 backdrop-blur-2xl"
              />

              {/* Morphing Minimalist 2-Column Modal Window (Fluid Responsive & Ergonomic) */}
              <motion.div
                initial={{
                  opacity: 0,
                  scale: 0.92,
                  y: 16,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  y: 0,
                  transition: {
                    duration: 0.35,
                    ease: [0.16, 1, 0.3, 1],
                  },
                }}
                exit={{
                  opacity: 0,
                  scale: 0.94,
                  y: 10,
                  transition: {
                    duration: 0.25,
                    ease: [0.16, 1, 0.3, 1],
                  },
                }}
                className={`relative w-full max-w-5xl overflow-hidden ${
                  theme === 'light'
                    ? 'bg-white text-neutral-900 border border-neutral-200 shadow-[0_30px_90px_rgba(0,0,0,0.18)]'
                    : 'bg-[#0A0A0E] text-white border border-white/15 shadow-[0_40px_120px_rgba(0,0,0,0.98)]'
                } rounded-t-[28px] sm:rounded-[32px] flex flex-col z-10 sm:my-auto max-h-[94svh] sm:max-h-[90vh]`}
                style={{
                  perspective: '1200px',
                  transformStyle: 'preserve-3d',
                }}
              >

                {/* ── 1. Sticky Top Header Bar — desktop only ── */}
                <div
                  className={`hidden sm:flex sticky top-0 z-30 px-7 py-4 border-b ${
                    theme === 'light'
                      ? 'border-neutral-200 bg-white/95 text-neutral-900'
                      : 'border-white/10 bg-[#0A0A0E]/95 text-white'
                  } backdrop-blur-xl items-center justify-between shrink-0`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="px-3 py-1 rounded-full bg-[#EB4604]/15 border border-[#EB4604]/30 text-[#EB4604] text-[11px] font-mono font-semibold uppercase tracking-wider truncate">
                      {expandedProject.type || expandedProject.category}
                    </span>
                    <span
                      className={`px-2 py-1 rounded-full text-[11px] font-mono shrink-0 ${
                        theme === 'light'
                          ? 'bg-neutral-200/70 border border-neutral-300 text-neutral-600'
                          : 'bg-white/[0.05] border border-white/10 text-neutral-400'
                      }`}
                    >
                      [{expandedProject.year}]
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => setExpandedProject(null)}
                    aria-label="Fermer le modal"
                    className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-semibold transition-all duration-300 border hover:scale-105 active:scale-95 shrink-0 ${
                      theme === 'light'
                        ? 'bg-neutral-100 hover:bg-[#EB4604] hover:text-white text-neutral-800 border-neutral-300'
                        : 'bg-white/[0.08] hover:bg-[#EB4604] text-white border-white/15'
                    }`}
                  >
                    ✕
                  </button>
                </div>

                {/* ── 2. Two-Column Minimalist Content Grid (Mobile Ordered: Visual First, Details Second) ── */}
                <div className="p-3 sm:p-6 lg:p-7 flex flex-col md:grid md:grid-cols-12 gap-3 sm:gap-5 lg:gap-8 items-start text-left overflow-y-auto overscroll-contain flex-1">
                  {/* Visual Gallery Viewport (Order 1 on mobile, Order 2 on desktop) */}
                  <div className="w-full order-1 md:order-2 md:col-span-7 flex flex-col space-y-2 sm:space-y-3">
                    <div className="flex items-center justify-between text-[10px] font-mono text-neutral-400">
                      <span className="uppercase tracking-widest font-semibold text-[#EB4604]">
                        Galerie ({activeGalleryIndex + 1}/{gallery.length})
                      </span>
                      <span>Glissez ou cliquez</span>
                    </div>

                    {/* Main Landscape Visual Viewport */}
                    <div
                      className={`relative w-full h-48 sm:h-64 md:h-72 lg:h-80 rounded-2xl overflow-hidden shadow-xl group ${
                        theme === 'light'
                          ? 'bg-neutral-100 border border-neutral-200'
                          : 'bg-neutral-950 border border-white/10'
                      }`}
                    >
                      <Image
                        src={currentHeroImage}
                        alt={`${expandedProject.title} preview ${activeGalleryIndex + 1}`}
                        fill
                        quality={90}
                        draggable={false}
                        className="object-cover object-top transition-transform duration-700 ease-out select-none"
                        sizes="(max-width: 768px) 100vw, 600px"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20 pointer-events-none" />

                      {/* Direction Arrows on Landscape Image */}
                      {gallery.length > 1 && (
                        <div className="absolute inset-x-3 sm:inset-x-4 top-1/2 -translate-y-1/2 flex items-center justify-between pointer-events-none">
                          {/* Prev */}
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation()
                              setActiveGalleryIndex((prev) => (prev > 0 ? prev - 1 : gallery.length - 1))
                            }}
                            aria-label="Image précédente"
                            className="group pointer-events-auto flex items-center justify-center w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/40 backdrop-blur-xl text-white transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg"
                          >
                            <svg className="w-3.5 h-3.5 transition-transform duration-300 group-hover:-translate-x-0.5" fill="none" viewBox="0 0 14 14" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
                              <path d="M9 11L5 7l4-4" />
                            </svg>
                          </button>

                          {/* Next */}
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation()
                              setActiveGalleryIndex((prev) => (prev < gallery.length - 1 ? prev + 1 : 0))
                            }}
                            aria-label="Image suivante"
                            className="group pointer-events-auto flex items-center justify-center w-9 h-9 rounded-full bg-white/10 hover:bg-[#EB4604] border border-white/20 hover:border-[#EB4604] backdrop-blur-xl text-white transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg hover:shadow-[#EB4604]/30"
                          >
                            <svg className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5" fill="none" viewBox="0 0 14 14" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
                              <path d="M5 3l4 4-4 4" />
                            </svg>
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Interactive Thumbnail Strip (Horizontally Scrollable on Mobile) */}
                    {gallery.length > 1 && (
                      <div className="flex sm:grid sm:grid-cols-4 gap-2 overflow-x-auto pb-1 pt-0.5 no-scrollbar">
                        {gallery.map((imgUrl, thumbIdx) => {
                          const isActive = activeGalleryIndex === thumbIdx
                          return (
                            <button
                              key={thumbIdx}
                              type="button"
                              onClick={() => setActiveGalleryIndex(thumbIdx)}
                              className={`relative w-16 h-12 sm:w-auto sm:h-14 md:h-16 rounded-xl overflow-hidden border shrink-0 transition-all duration-300 ${
                                isActive
                                  ? 'border-[#EB4604] ring-2 ring-[#EB4604]/40 scale-[1.02]'
                                  : theme === 'light'
                                  ? 'border-neutral-200 opacity-70 hover:opacity-100 hover:border-neutral-400'
                                  : 'border-white/10 opacity-60 hover:opacity-100 hover:border-white/30'
                              }`}
                            >
                              <Image
                                src={imgUrl}
                                alt={`Thumbnail ${thumbIdx + 1}`}
                                fill
                                quality={75}
                                draggable={false}
                                className="object-cover select-none"
                                sizes="120px"
                              />
                            </button>
                          )
                        })}
                      </div>
                    )}
                  </div>

                  {/* Left Column: Title, Description, Stack, Actions (Order 2 on mobile, Order 1 on desktop) */}
                  <div className="w-full order-2 md:order-1 md:col-span-5 flex flex-col justify-between space-y-4">
                    {/* Title & Client */}
                    <div className="space-y-1">
                      <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-widest text-[#EB4604] font-semibold block">
                        Client : {expandedProject.client}
                      </span>
                      <h3
                        className={`text-lg sm:text-2xl lg:text-3xl font-bold tracking-tight leading-tight ${
                          theme === 'light' ? 'text-neutral-900' : 'text-white'
                        }`}
                        style={{ fontFamily: 'var(--font-family--primary-font)' }}
                      >
                        {expandedProject.title}
                      </h3>
                    </div>

                    {/* Project Description */}
                    <div className="space-y-1">
                      <span
                        className={`text-[9px] font-mono uppercase tracking-widest font-semibold block ${
                          theme === 'light' ? 'text-neutral-500' : 'text-neutral-400'
                        }`}
                      >
                        Description du projet
                      </span>
                      <p
                        className={`text-xs sm:text-sm font-light leading-relaxed ${
                          theme === 'light' ? 'text-neutral-600' : 'text-neutral-300'
                        }`}
                      >
                        {expandedProject.description || expandedProject.summary}
                      </p>
                    </div>

                    {/* Technologies Used */}
                    {expandedProject.technologies && (
                      <div className="space-y-1.5">
                        <span
                          className={`text-[9px] font-mono uppercase tracking-widest font-semibold block ${
                            theme === 'light' ? 'text-neutral-500' : 'text-neutral-400'
                          }`}
                        >
                          Technologies
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {expandedProject.technologies.map((tech, tIdx) => (
                            <span
                              key={tIdx}
                              className={`px-2.5 py-1 rounded-md text-[10.5px] sm:text-[11px] font-mono ${
                                theme === 'light'
                                  ? 'bg-neutral-100 border border-neutral-200 text-neutral-800'
                                  : 'bg-white/[0.05] border border-white/10 text-neutral-200'
                              }`}
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="pt-1 sm:pt-2 flex flex-row items-center gap-2 sm:gap-3">
                      {/* Primary CTA */}
                      {expandedProject.url ? (
                        <a
                          href={expandedProject.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group flex-1 inline-flex items-center justify-center gap-2 py-3 px-5 rounded-full bg-[#EB4604] hover:bg-[#D43D00] text-white text-xs sm:text-sm font-semibold tracking-tight transition-all duration-300 shadow-md shadow-[#EB4604]/30 hover:shadow-[#EB4604]/50 hover:scale-[1.02] active:scale-[0.98]"
                        >
                          <span>Visiter le site</span>
                          <span className="w-5 h-5 rounded-full bg-white/20 group-hover:bg-white/30 flex items-center justify-center text-[11px] transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
                        </a>
                      ) : (
                        <Link
                          href={`/projects/${expandedProject.slug}`}
                          className="group flex-1 inline-flex items-center justify-center gap-2 py-3 px-5 rounded-full bg-[#EB4604] hover:bg-[#D43D00] text-white text-xs sm:text-sm font-semibold tracking-tight transition-all duration-300 shadow-md shadow-[#EB4604]/30 hover:shadow-[#EB4604]/50 hover:scale-[1.02] active:scale-[0.98]"
                        >
                          <span>Voir le projet</span>
                          <span className="w-5 h-5 rounded-full bg-white/20 group-hover:bg-white/30 flex items-center justify-center text-[11px] transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
                        </Link>
                      )}

                      {/* Close — compact icon pill */}
                      <button
                        type="button"
                        onClick={() => setExpandedProject(null)}
                        aria-label="Fermer"
                        className={`shrink-0 inline-flex items-center justify-center w-11 h-11 rounded-full text-sm font-medium transition-all duration-300 border hover:scale-105 active:scale-95 ${
                          theme === 'light'
                            ? 'bg-neutral-100 hover:bg-neutral-200 text-neutral-600 border-neutral-200'
                            : 'bg-white/[0.07] hover:bg-white/[0.14] text-neutral-300 hover:text-white border-white/10'
                        }`}
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          )
        })()}
        </AnimatePresence>,
        document.body
      )}
    </>
  )
}
