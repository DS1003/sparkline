'use client'

import React, { useEffect, useState, useTransition, useMemo } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import {
  Columns3,
  List,
  Search,
  Download,
  Mail,
  Phone,
  Building2,
  Calendar,
  Clock,
  Trash2,
  Check,
  Copy,
  X,
  ChevronRight,
  ChevronDown,
  ExternalLink,
  MessageSquare,
  Trophy,
  Users,
  Plus,
  SlidersHorizontal,
  RotateCcw,
  Inbox,
  ArrowUpRight,
  MoreHorizontal,
  CheckCircle2,
  Globe,
  FileText,
  GraduationCap,
  Sparkles,
  Tag,
  Archive,
} from 'lucide-react'
import { ConfirmModal } from '@/components/admin/ConfirmModal'
import { AlertModal } from '@/components/admin/AlertModal'
import { KanbanSkeleton, TableSkeleton } from '@/components/admin/Skeletons'
import { notify } from '@/lib/notify'

interface LeadItem {
  id: string
  name: string
  email: string
  phone: string | null
  company: string | null
  services: string[]
  inquiryType: string | null
  budget: string | null
  preferredDate: string | null
  message: string
  source: string
  status: 'NEW' | 'CONTACTED' | 'QUALIFIED' | 'WON' | 'ARCHIVED'
  internalNotes: string | null
  createdAt: string
}

const statusConfig: Record<
  LeadItem['status'],
  { label: string; bg: string; text: string; border: string; dot: string }
