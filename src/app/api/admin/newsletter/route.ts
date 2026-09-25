import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { getAdminSession } from '@/lib/auth/session'

// GET: Fetch list of newsletter subscribers or export as CSV + metrics & analytics
export async function GET(req: NextRequest) {
  const session = await getAdminSession()
  if (!session) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  }

  const { searchParams } = new URL(req.url)
  const isExport = searchParams.get('export') === 'csv'
  const search = searchParams.get('search')
  const status = searchParams.get('status')
  const source = searchParams.get('source')
  const dateRange = searchParams.get('dateRange') // 'all' | '7days' | '30days' | 'month'

  const where: Record<string, unknown> = {}
  if (search && search.trim().length > 0) {
    where.email = { contains: search.toLowerCase().trim() }
  }
  if (status && status !== 'ALL') {
    where.status = status
  }
  if (source && source !== 'ALL') {
    if (source === 'website' || source === 'footer') {
      where.source = { in: ['footer', 'website', 'site'] }
    } else {
      where.source = source
    }
  }

  const now = new Date()
  if (dateRange === '7days') {
    const d = new Date()
    d.setDate(d.getDate() - 7)
    where.createdAt = { gte: d }
  } else if (dateRange === '30days') {
    const d = new Date()
    d.setDate(d.getDate() - 30)
    where.createdAt = { gte: d }
  } else if (dateRange === 'month') {
    const d = new Date(now.getFullYear(), now.getMonth(), 1)
    where.createdAt = { gte: d }
  }

  if (isExport) {
    const subscribers = await prisma.newsletterSubscriber.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    })

    const csvRows = [
      ['ID', 'E-mail', 'Source', 'Statut', "Date d'inscription"],
      ...subscribers.map((s) => [
        s.id,
        s.email,
        s.source === 'sparklearn' ? 'SPARKlearn' : 'Site Web',
        s.status === 'ACTIVE' ? 'Actif' : 'Désinscrit',
        new Date(s.createdAt).toISOString(),
      ]),
    ]

    const csvString = csvRows
      .map((row) => row.map((val) => `"${String(val).replace(/"/g, '""')}"`).join(','))
      .join('\n')

    return new NextResponse(csvString, {
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="sparkline_newsletter_${new Date().toISOString().split('T')[0]}.csv"`,
      },
    })
  }

  const page = Math.max(1, parseInt(searchParams.get('page') || '1', 10))
  const limit = Math.max(1, parseInt(searchParams.get('limit') || '10', 10))
  const skip = (page - 1) * limit

  // Start of this month and last month
  const startOfThisMonth = new Date(now.getFullYear(), now.getMonth(), 1)
  const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1)
  const endOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0, 23, 59, 59, 999)

  const [
    total,
    subscribers,
    allTotal,
    activeTotal,
    sparklearnTotal,
    newThisMonth,
    newLastMonth,
    allSubscribersList,
  ] = await Promise.all([
    prisma.newsletterSubscriber.count({ where }),
    prisma.newsletterSubscriber.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      skip,
      take: limit,
    }),
    prisma.newsletterSubscriber.count(),
    prisma.newsletterSubscriber.count({ where: { status: 'ACTIVE' } }),
    prisma.newsletterSubscriber.count({ where: { source: 'sparklearn' } }),
    prisma.newsletterSubscriber.count({ where: { createdAt: { gte: startOfThisMonth } } }),
    prisma.newsletterSubscriber.count({
      where: {
        createdAt: {
          gte: startOfLastMonth,
          lte: endOfLastMonth,
        },
      },
    }),
    prisma.newsletterSubscriber.findMany({
      select: { createdAt: true, source: true },
      orderBy: { createdAt: 'asc' },
    }),
  ])

  const websiteTotal = Math.max(0, allTotal - sparklearnTotal)

  // Compute 7-day growth curve (daily timeline)
  const days = 7
  const timeline: Array<{
    date: string
    dayLabel: string
    cumulative: number
    newSignups: number
  }> = []

  for (let i = days - 1; i >= 0; i--) {
    const d = new Date()
    d.setDate(d.getDate() - i)
    d.setHours(23, 59, 59, 999)

    const startOfDay = new Date(d)
    startOfDay.setHours(0, 0, 0, 0)

    const cumulative = allSubscribersList.filter((s) => new Date(s.createdAt) <= d).length
    const newSignups = allSubscribersList.filter((s) => {
      const created = new Date(s.createdAt)
      return created >= startOfDay && created <= d
    }).length

    const dayLabel = d.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'short',
    })

    timeline.push({
      date: d.toISOString().split('T')[0],
      dayLabel,
      cumulative,
      newSignups,
    })
  }

  // Monthly growth percent
  let monthlyGrowthPercent = 0
  if (newLastMonth === 0 && newThisMonth > 0) {
    monthlyGrowthPercent = 100
  } else if (newLastMonth > 0) {
    monthlyGrowthPercent = Math.round(((newThisMonth - newLastMonth) / newLastMonth) * 100)
  }

  // Retention
  const retentionPercent = allTotal > 0 ? Math.round((activeTotal / allTotal) * 100) : 100

  // Breakdown percentages
  const websitePercent = allTotal > 0 ? Math.round((websiteTotal / allTotal) * 100) : 0
  const sparklearnPercent = allTotal > 0 ? Math.round((sparklearnTotal / allTotal) * 100) : 0

  return NextResponse.json({
    subscribers,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit) || 1,
    metrics: {
      allTotal,
      activeTotal,
      retentionPercent,
      newThisMonth,
      monthlyGrowthPercent,
      sparklearnTotal,
      websiteTotal,
      websitePercent,
      sparklearnPercent,
    },
    timeline,
  })
}

// PATCH: Toggle subscriber status (ACTIVE / UNSUBSCRIBED)
export async function PATCH(req: NextRequest) {
  const session = await getAdminSession()
  if (!session) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  }

  try {
    const body = await req.json()
    const { id, status } = body

    if (!id || !status) {
      return NextResponse.json({ error: 'ID et statut requis' }, { status: 400 })
    }

    const updated = await prisma.newsletterSubscriber.update({
      where: { id },
      data: { status },
    })

    return NextResponse.json({ success: true, subscriber: updated })
  } catch (error) {
    console.error('[ADMIN NEWSLETTER PATCH ERROR]', error)
    return NextResponse.json({ error: 'Impossible de mettre à jour le statut' }, { status: 500 })
  }
}

// DELETE: Remove a contact
export async function DELETE(req: NextRequest) {
  const session = await getAdminSession()
  if (!session) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  }

  const { searchParams } = new URL(req.url)
  const id = searchParams.get('id')

  if (!id) {
    return NextResponse.json({ error: 'ID requis' }, { status: 400 })
  }

  try {
    await prisma.newsletterSubscriber.delete({
      where: { id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[ADMIN NEWSLETTER DELETE ERROR]', error)
    return NextResponse.json({ error: 'Impossible de supprimer l’abonné' }, { status: 500 })
  }
}
