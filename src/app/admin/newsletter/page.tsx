'use client'

import React, { useState, useEffect, useCallback, useMemo } from 'react'
import {
  Mail,
  Search,
  Download,
  Copy,
  Check,
  Trash2,
  X,
  Globe,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Users,
  UserCheck,
  UserX,
  Plus,
  BarChart2,
  RotateCcw,
  MoreHorizontal,
  GraduationCap,
  SlidersHorizontal,
} from 'lucide-react'
import { ConfirmModal } from '@/components/admin/ConfirmModal'
import { AlertModal } from '@/components/admin/AlertModal'
import { TableSkeleton } from '@/components/admin/Skeletons'
import { notify } from '@/lib/notify'

interface Subscriber {
  id: string
  email: string
  source: string
  status: string
  createdAt: string
}

interface Metrics {
  allTotal: number
  activeTotal: number
  retentionPercent: number
  newThisMonth: number
  monthlyGrowthPercent: number
  sparklearnTotal: number
  websiteTotal: number
  websitePercent: number
  sparklearnPercent: number
}

export default function AdminNewsletterPage() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(10)
  const [totalPages, setTotalPages] = useState(1)

  // Filters
  const [search, setSearch] = useState('')
  const [sourceFilter, setSourceFilter] = useState<'ALL' | 'website' | 'sparklearn'>('ALL')
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'ACTIVE' | 'UNSUBSCRIBED'>('ALL')
  const [dateFilter, setDateFilter] = useState<'all' | '7days' | '30days' | 'month'>('all')

  // Selected for bulk actions
  const [selectedIds, setSelectedIds] = useState<string[]>([])

  // UI state
  const [loading, setLoading] = useState(true)
  const [copiedAll, setCopiedAll] = useState(false)
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null)
  
  // Dropdowns state
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [openLimitDropdown, setOpenLimitDropdown] = useState(false)
  const [expandedId, setExpandedId] = useState<string | null>(null)

  // Custom Branded Modals state
  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean
    id: string
    email: string
    loading: boolean
  }>({
    isOpen: false,
    id: '',
    email: '',
    loading: false,
  })
  const [showFiltersModal, setShowFiltersModal] = useState(false)

  // Metrics
  const [metrics, setMetrics] = useState<Metrics>({
    allTotal: 0,
    activeTotal: 0,
    retentionPercent: 0,
    newThisMonth: 0,
    monthlyGrowthPercent: 0,
    sparklearnTotal: 0,
    websiteTotal: 0,
    websitePercent: 0,
    sparklearnPercent: 0,
  })

  // Fetch subscribers from API
  const fetchSubscribers = useCallback(async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
      })
      if (search.trim()) params.set('search', search.trim())
      if (statusFilter !== 'ALL') params.set('status', statusFilter)
      if (sourceFilter !== 'ALL') params.set('source', sourceFilter)
      if (dateFilter !== 'all') params.set('dateRange', dateFilter)

      const res = await fetch(`/api/admin/newsletter?${params.toString()}`)
      if (res.ok) {
        const data = await res.json()
        setSubscribers(data.subscribers || [])
        setTotal(data.total || 0)
        setTotalPages(data.totalPages || 1)

        if (data.metrics) {
          setMetrics(data.metrics)
        }
      }
    } catch (err) {
      console.error('Erreur chargement abonnés', err)
    } finally {
      setLoading(false)
    }
  }, [page, limit, search, statusFilter, sourceFilter, dateFilter])

  useEffect(() => {
    fetchSubscribers()
  }, [fetchSubscribers])

  // Close dropdowns on click outside
  useEffect(() => {
    const handleWindowClick = () => {
      setActiveDropdown(null)
      setOpenLimitDropdown(false)
      setActiveMenuId(null)
    }
    window.addEventListener('click', handleWindowClick)
    return () => window.removeEventListener('click', handleWindowClick)
  }, [])

  // Copy all visible emails
  const handleCopyAllEmails = () => {
    if (subscribers.length === 0) return
    const allEmails = subscribers.map((s) => s.email).join(', ')
    navigator.clipboard.writeText(allEmails)
    setCopiedAll(true)
    notify.success(`${subscribers.length} adresses e-mail copiées`)
    setTimeout(() => setCopiedAll(false), 2500)
  }

  // Copy single email
  const handleCopyEmail = (email: string) => {
    navigator.clipboard.writeText(email)
    notify.success(`Email copié : ${email}`)
    setActiveMenuId(null)
  }

  // Toggle status
  const handleToggleStatus = async (id: string, currentStatus: string) => {
    const newStatus = currentStatus === 'ACTIVE' ? 'UNSUBSCRIBED' : 'ACTIVE'
    try {
      const res = await fetch('/api/admin/newsletter', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: newStatus }),
      })
      if (res.ok) {
        setSubscribers((prev) =>
          prev.map((s) => (s.id === id ? { ...s, status: newStatus } : s))
        )
        notify.success(
          newStatus === 'ACTIVE' ? 'Abonnement réactivé avec succès' : 'Abonné marqué comme désinscrit'
        )
      } else {
        notify.error('Échec de la modification du statut')
      }
    } catch (err) {
      console.error('Erreur changement statut', err)
      notify.error('Erreur de connexion au serveur')
    } finally {
      setActiveMenuId(null)
    }
  }

  // Trigger branded delete confirmation modal
  const handleDelete = (id: string, email: string) => {
    setActiveMenuId(null)
    setDeleteModal({
      isOpen: true,
      id,
      email,
      loading: false,
    })
  }

  // Confirmed delete execution
  const handleConfirmDelete = async () => {
    if (!deleteModal.id) return
    setDeleteModal((prev) => ({ ...prev, loading: true }))
    try {
      const res = await fetch(`/api/admin/newsletter?id=${deleteModal.id}`, { method: 'DELETE' })
      if (res.ok) {
        setSubscribers((prev) => prev.filter((s) => s.id !== deleteModal.id))
        setTotal((prev) => Math.max(0, prev - 1))
        setSelectedIds((prev) => prev.filter((item) => item !== deleteModal.id))
        notify.success(`Abonné « ${deleteModal.email} » supprimé avec succès`)
        setDeleteModal({ isOpen: false, id: '', email: '', loading: false })
      } else {
        notify.error('Impossible de supprimer cet abonné')
        setDeleteModal((prev) => ({ ...prev, loading: false }))
      }
    } catch (err) {
      console.error('Erreur suppression abonné', err)
      notify.error('Erreur de communication avec le serveur')
      setDeleteModal((prev) => ({ ...prev, loading: false }))
    }
  }

  // Reset all filters
  const handleResetFilters = () => {
    setSearch('')
    setSourceFilter('ALL')
    setStatusFilter('ALL')
    setDateFilter('all')
    setPage(1)
  }

  // Toggle select all
  const handleSelectAll = () => {
    if (selectedIds.length === subscribers.length) {
      setSelectedIds([])
    } else {
      setSelectedIds(subscribers.map((s) => s.id))
    }
  }

  const handleSelectRow = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    )
  }

  // CSV export link
  const exportUrl = useMemo(() => {
    const params = new URLSearchParams({ export: 'csv' })
    if (sourceFilter !== 'ALL') params.set('source', sourceFilter)
    if (statusFilter !== 'ALL') params.set('status', statusFilter)
    if (dateFilter !== 'all') params.set('dateRange', dateFilter)
    if (search.trim()) params.set('search', search.trim())
    return `/api/admin/newsletter?${params.toString()}`
  }, [sourceFilter, statusFilter, dateFilter, search])

  // Date formatting helper
  const formatDateTime = (dateStr: string) => {
    const d = new Date(dateStr)
    const dateFormatted = d.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    })
    const timeFormatted = d.toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit',
    })
    return { date: dateFormatted, time: timeFormatted }
  }

  return (
    <div className="space-y-6 pb-16">
      {/* ── 1. Top Header with Title & Action Controls ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
        <div>
          <div className="flex items-center gap-2.5 sm:gap-3">
            <h1
              className="text-xl sm:text-3xl font-bold tracking-tight text-[#0E1217]"
              style={{ fontFamily: 'var(--font-family--primary-font)' }}
            >
              Newsletter
            </h1>
            <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/80 text-[11px] sm:text-xs font-semibold text-emerald-700 shadow-2xs">
              <span className="font-medium text-neutral-800">Resend</span>
              <span className="flex items-center gap-1.5 text-emerald-600 font-semibold">
                <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-emerald-500 animate-pulse" />
                Opérationnel
              </span>
            </div>
          </div>
          <p className="text-xs sm:text-sm text-neutral-500 mt-0.5 font-normal">
            Audience, abonnements et diffusion de vos newsletters.
          </p>
        </div>

        {/* Global Action Buttons */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
          <button
            onClick={handleCopyAllEmails}
            disabled={subscribers.length === 0}
            className="inline-flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full bg-[#0B0F17] hover:bg-neutral-800 text-white text-xs font-semibold shadow-xs transition-all cursor-pointer disabled:opacity-50"
            title="Copier toutes les adresses séparées par une virgule"
          >
            {copiedAll ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>Copié !</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-white" />
                <span className="hidden sm:inline">Copier les adresses</span>
                <span className="sm:hidden">Copier</span>
              </>
            )}
          </button>

          <a
            href={exportUrl}
            download
            className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-full bg-white hover:bg-neutral-50 border border-neutral-200/90 text-neutral-800 text-xs font-semibold shadow-2xs transition-all group"
          >
            <Download className="w-3.5 h-3.5 text-[#EB4604]" />
            <span className="hidden sm:inline">Exporter CSV</span>
            <span className="sm:hidden">CSV</span>
          </a>
        </div>
      </div>

      {/* ── 2. Top Metric Cards Row (2x2 on mobile, 4 in row on desktop) ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-2.5 sm:gap-4">
        {/* Card 1: Audience totale (Soft Peach Card) */}
        <div className="rounded-2xl sm:rounded-[24px] bg-[#FFF8F5] border border-[#FFEDE5] p-3.5 sm:p-5 flex flex-col justify-between shadow-xs relative overflow-hidden min-h-[120px] sm:min-h-[140px]">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-xl bg-[#FFEFEA] text-[#EB4604] flex items-center justify-center shrink-0">
              <Users className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </div>
            <span className="text-[11px] sm:text-xs font-medium text-neutral-500 truncate">Audience totale</span>
          </div>

          <div className="my-1.5 sm:my-2 flex items-baseline justify-between">
            <div className="text-xl sm:text-2xl font-bold text-[#0E1217]">{metrics.allTotal}</div>
            <span className="inline-flex items-center gap-0.5 px-1.5 sm:px-2 py-0.5 rounded-full bg-orange-50 text-[10px] sm:text-[11px] font-semibold text-[#EB4604] border border-orange-200/60 font-mono">
              ↗ +{metrics.monthlyGrowthPercent}%
            </span>
          </div>

          <div className="text-[10px] sm:text-xs text-neutral-400 font-medium truncate">
            Inscriptions vérifiées
          </div>
        </div>

        {/* Card 2: Abonnés actifs */}
        <div className="rounded-2xl sm:rounded-[24px] bg-white border border-neutral-200/80 p-3.5 sm:p-5 flex flex-col justify-between shadow-xs min-h-[120px] sm:min-h-[140px]">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <UserCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </div>
            <span className="text-[11px] sm:text-xs font-semibold text-neutral-600 truncate">Abonnés actifs</span>
          </div>

          <div className="my-1.5 sm:my-2 flex items-baseline justify-between">
            <div className="text-xl sm:text-2xl font-bold text-[#0E1217]">{metrics.activeTotal}</div>
            <span className="inline-flex items-center gap-0.5 px-1.5 sm:px-2 py-0.5 rounded-full bg-emerald-50 text-[10px] sm:text-[11px] font-semibold text-emerald-700 border border-emerald-200/60 font-mono">
              {metrics.retentionPercent}%
            </span>
          </div>

          <div className="text-[10px] sm:text-xs text-neutral-400 truncate">De l'audience totale</div>
        </div>

        {/* Card 3: Nouveaux ce mois */}
        <div className="rounded-2xl sm:rounded-[24px] bg-white border border-neutral-200/80 p-3.5 sm:p-5 flex flex-col justify-between shadow-xs min-h-[120px] sm:min-h-[140px]">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
              <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </div>
            <span className="text-[11px] sm:text-xs font-semibold text-neutral-600 truncate">Nouveaux</span>
          </div>

          <div className="my-1.5 sm:my-2 flex items-baseline justify-between">
            <div className="text-xl sm:text-2xl font-bold text-[#0E1217]">+{metrics.newThisMonth}</div>
            <span className="inline-flex items-center gap-0.5 px-1.5 sm:px-2 py-0.5 rounded-full bg-blue-50 text-[10px] sm:text-[11px] font-semibold text-blue-600 border border-blue-200/60 font-mono">
              ce mois
            </span>
          </div>

          <div className="text-[10px] sm:text-xs text-neutral-400 truncate">Inscriptions récentes</div>
        </div>

        {/* Card 4: Taux de rétention */}
        <div className="rounded-2xl sm:rounded-[24px] bg-white border border-neutral-200/80 p-3.5 sm:p-5 flex flex-col justify-between shadow-xs min-h-[120px] sm:min-h-[140px]">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-xl bg-orange-50 text-[#EB4604] flex items-center justify-center shrink-0">
              <BarChart2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </div>
            <span className="text-[11px] sm:text-xs font-semibold text-neutral-600 truncate">Taux de rétention</span>
          </div>

          <div className="my-1.5 sm:my-2 flex items-baseline justify-between">
            <div className="text-xl sm:text-2xl font-bold text-[#0E1217]">{metrics.retentionPercent}%</div>
            <span className="inline-flex items-center gap-0.5 px-1.5 sm:px-2 py-0.5 rounded-full bg-orange-50 text-[10px] sm:text-[11px] font-semibold text-[#EB4604] border border-orange-200/60 font-mono">
              {metrics.allTotal - metrics.activeTotal} désinscr.
            </span>
          </div>

          <div className="text-[10px] sm:text-xs text-neutral-400 truncate">Abonnés restés actifs</div>
        </div>
      </div>

      {/* ── 3. Filter Bar (Pill filters with custom interactive dropdowns) ── */}
      <div className="flex flex-col xl:flex-row items-stretch xl:items-center justify-between gap-2.5 sm:gap-3 bg-white p-2.5 sm:p-3 rounded-2xl border border-neutral-200/80 shadow-2xs">
        {/* Left: Search input */}
        <div className="relative flex-1 min-w-0 xl:max-w-sm">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-400">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            placeholder="Rechercher un abonné..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value)
              setPage(1)
            }}
            className="w-full pl-9 pr-4 py-2 rounded-full bg-neutral-50/80 border border-neutral-200/70 text-xs text-[#0A0A0A] placeholder:text-neutral-400 focus:outline-none focus:border-[#EB4604] transition-colors"
          />
        </div>

        {/* Center: Dropdowns */}
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
          {/* Source Dropdown */}
          <div className="relative">
            <button
              onClick={(e) => {
                e.stopPropagation()
                setActiveDropdown(activeDropdown === 'source' ? null : 'source')
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-neutral-50 hover:bg-neutral-100 border border-neutral-200/70 text-xs font-semibold text-neutral-700 cursor-pointer transition-colors"
            >
              <span>Source</span>
              <ChevronDown className="w-3 h-3 text-neutral-400" />
            </button>
            {activeDropdown === 'source' && (
              <div
                onClick={(e) => e.stopPropagation()}
                className="absolute left-0 mt-2 w-44 rounded-2xl bg-white border border-neutral-200/90 shadow-lg p-1.5 z-30 animate-in fade-in zoom-in-95 duration-150"
              >
                {[
                  { value: 'ALL', label: 'Toutes les sources' },
                  { value: 'website', label: 'Site Web' },
                  { value: 'sparklearn', label: 'SPARKlearn' },
                ].map((item) => (
                  <button
                    key={item.value}
                    onClick={() => {
                      setSourceFilter(item.value as any)
                      setPage(1)
                      setActiveDropdown(null)
                    }}
                    className={`w-full text-left px-3 py-1.5 rounded-xl text-xs font-medium cursor-pointer transition-colors flex items-center justify-between ${
                      sourceFilter === item.value
                        ? 'bg-neutral-100 text-[#0E1217] font-bold'
                        : 'text-neutral-600 hover:bg-neutral-50'
                    }`}
                  >
                    <span>{item.label}</span>
                    {sourceFilter === item.value && <Check className="w-3.5 h-3.5 text-[#EB4604]" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Statut Dropdown */}
          <div className="relative">
            <button
              onClick={(e) => {
                e.stopPropagation()
                setActiveDropdown(activeDropdown === 'status' ? null : 'status')
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-neutral-50 hover:bg-neutral-100 border border-neutral-200/70 text-xs font-semibold text-neutral-700 cursor-pointer transition-colors"
            >
              <span>Statut</span>
              <ChevronDown className="w-3 h-3 text-neutral-400" />
            </button>
            {activeDropdown === 'status' && (
              <div
                onClick={(e) => e.stopPropagation()}
                className="absolute left-0 mt-2 w-44 rounded-2xl bg-white border border-neutral-200/90 shadow-lg p-1.5 z-30 animate-in fade-in zoom-in-95 duration-150"
              >
                {[
                  { value: 'ALL', label: 'Tous les statuts' },
                  { value: 'ACTIVE', label: 'Actifs' },
                  { value: 'UNSUBSCRIBED', label: 'Désinscrits' },
                ].map((item) => (
                  <button
                    key={item.value}
                    onClick={() => {
                      setStatusFilter(item.value as any)
                      setPage(1)
                      setActiveDropdown(null)
                    }}
                    className={`w-full text-left px-3 py-1.5 rounded-xl text-xs font-medium cursor-pointer transition-colors flex items-center justify-between ${
                      statusFilter === item.value
                        ? 'bg-neutral-100 text-[#0E1217] font-bold'
                        : 'text-neutral-600 hover:bg-neutral-50'
                    }`}
                  >
                    <span>{item.label}</span>
                    {statusFilter === item.value && <Check className="w-3.5 h-3.5 text-[#EB4604]" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Date Dropdown */}
          <div className="relative">
            <button
              onClick={(e) => {
                e.stopPropagation()
                setActiveDropdown(activeDropdown === 'date' ? null : 'date')
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-neutral-50 hover:bg-neutral-100 border border-neutral-200/70 text-xs font-semibold text-neutral-700 cursor-pointer transition-colors"
            >
              <span>Date</span>
              <ChevronDown className="w-3 h-3 text-neutral-400" />
            </button>
            {activeDropdown === 'date' && (
              <div
                onClick={(e) => e.stopPropagation()}
                className="absolute left-0 mt-2 w-48 rounded-2xl bg-white border border-neutral-200/90 shadow-lg p-1.5 z-30 animate-in fade-in zoom-in-95 duration-150"
              >
                {[
                  { value: 'all', label: 'Toutes les dates' },
                  { value: '7days', label: '7 derniers jours' },
                  { value: '30days', label: '30 derniers jours' },
                  { value: 'month', label: 'Ce mois-ci' },
                ].map((item) => (
                  <button
                    key={item.value}
                    onClick={() => {
                      setDateFilter(item.value as any)
                      setPage(1)
                      setActiveDropdown(null)
                    }}
                    className={`w-full text-left px-3 py-1.5 rounded-xl text-xs font-medium cursor-pointer transition-colors flex items-center justify-between ${
                      dateFilter === item.value
                        ? 'bg-neutral-100 text-[#0E1217] font-bold'
                        : 'text-neutral-600 hover:bg-neutral-50'
                    }`}
                  >
                    <span>{item.label}</span>
                    {dateFilter === item.value && <Check className="w-3.5 h-3.5 text-[#EB4604]" />}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowFiltersModal(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full hover:bg-neutral-100 text-xs font-semibold text-neutral-700 cursor-pointer transition-colors"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-neutral-500" />
            <span>Filtres avancés</span>
          </button>
          <button
            onClick={handleResetFilters}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full hover:bg-neutral-100 text-xs font-semibold text-neutral-500 hover:text-neutral-900 cursor-pointer transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5 text-neutral-400" />
            <span>Réinitialiser</span>
          </button>
        </div>
      </div>

      {/* ── 4. Main Content: List View (Table matching Leads layout) ── */}
      <div className="bg-white rounded-2xl sm:rounded-[24px] border border-neutral-200/80 shadow-xs overflow-visible">
        {loading ? (
          <TableSkeleton rowsCount={limit > 10 ? 10 : limit} />
        ) : subscribers.length === 0 ? (
          <div className="p-12 sm:p-16 text-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-neutral-100 flex items-center justify-center mx-auto text-neutral-400">
              <Mail className="w-6 h-6" />
            </div>
            <p className="text-sm font-semibold text-[#0A0A0A]">Aucun abonné trouvé</p>
            <p className="text-xs text-neutral-500 max-w-sm mx-auto">
              {search
                ? 'Aucune adresse e-mail ne correspond à votre recherche.'
                : 'Les nouvelles inscriptions apparaîtront automatiquement dès qu’un visiteur s’abonne.'}
            </p>
          </div>
        ) : (
          <>
            {/* Mobile View: Expandable Dropdown Cards (No horizontal scroll) */}
            <div className="md:hidden">
              {/* Mobile bulk select bar */}
              <div className="px-3.5 py-2.5 bg-neutral-50/80 border-b border-neutral-200/70 flex items-center justify-between text-xs">
                <label className="flex items-center gap-2 cursor-pointer font-semibold text-neutral-700 select-none">
                  <input
                    type="checkbox"
                    checked={
                      subscribers.length > 0 && selectedIds.length === subscribers.length
                    }
                    onChange={handleSelectAll}
                    className="w-4 h-4 rounded border-neutral-300 text-[#0A0D14] focus:ring-0 cursor-pointer"
                  />
                  <span>Tout sélectionner ({subscribers.length})</span>
                </label>
                <span className="text-[11px] text-neutral-400 font-medium">
                  {selectedIds.length > 0 ? `${selectedIds.length} coché(s)` : 'Toucher pour détails'}
                </span>
              </div>

              {/* List of expandable cards */}
              <div className="divide-y divide-neutral-100">
                {subscribers.map((sub) => {
                  const isSelected = selectedIds.includes(sub.id)
                  const isExpanded = expandedId === sub.id
                  const isSparklearn = sub.source === 'sparklearn'
                  const initial = sub.email.charAt(0).toUpperCase()
                  const { date, time } = formatDateTime(sub.createdAt)

                  return (
                    <div
                      key={sub.id}
                      className={`transition-colors ${
                        isSelected ? 'bg-orange-50/40' : isExpanded ? 'bg-neutral-50/40' : 'bg-white'
                      }`}
                    >
                      {/* Card Summary Header (Tap to expand/collapse dropdown) */}
                      <div
                        onClick={() => setExpandedId(isExpanded ? null : sub.id)}
                        className="p-3.5 flex items-center justify-between gap-2.5 cursor-pointer select-none active:bg-neutral-100/70 transition-colors"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          {/* Checkbox */}
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={(e) => {
                              e.stopPropagation()
                              handleSelectRow(sub.id)
                            }}
                            className="w-4 h-4 rounded border-neutral-300 text-[#0A0D14] focus:ring-0 cursor-pointer shrink-0"
                          />

                          {/* Avatar Initial */}
                          <div
                            className={`w-7 h-7 rounded-full text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-2xs ${
                              isSparklearn ? 'bg-[#EB4604]' : 'bg-[#0A0D14]'
                            }`}
                          >
                            {initial}
                          </div>

                          {/* Email (Truncate on small screen) */}
                          <div className="min-w-0">
                            <div className="font-bold text-xs text-neutral-900 truncate max-w-[170px] sm:max-w-xs">
                              {sub.email}
                            </div>
                            <div className="text-[10.5px] text-neutral-400 font-mono">
                              {date}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          {/* Status Pill */}
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10.5px] font-semibold border inline-flex items-center gap-1 ${
                              sub.status === 'ACTIVE'
                                ? 'bg-emerald-50 border-emerald-200/60 text-emerald-700'
                                : 'bg-neutral-100 border-neutral-200 text-neutral-600'
                            }`}
                          >
                            <span
                              className={`w-1.5 h-1.5 rounded-full ${
                                sub.status === 'ACTIVE' ? 'bg-emerald-500' : 'bg-neutral-400'
                              }`}
                            />
                            <span>{sub.status === 'ACTIVE' ? 'Actif' : 'Désinscrit'}</span>
                          </span>

                          {/* Expand Dropdown Chevron */}
                          <div
                            className={`w-6 h-6 rounded-full flex items-center justify-center text-neutral-400 transition-transform duration-200 ${
                              isExpanded ? 'rotate-180 text-neutral-900 bg-neutral-200/60' : ''
                            }`}
                          >
                            <ChevronDown className="w-3.5 h-3.5" />
                          </div>
                        </div>
                      </div>

                      {/* Dropdown Revealed Content */}
                      {isExpanded && (
                        <div className="px-3.5 pb-3.5 pt-1 border-t border-neutral-100/90 bg-[#FAFBFD] space-y-3 animate-in fade-in slide-in-from-top-1 duration-150">
                          {/* Details Meta Grid */}
                          <div className="grid grid-cols-2 gap-2 pt-1">
                            <div className="p-2.5 rounded-xl bg-white border border-neutral-200/70 shadow-2xs">
                              <span className="text-[10px] font-mono text-neutral-400 uppercase font-bold block mb-1">
                                Origine / Source
                              </span>
                              {isSparklearn ? (
                                <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#EB4604]">
                                  <GraduationCap className="w-3.5 h-3.5" />
                                  <span>SPARKlearn</span>
                                </div>
                              ) : (
                                <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-700">
                                  <Globe className="w-3.5 h-3.5 text-neutral-400" />
                                  <span>Site Web</span>
                                </div>
                              )}
                            </div>

                            <div className="p-2.5 rounded-xl bg-white border border-neutral-200/70 shadow-2xs">
                              <span className="text-[10px] font-mono text-neutral-400 uppercase font-bold block mb-1">
                                Inscription
                              </span>
                              <div className="text-xs font-mono font-medium text-neutral-700">
                                {date} à {time}
                              </div>
                            </div>
                          </div>

                          {/* ID Row with copy */}
                          <div className="flex items-center justify-between p-2 rounded-xl bg-white border border-neutral-200/70 shadow-2xs">
                            <span className="text-[10.5px] font-mono text-neutral-500 truncate">
                              ID: {sub.id}
                            </span>
                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                handleCopyEmail(sub.email)
                              }}
                              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-neutral-100 hover:bg-neutral-200 text-[10.5px] font-medium text-neutral-700 cursor-pointer transition-colors"
                            >
                              <Copy className="w-3 h-3 text-neutral-500" />
                              <span>Copier l'email</span>
                            </button>
                          </div>

                          {/* Action Buttons Toolbar */}
                          <div className="grid grid-cols-3 gap-2 pt-1">
                            <a
                              href={`mailto:${sub.email}`}
                              className="flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl bg-white hover:bg-neutral-50 border border-neutral-200/80 text-xs font-semibold text-neutral-800 shadow-2xs transition-colors text-center"
                            >
                              <Mail className="w-3.5 h-3.5 text-blue-600" />
                              <span>Écrire</span>
                            </a>

                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                handleToggleStatus(sub.id, sub.status)
                              }}
                              className={`flex items-center justify-center gap-1.5 py-2 px-2 rounded-xl border text-xs font-semibold shadow-2xs transition-colors cursor-pointer text-center ${
                                sub.status === 'ACTIVE'
                                  ? 'bg-white border-amber-200/80 text-amber-700 hover:bg-amber-50'
                                  : 'bg-white border-emerald-200/80 text-emerald-700 hover:bg-emerald-50'
                              }`}
                            >
                              {sub.status === 'ACTIVE' ? (
                                <>
                                  <UserX className="w-3.5 h-3.5 text-amber-600" />
                                  <span>Désinscrire</span>
                                </>
                              ) : (
                                <>
                                  <UserCheck className="w-3.5 h-3.5 text-emerald-600" />
                                  <span>Réactiver</span>
                                </>
                              )}
                            </button>

                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                handleDelete(sub.id, sub.email)
                              }}
                              className="flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl bg-white hover:bg-red-50 border border-red-200/80 text-xs font-semibold text-red-600 shadow-2xs transition-colors cursor-pointer text-center"
                            >
                              <Trash2 className="w-3.5 h-3.5 text-red-500" />
                              <span>Supprimer</span>
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Desktop View: Full-width Table with horizontal scroll safeguard */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full min-w-[720px] text-left text-xs" style={{ borderCollapse: 'collapse' }}>
                <thead className="bg-neutral-50/80 border-b border-neutral-200/70 text-[11px] font-mono uppercase text-neutral-400">
                  <tr>
                    <th className="py-3.5 px-4 font-semibold w-10">
                      <input
                        type="checkbox"
                        checked={
                          subscribers.length > 0 && selectedIds.length === subscribers.length
                        }
                        onChange={handleSelectAll}
                        className="w-4 h-4 rounded border-neutral-300 text-[#0A0D14] focus:ring-0 cursor-pointer"
                      />
                    </th>
                    <th className="py-3.5 px-4 font-semibold">Contact</th>
                    <th className="py-3.5 px-4 font-semibold">Statut</th>
                    <th className="py-3.5 px-4 font-semibold">Source</th>
                    <th className="py-3.5 px-4 font-semibold">Date d'inscription</th>
                    <th className="py-3.5 px-4 font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100">
                  {subscribers.map((sub) => {
                    const isSelected = selectedIds.includes(sub.id)
                    const isSparklearn = sub.source === 'sparklearn'
                    const initial = sub.email.charAt(0).toUpperCase()
                    const { date, time } = formatDateTime(sub.createdAt)
                    const isMenuOpen = activeMenuId === sub.id

                    return (
                      <tr
                        key={sub.id}
                        className={`hover:bg-neutral-50/70 transition-colors group ${
                          isSelected ? 'bg-orange-50/40' : ''
                        }`}
                      >
                        {/* Checkbox */}
                        <td className="py-3 px-4">
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => handleSelectRow(sub.id)}
                            className="w-4 h-4 rounded border-neutral-300 text-[#0A0D14] focus:ring-0 cursor-pointer"
                          />
                        </td>

                        {/* Contact */}
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-8 h-8 rounded-full text-white font-bold text-xs flex items-center justify-center shrink-0 ${
                                isSparklearn ? 'bg-[#EB4604]' : 'bg-[#0A0D14]'
                              }`}
                            >
                              {initial}
                            </div>
                            <div>
                              <div className="font-bold text-neutral-900 leading-tight">
                                {sub.email}
                              </div>
                              <div className="text-[11px] text-neutral-400 mt-0.5">
                                ID: {sub.id.slice(0, 8)}
                              </div>
                            </div>
                          </div>
                        </td>

                        {/* Status */}
                        <td className="py-3 px-4">
                          <span
                            className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border inline-flex items-center gap-1.5 ${
                              sub.status === 'ACTIVE'
                                ? 'bg-emerald-50 border-emerald-200/60 text-emerald-700'
                                : 'bg-neutral-100 border-neutral-200 text-neutral-600'
                            }`}
                          >
                            <span
                              className={`w-1.5 h-1.5 rounded-full ${
                                sub.status === 'ACTIVE' ? 'bg-emerald-500' : 'bg-neutral-400'
                              }`}
                            />
                            {sub.status === 'ACTIVE' ? 'Actif' : 'Désinscrit'}
                          </span>
                        </td>

                        {/* Source */}
                        <td className="py-3 px-4">
                          {isSparklearn ? (
                            <div className="flex items-center gap-1.5 text-xs font-medium text-[#EB4604]">
                              <GraduationCap className="w-4 h-4" />
                              <span>SPARKlearn</span>
                            </div>
                          ) : (
                            <div className="flex items-center gap-1.5 text-xs font-medium text-neutral-700">
                              <Globe className="w-4 h-4 text-neutral-400" />
                              <span>Site Web</span>
                            </div>
                          )}
                        </td>

                        {/* Date d'inscription */}
                        <td className="py-3 px-4">
                          <div className="font-mono text-neutral-600 font-medium">{date}</div>
                          <div className="text-[11px] font-mono text-neutral-400">{time}</div>
                        </td>

                        {/* Actions */}
                        <td className="py-3 px-4 text-right">
                          <div className="inline-flex items-center gap-2 relative">
                            <a
                              href={`mailto:${sub.email}`}
                              className="w-7 h-7 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-500 hover:text-neutral-700 flex items-center justify-center transition-colors"
                              title="Envoyer un e-mail"
                            >
                              <Mail className="w-3.5 h-3.5" />
                            </a>

                            {/* Options Menu */}
                            <div className="relative">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation()
                                  setActiveMenuId(isMenuOpen ? null : sub.id)
                                }}
                                className="w-7 h-7 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-500 hover:text-neutral-700 flex items-center justify-center transition-colors cursor-pointer"
                                title="Plus d'actions"
                              >
                                <MoreHorizontal className="w-3.5 h-3.5" />
                              </button>

                              {/* Dropdown — uses fixed positioning to escape any overflow:hidden ancestors */}
                              {isMenuOpen && (
                                <div
                                  onClick={(e) => e.stopPropagation()}
                                  className="fixed z-[9999] w-48 bg-white border border-neutral-200/90 rounded-2xl shadow-2xl py-1.5 text-xs text-left animate-in fade-in zoom-in-95 duration-150"
                                  style={{
                                    top: 'auto',
                                    right: 'auto',
                                    transform: 'none',
                                  }}
                                  ref={(el) => {
                                    if (el) {
                                      // Position relative to the trigger button using DOM
                                      const trigger = el.previousElementSibling as HTMLElement | null
                                      if (trigger) {
                                        const rect = trigger.getBoundingClientRect()
                                        el.style.top = `${rect.bottom + 6}px`
                                        el.style.right = `${window.innerWidth - rect.right}px`
                                      }
                                    }
                                  }}
                                >
                                  <button
                                    onClick={() => handleCopyEmail(sub.email)}
                                    className="w-full text-left px-3.5 py-2 hover:bg-neutral-50 flex items-center gap-2 text-neutral-700 cursor-pointer"
                                  >
                                    <Copy className="w-3.5 h-3.5 text-neutral-400" />
                                    <span>Copier l'adresse</span>
                                  </button>

                                  <button
                                    onClick={() => handleToggleStatus(sub.id, sub.status)}
                                    className="w-full text-left px-3.5 py-2 hover:bg-neutral-50 flex items-center gap-2 text-neutral-700 cursor-pointer"
                                  >
                                    {sub.status === 'ACTIVE' ? (
                                      <>
                                        <UserX className="w-3.5 h-3.5 text-amber-600" />
                                        <span>Marquer désinscrit</span>
                                      </>
                                    ) : (
                                      <>
                                        <UserCheck className="w-3.5 h-3.5 text-emerald-600" />
                                        <span>Réactiver l'abonné</span>
                                      </>
                                    )}
                                  </button>

                                  <div className="border-t border-neutral-100 my-1 pt-1">
                                    <button
                                      onClick={() => handleDelete(sub.id, sub.email)}
                                      className="w-full text-left px-3.5 py-2 hover:bg-red-50 flex items-center gap-2 text-red-600 font-medium cursor-pointer"
                                    >
                                      <Trash2 className="w-3.5 h-3.5" />
                                      <span>Supprimer le contact</span>
                                    </button>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>

      {/* ── 5. Table Footer with Pagination & Limit (from Leads design style but tailored for Newsletter) ── */}
      {!loading && subscribers.length > 0 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-neutral-500 mt-3 px-1">
          <div className="flex items-center gap-2">
            <span>{total} abonnés au total</span>
            {selectedIds.length > 0 && (
              <span className="font-semibold text-neutral-800">
                • {selectedIds.length} sélectionné(s)
              </span>
            )}
          </div>

          <div className="flex flex-wrap items-center justify-between sm:justify-end gap-3 w-full sm:w-auto">
            {/* Limit Selector */}
            <div className="flex items-center gap-2">
              <span className="text-neutral-500">Lignes par page</span>
              <div className="relative">
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    setOpenLimitDropdown(!openLimitDropdown)
                  }}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg border border-neutral-200 hover:bg-neutral-50 text-neutral-800 font-semibold cursor-pointer shadow-2xs transition-colors"
                >
                  <span>{limit}</span>
                  <ChevronDown className="w-3.5 h-3.5 text-neutral-400" />
                </button>

                {openLimitDropdown && (
                  <div
                    onClick={(e) => e.stopPropagation()}
                    className="absolute bottom-full mb-1 right-0 w-20 bg-white border border-neutral-200/90 rounded-xl shadow-lg py-1 z-40 animate-in fade-in zoom-in-95 duration-150"
                  >
                    {[10, 25, 50].map((num) => (
                      <button
                        key={num}
                        onClick={() => {
                          setLimit(num)
                          setPage(1)
                          setOpenLimitDropdown(false)
                        }}
                        className={`w-full text-center py-1 hover:bg-neutral-50 ${
                          limit === num ? 'font-bold text-[#EB4604]' : 'text-neutral-700'
                        }`}
                      >
                        {num}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Pagination controls */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page <= 1}
                className="w-7 h-7 rounded-full border border-neutral-200 hover:bg-neutral-50 flex items-center justify-center disabled:opacity-30 transition-colors cursor-pointer text-neutral-700 shadow-2xs"
                title="Page précédente"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>

              {Array.from({ length: totalPages }).map((_, idx) => {
                const pageNum = idx + 1
                const isActive = pageNum === page
                return (
                  <button
                    key={pageNum}
                    onClick={() => setPage(pageNum)}
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all cursor-pointer ${
                      isActive
                        ? 'bg-[#0A0D14] text-white shadow-2xs'
                        : 'text-neutral-700 hover:bg-neutral-100 border border-transparent hover:border-neutral-200'
                    }`}
                  >
                    {pageNum}
                  </button>
                )
              })}

              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page >= totalPages}
                className="w-7 h-7 rounded-full border border-neutral-200 hover:bg-neutral-50 flex items-center justify-center disabled:opacity-30 transition-colors cursor-pointer text-neutral-700 shadow-2xs"
                title="Page suivante"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Branded Confirmation Modal for Deletion ── */}
      <ConfirmModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, id: '', email: '', loading: false })}
        onConfirm={handleConfirmDelete}
        loading={deleteModal.loading}
        title="Supprimer l'abonné"
        message={
          <>
            Êtes-vous sûr de vouloir supprimer définitivement{' '}
            <strong className="text-neutral-900 font-semibold">{deleteModal.email}</strong> de votre liste
            de diffusion ? Cette action est irréversible.
          </>
        }
        confirmLabel="Supprimer"
        cancelLabel="Conserver"
        variant="danger"
      />

      {/* ── Branded Alert Modal for Advanced Filters ── */}
      <AlertModal
        isOpen={showFiltersModal}
        onClose={() => setShowFiltersModal(false)}
        title="Filtres avancés"
        icon="filters"
        message={
          <>
            Tous les filtres sont directement actifs et combinables depuis la barre d’outils supérieure :
            <div className="mt-3 text-left space-y-1.5 text-xs bg-neutral-50 p-3 rounded-xl border border-neutral-200/70">
              <p>• <strong>Source</strong> : filtrer par Site Principal ou SparkLearn.</p>
              <p>• <strong>Statut</strong> : afficher les abonnés Actifs ou Désinscrits.</p>
              <p>• <strong>Période</strong> : isoler les inscriptions récentes (7j, 30j, mois).</p>
              <p>• <strong>Recherche</strong> : trouver instantanément par adresse e-mail.</p>
            </div>
          </>
        }
      />
    </div>
  )
}
