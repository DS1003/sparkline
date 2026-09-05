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
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)
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

  // Reset gallery index when activeIndex changes (but do not forcefully close the modal if it was just opened)
  useEffect(() => {
    setActiveGalleryIndex(0)
  }, [activeIndex])

  // Reset gallery index and lightbox when opening a new project
  useEffect(() => {
    setActiveGalleryIndex(0)
    setIsLightboxOpen(false)
  }, [expandedProject])

  // Keyboard navigation & Escape to close
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isLightboxOpen) {
          setIsLightboxOpen(false)
          return
        }
        if (expandedProject) {
          setExpandedProject(null)
          return
        }
      }

      if (!expandedProject) {
        if (e.key === 'ArrowLeft') {
          onActiveChange(Math.max(0, activeIndex - 1))
        } else if (e.key === 'ArrowRight') {
          onActiveChange(Math.min(projects.length - 1, activeIndex + 1))
        }
      } else {
        // Gallery keyboard navigation when modal or lightbox is open
        const galleryImages = expandedProject.galleryImages || [getImageSrc(expandedProject.slug)]
        if (e.key === 'ArrowLeft') {
          setActiveGalleryIndex((prev) => (prev > 0 ? prev - 1 : galleryImages.length - 1))
        } else if (e.key === 'ArrowRight') {
          setActiveGalleryIndex((prev) => (prev < galleryImages.length - 1 ? prev + 1 : 0))
        }
      }
    },
    [activeIndex, projects.length, onActiveChange, expandedProject, isLightboxOpen]
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
  const dragDistance = useRef(0)
  const touchStartX = useRef(0)
  const touchStartY = useRef(0)
  const touchDeltaX = useRef(0)
  const isHorizontalSwipe = useRef<boolean | null>(null)

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
    touchStartY.current = e.touches[0].clientY
    touchDeltaX.current = 0
    dragDistance.current = 0
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
      dragDistance.current = Math.abs(deltaX)
      if (Math.abs(deltaX) > 20) {
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
    if (dragDistance.current <= 15) {
      setIsDragging(false)
    } else {
      setTimeout(() => setIsDragging(false), 80)
    }
    isHorizontalSwipe.current = null
    touchDeltaX.current = 0
  }

  // Desktop Mouse Drag Controller
  const mouseStartX = useRef(0)
  const isMouseDown = useRef(false)

  const handleMouseDown = (e: React.MouseEvent) => {
    mouseStartX.current = e.clientX
    dragDistance.current = 0
    isMouseDown.current = true
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isMouseDown.current) return
    const deltaX = Math.abs(e.clientX - mouseStartX.current)
    dragDistance.current = deltaX
    if (deltaX > 20) {
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
    if (dragDistance.current <= 15) {
      setIsDragging(false)
    } else {
      setTimeout(() => setIsDragging(false), 80)
    }
  }

  // Card click / expand handler
  const handleCardClick = (project: Project, idx: number, isCenter: boolean) => {
    // If the user actually dragged (>15px movement), ignore click
    if (dragDistance.current > 15) return

    // Always change active index so the gallery smoothly centers the clicked card
    onActiveChange(idx)
    // Open modal window for the clicked project
    setExpandedProject(project)
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
                  className="relative w-full h-full rounded-[28px] sm:rounded-[32px] bg-white/[0.02] backdrop-blur-sm border border-neutral-200/20 group-hover:border-neutral-200/40 overflow-hidden flex flex-col justify-end p-4 sm:p-5 group select-none"
                  style={{
                    boxShadow: isCenter
                      ? (theme === 'light'
                        ? '0 25px 50px -12px rgba(0, 0, 0, 0.15)'
                        : '0 30px 60px -15px rgba(0, 0, 0, 0.4)')
                      : (theme === 'light'
                        ? '0 10px 25px -5px rgba(0, 0, 0, 0.08)'
                        : '0 15px 30px -10px rgba(0, 0, 0, 0.25)'),
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
                      className={`object-cover transition-transform duration-700 ease-out pointer-events-none select-none ${isCenter ? 'group-hover:scale-105' : 'scale-100'
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
                className="fixed inset-0 z-[9999] flex items-end sm:items-center justify-center p-2 sm:p-4 md:p-6 overscroll-contain"
                onTouchMove={(e) => e.stopPropagation()}
              >
                {/* True Blurred Glass (Frosted Glass / Effet Vitre) Overlay */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  onClick={() => setExpandedProject(null)}
                  className="absolute inset-0 bg-black/50 backdrop-blur-md"
                />

                {/* ── Outer Bento Shell (Inspired by modern hardware design) ── */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 16 }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    y: 0,
                    transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.96,
                    y: 10,
                    transition: { duration: 0.2, ease: [0.16, 1, 0.3, 1] },
                  }}
                  className="relative w-full max-w-5xl rounded-[22px] sm:rounded-[36px] md:rounded-[40px] p-2 sm:p-3.5 md:p-4 z-10 sm:my-auto max-h-[96svh] sm:max-h-[92svh] overflow-y-auto flex flex-col shadow-2xl bg-[#EAEAEF] border border-white/80 shadow-[0_30px_90px_rgba(0,0,0,0.25)]"
                >
                  {/* ── Two-Column Bento Layout ── */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-2 sm:gap-3.5 md:gap-4 items-stretch">

                    {/* ── LEFT PANEL: Editorial Details & Capabilities (High-Contrast Light Canvas) ── */}
                    <div className="order-2 md:order-1 md:col-span-5 rounded-[18px] sm:rounded-[28px] md:rounded-[32px] p-3.5 sm:p-7 lg:p-8 flex flex-col justify-between space-y-3 sm:space-y-6 bg-white text-neutral-900 border border-neutral-200/90 shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
                      {/* Top Header Group */}
                      <div className="space-y-2 sm:space-y-4">
                        {/* Meta Tags: Category + Year */}
                        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                          <span
                            className="relative inline-flex items-center px-3 sm:px-3.5 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-wider text-white overflow-hidden select-none"
                            style={{
                              background: 'linear-gradient(180deg, #FF6A26 0%, #EB4604 55%, #CF3B00 100%)',
                              boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.65), inset 0 -1.5px 2px rgba(0,0,0,0.35), 0 3px 8px -1px rgba(235,70,4,0.4), 0 1px 2px rgba(0,0,0,0.12)',
                              textShadow: '0 1px 2px rgba(0,0,0,0.35)',
                            }}
                          >
                            {/* Top glass specular highlight line */}
                            <span className="absolute top-0 inset-x-2 h-[1px] bg-gradient-to-r from-transparent via-white/70 to-transparent pointer-events-none" />
                            <span className="relative z-10">{expandedProject.type || expandedProject.category}</span>
                          </span>
                          <span className="px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-[11px] font-mono font-medium bg-neutral-100 border border-neutral-200/90 text-neutral-700">
                            {expandedProject.year}
                          </span>
                        </div>

                        {/* Client & Title */}
                        <div className="space-y-0.5 sm:space-y-1">
                          <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-neutral-400 font-semibold block">
                            Client : <strong className="text-neutral-800 font-semibold">{expandedProject.client}</strong>
                          </span>
                          <h2
                            className="text-xl sm:text-3xl font-extrabold tracking-tight leading-tight text-neutral-950"
                            style={{ fontFamily: 'var(--font-family--primary-font)' }}
                          >
                            {expandedProject.title}
                          </h2>
                        </div>

                        {/* Description */}
                        <div className="space-y-0.5 sm:space-y-1.5 pt-0.5 sm:pt-1">
                          <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-widest text-neutral-400 font-semibold block">
                            Description du projet
                          </span>
                          <p className="text-xs sm:text-sm text-neutral-700 font-normal leading-relaxed line-clamp-3 sm:line-clamp-none">
                            {expandedProject.description || expandedProject.summary}
                          </p>
                        </div>
                      </div>

                      {/* Bottom Group: Technologies & Actions */}
                      <div className="space-y-3 sm:space-y-5 pt-2 sm:pt-3 border-t border-neutral-100">
                        {/* Technologies Tags */}
                        {expandedProject.technologies && expandedProject.technologies.length > 0 && (
                          <div className="space-y-1.5 sm:space-y-2">
                            <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-widest text-neutral-400 font-semibold block">
                              Technologies
                            </span>
                            <div className="flex flex-wrap gap-1 sm:gap-1.5">
                              {expandedProject.technologies.map((tech, tIdx) => (
                                <span
                                  key={tIdx}
                                  className="px-2 sm:px-3 py-0.5 sm:py-1.5 rounded-full text-[10px] sm:text-[11px] font-mono font-medium bg-neutral-100 hover:bg-neutral-200/70 border border-neutral-200/90 text-neutral-800 transition-colors"
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Action CTA */}
                        <div>
                          {expandedProject.url ? (
                            <a
                              href={expandedProject.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="group w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 sm:py-3.5 rounded-full bg-[#EB4604] hover:bg-[#D43D00] text-white text-xs sm:text-sm font-semibold tracking-tight shadow-md shadow-[#EB4604]/25 hover:shadow-[#EB4604]/40 hover:scale-[1.01] active:scale-[0.98] transition-all duration-300 select-none cursor-pointer"
                            >
                              <span>Visiter le site</span>
                              <span className="w-5 h-5 rounded-full bg-white/20 group-hover:bg-white/30 flex items-center justify-center text-[11px] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                                ↗
                              </span>
                            </a>
                          ) : (
                            <Link
                              href={`/projects/${expandedProject.slug}`}
                              className="group w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 sm:py-3.5 rounded-full bg-[#EB4604] hover:bg-[#D43D00] text-white text-xs sm:text-sm font-semibold tracking-tight shadow-md shadow-[#EB4604]/25 hover:shadow-[#EB4604]/40 hover:scale-[1.01] active:scale-[0.98] transition-all duration-300 select-none cursor-pointer"
                            >
                              <span>Voir le projet</span>
                              <span className="w-5 h-5 rounded-full bg-white/20 group-hover:bg-white/30 flex items-center justify-center text-[11px] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                                ↗
                              </span>
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* ── RIGHT PANEL: Contrast Studio Canvas (16:9 100% visible preview) ── */}
                    <div className="order-1 md:order-2 md:col-span-7 rounded-[18px] sm:rounded-[28px] md:rounded-[32px] bg-[#0E0E11] text-white border border-white/10 p-3 sm:p-6 lg:p-7 flex flex-col justify-between space-y-2 sm:space-y-4 shadow-xl">

                      {/* Top Header of Right Card: Status & Gallery Controls & Close Button */}
                      <div className="flex items-center justify-between gap-2 sm:gap-3 text-xs font-mono">
                        <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
                          <svg
                            viewBox="0 0 24 24"
                            className="w-3.5 h-3.5 text-[#EB4604] shrink-0 drop-shadow-[0_0_6px_rgba(235,70,4,0.6)]"
                            fill="currentColor"
                          >
                            <path d="M12 0C12 0 12 10.5 24 12C24 12 12 13.5 12 24C12 24 12 13.5 0 12C0 12 12 10.5 12 0Z" />
                          </svg>
                          <span className="uppercase tracking-wider text-neutral-200 font-semibold text-[10px] sm:text-xs truncate">
                            Aperçu du projet
                          </span>
                          {gallery.length > 1 && (
                            <span className="text-neutral-500 text-[10px] sm:text-xs shrink-0">
                              ({activeGalleryIndex + 1}/{gallery.length})
                            </span>
                          )}
                        </div>

                        {/* Controls Group: Previous/Next Chevrons + Close Button */}
                        <div className="flex items-center gap-2 shrink-0">
                          {gallery.length > 1 && (
                            <div className="flex items-center gap-1">
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  setActiveGalleryIndex((prev) => (prev > 0 ? prev - 1 : gallery.length - 1))
                                }}
                                aria-label="Image précédente"
                                className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-white flex items-center justify-center text-xs transition-all active:scale-95 cursor-pointer touch-manipulation"
                              >
                                ‹
                              </button>
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  setActiveGalleryIndex((prev) => (prev < gallery.length - 1 ? prev + 1 : 0))
                                }}
                                aria-label="Image suivante"
                                className="w-7 h-7 rounded-full bg-white/10 hover:bg-[#EB4604] border border-white/15 hover:border-[#EB4604] text-white flex items-center justify-center text-xs transition-all active:scale-95 cursor-pointer touch-manipulation"
                              >
                                ›
                              </button>
                            </div>
                          )}

                          {/* Close Button — High Visibility, Touch-Friendly, Beautiful tactile pill */}
                          <button
                            type="button"
                            onClick={() => setExpandedProject(null)}
                            aria-label="Fermer le modal"
                            className="w-9 h-9 sm:w-8 sm:h-8 rounded-full bg-white/20 hover:bg-white text-white hover:text-black border border-white/30 shadow-md flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-90 cursor-pointer touch-manipulation"
                          >
                            <svg
                              className="w-4 h-4"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <line x1="18" y1="6" x2="6" y2="18" />
                              <line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                          </button>
                        </div>
                      </div>

                      {/* ── 16:9 VIEWPORT CONTAINER (100% Visible Preview) ── */}
                      <div
                        onClick={() => {
                          if (typeof window !== 'undefined' && window.innerWidth >= 768) {
                            setIsLightboxOpen(true)
                          }
                        }}
                        title="Aperçu du projet 16:9"
                        className="relative w-full aspect-[16/9] rounded-lg sm:rounded-2xl overflow-hidden bg-black/90 border border-white/10 shadow-[inset_0_2px_12px_rgba(0,0,0,0.8)] flex items-center justify-center group md:cursor-zoom-in cursor-default"
                      >
                        <Image
                          src={currentHeroImage}
                          alt={`${expandedProject.title} preview 16:9`}
                          fill
                          quality={95}
                          draggable={false}
                          className="object-contain object-center w-full h-full transition-transform duration-500 ease-out select-none md:group-hover:scale-[1.015]"
                          sizes="(max-width: 768px) 100vw, 650px"
                        />

                        {/* Subtle hover expand pill (Desktop only) */}
                        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-200 hidden md:flex items-center justify-center pointer-events-none">
                          <div className="px-3.5 py-1.5 rounded-full bg-black/75 border border-white/25 text-white text-xs font-mono font-medium flex items-center gap-1.5 shadow-xl backdrop-blur-md">
                            <svg
                              className="w-3.5 h-3.5"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2.2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <polyline points="15 3 21 3 21 9" />
                              <polyline points="9 21 3 21 3 15" />
                              <line x1="21" y1="3" x2="14" y2="10" />
                              <line x1="3" y1="21" x2="10" y2="14" />
                            </svg>
                            <span>Agrandir</span>
                          </div>
                        </div>
                      </div>

                      {/* Bottom Showcase Footer */}
                      <div className="space-y-2 sm:space-y-3 pt-0.5">
                        {/* Interactive Thumbnails if multiple images exist */}
                        {gallery.length > 1 && (
                          <div className="flex gap-1.5 sm:gap-2 overflow-x-auto pb-0.5 no-scrollbar">
                            {gallery.map((imgUrl, thumbIdx) => {
                              const isActive = activeGalleryIndex === thumbIdx
                              return (
                                <button
                                  key={thumbIdx}
                                  type="button"
                                  onClick={() => setActiveGalleryIndex(thumbIdx)}
                                  className={`relative w-14 sm:w-20 aspect-[16/9] rounded-md sm:rounded-lg overflow-hidden border shrink-0 transition-all duration-300 cursor-pointer touch-manipulation ${
                                    isActive
                                      ? 'border-[#EB4604] ring-2 ring-[#EB4604]/40 scale-[1.02]'
                                      : 'border-white/15 opacity-45 hover:opacity-100 hover:border-white/40'
                                  }`}
                                >
                                  <Image
                                    src={imgUrl}
                                    alt={`Thumbnail ${thumbIdx + 1}`}
                                    fill
                                    quality={70}
                                    draggable={false}
                                    className="object-cover"
                                    sizes="80px"
                                  />
                                </button>
                              )
                            })}
                          </div>
                        )}

                        {/* ── Bouton élégant pour voir l'image en grand (Desktop uniquement) ── */}
                        <div className="pt-0.5 hidden md:block">
                          <button
                            type="button"
                            onClick={() => setIsLightboxOpen(true)}
                            className="w-full inline-flex items-center justify-center gap-2.5 py-2.5 sm:py-3 px-5 rounded-full bg-white/[0.08] hover:bg-white text-neutral-200 hover:text-black border border-white/15 hover:border-white text-xs sm:text-sm font-semibold tracking-tight transition-all duration-300 group cursor-pointer active:scale-[0.98] shadow-sm hover:shadow-lg hover:shadow-white/10"
                          >
                            <svg
                              className="w-3.5 h-3.5 text-neutral-400 group-hover:text-black transition-colors"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2.2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <polyline points="15 3 21 3 21 9" />
                              <polyline points="9 21 3 21 3 15" />
                              <line x1="21" y1="3" x2="14" y2="10" />
                              <line x1="3" y1="21" x2="10" y2="14" />
                            </svg>
                            <span>Voir l'image en grand</span>
                            <span className="text-[10px] font-mono opacity-60 group-hover:opacity-100 uppercase tracking-wider ml-0.5">
                              HD
                            </span>
                          </button>
                        </div>
                      </div>

                    </div>
                  </div>
                </motion.div>

                {/* ── IMMERSIVE FULLSCREEN LIGHTBOX ── */}
                <AnimatePresence>
                  {isLightboxOpen && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeOut' }}
                      className="fixed inset-0 z-[10000] bg-black/95 backdrop-blur-2xl flex flex-col items-center justify-between p-3 sm:p-6 md:p-8 select-none overscroll-contain"
                      onClick={() => setIsLightboxOpen(false)}
                    >
                      {/* Lightbox Header Bar */}
                      <div
                        className="w-full max-w-6xl flex items-center justify-between z-10"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="flex items-center gap-3">
                          <span className="px-3.5 py-1 rounded-full text-xs font-mono font-semibold uppercase tracking-wider bg-white/10 text-white border border-white/20">
                            {expandedProject.title}
                          </span>
                          {gallery.length > 1 && (
                            <span className="text-xs font-mono text-neutral-400">
                              {activeGalleryIndex + 1} / {gallery.length}
                            </span>
                          )}
                        </div>

                        <button
                          type="button"
                          onClick={() => setIsLightboxOpen(false)}
                          aria-label="Fermer le plein écran"
                          className="w-10 h-10 rounded-full bg-white/10 hover:bg-white text-white hover:text-black border border-white/20 flex items-center justify-center transition-all duration-200 cursor-pointer shadow-xl active:scale-95"
                        >
                          <svg
                            className="w-4 h-4"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                          </svg>
                        </button>
                      </div>

                      {/* Lightbox Image Container */}
                      <div
                        className="relative w-full max-w-6xl flex-1 flex items-center justify-center my-2 sm:my-4"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <motion.div
                          key={activeGalleryIndex}
                          initial={{ opacity: 0, scale: 0.98 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.98 }}
                          transition={{ duration: 0.2 }}
                          className="relative w-full h-full max-h-[82vh] aspect-[16/9] flex items-center justify-center"
                        >
                          <Image
                            src={currentHeroImage}
                            alt={`${expandedProject.title} en grand`}
                            fill
                            quality={100}
                            priority
                            draggable={false}
                            className="object-contain object-center rounded-xl sm:rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.9)] select-none"
                            sizes="95vw"
                          />
                        </motion.div>

                        {/* Gallery Navigation Chevrons inside Lightbox */}
                        {gallery.length > 1 && (
                          <>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation()
                                setActiveGalleryIndex((prev) => (prev > 0 ? prev - 1 : gallery.length - 1))
                              }}
                              aria-label="Image précédente"
                              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/60 hover:bg-white text-white hover:text-black border border-white/20 flex items-center justify-center text-lg transition-all duration-200 shadow-2xl cursor-pointer active:scale-95"
                            >
                              ‹
                            </button>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation()
                                setActiveGalleryIndex((prev) => (prev < gallery.length - 1 ? prev + 1 : 0))
                              }}
                              aria-label="Image suivante"
                              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/60 hover:bg-white text-white hover:text-black border border-white/20 flex items-center justify-center text-lg transition-all duration-200 shadow-2xl cursor-pointer active:scale-95"
                            >
                              ›
                            </button>
                          </>
                        )}
                      </div>

                      {/* Lightbox Footer Caption */}
                      <div
                        className="w-full max-w-6xl flex items-center justify-center text-xs font-mono text-neutral-400 gap-2 text-center"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <span>Cliquer en dehors ou appuyer sur <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-neutral-200 border border-white/15">Échap</kbd> pour fermer</span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })()}
        </AnimatePresence>,
        document.body
      )}
    </>
  )
}
