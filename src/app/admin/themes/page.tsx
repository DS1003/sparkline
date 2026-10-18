'use client'

import React, { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  Sparkles,
  Power,
  Eye,
  CheckCircle2,
  XCircle,
  ExternalLink,
  Calendar,
  Layers,
  Heart,
  ShieldCheck,
  RotateCcw,
  Plus,
  Sliders,
  Check,
  AlertCircle,
} from 'lucide-react'
import { notify } from '@/lib/notify'
import { PinkOctoberModal } from '@/features/hero/components/PinkOctoberModal'
import { HolidayModal } from '@/features/hero/components/HolidayModal'
import type { EventThemeConfig } from '@/lib/themes/eventThemeService'

export default function AdminThemesPage() {
  const [themes, setThemes] = useState<EventThemeConfig[]>([])
  const [loading, setLoading] = useState(true)
  const [togglingSlug, setTogglingSlug] = useState<string | null>(null)
  const [previewModalOpen, setPreviewModalOpen] = useState(false)
  const [previewHolidayModalOpen, setPreviewHolidayModalOpen] = useState(false)
  const [showCreateModal, setShowCreateModal] = useState(false)

  // New Theme Form
  const [newTheme, setNewTheme] = useState({
    name: '',
    slug: '',
    category: 'CUSTOM' as const,
    description: '',
    badgeText: '',
    headline: '',
    highlightText: '',
    accentColor: '#EB4604',
  })
  const [creating, setCreating] = useState(false)

  // Fetch themes from API
  const fetchThemes = useCallback(async () => {
    try {
      setLoading(true)
      const res = await fetch('/api/admin/themes', { cache: 'no-store' })
      if (!res.ok) throw new Error('Erreur lors du chargement des thèmes')
      const data = await res.json()
      setThemes(data.themes || [])
    } catch (err) {
      console.error(err)
      notify.error('Impossible de charger les thèmes d’événements')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchThemes()
  }, [fetchThemes])

  // Active theme is the one currently enabled
  const activeTheme = themes.find((t) => t.isEnabled)

  // Toggle theme ON/OFF
  const handleToggle = async (theme: EventThemeConfig) => {
    const nextState = !theme.isEnabled
    setTogglingSlug(theme.slug)

    try {
      const res = await fetch('/api/admin/themes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'toggle',
          slug: theme.slug,
          isEnabled: nextState,
        }),
      })

      if (!res.ok) throw new Error('Échec de la mise à jour')

      const data = await res.json()
      setThemes(data.themes)

      if (nextState) {
        notify.success(`Thème « ${theme.name} » activé en direct sur le site !`)
      } else {
        notify.info(`Thème « ${theme.name} » désactivé. Le site est en mode classique.`)
      }
    } catch (err) {
      console.error(err)
      notify.error('Erreur lors de la mise à jour du statut')
    } finally {
      setTogglingSlug(null)
    }
  }

  // Handle Create Theme
  const handleCreateTheme = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newTheme.name || !newTheme.slug) {
      notify.error('Veuillez renseigner un nom et un identifiant')
      return
    }

    try {
      setCreating(true)
      const res = await fetch('/api/admin/themes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'create',
          data: newTheme,
        }),
      })

      if (!res.ok) throw new Error('Échec de la création')

      const data = await res.json()
      setThemes(data.themes)
      setShowCreateModal(false)
      setNewTheme({
        name: '',
        slug: '',
        category: 'CUSTOM',
        description: '',
        badgeText: '',
        headline: '',
        highlightText: '',
        accentColor: '#EB4604',
      })
      notify.success('Nouveau thème d’événement créé avec succès !')
    } catch (err) {
      console.error(err)
      notify.error('Erreur lors de la création du thème')
    } finally {
      setCreating(false)
    }
  }

  return (
    <div className="space-y-6 sm:space-y-8 select-none">
      {/* ── Page Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-200/80 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-orange-50 border border-orange-200/60 text-[#EB4604] text-[10.5px] font-bold uppercase tracking-wider">
              <Sparkles className="w-3 h-3" />
              Personnalisation du site
            </span>
            <span className="text-xs text-neutral-400">•</span>
            <span className="text-xs text-neutral-500 font-medium">Contrôle en direct</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0A0D14] tracking-tight">
            Événements & Thèmes
          </h1>
          <p className="text-sm text-neutral-500 mt-1 max-w-2xl leading-relaxed">
            Activez ou désactivez les campagnes saisonnières et événements en un clic. Plus besoin
            de toucher au code pour lancer ou arrêter une personnalisation comme Octobre Rose.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <Link
            href="/"
            target="_blank"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-neutral-200/80 text-neutral-700 hover:text-black hover:border-neutral-300 text-xs font-semibold shadow-xs transition-colors"
          >
            <span>Voir le site</span>
            <ExternalLink className="w-3.5 h-3.5 text-neutral-400" />
          </Link>

          <button
            type="button"
            onClick={() => setShowCreateModal(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#0A0D14] hover:bg-neutral-800 text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4 text-[#EB4604]" />
            <span>Créer un thème</span>
          </button>
        </div>
      </div>

      {/* ── Active Status Banner ── */}
      <div
        className={`rounded-2xl p-4 sm:p-5 border transition-all ${
          activeTheme
            ? 'bg-gradient-to-r from-pink-50/90 via-rose-50/60 to-white border-pink-200/90 shadow-[0_4px_20px_rgba(244,63,94,0.08)]'
            : 'bg-white border-neutral-200/80 shadow-xs'
        }`}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start sm:items-center gap-3.5">
            <div
              className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 shadow-xs ${
                activeTheme
                  ? 'bg-gradient-to-b from-pink-500 to-rose-600 text-white shadow-[0_4px_12px_rgba(244,63,94,0.35)]'
                  : 'bg-neutral-100 text-neutral-500 border border-neutral-200/60'
              }`}
            >
              <Power className="w-5 h-5" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-neutral-500 uppercase tracking-wider">
                  Statut du site public :
                </span>
                {activeTheme ? (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-[11px] font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    En Ligne — Thème « {activeTheme.name} »
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-neutral-100 border border-neutral-200 text-neutral-600 text-[11px] font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-neutral-400" />
                    Mode Classique (Branding standard)
                  </span>
                )}
              </div>

              <p className="text-xs sm:text-[13px] text-neutral-600 mt-1">
                {activeTheme
                  ? `Le thème ${activeTheme.name} est actuellement diffusé sur la page d'accueil (Hero, barre de navigation, modale).`
                  : 'Aucun événement n’est actif. Le site tourne avec son interface standard.'}
              </p>
            </div>
          </div>

          {activeTheme && (
            <div className="flex items-center gap-2.5 shrink-0 sm:self-center">
              <button
                type="button"
                onClick={() => handleToggle(activeTheme)}
                disabled={togglingSlug === activeTheme.slug}
                className="w-full sm:w-auto px-4 py-2 rounded-xl bg-white hover:bg-neutral-50 border border-neutral-200 text-neutral-700 text-xs font-semibold shadow-xs transition-colors cursor-pointer flex items-center justify-center gap-1.5"
              >
                <Power className="w-3.5 h-3.5 text-neutral-600" />
                <span>Désactiver le thème</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  if (activeTheme.slug === 'holiday-season') {
                    setPreviewHolidayModalOpen(true)
                  } else {
                    setPreviewModalOpen(true)
                  }
                }}
                className={`w-full sm:w-auto px-4 py-2 rounded-xl text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer flex items-center justify-center gap-1.5 ${
                  activeTheme.slug === 'holiday-season'
                    ? 'bg-amber-600 hover:bg-amber-700 shadow-[0_2px_10px_rgba(217,119,6,0.3)]'
                    : 'bg-pink-600 hover:bg-pink-700 shadow-[0_2px_10px_rgba(244,63,94,0.3)]'
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Tester la modale</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ── Theme Cards Grid ── */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-bold text-neutral-900 flex items-center gap-2">
            <Layers className="w-4 h-4 text-neutral-500" />
            <span>Catalogue des thèmes d'événements ({themes.length})</span>
          </h2>
          <span className="text-xs text-neutral-400">1 thème actif à la fois</span>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="h-60 rounded-2xl bg-neutral-100 animate-pulse border border-neutral-200"
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
            {themes.map((theme) => {
              const isCurrent = theme.isEnabled
              const isOctobre = theme.slug === 'octobre-rose'
              const isHoliday = theme.slug === 'holiday-season'
              const isToggling = togglingSlug === theme.slug

              return (
                <div
                  key={theme.slug}
                  className={`rounded-2xl border transition-all relative overflow-hidden flex flex-col justify-between ${
                    isCurrent
                      ? isHoliday
                        ? 'bg-white border-amber-300 shadow-[0_8px_30px_rgba(217,119,6,0.12)] ring-2 ring-amber-100'
                        : 'bg-white border-pink-300 shadow-[0_8px_30px_rgba(244,63,94,0.12)] ring-2 ring-pink-100'
                      : 'bg-white border-neutral-200/90 shadow-2xs hover:border-neutral-300'
                  }`}
                >
                  {/* Top Header Card */}
                  <div className="p-5 sm:p-6 pb-4">
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="flex items-center gap-3">
                        {/* Theme Icon / Thumbnail */}
                        <div
                          className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border ${
                            isHoliday
                              ? 'bg-amber-50 border-amber-200 shadow-2xs'
                              : isOctobre
                              ? 'bg-pink-50 border-pink-200 shadow-2xs'
                              : 'bg-neutral-50 border-neutral-200'
                          }`}
                        >
                          {isHoliday ? (
                            <Image
                              src="/images/heroes/holiday-starburst-ornament.webp"
                              alt="Emblème de Noël"
                              width={40}
                              height={40}
                              className="w-9 h-9 object-contain drop-shadow-[0_2px_6px_rgba(217,119,6,0.45)]"
                            />
                          ) : isOctobre ? (
                            <Image
                              src="/images/heroes/pink-october-ribbon-dock.webp"
                              alt="Ruban rose"
                              width={36}
                              height={36}
                              className="w-8 h-8 object-contain drop-shadow-[0_2px_6px_rgba(244,63,94,0.4)]"
                            />
                          ) : (
                            <Sparkles
                              className="w-5 h-5"
                              style={{ color: theme.accentColor || '#EB4604' }}
                            />
                          )}
                        </div>

                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="text-base font-bold text-neutral-900">{theme.name}</h3>
                            <span
                              className={`text-[9.5px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                                theme.category === 'AWARENESS'
                                  ? 'bg-pink-50 text-pink-700 border border-pink-200'
                                  : theme.category === 'HOLIDAY'
                                  ? 'bg-amber-50 text-amber-700 border border-amber-200'
                                  : theme.category === 'PROMO'
                                  ? 'bg-purple-50 text-purple-700 border border-purple-200'
                                  : 'bg-neutral-100 text-neutral-700 border border-neutral-200'
                              }`}
                            >
                              {theme.category}
                            </span>
                          </div>
                          <p className="text-xs text-neutral-400 font-mono mt-0.5">
                            identifiant: {theme.slug}
                          </p>
                        </div>
                      </div>

                      {/* On/Off Switch */}
                      <button
                        type="button"
                        onClick={() => handleToggle(theme)}
                        disabled={isToggling}
                        title={isCurrent ? 'Désactiver le thème' : 'Activer ce thème'}
                        className={`relative inline-flex h-7 w-13 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                          isCurrent ? 'bg-emerald-500' : 'bg-neutral-200'
                        }`}
                      >
                        <span
                          className={`pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
                            isCurrent ? 'translate-x-6' : 'translate-x-0'
                          }`}
                        />
                      </button>
                    </div>

                    <p className="text-xs text-neutral-600 leading-relaxed mb-4">
                      {theme.description || 'Personnalisation saisonnière pour la plateforme.'}
                    </p>

                    {/* Features Badges */}
                    <div className="space-y-1.5 pt-3 border-t border-neutral-100 text-xs">
                      <div className="flex items-center justify-between text-neutral-600">
                        <span className="flex items-center gap-1.5">
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Animation plein écran Hero</span>
                        </span>
                        <span className="font-semibold text-neutral-900">
                          {theme.showCenterAnim ? 'Activé' : 'Désactivé'}
                        </span>
                      </div>

                      <div className="flex items-center justify-between text-neutral-600">
                        <span className="flex items-center gap-1.5">
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Icône dockée dans la Navbar</span>
                        </span>
                        <span className="font-semibold text-neutral-900">
                          {theme.showNavbarDock ? 'Activé' : 'Désactivé'}
                        </span>
                      </div>

                      <div className="flex items-center justify-between text-neutral-600">
                        <span className="flex items-center gap-1.5">
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Modale d'information dédiée</span>
                        </span>
                        <span className="font-semibold text-neutral-900">
                          {theme.showModal ? 'Activé' : 'Désactivé'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Action Footer */}
                  <div
                    className={`px-5 py-3 border-t flex items-center justify-between text-xs ${
                      isCurrent
                        ? 'bg-pink-50/50 border-pink-100 text-pink-900'
                        : 'bg-neutral-50/70 border-neutral-100 text-neutral-500'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {isCurrent ? (
                        <span className="inline-flex items-center gap-1 font-bold text-emerald-700">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          Actuellement en ligne
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-neutral-500">
                          <XCircle className="w-3.5 h-3.5 text-neutral-400" />
                          Inactif
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      {isHoliday && (
                        <button
                          type="button"
                          onClick={() => setPreviewHolidayModalOpen(true)}
                          className="px-2.5 py-1 rounded-lg bg-white border border-amber-200 text-amber-800 hover:text-black hover:border-amber-300 font-semibold text-[11px] transition-colors cursor-pointer flex items-center gap-1 shadow-2xs"
                        >
                          <Eye className="w-3 h-3 text-amber-600" />
                          <span>Aperçu</span>
                        </button>
                      )}

                      {isOctobre && (
                        <button
                          type="button"
                          onClick={() => setPreviewModalOpen(true)}
                          className="px-2.5 py-1 rounded-lg bg-white border border-neutral-200 text-neutral-700 hover:text-black hover:border-neutral-300 font-semibold text-[11px] transition-colors cursor-pointer flex items-center gap-1"
                        >
                          <Eye className="w-3 h-3 text-neutral-500" />
                          <span>Aperçu</span>
                        </button>
                      )}

                      <button
                        type="button"
                        onClick={() => handleToggle(theme)}
                        disabled={isToggling}
                        className={`px-3 py-1 rounded-lg font-semibold text-[11px] transition-colors cursor-pointer ${
                          isCurrent
                            ? 'bg-white border border-pink-200 text-pink-700 hover:bg-pink-100/50'
                            : 'bg-[#0A0D14] hover:bg-neutral-800 text-white'
                        }`}
                      >
                        {isCurrent ? 'Désactiver' : 'Activer ce thème'}
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* ── Direct Preview of Live Modals ── */}
      <PinkOctoberModal isOpen={previewModalOpen} onClose={() => setPreviewModalOpen(false)} />
      <HolidayModal isOpen={previewHolidayModalOpen} onClose={() => setPreviewHolidayModalOpen(false)} />

      {/* ── Create New Theme Modal ── */}
      {showCreateModal && (
        <div
          onClick={() => setShowCreateModal(false)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs select-none"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg bg-white rounded-3xl p-6 sm:p-7 border border-neutral-200 shadow-2xl relative animate-in zoom-in-95 duration-200"
          >
            <div className="flex items-center justify-between pb-3.5 border-b border-neutral-100 mb-5">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-orange-50 border border-orange-200 flex items-center justify-center text-[#EB4604]">
                  <Sparkles className="w-4 h-4" />
                </div>
                <h3 className="text-lg font-bold text-neutral-900">Nouveau thème d'événement</h3>
              </div>

              <button
                type="button"
                onClick={() => setShowCreateModal(false)}
                className="w-8 h-8 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-600 flex items-center justify-center cursor-pointer transition-colors"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateTheme} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-neutral-700 mb-1">
                  Nom de l'événement <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Fête de l'Indépendance"
                  value={newTheme.name}
                  onChange={(e) => {
                    const name = e.target.value
                    const slug = name
                      .toLowerCase()
                      .normalize('NFD')
                      .replace(/[\u0300-\u036f]/g, '')
                      .replace(/[^a-z0-9]+/g, '-')
                      .replace(/(^-|-$)+/g, '')
                    setNewTheme({ ...newTheme, name, slug })
                  }}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 text-sm focus:outline-none focus:border-[#EB4604] focus:ring-2 focus:ring-[#EB4604]/10"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-neutral-700 mb-1">
                    Identifiant (slug) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="ex: fete-independance"
                    value={newTheme.slug}
                    onChange={(e) => setNewTheme({ ...newTheme, slug: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-neutral-200 text-xs font-mono focus:outline-none focus:border-[#EB4604]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-700 mb-1">Catégorie</label>
                  <select
                    value={newTheme.category}
                    onChange={(e) =>
                      setNewTheme({ ...newTheme, category: e.target.value as any })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-neutral-200 text-xs focus:outline-none focus:border-[#EB4604]"
                  >
                    <option value="CUSTOM">Personnalisé</option>
                    <option value="HOLIDAY">Fêtes & Célébration</option>
                    <option value="AWARENESS">Sensibilisation</option>
                    <option value="PROMO">Promotion / Offres</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-700 mb-1">
                  Description courte
                </label>
                <textarea
                  rows={2}
                  placeholder="Objectif de la campagne..."
                  value={newTheme.description}
                  onChange={(e) => setNewTheme({ ...newTheme, description: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-neutral-200 text-xs focus:outline-none focus:border-[#EB4604]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-neutral-700 mb-1">
                    Texte du badge
                  </label>
                  <input
                    type="text"
                    placeholder="Ex: CÉLÉBRATION NATIONALE"
                    value={newTheme.badgeText}
                    onChange={(e) => setNewTheme({ ...newTheme, badgeText: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-neutral-200 text-xs focus:outline-none focus:border-[#EB4604]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-700 mb-1">
                    Couleur d'accent (Hex)
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={newTheme.accentColor}
                      onChange={(e) => setNewTheme({ ...newTheme, accentColor: e.target.value })}
                      className="w-9 h-9 rounded-lg border border-neutral-200 cursor-pointer p-0.5"
                    />
                    <input
                      type="text"
                      value={newTheme.accentColor}
                      onChange={(e) => setNewTheme({ ...newTheme, accentColor: e.target.value })}
                      className="w-full px-3 py-1.5 rounded-xl border border-neutral-200 text-xs font-mono uppercase"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-3 flex items-center justify-end gap-2.5 border-t border-neutral-100">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-700 text-xs font-medium cursor-pointer transition-colors"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  disabled={creating}
                  className="px-5 py-2 rounded-xl bg-[#0A0D14] hover:bg-neutral-800 text-white text-xs font-semibold shadow-xs cursor-pointer transition-colors flex items-center gap-1.5"
                >
                  {creating ? 'Création en cours...' : 'Enregistrer le thème'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
