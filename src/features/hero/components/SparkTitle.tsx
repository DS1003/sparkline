'use client'

import React, { useEffect, useRef, useState } from 'react'

interface SparkTitleProps {
  lines?: string[]
  className?: string
}

export function SparkTitle({
  lines = ['Concevoir la', 'nouvelle génération', 'de marques'],
  className = '',
}: SparkTitleProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLHeadingElement>(null)
  const hasStartedRef = useRef(false)
  const [isStarted, setIsStarted] = useState(false)
  const [currentLineIndex, setCurrentLineIndex] = useState(0)
  const [currentCharIndex, setCurrentCharIndex] = useState(-1)
  const [isCompleted, setIsCompleted] = useState(false)
  const [sparkPos, setSparkPos] = useState<{ x: number; y: number; active: boolean }>({
    x: 0,
    y: 0,
    active: false,
  })

  // Particles array for canvas sparks
  const particlesRef = useRef<
    Array<{
      x: number
      y: number
      vx: number
      vy: number
      size: number
      color: string
      alpha: number
      life: number
      maxLife: number
    }>
  >([])
  const startLoopRef = useRef<(() => void) | null>(null)

  // 0. Wait for the preloader to complete before starting from the beginning (Guaranteed Single Execution)
  useEffect(() => {
    let startTimer: NodeJS.Timeout | null = null

    const startWriting = () => {
      if (hasStartedRef.current) return
      hasStartedRef.current = true

      startTimer = setTimeout(() => {
        setIsStarted(true)
        setCurrentLineIndex(0)
        setCurrentCharIndex(0)
      }, 100)
    }

    if (typeof window !== 'undefined' && (window as unknown as { __SPARKLINE_LOADED__?: boolean }).__SPARKLINE_LOADED__) {
      startWriting()
      return
    }

    const handleLoaderComplete = () => {
      startWriting()
    }

    window.addEventListener('sparkline:loader-complete', handleLoaderComplete, { once: true })

    // Fallback safety timeout if preloader is not present or event missed
    const fallbackTimer = setTimeout(() => {
      startWriting()
    }, 8000)

    return () => {
      window.removeEventListener('sparkline:loader-complete', handleLoaderComplete)
      clearTimeout(fallbackTimer)
      if (startTimer) clearTimeout(startTimer)
    }
  }, [])

  // 1. Text Writing Sequencer (runs only after isStarted is true)
  useEffect(() => {
    if (!isStarted || isCompleted || currentCharIndex < 0) return

    let timeout: NodeJS.Timeout
    const totalLines = lines.length

    if (currentLineIndex < totalLines) {
      const currentLineText = lines[currentLineIndex]

      if (currentCharIndex < currentLineText.length - 1) {
        // Next character on the same line
        const char = currentLineText[currentCharIndex]
        const delay = char === ' ' ? 28 : 42 + Math.random() * 20
        timeout = setTimeout(() => {
          setCurrentCharIndex((prev) => prev + 1)
        }, delay)
      } else {
        // Current line finished
        if (currentLineIndex < totalLines - 1) {
          // Pause before moving to the next line
          timeout = setTimeout(() => {
            setCurrentLineIndex((prev) => prev + 1)
            setCurrentCharIndex(0)
          }, 180)
        } else {
          // Entire title completed!
          timeout = setTimeout(() => {
            setIsCompleted(true)
            setSparkPos((prev) => ({ ...prev, active: false }))
          }, 400)
        }
      }
    }

    return () => clearTimeout(timeout)
  }, [isStarted, currentLineIndex, currentCharIndex, isCompleted, lines])

  // 2. Track the physical DOM coordinate of the active spark tip
  useEffect(() => {
    if (!isStarted || (isCompleted && !sparkPos.active)) return

    const container = containerRef.current
    if (!container) return

    const activeCharEl = container.querySelector(`[data-char-active="true"]`)
    if (activeCharEl) {
      const charRect = activeCharEl.getBoundingClientRect()
      const containerRect = container.getBoundingClientRect()

      const x = charRect.right - containerRect.left
      const y = charRect.top - containerRect.top + charRect.height * 0.5

      setSparkPos({ x, y, active: true })

      // Spawn burst of 4-8 realistic glowing embers/sparks at the tip
      for (let i = 0; i < 6; i++) {
        const angle = Math.random() * Math.PI * 2
        const speed = 1.5 + Math.random() * 4.5
        const colors = ['#FFFFFF', '#FFE57F', '#FF9100', '#EB4604', '#FF3D00']
        particlesRef.current.push({
          x,
          y,
          vx: Math.cos(angle) * speed + (Math.random() - 0.5) * 1.5,
          vy: Math.sin(angle) * speed + (Math.random() - 0.7) * 2.5 - 0.8, // slight upward heat
          size: 1 + Math.random() * 2.5,
          color: colors[Math.floor(Math.random() * colors.length)],
          alpha: 1,
          life: 0,
          maxLife: 20 + Math.random() * 25,
        })
      }

      startLoopRef.current?.()
    }
  }, [isStarted, currentLineIndex, currentCharIndex, isCompleted, sparkPos.active])

  // 3. Canvas Ember & Spark Particles Animation Loop (Auto-sleep when no active particles)
  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return

    let animationFrameId: number | null = null

    const handleResize = () => {
      if (!container) return
      const rect = container.getBoundingClientRect()
      canvas.width = rect.width + 120
      canvas.height = rect.height + 60
    }

    handleResize()
    window.addEventListener('resize', handleResize, { passive: true })

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Auto-sleep: if no active particles, stop the requestAnimationFrame loop to release CPU/GPU
      if (particlesRef.current.length === 0) {
        animationFrameId = null
        return
      }

      // Fast, hardware-accelerated drawing without expensive software blur
      for (let i = particlesRef.current.length - 1; i >= 0; i--) {
        const p = particlesRef.current[i]
        p.x += p.vx
        p.y += p.vy
        p.vy += 0.08 // subtle gravity
        p.life++
        p.alpha = 1 - p.life / p.maxLife

        if (p.life >= p.maxLife || p.alpha <= 0) {
          particlesRef.current.splice(i, 1)
          continue
        }

        ctx.globalAlpha = Math.max(0, p.alpha)
        ctx.fillStyle = p.color
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fill()
      }

      // Continue loop only while particles exist
      if (particlesRef.current.length > 0) {
        animationFrameId = requestAnimationFrame(render)
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        animationFrameId = null
      }
    }

    // Wake up the loop on demand
    const checkAndStartLoop = () => {
      if (!animationFrameId && particlesRef.current.length > 0) {
        animationFrameId = requestAnimationFrame(render)
      }
    }

    startLoopRef.current = checkAndStartLoop

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId)
      startLoopRef.current = null
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <h1
      ref={containerRef}
      className={`relative heading-style-01 text-[clamp(1.75rem,6.5vw,36px)] sm:text-[clamp(2.1rem,4.2vw,46px)] lg:text-[clamp(28px,2.2vw,42px)] xl:text-[66px] 2xl:text-[76px] font-normal text-[#FFFFFF] tracking-[-0.035em] leading-[1.05] max-w-[800px] select-none ${className}`}
      style={{ fontFamily: 'var(--font-family--primary-font)' }}
    >
      {/* Canvas for Realistic Flying Embers / Spark Particles */}
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute -top-8 -left-8 z-30 overflow-visible"
        style={{ width: 'calc(100% + 120px)', height: 'calc(100% + 60px)' }}
      />

      {/* Floating Spark Glowing Tip Head */}
      {isStarted && sparkPos.active && !isCompleted && (
        <div
          className="pointer-events-none absolute z-20 transition-all duration-75 ease-out"
          style={{
            left: `${sparkPos.x}px`,
            top: `${sparkPos.y}px`,
            transform: 'translate(-50%, -50%)',
          }}
        >
          {/* Intense Core Spark */}
          <div className="relative w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center">
            {/* Outer Blazing Glow */}
            <div className="absolute w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#FF9100]/40 blur-md animate-pulse" />
            <div className="absolute w-10 h-10 sm:w-14 sm:h-14 rounded-full bg-[#EB4604]/60 blur-sm" />

            {/* Official Spark Icon SVG (Enlarged) */}
            <svg
              viewBox="0 0 24 24"
              className="w-7 h-7 sm:w-8 sm:h-8 xl:w-9 xl:h-9 text-[#FFB901] relative z-10 drop-shadow-[0_0_10px_rgba(255,185,1,0.95)] drop-shadow-[0_0_20px_rgba(235,70,4,0.85)]"
              fill="currentColor"
            >
              <path d="M12 0C12 0 12 10.5 24 12C24 12 12 13.5 12 24C12 24 12 13.5 0 12C0 12 12 10.5 12 0Z" />
            </svg>

            {/* White-Hot Center Spark Core */}
            <div className="absolute w-2 h-2 rounded-full bg-white shadow-[0_0_8px_#FFFFFF,0_0_16px_#FFB901] z-20 pointer-events-none" />
          </div>
        </div>
      )}

      {/* 3 Strict Lines of Text Rendered with Dynamic Reveal & Heat Glow */}
      {lines.map((lineText, lineIdx) => {
        const isLineActive = isStarted && lineIdx === currentLineIndex
        const isLinePast = isStarted && lineIdx < currentLineIndex

        return (
          <span key={lineIdx} className="block whitespace-nowrap relative">
            {lineText.split('').map((char, charIdx) => {
              const isCharRevealed =
                isStarted &&
                (isLinePast || (isLineActive && charIdx <= currentCharIndex))
              const isCurrentTip = !isCompleted && isLineActive && charIdx === currentCharIndex

              return (
                <span
                  key={charIdx}
                  data-char-active={isCurrentTip ? 'true' : undefined}
                  className="inline-block transition-all duration-300"
                  style={{
                    opacity: isCharRevealed ? 1 : 0,
                    transform: isCharRevealed
                      ? 'translate3d(0, 0, 0) scale(1)'
                      : 'translate3d(0, 8px, 0) scale(0.92)',
                    color: isCurrentTip
                      ? '#FFE57F'
                      : isCharRevealed
                      ? '#FFFFFF'
                      : 'transparent',
                    textShadow: isCurrentTip
                      ? '0 0 10px #FFFFFF, 0 0 20px #FF9100, 0 0 35px #EB4604'
                      : 'none',
                  }}
                >
                  {char === ' ' ? '\u00A0' : char}
                </span>
              )
            })}
          </span>
        )
      })}
    </h1>
  )
}
