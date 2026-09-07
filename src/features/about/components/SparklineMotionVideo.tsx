'use client'

import React, { useRef, useEffect, useState } from 'react'

interface SparklineMotionVideoProps {
  className?: string
}

export function SparklineMotionVideo({ className = '' }: SparklineMotionVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [shouldLoad, setShouldLoad] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    let observer: IntersectionObserver | null = null

    if (typeof IntersectionObserver !== 'undefined') {
      observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setShouldLoad(true)
            video.play().catch(() => {})
          } else {
            video.pause()
          }
        },
        { rootMargin: '250px 0px' }
      )
      observer.observe(video)
    } else {
      setShouldLoad(true)
    }

    return () => {
      if (observer) observer.disconnect()
    }
  }, [])

  useEffect(() => {
    const video = videoRef.current
    if (!video || !shouldLoad) return

    video.defaultMuted = true
    video.muted = true

    const playPromise = video.play()
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        const handleUserInteraction = () => {
          video.play().catch(() => {})
          window.removeEventListener('touchstart', handleUserInteraction)
          window.removeEventListener('click', handleUserInteraction)
        }
        window.addEventListener('touchstart', handleUserInteraction, { once: true, passive: true })
        window.addEventListener('click', handleUserInteraction, { once: true, passive: true })
      })
    }
  }, [shouldLoad])

  return (
    <video
      ref={videoRef}
      loop
      muted
      playsInline
      preload="none"
      poster="/video/Sparkline-Motion-poster.webp"
      className={`w-full h-full object-contain lg:object-cover object-center select-none pointer-events-none ${className}`}
      aria-label="Animation SPARKLINE Motion en boucle"
    >
      {shouldLoad && <source src="/video/Sparkline-Motion.mp4" type="video/mp4" />}
      Votre navigateur ne supporte pas la lecture de cette vidéo.
    </video>
  )
}
