import { NextResponse } from 'next/server'
import { getActiveEventTheme } from '@/lib/themes/eventThemeService'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const activeTheme = await getActiveEventTheme()
    return NextResponse.json(
      { activeTheme },
      {
        headers: {
          'Cache-Control': 'no-store, max-age=0',
        },
      }
    )
  } catch (error) {
    console.error('Failed to get active event theme:', error)
    return NextResponse.json({ activeTheme: null }, { status: 500 })
  }
}
