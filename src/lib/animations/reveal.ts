import gsap from 'gsap'
import { EASING, DURATION } from '@/config/constants'

/** Blur-up reveal animation (matching reference site pattern) */
export function createRevealAnimation(
  elements: gsap.TweenTarget,
  options: {
    y?: number
    blur?: number
    duration?: number
    stagger?: number
    delay?: number
  } = {}
) {
  const {
    y = 50,
    blur = 5,
    duration = DURATION.slow,
    stagger = 0.15,
    delay = 0,
  } = options

  return gsap.fromTo(
    elements,
    {
      y,
      opacity: 0,
      filter: `blur(${blur}px)`,
    },
    {
      y: 0,
      opacity: 1,
      filter: 'blur(0px)',
      duration,
      stagger,
      delay,
      ease: EASING.smoothCSS,
    }
  )
}

/** Fade in from below */
export function createFadeUp(
  elements: gsap.TweenTarget,
  options: {
    y?: number
    duration?: number
    stagger?: number
    delay?: number
  } = {}
) {
  const { y = 40, duration = DURATION.medium, stagger = 0.1, delay = 0 } = options

  return gsap.fromTo(
    elements,
    { y, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration,
      stagger,
      delay,
      ease: EASING.smoothCSS,
    }
  )
}

/** Scale reveal */
export function createScaleReveal(
  elements: gsap.TweenTarget,
  options: {
    scale?: number
    duration?: number
    delay?: number
  } = {}
) {
  const { scale = 0.9, duration = DURATION.slow, delay = 0 } = options

  return gsap.fromTo(
    elements,
    { scale, opacity: 0 },
    {
      scale: 1,
      opacity: 1,
      duration,
      delay,
      ease: EASING.smoothCSS,
    }
  )
}
