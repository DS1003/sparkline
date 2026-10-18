import { prisma } from '@/lib/db'

export interface EventThemeConfig {
  id?: string
  slug: string
  name: string
  description?: string | null
  category: 'AWARENESS' | 'HOLIDAY' | 'PROMO' | 'CUSTOM'
  isEnabled: boolean
  badgeText?: string | null
  headline?: string | null
  highlightText?: string | null
  subtext?: string | null
  ribbonIconUrl?: string | null
  accentColor?: string
  showCenterAnim?: boolean
  showNavbarDock?: boolean
  showModal?: boolean
  startDate?: Date | string | null
  endDate?: Date | string | null
}

export const DEFAULT_EVENT_THEMES: EventThemeConfig[] = [
  {
    slug: 'octobre-rose',
    name: 'Octobre Rose',
    description: 'Campagne de sensibilisation au dépistage du cancer du sein (animation centrale, ruban 3D dans la barre de navigation et modale de prévention).',
    category: 'AWARENESS',
    isEnabled: false,
    badgeText: 'OCTOBRE ROSE',
    headline: 'Ensemble, faisons rayonner',
    highlightText: 'la prévention.',
    subtext: 'Mois de sensibilisation au dépistage du cancer du sein.',
    ribbonIconUrl: '/images/heroes/pink-october-ribbon-dock.webp',
    accentColor: '#E11D5A',
    showCenterAnim: true,
    showNavbarDock: true,
    showModal: true,
  },
  {
    slug: 'holiday-season',
    name: 'Fêtes de Fin d’Année & Noël',
    description: 'Ambiance festive avec étincelles dorées, souhaits chaleureux et célébration des réalisations de l’année.',
    category: 'HOLIDAY',
    isEnabled: false,
    badgeText: 'FÊTES DE FIN D’ANNÉE',
    headline: 'Célébrons ensemble',
    highlightText: 'les succès de l’année.',
    subtext: 'Toute l’équipe Sparkline vous souhaite de merveilleuses fêtes et une saison inspirante.',
    ribbonIconUrl: '/images/heroes/holiday-starburst-ornament.webp',
    accentColor: '#D97706',
    showCenterAnim: true,
    showNavbarDock: true,
    showModal: true,
  },
  {
    slug: 'new-year',
    name: 'Nouvel An & Vœux',
    description: 'Célébration du Nouvel An avec perspectives digitales ambitieuses et dynamisme technologique.',
    category: 'HOLIDAY',
    isEnabled: false,
    badgeText: 'NOUVEL AN',
    headline: 'Bâtissons l’avenir',
    highlightText: 'dès aujourd’hui.',
    subtext: 'Plein cap sur vos ambitions digitales et la transformation de vos projets pour cette nouvelle année.',
    ribbonIconUrl: '/images/heroes/pink-october-ribbon-dock.webp',
    accentColor: '#2563EB',
    showCenterAnim: true,
    showNavbarDock: true,
    showModal: true,
  },
  {
    slug: 'black-friday',
    name: 'Cyber Spark / Black Friday',
    description: 'Campagne spéciale d’accélération et opportunités exclusives sur les audits et conceptions de plateformes.',
    category: 'PROMO',
    isEnabled: false,
    badgeText: 'CYBER SPARK',
    headline: 'Accélérez vos projets',
    highlightText: 'à conditions exclusives.',
    subtext: 'Offres limitées sur l’ingénierie digitale, l’audit UX et le prototypage de plateformes.',
    ribbonIconUrl: '/images/heroes/pink-october-ribbon-dock.webp',
    accentColor: '#9333EA',
    showCenterAnim: true,
    showNavbarDock: true,
    showModal: true,
  },
]

// Safely resolve the eventTheme delegate from prisma to satisfy stale IDE language server caches
// while retaining full runtime functionality with Neon PostgreSQL
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getEventThemeDelegate = () => (prisma as any)?.eventTheme

/**
 * Ensures initial default themes are present in the DB
 */
