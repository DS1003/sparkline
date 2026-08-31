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
  'Solutions digitales & Applications web',
  'Design UI/UX & Architecture produit',
  'Identité de marque & Plateforme',
  'Ingénierie logicielle & Mobile',
  'Audit digital & Conseil stratégique',
]

const budgetOptions = [
  '< 5 Millions FCFA',
  '5M - 15 Millions FCFA',
  '15M - 30 Millions FCFA',
  '> 30 Millions FCFA',
]

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    preferredDate: '',
    budget: '',
    message: '',
  })

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setSubmitted(true)
    }, 1000)
  }

  return (
    <main className="min-h-screen bg-white text-neutral-900">
      {/* ── 1. UNTOUCHED HERO OF THE CONTACT PAGE ── */}
      <PageHero
        tag="Nous Contacter"
        title="Parlons de votre projet et"
        highlight="illuminons vos ambitions."
        subtitle="Que vous lanciez un produit digital, développiez une marque ou formiez vos équipes — nous sommes prêts à collaborer."
        breadcrumbs={[{ label: 'Contact', href: '/contact' }]}
      />

      {/* ── 2. NEW LIGHT MODERN MIDDLE SECTION (MATCHING REFERENCE DESIGN) ── */}
      <Section className="py-16 sm:py-24 lg:py-32 bg-white">
        <Container>
          {/* Top Section Header */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12 sm:mb-16">
            <div className="space-y-4 max-w-xl">
              <RevealOnScroll>
                <Tag variant="v2">Planifier un projet</Tag>
              </RevealOnScroll>
              <RevealOnScroll delay={0.1}>
                <h2
                  className="text-[clamp(2.5rem,5vw,64px)] font-normal text-[#0A0A0A] leading-[1.05] tracking-[-0.03em]"
                  style={{ fontFamily: 'var(--font-family--primary-font)' }}
                >
                  Contactez-nous
                </h2>
              </RevealOnScroll>
            </div>

            <RevealOnScroll delay={0.15}>
              <p className="text-sm sm:text-base text-neutral-500 font-light leading-relaxed max-w-md lg:text-right">
                Partagez vos ambitions, vos objectifs et vos délais. Notre équipe étudiera votre demande et vous répondra sous 24 heures.
              </p>
            </RevealOnScroll>
          </div>

          {/* Main Grid: Left Form Card + Right Imagery Card */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-20 sm:mb-24">
            {/* ── Left Form Card ── */}
            <div className="lg:col-span-7 bg-[#F8F9FA] rounded-[32px] sm:rounded-[36px] p-7 sm:p-10 lg:p-12 border border-neutral-200/70 shadow-[0_4px_24px_rgba(0,0,0,0.02)] flex flex-col justify-between">
              {submitted ? (
                <div className="text-center py-16 space-y-4 my-auto">
                  <div className="w-16 h-16 rounded-full bg-[#EB4604]/10 text-[#EB4604] flex items-center justify-center text-3xl mx-auto mb-4 border border-[#EB4604]/20">
                    ✓
                  </div>
                  <h3
                    className="text-2xl sm:text-3xl font-bold text-[#0A0A0A] tracking-tight"
                    style={{ fontFamily: 'var(--font-family--primary-font)' }}
                  >
                    Demande transmise avec succès !
                  </h3>
                  <p className="text-neutral-500 text-sm max-w-md mx-auto font-light leading-relaxed">
                    Merci pour votre message. Nos experts analysent vos éléments et reviendront vers vous sous 24 heures ouvrées.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-6 px-8 py-3.5 rounded-full bg-[#0A0A0A] text-white text-xs font-mono font-semibold hover:bg-[#EB4604] transition-colors shadow-md"
                  >
                    Envoyer une autre demande
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Row 1: Name & Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-[#0A0A0A] block">
                        Nom complet
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Votre nom complet"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3.5 rounded-2xl bg-[#EEF0F3] text-sm text-[#0A0A0A] placeholder-neutral-400 border border-transparent focus:border-[#EB4604]/40 focus:bg-white focus:ring-4 focus:ring-[#EB4604]/10 focus:outline-none transition-all"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-[#0A0A0A] block">
                        Adresse e-mail
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="vous@exemple.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3.5 rounded-2xl bg-[#EEF0F3] text-sm text-[#0A0A0A] placeholder-neutral-400 border border-transparent focus:border-[#EB4604]/40 focus:bg-white focus:ring-4 focus:ring-[#EB4604]/10 focus:outline-none transition-all"
                      />
                    </div>
                  </div>

                  {/* Row 2: Phone & Service */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-[#0A0A0A] block">
                        Numéro de téléphone
                      </label>
                      <input
                        type="tel"
                        placeholder="+221 78 528 63 30"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3.5 rounded-2xl bg-[#EEF0F3] text-sm text-[#0A0A0A] placeholder-neutral-400 border border-transparent focus:border-[#EB4604]/40 focus:bg-white focus:ring-4 focus:ring-[#EB4604]/10 focus:outline-none transition-all"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-[#0A0A0A] block">
                        Service souhaité
                      </label>
                      <select
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        className="w-full px-4 py-3.5 rounded-2xl bg-[#EEF0F3] text-sm text-[#0A0A0A] border border-transparent focus:border-[#EB4604]/40 focus:bg-white focus:ring-4 focus:ring-[#EB4604]/10 focus:outline-none transition-all"
                      >
                        <option value="">Sélectionnez un service...</option>
                        {serviceOptions.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Row 3: Date & Budget */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-[#0A0A0A] block">
                        Date souhaitée de démarrage
                      </label>
                      <input
                        type="text"
                        placeholder="jj/mm/aaaa ou dès que possible"
                        value={formData.preferredDate}
                        onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                        className="w-full px-4 py-3.5 rounded-2xl bg-[#EEF0F3] text-sm text-[#0A0A0A] placeholder-neutral-400 border border-transparent focus:border-[#EB4604]/40 focus:bg-white focus:ring-4 focus:ring-[#EB4604]/10 focus:outline-none transition-all"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-[#0A0A0A] block">
                        Budget prévisionnel
                      </label>
                      <select
                        value={formData.budget}
                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                        className="w-full px-4 py-3.5 rounded-2xl bg-[#EEF0F3] text-sm text-[#0A0A0A] border border-transparent focus:border-[#EB4604]/40 focus:bg-white focus:ring-4 focus:ring-[#EB4604]/10 focus:outline-none transition-all"
                      >
                        <option value="">Sélectionnez un budget...</option>
                        {budgetOptions.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Row 4: Message */}
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-[#0A0A0A] block">
                      Message / Détails du projet
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Parlez-nous de votre vision, de vos défis clés et de vos attentes..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-2xl bg-[#EEF0F3] text-sm text-[#0A0A0A] placeholder-neutral-400 border border-transparent focus:border-[#EB4604]/40 focus:bg-white focus:ring-4 focus:ring-[#EB4604]/10 focus:outline-none transition-all resize-none"
                    />
                  </div>

                  {/* Bottom Submit Button Pill (Matching Reference Design) */}
                  <div className="pt-2 flex items-center gap-2">
                    <button
                      type="submit"
                      disabled={loading}
                      className="px-8 py-4 rounded-full bg-[#0A0A0A] hover:bg-[#EB4604] text-white text-xs sm:text-sm font-semibold transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? 'Envoi en cours...' : 'Envoyer ma demande'}
                    </button>
                    <button
                      type="submit"
                      disabled={loading}
                      aria-label="Soumettre"
                      className="w-12 h-12 rounded-full bg-[#0A0A0A] hover:bg-[#EB4604] text-white flex items-center justify-center text-sm font-bold transition-all duration-300 shrink-0 shadow-md hover:scale-105"
                    >
                      ↗
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* ── Right Imagery Card ── */}
            <div className="lg:col-span-5 relative rounded-[32px] sm:rounded-[36px] overflow-hidden min-h-[440px] lg:min-h-[520px] shadow-[0_10px_30px_rgba(0,0,0,0.06)] border border-neutral-200/70 group">
              <Image
                src="/images/approach/step-1.jpg"
                alt="SPARKLINE Studio & Collaboration"
                fill
                quality={100}
                unoptimized
                className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />

              {/* Cinematic Vignette Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10 pointer-events-none" />

              {/* Floating Top Badge */}
              <div className="absolute top-5 right-5 z-10">
                <span className="px-4 py-1.5 rounded-full bg-black/50 backdrop-blur-md text-white text-xs font-mono border border-white/20 shadow-md">
                  Studio Dakar
                </span>
              </div>

              {/* Bottom Quote / Brand Seal */}
              <div className="absolute bottom-6 left-6 right-6 z-10 text-white space-y-2">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#EB4604] font-semibold block">
                  Excellence & Innovation
                </span>
                <p className="text-sm sm:text-base font-light text-white/95 leading-snug">
                  « Chaque projet commence par une écoute attentive pour bâtir une solution pérenne et différenciante. »
                </p>
                <span className="text-xs font-mono text-neutral-400 block pt-1">
                  — Équipe SPARKLINE
                </span>
              </div>
            </div>
          </div>

          {/* ── 3. BOTTOM 3-COLUMN CONTACT INFO (MATCHING REFERENCE DESIGN) ── */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10 pt-10 border-t border-neutral-200/80">
            {/* Col 1: Call & WhatsApp */}
            <div className="flex flex-col items-center text-center space-y-3">
              <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-neutral-100/90 border border-neutral-200/80 flex items-center justify-center text-neutral-800 shadow-sm transition-transform duration-300 hover:scale-110">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div>
                <h4 className="text-base font-bold text-[#0A0A0A] mb-1.5" style={{ fontFamily: 'var(--font-family--primary-font)' }}>
                  Appel & WhatsApp
                </h4>
                <a href="tel:+221785286330" className="text-sm text-neutral-600 hover:text-[#EB4604] transition-colors block font-mono">
                  +221 78 528 63 30
                </a>
                <a href="https://wa.me/221785286330" target="_blank" rel="noopener noreferrer" className="text-xs text-neutral-400 hover:text-[#EB4604] transition-colors block pt-0.5">
                  Discuter sur WhatsApp ↗
                </a>
              </div>
            </div>

            {/* Col 2: Studio Hours */}
            <div className="flex flex-col items-center text-center space-y-3">
              <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-neutral-100/90 border border-neutral-200/80 flex items-center justify-center text-neutral-800 shadow-sm transition-transform duration-300 hover:scale-110">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h4 className="text-base font-bold text-[#0A0A0A] mb-1.5" style={{ fontFamily: 'var(--font-family--primary-font)' }}>
                  Horaires d&apos;ouverture
                </h4>
                <p className="text-sm text-neutral-600 font-mono">
                  Lun - Ven : 08h30 - 18h30
                </p>
                <p className="text-xs text-neutral-400 pt-0.5">
                  Samedi & Dimanche : Sur rendez-vous
                </p>
              </div>
            </div>

            {/* Col 3: Write to Us */}
            <div className="flex flex-col items-center text-center space-y-3">
              <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-neutral-100/90 border border-neutral-200/80 flex items-center justify-center text-neutral-800 shadow-sm transition-transform duration-300 hover:scale-110">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h4 className="text-base font-bold text-[#0A0A0A] mb-1.5" style={{ fontFamily: 'var(--font-family--primary-font)' }}>
                  Écrivez-nous
                </h4>
                <a href={`mailto:${siteConfig.contact.email}`} className="text-sm text-neutral-600 hover:text-[#EB4604] transition-colors block font-mono">
                  {siteConfig.contact.email}
                </a>
                <span className="text-xs text-neutral-400 block pt-0.5">
                  Dakar, Sénégal
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
