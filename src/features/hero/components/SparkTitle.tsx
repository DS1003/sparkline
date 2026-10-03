'use client'

import React, { useEffect, useRef, useState, useCallback } from 'react'

interface SparkTitleProps {
  lines?: string[]
  className?: string
}

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  color: string
  alpha: number
  life: number
  maxLife: number
  isStreak: boolean
  drag: number
  buoyancy: number
}

const PALETTE = ['#FFFFFF', '#FFF3B0', '#FFB901', '#FF6A1A', '#EB4604', '#D43D00']

export function SparkTitle({
  lines = ['Concevoir la', 'nouvelle ère', 'du numérique'],
  className = '',
}: SparkTitleProps) {
  const containerRef = useRef<HTMLHeadingElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const hasStartedRef = useRef(false)
  const [isStarted, setIsStarted] = useState(false)
  const [currentLineIndex, setCurrentLineIndex] = useState(0)
  const [currentCharIndex, setCurrentCharIndex] = useState(-1)
  const [isCompleted, setIsCompleted] = useState(false)

  // Physical Spark Coordinates (Continuous Smooth Lerp Engine)
  const sparkRef = useRef({
    x: 0,
    y: 0,
    targetX: 0,
    targetY: 0,
    vx: 0,
    vy: 0,
    opacity: 0,
    targetOpacity: 0,
    active: false,
  })

  const isTransitioningRef = useRef(false)
  const particlesRef = useRef<Particle[]>([])
  const animationFrameIdRef = useRef<number | null>(null)
  const isWritingDoneRef = useRef(false)

  // ── 0. Preloader Synchronization (Zero Flash, Single Invocation) ──
  useEffect(() => {
    let startTimer: NodeJS.Timeout | null = null

    const startWriting = () => {
      if (hasStartedRef.current) return
      hasStartedRef.current = true

      startTimer = setTimeout(() => {
        setIsStarted(true)
        setCurrentLineIndex(0)
        setCurrentCharIndex(0)
        sparkRef.current.active = true
        sparkRef.current.targetOpacity = 1
      }, 80)
    }

    if (
      typeof window !== 'undefined' &&
      (window as unknown as { __SPARKLINE_LOADED__?: boolean }).__SPARKLINE_LOADED__
    ) {
      startWriting()
      return
    }

    const handleLoaderComplete = () => {
      startWriting()
    }

    window.addEventListener('sparkline:loader-complete', handleLoaderComplete, { once: true })

    // Safety fallback
    const fallbackTimer = setTimeout(() => {
      startWriting()
    }, 6000)

    return () => {
      window.removeEventListener('sparkline:loader-complete', handleLoaderComplete)
      clearTimeout(fallbackTimer)
      if (startTimer) clearTimeout(startTimer)
    }
  }, [])

  // ── 1. Text Writing Sequencer with Fluid Human Rhythm ──
  useEffect(() => {
    if (!isStarted || isCompleted || currentCharIndex < 0) return

    let timeout: NodeJS.Timeout
    const totalLines = lines.length

    if (currentLineIndex < totalLines) {
      const currentLineText = lines[currentLineIndex]

      if (currentCharIndex < currentLineText.length - 1) {
        // Next character on same line
        const char = currentLineText[currentCharIndex]
        const isSpace = char === ' '
        const delay = isSpace ? 22 : 36 + Math.random() * 16

        timeout = setTimeout(() => {
          setCurrentCharIndex((prev) => prev + 1)
        }, delay)
      } else {
        // Current line finished
        if (currentLineIndex < totalLines - 1) {
          // Pause and trigger smooth swooping flight to the start of the next line
          isTransitioningRef.current = true

          timeout = setTimeout(() => {
            isTransitioningRef.current = false
            setCurrentLineIndex((prev) => prev + 1)
            setCurrentCharIndex(0)
          }, 210)
        } else {
          // Entire title completed!
          isWritingDoneRef.current = true

          // Trigger grand finale flare
          spawnFinaleBurst()

          timeout = setTimeout(() => {
            sparkRef.current.targetOpacity = 0
            setIsCompleted(true)
          }, 380)
        }
      }
    }

    return () => clearTimeout(timeout)
  }, [isStarted, currentLineIndex, currentCharIndex, isCompleted, lines])

  // ── 2. Helper to spawn bursts of sparks ──
  const spawnEmber = (x: number, y: number, count = 2, isBurst = false) => {
    for (let i = 0; i < count; i++) {
      const angle = isBurst
        ? Math.random() * Math.PI * 2
        : Math.PI + (Math.random() - 0.5) * 1.8 // fan backwards from pen tip
      const speed = isBurst ? 2.5 + Math.random() * 5.5 : 1.2 + Math.random() * 3.8
      const isStreak = Math.random() > 0.35

      particlesRef.current.push({
        x,
        y,
        vx: Math.cos(angle) * speed + (Math.random() - 0.5) * 1.0,
        vy: Math.sin(angle) * speed + (Math.random() - 0.7) * 1.5,
        size: isStreak ? 1.0 + Math.random() * 1.8 : 1.2 + Math.random() * 2.4,
        color: PALETTE[Math.floor(Math.random() * PALETTE.length)],
        alpha: 1,
        life: 0,
        maxLife: isBurst ? 28 + Math.random() * 30 : 16 + Math.random() * 24,
        isStreak,
        drag: isBurst ? 0.94 : 0.92,
        buoyancy: -0.06, // rising heat
      })
    }
  }

  const spawnFinaleBurst = () => {
    const spark = sparkRef.current
    for (let i = 0; i < 48; i++) {
      const angle = Math.random() * Math.PI * 2
      const speed = 2.0 + Math.random() * 6.5
      particlesRef.current.push({
        x: spark.x,
        y: spark.y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 0.5,
        size: 1.0 + Math.random() * 2.8,
        color: PALETTE[Math.floor(Math.random() * PALETTE.length)],
        alpha: 1,
        life: 0,
        maxLife: 32 + Math.random() * 36,
        isStreak: Math.random() > 0.4,
        drag: 0.95,
        buoyancy: -0.05,
      })
    }
  }

  // ── 3. Update Target Position from DOM Coordinates ──
  const updateTargetFromDOM = useCallback(() => {
    if (!isStarted || isWritingDoneRef.current) return

    const container = containerRef.current
    if (!container) return

    const activeCharEl = container.querySelector('[data-char-active="true"]') as HTMLElement | null
    if (activeCharEl) {
      const charRect = activeCharEl.getBoundingClientRect()
      const containerRect = container.getBoundingClientRect()

      // Padding of 64px offset for canvas bounds
      const PAD = 64
      const targetX = charRect.right - containerRect.left + PAD
      const targetY = charRect.top - containerRect.top + charRect.height * 0.5 + PAD

      sparkRef.current.targetX = targetX
      sparkRef.current.targetY = targetY

      // Initial teleport to first character on very first ignite
      if (sparkRef.current.x === 0 && sparkRef.current.y === 0) {
        sparkRef.current.x = targetX
        sparkRef.current.y = targetY
      }
    }
  }, [isStarted])

  useEffect(() => {
    updateTargetFromDOM()
  }, [currentLineIndex, currentCharIndex, updateTargetFromDOM])

  // ── 4. Unified HiDPI Canvas & Particle Motion Engine (0% CPU Idle on Sleep) ──
  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return

    let isRunning = true
    const PAD = 64

    // Handle high-density Retina screen buffers (zero pixelation, razor-sharp vector sparks)
    const resizeCanvas = () => {
      if (!container || !canvas) return
      const rect = container.getBoundingClientRect()
      const dpr = Math.min(typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1, 2.5)

      const cssWidth = rect.width + PAD * 2
      const cssHeight = rect.height + PAD * 2

      canvas.width = Math.round(cssWidth * dpr)
      canvas.height = Math.round(cssHeight * dpr)
      canvas.style.width = `${cssWidth}px`
      canvas.style.height = `${cssHeight}px`

      ctx.setTransform(1, 0, 0, 1, 0, 0)
      ctx.scale(dpr, dpr)
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas, { passive: true })

    let startTime = performance.now()

    // ── Continuous Animation Frame Loop ──
    const loop = (now: number) => {
      if (!isRunning) return

      const time = now - startTime
      const spark = sparkRef.current
      const particles = particlesRef.current

      const cssWidth = canvas.width / (window.devicePixelRatio || 1)
      const cssHeight = canvas.height / (window.devicePixelRatio || 1)
      ctx.clearRect(0, 0, cssWidth, cssHeight)

      // ── A. Update Physical Spark Position via Fluid Spring Lerp ──
      if (spark.active) {
        const dx = spark.targetX - spark.x
        const dy = spark.targetY - spark.y

        // Dynamic fluid factor: swoops gracefully between lines, snaps crisply between characters
        const lerpFactor = isTransitioningRef.current ? 0.20 : 0.36
        spark.vx = dx * lerpFactor
        spark.vy = dy * lerpFactor
        spark.x += spark.vx
        spark.y += spark.vy

        // Fade in / fade out target opacity
        spark.opacity += (spark.targetOpacity - spark.opacity) * 0.18

        // Spawn particles while moving
        if (spark.opacity > 0.2) {
          const moveSpeed = Math.hypot(spark.vx, spark.vy)
          if (moveSpeed > 0.4) {
            spawnEmber(spark.x, spark.y, isTransitioningRef.current ? 1 : 2)
          }
        }

        // ── B. Render the Luminous Sparkline Star Head ──
        if (spark.opacity > 0.02) {
          ctx.save()
          ctx.translate(spark.x, spark.y)
          ctx.globalAlpha = Math.max(0, Math.min(1, spark.opacity))

          // 1. Ambient Golden Plasma Halo (Additive Blend)
          ctx.globalCompositeOperation = 'screen'
          const auraGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, 46)
          auraGrad.addColorStop(0, 'rgba(255, 185, 1, 0.55)')
          auraGrad.addColorStop(0.35, 'rgba(235, 70, 4, 0.28)')
          auraGrad.addColorStop(1, 'rgba(235, 70, 4, 0)')
          ctx.fillStyle = auraGrad
          ctx.beginPath()
          ctx.arc(0, 0, 46, 0, Math.PI * 2)
          ctx.fill()

          // 2. High-heat Corona Core
          const coronaGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, 18)
          coronaGrad.addColorStop(0, 'rgba(255, 255, 255, 0.95)')
          coronaGrad.addColorStop(0.4, 'rgba(255, 200, 80, 0.85)')
          coronaGrad.addColorStop(0.85, 'rgba(235, 70, 4, 0.5)')
          coronaGrad.addColorStop(1, 'rgba(235, 70, 4, 0)')
          ctx.fillStyle = coronaGrad
          ctx.beginPath()
          ctx.arc(0, 0, 18, 0, Math.PI * 2)
          ctx.fill()

          // 3. Official Sparkline 4-Point Star Emblem (Vector Geometry)
          const pulse = 1 + Math.sin(time * 0.012) * 0.12
          const R = 15 * pulse
          const r = 3.6 * pulse

          ctx.beginPath()
          ctx.moveTo(0, -R)
          ctx.quadraticCurveTo(0, -r, r, 0)
          ctx.lineTo(R, 0)
          ctx.quadraticCurveTo(r, 0, 0, r)
          ctx.lineTo(0, R)
          ctx.quadraticCurveTo(0, r, -r, 0)
          ctx.lineTo(-R, 0)
          ctx.quadraticCurveTo(-r, 0, 0, -r)
          ctx.closePath()

          ctx.fillStyle = '#FFFDF5'
          ctx.shadowColor = '#FF9100'
          ctx.shadowBlur = 12
          ctx.fill()

          ctx.strokeStyle = '#FFB901'
          ctx.lineWidth = 1.2
          ctx.stroke()

          // 4. White-Hot Nuclear Fusion Core Dot
          ctx.shadowColor = '#FFFFFF'
          ctx.shadowBlur = 6
          ctx.fillStyle = '#FFFFFF'
          ctx.beginPath()
          ctx.arc(0, 0, 2.5, 0, Math.PI * 2)
          ctx.fill()

          ctx.restore()
        }
      }

      // ── C. Render Physical Particles (Directional Streaks + Floating Embers) ──
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i]
        p.vx *= p.drag
        p.vy *= p.drag
        p.vy += p.buoyancy // rising heat draft
        p.x += p.vx
        p.y += p.vy
        p.life++
        p.alpha = 1 - p.life / p.maxLife

        if (p.life >= p.maxLife || p.alpha <= 0) {
          particles.splice(i, 1)
          continue
        }

        ctx.save()
        ctx.globalAlpha = Math.max(0, Math.min(1, p.alpha))

        if (p.isStreak) {
          // Authentic high-speed welding streak
          ctx.beginPath()
          ctx.moveTo(p.x, p.y)
          ctx.lineTo(p.x - p.vx * 2.2, p.y - p.vy * 2.2)
          ctx.strokeStyle = p.color
          ctx.lineWidth = p.size
          ctx.lineCap = 'round'
          ctx.stroke()
        } else {
          // Floating golden molten ember
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
          ctx.fillStyle = p.color
          ctx.shadowColor = p.color
          ctx.shadowBlur = 6
          ctx.fill()
        }

        ctx.restore()
      }

      // ── D. Auto-Sleep when Writing is Completed and All Particles Expired ──
      if (isWritingDoneRef.current && particles.length === 0 && spark.opacity <= 0.01) {
        ctx.clearRect(0, 0, cssWidth, cssHeight)
        animationFrameIdRef.current = null
        return
      }

      animationFrameIdRef.current = requestAnimationFrame(loop)
    }

    animationFrameIdRef.current = requestAnimationFrame(loop)

    return () => {
      isRunning = false
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current)
      }
      window.removeEventListener('resize', resizeCanvas)
    }
  }, [])

  return (
    <h1
      ref={containerRef}
      className={`relative heading-style-01 text-[clamp(1.75rem,6.5vw,36px)] sm:text-[clamp(2.1rem,4.2vw,46px)] md:text-[clamp(42px,4.5vw,54px)] lg:text-[clamp(52px,4.8vw,68px)] xl:text-[clamp(66px,5vw,84px)] 2xl:text-[clamp(78px,5.2vw,96px)] font-normal text-[#FFFFFF] tracking-[-0.035em] leading-[1.04] max-w-none lg:max-w-[960px] xl:max-w-[1200px] select-none ${isCompleted ? 'animate-spark-title-sheen' : ''} ${className}`}
      style={{ fontFamily: 'var(--font-family--primary-font)' }}
    >
      {/* HiDPI Razor-Sharp Canvas for Star Spark Head & Flying Embers */}
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute -top-16 -left-16 z-30 overflow-visible"
      />

      {/* 3 Strict Lines of Text Rendered with Dynamic Molten Heat Reveal */}
      {lines.map((lineText, lineIdx) => {
        const isLineActive = isStarted && lineIdx === currentLineIndex
        const isLinePast = isStarted && lineIdx < currentLineIndex

        // Highlight "numérique" on the 3rd line with vibrant brand radiant gradient
        const highlightMatch = lineText.match(/\bnumérique?\b/i)
        const highlightStart = highlightMatch?.index ?? -1
        const highlightEnd = highlightStart !== -1 ? highlightStart + highlightMatch![0].length : -1

        return (
          <span key={lineIdx} className="block whitespace-nowrap relative">
            {lineText.split('').map((char, charIdx) => {
              const isCharRevealed =
                isStarted &&
                (isLinePast || (isLineActive && charIdx <= currentCharIndex))
              const isCurrentTip = !isCompleted && isLineActive && charIdx === currentCharIndex
              const isHighlightChar = highlightStart !== -1 && charIdx >= highlightStart && charIdx < highlightEnd

              return (
                <span
                  key={charIdx}
                  data-char-active={isCurrentTip ? 'true' : undefined}
                  className={`inline-block select-none ${
                    isCharRevealed ? 'animate-char-ignite' : ''
                  } ${isHighlightChar ? 'italic font-medium' : ''}`}
                  style={{
                    opacity: isCharRevealed ? 1 : 0,
                    visibility: isCharRevealed ? 'visible' : 'hidden',
                    fontStyle: isHighlightChar ? 'italic' : 'normal',
                    color: isHighlightChar ? '#FF6A1A' : '#FFFFFF',
                    textShadow: isHighlightChar
                      ? '0 2px 14px rgba(255, 106, 26, 0.65), 0 0 24px rgba(235, 70, 4, 0.45), 0 1px 3px rgba(0,0,0,0.9)'
                      : '0 2px 10px rgba(0,0,0,0.65), 0 1px 3px rgba(0,0,0,0.8)',
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
