'use client'

import React, { useEffect, useRef, useState, useCallback } from 'react'
import Image from 'next/image'
import { Tag } from '@/components/ui/Tag'
import { Navbar } from '@/components/layout/Navbar'
import { RevealOnScroll } from '@/components/motion/RevealOnScroll'
import { Button } from '@/components/ui/Button'
import { SparkTitle } from './SparkTitle'
import { HeroBadge3D } from './HeroBadge3D'
import { OctobreRoseHeroSequence } from './OctobreRoseHeroSequence'

const HERO_TITLE_LINES = ['Concevoir la', 'nouvelle ère', 'du numérique']

export function Hero() {
  const heroCardRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const heroBgRef = useRef<HTMLDivElement>(null)

  // Stamped state for the 3 metadata items: [STARTUP, FONDÉ EN 2024, AGENCE SPARKLINE]
  const [stampedMeta, setStampedMeta] = useState<[boolean, boolean, boolean]>([false, false, false])
  const [isBadgeIgnited, setIsBadgeIgnited] = useState<boolean>(false)

  // Octobre Rose sequence states
  const [isHeroCompleted, setIsHeroCompleted] = useState<boolean>(false)
  const [isOctobreDocked, setIsOctobreDocked] = useState<boolean>(false)
  const [isOctobreModalOpen, setIsOctobreModalOpen] = useState<boolean>(false)

  const handleHeroComplete = useCallback(() => {
    setIsHeroCompleted(true)
  }, [])

  const handleMetaStamp = useCallback((index: number) => {
    setStampedMeta((prev) => {
      if (prev[index]) return prev
      const next: [boolean, boolean, boolean] = [...prev]
      if (index >= 0 && index < 3) {
        next[index] = true
      }
      return next
    })
  }, [])

  const handleBadgeStamp = useCallback(() => {
    setIsBadgeIgnited(true)
  }, [])

  useEffect(() => {
    // Honor reduced motion
    if (typeof window === 'undefined') return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let rafId: number
    let ticking = false

    const onScroll = () => {
      if (ticking) return
      ticking = true

      rafId = requestAnimationFrame(() => {
        const y = window.scrollY
        if (heroBgRef.current) {
          if (y < 900 && y > 0) {
            heroBgRef.current.style.transform = `translate3d(0, ${y * 0.16}px, 0)`
          } else if (y === 0) {
            heroBgRef.current.style.transform = 'none'
          }
        }
        ticking = false
      })
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <section id="main-hero" className="relative w-full bg-white p-2 sm:p-3 md:p-3.5 lg:p-4 xl:p-5">
      {/* Hero Inset Card (Sleek, Framed Proportions on Laptops and Desktops) */}
      <div
        ref={heroCardRef}
        className="relative rounded-2xl md:rounded-[20px] bg-[#070709] text-white overflow-hidden p-5 sm:p-6 lg:p-8 xl:p-10 min-h-[88svh] sm:min-h-[82svh] lg:min-h-[calc(100vh-32px)] xl:min-h-[calc(100vh-40px)] xl:max-h-[860px] flex flex-col justify-between shadow-2xl"
      >
        {/* HiDPI Razor-Sharp Canvas for Full-Hero Spark Flight, Stamping & Explosion */}
        <canvas
          ref={canvasRef}
          className="pointer-events-none absolute inset-0 w-full h-full z-30 overflow-visible"
        />

        {/* Background Team Image — Responsive Placement with 3D Depth Parallax */}
        <div
          ref={heroBgRef}
          className="hero-bg-container absolute inset-0 pointer-events-none select-none overflow-hidden"
          style={{ willChange: 'transform', transform: 'translateZ(0)' }}
        >
          {/* Mobile Image — Vertical Portrait Composition with Glowing Cliff Path */}
          <div className="absolute inset-0 block md:hidden overflow-hidden">
            <div className="relative w-full h-full">
              <Image
                src="/images/heroes/hero-sunset-lake-mobile.webp"
                alt="SPARKLINE Hero Background Mobile"
                fill
                priority
                className="object-cover object-[62%_center]"
              />
            </div>
            {/* Mobile Multi-Stop Scrim Gradient: harmonious atmospheric balance */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  'linear-gradient(180deg, rgba(7,7,9,0.68) 0%, rgba(7,7,9,0.38) 22%, rgba(7,7,9,0.55) 48%, rgba(7,7,9,0.84) 78%, rgba(7,7,9,0.96) 100%)',
              }}
            />
            {/* Soft Radial Backing for Mobile Title */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  'radial-gradient(ellipse 95% 65% at 50% 46%, rgba(7,7,9,0.45) 0%, transparent 75%)',
              }}
            />
          </div>

          {/* Desktop Image */}
          <div className="absolute inset-0 hidden md:block">
            <Image
              src="/images/heroes/hero-sunset-lake-desktop.webp"
              alt="SPARKLINE Hero Background Desktop"
              fill
              priority
              className="object-cover object-center"
            />
            {/* Desktop Left-to-Right Scrim: softened to let more warmth and landscape shine through */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  'linear-gradient(90deg, rgba(7,7,9,0.72) 0%, rgba(7,7,9,0.56) 28%, rgba(7,7,9,0.3) 48%, rgba(7,7,9,0.06) 64%, rgba(7,7,9,0) 78%)',
              }}
            />
            {/* Desktop Top Vignette: lightened to preserve sunset sky luminosity */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  'linear-gradient(180deg, rgba(7,7,9,0.58) 0%, rgba(7,7,9,0.2) 14%, transparent 28%)',
              }}
            />
            {/* Desktop Bottom Vignette: anchors bottom bar while remaining airy */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  'linear-gradient(0deg, rgba(7,7,9,0.78) 0%, rgba(7,7,9,0.45) 15%, rgba(7,7,9,0.12) 30%, transparent 45%)',
              }}
            />
          </div>
        </div>

        {/* Top Navbar with Official Logo & Docked Octobre Rose Ribbon */}
        <Navbar
          octobreRibbonDocked={isOctobreDocked}
          onOctobreRibbonClick={() => setIsOctobreModalOpen(true)}
        />

        {/* Octobre Rose Cinematic Center Showcase & Flight to Logo */}
        <OctobreRoseHeroSequence
          isHeroCompleted={isHeroCompleted}
          onDockComplete={() => setIsOctobreDocked(true)}
          isDocked={isOctobreDocked}
          isModalOpen={isOctobreModalOpen}
          setIsModalOpen={setIsOctobreModalOpen}
        />

        {/* Main Hero Headline Area with Real Spark Writing Effect */}
        <div className="relative z-10 my-auto pt-2 pb-2 md:pt-0 max-w-3xl lg:max-w-4xl xl:max-w-6xl py-1 sm:py-2.5 lg:py-2 xl:py-4 space-y-2.5 sm:space-y-3 lg:space-y-2.5 xl:space-y-4 flex flex-col items-center text-center lg:items-start lg:text-left">
          <RevealOnScroll delay={0.1} className="hero-badge block">
            <HeroBadge3D isIgnited={isBadgeIgnited} />
          </RevealOnScroll>

          {/* Spark Writing Title on Strictly 3 Lines with Full-Hero Choreography */}
          <SparkTitle
            lines={HERO_TITLE_LINES}
            heroCardRef={heroCardRef}
            canvasRef={canvasRef}
            onMetaStamp={handleMetaStamp}
            onBadgeStamp={handleBadgeStamp}
            onAnimationComplete={handleHeroComplete}
          />

          <RevealOnScroll delay={0.3} className="hero-subtext">
            <p className="text-[13px] sm:text-sm lg:text-[13px] xl:text-base text-neutral-100 max-w-sm sm:max-w-md xl:max-w-lg font-normal leading-relaxed drop-shadow-[0_2px_4px_rgba(0,0,0,0.85)]">
              Accompagner les marques dans leur lancement, leur croissance et leur leadership grâce à un design d'exception.
            </p>
          </RevealOnScroll>
        </div>

        {/* Bottom Split Row: Left Subheading & Metadata | Right Action Buttons */}
        <div className="hero-bottom-bar relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-4 lg:gap-6 items-end pt-3 sm:pt-4 lg:pt-4 xl:pt-5.5 border-t border-white/[0.2]">
          {/* Left Column: Subheading & Metadata */}
          <div className="lg:col-span-7 flex flex-col items-center text-center lg:items-start lg:text-left space-y-2 sm:space-y-2.5">
            <RevealOnScroll delay={0.4}>
              <h2 className="text-xs sm:text-sm lg:text-sm xl:text-lg font-medium text-white max-w-md xl:max-w-lg leading-snug drop-shadow-[0_2px_4px_rgba(0,0,0,0.85)]">
                Branding, design et conception d'applications mobiles & web pour startups et leaders
              </h2>
            </RevealOnScroll>

            {/* Metadata Row: Clean text, NO pill buttons, NO borders, NO clipping containers */}
            <div className="flex flex-nowrap items-center justify-center lg:justify-start gap-2.5 sm:gap-4 xl:gap-6 text-[8.5px] sm:text-[10px] xl:text-xs font-mono uppercase tracking-wider xl:tracking-widest pt-1 overflow-visible select-none">
              {/* 1. STARTUP */}
              <div
                data-spark-meta="0"
                className={`relative inline-flex items-center gap-1 sm:gap-1.5 transition-colors duration-300 font-medium ${
                  stampedMeta[0]
                    ? 'animate-meta-bounce text-white drop-shadow-[0_1px_4px_rgba(255,255,255,0.4)]'
                    : 'text-neutral-400 drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]'
                }`}
              >
                <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 inline-flex items-center justify-center shrink-0">
                  <svg
                    viewBox="0 0 24 24"
                    className={`w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#FFB901] shrink-0 transition-transform duration-300 ${
                      stampedMeta[0]
                        ? 'opacity-100 scale-100 animate-spark-stamp-pop drop-shadow-[0_0_8px_#EB4604]'
                        : 'opacity-0 scale-0 pointer-events-none'
                    }`}
                    fill="currentColor"
                  >
                    <path d="M12 0C12 0 12 10.5 24 12C24 12 12 13.5 12 24C12 24 12 13.5 0 12C0 12 12 10.5 12 0Z" />
                  </svg>
                </span>
                <span>STARTUP</span>
              </div>

              {/* 2. FONDÉ EN 2024 */}
              <div
                data-spark-meta="1"
                className={`relative inline-flex items-center gap-1 sm:gap-1.5 transition-colors duration-300 font-medium ${
                  stampedMeta[1]
                    ? 'animate-meta-bounce text-white drop-shadow-[0_1px_4px_rgba(255,255,255,0.4)]'
                    : 'text-neutral-400 drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]'
                }`}
              >
                <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 inline-flex items-center justify-center shrink-0">
                  <svg
                    viewBox="0 0 24 24"
                    className={`w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#FFB901] shrink-0 transition-transform duration-300 ${
                      stampedMeta[1]
                        ? 'opacity-100 scale-100 animate-spark-stamp-pop drop-shadow-[0_0_8px_#EB4604]'
                        : 'opacity-0 scale-0 pointer-events-none'
                    }`}
                    fill="currentColor"
                  >
                    <path d="M12 0C12 0 12 10.5 24 12C24 12 12 13.5 12 24C12 24 12 13.5 0 12C0 12 12 10.5 12 0Z" />
                  </svg>
                </span>
                <span>FONDÉ EN 2024</span>
              </div>

              {/* 3. AGENCE SPARKLINE */}
              <div
                data-spark-meta="2"
                className={`relative inline-flex items-center gap-1 sm:gap-1.5 transition-colors duration-300 font-medium ${
                  stampedMeta[2]
                    ? 'animate-meta-bounce text-white drop-shadow-[0_1px_4px_rgba(255,255,255,0.4)]'
                    : 'text-neutral-400 drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]'
                }`}
              >
                <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 inline-flex items-center justify-center shrink-0">
                  <svg
                    viewBox="0 0 24 24"
                    className={`w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#FFB901] shrink-0 transition-transform duration-300 ${
                      stampedMeta[2]
                        ? 'opacity-100 scale-100 animate-spark-stamp-pop drop-shadow-[0_0_8px_#EB4604]'
                        : 'opacity-0 scale-0 pointer-events-none'
                    }`}
                    fill="currentColor"
                  >
                    <path d="M12 0C12 0 12 10.5 24 12C24 12 12 13.5 12 24C12 24 12 13.5 0 12C0 12 12 10.5 12 0Z" />
                  </svg>
                </span>
                <span>AGENCE SPARKLINE</span>
              </div>
            </div>
          </div>

          {/* Right Column: Dual Action Buttons */}
          <div className="lg:col-span-5 flex items-center justify-center lg:justify-end overflow-visible">
            <RevealOnScroll delay={0.5} className="overflow-visible">
              <div className="flex flex-nowrap items-center justify-center lg:justify-end gap-2 sm:gap-3 w-full sm:w-auto p-1.5 -m-1.5 overflow-visible">
                <Button
                  href="/projects"
                  variant="primary"
                  className="px-3.5 sm:px-5.5 xl:px-6 py-2 sm:py-2.5 xl:py-3 text-[11.5px] sm:text-[13px] shrink-0 whitespace-nowrap"
                >
                  Voir les projets
                </Button>

                <Button
                  href="/contact"
                  variant="secondary"
                  className="px-3.5 sm:px-5.5 xl:px-6 py-2 sm:py-2.5 xl:py-3 text-[11.5px] sm:text-[13px] shrink-0 whitespace-nowrap"
                >
                  Nous contacter
                </Button>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </div>
    </section>
  )
}
