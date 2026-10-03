'use client'

import React, { useEffect, useRef, useState, useCallback } from 'react'

interface SparkTitleProps {
  lines?: string[]
  className?: string
  heroCardRef?: React.RefObject<HTMLDivElement | null>
  canvasRef?: React.RefObject<HTMLCanvasElement | null>
  onMetaStamp?: (index: number) => void
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

interface FlightPath {
  startX: number
  startY: number
  targetX: number
  targetY: number
  startTime: number
  duration: number
  arcHeight: number
}

type SequencePhase =
  | 'idle'
  | 'writing_title'
  | 'fly_to_meta_0'
  | 'stamp_meta_0'
  | 'fly_to_meta_1'
  | 'stamp_meta_1'
  | 'fly_to_meta_2'
  | 'stamp_meta_2'
  | 'fading_out'
  | 'completed'

const PALETTE = ['#FFFFFF', '#FFF3B0', '#FFB901', '#FF6A1A', '#EB4604', '#D43D00']

function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
}

export function SparkTitle({
  lines = ['Concevoir la', 'nouvelle ère', 'du numérique'],
  className = '',
  heroCardRef,
  canvasRef: externalCanvasRef,
  onMetaStamp,
}: SparkTitleProps) {
  const containerRef = useRef<HTMLHeadingElement>(null)
  const localCanvasRef = useRef<HTMLCanvasElement>(null)

  // Use external canvas if provided (covers entire Hero card), else fallback to local
  const canvasRef = externalCanvasRef || localCanvasRef

  const hasStartedRef = useRef(false)
  const [isStarted, setIsStarted] = useState(false)
  const [currentLineIndex, setCurrentLineIndex] = useState(0)
  const [currentCharIndex, setCurrentCharIndex] = useState(-1)
  const [isCompleted, setIsCompleted] = useState(false)
  const [phase, setPhase] = useState<SequencePhase>('idle')

  const phaseRef = useRef<SequencePhase>('idle')
  phaseRef.current = phase

  // Physical Spark Coordinates (Continuous Smooth Spring + Inertia Engine)
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

  // Smooth parametric flight path controller
  const flightRef = useRef<FlightPath | null>(null)

  const isTransitioningRef = useRef(false)
  const particlesRef = useRef<Particle[]>([])
  const animationFrameIdRef = useRef<number | null>(null)

  // Stable callback refs to prevent unnecessary re-render loops
  const onMetaStampRef = useRef(onMetaStamp)
  onMetaStampRef.current = onMetaStamp

  // Prevent duplicate execution of one-shot phase actions
  const executedPhasesRef = useRef<Set<string>>(new Set())

  // ── 0. Preloader Synchronization ──
  useEffect(() => {
    let startTimer: NodeJS.Timeout | null = null

    const startWriting = () => {
      if (hasStartedRef.current) return
      hasStartedRef.current = true

      startTimer = setTimeout(() => {
        setIsStarted(true)
        setPhase('writing_title')
        setCurrentLineIndex(0)
        setCurrentCharIndex(0)
        sparkRef.current.active = true
        sparkRef.current.targetOpacity = 1
      }, 90)
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

    const fallbackTimer = setTimeout(() => {
      startWriting()
    }, 6000)

    return () => {
      window.removeEventListener('sparkline:loader-complete', handleLoaderComplete)
      clearTimeout(fallbackTimer)
      if (startTimer) clearTimeout(startTimer)
    }
  }, [])

  // ── 1. Helpers to Spawn Particles & Embers ──
  const spawnEmber = (x: number, y: number, count = 1, isBurst = false) => {
    for (let i = 0; i < count; i++) {
      const angle = isBurst
        ? Math.random() * Math.PI * 2
        : Math.PI + (Math.random() - 0.5) * 1.6
      const speed = isBurst ? 1.8 + Math.random() * 3.8 : 0.8 + Math.random() * 2.4
      const isStreak = Math.random() > 0.45

      particlesRef.current.push({
        x,
        y,
        vx: Math.cos(angle) * speed + (Math.random() - 0.5) * 0.8,
        vy: Math.sin(angle) * speed + (Math.random() - 0.6) * 1.2,
        size: isStreak ? 1.0 + Math.random() * 1.6 : 1.2 + Math.random() * 2.0,
        color: PALETTE[Math.floor(Math.random() * PALETTE.length)],
        alpha: 1,
        life: 0,
        maxLife: isBurst ? 24 + Math.random() * 22 : 16 + Math.random() * 20,
        isStreak,
        drag: 0.93,
        buoyancy: -0.05,
      })
    }
  }

  const spawnStampBurst = (x: number, y: number) => {
    for (let i = 0; i < 14; i++) {
      const angle = (i / 14) * Math.PI * 2 + (Math.random() - 0.5) * 0.3
      const speed = 1.6 + Math.random() * 3.4
      const isStreak = Math.random() > 0.4

      particlesRef.current.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 0.3,
        size: 1.0 + Math.random() * 2.0,
        color: PALETTE[Math.floor(Math.random() * PALETTE.length)],
        alpha: 1,
        life: 0,
        maxLife: 22 + Math.random() * 18,
        isStreak,
        drag: 0.92,
        buoyancy: -0.04,
      })
    }
  }

  // ── 2. Target Coordinate Resolvers ──
  const getMetaTarget = useCallback((index: number) => {
    const heroCard = heroCardRef?.current
    if (!heroCard) return null
    const baseRect = heroCard.getBoundingClientRect()
    const metaEl = heroCard.querySelector(`[data-spark-meta="${index}"]`) as HTMLElement | null
    if (!metaEl) return null
    const r = metaEl.getBoundingClientRect()
    return {
      x: r.left - baseRect.left - 4,
      y: r.top - baseRect.top + r.height * 0.5,
    }
  }, [heroCardRef])

  const updateTargetFromDOM = useCallback(() => {
    const curPhase = phaseRef.current
    if (curPhase !== 'writing_title') return

    const heroCard = heroCardRef?.current
    const container = containerRef.current
    const baseRect = heroCard ? heroCard.getBoundingClientRect() : container?.getBoundingClientRect()
    if (!baseRect || !container) return

    const activeCharEl = container.querySelector('[data-char-active="true"]') as HTMLElement | null
    if (activeCharEl) {
      const charRect = activeCharEl.getBoundingClientRect()
      const targetX = charRect.right - baseRect.left + (heroCard ? 0 : 64)
      const targetY = charRect.top - baseRect.top + charRect.height * 0.5 + (heroCard ? 0 : 64)

      sparkRef.current.targetX = targetX
      sparkRef.current.targetY = targetY

      if (sparkRef.current.x === 0 && sparkRef.current.y === 0) {
        sparkRef.current.x = targetX
        sparkRef.current.y = targetY
      }
    }
  }, [heroCardRef])

  useEffect(() => {
    updateTargetFromDOM()
  }, [currentLineIndex, currentCharIndex, updateTargetFromDOM])

  // ── 3. Step Sequencer: Title Writing -> Fluid Arced Flights to Metadata -> Gentle Dissolve ──
  useEffect(() => {
    if (!isStarted) return

    let timer: NodeJS.Timeout

    // A. Title Writing Sequencer
    if (phase === 'writing_title') {
      if (currentCharIndex < 0) return

      const totalLines = lines.length
      if (currentLineIndex < totalLines) {
        const currentLineText = lines[currentLineIndex]

        if (currentCharIndex < currentLineText.length - 1) {
          const char = currentLineText[currentCharIndex]
          const isSpace = char === ' '
          const delay = isSpace ? 24 : 36 + Math.random() * 16

          timer = setTimeout(() => {
            setCurrentCharIndex((prev) => prev + 1)
          }, delay)
        } else {
          // Current line finished
          if (currentLineIndex < totalLines - 1) {
            isTransitioningRef.current = true
            timer = setTimeout(() => {
              isTransitioningRef.current = false
              setCurrentLineIndex((prev) => prev + 1)
              setCurrentCharIndex(0)
            }, 210)
          } else {
            // All 3 lines finished writing!
            setIsCompleted(true)
            // Hold briefly with gentle flare, then start smooth swooping flight to STARTUP
            timer = setTimeout(() => {
              spawnEmber(sparkRef.current.x, sparkRef.current.y, 6, true)
              setPhase('fly_to_meta_0')
            }, 280)
          }
        }
      }
    }

    // B. Flight to Meta 0 ("STARTUP") with majestic swoop
    else if (phase === 'fly_to_meta_0') {
      const target = getMetaTarget(0)
      if (target) {
        sparkRef.current.targetX = target.x
        sparkRef.current.targetY = target.y
        flightRef.current = {
          startX: sparkRef.current.x,
          startY: sparkRef.current.y,
          targetX: target.x,
          targetY: target.y,
          startTime: performance.now(),
          duration: 560, // fluid swoop down to metadata
          arcHeight: -24,
        }
      }
    }

    // C. Stamp Meta 0 ("STARTUP")
    else if (phase === 'stamp_meta_0') {
      if (!executedPhasesRef.current.has('stamp_meta_0')) {
        executedPhasesRef.current.add('stamp_meta_0')
        onMetaStampRef.current?.(0)
        spawnStampBurst(sparkRef.current.x, sparkRef.current.y)
      }
      // Quick fluid pause, then immediately leap to Meta 1 d'affilé
      timer = setTimeout(() => {
        setPhase('fly_to_meta_1')
      }, 160)
    }

    // D. Flight to Meta 1 ("FONDÉ EN 2024") with arced leap
    else if (phase === 'fly_to_meta_1') {
      const target = getMetaTarget(1)
      if (target) {
        sparkRef.current.targetX = target.x
        sparkRef.current.targetY = target.y
        flightRef.current = {
          startX: sparkRef.current.x,
          startY: sparkRef.current.y,
          targetX: target.x,
          targetY: target.y,
          startTime: performance.now(),
          duration: 380, // quick buoyant leap across
          arcHeight: -16,
        }
      }
    }

    // E. Stamp Meta 1 ("FONDÉ EN 2024")
    else if (phase === 'stamp_meta_1') {
      if (!executedPhasesRef.current.has('stamp_meta_1')) {
        executedPhasesRef.current.add('stamp_meta_1')
        onMetaStampRef.current?.(1)
        spawnStampBurst(sparkRef.current.x, sparkRef.current.y)
      }
      // Quick fluid pause, then immediately leap to Meta 2 d'affilé
      timer = setTimeout(() => {
        setPhase('fly_to_meta_2')
      }, 160)
    }

    // F. Flight to Meta 2 ("AGENCE SPARKLINE") with arced leap
    else if (phase === 'fly_to_meta_2') {
      const target = getMetaTarget(2)
      if (target) {
        sparkRef.current.targetX = target.x
        sparkRef.current.targetY = target.y
        flightRef.current = {
          startX: sparkRef.current.x,
          startY: sparkRef.current.y,
          targetX: target.x,
          targetY: target.y,
          startTime: performance.now(),
          duration: 380, // quick buoyant leap across
          arcHeight: -16,
        }
      }
    }

    // G. Stamp Meta 2 ("AGENCE SPARKLINE") & Soft Dissolution
    else if (phase === 'stamp_meta_2') {
      if (!executedPhasesRef.current.has('stamp_meta_2')) {
        executedPhasesRef.current.add('stamp_meta_2')
        onMetaStampRef.current?.(2)
        spawnStampBurst(sparkRef.current.x, sparkRef.current.y)
      }
      timer = setTimeout(() => {
        setPhase('fading_out')
      }, 260)
    }

    // H. Soft Fade Out
    else if (phase === 'fading_out') {
      sparkRef.current.targetOpacity = 0
      timer = setTimeout(() => {
        setPhase('completed')
      }, 450)
    }

    return () => clearTimeout(timer)
  }, [isStarted, phase, currentLineIndex, currentCharIndex, lines, getMetaTarget])

  // ── 4. Unified HiDPI Canvas & High-Vibe Physics Motion Engine ──
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return

    let isRunning = true
    const heroCard = heroCardRef?.current
    const container = containerRef.current
    const measureEl = heroCard || container
    if (!measureEl) return

    const resizeCanvas = () => {
      if (!canvas || !measureEl) return
      const rect = measureEl.getBoundingClientRect()
      const dpr = Math.min(typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1, 2.5)

      const cssWidth = rect.width + (heroCard ? 0 : 128)
      const cssHeight = rect.height + (heroCard ? 0 : 128)

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
      const currentPhase = phaseRef.current

      const dpr = window.devicePixelRatio || 1
      const cssWidth = canvas.width / dpr
      const cssHeight = canvas.height / dpr
      ctx.clearRect(0, 0, cssWidth, cssHeight)

      // ── A. Update Position via Flight Trajectory OR Critical Spring Lerp ──
      if (spark.active) {
        const flight = flightRef.current

        if (flight) {
          // Parametric flight path with easeInOutCubic and natural vertical arc
          const elapsed = now - flight.startTime
          const rawProgress = Math.min(1, elapsed / flight.duration)
          const t = easeInOutCubic(rawProgress)

          // Interpolate with natural curved wave
          const arc = Math.sin(t * Math.PI) * flight.arcHeight
          spark.x = flight.startX + (flight.targetX - flight.startX) * t
          spark.y = flight.startY + (flight.targetY - flight.startY) * t + arc

          // Velocity for ember emission
          spark.vx = (flight.targetX - flight.startX) * 0.015
          spark.vy = (flight.targetY - flight.startY) * 0.015

          // Emit soft trailing embers along the curved flight
          if (rawProgress < 0.95 && Math.random() > 0.42) {
            spawnEmber(spark.x, spark.y, 1)
          }

          // Keep target locked to flight destination
          spark.targetX = flight.targetX
          spark.targetY = flight.targetY

          // Flight completion check
          if (rawProgress >= 1) {
            spark.x = flight.targetX
            spark.y = flight.targetY
            spark.vx = 0
            spark.vy = 0
            flightRef.current = null
            if (currentPhase === 'fly_to_meta_0') setPhase('stamp_meta_0')
            else if (currentPhase === 'fly_to_meta_1') setPhase('stamp_meta_1')
            else if (currentPhase === 'fly_to_meta_2') setPhase('stamp_meta_2')
          }
        } else if (currentPhase === 'writing_title') {
          // Writing mode: Critically damped spring follower for buttery-smooth glide
          const springK = isTransitioningRef.current ? 0.09 : 0.16
          const damping = isTransitioningRef.current ? 0.78 : 0.72

          const dx = spark.targetX - spark.x
          const dy = spark.targetY - spark.y

          spark.vx += dx * springK
          spark.vy += dy * springK
          spark.vx *= damping
          spark.vy *= damping

          spark.x += spark.vx
          spark.y += spark.vy

          // Add a very subtle organic floating wave (vibe) while moving or hovering
          const moveSpeed = Math.hypot(spark.vx, spark.vy)
          if (moveSpeed > 0.5 && Math.random() > 0.55) {
            spawnEmber(spark.x, spark.y, 1)
          }
        } else {
          // Stamping & fading phases: stay strictly locked at metadata item, zero drift
          spark.vx = 0
          spark.vy = 0
        }

        // Fade in / out opacity smoothly
        spark.opacity += (spark.targetOpacity - spark.opacity) * 0.14

        // ── B. Render the Luminous Sparkline Star Head ──
        if (spark.opacity > 0.02) {
          ctx.save()
          // Subtle breathing float for high-vibe life
          const floatY = Math.sin(time * 0.007) * 1.2
          ctx.translate(spark.x, spark.y + floatY)
          ctx.globalAlpha = Math.max(0, Math.min(1, spark.opacity))

          // 1. Ambient Golden Plasma Halo (Additive Screen Blend)
          ctx.globalCompositeOperation = 'screen'
          const auraGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, 44)
          auraGrad.addColorStop(0, 'rgba(255, 185, 1, 0.55)')
          auraGrad.addColorStop(0.35, 'rgba(235, 70, 4, 0.28)')
          auraGrad.addColorStop(1, 'rgba(235, 70, 4, 0)')
          ctx.fillStyle = auraGrad
          ctx.beginPath()
          ctx.arc(0, 0, 44, 0, Math.PI * 2)
          ctx.fill()

          // 2. High-heat Corona Core
          const coronaGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, 18)
          coronaGrad.addColorStop(0, 'rgba(255, 255, 255, 0.98)')
          coronaGrad.addColorStop(0.4, 'rgba(255, 200, 80, 0.85)')
          coronaGrad.addColorStop(0.85, 'rgba(235, 70, 4, 0.5)')
          coronaGrad.addColorStop(1, 'rgba(235, 70, 4, 0)')
          ctx.fillStyle = coronaGrad
          ctx.beginPath()
          ctx.arc(0, 0, 18, 0, Math.PI * 2)
          ctx.fill()

          // 3. Official Sparkline 4-Point Star Emblem (Vector Geometry with smooth breath pulse)
          const pulse = 1 + Math.sin(time * 0.012) * 0.12
          const R = 14 * pulse
          const r = 3.5 * pulse

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
          ctx.lineWidth = 1.1
          ctx.stroke()

          // 4. White-Hot Nuclear Fusion Core Dot
          ctx.shadowColor = '#FFFFFF'
          ctx.shadowBlur = 6
          ctx.fillStyle = '#FFFFFF'
          ctx.beginPath()
          ctx.arc(0, 0, 2.4, 0, Math.PI * 2)
          ctx.fill()

          ctx.restore()
        }
      }

      // ── C. Render Physical Particles (Directional Streaks + Floating Embers) ──
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i]
        p.vx *= p.drag
        p.vy *= p.drag
        p.vy += p.buoyancy
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
          ctx.beginPath()
          ctx.moveTo(p.x, p.y)
          ctx.lineTo(p.x - p.vx * 2.2, p.y - p.vy * 2.2)
          ctx.strokeStyle = p.color
          ctx.lineWidth = p.size
          ctx.lineCap = 'round'
          ctx.stroke()
        } else {
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
          ctx.fillStyle = p.color
          ctx.shadowColor = p.color
          ctx.shadowBlur = 6
          ctx.fill()
        }

        ctx.restore()
      }

      // ── D. Auto-Sleep when Sequence is Done and All Particles Expired (0% CPU) ──
      if (
        currentPhase === 'completed' &&
        particles.length === 0 &&
        spark.opacity <= 0.01
      ) {
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
  }, [canvasRef, heroCardRef])

  return (
    <h1
      ref={containerRef}
      className={`relative heading-style-01 text-[clamp(1.75rem,6.5vw,36px)] sm:text-[clamp(2.1rem,4.2vw,46px)] md:text-[clamp(42px,4.5vw,54px)] lg:text-[clamp(52px,4.8vw,68px)] xl:text-[clamp(66px,5vw,84px)] 2xl:text-[clamp(78px,5.2vw,96px)] font-normal text-[#FFFFFF] tracking-[-0.035em] leading-[1.04] max-w-none lg:max-w-[960px] xl:max-w-[1200px] select-none ${isCompleted ? 'animate-spark-title-sheen' : ''} ${className}`}
      style={{ fontFamily: 'var(--font-family--primary-font)' }}
    >
      {/* Fallback local canvas if external full-hero canvas is not provided */}
      {!externalCanvasRef && (
        <canvas
          ref={localCanvasRef}
          className="pointer-events-none absolute -top-16 -left-16 z-30 overflow-visible"
        />
      )}

      {/* 3 Strict Lines of Text Rendered with Dynamic Molten Heat Reveal */}
      {lines.map((lineText, lineIdx) => {
        const isLineActive = isStarted && lineIdx === currentLineIndex
        const isLinePast = isStarted && (lineIdx < currentLineIndex || isCompleted)

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
              const isCurrentTip =
                phase === 'writing_title' &&
                isLineActive &&
                charIdx === currentCharIndex
              const isHighlightChar =
                highlightStart !== -1 && charIdx >= highlightStart && charIdx < highlightEnd

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
