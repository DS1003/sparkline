import gsap from 'gsap'
import { EASING, DURATION } from '@/config/constants'

/** Animate text characters revealing one by one */
export function createCharReveal(
  container: Element,
  options: {
    duration?: number
    stagger?: number
    delay?: number
    y?: number
  } = {}
) {
  const {
    duration = DURATION.medium,
    stagger = 0.02,
    delay = 0,
    y = 100,
  } = options

  const chars = container.querySelectorAll('.char')
  if (!chars.length) return

  return gsap.fromTo(
    chars,
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

/** Animate text words revealing */
export function createWordReveal(
  container: Element,
  options: {
    duration?: number
    stagger?: number
    delay?: number
    y?: number
    blur?: number
  } = {}
) {
  const {
    duration = DURATION.medium,
    stagger = 0.05,
    delay = 0,
    y = 30,
    blur = 4,
  } = options

  const words = container.querySelectorAll('.word')
  if (!words.length) return

  return gsap.fromTo(
    words,
    { y, opacity: 0, scale: 0.98 },
    {
      y: 0,
      opacity: 1,
      scale: 1,
      duration,
      stagger,
      delay,
      ease: EASING.smoothCSS,
    }
  )
}

/** Animate lines of text revealing */
export function createLineReveal(
  elements: gsap.TweenTarget,
  options: {
    duration?: number
    stagger?: number
    delay?: number
    y?: number
  } = {}
) {
  const {
    duration = DURATION.slow,
    stagger = 0.1,
    delay = 0,
    y = 50,
  } = options

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