export async function ensureDefaultThemes(): Promise<void> {
  try {
    const delegate = getEventThemeDelegate()
    if (!delegate) return

    const count = await delegate.count()
    if (count === 0) {
      for (const t of DEFAULT_EVENT_THEMES) {
        await delegate.create({
          data: {
            slug: t.slug,
            name: t.name,
            description: t.description,
            category: t.category,
            isEnabled: t.isEnabled,
            badgeText: t.badgeText,
            headline: t.headline,
            highlightText: t.highlightText,
            subtext: t.subtext,
            ribbonIconUrl: t.ribbonIconUrl,
            accentColor: t.accentColor ?? '#E11D5A',
            showCenterAnim: t.showCenterAnim ?? true,
            showNavbarDock: t.showNavbarDock ?? true,
            showModal: t.showModal ?? true,
          },
        })
      }
    }
  } catch (error) {
    console.error('Failed to seed default event themes:', error)
  }
}

/**
 * Returns all configured event themes from DB (or fallback)
 */
export async function getAllEventThemes(): Promise<EventThemeConfig[]> {
  try {
    await ensureDefaultThemes()
    const delegate = getEventThemeDelegate()
    if (delegate) {
      const themes = await delegate.findMany({
        orderBy: { createdAt: 'asc' },
      })
      if (themes && themes.length > 0) {
        return themes as EventThemeConfig[]
      }
    }
  } catch (err) {
    console.error('Error fetching themes from DB, returning defaults:', err)
  }
  return DEFAULT_EVENT_THEMES
}

/**
 * Returns the currently active event theme (if any)
 */
export async function getActiveEventTheme(): Promise<EventThemeConfig | null> {
  try {
    const delegate = getEventThemeDelegate()
    if (delegate) {
      const active = await delegate.findFirst({
        where: { isEnabled: true },
      })
      return (active as EventThemeConfig) ?? null
    }
  } catch (err) {
    console.error('Error querying active theme:', err)
  }
  return null
}

/**
 * Toggles or activates a specific theme.
 * When activating a theme, it can optionally deactivate others to prevent visual conflicts.
 */
export async function toggleEventTheme(
  slug: string,
  enable: boolean,
  exclusive: boolean = true
): Promise<EventThemeConfig | null> {
  try {
    const delegate = getEventThemeDelegate()
    if (!delegate) return null

    if (enable && exclusive) {
      // Disable any other currently enabled theme
      await delegate.updateMany({
        where: { isEnabled: true, slug: { not: slug } },
        data: { isEnabled: false },
      })
    }

    const updated = await delegate.update({
      where: { slug },
      data: { isEnabled: enable },
    })
    return updated as EventThemeConfig
  } catch (err) {
    console.error(`Failed to toggle theme ${slug}:`, err)
    return null
  }
}

/**
 * Updates an existing event theme
 */
export async function updateEventTheme(
  slug: string,
  data: Partial<EventThemeConfig>
): Promise<EventThemeConfig | null> {
  try {
    const delegate = getEventThemeDelegate()
    if (!delegate) return null

    const updated = await delegate.update({
      where: { slug },
      data: {
        name: data.name,
        description: data.description,
        badgeText: data.badgeText,
        headline: data.headline,
        highlightText: data.highlightText,
        subtext: data.subtext,
        accentColor: data.accentColor,
        showCenterAnim: data.showCenterAnim,
        showNavbarDock: data.showNavbarDock,
        showModal: data.showModal,
        startDate: data.startDate ? new Date(data.startDate) : null,
        endDate: data.endDate ? new Date(data.endDate) : null,
      },
    })
    return updated as EventThemeConfig
  } catch (err) {
    console.error(`Failed to update theme ${slug}:`, err)
    return null
  }
}

/**
 * Creates a new event theme
 */
export async function createEventTheme(
  data: Partial<EventThemeConfig> & { name: string; slug: string }
): Promise<EventThemeConfig | null> {
  try {
    const delegate = getEventThemeDelegate()
    if (!delegate) return null

    const created = await delegate.create({
      data: {
        slug: data.slug.toLowerCase().replace(/[^a-z0-9-]/g, '-'),
        name: data.name,
        description: data.description || '',
        category: data.category || 'CUSTOM',
        isEnabled: false,
        badgeText: data.badgeText || data.name.toUpperCase(),
        headline: data.headline || 'Célébrons ensemble',
        highlightText: data.highlightText || 'cet événement.',
        subtext: data.subtext || '',
        accentColor: data.accentColor || '#EB4604',
        showCenterAnim: data.showCenterAnim ?? true,
        showNavbarDock: data.showNavbarDock ?? true,
        showModal: data.showModal ?? true,
      },
    })
    return created as EventThemeConfig
  } catch (err) {
    console.error(`Failed to create theme ${data.slug}:`, err)
    return null
  }
}
