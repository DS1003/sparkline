'use client'

import React, { useRef, useEffect } from 'react'

interface SparklineMotionVideoProps {
  className?: string
}

export function SparklineMotionVideo({ className = '' }: SparklineMotionVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    video.defaultMuted = true
    video.muted = true

    const playPromise = video.play()
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Autoplay policy fallback: re-attempt play on first user interaction if blocked
        const handleUserInteraction = () => {
          video.play().catch(() => {})
          window.removeEventListener('touchstart', handleUserInteraction)
          window.removeEventListener('click', handleUserInteraction)
        }
        window.addEventListener('touchstart', handleUserInteraction, { once: true, passive: true })
        window.addEventListener('click', handleUserInteraction, { once: true, passive: true })
      })
    }
  }, [])

  return (
    <video
      ref={videoRef}
      autoPlay
      loop
      muted
      playsInline
      preload="auto"
      poster="/video/Sparkline-Motion-poster.webp"
      className={`w-full h-full object-cover select-none pointer-events-none ${className}`}
      aria-label="Animation SPARKLINE Motion en boucle"
    >
      <source src="/video/Sparkline-Motion.mp4" type="video/mp4" />
      Votre navigateur ne supporte pas la lecture de cette vidéo.
    </video>
  )
}
