import { MetadataRoute } from 'next'
import { projectsData } from '@/lib/repositories/projects'
import { articlesData } from '@/lib/repositories/insights'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://sparklinesn.com'
  const currentDate = new Date()

  // Static routes
  const staticRoutes = [
    '',
    '/about',
    '/services',
    '/projects',
    '/sparklearn',
    '/sparklearn/masterclasses',
    '/sparklearn/formations',
    '/team',
    '/insights',
    '/careers',
    '/contact',
    '/privacy',
    '/terms',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: currentDate,
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }))

  // Dynamic project routes
  const projectRoutes = projectsData.map((p) => ({
    url: `${baseUrl}/projects/${p.slug}`,
    lastModified: currentDate,
    changeFrequency: 'monthly' as const,
    priority: 0.85,
  }))

  // Dynamic insight routes
  const articleRoutes = articlesData.map((a) => ({
    url: `${baseUrl}/insights/${a.slug}`,
    lastModified: currentDate,
    changeFrequency: 'monthly' as const,
    priority: 0.75,
  }))

  return [
    ...staticRoutes,
    ...projectRoutes,
    ...articleRoutes,
  ]
}
