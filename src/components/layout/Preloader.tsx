'use client'

import React, { useRef, useState, useEffect } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

interface TrailSparkConfig {
  progress: number
  offsetX: number
  offsetY: number
  size: number
  isStar: boolean
  color: 'gold' | 'orange' | 'white'
  driftX: number
  driftY: number
}

const TRAIL_SPARK_CONFIGS: TrailSparkConfig[] = [
  // ── Étape 1 : Départ et début de course en haut à gauche (progression 0.08 -> 0.30) ──
  { progress: 0.08, offsetX: -8, offsetY: 6, size: 7, isStar: true, color: 'gold', driftX: -6, driftY: 10 },
  { progress: 0.12, offsetX: 7, offsetY: -7, size: 5, isStar: false, color: 'orange', driftX: 4, driftY: 8 },
  { progress: 0.16, offsetX: -12, offsetY: 2, size: 6, isStar: true, color: 'white', driftX: -8, driftY: 6 },
  { progress: 0.20, offsetX: 5, offsetY: 9, size: 4, isStar: false, color: 'gold', driftX: 3, driftY: 12 },
  { progress: 0.25, offsetX: -6, offsetY: -10, size: 7, isStar: true, color: 'orange', driftX: -5, driftY: 8 },
  { progress: 0.30, offsetX: 10, offsetY: 4, size: 6, isStar: true, color: 'gold', driftX: 8, driftY: 10 },

  // ── Étape 2 : Vitesse de croisière en diagonale (progression 0.35 -> 0.65) ──
  { progress: 0.36, offsetX: -14, offsetY: 8, size: 8, isStar: true, color: 'white', driftX: -10, driftY: 10 },
  { progress: 0.40, offsetX: 8, offsetY: -8, size: 5, isStar: false, color: 'orange', driftX: 6, driftY: 8 },
  { progress: 0.45, offsetX: -5, offsetY: 12, size: 7, isStar: true, color: 'gold', driftX: -4, driftY: 14 },
  { progress: 0.50, offsetX: 12, offsetY: 3, size: 4, isStar: false, color: 'orange', driftX: 8, driftY: 8 },
  { progress: 0.55, offsetX: -8, offsetY: -9, size: 8, isStar: true, color: 'white', driftX: -6, driftY: 8 },
  { progress: 0.60, offsetX: 9, offsetY: 8, size: 6, isStar: true, color: 'gold', driftX: 6, driftY: 12 },
  { progress: 0.65, offsetX: -11, offsetY: 4, size: 5, isStar: false, color: 'orange', driftX: -8, driftY: 6 },

  // ── Étape 3 : Rapprochement du centre (progression 0.70 -> 0.95) ──
  { progress: 0.72, offsetX: 6, offsetY: -10, size: 7, isStar: true, color: 'gold', driftX: 4, driftY: 8 },
  { progress: 0.78, offsetX: -9, offsetY: 9, size: 5, isStar: false, color: 'white', driftX: -6, driftY: 12 },
  { progress: 0.84, offsetX: 11, offsetY: -4, size: 8, isStar: true, color: 'gold', driftX: 8, driftY: 6 },
  { progress: 0.89, offsetX: -5, offsetY: 8, size: 6, isStar: true, color: 'orange', driftX: -4, driftY: 10 },
  { progress: 0.94, offsetX: 7, offsetY: 5, size: 7, isStar: true, color: 'white', driftX: 6, driftY: 8 },

  // ── Étape 4 : Gerbe d'étincelles festive à l'impact au centre (progression 1.0) ──
  { progress: 1.0, offsetX: -20, offsetY: -18, size: 7, isStar: true, color: 'gold', driftX: -24, driftY: -20 },
  { progress: 1.0, offsetX: 18, offsetY: -18, size: 6, isStar: true, color: 'white', driftX: 22, driftY: -22 },
  { progress: 1.0, offsetX: 22, offsetY: 16, size: 7, isStar: true, color: 'orange', driftX: 26, driftY: 18 },
  { progress: 1.0, offsetX: -16, offsetY: 20, size: 6, isStar: true, color: 'gold', driftX: -20, driftY: 24 },
  { progress: 1.0, offsetX: 0, offsetY: -24, size: 5, isStar: false, color: 'white', driftX: 0, driftY: -28 },
  { progress: 1.0, offsetX: 24, offsetY: 0, size: 5, isStar: false, color: 'orange', driftX: 30, driftY: 0 },
  { progress: 1.0, offsetX: 0, offsetY: 24, size: 5, isStar: false, color: 'gold', driftX: 0, driftY: 28 },
  { progress: 1.0, offsetX: -24, offsetY: 0, size: 5, isStar: false, color: 'white', driftX: -30, driftY: 0 },
]

