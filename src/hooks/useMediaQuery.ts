'use client'

import { useEffect, useState } from 'react'

/** Responsive media query hook */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia(query)
    setMatches(mq.matches)

    const handler = (e: MediaQueryListEvent) => setMatches(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [query])

  return matches
}

/** Convenience hook for mobile detection */
export function useIsMobile(): boolean {
  return !useMediaQuery('(min-width: 768px)')
}

/** Convenience hook for desktop detection */
export function useIsDesktop(): boolean {
  return useMediaQuery('(min-width: 1024px)')
}
