'use client'

import React, { useRef, useState, useCallback, useEffect } from 'react'

interface HeroBadge3DProps {
  className?: string
  isIgnited?: boolean
}

export function HeroBadge3D({ className = '', isIgnited = false }: HeroBadge3DProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const glareRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  // Smooth lerped spring rotation for realistic 3D perspective (GPU direct, 0 React re-renders)
  const currentRotateRef = useRef({ x: 0, y: 0 })
  const targetRotateRef = useRef({ x: 0, y: 0 })
  const animFrameRef = useRef<number | null>(null)
  const isHoveredRef = useRef(false)

  const applyTransform = useCallback((x: number, y: number, hovered: boolean) => {
    if (cardRef.current) {
      cardRef.current.style.transform = `perspective(900px) rotateX(${x.toFixed(2)}deg) rotateY(${y.toFixed(2)}deg) translateZ(${hovered ? '8px' : '0px'}) scale(${hovered ? 1.025 : 1})`
    }
  }, [])

  const startLoop = useCallback(() => {
    if (animFrameRef.current !== null) return

    const tick = () => {
      const current = currentRotateRef.current
      const target = targetRotateRef.current
      const dx = target.x - current.x
      const dy = target.y - current.y

      if (Math.abs(dx) < 0.02 && Math.abs(dy) < 0.02) {
        current.x = target.x
        current.y = target.y
        applyTransform(current.x, current.y, isHoveredRef.current)
        animFrameRef.current = null
        return // Sleep! 0% CPU consumption!
      }

      current.x += dx * 0.2
      current.y += dy * 0.2
      applyTransform(current.x, current.y, isHoveredRef.current)

      animFrameRef.current = requestAnimationFrame(tick)
    }

    animFrameRef.current = requestAnimationFrame(tick)
  }, [applyTransform])

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = containerRef.current
    if (!el) return

    const rect = el.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width
    const py = (e.clientY - rect.top) / rect.height

    const nx = Math.max(-1, Math.min(1, (px - 0.5) * 2))
    const ny = Math.max(-1, Math.min(1, (py - 0.5) * 2))

    targetRotateRef.current = {
      x: -ny * 8,
      y: nx * 10,
    }

    if (glareRef.current) {
      const gx = Math.round(px * 100)
      const gy = Math.round(py * 100)
      glareRef.current.style.background = `radial-gradient(circle 90px at ${gx}% ${gy}%, rgba(255, 255, 255, 0.32) 0%, rgba(255, 200, 160, 0.12) 35%, transparent 70%)`
    }

    startLoop()
  }, [startLoop])

  const handleMouseEnter = useCallback(() => {
    isHoveredRef.current = true
    setIsHovered(true)
    if (glareRef.current) {
      glareRef.current.style.opacity = '1'
    }
    startLoop()
  }, [startLoop])

  const handleMouseLeave = useCallback(() => {
    isHoveredRef.current = false
    setIsHovered(false)
    targetRotateRef.current = { x: 0, y: 0 }
    if (glareRef.current) {
      glareRef.current.style.opacity = '0'
    }
    startLoop()
  }, [startLoop])

  useEffect(() => {
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current)
    }
  }, [])

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative inline-flex items-center group cursor-pointer select-none transition-transform duration-300 ease-out animate-badge-entrance ${className}`}
      style={{
        perspective: '1000px',
      }}
    >
      {/* ─── Layer 0: Radiant Solar Amber Ambient Aura ─── */}
      <div
        className="absolute -inset-1 sm:-inset-1.5 rounded-full pointer-events-none transition-all duration-700 blur-[10px] sm:blur-[16px]"
        style={{
          background:
            'radial-gradient(ellipse at 50% 50%, rgba(255, 92, 28, 0.45) 0%, rgba(255, 140, 50, 0.18) 50%, transparent 75%)',
          opacity: isIgnited ? 1 : isHovered ? 0.95 : 0.6,
          transform: `scale(${isIgnited ? 1.1 : isHovered ? 1.05 : 0.98})`,
        }}
      />

      {/* ─── Layer 1: 3D Tilting Body Container (Hardware Accelerated) ─── */}
      <div
        ref={cardRef}
        className="relative transition-shadow duration-300"
        style={{
          transform: 'perspective(900px) rotateX(0deg) rotateY(0deg) translateZ(0px) scale(1)',
          transformStyle: 'preserve-3d',
          willChange: 'transform',
        }}
      >
        {/* ─── Layer 2: Diamond Platinum & Solar Light Chamfered Bezel ─── */}
        <div
          className="relative p-[1.5px] rounded-full overflow-hidden"
          style={{
            background: isIgnited
              ? 'linear-gradient(135deg, rgba(255, 255, 255, 1) 0%, rgba(255, 200, 160, 0.8) 22%, rgba(255, 92, 28, 0.95) 48%, rgba(255, 200, 160, 0.6) 75%, rgba(255, 255, 255, 1) 100%)'
              : 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.4) 22%, rgba(255, 92, 28, 0.85) 48%, rgba(255, 255, 255, 0.3) 75%, rgba(255, 255, 255, 0.9) 100%)',
            boxShadow: isIgnited
              ? '0 18px 38px -4px rgba(0,0,0,0.8), 0 8px 18px rgba(0,0,0,0.55), 0 0 30px rgba(255,92,28,0.6), inset 0 1.5px 2px rgba(255,255,255,1), inset 0 -1.5px 2px rgba(0,0,0,0.7)'
              : isHovered
              ? '0 16px 32px -4px rgba(0,0,0,0.75), 0 6px 14px rgba(0,0,0,0.5), 0 0 24px rgba(255,92,28,0.45), inset 0 1.5px 1.5px rgba(255,255,255,0.9), inset 0 -1.5px 2px rgba(0,0,0,0.7)'
              : '0 10px 24px -4px rgba(0,0,0,0.65), 0 4px 10px rgba(0,0,0,0.45), 0 0 16px rgba(255,92,28,0.25), inset 0 1.2px 1.2px rgba(255,255,255,0.85), inset 0 -1px 1.5px rgba(0,0,0,0.6)',
          }}
        >
          {/* Bezel Micro Edge Ring */}
          <div className="relative p-[1px] rounded-full bg-black/40">
            {/* ─── Layer 3: Ultra-Clean Frosted Smoked Glass Pill ─── */}
            <div
              className={`relative inline-flex items-center transition-all duration-500 ease-out py-1.5 sm:py-2 rounded-full overflow-hidden backdrop-blur-2xl ${
                isIgnited
                  ? 'pl-2.5 pr-4 sm:pl-3 sm:pr-5'
                  : 'px-4 sm:px-5'
              }`}
              style={{
                background:
                  'linear-gradient(180deg, rgba(255, 255, 255, 0.16) 0%, rgba(18, 18, 24, 0.72) 42%, rgba(10, 10, 14, 0.88) 100%)',
                boxShadow: isIgnited
                  ? 'inset 0 1.5px 1.5px rgba(255,255,255,0.75), inset 0 -1.5px 2px rgba(0,0,0,0.8), inset 0 0 24px rgba(255,92,28,0.35)'
                  : 'inset 0 1.5px 1.5px rgba(255,255,255,0.5), inset 0 -1.5px 2px rgba(0,0,0,0.8), inset 0 0 16px rgba(255,92,28,0.12)',
              }}
            >
              {/* Micro Razor-Sharp Zenith Horizon Arc (1px Crystal Glint) */}
              <div
                className="absolute top-0 inset-x-3 h-[1px] pointer-events-none"
                style={{
                  background:
                    'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.25) 15%, rgba(255,255,255,0.95) 50%, rgba(255,255,255,0.25) 85%, transparent 100%)',
                }}
              />

              {/* Convex Curved Optical Glass Reflection (Top Specular Wash) */}
              <div
                className="absolute top-0 inset-x-0 h-1/2 rounded-t-full pointer-events-none"
                style={{
                  background:
                    'linear-gradient(180deg, rgba(255, 255, 255, 0.18) 0%, rgba(255, 255, 255, 0.03) 65%, transparent 100%)',
                }}
              />

              {/* Bottom Radiant Amber Flare */}
              <div
                className="absolute bottom-0 inset-x-0 h-1/2 pointer-events-none transition-opacity duration-700"
                style={{
                  background:
                    'radial-gradient(ellipse 70% 60% at 50% 120%, rgba(255, 92, 28, 0.4) 0%, transparent 75%)',
                  opacity: isIgnited ? 1 : 0.65,
                }}
              />

              {/* Real-Time Specular Glare Follower (tracks cursor position) */}
              <div
                ref={glareRef}
                className="absolute inset-0 rounded-full pointer-events-none transition-opacity duration-300"
                style={{
                  background:
                    'radial-gradient(circle 90px at 50% 50%, rgba(255, 255, 255, 0.32) 0%, rgba(255, 200, 160, 0.12) 35%, transparent 70%)',
                  opacity: isHovered ? 1 : 0,
                }}
              />

              {/* Diamond Shimmer Light Sweep */}
              <div className="absolute inset-0 rounded-full overflow-hidden pointer-events-none">
                <div
                  className="animate-neon-shimmer absolute inset-y-0 w-1/3 skew-x-[-22deg] pointer-events-none"
                  style={{
                    background:
                      'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.08) 35%, rgba(255, 255, 255, 0.35) 50%, rgba(255, 255, 255, 0.08) 65%, transparent 100%)',
                  }}
                />
              </div>

              {/* ─── Layer 4: Solar Jewel Aperture (Container is identical to final rendering from start, only spark icon appears upon ignition) ─── */}
              <div
                data-spark-badge-target="true"
                className="relative shrink-0 flex items-center justify-center w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-2.5 overflow-visible select-none"
              >
                {/* The Jewel Ring Housing — Glowing brilliant solar diamond rim from the start */}
                <div
                  className="relative w-full h-full rounded-full p-[1px] flex items-center justify-center transition-shadow duration-700 ease-out"
                  style={{
                    background:
                      'linear-gradient(135deg, #FFFFFF 0%, #FFE5C4 20%, #FF5C1C 65%, #FF3B00 100%)',
                    boxShadow:
                      '0 0 20px rgba(255, 92, 28, 0.95), 0 0 35px rgba(255, 140, 50, 0.6), inset 0 1px 2px #FFFFFF',
                  }}
                >
                  {/* Shockwave expanding ring when ignited */}
                  {isIgnited && (
                    <div className="absolute -inset-1 rounded-full border-2 border-[#FFA84A] animate-badge-shockwave pointer-events-none" />
                  )}

                  {/* Gem Core Background / Socket Receptacle */}
                  <div className="w-full h-full rounded-full flex items-center justify-center bg-gradient-to-b from-[#18181E] via-[#0E0E12] to-[#060608] relative overflow-hidden">
                    {/* Internal Radiant Core Flare */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,92,28,0.9)_0%,transparent_75%)] opacity-100 scale-125" />

                    {/* 4-Point Prismatic Diamond Spark SVG — ONLY thing that appears upon ignition! */}
                    <svg
                      viewBox="0 0 24 24"
                      className={`w-3 h-3 sm:w-3.5 sm:h-3.5 text-white relative z-10 shrink-0 transition-all duration-500 ease-out ${
                        isIgnited
                          ? 'opacity-100 scale-100 animate-spark-supernova'
                          : 'opacity-0 scale-0 pointer-events-none'
                      }`}
                      fill="currentColor"
                      style={{
                        filter:
                          'drop-shadow(0 0 4px #FFFFFF) drop-shadow(0 0 10px #FF9100) drop-shadow(0 0 18px #FF3B00)',
                      }}
                    >
                      <path d="M12 0C12 0 12 10.5 24 12C24 12 12 13.5 12 24C12 24 12 13.5 0 12C0 12 12 10.5 12 0Z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* ─── Layer 5: Pure Luminous Crisp White Typography ─── */}
              <div className="relative z-10 flex items-center">
                <span
                  className="text-[8.5px] sm:text-[10px] xl:text-[11.5px] font-bold tracking-[0.18em] sm:tracking-[0.24em] uppercase text-white font-mono"
                  style={{
                    textShadow:
                      '0 1px 2px rgba(0,0,0,0.9), 0 0 10px rgba(255,255,255,0.7), 0 0 20px rgba(255,92,28,0.45)',
                  }}
                >
                  Spark The Change, Illuminate Success
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