export function Preloader() {
  const containerRef = useRef<HTMLDivElement>(null)
  const backdropRef = useRef<HTMLDivElement>(null)
  const sparkleRef = useRef<HTMLDivElement>(null)
  const tailRef = useRef<HTMLDivElement>(null)
  const logoContainerRef = useRef<HTMLDivElement>(null)
  const logoInnerRef = useRef<HTMLDivElement>(null)
  const trailRefs = useRef<(HTMLDivElement | null)[]>([])
  const [isComplete, setIsComplete] = useState(false)
  const [trailPositions, setTrailPositions] = useState<{ x: number; y: number }[]>([])

  // Calcul unique des coordonnées de départ et de tous les points de traînée
  useEffect(() => {
    if (typeof window !== 'undefined' && (window as unknown as { __SPARKLINE_LOADED__?: boolean }).__SPARKLINE_LOADED__) {
      setIsComplete(true)
      const navLogo = document.getElementById('navbar-logo')
      if (navLogo) gsap.set(navLogo, { opacity: 1 })
      return
    }

    const startX = -Math.min(window.innerWidth * 0.42, 520)
    const startY = -Math.min(window.innerHeight * 0.38, 380)

    const positions = TRAIL_SPARK_CONFIGS.map((cfg) => {
      if (cfg.progress >= 0.99) {
        // Étincelles de dispersion centrées autour du point d'impact
        return { x: cfg.offsetX, y: cfg.offsetY }
      }
      return {
        x: startX * (1 - cfg.progress) + cfg.offsetX,
        y: startY * (1 - cfg.progress) + cfg.offsetY,
      }
    })
    setTrailPositions(positions)
  }, [])

  useGSAP(() => {
    if (typeof window !== 'undefined' && (window as unknown as { __SPARKLINE_LOADED__?: boolean }).__SPARKLINE_LOADED__) {
      setIsComplete(true)
      const navLogo = document.getElementById('navbar-logo')
      if (navLogo) gsap.set(navLogo, { opacity: 1 })
      return
    }

    if (typeof window !== 'undefined' && 'scrollRestoration' in history) {
      history.scrollRestoration = 'manual'
    }

    // 1. Verrouillage non intrusif du scroll
    const preventScroll = (e: Event) => {
      e.preventDefault()
    }
    window.addEventListener('wheel', preventScroll, { passive: false })
    window.addEventListener('touchmove', preventScroll, { passive: false })
    window.scrollTo(0, 0)

    const getLenis = () => (window as unknown as { __lenis?: { stop: () => void; start: () => void } }).__lenis
    getLenis()?.stop()

    // 2. Initialisation et préparation du Hero et de la Navbar
    let heroContainer = document.getElementById('main-hero')
    
    const initAnimation = () => {
      heroContainer = document.getElementById('main-hero')
      const navLogo = document.getElementById('navbar-logo')
      const navLinks = document.querySelector('.navbar-navlinks')
      const navActions = document.querySelector('.navbar-actions')
      const heroBadge = document.querySelector('.hero-badge')
      const heroSubtext = document.querySelector('.hero-subtext')
      const heroBottomBar = document.querySelector('.hero-bottom-bar')
      const heroBgContainer = document.querySelector('.hero-bg-container')

      // Le Hero reste à sa place naturelle (y: 0) — pas de saut 100vh
      if (heroContainer) {
        gsap.set(heroContainer, { y: 0, opacity: 1 })
      }

      // Préparation discrète des éléments pour l'apparition stylée
      if (navLogo) gsap.set(navLogo, { opacity: 0 })
      if (navLinks) gsap.set(navLinks, { opacity: 0, y: -8 })
      if (navActions) gsap.set(navActions, { opacity: 0, scale: 0.94 })
      if (heroBadge) gsap.set(heroBadge, { opacity: 0, y: -12 })
      if (heroSubtext) gsap.set(heroSubtext, { opacity: 0, y: 12 })
      if (heroBottomBar) gsap.set(heroBottomBar, { opacity: 0, y: 15 })
      if (heroBgContainer) gsap.set(heroBgContainer, { scale: 1.05 })
      
      const startX = -Math.min(window.innerWidth * 0.42, 520)
      const startY = -Math.min(window.innerHeight * 0.38, 380)

      // Position de départ en haut à gauche
      gsap.set(sparkleRef.current, {
        x: startX,
        y: startY,
        scale: 0,
        opacity: 0,
        rotation: -90,
      })
      gsap.set(tailRef.current, { opacity: 0 })
      if (logoInnerRef.current) {
        gsap.set(logoInnerRef.current, { x: 0, y: 0, scale: 0.95, opacity: 0, filter: 'blur(10px)' })
      }

      // Initialiser chaque petite étincelle de la traînée
      trailRefs.current.forEach((el) => {
        if (el) gsap.set(el, { scale: 0, opacity: 0 })
      })

      const tl = gsap.timeline({
        onComplete: () => {
          setIsComplete(true)
          window.removeEventListener('wheel', preventScroll)
          window.removeEventListener('touchmove', preventScroll)
          getLenis()?.start()

          // Restauration propre des styles pour conserver les interactions et hover
          if (navLogo) gsap.set(navLogo, { opacity: 1 })
          if (navLinks) gsap.set(navLinks, { clearProps: 'all' })
          if (navActions) gsap.set(navActions, { clearProps: 'all' })
          if (heroBadge) gsap.set(heroBadge, { clearProps: 'all' })
          if (heroSubtext) gsap.set(heroSubtext, { clearProps: 'all' })
          if (heroBottomBar) gsap.set(heroBottomBar, { clearProps: 'all' })
          if (heroBgContainer) gsap.set(heroBgContainer, { clearProps: 'transform' })
          if (heroContainer) gsap.set(heroContainer, { clearProps: 'all' })

          if (typeof window !== 'undefined') {
            ;(window as unknown as { __SPARKLINE_LOADED__?: boolean }).__SPARKLINE_LOADED__ = true
            window.dispatchEvent(new CustomEvent('sparkline:loader-complete'))
          }
        }
      })

      // ---------------------------------------------------------
      // ACTE 1 : ÉMERGENCE EN HAUT À GAUCHE (0.05s -> 0.25s)
      // ---------------------------------------------------------
      tl.to(sparkleRef.current, {
        scale: 1,
        opacity: 1,
        duration: 0.22,
        ease: 'back.out(2)',
      }, 0.05)

      // ---------------------------------------------------------
      // ACTE 2 : DÉPLACEMENT VERS LE MILIEU + TRAÎNÉE D'ÉTINCELLES (0.15s -> 0.95s)
      // ---------------------------------------------------------
      tl.to(sparkleRef.current, {
        x: 0,
        y: 0,
        rotation: 0,
        duration: 0.80,
        ease: 'power2.inOut',
      }, 0.15)

      tl.to(tailRef.current, {
        opacity: 0.9,
        duration: 0.2,
      }, 0.15)

      tl.to(tailRef.current, {
        opacity: 0,
        duration: 0.25,
      }, 0.80)

      // Allumage et dissipation synchronisés de chaque étincelle
      TRAIL_SPARK_CONFIGS.forEach((cfg, i) => {
        const el = trailRefs.current[i]
        if (!el) return

        const isCenterBurst = cfg.progress >= 0.99
        const sparkTime = isCenterBurst ? 0.95 : 0.15 + cfg.progress * 0.80

        tl.fromTo(el,
          { scale: 0, opacity: 0, rotation: 0 },
          { 
            scale: isCenterBurst ? 1.2 : 1, 
            opacity: 1, 
            duration: isCenterBurst ? 0.16 : 0.12, 
            ease: 'power2.out' 
          },
          sparkTime
        )
        tl.to(el,
          { 
            scale: 0.1, 
            opacity: 0, 
            x: `+=${cfg.driftX}`, 
            y: `+=${cfg.driftY}`, 
            rotation: 55, 
            duration: isCenterBurst ? 0.45 : 0.35, 
            ease: 'power2.out' 
          },
          sparkTime + (isCenterBurst ? 0.14 : 0.09)
        )
      })

      // ---------------------------------------------------------
      // ACTE 3 : PULSATION COURTE AU CENTRE (0.95s -> 1.30s)
      // ---------------------------------------------------------
      tl.to(sparkleRef.current, {
        scale: 0.8,
        rotation: 45,
        duration: 0.35,
        ease: 'power2.inOut',
      }, 0.95)

      // ---------------------------------------------------------
      // ACTE 4 : L'EXPANSION MASSIVE (1.30s -> 2.00s)
      // ---------------------------------------------------------
      tl.to(sparkleRef.current, {
        scale: 400, 
        rotation: 90, 
        duration: 0.70,
        ease: 'power2.inOut',
      }, 1.30)

      // Coloration du fond en noir pour un fondu parfait sans flash blanc
      tl.set(backdropRef.current, { backgroundColor: '#070709' }, 1.80)

      // ---------------------------------------------------------
      // ACTE 5 : L'EMBLÈME SPARKLINE AU CENTRE (1.90s -> 2.60s)
      // ---------------------------------------------------------
      tl.to(logoInnerRef.current, {
        scale: 1,
        opacity: 1,
        filter: 'blur(0px)',
        duration: 0.70,
        ease: 'power3.out',
      }, 1.90)

      // ---------------------------------------------------------
      // ACTE 6 : VOL DU LOGO VERS LA NAVBAR SANS INTERRUPTION NI DISPARITION (2.75s -> 3.80s)
      // Le logo glisse dans un mouvement direct, fluide et continu
      // ---------------------------------------------------------
      tl.to(logoInnerRef.current, {
        x: () => {
          const target = document.querySelector('#navbar-logo img') || document.getElementById('navbar-logo')
          const flyer = logoInnerRef.current
          if (!target || !flyer) return 0
          const targetRect = target.getBoundingClientRect()
          return (targetRect.left + targetRect.width / 2) - (window.innerWidth / 2)
        },
        y: () => {
          const target = document.querySelector('#navbar-logo img') || document.getElementById('navbar-logo')
          const flyer = logoInnerRef.current
          if (!target || !flyer) return 0
          const targetRect = target.getBoundingClientRect()
          return (targetRect.top + targetRect.height / 2) - (window.innerHeight / 2)
        },
        scale: () => {
          const target = document.querySelector('#navbar-logo img') || document.getElementById('navbar-logo')
          const flyer = logoInnerRef.current
          if (!target || !flyer) return 0.35
          const targetRect = target.getBoundingClientRect()
          const flyerWidth = flyer.offsetWidth || 400
          return targetRect.width / flyerWidth
        },
        duration: 1.05,
        ease: 'power3.inOut',
      }, 2.75)

      // Fondu doux du fond SEULEMENT (le logo reste à 100% d'opacité en vol sans disparaître)
      tl.to(backdropRef.current, {
        opacity: 0,
        duration: 0.85,
        ease: 'power2.inOut',
      }, 2.85)

      tl.to(sparkleRef.current, {
        opacity: 0,
        duration: 0.85,
        ease: 'power2.inOut',
      }, 2.85)

      // Dézoom subtil de l'image de fond du Hero (effet de profondeur)
      if (heroBgContainer) {
        tl.to(heroBgContainer, {
          scale: 1,
          duration: 1.1,
          ease: 'power2.out',
        }, 2.85)
      }

      // Arrivée en cascade des liens et actions de la Navbar
      if (navLinks) {
        tl.to(navLinks, {
          opacity: 1,
          y: 0,
          duration: 0.55,
          ease: 'power2.out',
        }, 3.35)
      }

      if (navActions) {
        tl.to(navActions, {
          opacity: 1,
          scale: 1,
          duration: 0.55,
          ease: 'back.out(1.4)',
        }, 3.40)
      }

      // Révélation des composants du Hero
      if (heroBadge) {
        tl.to(heroBadge, {
          opacity: 1,
          y: 0,
          duration: 0.55,
          ease: 'power2.out',
        }, 3.45)
      }

      if (heroSubtext) {
        tl.to(heroSubtext, {
          opacity: 1,
          y: 0,
          duration: 0.55,
          ease: 'power2.out',
        }, 3.50)
      }

      if (heroBottomBar) {
        tl.to(heroBottomBar, {
          opacity: 1,
          y: 0,
          duration: 0.55,
          ease: 'power2.out',
        }, 3.55)
      }

      // À l'atterrissage exact (3.80s) : passage de relais invisible et sans disparition
      tl.set(navLogo, { opacity: 1 }, 3.80)
      tl.to(logoInnerRef.current, {
        opacity: 0,
        duration: 0.08,
        ease: 'power1.out',
      }, 3.80)
    }

    requestAnimationFrame(initAnimation)

    return () => {
      window.removeEventListener('wheel', preventScroll)
      window.removeEventListener('touchmove', preventScroll)
      getLenis()?.start()
      const navLogo = document.getElementById('navbar-logo')
      if (navLogo) {
        navLogo.style.opacity = '1'
      }
    }

  }, { scope: containerRef })

  const getSparkColorClasses = (color: 'gold' | 'orange' | 'white') => {
    switch (color) {
      case 'gold':
        return {
          textColor: 'text-[#FFB901]',
          dropShadow: 'drop-shadow-[0_0_8px_rgba(255,185,1,0.9)]',
          bgColor: 'bg-[#FFB901]',
          boxShadow: '0 0 10px #FFB901, 0 0 4px #FF8A00',
        }
      case 'orange':
        return {
          textColor: 'text-[#EB4604]',
          dropShadow: 'drop-shadow-[0_0_8px_rgba(235,70,4,0.9)]',
          bgColor: 'bg-[#EB4604]',
          boxShadow: '0 0 10px #EB4604, 0 0 4px #FFB901',
        }
      case 'white':
        return {
          textColor: 'text-white',
          dropShadow: 'drop-shadow-[0_0_8px_rgba(255,255,255,0.95)]',
          bgColor: 'bg-white',
          boxShadow: '0 0 10px #FFFFFF, 0 0 5px #FFB901',
        }
    }
  }

  if (isComplete) return null

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] pointer-events-none touch-none"
    >
      {/* ── 1. Fond sombre et étincelles (qui s'efface pour révéler le Hero) ── */}
      <div
        ref={backdropRef}
        className="absolute inset-0 bg-white flex items-center justify-center overflow-hidden z-10"
      >
        {/* Traînée d'étincelles subtiles disposées le long de la trajectoire et à l'impact */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          {trailPositions.map((pos, i) => {
            const cfg = TRAIL_SPARK_CONFIGS[i]
            const colors = getSparkColorClasses(cfg.color)

            return (
              <div
                key={i}
                ref={(el) => { trailRefs.current[i] = el }}
                className="absolute pointer-events-none will-change-transform"
                style={{
                  transform: `translate(${pos.x}px, ${pos.y}px) scale(0)`,
                  opacity: 0,
                }}
              >
                {cfg.isStar ? (
                  <svg
                    viewBox="0 0 24 24"
                    className={`${colors.textColor} ${colors.dropShadow}`}
                    style={{ width: `${cfg.size * 2.2}px`, height: `${cfg.size * 2.2}px` }}
                    fill="currentColor"
                  >
                    <path d="M12 0C12 0 12 10.5 24 12C24 12 12 13.5 12 24C12 24 12 13.5 0 12C0 12 12 10.5 12 0Z" />
                  </svg>
                ) : (
                  <div
                    className={`rounded-full ${colors.bgColor}`}
                    style={{
                      width: `${cfg.size}px`,
                      height: `${cfg.size}px`,
                      boxShadow: colors.boxShadow,
                    }}
                  />
                )}
              </div>
            )
          })}
        </div>

        {/* 
          L'icône Sparkle 4 branches.
          Couleur fixée à #070709 (Noir). En grandissant, elle assombrit toute la page.
        */}
        <div 
          ref={sparkleRef}
          className="absolute z-10 flex items-center justify-center text-[#070709] will-change-transform"
          style={{ transform: 'scale(0)' }}
        >
          {/* Traînée lumineuse subtile dans le sillage du spark */}
          <div 
            ref={tailRef}
            className="absolute -top-4 -left-4 w-14 h-14 pointer-events-none rounded-full blur-[4px]"
            style={{
              background: 'radial-gradient(circle at bottom right, rgba(235,70,4,0.85) 0%, rgba(255,185,1,0.5) 40%, rgba(255,255,255,0.3) 65%, transparent 80%)',
            }}
          />

          <svg 
            viewBox="0 0 24 24" 
            className="w-12 h-12 sm:w-16 sm:h-16 relative z-10 drop-shadow-[0_0_10px_rgba(235,70,4,0.6)]"
            fill="currentColor"
          >
            <path d="M12 0C12 0 12 10.5 24 12C24 12 12 13.5 12 24C12 24 12 13.5 0 12C0 12 12 10.5 12 0Z" />
          </svg>
        </div>
      </div>

      {/* ── 2. Le Logo SPARKLINE (Z-INDEX 20 : AU-DESSUS DU FOND, NE DISPARAÎT JAMAIS PENDANT LE VOL) ── */}
      <div 
        ref={logoContainerRef}
        className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none"
      >
        <div 
          ref={logoInnerRef}
          className="relative w-[280px] sm:w-[380px] md:w-[460px] flex items-center justify-center drop-shadow-[0_15px_40px_rgba(0,0,0,0.5)] will-change-transform select-none"
          style={{ transform: 'scale(0.95)', filter: 'blur(10px)', opacity: 0 }}
        >
          <Image
            src="/images/brand/sparkline-logo-white.svg"
            alt="SPARKLINE Official Logo"
            width={460}
            height={93}
            priority
            className="w-full h-auto object-contain"
            style={{ aspectRatio: '1983 / 400' }}
          />
        </div>
      </div>
    </div>
  )
}
