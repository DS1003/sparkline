'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import {
  ArrowUpRight,
  Plus,
  Layers,
  Smartphone,
  Code2,
  Trophy,
  Clock,
  ExternalLink,
  ChevronRight,
  RefreshCw,
  BarChart2,
  Bell,
  Users,
  TrendingUp,
  Workflow,
  Mail,
  Check,
  PieChart,
} from 'lucide-react'
import { DashboardSkeleton } from '@/components/admin/Skeletons'
import { notify } from '@/lib/notify'

interface VolumeBar {
  day?: string
  fullName?: string
  month?: string
  date?: string
  count: number
  height: string
  active: boolean
  highlight: string
  isToday?: boolean
}

interface PriorityLead {
  id: string
  name: string
  company: string | null
  phone: string | null
  email: string
  services: string[]
  internalNotes: string | null
  preferredDate: string | null
  status: string
}

interface StatsData {
  totalLeads: number
  newLeads: number
  contactedLeads: number
  qualifiedLeads: number
  wonLeads: number
  archivedLeads: number
  inProgressLeads: number
  conversionRate: number
  totalSubscribers: number
  serviceDistribution: Record<string, number>
  budgetDistribution: Record<string, number>
  weeklyVolume: VolumeBar[]
  monthlyVolume: VolumeBar[]
  priorityLead: PriorityLead | null
  recentLeads: Array<{
    id: string
    name: string
    email: string
    company: string | null
    phone: string | null
    services: string[]
    budget: string | null
    status: string
    createdAt: string
    message: string
    internalNotes: string | null
    preferredDate: string | null
  }>
}

