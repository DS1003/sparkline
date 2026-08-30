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
  const [currentLineIndex, setCurrentLineIndex] = useState(0)
  const [currentCharIndex, setCurrentCharIndex] = useState(0)
  const [isCompleted, setIsCompleted] = useState(false)
  const [sparkPos, setSparkPos] = useState<{ x: number; y: number; active: boolean }>({
    x: 0,
    y: 0,
    active: true,
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

  // 1. Text Writing Sequencer
  useEffect(() => {
    let timeout: NodeJS.Timeout
    const totalLines = lines.length

    if (currentLineIndex < totalLines) {
      const currentLineText = lines[currentLineIndex]

      if (currentCharIndex < currentLineText.length) {
        // Typing speed per character (fast, natural spark writing)
        const delay = currentLineText[currentCharIndex] === ' ' ? 35 : 45 + Math.random() * 25
        timeout = setTimeout(() => {
          setCurrentCharIndex((prev) => prev + 1)
        }, delay)
      } else {
        // Line finished -> pause briefly before moving to next line
        timeout = setTimeout(() => {
          setCurrentLineIndex((prev) => prev + 1)
          setCurrentCharIndex(0)
        }, 180)
      }
    } else {
      setIsCompleted(true)
      // Fade out writing spark after a short delay
      timeout = setTimeout(() => {
        setSparkPos((prev) => ({ ...prev, active: false }))
      }, 500)
    }

    return () => clearTimeout(timeout)
  }, [currentLineIndex, currentCharIndex, lines])

  // 2. Track the physical DOM coordinate of the active spark tip
  useEffect(() => {
    if (isCompleted && !sparkPos.active) return

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
        const angle = (Math.random() * Math.PI * 2)
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
    }
  }, [currentLineIndex, currentCharIndex, isCompleted, sparkPos.active])

  // 3. Canvas Ember & Spark Particles Animation Loop
  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId: number

    const handleResize = () => {
      const rect = container.getBoundingClientRect()
      canvas.width = rect.width + 120
      canvas.height = rect.height + 60
    }

    handleResize()
    window.addEventListener('resize', handleResize)

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw and update embers
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

        ctx.save()
        ctx.globalAlpha = Math.max(0, p.alpha)
        ctx.fillStyle = p.color
        ctx.shadowColor = p.color
        ctx.shadowBlur = 6
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      }

      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <h1
      ref={containerRef}
      className={`relative heaidng-style-01 text-[clamp(2.25rem,4.8vw,80px)] lg:text-[80px] xl:text-[84px] font-normal text-[#FFFFFF] tracking-[-0.042em] leading-[1.0] max-w-[900px] select-none ${className}`}
      style={{ fontFamily: 'var(--font-family--primary-font)' }}
    >
      {/* Canvas for Realistic Flying Embers / Spark Particles */}
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute -top-8 -left-8 z-30 overflow-visible"
        style={{ width: 'calc(100% + 120px)', height: 'calc(100% + 60px)' }}
      />

      {/* Floating Spark Glowing Tip Head */}
      {sparkPos.active && !isCompleted && (
        <div
          className="pointer-events-none absolute z-20 transition-all duration-75 ease-out"
          style={{
            left: `${sparkPos.x}px`,
            top: `${sparkPos.y}px`,
            transform: 'translate(-50%, -50%)',
          }}
        >
          {/* Intense Core Spark */}
          <div className="relative w-4 h-4 flex items-center justify-center">
            {/* Outer Blazing Glow */}
            <div className="absolute w-12 h-12 rounded-full bg-[#FF9100]/50 blur-md animate-ping" />
            <div className="absolute w-8 h-8 rounded-full bg-[#EB4604]/80 blur-sm" />
            {/* White-Hot Center Flare */}
            <div className="w-3 h-3 rounded-full bg-white shadow-[0_0_15px_#FFFFFF,0_0_25px_#FFE57F,0_0_40px_#EB4604]" />
            {/* Ray spikes */}
            <div className="absolute w-8 h-[2px] bg-white/90 blur-[0.5px] rotate-45" />
            <div className="absolute w-8 h-[2px] bg-white/90 blur-[0.5px] -rotate-45" />
          </div>
        </div>
      )}

      {/* 3 Strict Lines of Text Rendered with Dynamic Reveal & Heat Glow */}
      {lines.map((lineText, lineIdx) => {
        const isLineActive = lineIdx === currentLineIndex
        const isLinePast = lineIdx < currentLineIndex

        return (
          <span key={lineIdx} className="block whitespace-nowrap relative">
            {lineText.split('').map((char, charIdx) => {
              const isCharRevealed = isLinePast || (isLineActive && charIdx <= currentCharIndex)
              const isCurrentTip = isLineActive && charIdx === currentCharIndex

              return (
                <span
                  key={charIdx}
                  data-char-active={isCurrentTip ? 'true' : undefined}
                  className="inline-block transition-all duration-300"
                  style={{
                    opacity: isCharRevealed ? 1 : 0,
                    transform: isCharRevealed ? 'translateY(0) scale(1)' : 'translateY(8px) scale(0.95)',
                    color: isCurrentTip
                      ? '#FFE57F'
                      : isCharRevealed
                      ? '#FFFFFF'
                      : 'transparent',
                    textShadow: isCurrentTip
                      ? '0 0 10px #FFFFFF, 0 0 20px #FF9100, 0 0 35px #EB4604'
                      : 'none',
                    filter: isCharRevealed ? 'none' : 'blur(4px)',
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
