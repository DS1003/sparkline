'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { PageHero } from '@/components/layout/PageHero'
import { Container } from '@/components/layout/Container'
import { Section } from '@/components/layout/Section'
import { Footer } from '@/components/layout/Footer'
import { Tag } from '@/components/ui/Tag'
import { RevealOnScroll } from '@/components/motion/RevealOnScroll'
import { siteConfig } from '@/config/site'

const serviceOptions = [
  'Applications Web & Mobile',
  'Design UI/UX & Produit',
  'Identité & Design System',
  'Ingénierie & Architecture',
  'Transformation Digitale',
  'Sparklearn Formation',
]

const budgetOptions = [
  '< 5M FCFA',
  '5M - 15M FCFA',
  '15M - 30M FCFA',
  '> 30M FCFA',
]

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'Applications Web & Mobile',
    preferredDate: '',
    budget: '5M - 15M FCFA',
    message: '',
  })

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setSubmitted(true)
    }, 800)
  }

  return (
    <main className="min-h-screen bg-[#F7F8FA] text-neutral-900">
      {/* ── 1. HERO OF THE CONTACT PAGE ── */}
      <PageHero
        tag="Nous Contacter"
        title="Parlons de votre projet et"
        highlight="illuminons vos ambitions."
        subtitle="Que vous lanciez un produit digital, développiez une marque ou formiez vos équipes — nous sommes prêts à collaborer."
        breadcrumbs={[{ label: 'Contact', href: '/contact' }]}
      />

      {/* ── 2. SMOOTH 3D SOFT PILL CONTACT SECTION ── */}
      <Section className="py-10 sm:py-20 lg:py-28 bg-[#F7F8FA]">
        <Container>
          {/* Top Section Header */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 sm:gap-6 mb-8 sm:mb-14">
            <div className="space-y-2.5 sm:space-y-3">
              <RevealOnScroll>
                <Tag variant="v2">Planifier un projet</Tag>
              </RevealOnScroll>
              <RevealOnScroll delay={0.08}>
                <h2
                  className="text-3xl sm:text-5xl lg:text-[64px] font-normal text-[#0A0A0A] leading-[1.06] tracking-[-0.035em]"
                  style={{ fontFamily: 'var(--font-family--primary-font)' }}
                >
                  Contactez-nous
                </h2>
              </RevealOnScroll>
            </div>

            <RevealOnScroll delay={0.12}>
              <p className="text-xs sm:text-base text-neutral-500 font-light leading-relaxed max-w-sm lg:text-right">
                Dites-nous où vous souhaitez aller et nous étudierons votre projet sous 24 heures ouvrées.
              </p>
            </RevealOnScroll>
          </div>

          {/* Main Bento Grid: Form Card + Visual Image Card */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch mb-10 sm:mb-16">
            {/* ── Left Form Card: Smooth 3D Tactile Ceramic ── */}
            <div className="lg:col-span-7 bg-white rounded-[28px] sm:rounded-[40px] p-5 sm:p-9 lg:p-10 border border-neutral-200/80 shadow-[inset_0_1px_1px_rgba(255,255,255,1),inset_0_-2px_4px_rgba(0,0,0,0.03),0_16px_40px_-15px_rgba(0,0,0,0.06)] flex flex-col justify-between relative">
              {submitted ? (
                <div className="text-center py-12 sm:py-16 space-y-4 my-auto">
                  <div className="w-16 h-16 rounded-full bg-[#EB4604] text-white flex items-center justify-center text-2xl font-bold mx-auto mb-3 shadow-[inset_0_1.5px_1px_rgba(255,255,255,0.5),inset_0_-2px_3px_rgba(0,0,0,0.25),0_6px_20px_rgba(235,70,4,0.3)]">
                    ✓
                  </div>
                  <h3
                    className="text-xl sm:text-3xl font-bold text-[#0A0A0A] tracking-tight"
                    style={{ fontFamily: 'var(--font-family--primary-font)' }}
                  >
                    Demande transmise avec succès !
                  </h3>
                  <p className="text-neutral-500 text-xs sm:text-sm max-w-md mx-auto font-light leading-relaxed">
                    Votre message a bien été reçu. Nos directeurs de projet étudient vos éléments et reviendront vers vous sous 24 heures ouvrées.
                  </p>
                  <div className="pt-3">
                    <button
                      onClick={() => setSubmitted(false)}
                      className="px-7 py-3.5 rounded-full bg-[#0A0A0A] text-white text-xs font-semibold hover:bg-[#EB4604] shadow-[inset_0_1px_1px_rgba(255,255,255,0.3),inset_0_-2px_2px_rgba(0,0,0,0.4),0_4px_12px_rgba(0,0,0,0.15)] active:scale-98 transition-all cursor-pointer"
                    >
                      Envoyer une autre demande
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Clean Header Indicator */}
                  <div className="flex items-center justify-between pb-2 border-b border-neutral-100">
                    <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-neutral-400 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#EB4604]" />
                      Brief de votre projet
                    </span>
                    <span className="text-[10px] font-mono text-neutral-400">
                      Réponse sous 24h
                    </span>
                  </div>

                  {/* 1. Smooth 3D Pill Chips: Service Scope (2-Cols on Mobile / 3-Cols on Desktop) */}
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-neutral-700 block">
                      Quel est votre besoin principal ?
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {serviceOptions.map((service) => {
                        const isSelected = formData.service === service
                        return (
                          <button
                            key={service}
                            type="button"
                            onClick={() => setFormData({ ...formData, service })}
                            className={`px-3 py-2 rounded-full text-[11px] sm:text-xs font-medium transition-all duration-200 cursor-pointer flex items-center justify-between gap-1 w-full ${
                              isSelected
                                ? 'bg-[#0A0A0A] text-white border border-[#0A0A0A] shadow-[inset_0_1px_1px_rgba(255,255,255,0.3),inset_0_-2px_2px_rgba(0,0,0,0.35),0_4px_12px_rgba(0,0,0,0.15)] scale-[1.01]'
                                : 'bg-white text-neutral-700 border border-neutral-200/90 shadow-[inset_0_1px_1px_rgba(255,255,255,1),inset_0_-1.5px_2px_rgba(0,0,0,0.04),0_2px_6px_rgba(0,0,0,0.04)] hover:shadow-[inset_0_1px_1px_rgba(255,255,255,1),inset_0_-1.5px_2px_rgba(0,0,0,0.08),0_4px_10px_rgba(0,0,0,0.06)] hover:scale-[1.01] active:scale-[0.98]'
                            }`}
                          >
                            <span className="truncate">{service}</span>
                            <span className={isSelected ? 'text-[#EB4604] shrink-0' : 'text-neutral-400 shrink-0'}>
                              {isSelected ? '●' : '+'}
                            </span>
                          </button>
                        )
                      })}
                    </div>
                  </div>

                  {/* 2. Soft Inset Inputs: Name & Email (Strictly 2 by 2 on mobile) */}
                  <div className="grid grid-cols-2 gap-2.5 sm:gap-4">
                    <div className="space-y-1 sm:space-y-1.5 min-w-0">
                      <label className="text-[11px] sm:text-xs font-semibold text-neutral-700 block truncate">
                        Nom complet <span className="text-[#EB4604]">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Fanta Ndao"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl sm:rounded-2xl bg-[#F8F9FB] focus:bg-white text-xs sm:text-sm text-neutral-900 placeholder:text-neutral-400 border border-neutral-200/90 shadow-[inset_0_1.5px_3px_rgba(0,0,0,0.04)] focus:border-[#EB4604] focus:shadow-[0_0_0_3px_rgba(235,70,4,0.12)] focus:outline-none transition-all font-medium"
                      />
                    </div>

                    <div className="space-y-1 sm:space-y-1.5 min-w-0">
                      <label className="text-[11px] sm:text-xs font-semibold text-neutral-700 block truncate">
                        Adresse e-mail <span className="text-[#EB4604]">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="fanta@entreprise.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl sm:rounded-2xl bg-[#F8F9FB] focus:bg-white text-xs sm:text-sm text-neutral-900 placeholder:text-neutral-400 border border-neutral-200/90 shadow-[inset_0_1.5px_3px_rgba(0,0,0,0.04)] focus:border-[#EB4604] focus:shadow-[0_0_0_3px_rgba(235,70,4,0.12)] focus:outline-none transition-all font-medium"
                      />
                    </div>
                  </div>

                  {/* 3. Soft Inset Inputs: Phone & Preferred Date (Strictly 2 by 2 on mobile) */}
                  <div className="grid grid-cols-2 gap-2.5 sm:gap-4">
                    <div className="space-y-1 sm:space-y-1.5 min-w-0">
                      <label className="text-[11px] sm:text-xs font-semibold text-neutral-700 block truncate">
                        Téléphone / WhatsApp
                      </label>
                      <input
                        type="tel"
                        placeholder="+221 78 528 63 30"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl sm:rounded-2xl bg-[#F8F9FB] focus:bg-white text-xs sm:text-sm text-neutral-900 placeholder:text-neutral-400 border border-neutral-200/90 shadow-[inset_0_1.5px_3px_rgba(0,0,0,0.04)] focus:border-[#EB4604] focus:shadow-[0_0_0_3px_rgba(235,70,4,0.12)] focus:outline-none transition-all font-medium"
                      />
                    </div>

                    <div className="space-y-1 sm:space-y-1.5 min-w-0">
                      <label className="text-[11px] sm:text-xs font-semibold text-neutral-700 block truncate">
                        Délai visé
                      </label>
                      <input
                        type="text"
                        placeholder="Dès que possible"
                        value={formData.preferredDate}
                        onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                        className="w-full px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl sm:rounded-2xl bg-[#F8F9FB] focus:bg-white text-xs sm:text-sm text-neutral-900 placeholder:text-neutral-400 border border-neutral-200/90 shadow-[inset_0_1.5px_3px_rgba(0,0,0,0.04)] focus:border-[#EB4604] focus:shadow-[0_0_0_3px_rgba(235,70,4,0.12)] focus:outline-none transition-all font-medium"
                      />
                    </div>
                  </div>

                  {/* 4. Smooth 3D Segmented Pills: Budget */}
                  <div className="space-y-1.5 sm:space-y-2">
                    <label className="text-xs font-semibold text-neutral-700 block">
                      Budget estimé
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {budgetOptions.map((budget) => {
                        const isSelected = formData.budget === budget
                        return (
                          <button
                            key={budget}
                            type="button"
                            onClick={() => setFormData({ ...formData, budget })}
                            className={`py-2 sm:py-2.5 px-2.5 sm:px-3 rounded-full text-xs font-mono font-medium transition-all duration-200 text-center cursor-pointer ${
                              isSelected
                                ? 'bg-[#EB4604] text-white border border-[#EB4604] shadow-[inset_0_1.5px_1px_rgba(255,255,255,0.45),inset_0_-2px_3px_rgba(0,0,0,0.2),0_4px_14px_rgba(235,70,4,0.3)] font-bold scale-[1.01]'
                                : 'bg-white text-neutral-700 border border-neutral-200/90 shadow-[inset_0_1px_1px_rgba(255,255,255,1),inset_0_-1.5px_2px_rgba(0,0,0,0.04),0_2px_6px_rgba(0,0,0,0.04)] hover:shadow-[inset_0_1px_1px_rgba(255,255,255,1),inset_0_-1.5px_2px_rgba(0,0,0,0.08),0_4px_10px_rgba(0,0,0,0.06)] hover:scale-[1.01] active:scale-[0.98]'
                            }`}
                          >
                            {budget}
                          </button>
                        )
                      })}
                    </div>
                  </div>

                  {/* 5. Soft Inset Textarea: Message */}
                  <div className="space-y-1 sm:space-y-1.5">
                    <label className="text-xs font-semibold text-neutral-700 block">
                      Message &amp; Détails du projet
                    </label>
                    <textarea
                      rows={2.5 as unknown as number}
                      placeholder="Décrivez vos ambitions, vos attentes et les points clés de votre projet..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-3.5 sm:px-4 py-2 sm:py-3 rounded-xl sm:rounded-2xl bg-[#F8F9FB] focus:bg-white text-xs sm:text-sm text-neutral-900 placeholder:text-neutral-400 border border-neutral-200/90 shadow-[inset_0_1.5px_3px_rgba(0,0,0,0.04)] focus:border-[#EB4604] focus:shadow-[0_0_0_3px_rgba(235,70,4,0.12)] focus:outline-none transition-all resize-none font-medium"
                    />
                  </div>

                  {/* 6. Smooth 3D Master Action Pill Button */}
                  <div className="pt-1 sm:pt-2">
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-3 sm:py-3.5 px-6 sm:px-7 rounded-full bg-[#EB4604] hover:bg-[#D43D00] text-white font-semibold text-xs sm:text-sm shadow-[inset_0_1.5px_1px_rgba(255,255,255,0.4),inset_0_-2.5px_3px_rgba(0,0,0,0.25),0_8px_24px_rgba(235,70,4,0.35)] hover:shadow-[0_10px_28px_rgba(235,70,4,0.45)] active:translate-y-[1px] active:shadow-[inset_0_1px_1px_rgba(255,255,255,0.2),inset_0_-1px_2px_rgba(0,0,0,0.3),0_4px_12px_rgba(235,70,4,0.25)] transition-all flex items-center justify-between group cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <span>{loading ? 'Envoi en cours...' : 'Envoyer votre demande'}</span>
                      <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white text-[#EB4604] flex items-center justify-center font-bold text-xs shadow-sm transition-transform group-hover:translate-x-1 shrink-0">
                        ↗
                      </span>
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* ── Right Imagery Card (Smooth Rounded 3D) ── */}
            <div className="lg:col-span-5 relative rounded-[28px] sm:rounded-[40px] overflow-hidden min-h-[220px] sm:min-h-[380px] lg:min-h-full border border-neutral-200/80 shadow-[inset_0_1px_1px_rgba(255,255,255,1),inset_0_-2px_4px_rgba(0,0,0,0.03),0_16px_40px_-15px_rgba(0,0,0,0.06)] group flex flex-col justify-between p-5 sm:p-8">
              <Image
                src="/images/approach/step-1.jpg"
                alt="SPARKLINE Studio & Collaboration"
                fill
                quality={85}
                className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />

              {/* Smooth cinematic dark overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/20 pointer-events-none" />

              {/* Floating Top Right Soft Pill Badge */}
              <div className="relative z-10 flex justify-end">
                <span className="px-4 py-1.5 rounded-full bg-white/25 backdrop-blur-md text-white text-xs font-mono border border-white/30 shadow-[inset_0_1px_1px_rgba(255,255,255,0.4),0_2px_8px_rgba(0,0,0,0.15)]">
                  Votre Vision ↗
                </span>
              </div>

              {/* Bottom Quote & Brand Identity */}
              <div className="relative z-10 text-white space-y-2 pt-14 sm:pt-24">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#EB4604] font-bold block">
                  Studio SPARKLINE
                </span>
                <p className="text-sm sm:text-base font-light text-white leading-snug">
                  « Nous concevons des produits d’exception pour les entreprises et bâtisseurs audacieux. »
                </p>
                <span className="text-xs font-mono text-neutral-300 block pt-0.5">
                  Dakar, Sénégal
                </span>
              </div>
            </div>
          </div>

          {/* ── 3. BOTTOM 3-COLUMN CONTACT INFO (SEAMLESS EDITORIAL DOCK) ── */}
          <div className="grid grid-cols-3 gap-3 sm:gap-8 lg:gap-12 pt-8 sm:pt-12 border-t border-neutral-200/70">
            {/* Col 1: Call & WhatsApp */}
            <div className="flex flex-col items-center text-center space-y-2 sm:space-y-3 group min-w-0">
              <div className="w-10 h-10 sm:w-13 sm:h-13 rounded-2xl bg-white border border-neutral-200/90 shadow-[inset_0_1.5px_1px_rgba(255,255,255,1),inset_0_-2px_3px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.04)] flex items-center justify-center text-neutral-800 group-hover:border-[#EB4604]/40 group-hover:text-[#EB4604] group-hover:scale-105 transition-all duration-300 shrink-0">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:-rotate-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div className="space-y-0.5 sm:space-y-1 w-full overflow-hidden">
                <h4 className="text-xs sm:text-base font-bold text-[#0A0A0A] tracking-tight truncate group-hover:text-[#EB4604] transition-colors" style={{ fontFamily: 'var(--font-family--primary-font)' }}>
                  Téléphone
                </h4>
                <a href="tel:+221785286330" className="text-[10px] sm:text-sm text-neutral-800 hover:text-[#EB4604] transition-colors block font-semibold truncate">
                  +221 78 528 63 30
                </a>
                <span className="text-[9px] sm:text-xs text-neutral-400 font-light block truncate">
                  WhatsApp Direct
                </span>
              </div>
            </div>

            {/* Col 2: Working Hours */}
            <div className="flex flex-col items-center text-center space-y-2 sm:space-y-3 group min-w-0">
              <div className="w-10 h-10 sm:w-13 sm:h-13 rounded-2xl bg-white border border-neutral-200/90 shadow-[inset_0_1.5px_1px_rgba(255,255,255,1),inset_0_-2px_3px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.04)] flex items-center justify-center text-neutral-800 group-hover:border-[#EB4604]/40 group-hover:text-[#EB4604] group-hover:scale-105 transition-all duration-300 shrink-0">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:rotate-45" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="space-y-0.5 sm:space-y-1 w-full overflow-hidden">
                <h4 className="text-xs sm:text-base font-bold text-[#0A0A0A] tracking-tight truncate group-hover:text-[#EB4604] transition-colors" style={{ fontFamily: 'var(--font-family--primary-font)' }}>
                  Horaires
                </h4>
                <p className="text-[10px] sm:text-sm text-neutral-800 font-semibold truncate">
                  08h30 - 18h30
                </p>
                <span className="text-[9px] sm:text-xs text-neutral-400 font-light block truncate">
                  Lun - Ven (Dakar)
                </span>
              </div>
            </div>

            {/* Col 3: Write to Us */}
            <div className="flex flex-col items-center text-center space-y-2 sm:space-y-3 group min-w-0">
              <div className="w-10 h-10 sm:w-13 sm:h-13 rounded-2xl bg-white border border-neutral-200/90 shadow-[inset_0_1.5px_1px_rgba(255,255,255,1),inset_0_-2px_3px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.04)] flex items-center justify-center text-neutral-800 group-hover:border-[#EB4604]/40 group-hover:text-[#EB4604] group-hover:scale-105 transition-all duration-300 shrink-0">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:-translate-y-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="space-y-0.5 sm:space-y-1 w-full overflow-hidden">
                <h4 className="text-xs sm:text-base font-bold text-[#0A0A0A] tracking-tight truncate group-hover:text-[#EB4604] transition-colors" style={{ fontFamily: 'var(--font-family--primary-font)' }}>
                  E-mail
                </h4>
                <a href={`mailto:${siteConfig.contact.email}`} className="text-[10px] sm:text-sm text-neutral-800 hover:text-[#EB4604] transition-colors block font-semibold truncate">
                  {siteConfig.contact.email}
                </a>
                <span className="text-[9px] sm:text-xs text-neutral-400 font-light block truncate">
                  Réponse &lt; 24h
                </span>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Footer />
    </main>
  )
}
