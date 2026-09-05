'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { PageHero } from '@/components/layout/PageHero'
import { SectionCTA } from '@/components/layout/SectionCTA'
import { siteConfig } from '@/config/site'

export interface LegalHighlight {
  label: string
  value: string
  description: string
  icon: React.ReactNode
}

export interface LegalSection {
  id: string
  number: string
  title: string
  summary?: string
  icon: React.ReactNode
  content: React.ReactNode
}

export interface LegalPageLayoutProps {
  // PageHero props
  tag: string
  title: string
  highlight: string
  pillImage: string
  subtitle: string
  breadcrumbs: { label: string; shortLabel?: string; href: string }[]
  metaItems: { label: string; shortLabel?: string; value: string }[]

  // Main legal content
  badgeLabel: string
  documentVersion: string
  highlights: LegalHighlight[]
  sections: LegalSection[]

  // Bottom CTA props
  ctaTag?: string
  ctaTitle?: string
  ctaSubtitle?: string
  ctaPrimaryLabel?: string
  ctaPrimaryHref?: string
  ctaSecondaryLabel?: string
  ctaSecondaryHref?: string
}

export function LegalPageLayout({
  tag,
  title,
  highlight,
  pillImage,
  subtitle,
  breadcrumbs,
  metaItems,
  badgeLabel,
  documentVersion,
  highlights,
  sections,
  ctaTag = 'Besoin d’éclaircissements ?',
  ctaTitle = 'NOUS RÉPONDONS À TOUTES VOS QUESTIONS.',
  ctaSubtitle = 'Notre équipe d’ingénierie et de conseil est à votre entière disposition pour échanger en toute transparence sur nos engagements.',
  ctaPrimaryLabel = 'Contacter le studio',
  ctaPrimaryHref = '/contact',
  ctaSecondaryLabel = 'Découvrir nos réalisations',
  ctaSecondaryHref = '/projects',
}: LegalPageLayoutProps) {
  const [activeSection, setActiveSection] = useState<string>(sections[0]?.id || '')
  // Mobile accordion state: only article 01 open by default for zero long scroll
  const [openMobileIds, setOpenMobileIds] = useState<Record<string, boolean>>({
    [sections[0]?.id || '']: true,
  })

  const toggleMobileSection = (id: string) => {
    setOpenMobileIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  const toggleAllMobile = (expand: boolean) => {
    const next: Record<string, boolean> = {}
    sections.forEach((s) => {
      next[s.id] = expand
    })
    setOpenMobileIds(next)
  }

  const allMobileExpanded = sections.every((s) => !!openMobileIds[s.id])

  // Desktop active section detection via scroll position
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 180
      for (const section of sections) {
        const el = document.getElementById(section.id)
        if (el) {
          const top = el.offsetTop
          const height = el.offsetHeight
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section.id)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [sections])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      const yOffset = -90
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset
      window.scrollTo({ top: y, behavior: 'smooth' })
      setActiveSection(id)
    }
  }

  return (
    <main className="min-h-screen bg-white text-neutral-900">
      {/* ── 1. Page Hero with Signature Capsule & High-Impact Typography ── */}
      <PageHero
        tag={tag}
        title={title}
        pillImage={pillImage}
        highlight={highlight}
        subtitle={subtitle}
        breadcrumbs={breadcrumbs}
        metaItems={metaItems}
      />

      {/* ── 2. Light Mode Minimalist Content Section ── */}
      <section className="w-full bg-white py-8 sm:py-14 lg:py-20">
        <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 space-y-8 sm:space-y-12">
          
          {/* Top Status & 3 Minimalist Bento Pillars */}
          <div className="space-y-4 sm:space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-4 sm:pb-6 border-b border-neutral-200/80 text-xs font-mono">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#EB4604] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#EB4604]" />
                </span>
                <span className="font-semibold uppercase tracking-wider text-neutral-800">
                  {badgeLabel}
                </span>
              </div>

              <div className="flex items-center gap-3 text-neutral-500">
                <span>Version : <strong className="text-neutral-900 font-semibold">{documentVersion}</strong></span>
                <span className="text-neutral-300">•</span>
                <span>Dakar, Sénégal</span>
              </div>
            </div>

            {/* 3 Bento Pillar Cards: Compact on Mobile, Grid on Desktop */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
              {highlights.map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 sm:p-6 rounded-2xl bg-[#F8F9FB] hover:bg-white border border-neutral-200/80 hover:border-[#EB4604]/40 transition-all duration-300 shadow-[0_2px_10px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.05)] group"
                >
                  <div className="flex items-center sm:items-start justify-between gap-3 mb-2 sm:mb-3">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-white border border-neutral-200/80 flex items-center justify-center text-[#EB4604] shadow-2xs group-hover:scale-105 transition-transform duration-300 shrink-0">
                      {item.icon}
                    </div>
                    <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider">
                      {item.label}
                    </span>
                  </div>
                  <h3 className="text-sm sm:text-base lg:text-lg font-bold text-neutral-900 tracking-tight mb-1">
                    {item.value}
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-500 font-normal leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* ── MOBILE ACCORDION (lg:hidden): ULTRA-ÉPURÉ, NO LONG SCROLL ── */}
          <div className="lg:hidden space-y-3">
            {/* Header with expand/collapse all toggle */}
            <div className="flex items-center justify-between px-1 py-1 text-xs">
              <span className="font-mono text-[11px] text-neutral-500 uppercase tracking-wider font-semibold">
                Articles & Dispositions ({sections.length})
              </span>
              <button
                onClick={() => toggleAllMobile(!allMobileExpanded)}
                className="text-[11px] font-mono text-[#EB4604] hover:underline font-semibold"
              >
                {allMobileExpanded ? 'Tout replier' : 'Tout déplier'}
              </button>
            </div>

            {/* Accordion Cards */}
            <div className="space-y-2.5">
              {sections.map((sec) => {
                const isOpen = !!openMobileIds[sec.id]
                return (
                  <div
                    key={sec.id}
                    id={`mobile-${sec.id}`}
                    className="rounded-2xl bg-white border border-neutral-200/90 shadow-[0_2px_10px_rgba(0,0,0,0.02)] overflow-hidden transition-colors"
                  >
                    {/* Accordion Header Bar */}
                    <button
                      type="button"
                      onClick={() => toggleMobileSection(sec.id)}
                      className="w-full p-4 flex items-center justify-between gap-3 text-left transition-colors hover:bg-neutral-50/70"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <span className="font-mono text-[11px] font-bold text-[#EB4604] px-2 py-0.5 rounded-full bg-[#EB4604]/10 border border-[#EB4604]/20 shrink-0">
                          {sec.number}
                        </span>
                        <div className="min-w-0">
                          <h3 className="text-sm font-bold text-neutral-900 tracking-tight truncate">
                            {sec.title}
                          </h3>
                          {sec.summary && !isOpen && (
                            <p className="text-[11px] text-neutral-500 font-normal truncate mt-0.5">
                              {sec.summary}
                            </p>
                          )}
                        </div>
                      </div>

                      <span
                        className={`w-7 h-7 rounded-full bg-[#F8F9FB] border border-neutral-200/80 flex items-center justify-center text-neutral-500 text-xs shrink-0 transition-transform duration-200 ${
                          isOpen ? 'rotate-180 text-[#EB4604]' : ''
                        }`}
                      >
                        <svg className="w-3.5 h-3.5 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                        </svg>
                      </span>
                    </button>

                    {/* Collapsible Content */}
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25, ease: 'easeInOut' }}
                          className="overflow-hidden"
                        >
                          <div className="p-4 pt-2 border-t border-neutral-100 text-neutral-600 text-xs leading-relaxed space-y-3 bg-[#FCFCFD]">
                            {sec.content}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )
              })}
            </div>

            {/* Compact Direct Line Pill on Mobile */}
            <div className="pt-2">
              <a
                href={`https://wa.me/${siteConfig.contact.phone.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full p-3.5 rounded-2xl bg-[#0A0A0A] hover:bg-[#EB4604] text-white text-xs font-mono font-semibold flex items-center justify-center gap-2.5 transition-all shadow-sm"
              >
                <span className="text-[#25D366] flex items-center shrink-0">
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.03 2 11c0 2.87 1.5 5.43 3.86 7.03L5 22l4.18-1.57C10.07 20.72 11.02 21 12 21c5.52 0 10-4.03 10-9s-4.48-9-10-9z" />
                  </svg>
                </span>
                <span>Une question ? Échanger sur WhatsApp Direct</span>
                <span>↗</span>
              </a>
            </div>
          </div>

          {/* ── DESKTOP 12-COLUMN EDITORIAL GRID (hidden lg:grid) ── */}
          <div className="hidden lg:grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* Left Column: Sticky Editorial Dock */}
            <aside className="lg:col-span-4 sticky top-28 space-y-6">
              {/* Minimalist Table of Contents */}
              <div className="p-6 rounded-2xl bg-[#F8F9FB] border border-neutral-200/80 shadow-[0_2px_12px_rgba(0,0,0,0.02)] space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-neutral-200/70">
                  <span className="font-mono text-xs uppercase tracking-widest text-neutral-500 font-medium">
                    Sommaire interactif
                  </span>
                  <span className="font-mono text-[10px] text-[#EB4604] px-2 py-0.5 rounded-full bg-[#EB4604]/10 border border-[#EB4604]/20 font-bold">
                    {sections.length} Articles
                  </span>
                </div>

                <nav className="space-y-1">
                  {sections.map((sec) => {
                    const isActive = activeSection === sec.id
                    return (
                      <button
                        key={sec.id}
                        onClick={() => scrollToSection(sec.id)}
                        className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs sm:text-sm transition-all duration-200 flex items-center gap-3 group ${
                          isActive
                            ? 'bg-white border border-neutral-200/90 text-neutral-900 font-bold shadow-2xs'
                            : 'text-neutral-600 hover:text-neutral-900 hover:bg-white/60'
                        }`}
                      >
                        <span
                          className={`font-mono text-[11px] font-bold px-1.5 py-0.5 rounded transition-colors ${
                            isActive
                              ? 'bg-[#EB4604] text-white'
                              : 'bg-neutral-200/70 text-neutral-600 group-hover:text-neutral-900'
                          }`}
                        >
                          {sec.number}
                        </span>
                        <span className="truncate flex-1">{sec.title}</span>
                        <span
                          className={`text-xs transition-transform duration-200 ${
                            isActive
                              ? 'text-[#EB4604] translate-x-0.5'
                              : 'text-neutral-400 group-hover:text-neutral-600'
                          }`}
                        >
                          →
                        </span>
                      </button>
                    )
                  })}
                </nav>
              </div>

              {/* Minimalist Support Capsule */}
              <div className="p-6 rounded-2xl bg-[#F8F9FB] border border-neutral-200/80 shadow-[0_2px_12px_rgba(0,0,0,0.02)] space-y-3.5">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#EB4604]" />
                  <h4 className="text-xs font-mono uppercase tracking-widest text-neutral-700 font-semibold">
                    Assistance & Contact
                  </h4>
                </div>
                <p className="text-xs text-neutral-500 leading-relaxed font-light">
                  Pour toute précision juridique ou question relative à vos projets :
                </p>
                <div className="space-y-2 pt-1 text-xs font-mono">
                  <a
                    href={`https://wa.me/${siteConfig.contact.phone.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-2.5 rounded-xl bg-white hover:bg-neutral-50 border border-neutral-200/90 text-neutral-800 hover:text-[#EB4604] transition-all shadow-2xs group"
                  >
                    <span className="flex items-center gap-2 font-semibold">
                      <span className="text-[#EB4604] flex items-center shrink-0">
                        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                          <path d="M12 2C6.48 2 2 6.03 2 11c0 2.87 1.5 5.43 3.86 7.03L5 22l4.18-1.57C10.07 20.72 11.02 21 12 21c5.52 0 10-4.03 10-9s-4.48-9-10-9z" />
                        </svg>
                      </span>
                      <span>WhatsApp Direct</span>
                    </span>
                    <span className="text-neutral-400 group-hover:text-[#EB4604] transition-colors">↗</span>
                  </a>
                  <a
                    href={`tel:${siteConfig.contact.phone.replace(/\s+/g, '')}`}
                    className="flex items-center justify-between p-2.5 rounded-xl bg-white hover:bg-neutral-50 border border-neutral-200/90 text-neutral-700 hover:text-neutral-900 transition-all shadow-2xs group"
                  >
                    <span className="flex items-center gap-2 font-medium">
                      <span className="text-neutral-500 flex items-center shrink-0">
                        <svg className="w-3.5 h-3.5 fill-none stroke-current stroke-[1.8]" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                        </svg>
                      </span>
                      <span>{siteConfig.contact.phone}</span>
                    </span>
                    <span className="text-neutral-400 group-hover:text-neutral-700 transition-colors">→</span>
                  </a>
                  <a
                    href={`mailto:${siteConfig.contact.email}`}
                    className="flex items-center justify-between p-2.5 rounded-xl bg-white hover:bg-neutral-50 border border-neutral-200/90 text-neutral-700 hover:text-neutral-900 transition-all shadow-2xs group"
                  >
                    <span className="flex items-center gap-2 truncate font-medium">
                      <span className="text-neutral-500 flex items-center shrink-0">
                        <svg className="w-3.5 h-3.5 fill-none stroke-current stroke-[1.8]" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                        </svg>
                      </span>
                      <span className="truncate">{siteConfig.contact.email}</span>
                    </span>
                    <span className="text-neutral-400 group-hover:text-neutral-700 transition-colors">→</span>
                  </a>
                </div>
              </div>
            </aside>

            {/* Right Column: Full Detailed Cards */}
            <div className="lg:col-span-8 space-y-6 sm:space-y-8">
              {sections.map((sec) => (
                <article
                  key={sec.id}
                  id={sec.id}
                  className="scroll-mt-28 p-6 sm:p-8 lg:p-10 rounded-2xl sm:rounded-[28px] bg-white border border-neutral-200/80 hover:border-[#EB4604]/40 transition-all duration-300 shadow-[0_2px_16px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_28px_rgba(0,0,0,0.04)] space-y-6 group"
                >
                  {/* Chapter Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-neutral-100">
                    <div className="flex items-center gap-3 sm:gap-4">
                      <div className="w-11 h-11 rounded-xl bg-[#F8F9FB] border border-neutral-200/80 flex items-center justify-center text-[#EB4604] shrink-0 group-hover:scale-105 group-hover:border-[#EB4604]/30 transition-all shadow-2xs">
                        {sec.icon}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-[11px] font-bold text-[#EB4604] px-2 py-0.5 rounded-full bg-[#EB4604]/10 border border-[#EB4604]/20">
                            ARTICLE {sec.number}
                          </span>
                        </div>
                        <h2
                          className="text-lg sm:text-xl lg:text-2xl font-bold text-[#0A0A0A] tracking-tight mt-1"
                          style={{ fontFamily: 'var(--font-family--primary-font)' }}
                        >
                          {sec.title}
                        </h2>
                      </div>
                    </div>
                  </div>

                  {/* Chapter Content */}
                  <div className="text-neutral-600 text-sm sm:text-base leading-relaxed space-y-4 font-normal">
                    {sec.content}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. Bottom Closing CTA Banner ── */}
      <SectionCTA
        tag={ctaTag}
        title={ctaTitle}
        subtitle={ctaSubtitle}
        primaryLabel={ctaPrimaryLabel}
        primaryHref={ctaPrimaryHref}
        secondaryLabel={ctaSecondaryLabel}
        secondaryHref={ctaSecondaryHref}
      />
    </main>
  )
}