export default function AdminDashboardPage() {
  const [data, setData] = useState<StatsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [volumePeriod, setVolumePeriod] = useState<'week' | 'month'>('week')

  const fetchStats = async () => {
    try {
      const res = await fetch('/api/admin/stats')
      if (res.ok) {
        const json = await res.json()
        setData(json)
      }
    } catch (e) {
      console.error('Failed to load stats', e)
    } finally {
      setLoading(false)
      setIsRefreshing(false)
    }
  }

  useEffect(() => {
    fetchStats()
  }, [])

  const handleRefresh = async () => {
    setIsRefreshing(true)
    await fetchStats()
    setIsRefreshing(false)
    notify.success('Tableau de bord actualisé')
  }

  if (loading) {
    return <DashboardSkeleton />
  }

  const totalLeads = data?.totalLeads || 0
  const newLeads = data?.newLeads || 0
  const wonLeads = data?.wonLeads || 0
  const inProgressLeads = data?.inProgressLeads || 0
  const conversionRate = data?.conversionRate || 0
  const currentBars = volumePeriod === 'week' ? (data?.weeklyVolume || []) : (data?.monthlyVolume || [])
  const maxBarCount = Math.max(...currentBars.map((b) => b.count), 3)

  // Service distribution entries
  const serviceEntries = Object.entries(data?.serviceDistribution || {}).sort((a, b) => b[1] - a[1])
  const totalServiceDemands = serviceEntries.reduce((acc, [, count]) => acc + count, 0)

  // Dynamic Priority Lead and Recent Leads from DB
  const priorityLead = data?.priorityLead || null
  const recentLeads = data?.recentLeads || []

  return (
    <div className="space-y-6">
      {/* ── Title Bar ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
        <div>
          <h1
            className="text-xl sm:text-3xl font-bold tracking-tight text-[#0E1217]"
            style={{ fontFamily: 'var(--font-family--primary-font)' }}
          >
            Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500 font-normal mt-0.5">
            Planifiez, priorisez et convertissez vos opportunités en temps réel.
          </p>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
          <Link
            href="/admin/leads"
            className="inline-flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full bg-[#0B0F17] hover:bg-neutral-800 text-white text-xs font-semibold shadow-2xs transition-all cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5 text-white" />
            <span>Gérer les leads</span>
          </Link>
          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-full bg-white hover:bg-neutral-50 border border-neutral-200/90 text-neutral-700 text-xs font-semibold shadow-2xs transition-all cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-[#EB4604]' : 'text-neutral-500'}`} />
            <span>Actualiser</span>
          </button>
        </div>
      </div>

      {/* ── Top Metric Cards Row (Responsive 1/2/4 columns) ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-2.5 sm:gap-4">
        {/* Card 1: Total Demandes */}
        <div className="rounded-2xl sm:rounded-[24px] bg-[#0B0F17] text-white p-3.5 sm:p-5 flex flex-col justify-between relative overflow-hidden shadow-xs group min-h-[130px] sm:min-h-[145px]">
          {/* Subtle Organic Wave Lines in background */}
          <div className="absolute inset-0 opacity-20 pointer-events-none">
            <svg viewBox="0 0 200 200" className="w-full h-full" preserveAspectRatio="none">
              <path d="M0,100 C50,40 100,160 200,100" fill="none" stroke="#EB4604" strokeWidth="2.5" />
              <path d="M0,120 C60,60 120,180 200,120" fill="none" stroke="#EB4604" strokeWidth="1.8" />
              <path d="M0,80 C40,20 80,140 200,80" fill="none" stroke="#EB4604" strokeWidth="1.2" />
            </svg>
          </div>

          <div className="relative z-10 flex items-center justify-between">
            <span className="text-[11px] sm:text-xs font-medium text-neutral-300 truncate">Total Demandes</span>
            <Link
              href="/admin/leads"
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-transform group-hover:scale-105 shrink-0"
            >
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="relative z-10 my-1 sm:my-2">
            <div className="text-2xl sm:text-4xl font-bold tracking-tight text-white">{totalLeads}</div>
          </div>

          <div className="relative z-10 flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-black/40 border border-white/10 text-[10px] sm:text-xs font-mono text-neutral-300 truncate">
              <span className="w-1.5 h-1.5 rounded-full bg-[#EB4604] shrink-0" />
              <span className="truncate">{totalLeads > 0 ? `${totalLeads} dossier${totalLeads > 1 ? 's' : ''}` : 'En attente'}</span>
            </span>
          </div>
        </div>

        {/* Card 2: Projets Gagnés */}
        <div className="rounded-2xl sm:rounded-[24px] bg-white border border-neutral-200/80 p-3.5 sm:p-5 flex flex-col justify-between shadow-xs transition-all hover:border-neutral-300 group min-h-[130px] sm:min-h-[145px]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 sm:gap-2.5 min-w-0">
              <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-xl bg-emerald-50 border border-emerald-100/80 flex items-center justify-center text-emerald-600 shrink-0">
                <Trophy className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </div>
              <span className="text-[11px] sm:text-xs font-semibold text-neutral-700 truncate">Gagnés</span>
            </div>
            <Link
              href="/admin/leads?status=WON"
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-neutral-200 text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900 flex items-center justify-center transition-transform group-hover:scale-105 shrink-0"
            >
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="my-1 sm:my-2">
            <div className="text-2xl sm:text-4xl font-bold tracking-tight text-[#0E1217]">{wonLeads}</div>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-emerald-50 text-[10px] sm:text-xs font-semibold text-emerald-700 border border-emerald-200/60 font-mono truncate">
              {conversionRate}% conversion
            </span>
          </div>
        </div>

        {/* Card 3: En Négociation */}
        <div className="rounded-2xl sm:rounded-[24px] bg-white border border-neutral-200/80 p-3.5 sm:p-5 flex flex-col justify-between shadow-xs transition-all hover:border-neutral-300 group min-h-[130px] sm:min-h-[145px]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 sm:gap-2.5 min-w-0">
              <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-xl bg-blue-50 border border-blue-100/80 flex items-center justify-center text-blue-600 shrink-0">
                <Layers className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </div>
              <span className="text-[11px] sm:text-xs font-semibold text-neutral-700 truncate">Négociation</span>
            </div>
            <Link
              href="/admin/leads?status=QUALIFIED"
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-neutral-200 text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900 flex items-center justify-center transition-transform group-hover:scale-105 shrink-0"
            >
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="my-1 sm:my-2">
            <div className="text-2xl sm:text-4xl font-bold tracking-tight text-[#0E1217]">{inProgressLeads}</div>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-blue-50 text-[10px] sm:text-xs font-semibold text-blue-700 border border-blue-200/60 font-mono truncate">
              {inProgressLeads} qualifiés
            </span>
          </div>
        </div>

        {/* Card 4: À Traiter */}
        <div className="rounded-2xl sm:rounded-[24px] bg-white border border-neutral-200/80 p-3.5 sm:p-5 flex flex-col justify-between shadow-xs transition-all hover:border-neutral-300 group min-h-[130px] sm:min-h-[145px]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 sm:gap-2.5 min-w-0">
              <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-xl bg-orange-50 border border-orange-100/80 flex items-center justify-center text-[#EB4604] shrink-0">
                <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </div>
              <span className="text-[11px] sm:text-xs font-semibold text-neutral-700 truncate">À Traiter</span>
            </div>
            <Link
              href="/admin/leads?status=NEW"
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-neutral-200 text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900 flex items-center justify-center transition-transform group-hover:scale-105 shrink-0"
            >
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="my-1 sm:my-2">
            <div className="text-2xl sm:text-4xl font-bold tracking-tight text-[#EB4604]">{newLeads}</div>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-orange-50 text-[10px] sm:text-xs font-semibold text-[#EB4604] border border-orange-200/60 font-mono truncate">
              {newLeads} nouveau{newLeads > 1 ? 'x' : ''}
            </span>
          </div>
        </div>
      </div>

      {/* ── Middle Bento Grid (Responsive 1 / 2 / 3 Columns) ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-[1.25fr_1fr_1fr] gap-4 sm:gap-5">
        {/* Column 1: Volume des Demandes Bar Chart (Spans 2 cols on lg, 1 on xl) */}
        <div className="rounded-2xl sm:rounded-[24px] bg-white border border-neutral-200/80 p-4 sm:p-6 flex flex-col justify-between shadow-xs lg:col-span-2 xl:col-span-1 min-w-0 overflow-hidden">
          <div className="flex items-center justify-between gap-2 mb-4">
            <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
              <BarChart2 className="w-4 h-4 text-neutral-900 shrink-0" />
              <div className="min-w-0">
                <h2 className="text-sm sm:text-base font-bold text-[#0E1217] truncate">Volume des Demandes</h2>
                <p className="text-[11px] sm:text-xs text-neutral-400 font-normal mt-0.5 truncate">
                  {volumePeriod === 'week' ? 'Activité sur la semaine en cours' : 'Historique des 6 derniers mois'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-0.5 sm:gap-1 bg-neutral-100 p-1 rounded-full text-[11px] sm:text-xs font-medium text-neutral-600 shrink-0">
              <button
                onClick={() => setVolumePeriod('week')}
                className={`px-2.5 sm:px-3 py-1 rounded-full transition-all cursor-pointer ${volumePeriod === 'week'
                  ? 'bg-[#0B0F17] text-white font-semibold shadow-2xs'
                  : 'text-neutral-500 hover:text-neutral-900'
                  }`}
              >
                Semaine
              </button>
              <button
                onClick={() => setVolumePeriod('month')}
                className={`px-2.5 sm:px-3 py-1 rounded-full transition-all cursor-pointer ${volumePeriod === 'month'
                  ? 'bg-[#0B0F17] text-white font-semibold shadow-2xs'
                  : 'text-neutral-500 hover:text-neutral-900'
                  }`}
              >
                Mois
              </button>
            </div>
          </div>

          {/* Chart with Y-axis grid and clean floating counts */}
          <div className="relative flex items-stretch h-48 pt-2 w-full">
            {/* Y-Axis labels */}
            <div className="flex flex-col justify-between text-[11px] font-mono text-neutral-400 pr-2 sm:pr-3 pb-8 select-none shrink-0">
              <span>{maxBarCount}</span>
              <span>{Math.round((maxBarCount * 2) / 3)}</span>
              <span>{Math.max(1, Math.round(maxBarCount / 3))}</span>
              <span>0</span>
            </div>

            {/* Grid & Bars Container */}
            <div className="flex-1 relative flex flex-col justify-between w-full">
              {/* Horizontal dashed guide lines */}
              <div className="absolute inset-x-0 top-1 border-b border-dashed border-neutral-100 pointer-events-none" />
              <div className="absolute inset-x-0 top-[33%] border-b border-dashed border-neutral-100 pointer-events-none" />
              <div className="absolute inset-x-0 top-[66%] border-b border-dashed border-neutral-100 pointer-events-none" />
              <div className="absolute inset-x-0 bottom-8 border-b border-neutral-200/60 pointer-events-none" />

              {/* Bars Row */}
              <div className="flex-1 flex items-end justify-between gap-1.5 sm:gap-2.5 pb-8 px-1 sm:px-2 z-10">
                {currentBars.map((bar, idx) => {
                  const isFriday = bar.day === 'V' || bar.isToday
                  const isZero = bar.count === 0
                  const barHeightPx =
                    bar.count === 1
                      ? 48
                      : bar.count === 2
                      ? 85
                      : Math.min(115, Math.max(48, Math.round((bar.count / maxBarCount) * 110)))
                  return (
                    <div key={idx} className="flex flex-col items-center flex-1 h-full justify-end group/bar relative">
                      {/* Tooltip on hover */}
                      <div className="absolute -top-7 opacity-0 group-hover/bar:opacity-100 transition-opacity pointer-events-none z-20 whitespace-nowrap">
                        <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[#0B0F17] text-white shadow-xs">
                          {bar.count} demande{bar.count > 1 ? 's' : ''} {bar.date ? `(${bar.date})` : ''}
                        </span>
                      </div>

                      {/* Number floating directly above bar */}
                      {bar.count > 0 ? (
                        <span className="text-[11px] sm:text-xs font-bold text-neutral-900 mb-1.5 select-none">
                          {bar.count}
                        </span>
                      ) : (
                        <span className="text-xs font-bold text-transparent mb-1.5 select-none">-</span>
                      )}

                      {/* Capsule Bar */}
                      <div className="w-full max-w-[28px] sm:max-w-[32px] flex items-end justify-center">
                        {isZero ? (
                          <div className="w-full h-6 rounded-2xl border border-dashed border-neutral-300 bg-neutral-100/60" />
                        ) : (
                          <div
                            style={{
                              height: `${barHeightPx}px`,
                            }}
                            className={`w-full rounded-2xl transition-all duration-500 shadow-2xs ${isFriday ? 'bg-[#EB4604]' : 'bg-[#0B0F17]'
                              }`}
                          />
                        )}
                      </div>

                      {/* Day / Month label below axis */}
                      <span className="text-[11px] sm:text-xs font-semibold text-neutral-500 font-mono absolute -bottom-6">
                        {bar.day || bar.month}
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Column 2: Rappels Prioritaires */}
        <div className="rounded-2xl sm:rounded-[24px] bg-white border border-neutral-200/80 p-4 sm:p-6 flex flex-col justify-between shadow-xs">
          {priorityLead ? (
            <>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-orange-50 text-[#EB4604] flex items-center justify-center">
                      <Bell className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-xs font-bold tracking-wider text-neutral-400 uppercase font-mono">
                      Rappels Prioritaires
                    </span>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-orange-50 text-[#EB4604] border border-orange-200/60">
                    {priorityLead.status === 'NEW' ? 'À qualifier' : 'En cours'}
                  </span>
                </div>

                <h3 className="text-base font-bold text-[#0E1217] leading-snug mt-3">
                  Cadrage avec {priorityLead.name}
                </h3>
                <p className="text-xs text-neutral-400 mt-0.5 font-mono">
                  Échéance : {priorityLead.preferredDate || 'Dès que possible'}
                </p>
              </div>

              <div className="my-3 p-3.5 rounded-2xl bg-neutral-50 border border-neutral-100 flex flex-col justify-between">
                <span className="text-[10px] font-mono text-neutral-400 uppercase font-bold tracking-wider">
                  Projet ciblé :
                </span>
                <div className="flex items-center justify-between mt-1">
                  <p className="text-xs font-semibold text-neutral-800">
                    {priorityLead.services?.[0] || 'Applications & Solutions'}
                  </p>
                  <Link href={`/admin/leads?id=${priorityLead.id}`} title="Voir le projet">
                    <ExternalLink className="w-3.5 h-3.5 text-neutral-400 hover:text-neutral-700 transition-colors" />
                  </Link>
                </div>
              </div>

              {priorityLead.phone ? (
                <a
                  href={`https://wa.me/${priorityLead.phone.replace(/[^0-9]/g, '')}?text=Bonjour%20${encodeURIComponent(
                    priorityLead.name
                  )},%20je%20suis%20ravi%20d'%C3%A9changer%20avec%20vous%20suite%20%C3%A0%20votre%20demande%20sur%20SPARKLINE.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 rounded-xl bg-[#05B361] hover:bg-[#049651] text-white text-xs font-bold flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                  </svg>
                  <span>Contacter sur WhatsApp</span>
                </a>
              ) : (
                <Link
                  href={`/admin/leads?id=${priorityLead.id}`}
                  className="w-full py-3 px-4 rounded-xl bg-[#0B0F17] hover:bg-neutral-800 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer"
                >
                  <Mail className="w-4 h-4" />
                  <span>Traiter le lead ({priorityLead.email})</span>
                </Link>
              )}
            </>
          ) : (
            <div className="my-auto py-8 text-center space-y-2">
              <div className="w-10 h-10 rounded-2xl bg-orange-50 text-[#EB4604] mx-auto flex items-center justify-center">
                <Check className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-neutral-800">Aucun rappel urgent</h3>
              <p className="text-xs text-neutral-400">Tous vos prospects sont pris en charge.</p>
            </div>
          )}
        </div>

        {/* Column 3: Pipeline & Devis */}
        <div className="rounded-2xl sm:rounded-[24px] bg-white border border-neutral-200/80 p-4 sm:p-6 flex flex-col justify-between shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Workflow className="w-4 h-4 text-neutral-900" />
              <h2 className="text-base font-bold text-[#0E1217]">Pipeline & Devis</h2>
            </div>
            <Link
              href="/admin/leads"
              className="px-2.5 sm:px-3 py-1 rounded-full border border-neutral-200/70 text-[11px] sm:text-xs font-semibold text-neutral-700 hover:bg-neutral-50 transition-colors"
            >
              + Voir tout
            </Link>
          </div>

          <div className="space-y-2">
            {recentLeads.length > 0 ? (
              recentLeads.slice(0, 3).map((lead) => {
                const srv = lead.services?.[0] || 'Opportunité'
                const isMobile = srv.toLowerCase().includes('mobile') || srv.toLowerCase().includes('app')
                const isDesign = srv.toLowerCase().includes('design') || srv.toLowerCase().includes('identité')
                return (
                  <Link
                    key={lead.id}
                    href={`/admin/leads?id=${lead.id}`}
                    className="flex items-center justify-between p-2 rounded-2xl hover:bg-neutral-50 transition-all group/item cursor-pointer"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div
                        className={`w-9 h-9 rounded-xl border flex items-center justify-center shrink-0 ${
                          isDesign
                            ? 'bg-blue-50 border-blue-100 text-blue-600'
                            : 'bg-orange-50 border-orange-100 text-[#EB4604]'
                        }`}
                      >
                        {isMobile ? (
                          <Smartphone className="w-4 h-4" />
                        ) : isDesign ? (
                          <Layers className="w-4 h-4" />
                        ) : (
                          <Workflow className="w-4 h-4" />
                        )}
                      </div>
                      <div className="min-w-0">
                        <h4 className="text-xs font-bold text-neutral-900 truncate group-hover/item:text-[#EB4604] transition-colors">
                          {srv}
                        </h4>
                        <p className="text-[11px] text-neutral-400 truncate">
                          {lead.name} • {lead.budget || 'Budget à qualifier'}
                        </p>
                      </div>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 text-neutral-300 group-hover/item:text-neutral-700 shrink-0 transition-colors" />
                  </Link>
                )
              })
            ) : (
              <div className="py-8 text-center text-xs text-neutral-400">
                Aucun lead dans le pipeline actuellement.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Bottom Bento Grid (Responsive 1 / 2 / 3 Columns) ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-[1.25fr_1fr_1fr] gap-4 sm:gap-5">
        {/* Column 1: Dernières Demandes Table (Spans 2 cols on lg, 1 on xl) */}
        <div className="rounded-2xl sm:rounded-[24px] bg-white border border-neutral-200/80 p-4 sm:p-6 flex flex-col justify-between shadow-xs lg:col-span-2 xl:col-span-1 min-w-0 overflow-hidden">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-neutral-900" />
              <h2 className="text-base font-bold text-[#0E1217]">Dernières Demandes</h2>
            </div>
            <Link
              href="/admin/leads"
              className="px-2.5 sm:px-3 py-1 rounded-full border border-neutral-200/80 text-[11px] sm:text-xs font-semibold text-neutral-700 hover:bg-neutral-50 transition-colors"
            >
              + Ouvrir CRM
            </Link>
          </div>

          <div className="space-y-2.5 sm:space-y-3">
            {recentLeads.length > 0 ? (
              recentLeads.slice(0, 4).map((lead) => {
                const initial = (lead.name || 'L').charAt(0).toUpperCase()
                const srv = lead.services?.[0] || 'Projet numérique'
                const statusMeta =
                  lead.status === 'NEW'
                    ? { label: 'Nouveau', bg: 'bg-orange-50 text-[#EB4604] border-orange-200/60' }
                    : lead.status === 'CONTACTED'
                    ? { label: 'Contacté', bg: 'bg-amber-50 text-amber-700 border-amber-200/60' }
                    : lead.status === 'QUALIFIED'
                    ? { label: 'Qualifié', bg: 'bg-blue-50 text-blue-700 border-blue-200/60' }
                    : lead.status === 'WON'
                    ? { label: 'Gagné', bg: 'bg-emerald-50 text-emerald-700 border-emerald-200/60' }
                    : { label: 'Archivé', bg: 'bg-neutral-100 text-neutral-500 border-neutral-200/60' }

                return (
                  <Link
                    key={lead.id}
                    href={`/admin/leads?id=${lead.id}`}
                    className="flex items-center justify-between gap-3 p-2 rounded-2xl hover:bg-neutral-50 transition-colors group cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                      <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-2xs">
                        {initial}
                      </div>
                      <div className="min-w-0">
                        <h4 className="text-xs font-bold text-neutral-900 truncate group-hover:text-[#EB4604] transition-colors">
                          {lead.name}
                        </h4>
                        <p className="text-[11px] text-neutral-400 truncate">
                          {srv}{lead.company ? ` • ${lead.company}` : ''}
                        </p>
                      </div>
                    </div>
                    <span className={`px-2.5 sm:px-3 py-0.5 rounded-full text-[11px] sm:text-xs font-semibold border shrink-0 ${statusMeta.bg}`}>
                      {statusMeta.label}
                    </span>
                  </Link>
                )
              })
            ) : (
              <div className="py-8 text-center text-xs text-neutral-400">
                Aucune demande récente reçue.
              </div>
            )}
          </div>
        </div>

        {/* Column 2: Progression du Pipe Semi-Circle Gauge */}
        <div className="rounded-2xl sm:rounded-[24px] bg-white border border-neutral-200/80 p-4 sm:p-6 flex flex-col justify-between shadow-xs">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-neutral-900" />
              <h2 className="text-base font-bold text-[#0E1217]">Progression du Pipe</h2>
            </div>
            <span className="text-xs font-medium text-neutral-400 font-mono">{wonLeads} / {totalLeads} clos</span>
          </div>

          {/* Semi-Circle Donut SVG */}
          <div className="relative flex flex-col items-center justify-center my-auto py-2">
            <svg viewBox="0 0 200 110" className="w-48 sm:w-52 h-28 sm:h-30 overflow-visible">
              {/* Background Track Arc */}
              <path
                d="M 24 100 A 76 76 0 0 1 176 100"
                fill="none"
                stroke="#E5E7EB"
                strokeWidth="18"
                strokeLinecap="round"
              />
              {/* Dark Active Arc */}
              <path
                d="M 24 100 A 76 76 0 0 1 176 100"
                fill="none"
                stroke="#0B0F17"
                strokeWidth="18"
                strokeDasharray="239"
                strokeDashoffset={239 - (239 * conversionRate) / 100}
                strokeLinecap="round"
                className="transition-all duration-1000"
              />
              {/* Vibrant Orange Start Bulb */}
              <circle cx="24" cy="100" r="9" fill="#EB4604" />
            </svg>

            {/* Inner Percentage */}
            <div className="absolute top-11 sm:top-12 text-center">
              <div className="text-2xl sm:text-3xl font-bold text-[#0E1217] tracking-tight">{conversionRate}%</div>
              <div className="text-[11px] sm:text-xs text-neutral-400 font-medium">Pipe Converti</div>
            </div>
          </div>

          {/* Dynamic Legend Breakdown matching reference */}
          <div className="flex flex-wrap items-center justify-center gap-x-3.5 sm:gap-x-4 gap-y-1.5 pt-3 border-t border-neutral-100 text-[11px] sm:text-xs font-medium text-neutral-600">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-black shrink-0" />
              {wonLeads} Converti{wonLeads > 1 ? 's' : ''}
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#EB4604] shrink-0" />
              {inProgressLeads} En cours
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-neutral-300 shrink-0" />
              {newLeads} Nouveau{newLeads > 1 ? 'x' : ''}
            </span>
          </div>
        </div>

        {/* Column 3: Services Demandés (Répartition CRM en temps réel) */}
        <div className="rounded-2xl sm:rounded-[24px] bg-[#0B0F17] text-white p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden shadow-xs min-h-[220px]">
          {/* Subtle Organic Wavy Lines in Background */}
          <div className="absolute inset-0 opacity-20 pointer-events-none">
            <svg viewBox="0 0 200 200" className="w-full h-full" preserveAspectRatio="none">
              <path d="M0,100 C50,40 100,160 200,100" fill="none" stroke="#EB4604" strokeWidth="2.5" />
              <path d="M0,120 C60,60 120,180 200,120" fill="none" stroke="#EB4604" strokeWidth="1.8" />
              <path d="M0,80 C40,20 80,140 200,80" fill="none" stroke="#EB4604" strokeWidth="1.2" />
            </svg>
          </div>

          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#EB4604] animate-pulse" />
              <span className="text-[10px] sm:text-[10.5px] font-bold text-neutral-300 tracking-wider uppercase font-mono">
                RÉPARTITION CRM
              </span>
            </div>
            <Link
              href="/admin/leads"
              className="w-7 h-7 rounded-lg bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
              title="Voir tous les leads"
            >
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="relative z-10 mt-1">
            <h3 className="text-base font-bold text-white">Services Demandés</h3>
            <p className="text-[11px] text-neutral-400 font-mono mt-0.5">
              {totalServiceDemands > 0
                ? `${totalServiceDemands} demande${totalServiceDemands > 1 ? 's' : ''} analysée${totalServiceDemands > 1 ? 's' : ''}`
                : 'En attente de demandes'}
            </p>
          </div>

          {/* Dynamic Service Items Progress Bars */}
          <div className="relative z-10 my-3 space-y-2.5">
            {serviceEntries.length > 0 ? (
              serviceEntries.slice(0, 3).map(([serviceName, count]) => {
                const percent = totalServiceDemands > 0 ? Math.round((count / totalServiceDemands) * 100) : 0
                return (
                  <div key={serviceName} className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-neutral-200 font-medium truncate max-w-[170px]" title={serviceName}>
                        {serviceName}
                      </span>
                      <span className="font-mono text-[11px] text-neutral-300 shrink-0">
                        {count} ({percent}%)
                      </span>
                    </div>
                    <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[#EB4604] to-[#FF6B35] rounded-full transition-all duration-700"
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                  </div>
                )
              })
            ) : (
              <div className="py-5 text-center text-xs text-neutral-400 font-mono">
                Aucun service enregistré pour l&apos;instant
              </div>
            )}
          </div>

          {/* Footer stats pill */}
          <div className="relative z-10 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-neutral-300">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
              <span>Base en direct</span>
            </span>
            <Link
              href="/admin/leads"
              className="text-[#EB4604] hover:text-[#FF6B35] font-semibold transition-colors flex items-center gap-1"
            >
              <span>Détails CRM</span>
              <ChevronRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
