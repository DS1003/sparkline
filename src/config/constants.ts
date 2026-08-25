// Design tokens and constants

export const EASING = {
  smooth: [0.16, 1, 0.3, 1] as [number, number, number, number],
  smoothCSS: 'cubic-bezier(0.16, 1, 0.3, 1)',
  bounce: [0.34, 1.56, 0.64, 1] as [number, number, number, number],
  expo: [0.87, 0, 0.13, 1] as [number, number, number, number],
  expoCSS: 'cubic-bezier(0.87, 0, 0.13, 1)',
} as const

export const DURATION = {
  fast: 0.3,
  medium: 0.6,
  slow: 1.0,
  xslow: 1.5,
} as const

export const Z_INDEX = {
  behind: -1,
  base: 0,
  content: 10,
  sticky: 20,
  overlay: 30,
  modal: 40,
  preloader: 50,
  toast: 60,
} as const

export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const

export const CONTAINER = {
  maxWidth: '1400px',
  padding: '2rem',
  paddingMobile: '1rem',
} as const

export const SECTION_PADDING = 'clamp(5rem, 10vw, 10rem)'

export const BRAND_YEAR = 2024
