import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { getAdminSession } from '@/lib/auth/session'
import {
  getAllEventThemes,
  toggleEventTheme,
  updateEventTheme,
  createEventTheme,
  ensureDefaultThemes,
} from '@/lib/themes/eventThemeService'

export const dynamic = 'force-dynamic'

export async function GET() {
  const session = await getAdminSession()
  if (!session) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  }

  try {
    const themes = await getAllEventThemes()
    return NextResponse.json({ themes })
  } catch (error) {
    console.error('Error in GET /api/admin/themes:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des thèmes' },
      { status: 500 }
    )
  }
}

export async function POST(req: NextRequest) {
  const session = await getAdminSession()
  if (!session) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  }

  try {
    const body = await req.json()
    const { action, slug, isEnabled, data } = body

    await ensureDefaultThemes()

    if (action === 'toggle') {
      if (!slug || typeof isEnabled !== 'boolean') {
        return NextResponse.json({ error: 'Paramètres manquants' }, { status: 400 })
      }

      const updated = await toggleEventTheme(slug, isEnabled, true)
      const allThemes = await getAllEventThemes()

      revalidatePath('/')
      revalidatePath('/admin/themes')

      return NextResponse.json({
        success: true,
        updated,
        themes: allThemes,
      })
    }

    if (action === 'update') {
      if (!slug || !data) {
        return NextResponse.json({ error: 'Paramètres manquants' }, { status: 400 })
      }

      const updated = await updateEventTheme(slug, data)
      const allThemes = await getAllEventThemes()

      revalidatePath('/')
      revalidatePath('/admin/themes')

      return NextResponse.json({
        success: true,
        updated,
        themes: allThemes,
      })
    }

    if (action === 'create') {
      if (!data?.name || !data?.slug) {
        return NextResponse.json({ error: 'Nom et identifiant requis' }, { status: 400 })
      }

      const created = await createEventTheme(data)
      const allThemes = await getAllEventThemes()

      revalidatePath('/')
      revalidatePath('/admin/themes')

      return NextResponse.json({
        success: true,
        created,
        themes: allThemes,
      })
    }

    return NextResponse.json({ error: 'Action inconnue' }, { status: 400 })
  } catch (error) {
    console.error('Error in POST /api/admin/themes:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la mise à jour du thème' },
      { status: 500 }
    )
  }
}
