import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { getAdminSession } from '@/lib/auth/session'

export async function GET() {
  const session = await getAdminSession()
  if (!session) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  }

  try {
    const [
      totalLeads,
      newLeads,
      contactedLeads,
      qualifiedLeads,
      wonLeads,
      archivedLeads,
      totalSubscribers,
      allLeads,
    ] = await Promise.all([
      prisma.lead.count(),
      prisma.lead.count({ where: { status: 'NEW' } }),
      prisma.lead.count({ where: { status: 'CONTACTED' } }),
      prisma.lead.count({ where: { status: 'QUALIFIED' } }),
      prisma.lead.count({ where: { status: 'WON' } }),
      prisma.lead.count({ where: { status: 'ARCHIVED' } }),
      prisma.newsletterSubscriber.count({ where: { status: 'ACTIVE' } }),
      prisma.lead.findMany({
        orderBy: { createdAt: 'desc' },
      }),
    ])

    const inProgressLeads = contactedLeads + qualifiedLeads
    const conversionRate = totalLeads > 0 ? Math.round((wonLeads / totalLeads) * 100) : 0

    // Compute service and budget distributions
    const serviceDistribution: Record<string, number> = {}
    const budgetDistribution: Record<string, number> = {}

    allLeads.forEach((lead) => {
      // Services
      try {
        const services: string[] = JSON.parse(lead.services)
        if (Array.isArray(services)) {
          services.forEach((s) => {
            serviceDistribution[s] = (serviceDistribution[s] || 0) + 1
          })
        }
      } catch {
        if (lead.services) {
          serviceDistribution[lead.services] = (serviceDistribution[lead.services] || 0) + 1
        }
      }

      // Budget
      if (lead.budget) {
        budgetDistribution[lead.budget] = (budgetDistribution[lead.budget] || 0) + 1
      }
    })

    // Parsed recent leads for CRM table & pipeline
    const recentLeads = allLeads.slice(0, 10).map((l) => {
      let parsedServices: string[] = []
      try {
        parsedServices = JSON.parse(l.services)
      } catch {
        parsedServices = [l.services]
      }
      return {
        ...l,
        services: parsedServices,
      }
    })

    // ── Compute Dynamic Weekly Volume (Monday to Sunday of the current week) ──
    const now = new Date()
    // Find Monday of current week
    const currentDay = now.getDay() // 0 is Sunday, 1 is Monday...
    const distanceToMonday = (currentDay + 6) % 7
    const monday = new Date(now)
    monday.setDate(now.getDate() - distanceToMonday)
    monday.setHours(0, 0, 0, 0)

    const dayNames = ['L', 'M', 'M', 'J', 'V', 'S', 'D']
    const dayFullNames = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche']

    const weeklyVolume = dayNames.map((letter, index) => {
      const dayStart = new Date(monday)
      dayStart.setDate(monday.getDate() + index)
      const dayEnd = new Date(dayStart)
      dayEnd.setDate(dayStart.getDate() + 1)

      const count = allLeads.filter((l) => {
        const d = new Date(l.createdAt)
        return d >= dayStart && d < dayEnd
      }).length

      const isToday =
        now.getDate() === dayStart.getDate() &&
        now.getMonth() === dayStart.getMonth() &&
        now.getFullYear() === dayStart.getFullYear()

      return {
        day: letter,
        fullName: dayFullNames[index],
        date: `${dayStart.getDate().toString().padStart(2, '0')}/${(dayStart.getMonth() + 1).toString().padStart(2, '0')}`,
        count,
        isToday,
      }
    })

    // Calculate relative heights for weekly chart
    const maxWeeklyCount = Math.max(...weeklyVolume.map((d) => d.count), 1)
    const formattedWeekly = weeklyVolume.map((d) => {
      const pct = d.count > 0 ? Math.max(30, Math.round((d.count / maxWeeklyCount) * 100)) : 15
      return {
        ...d,
        height: `${pct}%`,
        active: d.count > 0,
        highlight: d.isToday ? 'light' : d.count > 0 ? 'dark' : 'none',
      }
    })

    // ── Compute Dynamic Monthly Volume (Last 6 Months) ──
    const monthNames = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sept', 'Oct', 'Nov', 'Déc']
    const monthlyVolume: Array<{
      month: string
      count: number
      height: string
      active: boolean
      highlight: string
    }> = []

    for (let i = 5; i >= 0; i--) {
      const mDate = new Date(now.getFullYear(), now.getMonth() - i, 1)
      const nextMDate = new Date(now.getFullYear(), now.getMonth() - i + 1, 1)
      const count = allLeads.filter((l) => {
        const d = new Date(l.createdAt)
        return d >= mDate && d < nextMDate
      }).length
      monthlyVolume.push({
        month: monthNames[mDate.getMonth()],
        count,
        height: '15%', // will update below
        active: count > 0,
        highlight: i === 0 ? 'light' : count > 0 ? 'dark' : 'none',
      })
    }
    const maxMonthlyCount = Math.max(...monthlyVolume.map((m) => m.count), 1)
    const formattedMonthly = monthlyVolume.map((m) => {
      const pct = m.count > 0 ? Math.max(30, Math.round((m.count / maxMonthlyCount) * 100)) : 15
      return {
        ...m,
        height: `${pct}%`,
      }
    })

    // ── Determine Priority Reminder Lead ──
    // Prioritize leads needing action (NEW first, then CONTACTED with notes, or newest)
    const priorityLead =
      recentLeads.find((l) => l.status === 'NEW') ||
      recentLeads.find((l) => l.status === 'CONTACTED') ||
      recentLeads.find((l) => l.status === 'QUALIFIED') ||
      recentLeads[0] ||
      null

    return NextResponse.json({
      totalLeads,
      newLeads,
      contactedLeads,
      qualifiedLeads,
      wonLeads,
      archivedLeads,
      inProgressLeads,
      conversionRate,
      totalSubscribers,
      serviceDistribution,
      budgetDistribution,
      weeklyVolume: formattedWeekly,
      monthlyVolume: formattedMonthly,
      priorityLead,
      recentLeads,
    })
  } catch (error) {
    console.error('[ADMIN STATS ERROR]', error)
    return NextResponse.json({ error: 'Erreur lors du calcul des statistiques' }, { status: 500 })
  }
}
