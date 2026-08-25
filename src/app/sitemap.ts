import { MetadataRoute } from 'next'
import { servicesData } from '@/lib/repositories/services'
import { projectsData } from '@/lib/repositories/projects'
import { articlesData } from '@/lib/repositories/insights'
import { teamData } from '@/lib/repositories/team'

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
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: currentDate,
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }))

  // Dynamic service routes
  const serviceRoutes = servicesData.map((s) => ({
    url: `${baseUrl}/services/${s.slug}`,
    lastModified: currentDate,
    changeFrequency: 'monthly' as const,
    priority: 0.9,
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

  // Dynamic team routes
  const teamRoutes = teamData.map((t) => ({
    url: `${baseUrl}/team/${t.slug}`,
    lastModified: currentDate,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [
    ...staticRoutes,
    ...serviceRoutes,
    ...projectRoutes,
    ...articleRoutes,
    ...teamRoutes,
  ]
}
