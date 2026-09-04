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
  const sparkleRef = useRef<HTMLDivElement>(null)
  const tailRef = useRef<HTMLDivElement>(null)
  const logoRef = useRef<HTMLDivElement>(null)
  const trailRefs = useRef<(HTMLDivElement | null)[]>([])
  const [isComplete, setIsComplete] = useState(false)
  const [trailPositions, setTrailPositions] = useState<{ x: number; y: number }[]>([])

  // Calcul unique des coordonnées de départ et de tous les points de traînée
  useEffect(() => {
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

    // 2. Récupération robuste du Hero
    let heroContainer = document.getElementById('main-hero')
    
    const initAnimation = () => {
      heroContainer = document.getElementById('main-hero')
      
      if (heroContainer) {
        gsap.set(heroContainer, { 
          y: '100vh', 
          opacity: 1, 
          zIndex: 101,
        })
      }
      
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
      gsap.set(logoRef.current, { scale: 0.95, opacity: 0, filter: 'blur(10px)' })

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
      // ACTE 2 : DÉPLACEMENT VERS LE MILIEU + TRAÎNÉE D'ÉTINCELLES (0.15s -> 1.0s)
      // ---------------------------------------------------------
      tl.to(sparkleRef.current, {
        x: 0,
        y: 0,
        rotation: 0,
        duration: 0.85,
        ease: 'power2.inOut',
      }, 0.15)

      // Activation douce de la traînée lumineuse derrière l'icône
      tl.to(tailRef.current, {
        opacity: 0.9,
        duration: 0.2,
      }, 0.15)

      tl.to(tailRef.current, {
        opacity: 0,
        duration: 0.25,
      }, 0.85)

      // Allumage et dissipation synchronisés de chaque étincelle
      TRAIL_SPARK_CONFIGS.forEach((cfg, i) => {
        const el = trailRefs.current[i]
        if (!el) return

        const isCenterBurst = cfg.progress >= 0.99
        const sparkTime = isCenterBurst ? 1.0 : 0.15 + cfg.progress * 0.85

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
      // ACTE 3 : PULSATION COURTE AU CENTRE (1.0s -> 1.4s)
      // ---------------------------------------------------------
      tl.to(sparkleRef.current, {
        scale: 0.8,
        rotation: 45,
        duration: 0.4,
        ease: 'power2.inOut',
      }, 1.0)

      // ---------------------------------------------------------
      // ACTE 4 : L'EXPANSION MASSIVE (1.4s -> 2.2s)
      // ---------------------------------------------------------
      tl.to(sparkleRef.current, {
        scale: 400, 
        rotation: 90, 
        duration: 0.8,
        ease: 'power2.inOut',
      }, 1.4)

      // ---------------------------------------------------------
      // ACTE 5 : L'EMBLÈME SPARKLINE (2.0s -> 2.8s)
      // ---------------------------------------------------------
      tl.to(logoRef.current, {
        scale: 1,
        opacity: 1,
        filter: 'blur(0px)',
        duration: 0.8,
        ease: 'power3.out',
      }, 2.0)

      // ---------------------------------------------------------
      // ACTE 6 : L'ASCENSION DU HERO (3.0s -> 3.8s)
      // ---------------------------------------------------------
      if (heroContainer) {
        tl.to(heroContainer, {
          y: 0,
          duration: 0.8,
          ease: 'power3.inOut',
        }, 3.0)
        
        tl.set(containerRef.current, { autoAlpha: 0 })
        tl.set(heroContainer, { clearProps: 'transform,zIndex' })
      } else {
        tl.to(containerRef.current, {
          opacity: 0,
          duration: 0.8,
          ease: 'power3.inOut',
        }, 3.0)
      }
    }

    requestAnimationFrame(initAnimation)

    return () => {
      window.removeEventListener('wheel', preventScroll)
      window.removeEventListener('touchmove', preventScroll)
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

  return (
    <div
      ref={containerRef}
      className={`fixed inset-0 z-[100] bg-white flex items-center justify-center overflow-hidden touch-none pointer-events-none ${
        isComplete ? 'hidden' : ''
      }`}
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

      {/* 
        Le Logo SPARKLINE horizontal inversé (blanc sur fond noir).
      */}
      <div 
        ref={logoRef}
        className="relative z-20 flex flex-col items-center justify-center w-full px-4"
        style={{ transform: 'scale(0.95)', filter: 'blur(10px)', opacity: 0 }}
      >
        <div className="relative w-[300px] sm:w-[400px] md:w-[500px] flex items-center justify-center drop-shadow-[0_15px_40px_rgba(0,0,0,0.3)]">
          <Image
            src="/images/brand/Logo - horizontal/inversé.png"
            alt="SPARKLINE Official Logo"
            width={500}
            height={100}
            priority
            className="w-full h-auto object-contain"
          />
        </div>
      </div>
    </div>
  )
}
