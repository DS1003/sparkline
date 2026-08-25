import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { EASING, DURATION } from '@/config/constants'

gsap.registerPlugin(ScrollTrigger)

/** Create scroll-triggered reveal for elements */
export function createScrollReveal(
  trigger: string | Element,
  elements: gsap.TweenTarget,
  options: {
    y?: number
    blur?: number
    duration?: number
    stagger?: number
    start?: string
    end?: string
    toggleActions?: string
  } = {}
) {
  const {
    y = 50,
    blur = 5,
    duration = DURATION.slow,
    stagger = 0.15,
    start = 'top 85%',
    end = 'bottom 20%',
    toggleActions = 'play none none none',
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
      ease: EASING.smoothCSS,
      scrollTrigger: {
        trigger,
        start,
        end,
        toggleActions,
      },
    }
  )
}

/** Create parallax scroll effect */
export function createParallax(
  element: gsap.TweenTarget,
  trigger: string | Element,
  options: {
    y?: number
    speed?: number
    start?: string
    end?: string
  } = {}
) {
  const {
    y = -100,
    start = 'top bottom',
    end = 'bottom top',
  } = options

  return gsap.to(element, {
    y,
    ease: 'none',
    scrollTrigger: {
      trigger,
      start,
      end,
      scrub: true,
    },
  })
}

/** Create horizontal scroll section */
export function createHorizontalScroll(
  container: string | Element,
  scrollContent: string | Element,
  options: {
    start?: string
    end?: string
  } = {}
) {
  const { start = 'top top', end } = options

  const scrollElement = typeof scrollContent === 'string'
    ? document.querySelector(scrollContent)
    : scrollContent

  if (!scrollElement) return

  const scrollWidth = (scrollElement as HTMLElement).scrollWidth - window.innerWidth

  return gsap.to(scrollContent, {
    x: -scrollWidth,
    ease: 'none',
    scrollTrigger: {
      trigger: container,
      start,
      end: end || `+=${scrollWidth}`,
      scrub: 1,
      pin: true,
      anticipatePin: 1,
    },
  })
}
