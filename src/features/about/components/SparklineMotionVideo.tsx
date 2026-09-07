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

    let observer: IntersectionObserver | null = null

    if (typeof IntersectionObserver !== 'undefined') {
      observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            video.play().catch(() => {
              // Browser autoplay policy fallback
              const onInteract = () => {
                video.play().catch(() => {})
                window.removeEventListener('touchstart', onInteract)
                window.removeEventListener('click', onInteract)
              }
              window.addEventListener('touchstart', onInteract, { once: true, passive: true })
              window.addEventListener('click', onInteract, { once: true, passive: true })
            })
          } else {
            // Instantly release GPU decoder when off-screen
            video.pause()
          }
        },
        { rootMargin: '120px 0px', threshold: 0.1 }
      )
      observer.observe(video)
    } else {
      video.play().catch(() => {})
    }

    return () => {
      if (observer) observer.disconnect()
      video.pause()
    }
  }, [])

  return (
    <video
      ref={videoRef}
      loop
      muted
      playsInline
      preload="metadata"
      poster="/video/Sparkline-Motion-poster.webp"
      disablePictureInPicture
      disableRemotePlayback
      className={`w-full h-full object-contain lg:object-cover object-center select-none pointer-events-none ${className}`}
      aria-label="Animation SPARKLINE Motion en boucle"
    >
      {/* ── Ultra-lightweight Mobile 360p (185 KB) ── */}
      <source
        src="/video/Sparkline-Motion-mobile.webm"
        type="video/webm"
        media="(max-width: 767px)"
      />
      <source
        src="/video/Sparkline-Motion-mobile.mp4"
        type="video/mp4"
        media="(max-width: 767px)"
      />

      {/* ── High-Definition Desktop 720p (630 KB / 727 KB) ── */}
      <source src="/video/Sparkline-Motion.webm" type="video/webm" />
      <source src="/video/Sparkline-Motion.mp4" type="video/mp4" />
      Votre navigateur ne supporte pas la lecture de cette vidéo.
    </video>
  )
}