> = {
  NEW: { label: 'Nouveau', bg: 'bg-orange-50', text: 'text-[#EB4604]', border: 'border-orange-200/60', dot: 'bg-[#EB4604]' },
  CONTACTED: { label: 'Contacté', bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200/60', dot: 'bg-amber-500' },
  QUALIFIED: { label: 'Qualifié', bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200/60', dot: 'bg-blue-500' },
  WON: { label: 'Gagné', bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200/60', dot: 'bg-emerald-500' },
  ARCHIVED: { label: 'Archivé', bg: 'bg-neutral-100', text: 'text-neutral-600', border: 'border-neutral-200', dot: 'bg-neutral-400' },
}

export default function AdminLeadsPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const initialSelectedId = searchParams.get('id')

  const [leads, setLeads] = useState<LeadItem[]>([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)

  // Filters state
  const [searchQuery, setSearchQuery] = useState('')
  const [stageFilter, setStageFilter] = useState('ALL')
  const [sourceFilter, setSourceFilter] = useState('ALL')
  const [budgetFilter, setBudgetFilter] = useState('ALL')
  const [dateFilter, setDateFilter] = useState('ALL')

  // View state
  const [viewMode, setViewMode] = useState<'kanban' | 'list'>('kanban')
  const [activeMobileCol, setActiveMobileCol] = useState<LeadItem['status']>('NEW')
  const [selectedLead, setSelectedLead] = useState<LeadItem | null>(null)
  const [expandedLeadId, setExpandedLeadId] = useState<string | null>(null)
  const [isNewLeadModalOpen, setIsNewLeadModalOpen] = useState(false)
  const [newLeadDefaultStatus, setNewLeadDefaultStatus] = useState<LeadItem['status']>('NEW')

  // Active dropdown popovers
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null)

  // Drawer / note state
  const [noteDraft, setNoteDraft] = useState('')
  const [noteSaved, setNoteSaved] = useState(false)
  const [copiedField, setCopiedField] = useState<string | null>(null)
  const [isUpdating, startTransition] = useTransition()

  // Custom Branded Modals
  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean
    id: string
    name: string
    loading: boolean
  }>({
    isOpen: false,
    id: '',
    name: '',
    loading: false,
  })
  const [showFiltersModal, setShowFiltersModal] = useState(false)

  // Form for new lead
  const [newForm, setNewForm] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    services: 'Applications Web & Mobile',
    budget: '5M – 15M FCFA',
    message: '',
    source: 'contact_page',
    status: 'NEW' as LeadItem['status'],
  })

  // Close dropdowns on outside click & Escape key to close modals
  useEffect(() => {
    const handleWindowClick = () => {
      setActiveDropdown(null)
      setActiveMenuId(null)
    }
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedLead(null)
        setIsNewLeadModalOpen(false)
        setActiveDropdown(null)
        setActiveMenuId(null)
      }
    }
    window.addEventListener('click', handleWindowClick)
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('click', handleWindowClick)
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  const fetchLeads = async () => {
    setLoading(true)
    try {
      const url = new URL('/api/admin/leads', window.location.origin)
      if (stageFilter !== 'ALL') url.searchParams.set('status', stageFilter)
      if (searchQuery.trim()) url.searchParams.set('search', searchQuery.trim())
      url.searchParams.set('limit', '100')

      const res = await fetch(url.toString())
      if (res.ok) {
        const json = await res.json()
        const rawLeads: LeadItem[] = (json.leads || []).map((l: any) => {
          let parsedServices: string[] = []
          try {
            parsedServices = JSON.parse(l.services)
          } catch {
            parsedServices = l.services ? [l.services] : []
          }
          return {
            ...l,
            services: Array.isArray(parsedServices) ? parsedServices : [l.services],
          }
        })
        setLeads(rawLeads)
        setTotal(json.total || rawLeads.length)

        if (initialSelectedId && !selectedLead) {
          const match = rawLeads.find((l) => l.id === initialSelectedId)
          if (match) {
            setSelectedLead(match)
            setNoteDraft(match.internalNotes || '')
          }
        }
      }
    } catch (e) {
      console.error('Failed to fetch leads', e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchLeads()
  }, [stageFilter])

  // Filtered leads based on client dropdowns
  const filteredLeads = useMemo(() => {
    return leads.filter((lead) => {
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase()
        const matchName = lead.name.toLowerCase().includes(q)
        const matchEmail = lead.email.toLowerCase().includes(q)
        const matchCompany = lead.company?.toLowerCase().includes(q) || false
        const matchMsg = lead.message.toLowerCase().includes(q)
        if (!matchName && !matchEmail && !matchCompany && !matchMsg) return false
      }
      if (sourceFilter !== 'ALL' && lead.source !== sourceFilter) {
        return false
      }
      if (budgetFilter !== 'ALL' && lead.budget !== budgetFilter) {
        return false
      }
      if (dateFilter !== 'ALL') {
        const leadDate = new Date(lead.createdAt).getTime()
        const now = Date.now()
        if (dateFilter === '7days' && now - leadDate > 7 * 24 * 3600 * 1000) return false
        if (dateFilter === '30days' && now - leadDate > 30 * 24 * 3600 * 1000) return false
      }
      return true
    })
  }, [leads, searchQuery, sourceFilter, budgetFilter, dateFilter])

  // Lead Counts
  const newCount = leads.filter((l) => l.status === 'NEW').length
  const contactedCount = leads.filter((l) => l.status === 'CONTACTED').length
  const qualifiedCount = leads.filter((l) => l.status === 'QUALIFIED').length
  const wonCount = leads.filter((l) => l.status === 'WON').length
  const archivedCount = leads.filter((l) => l.status === 'ARCHIVED').length

  const handleUpdateStatus = async (leadId: string, newStatus: LeadItem['status']) => {
    startTransition(async () => {
      try {
        const res = await fetch('/api/admin/leads', {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: leadId, status: newStatus }),
        })
        if (res.ok) {
          setLeads((prev) =>
            prev.map((l) => (l.id === leadId ? { ...l, status: newStatus } : l))
          )
          if (selectedLead?.id === leadId) {
            setSelectedLead((prev) => (prev ? { ...prev, status: newStatus } : null))
          }
          notify.success(`Statut mis à jour : ${statusConfig[newStatus]?.label || newStatus}`)
        } else {
          notify.error('Échec de la modification du statut')
        }
      } catch (err) {
        console.error('Failed to update status', err)
        notify.error('Erreur réseau lors de la mise à jour')
      }
    })
  }

  const handleSaveNotes = async () => {
    if (!selectedLead) return
    startTransition(async () => {
      try {
        const res = await fetch('/api/admin/leads', {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: selectedLead.id, internalNotes: noteDraft }),
        })
        if (res.ok) {
          const updated = { ...selectedLead, internalNotes: noteDraft }
          setSelectedLead(updated)
          setLeads((prev) => prev.map((l) => (l.id === updated.id ? updated : l)))
          setNoteSaved(true)
          notify.success('Notes internes enregistrées avec succès')
          setTimeout(() => setNoteSaved(false), 2500)
        } else {
          notify.error('Erreur lors de l’enregistrement de la note')
        }
      } catch (err) {
        console.error('Failed to save notes', err)
        notify.error('Erreur de communication avec le serveur')
      }
    })
  }

  // Trigger branded delete confirmation modal
  const handleDeleteLead = (id: string, name: string) => {
    setDeleteModal({
      isOpen: true,
      id,
      name,
      loading: false,
    })
  }

  // Confirmed delete execution
  const handleConfirmDeleteLead = async () => {
    if (!deleteModal.id) return
    setDeleteModal((prev) => ({ ...prev, loading: true }))
    try {
      const res = await fetch(`/api/admin/leads?id=${deleteModal.id}`, { method: 'DELETE' })
      if (res.ok) {
        setLeads((prev) => prev.filter((l) => l.id !== deleteModal.id))
        setTotal((prev) => Math.max(0, prev - 1))
        if (selectedLead?.id === deleteModal.id) setSelectedLead(null)
        notify.success(`Demande de « ${deleteModal.name} » supprimée`)
        setDeleteModal({ isOpen: false, id: '', name: '', loading: false })
      } else {
        notify.error('Erreur lors de la suppression de la demande')
        setDeleteModal((prev) => ({ ...prev, loading: false }))
      }
    } catch (err) {
      console.error('Failed to delete lead', err)
      notify.error('Erreur réseau lors de la suppression')
      setDeleteModal((prev) => ({ ...prev, loading: false }))
    }
  }

  const handleCreateNewLead = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await fetch('/api/admin/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...newForm,
          services: [newForm.services],
        }),
      })
      if (res.ok) {
        const created = await res.json()
        setLeads((prev) => [created, ...prev])
        setTotal((prev) => prev + 1)
        setIsNewLeadModalOpen(false)
        notify.success(`Lead « ${created.name} » créé avec succès`)
        setNewForm({
          name: '',
          email: '',
          phone: '',
          company: '',
          services: 'Applications Web & Mobile',
          budget: '5M – 15M FCFA',
          message: '',
          source: 'contact_page',
          status: 'NEW',
        })
      } else {
        notify.error('Impossible de créer le lead')
      }
    } catch (err) {
      console.error('Failed to create lead', err)
      notify.error('Erreur de connexion au serveur')
    }
  }

  const handleExportCsv = () => {
    const csvRows = [
      ['Date', 'Nom', 'Email', 'Téléphone', 'Entreprise', 'Services', 'Budget', 'Statut', 'Message', 'Notes'],
      ...filteredLeads.map((l) => [
        new Date(l.createdAt).toISOString(),
        l.name,
        l.email,
        l.phone || '',
        l.company || '',
        l.services.join('; '),
        l.budget || '',
        l.status,
        l.message.replace(/\n/g, ' '),
        (l.internalNotes || '').replace(/\n/g, ' '),
      ]),
    ]
    const csvContent = csvRows
      .map((row) => row.map((val) => `"${String(val).replace(/"/g, '""')}"`).join(','))
      .join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `sparkline_leads_${new Date().toISOString().split('T')[0]}.csv`
    link.click()
    URL.revokeObjectURL(url)
    notify.success('Export CSV généré avec succès')
  }

  const handleResetFilters = () => {
    setSearchQuery('')
    setStageFilter('ALL')
    setSourceFilter('ALL')
    setBudgetFilter('ALL')
    setDateFilter('ALL')
  }

  const handleOpenLead = (lead: LeadItem) => {
    setSelectedLead(lead)
    setNoteDraft(lead.internalNotes || '')
    setNoteSaved(false)
  }

  const handleCopy = (field: string, text: string) => {
    navigator.clipboard.writeText(text)
    setCopiedField(field)
    notify.success(field === 'email' ? 'Adresse email copiée' : field === 'phone' ? 'Numéro de téléphone copié' : 'Copié dans le presse-papier')
    setTimeout(() => setCopiedField(null), 2000)
  }

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr)
    return d.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    })
  }

  const getSourceMeta = (source: string) => {
    switch (source) {
      case 'contact_page':
        return { label: 'Page Contact', icon: Globe, bg: 'bg-emerald-50 text-emerald-700 border-emerald-200/70' }
      case 'quote_modal':
        return { label: 'Modal Devis', icon: FileText, bg: 'bg-orange-50 text-[#EB4604] border-orange-200/70' }
      case 'quote_form':
        return { label: 'Formulaire Devis', icon: FileText, bg: 'bg-amber-50 text-amber-700 border-amber-200/70' }
      case 'sparklearn_contact':
      case 'sparklearn':
        return { label: 'SparkLearn', icon: GraduationCap, bg: 'bg-purple-50 text-purple-700 border-purple-200/70' }
      case 'referral':
        return { label: 'Recommandation', icon: Sparkles, bg: 'bg-blue-50 text-blue-700 border-blue-200/70' }
      default:
        return {
          label: source ? source.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase()) : 'Direct',
          icon: Tag,
          bg: 'bg-neutral-100 text-neutral-700 border-neutral-200/70',
        }
    }
  }

  const kanbanColumns = useMemo(() => {
    if (stageFilter === 'ARCHIVED') {
      return [
        {
          id: 'ARCHIVED' as LeadItem['status'],
          title: 'Archivés',
          count: archivedCount,
          dotColor: 'bg-neutral-400',
          subtitle: 'Opportunités archivées ou terminées',
          budgetEstimate: '0 FCFA',
        },
      ]
    }

    return [
      {
        id: 'NEW' as LeadItem['status'],
        title: 'Nouveaux',
        count: newCount,
        dotColor: 'bg-[#EB4604]',
        subtitle: 'À prendre en charge',
        budgetEstimate: '15M – 45M FCFA',
      },
      {
        id: 'CONTACTED' as LeadItem['status'],
        title: 'Contactés',
        count: contactedCount,
        dotColor: 'bg-amber-500',
        subtitle: 'Premier échange effectué',
        budgetEstimate: '30M – 60M FCFA',
      },
      {
        id: 'QUALIFIED' as LeadItem['status'],
        title: 'Qualifiés',
        count: qualifiedCount,
        dotColor: 'bg-blue-500',
        subtitle: 'Besoin validé / opportunité sérieuse',
        budgetEstimate: '25M – 45M FCFA',
      },
      {
        id: 'WON' as LeadItem['status'],
        title: 'Gagnés',
        count: wonCount,
        dotColor: 'bg-emerald-500',
        subtitle: 'Converti avec succès',
        budgetEstimate: '15M – 35M FCFA',
      },
    ]
  }, [newCount, contactedCount, qualifiedCount, wonCount, archivedCount, stageFilter])

  return (
    <div className="space-y-6 pb-16">
      {/* ── 1. Top Header with Title & Action Controls ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
        <div>
          <h1
            className="text-xl sm:text-3xl font-bold tracking-tight text-[#0E1217]"
            style={{ fontFamily: 'var(--font-family--primary-font)' }}
          >
            Leads & Devis
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500 mt-0.5 font-normal">
            Suivez vos prospects, négociez les propositions et convertissez vos opportunités.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
          {/* + Nouveau lead button */}
          <button
            onClick={() => {
              setNewLeadDefaultStatus('NEW')
              setNewForm((prev) => ({ ...prev, status: 'NEW' }))
              setIsNewLeadModalOpen(true)
            }}
            className="inline-flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full bg-[#0B0F17] hover:bg-neutral-800 text-white text-xs font-semibold shadow-xs transition-all cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5 text-white" />
            <span>Nouveau lead</span>
          </button>

          {/* View Mode Toggle (Pipeline vs Liste vs Archivés) */}
          <div className="flex items-center p-1 rounded-full bg-white border border-neutral-200/80 shadow-2xs">
            <button
              onClick={() => {
                setViewMode('kanban')
                if (stageFilter === 'ARCHIVED') setStageFilter('ALL')
              }}
              className={`flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                viewMode === 'kanban' && stageFilter !== 'ARCHIVED'
                  ? 'bg-[#0B0F17] text-white shadow-xs'
                  : 'text-neutral-500 hover:text-neutral-900 hover:bg-neutral-50'
              }`}
            >
              <Columns3 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Pipeline</span>
              <span className="sm:hidden">Pipe</span>
              <span>(4)</span>
            </button>
            <button
              onClick={() => {
                setViewMode('list')
                if (stageFilter === 'ARCHIVED') setStageFilter('ALL')
              }}
              className={`flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                viewMode === 'list' && stageFilter !== 'ARCHIVED'
                  ? 'bg-[#0B0F17] text-white shadow-xs'
                  : 'text-neutral-500 hover:text-neutral-900 hover:bg-neutral-50'
              }`}
            >
              <List className="w-3.5 h-3.5" />
              <span>Liste</span>
            </button>
            <button
              onClick={() => {
                setViewMode('kanban')
                setStageFilter(stageFilter === 'ARCHIVED' ? 'ALL' : 'ARCHIVED')
              }}
              className={`flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                stageFilter === 'ARCHIVED'
                  ? 'bg-neutral-800 text-white shadow-xs'
                  : 'text-neutral-500 hover:text-neutral-900 hover:bg-neutral-50'
              }`}
              title="Afficher les leads archivés"
            >
              <Archive className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Archivés</span>
              {archivedCount > 0 && (
                <span
                  className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono font-bold ${
                    stageFilter === 'ARCHIVED'
                      ? 'bg-neutral-700 text-white'
                      : 'bg-neutral-100 text-neutral-600'
                  }`}
                >
                  {archivedCount}
                </span>
              )}
            </button>
          </div>

          {/* Exporter CSV button */}
          <button
            onClick={handleExportCsv}
            disabled={filteredLeads.length === 0}
            className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-full bg-white hover:bg-neutral-50 border border-neutral-200/90 text-neutral-800 text-xs font-semibold shadow-2xs transition-all cursor-pointer disabled:opacity-40"
          >
            <Download className="w-3.5 h-3.5 text-[#EB4604]" />
            <span className="hidden sm:inline">Exporter CSV</span>
            <span className="sm:hidden">CSV</span>
          </button>
        </div>
      </div>

      {/* ── 2. Top Metric Cards Row (2x2 on mobile, 4 in row on desktop) ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4">
        {/* Card 1: Volume du pipe (Soft Peach Card) */}
        <div className="rounded-2xl sm:rounded-[24px] bg-[#FFF8F5] border border-[#FFEDE5] p-3.5 sm:p-5 flex flex-col justify-between shadow-xs relative overflow-hidden min-h-[120px] sm:min-h-[140px]">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-xl bg-[#FFEFEA] text-[#EB4604] flex items-center justify-center shrink-0">
              <Users className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </div>
            <span className="text-[11px] sm:text-xs font-medium text-neutral-500 truncate">Volume du pipe</span>
          </div>

          <div className="my-1.5 sm:my-2 flex items-baseline justify-between">
            <div className="text-xl sm:text-2xl font-bold text-[#0E1217]">{total} leads</div>
            {/* Sparkline curve */}
            <svg className="w-16 sm:w-20 h-5 sm:h-6 overflow-visible shrink-0" viewBox="0 0 80 24">
              <path
                d="M 0 18 Q 20 22, 40 10 T 80 6"
                fill="none"
                stroke="#EB4604"
                strokeWidth="2.2"
                strokeLinecap="round"
              />
            </svg>
          </div>

          <div className="text-[10px] sm:text-xs text-neutral-400 font-medium truncate">
            Valeur: 75M – 160M FCFA
          </div>
        </div>

        {/* Card 2: À traiter */}
        <div className="rounded-2xl sm:rounded-[24px] bg-white border border-neutral-200/80 p-3.5 sm:p-5 flex flex-col justify-between shadow-xs min-h-[120px] sm:min-h-[140px]">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-xl bg-orange-50 text-[#EB4604] flex items-center justify-center shrink-0">
              <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </div>
            <span className="text-[11px] sm:text-xs font-semibold text-neutral-600 truncate">À traiter</span>
          </div>

          <div className="my-1.5 sm:my-2 flex items-baseline justify-between">
            <div className="text-xl sm:text-2xl font-bold text-[#0E1217]">{newCount} lead{newCount > 1 ? 's' : ''}</div>
            <span className="inline-flex items-center gap-0.5 px-1.5 sm:px-2 py-0.5 rounded-full bg-orange-50 text-[10px] sm:text-[11px] font-semibold text-[#EB4604] border border-orange-200/60 font-mono">
              ↗ 2
            </span>
          </div>

          <div className="text-[10px] sm:text-xs text-neutral-400 truncate">2 non contactés depuis 48h</div>
        </div>

        {/* Card 3: En discussion */}
        <div className="rounded-2xl sm:rounded-[24px] bg-white border border-neutral-200/80 p-3.5 sm:p-5 flex flex-col justify-between shadow-xs min-h-[120px] sm:min-h-[140px]">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
              <MessageSquare className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </div>
            <span className="text-[11px] sm:text-xs font-semibold text-neutral-600 truncate">En discussion</span>
          </div>

          <div className="my-1.5 sm:my-2 flex items-baseline justify-between">
            <div className="text-xl sm:text-2xl font-bold text-[#0E1217]">
              {contactedCount + qualifiedCount} actifs
            </div>
            <span className="inline-flex items-center gap-0.5 px-1.5 sm:px-2 py-0.5 rounded-full bg-blue-50 text-[10px] sm:text-[11px] font-semibold text-blue-600 border border-blue-200/60 font-mono">
              ↗ +1
            </span>
          </div>

          <div className="text-[10px] sm:text-xs text-neutral-400 truncate">1 relance aujourd'hui</div>
        </div>

        {/* Card 4: Projets gagnés */}
        <div className="rounded-2xl sm:rounded-[24px] bg-white border border-neutral-200/80 p-3.5 sm:p-5 flex flex-col justify-between shadow-xs min-h-[120px] sm:min-h-[140px]">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <Trophy className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </div>
            <span className="text-[11px] sm:text-xs font-semibold text-neutral-600 truncate">Projets gagnés</span>
          </div>

          <div className="my-1.5 sm:my-2 flex items-baseline justify-between">
            <div className="text-xl sm:text-2xl font-bold text-[#0E1217]">{wonCount} clos</div>
            <span className="inline-flex items-center gap-0.5 px-1.5 sm:px-2 py-0.5 rounded-full bg-emerald-50 text-[10px] sm:text-[11px] font-semibold text-emerald-700 border border-emerald-200/60 font-mono">
              ↗ {total > 0 ? Math.round((wonCount / total) * 100) : 0}%
            </span>
          </div>

          <div className="text-[10px] sm:text-xs text-neutral-400 truncate">Taux de conversion global</div>
        </div>
      </div>

      {/* ── 3. Filter Bar (Pill filters with custom interactive dropdowns) ── */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-2.5 sm:gap-3 bg-white p-2.5 sm:p-3 rounded-2xl border border-neutral-200/80 shadow-2xs">
        {/* Left: Search input */}
        <div className="relative flex-1 min-w-0 md:max-w-sm">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-400">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            placeholder="Rechercher un prospect, société..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-full bg-neutral-50/80 border border-neutral-200/70 text-xs text-[#0A0A0A] placeholder:text-neutral-400 focus:outline-none focus:border-[#EB4604] transition-colors"
          />
        </div>

        {/* Center: Dropdowns */}
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
          {/* Étape Dropdown */}
          <div className="relative">
            <button
              onClick={(e) => {
                e.stopPropagation()
                setActiveDropdown(activeDropdown === 'stage' ? null : 'stage')
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-neutral-50 hover:bg-neutral-100 border border-neutral-200/70 text-xs font-semibold text-neutral-700 cursor-pointer transition-colors"
            >
              <span>Étape</span>
              <ChevronDown className="w-3 h-3 text-neutral-400" />
            </button>
            {activeDropdown === 'stage' && (
              <div
                onClick={(e) => e.stopPropagation()}
                className="absolute left-0 mt-2 w-44 rounded-2xl bg-white border border-neutral-200/90 shadow-lg p-1.5 z-30 animate-in fade-in zoom-in-95 duration-150"
              >
                {[
                  { value: 'ALL', label: 'Toutes les étapes' },
                  { value: 'NEW', label: 'Nouveaux' },
                  { value: 'CONTACTED', label: 'Contactés' },
                  { value: 'QUALIFIED', label: 'Qualifiés' },
                  { value: 'WON', label: 'Gagnés' },
                  { value: 'ARCHIVED', label: 'Archivés' },
                ].map((item) => (
                  <button
                    key={item.value}
                    onClick={() => {
                      setStageFilter(item.value)
                      setActiveDropdown(null)
                    }}
                    className={`w-full text-left px-3 py-1.5 rounded-xl text-xs font-medium cursor-pointer transition-colors flex items-center justify-between ${
                      stageFilter === item.value
                        ? 'bg-neutral-100 text-[#0E1217] font-bold'
                        : 'text-neutral-600 hover:bg-neutral-50'
                    }`}
                  >
                    <span>{item.label}</span>
                    {stageFilter === item.value && <Check className="w-3.5 h-3.5 text-[#EB4604]" />}
                  </button>
                ))}
              </div>
            )}
          </div>

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
                  { value: 'contact_page', label: 'Page Contact' },
                  { value: 'quote_modal', label: 'Modal Devis' },
                  { value: 'quote_form', label: 'Formulaire Devis' },
                  { value: 'sparklearn_contact', label: 'SparkLearn' },
                  { value: 'referral', label: 'Recommandation' },
                ].map((item) => (
                  <button
                    key={item.value}
                    onClick={() => {
                      setSourceFilter(item.value)
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

          {/* Commercial Dropdown */}
          <div className="relative">
            <button
              onClick={(e) => {
                e.stopPropagation()
                setActiveDropdown(activeDropdown === 'commercial' ? null : 'commercial')
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-neutral-50 hover:bg-neutral-100 border border-neutral-200/70 text-xs font-semibold text-neutral-700 cursor-pointer transition-colors"
            >
              <span>Commercial</span>
              <ChevronDown className="w-3 h-3 text-neutral-400" />
            </button>
            {activeDropdown === 'commercial' && (
              <div
                onClick={(e) => e.stopPropagation()}
                className="absolute left-0 mt-2 w-48 rounded-2xl bg-white border border-neutral-200/90 shadow-lg p-1.5 z-30 animate-in fade-in zoom-in-95 duration-150"
              >
                <div className="px-3 py-1.5 text-[11px] text-neutral-400 uppercase font-mono font-bold">
                  Responsable
                </div>
                <button
                  onClick={() => setActiveDropdown(null)}
                  className="w-full text-left px-3 py-1.5 rounded-xl text-xs font-semibold text-[#0E1217] bg-neutral-100 flex items-center justify-between"
                >
                  <span>Direction SPARKLINE</span>
                  <Check className="w-3.5 h-3.5 text-[#EB4604]" />
                </button>
              </div>
            )}
          </div>

          {/* Budget Dropdown */}
          <div className="relative">
            <button
              onClick={(e) => {
                e.stopPropagation()
                setActiveDropdown(activeDropdown === 'budget' ? null : 'budget')
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-neutral-50 hover:bg-neutral-100 border border-neutral-200/70 text-xs font-semibold text-neutral-700 cursor-pointer transition-colors"
            >
              <span>Budget</span>
              <ChevronDown className="w-3 h-3 text-neutral-400" />
            </button>
            {activeDropdown === 'budget' && (
              <div
                onClick={(e) => e.stopPropagation()}
                className="absolute left-0 mt-2 w-48 rounded-2xl bg-white border border-neutral-200/90 shadow-lg p-1.5 z-30 animate-in fade-in zoom-in-95 duration-150"
              >
                {[
                  { value: 'ALL', label: 'Tous les budgets' },
                  { value: '< 5M FCFA', label: '< 5M FCFA' },
                  { value: '5M – 15M FCFA', label: '5M – 15M FCFA' },
                  { value: '10M – 20M FCFA', label: '10M – 20M FCFA' },
                  { value: '15M – 35M FCFA', label: '15M – 35M FCFA' },
                  { value: '25M – 45M FCFA', label: '25M – 45M FCFA' },
                  { value: '30M – 60M FCFA', label: '30M – 60M FCFA' },
                ].map((item) => (
                  <button
                    key={item.value}
                    onClick={() => {
                      setBudgetFilter(item.value)
                      setActiveDropdown(null)
                    }}
                    className={`w-full text-left px-3 py-1.5 rounded-xl text-xs font-medium cursor-pointer transition-colors flex items-center justify-between ${
                      budgetFilter === item.value
                        ? 'bg-neutral-100 text-[#0E1217] font-bold'
                        : 'text-neutral-600 hover:bg-neutral-50'
                    }`}
                  >
                    <span>{item.label}</span>
                    {budgetFilter === item.value && <Check className="w-3.5 h-3.5 text-[#EB4604]" />}
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
                className="absolute left-0 mt-2 w-44 rounded-2xl bg-white border border-neutral-200/90 shadow-lg p-1.5 z-30 animate-in fade-in zoom-in-95 duration-150"
              >
                {[
                  { value: 'ALL', label: 'Toutes les dates' },
                  { value: '7days', label: '7 derniers jours' },
                  { value: '30days', label: '30 derniers jours' },
                ].map((item) => (
                  <button
                    key={item.value}
                    onClick={() => {
                      setDateFilter(item.value)
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

      {/* ── 4. Main Content: Kanban Columns (5 Columns) or List View ── */}
      {loading ? (
        viewMode === 'kanban' ? <KanbanSkeleton /> : <TableSkeleton rowsCount={8} />
      ) : viewMode === 'kanban' ? (
        <div className="space-y-3">
          {/* Mobile Column Switcher Tabs (< md only) */}
          {kanbanColumns.length > 1 && (
            <div className="flex md:hidden flex-wrap items-center gap-1.5 p-1 bg-white border border-neutral-200/80 rounded-2xl shadow-2xs">
              {kanbanColumns.map((col) => {
                const isActive = activeMobileCol === col.id
                return (
                  <button
                    key={col.id}
                    onClick={() => setActiveMobileCol(col.id)}
                    className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                      isActive
                        ? 'bg-[#0B0F17] text-white shadow-xs'
                        : 'text-neutral-500 hover:text-neutral-800 bg-neutral-50/50'
                    }`}
                  >
                    <span className={`w-2 h-2 rounded-full ${col.dotColor}`} />
                    <span>{col.title}</span>
                    <span
                      className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                        isActive ? 'bg-white/20 text-white' : 'bg-neutral-100 text-neutral-600'
                      }`}
                    >
                      {col.count}
                    </span>
                  </button>
                )
              })}
            </div>
          )}

          <div className="w-full md:overflow-x-auto pb-4">
            <div
              className={`grid gap-4.5 items-start ${
                kanbanColumns.length === 1
                  ? 'grid-cols-1 max-w-md'
                  : 'grid-cols-1 md:grid-cols-2 xl:grid-cols-4 w-full md:min-w-[720px] lg:min-w-[1050px]'
              }`}
            >
              {kanbanColumns.map((col) => {
                const colLeads = filteredLeads.filter((l) => l.status === col.id)
                return (
                  <div
                    key={col.id}
                    className={`bg-[#F8F9FA] rounded-2xl sm:rounded-[24px] p-3 sm:p-3.5 border border-neutral-200/70 flex-col min-h-[420px] sm:min-h-[550px] ${
                      activeMobileCol === col.id ? 'flex' : 'hidden md:flex'
                    }`}
                  >
                  {/* Column Header */}
                  <div className="pb-3 border-b border-neutral-200/60 mb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className={`w-2.5 h-2.5 rounded-full ${col.dotColor}`} />
                        <h3 className="font-bold text-sm text-[#0E1217]">{col.title}</h3>
                      </div>
                      <span className="w-5 h-5 rounded-full bg-white border border-neutral-200/90 text-[11px] font-bold text-neutral-700 flex items-center justify-center font-mono shadow-2xs">
                        {col.count}
                      </span>
                    </div>
                    <p className="text-[11px] text-neutral-400 mt-0.5">{col.subtitle}</p>

                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-neutral-200/40">
                      <span className="text-[10.5px] font-mono text-neutral-500 font-medium">
                        {col.budgetEstimate}
                      </span>
                      <button
                        onClick={() => {
                          setNewLeadDefaultStatus(col.id)
                          setNewForm((prev) => ({ ...prev, status: col.id }))
                          setIsNewLeadModalOpen(true)
                        }}
                        className="text-[11px] font-semibold text-[#EB4604] hover:text-orange-700 cursor-pointer transition-colors"
                      >
                        + Ajouter un lead
                      </button>
                    </div>
                  </div>

                  {/* Column Cards */}
                  <div className="space-y-3 flex-1">
                    {colLeads.length === 0 ? (
                      <div className="h-56 flex flex-col items-center justify-center text-center p-4 border border-dashed border-neutral-200/80 rounded-2xl bg-white/40">
                        <Inbox className="w-9 h-9 text-neutral-300 stroke-[1.5] mb-2" />
                        <p className="text-xs font-semibold text-neutral-600">
                          Aucun lead {col.title.toLowerCase()}
                        </p>
                        <p className="text-[11px] text-neutral-400 mt-0.5">
                          Les leads {col.title.toLowerCase()} apparaîtront ici.
                        </p>
                      </div>
                    ) : (
                      colLeads.map((lead) => {
                        const avatarLetter = lead.name.charAt(0).toUpperCase()
                        const sourceMeta = getSourceMeta(lead.source)
                        return (
                          <div
                            key={lead.id}
                            onClick={() => handleOpenLead(lead)}
                            className="p-4 rounded-2xl bg-white border border-neutral-200/80 shadow-xs hover:border-neutral-300 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer group/card flex flex-col justify-between"
                          >
                            <div>
                              {/* Card Top: Source badge + Date & Options */}
                              <div className="flex items-center justify-between gap-2 mb-2.5">
                                <span
                                  className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10.5px] font-semibold border ${sourceMeta.bg}`}
                                >
                                  <sourceMeta.icon className="w-3 h-3 shrink-0" />
                                  <span className="truncate max-w-[120px]">{sourceMeta.label}</span>
                                </span>

                                <div className="flex items-center gap-1 text-[11px] text-neutral-400 font-mono">
                                  <span>{formatDate(lead.createdAt)}</span>

                                  {/* 3-dots Menu moved to top right */}
                                  <div className="relative">
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation()
                                        setActiveMenuId(activeMenuId === lead.id ? null : lead.id)
                                      }}
                                      className="w-6 h-6 rounded-lg hover:bg-neutral-100 text-neutral-400 hover:text-neutral-800 flex items-center justify-center transition-colors cursor-pointer"
                                      title="Options du lead"
                                    >
                                      <MoreHorizontal className="w-3.5 h-3.5" />
                                    </button>

                                    {activeMenuId === lead.id && (
                                      <div
                                        onClick={(e) => e.stopPropagation()}
                                        className="absolute right-0 top-full mt-1.5 w-48 rounded-2xl bg-white border border-neutral-200/90 shadow-xl p-1.5 z-40 animate-in fade-in zoom-in-95 duration-100"
                                      >
                                        <div className="px-2.5 py-1 text-[10px] text-neutral-400 uppercase font-mono font-bold tracking-wider">
                                          Déplacer vers
                                        </div>
                                        {(['NEW', 'CONTACTED', 'QUALIFIED', 'WON', 'ARCHIVED'] as const).map(
                                          (st) => (
                                            <button
                                              key={st}
                                              onClick={() => {
                                                handleUpdateStatus(lead.id, st)
                                                setActiveMenuId(null)
                                              }}
                                              className={`w-full text-left px-2.5 py-1.5 rounded-xl text-xs font-medium cursor-pointer transition-colors flex items-center justify-between ${
                                                lead.status === st
                                                  ? 'bg-neutral-100 text-neutral-900 font-bold'
                                                  : 'text-neutral-600 hover:bg-neutral-50'
                                              }`}
                                            >
                                              <span>{statusConfig[st].label}</span>
                                              {lead.status === st && (
                                                <Check className="w-3.5 h-3.5 text-[#EB4604]" />
                                              )}
                                            </button>
                                          )
                                        )}
                                        <div className="border-t border-neutral-100 my-1 pt-1">
                                          <button
                                            onClick={() => {
                                              handleDeleteLead(lead.id, lead.name)
                                              setActiveMenuId(null)
                                            }}
                                            className="w-full text-left px-2.5 py-1.5 rounded-xl text-xs font-medium text-red-600 hover:bg-red-50 cursor-pointer flex items-center gap-1.5"
                                          >
                                            <Trash2 className="w-3.5 h-3.5" />
                                            <span>Supprimer</span>
                                          </button>
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>

                              {/* Prospect Identity: Avatar + Name + Company */}
                              <div className="flex items-start gap-2.5 mb-2.5">
                                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-neutral-900 to-neutral-700 text-white text-xs font-bold flex items-center justify-center shrink-0 shadow-2xs">
                                  {avatarLetter}
                                </div>
                                <div className="min-w-0 flex-1">
                                  <h4 className="text-xs sm:text-[13px] font-bold text-neutral-900 group-hover/card:text-[#EB4604] transition-colors leading-tight truncate">
                                    {lead.name}
                                  </h4>
                                  {lead.company ? (
                                    <p className="text-[11px] text-neutral-500 flex items-center gap-1 mt-0.5 truncate">
                                      <Building2 className="w-3 h-3 text-neutral-400 shrink-0" />
                                      <span className="truncate">{lead.company}</span>
                                    </p>
                                  ) : (
                                    <p className="text-[11px] text-neutral-400 truncate">{lead.email}</p>
                                  )}
                                </div>
                              </div>

                              {/* Services Tags (Limited to 2 + counter) */}
                              {lead.services && lead.services.length > 0 && (
                                <div className="flex flex-wrap items-center gap-1 mb-2.5">
                                  {lead.services.slice(0, 2).map((srv, idx) => (
                                    <span
                                      key={idx}
                                      className="inline-flex items-center px-2 py-0.5 rounded-md bg-neutral-50 border border-neutral-200/70 text-[10px] text-neutral-700 font-medium truncate max-w-[210px]"
                                    >
                                      {srv}
                                    </span>
                                  ))}
                                  {lead.services.length > 2 && (
                                    <span
                                      className="px-1.5 py-0.5 rounded-md bg-neutral-100 border border-neutral-200/50 text-[9.5px] font-mono text-neutral-500 font-semibold"
                                      title={lead.services.slice(2).join(', ')}
                                    >
                                      +{lead.services.length - 2}
                                    </span>
                                  )}
                                </div>
                              )}

                              {/* Message Excerpt */}
                              {lead.message && (
                                <p className="text-[11px] text-neutral-600 italic line-clamp-2 mb-3 bg-neutral-50/70 px-2.5 py-1.5 rounded-lg border-l-2 border-[#EB4604]/50 border-y border-r border-neutral-100/60 leading-relaxed">
                                  « {lead.message} »
                                </p>
                              )}
                            </div>

                            {/* Card Footer: Clean Budget & Quick Contact actions */}
                            <div className="flex items-center justify-between pt-3 border-t border-neutral-100 mt-1 gap-2">
                              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-neutral-100/90 border border-neutral-200/60 text-neutral-900 font-mono font-bold text-[11px] whitespace-nowrap shadow-2xs">
                                <span className="text-[10px] font-normal text-neutral-400 uppercase tracking-wider font-sans">
                                  Budget
                                </span>
                                <span>{lead.budget || 'Sur devis'}</span>
                              </div>

                              <div className="flex items-center gap-1 shrink-0">
                                {/* WhatsApp Quick Action */}
                                {lead.phone && (
                                  <a
                                    href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, '')}?text=Bonjour%20${encodeURIComponent(
                                      lead.name
                                    )},%20SPARKLINE%20a%20bien%20re%C3%A7u%20votre%20demande.`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={(e) => e.stopPropagation()}
                                    className="w-7 h-7 rounded-lg border border-neutral-200/70 bg-white hover:bg-emerald-50 hover:border-emerald-300 text-neutral-400 hover:text-emerald-600 flex items-center justify-center transition-all shadow-2xs cursor-pointer"
                                    title={`WhatsApp (${lead.phone})`}
                                  >
                                    <MessageSquare className="w-3.5 h-3.5" />
                                  </a>
                                )}

                                {/* Mail Quick Action */}
                                <a
                                  href={`mailto:${lead.email}?subject=SPARKLINE%20-%20Votre%20projet`}
                                  onClick={(e) => e.stopPropagation()}
                                  className="w-7 h-7 rounded-lg border border-neutral-200/70 bg-white hover:bg-blue-50 hover:border-blue-300 text-neutral-400 hover:text-blue-600 flex items-center justify-center transition-all shadow-2xs cursor-pointer"
                                  title={`Email (${lead.email})`}
                                >
                                  <Mail className="w-3.5 h-3.5" />
                                </a>
                              </div>
                            </div>
                          </div>
                        )
                      })
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
      ) : (
        /* ── List / Table View ── */
        <div className="bg-white rounded-2xl sm:rounded-[24px] border border-neutral-200/80 shadow-xs overflow-hidden">
          {filteredLeads.length === 0 ? (
            <div className="p-12 sm:p-16 text-center space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-neutral-100 flex items-center justify-center mx-auto text-neutral-400">
                <Users className="w-6 h-6" />
              </div>
              <p className="text-sm font-semibold text-[#0A0A0A]">Aucun prospect trouvé</p>
              <p className="text-xs text-neutral-500 max-w-sm mx-auto">
                Aucun lead ne correspond à vos critères de recherche actuels.
              </p>
            </div>
          ) : (
            <>
              {/* Mobile View: Expandable Dropdown Cards (No horizontal scroll) */}
              <div className="md:hidden">
                <div className="px-3.5 py-2.5 bg-neutral-50/80 border-b border-neutral-200/70 flex items-center justify-between text-xs font-semibold text-neutral-700">
                  <span>{filteredLeads.length} prospect{filteredLeads.length > 1 ? 's' : ''} au total</span>
                  <span className="text-[11px] text-neutral-400 font-medium font-sans">
                    Toucher pour voir les détails
                  </span>
                </div>

                <div className="divide-y divide-neutral-100">
                  {filteredLeads.map((lead) => {
                    const isExpanded = expandedLeadId === lead.id
                    const sourceMeta = getSourceMeta(lead.source)
                    const avatarLetter = lead.name.charAt(0).toUpperCase()

                    return (
                      <div
                        key={lead.id}
                        className={`transition-colors ${
                          isExpanded ? 'bg-neutral-50/40' : 'bg-white'
                        }`}
                      >
                        {/* Summary Header Trigger */}
                        <div
                          onClick={() => setExpandedLeadId(isExpanded ? null : lead.id)}
                          className="p-3.5 flex items-center justify-between gap-2.5 cursor-pointer select-none active:bg-neutral-100/70 transition-colors"
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            {/* Avatar */}
                            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-neutral-900 to-neutral-700 text-white font-bold text-xs flex items-center justify-center shadow-2xs shrink-0">
                              {avatarLetter}
                            </div>

                            {/* Name & Company/Email */}
                            <div className="min-w-0">
                              <div className="font-bold text-xs text-neutral-900 truncate max-w-[150px] sm:max-w-xs">
                                {lead.name}
                              </div>
                              <div className="text-[11px] text-neutral-400 truncate">
                                {lead.company || lead.email}
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 shrink-0">
                            {/* Status Pill */}
                            <span
                              className={`px-2 py-0.5 rounded-full text-[10.5px] font-semibold border inline-flex items-center gap-1 ${
                                statusConfig[lead.status].bg
                              } ${statusConfig[lead.status].text} ${statusConfig[lead.status].border}`}
                            >
                              <span className={`w-1.5 h-1.5 rounded-full ${statusConfig[lead.status].dot}`} />
                              <span>{statusConfig[lead.status].label}</span>
                            </span>

                            {/* Chevron */}
                            <div
                              className={`w-6 h-6 rounded-full flex items-center justify-center text-neutral-400 transition-transform duration-200 ${
                                isExpanded ? 'rotate-180 text-neutral-900 bg-neutral-200/60' : ''
                              }`}
                            >
                              <ChevronDown className="w-3.5 h-3.5" />
                            </div>
                          </div>
                        </div>

                        {/* Expanded Dropdown Details */}
                        {isExpanded && (
                          <div className="px-3.5 pb-3.5 pt-1 border-t border-neutral-100/90 bg-[#FAFBFD] space-y-3 animate-in fade-in slide-in-from-top-1 duration-150">
                            {/* Contact Details (Email & Phone) */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                              <div className="p-2.5 rounded-xl bg-white border border-neutral-200/70 shadow-2xs flex items-center justify-between gap-2">
                                <div className="min-w-0">
                                  <span className="text-[10px] font-mono text-neutral-400 uppercase font-bold block">
                                    Email
                                  </span>
                                  <span className="text-xs font-semibold text-neutral-900 truncate block">
                                    {lead.email}
                                  </span>
                                </div>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    handleCopy('email', lead.email)
                                  }}
                                  className="w-7 h-7 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-neutral-500 hover:text-neutral-900 flex items-center justify-center shrink-0 transition-colors"
                                  title="Copier l'email"
                                >
                                  {copiedField === 'email' ? (
                                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                                  ) : (
                                    <Copy className="w-3.5 h-3.5" />
                                  )}
                                </button>
                              </div>

                              <div className="p-2.5 rounded-xl bg-white border border-neutral-200/70 shadow-2xs flex items-center justify-between gap-2">
                                <div className="min-w-0">
                                  <span className="text-[10px] font-mono text-neutral-400 uppercase font-bold block">
                                    Téléphone
                                  </span>
                                  <span className="text-xs font-semibold text-neutral-900 font-mono truncate block">
                                    {lead.phone || 'Non renseigné'}
                                  </span>
                                </div>
                                {lead.phone && (
                                  <div className="flex items-center gap-1 shrink-0">
                                    <a
                                      href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, '')}?text=Bonjour%20${encodeURIComponent(
                                        lead.name
                                      )},%20SPARKLINE%20a%20bien%20re%C3%A7u%20votre%20demande.`}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      onClick={(e) => e.stopPropagation()}
                                      className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 hover:bg-emerald-100 flex items-center justify-center transition-colors"
                                      title="WhatsApp"
                                    >
                                      <MessageSquare className="w-3.5 h-3.5" />
                                    </a>
                                    <a
                                      href={`tel:${lead.phone}`}
                                      onClick={(e) => e.stopPropagation()}
                                      className="w-7 h-7 rounded-lg bg-neutral-100 text-neutral-700 hover:bg-neutral-200 flex items-center justify-center transition-colors"
                                      title="Appeler"
                                    >
                                      <Phone className="w-3.5 h-3.5" />
                                    </a>
                                  </div>
                                )}
                              </div>
                            </div>

                            {/* Meta Grid: Source, Budget, Date */}
                            <div className="grid grid-cols-3 gap-2">
                              <div className="p-2 rounded-xl bg-white border border-neutral-200/70 shadow-2xs">
                                <span className="text-[9.5px] font-mono text-neutral-400 uppercase font-bold block">
                                  Source
                                </span>
                                <span
                                  className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md text-[10px] font-semibold border mt-1 truncate max-w-full ${sourceMeta.bg}`}
                                >
                                  <sourceMeta.icon className="w-3 h-3 shrink-0" />
                                  <span className="truncate">{sourceMeta.label}</span>
                                </span>
                              </div>

                              <div className="p-2 rounded-xl bg-white border border-neutral-200/70 shadow-2xs">
                                <span className="text-[9.5px] font-mono text-neutral-400 uppercase font-bold block">
                                  Budget
                                </span>
                                <span className="text-[11px] font-mono font-bold text-[#EB4604] block mt-1 truncate">
                                  {lead.budget || 'Sur devis'}
                                </span>
                              </div>

                              <div className="p-2 rounded-xl bg-white border border-neutral-200/70 shadow-2xs">
                                <span className="text-[9.5px] font-mono text-neutral-400 uppercase font-bold block">
                                  Date
                                </span>
                                <span className="text-[11px] font-mono text-neutral-600 font-medium block mt-1 truncate">
                                  {formatDate(lead.createdAt)}
                                </span>
                              </div>
                            </div>

                            {/* Services Tags */}
                            {lead.services && lead.services.length > 0 && (
                              <div className="p-2.5 rounded-xl bg-white border border-neutral-200/70 shadow-2xs">
                                <span className="text-[10px] font-mono text-neutral-400 uppercase font-bold block mb-1.5">
                                  Services demandés
                                </span>
                                <div className="flex flex-wrap gap-1">
                                  {lead.services.map((srv, idx) => (
                                    <span
                                      key={idx}
                                      className="inline-flex items-center px-2 py-0.5 rounded-md bg-neutral-50 border border-neutral-200/70 text-[10.5px] text-neutral-800 font-medium"
                                    >
                                      {srv}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            )}

                            {/* Message Excerpt */}
                            {lead.message && (
                              <div className="p-2.5 rounded-xl bg-neutral-100/60 border-l-2 border-[#EB4604] border-y border-r border-neutral-200/50">
                                <span className="text-[10px] font-mono text-neutral-400 uppercase font-bold block mb-1">
                                  Message du prospect
                                </span>
                                <p className="text-[11px] text-neutral-700 italic leading-relaxed">
                                  « {lead.message} »
                                </p>
                              </div>
                            )}

                            {/* Quick Status Switcher */}
                            <div className="p-2.5 rounded-xl bg-white border border-neutral-200/70 shadow-2xs">
                              <span className="text-[10px] font-mono text-neutral-400 uppercase font-bold block mb-1.5">
                                Changer l'étape
                              </span>
                              <div className="grid grid-cols-3 sm:grid-cols-5 gap-1">
                                {(['NEW', 'CONTACTED', 'QUALIFIED', 'WON', 'ARCHIVED'] as const).map((st) => (
                                  <button
                                    key={st}
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      handleUpdateStatus(lead.id, st)
                                    }}
                                    className={`py-1 px-1.5 rounded-lg text-[10px] font-semibold transition-all cursor-pointer text-center truncate ${
                                      lead.status === st
                                        ? 'bg-[#0B0F17] text-white shadow-xs'
                                        : 'bg-neutral-50 text-neutral-600 hover:bg-neutral-100 border border-neutral-200/60'
                                    }`}
                                  >
                                    {statusConfig[st].label}
                                  </button>
                                ))}
                              </div>
                            </div>

                            {/* Action Toolbar */}
                            <div className="flex items-center justify-between gap-2 pt-1">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation()
                                  handleOpenLead(lead)
                                }}
                                className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-[#0B0F17] hover:bg-neutral-800 text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
                              >
                                <ExternalLink className="w-3.5 h-3.5 text-neutral-300" />
                                <span>Fiche complète</span>
                              </button>

                              <button
                                onClick={(e) => {
                                  e.stopPropagation()
                                  handleDeleteLead(lead.id, lead.name)
                                }}
                                className="inline-flex items-center justify-center gap-1 py-2 px-3 rounded-xl bg-white hover:bg-red-50 border border-red-200/80 text-xs font-semibold text-red-600 shadow-2xs transition-colors cursor-pointer shrink-0"
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

              {/* Desktop View: Clean Full-width Table (No horizontal scroll) */}
              <div className="hidden md:block overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-neutral-50/80 border-b border-neutral-200/70 text-[11px] font-mono uppercase text-neutral-400">
                    <tr>
                      <th className="py-3.5 px-4 font-semibold">Prospect</th>
                      <th className="py-3.5 px-4 font-semibold">Source</th>
                      <th className="py-3.5 px-4 font-semibold">Services & Projet</th>
                      <th className="py-3.5 px-4 font-semibold">Budget</th>
                      <th className="py-3.5 px-4 font-semibold">Statut</th>
                      <th className="py-3.5 px-4 font-semibold">Date</th>
                      <th className="py-3.5 px-4 font-semibold text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-100">
                    {filteredLeads.map((lead) => {
                      const sourceMeta = getSourceMeta(lead.source)
                      return (
                        <tr
                          key={lead.id}
                          onClick={() => handleOpenLead(lead)}
                          className="hover:bg-neutral-50/70 transition-colors cursor-pointer group"
                        >
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-neutral-900 to-neutral-700 text-white font-bold text-xs flex items-center justify-center shadow-2xs">
                                {lead.name.charAt(0).toUpperCase()}
                              </div>
                              <div>
                                <div className="font-bold text-neutral-900 group-hover:text-[#EB4604] transition-colors">{lead.name}</div>
                                <div className="text-[11px] text-neutral-400">{lead.email}</div>
                              </div>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <span
                              className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10.5px] font-semibold border ${sourceMeta.bg}`}
                            >
                              <sourceMeta.icon className="w-3 h-3 shrink-0" />
                              <span>{sourceMeta.label}</span>
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <div className="font-medium text-neutral-800">
                              {lead.services?.[0] || 'Projet'}
                            </div>
                            {lead.company && (
                              <div className="text-[11px] text-neutral-400">{lead.company}</div>
                            )}
                          </td>
                          <td className="py-3 px-4 font-mono font-bold text-neutral-900">
                            {lead.budget || 'Sur devis'}
                          </td>
                          <td className="py-3 px-4">
                            <span
                              className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${
                                statusConfig[lead.status].bg
                              } ${statusConfig[lead.status].text} ${statusConfig[lead.status].border}`}
                            >
                              {statusConfig[lead.status].label}
                            </span>
                          </td>
                          <td className="py-3 px-4 font-mono text-neutral-500">
                            {formatDate(lead.createdAt)}
                          </td>
                          <td className="py-3 px-4 text-right">
                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                handleOpenLead(lead)
                              }}
                              className="px-3 py-1 rounded-full bg-neutral-100 hover:bg-neutral-200 text-[11px] font-semibold text-neutral-700 transition-colors cursor-pointer"
                            >
                              Voir détails
                            </button>
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
      )}

      {/* ── 5. Lead Detail Drawer Modal ── */}
      {selectedLead && (
        <div
          onClick={() => setSelectedLead(null)}
          className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-xs animate-in fade-in duration-200 cursor-pointer"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full sm:max-w-lg bg-white h-full shadow-2xl p-4 sm:p-6 overflow-y-auto flex flex-col justify-between animate-in slide-in-from-right duration-250 cursor-default"
          >
            <div>
              {/* Drawer Header */}
              <div className="flex items-center justify-between pb-3.5 sm:pb-4 border-b border-neutral-100">
                <div className="flex items-center gap-2.5 sm:gap-3">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black text-white font-bold flex items-center justify-center text-sm shrink-0">
                    {selectedLead.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-sm sm:text-base font-bold text-[#0E1217] truncate">{selectedLead.name}</h3>
                    <p className="text-[11px] sm:text-xs text-neutral-400 font-mono truncate">
                      Ajouté le {formatDate(selectedLead.createdAt)}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedLead(null)}
                  className="w-8 h-8 rounded-full hover:bg-neutral-100 flex items-center justify-center text-neutral-500 cursor-pointer shrink-0"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Status Selector Bar */}
              <div className="my-4 sm:my-5 p-3 rounded-2xl bg-neutral-50 border border-neutral-200/60">
                <label className="text-[10px] sm:text-[10.5px] font-mono text-neutral-400 uppercase font-bold block mb-2">
                  Changer l'étape du pipe
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-1.5">
                  {(['NEW', 'CONTACTED', 'QUALIFIED', 'WON', 'ARCHIVED'] as const).map((st) => (
                    <button
                      key={st}
                      onClick={() => handleUpdateStatus(selectedLead.id, st)}
                      className={`py-1.5 px-2 rounded-xl text-[10px] sm:text-[10.5px] font-semibold transition-all cursor-pointer text-center truncate ${
                        selectedLead.status === st
                          ? 'bg-[#0B0F17] text-white shadow-xs'
                          : 'bg-white text-neutral-600 hover:bg-neutral-100 border border-neutral-200/60'
                      }`}
                    >
                      {statusConfig[st].label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Details List */}
              <div className="space-y-3 sm:space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                  <div className="p-3 rounded-xl bg-neutral-50 border border-neutral-100">
                    <span className="text-[10px] font-mono text-neutral-400 uppercase block">Email</span>
                    <div className="flex items-center justify-between mt-1 gap-2">
                      <span className="text-xs font-semibold text-neutral-900 truncate">
                        {selectedLead.email}
                      </span>
                      <button
                        onClick={() => handleCopy('email', selectedLead.email)}
                        className="text-neutral-400 hover:text-neutral-700 shrink-0"
                        title="Copier"
                      >
                        {copiedField === 'email' ? (
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-neutral-50 border border-neutral-100">
                    <span className="text-[10px] font-mono text-neutral-400 uppercase block">Téléphone</span>
                    <div className="flex items-center justify-between mt-1 gap-2">
                      <span className="text-xs font-semibold text-neutral-900 font-mono truncate">
                        {selectedLead.phone || 'Non renseigné'}
                      </span>
                      {selectedLead.phone && (
                        <button
                          onClick={() => handleCopy('phone', selectedLead.phone!)}
                          className="text-neutral-400 hover:text-neutral-700 shrink-0"
                          title="Copier"
                        >
                          {copiedField === 'phone' ? (
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                  <div className="p-3 rounded-xl bg-neutral-50 border border-neutral-100">
                    <span className="text-[10px] font-mono text-neutral-400 uppercase block">Entreprise</span>
                    <span className="text-xs font-semibold text-neutral-900 block mt-1 truncate">
                      {selectedLead.company || 'Particulier'}
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-neutral-50 border border-neutral-100">
                    <span className="text-[10px] font-mono text-neutral-400 uppercase block">Budget estimé</span>
                    <span className="text-xs font-bold text-[#EB4604] font-mono block mt-1 truncate">
                      {selectedLead.budget || 'Non spécifié'}
                    </span>
                  </div>
                </div>

                {/* Message */}
                <div className="p-3 sm:p-3.5 rounded-xl bg-neutral-50 border border-neutral-100">
                  <span className="text-[10px] font-mono text-neutral-400 uppercase font-bold block mb-1">
                    Message / Demande originale
                  </span>
                  <p className="text-xs text-neutral-700 leading-relaxed whitespace-pre-wrap">
                    {selectedLead.message || 'Aucun message spécifié.'}
                  </p>
                </div>

                {/* Internal Notes Editor */}
                <div className="p-3 sm:p-3.5 rounded-xl bg-neutral-50 border border-neutral-100">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-mono text-neutral-400 uppercase font-bold">
                      Notes internes & suivi
                    </span>
                    {noteSaved && (
                      <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-1">
                        <Check className="w-3 h-3" />
                        Enregistré
                      </span>
                    )}
                  </div>
                  <textarea
                    rows={3}
                    value={noteDraft}
                    onChange={(e) => setNoteDraft(e.target.value)}
                    placeholder="Ajouter des notes confidentielles sur le prospect..."
                    className="w-full p-2.5 rounded-lg bg-white border border-neutral-200 text-xs text-neutral-900 focus:outline-none focus:border-[#EB4604]"
                  />
                  <div className="flex justify-end mt-2">
                    <button
                      onClick={handleSaveNotes}
                      disabled={isUpdating}
                      className="w-full sm:w-auto px-4 py-2 rounded-full bg-[#0B0F17] hover:bg-neutral-800 text-white text-xs font-semibold cursor-pointer text-center"
                    >
                      Enregistrer les notes
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Drawer Footer Actions */}
            <div className="pt-3 sm:pt-4 border-t border-neutral-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 sm:gap-3 mt-4">
              <button
                onClick={() => handleDeleteLead(selectedLead.id, selectedLead.name)}
                className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-red-600 hover:bg-red-50 cursor-pointer transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Supprimer</span>
              </button>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                {selectedLead.phone && (
                  <a
                    href={`https://wa.me/${selectedLead.phone.replace(/[^0-9]/g, '')}?text=Bonjour%20${encodeURIComponent(
                      selectedLead.name
                    )},%20je%20suis%20ravi%20d'%C3%A9changer%20avec%20vous%20suite%20%C3%A0%20votre%20demande%20sur%20SPARKLINE.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-full bg-[#05B361] hover:bg-[#049651] text-white text-xs font-bold shadow-xs cursor-pointer"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </a>
                )}
                <a
                  href={`mailto:${selectedLead.email}`}
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-full bg-[#0B0F17] hover:bg-neutral-800 text-white text-xs font-semibold cursor-pointer"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Email</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── 6. New Lead Modal ── */}
      {isNewLeadModalOpen && (
        <div
          onClick={() => setIsNewLeadModalOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200 cursor-pointer"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-2xl relative animate-in zoom-in-95 duration-200 cursor-default max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
              <h3 className="text-base sm:text-lg font-bold text-[#0E1217]">Ajouter un nouveau prospect</h3>
              <button
                onClick={() => setIsNewLeadModalOpen(false)}
                className="w-8 h-8 rounded-full hover:bg-neutral-100 flex items-center justify-center text-neutral-500 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateNewLead} className="space-y-3 sm:space-y-3.5 mt-3.5 sm:mt-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                <div>
                  <label className="text-[11px] font-semibold text-neutral-600 block mb-1">
                    Nom & Prénom *
                  </label>
                  <input
                    type="text"
                    required
                    value={newForm.name}
                    onChange={(e) => setNewForm({ ...newForm, name: e.target.value })}
                    placeholder="ex. Moussa Diop"
                    className="w-full px-3 py-2 rounded-xl border border-neutral-200 text-sm sm:text-xs focus:outline-none focus:border-[#EB4604]"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-neutral-600 block mb-1">
                    Entreprise
                  </label>
                  <input
                    type="text"
                    value={newForm.company}
                    onChange={(e) => setNewForm({ ...newForm, company: e.target.value })}
                    placeholder="ex. Teranga Tech"
                    className="w-full px-3 py-2 rounded-xl border border-neutral-200 text-sm sm:text-xs focus:outline-none focus:border-[#EB4604]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                <div>
                  <label className="text-[11px] font-semibold text-neutral-600 block mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={newForm.email}
                    onChange={(e) => setNewForm({ ...newForm, email: e.target.value })}
                    placeholder="client@domaine.sn"
                    className="w-full px-3 py-2 rounded-xl border border-neutral-200 text-sm sm:text-xs focus:outline-none focus:border-[#EB4604]"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-neutral-600 block mb-1">
                    Téléphone
                  </label>
                  <input
                    type="tel"
                    value={newForm.phone}
                    onChange={(e) => setNewForm({ ...newForm, phone: e.target.value })}
                    placeholder="+221 77 000 00 00"
                    className="w-full px-3 py-2 rounded-xl border border-neutral-200 text-sm sm:text-xs focus:outline-none focus:border-[#EB4604]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                <div>
                  <label className="text-[11px] font-semibold text-neutral-600 block mb-1">
                    Service principal
                  </label>
                  <select
                    value={newForm.services}
                    onChange={(e) => setNewForm({ ...newForm, services: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-neutral-200 text-sm sm:text-xs focus:outline-none focus:border-[#EB4604] bg-white"
                  >
                    <option value="Applications Web & Mobile">Applications Web & Mobile</option>
                    <option value="Identité & Design System">Identité & Design System</option>
                    <option value="Développement Web & Mobile">Développement Web & Mobile</option>
                    <option value="Architecture Cloud">Architecture Cloud</option>
                    <option value="Design UI/UX & Architecture">Design UI/UX & Architecture</option>
                  </select>
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-neutral-600 block mb-1">
                    Budget estimé
                  </label>
                  <select
                    value={newForm.budget}
                    onChange={(e) => setNewForm({ ...newForm, budget: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-neutral-200 text-sm sm:text-xs focus:outline-none focus:border-[#EB4604] bg-white"
                  >
                    <option value="< 5M FCFA">&lt; 5M FCFA</option>
                    <option value="5M – 15M FCFA">5M – 15M FCFA</option>
                    <option value="10M – 20M FCFA">10M – 20M FCFA</option>
                    <option value="15M – 35M FCFA">15M – 35M FCFA</option>
                    <option value="25M – 45M FCFA">25M – 45M FCFA</option>
                    <option value="30M – 60M FCFA">30M – 60M FCFA</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-[11px] font-semibold text-neutral-600 block mb-1">
                  Message / Description du besoin
                </label>
                <textarea
                  rows={3}
                  value={newForm.message}
                  onChange={(e) => setNewForm({ ...newForm, message: e.target.value })}
                  placeholder="Décrivez brièvement le projet..."
                  className="w-full px-3 py-2 rounded-xl border border-neutral-200 text-sm sm:text-xs focus:outline-none focus:border-[#EB4604]"
                />
              </div>

              <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-end gap-2 sm:gap-3 pt-3 border-t border-neutral-100">
                <button
                  type="button"
                  onClick={() => setIsNewLeadModalOpen(false)}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-full border border-neutral-200 text-xs font-semibold text-neutral-600 hover:bg-neutral-50 cursor-pointer text-center"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-[#0B0F17] hover:bg-neutral-800 text-white text-xs font-semibold cursor-pointer shadow-xs text-center"
                >
                  Créer le dossier
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── Branded Confirmation Modal for Deletion ── */}
      <ConfirmModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, id: '', name: '', loading: false })}
        onConfirm={handleConfirmDeleteLead}
        loading={deleteModal.loading}
        title="Supprimer la demande"
        message={
          <>
            Êtes-vous sûr de vouloir supprimer définitivement la demande de{' '}
            <strong className="text-neutral-900 font-semibold">{deleteModal.name}</strong> ? Cette action est irréversible.
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
            Tous les critères de segmentation sont directement accessibles depuis la barre de filtres :
            <div className="mt-3 text-left space-y-1.5 text-xs bg-neutral-50 p-3 rounded-xl border border-neutral-200/70">
              <p>• <strong>Étape</strong> : Nouveau, Contacté, Qualifié, Gagné, Archivé.</p>
              <p>• <strong>Origine</strong> : Site principal, devis spécifique, newsletter.</p>
              <p>• <strong>Budget</strong> : Filtrer par seuil de budget estimé.</p>
              <p>• <strong>Période</strong> : 7 derniers jours, 30 jours, ou tout l'historique.</p>
            </div>
          </>
        }
      />
    </div>
  )
}
