'use client'

import React, { useRef, useState } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

export function Preloader() {
  const containerRef = useRef<HTMLDivElement>(null)
  const sparkleRef = useRef<HTMLDivElement>(null)
  const logoRef = useRef<HTMLDivElement>(null)
  const [isComplete, setIsComplete] = useState(false)

  useGSAP(() => {
    document.body.style.overflow = 'hidden'

    const heroContainer = document.getElementById('main-hero')
    
    if (heroContainer) {
      // Préparation du Hero : caché en dessous de l'écran, prêt à remonter
      gsap.set(heroContainer, { 
        y: '100vh', 
        opacity: 1, // Visible car il va pousser l'écran
        scale: 1,
        transformOrigin: 'center center',
        zIndex: 101,
        position: 'relative'
      })
    }
    
    gsap.set(sparkleRef.current, { scale: 0, opacity: 0, rotation: -90 })
    gsap.set(logoRef.current, { scale: 0.95, opacity: 0, filter: 'blur(10px)' })

    const tl = gsap.timeline({
      onComplete: () => {
        setIsComplete(true)
        document.body.style.overflow = ''
        if (typeof window !== 'undefined') {
          ;(window as unknown as { __SPARKLINE_LOADED__?: boolean }).__SPARKLINE_LOADED__ = true
          window.dispatchEvent(new CustomEvent('sparkline:loader-complete'))
        }
      }
    })

    // ---------------------------------------------------------
    // ACTE 1 : L'ÉVEIL DU SPARKLE (0s -> 0.8s)
    // ---------------------------------------------------------
    tl.to(sparkleRef.current, {
      scale: 1,
      opacity: 1,
      rotation: 0,
      duration: 0.6,
      ease: 'power3.out'
    }, 0.1)

    // Pulsation courte
    tl.to(sparkleRef.current, {
      scale: 0.8,
      rotation: 45,
      duration: 0.5,
      ease: 'power2.inOut'
    }, 0.7)

    // ---------------------------------------------------------
    // ACTE 2 : L'EXPANSION MASSIVE (1.2s -> 2.0s)
    // ---------------------------------------------------------
    tl.to(sparkleRef.current, {
      scale: 400, 
      rotation: 90, 
      duration: 0.8,
      ease: 'power2.inOut' 
    }, 1.2)

    // ---------------------------------------------------------
    // ACTE 3 : L'EMBLÈME (1.8s -> 2.6s)
    // ---------------------------------------------------------
    tl.to(logoRef.current, {
      scale: 1,
      opacity: 1,
      filter: 'blur(0px)',
      duration: 0.8,
      ease: 'power3.out'
    }, 1.8)

    // ---------------------------------------------------------
    // ACTE 4 : L'ASCENSION DU HERO (2.8s -> 3.6s)
    // ---------------------------------------------------------
    if (heroContainer) {
      // Le loader reste fixe et le Hero vient s'empiler au-dessus (Logique de Scroll Stack)
      tl.to(heroContainer, {
        y: 0,
        duration: 0.8,
        ease: 'power3.inOut'
      }, 2.8)
      
      // Sécurité : On cache le loader instantanément AVANT de nettoyer le z-index du Hero
      // pour éviter le flash d'une frame (React state lag)
      tl.set(containerRef.current, { autoAlpha: 0 })
      tl.set(heroContainer, { clearProps: 'all' })
      
    } else {
      tl.to(containerRef.current, {
        opacity: 0,
        duration: 0.8,
        ease: 'power3.inOut'
      }, 2.8)
    }

  }, { scope: containerRef })

  if (isComplete) return null

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] bg-white flex items-center justify-center overflow-hidden touch-none pointer-events-none"
    >
      {/* 
        L'éclat d'énergie (Sparkle 4 branches).
        Couleur fixée à #070709 (Noir). En grandissant, il va assombrir toute la page.
      */}
      <div 
        ref={sparkleRef}
        className="absolute z-10 flex items-center justify-center text-[#070709]"
        style={{ transform: 'scale(0)' }}
      >
        <svg 
          viewBox="0 0 24 24" 
          className="w-12 h-12 sm:w-16 sm:h-16"
          fill="currentColor"
        >
          <path d="M12 0C12 0 12 10.5 24 12C24 12 12 13.5 12 24C12 24 12 13.5 0 12C0 12 12 10.5 12 0Z" />
        </svg>
      </div>

      {/* 
        Le Logo SPARKLINE.
        Version Normale (principale).
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
