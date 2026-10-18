'use client'

import { useEffect, useState } from 'react'
import type { EventThemeConfig } from '@/lib/themes/eventThemeService'

export function useEventTheme() {
  const [activeTheme, setActiveTheme] = useState<EventThemeConfig | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let isMounted = true

    async function fetchActiveTheme() {
      try {
        const res = await fetch('/api/themes/active', {
          cache: 'no-store',
        })
        if (!res.ok) throw new Error('Failed to fetch')
        const data = await res.json()
        if (isMounted) {
          setActiveTheme(data.activeTheme)
        }
      } catch (err) {
        console.error('Failed to load active event theme:', err)
        if (isMounted) {
          // Default fallback
          setActiveTheme(null)
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    fetchActiveTheme()

    return () => {
      isMounted = false
    }
  }, [])

  const isOctobreRoseActive =
    activeTheme?.slug === 'octobre-rose' && activeTheme?.isEnabled === true

  const isHolidayActive =
    activeTheme?.slug === 'holiday-season' && activeTheme?.isEnabled === true

  return {
    activeTheme,
    loading,
    isOctobreRoseActive,
    isHolidayActive,
  }
}
