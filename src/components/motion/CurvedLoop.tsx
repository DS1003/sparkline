'use client'

import { useRef, useEffect, useState, useMemo, useId } from 'react'
import './CurvedLoop.css'

interface CurvedLoopProps {
  marqueeText?: string
  speed?: number
  className?: string
  curveAmount?: number
  direction?: 'left' | 'right'
  interactive?: boolean
}

const CurvedLoop = ({
  marqueeText = '',
  speed = 2,
  className,
  curveAmount = 400,
  direction = 'left',
  interactive = true,
}: CurvedLoopProps) => {
  // Ensure single trailing non-breaking space so copies join cleanly
  const singleUnit = useMemo(() => {
    return marqueeText.trimEnd() + '\u00A0'
  }, [marqueeText])

  const measureRef = useRef<SVGTextElement>(null)
  const textPathRef = useRef<SVGTextPathElement>(null)

  // spacing = pixel length of ONE copy of the text along the path
  const [spacing, setSpacing] = useState(0)

  const uid = useId()
  const pathId = `curve-${uid}`

  // Path spans well beyond the viewport on both sides so the curve is visible
  const pathD = `M-200,40 Q720,${40 + curveAmount} 1640,40`

  // Drag interaction refs
  const dragRef = useRef(false)
  const lastXRef = useRef(0)
  const dirRef = useRef(direction)
  const velRef = useRef(0)
  const currentOffsetRef = useRef(0)

  // Fill the visible path with enough copies: path ~1840px wide, we want 6+ copies minimum
  const totalText = useMemo(() => {
    if (!spacing) return singleUnit
    const copies = Math.max(Math.ceil(1840 / spacing) + 4, 8)
    return Array(copies).fill(singleUnit).join('')
  }, [singleUnit, spacing])

  // Measure ONE copy
  useEffect(() => {
    if (measureRef.current) {
      const len = measureRef.current.getComputedTextLength()
      if (len > 0) setSpacing(len)
    }
  }, [singleUnit, className])

  // Set initial offset to -spacing so the seamless region is [−spacing, 0)
  useEffect(() => {
    if (!spacing || !textPathRef.current) return
    const initial = -spacing
    textPathRef.current.setAttribute('startOffset', `${initial}px`)
    currentOffsetRef.current = initial
  }, [spacing])

  // Animation loop — NEVER calls setState, only direct DOM mutation
  useEffect(() => {
    if (!spacing) return
    let raf = 0

    const tick = () => {
      if (!dragRef.current && textPathRef.current) {
        const delta = dirRef.current === 'right' ? speed : -speed
        let next = currentOffsetRef.current + delta

        // Seamless wrap: visual position at −spacing identical to −spacing+spacing=0
        if (next <= -spacing) next += spacing
        if (next > 0) next -= spacing

        currentOffsetRef.current = next
        textPathRef.current.setAttribute('startOffset', `${next}px`)
      }
      raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [spacing, speed])

  // Pointer interaction
  const onPointerDown = (e: React.PointerEvent) => {
    if (!interactive) return
    dragRef.current = true
    lastXRef.current = e.clientX
    velRef.current = 0
    ;(e.target as Element).setPointerCapture(e.pointerId)
  }

  const onPointerMove = (e: React.PointerEvent) => {
    if (!interactive || !dragRef.current || !textPathRef.current) return
    const dx = e.clientX - lastXRef.current
    lastXRef.current = e.clientX
    velRef.current = dx

    let next = currentOffsetRef.current + dx
    if (next <= -spacing) next += spacing
    if (next > 0) next -= spacing

    currentOffsetRef.current = next
    textPathRef.current.setAttribute('startOffset', `${next}px`)
  }

  const endDrag = () => {
    if (!interactive) return
    dragRef.current = false
    dirRef.current = velRef.current > 0 ? 'right' : 'left'
  }

  const ready = spacing > 0

  return (
    <div
      className="curved-loop-jacket"
      style={{ cursor: interactive ? 'grab' : 'auto', visibility: ready ? 'visible' : 'hidden' }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerLeave={endDrag}
    >
      <svg className="curved-loop-svg" viewBox="0 0 1440 120" aria-hidden="true">
        {/* Invisible measurement element — one single copy of the text */}
        <text
          ref={measureRef}
          xmlSpace="preserve"
          style={{ visibility: 'hidden', opacity: 0, pointerEvents: 'none', fontSize: 'inherit' }}
          className={className}
        >
          {singleUnit}
        </text>

        <defs>
          <path id={pathId} d={pathD} fill="none" />
        </defs>

        {ready && (
          <text xmlSpace="preserve" className={className}>
            <textPath ref={textPathRef} href={`#${pathId}`} xmlSpace="preserve">
              {totalText}
            </textPath>
          </text>
        )}
      </svg>
    </div>
  )
}

export default CurvedLoop
