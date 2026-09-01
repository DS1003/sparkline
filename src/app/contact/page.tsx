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
  'Solutions Digitales & Applications Web',
  'Design UI/UX & Architecture Produit',
  'Identité de Marque & Design System',
  'Ingénierie Logicielle & Mobile',
  'Transformation Digitale & Conseil',
  'SPARKlearn & Formation sur mesure',
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
    }, 800)
  }

  return (
    <main className="min-h-screen bg-[#FAFBFD] text-neutral-900">
      {/* ── 1. HERO OF THE CONTACT PAGE (UNTOUCHED) ── */}
      <PageHero
        tag="Nous Contacter"
        title="Parlons de votre projet et"
        highlight="illuminons vos ambitions."
        subtitle="Que vous lanciez un produit digital, développiez une marque ou formiez vos équipes — nous sommes prêts à collaborer."
        breadcrumbs={[{ label: 'Contact', href: '/contact' }]}
      />

      {/* ── 2. PIXEL-PERFECT LIGHT CONTACT SECTION (EXACT REFERENCE DESIGN) ── */}
      <Section className="py-16 sm:py-24 lg:py-28 bg-[#FAFBFD]">
        <Container>
          {/* Top Section Header */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12 sm:mb-16">
            <div className="space-y-3">
              <RevealOnScroll>
                <Tag variant="v2">Planifier un projet</Tag>
              </RevealOnScroll>
              <RevealOnScroll delay={0.08}>
                <h2
                  className="text-4xl sm:text-6xl lg:text-[68px] font-normal text-[#0A0A0A] leading-[1.04] tracking-[-0.035em]"
                  style={{ fontFamily: 'var(--font-family--primary-font)' }}
                >
                  Contactez-nous
                </h2>
              </RevealOnScroll>
            </div>

            <RevealOnScroll delay={0.12}>
              <p className="text-sm sm:text-base text-neutral-500 font-light leading-relaxed max-w-sm lg:text-right">
                Dites-nous où vous souhaitez aller et nous étudierons votre projet sous 24 heures ouvrées.
              </p>
            </RevealOnScroll>
          </div>

          {/* Main Bento Grid: Form Card + Visual Image Card */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 lg:gap-8 items-stretch mb-16 sm:mb-20">
            {/* ── Left Form Card (Pixel-Perfect Clean Layout) ── */}
            <div className="lg:col-span-7 bg-white rounded-[28px] sm:rounded-[36px] p-7 sm:p-10 lg:p-11 border border-[#E5E7EB] shadow-[0_4px_24px_rgba(0,0,0,0.03)] flex flex-col justify-between">
              {submitted ? (
                <div className="text-center py-16 sm:py-20 space-y-4 my-auto">
                  <div className="w-16 h-16 rounded-full bg-[#EB4604]/10 text-[#EB4604] flex items-center justify-center text-2xl font-bold mx-auto mb-4 border border-[#EB4604]/20 shadow-sm">
                    ✓
                  </div>
                  <h3
                    className="text-2xl sm:text-3xl font-bold text-[#0A0A0A] tracking-tight"
                    style={{ fontFamily: 'var(--font-family--primary-font)' }}
                  >
                    Demande transmise avec succès !
                  </h3>
                  <p className="text-neutral-500 text-xs sm:text-sm max-w-md mx-auto font-light leading-relaxed">
                    Merci pour votre message. Nos directeurs de projet étudient vos éléments et reviendront vers vous sous 24 heures ouvrées.
                  </p>
                  <div className="pt-4">
                    <button
                      onClick={() => setSubmitted(false)}
                      className="px-8 py-3.5 rounded-full bg-[#0A0A0A] text-white text-xs font-semibold hover:bg-[#EB4604] transition-colors shadow-md cursor-pointer"
                    >
                      Envoyer une autre demande
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Row 1: Name & Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label className="text-xs font-medium text-neutral-600 block">
                        Nom complet
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Votre nom complet"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-[#EFF1F5] hover:bg-[#E9ECF2] focus:bg-white text-sm text-[#0A0A0A] placeholder:text-neutral-400 placeholder:font-light border border-[#E2E5EC] focus:border-[#0A0A0A] focus:outline-none transition-all"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-medium text-neutral-600 block">
                        Adresse e-mail
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="vous@exemple.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-[#EFF1F5] hover:bg-[#E9ECF2] focus:bg-white text-sm text-[#0A0A0A] placeholder:text-neutral-400 placeholder:font-light border border-[#E2E5EC] focus:border-[#0A0A0A] focus:outline-none transition-all"
                      />
                    </div>
                  </div>

                  {/* Row 2: Phone & Service */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label className="text-xs font-medium text-neutral-600 block">
                        Numéro de téléphone
                      </label>
                      <input
                        type="tel"
                        placeholder="+221 78 528 63 30"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-[#EFF1F5] hover:bg-[#E9ECF2] focus:bg-white text-sm text-[#0A0A0A] placeholder:text-neutral-400 placeholder:font-light border border-[#E2E5EC] focus:border-[#0A0A0A] focus:outline-none transition-all"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-medium text-neutral-600 block">
                        Type de service
                      </label>
                      <div className="relative">
                        <select
                          value={formData.service}
                          onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                          className="w-full px-4 py-3 pr-10 rounded-xl bg-[#EFF1F5] hover:bg-[#E9ECF2] focus:bg-white text-sm text-[#0A0A0A] border border-[#E2E5EC] focus:border-[#0A0A0A] focus:outline-none transition-all appearance-none cursor-pointer"
                        >
                          <option value="">Sélectionnez un service...</option>
                          {serviceOptions.map((opt) => (
                            <option key={opt} value={opt}>
                              {opt}
                            </option>
                          ))}
                        </select>
                        <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-500">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Row 3: Date & Budget */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label className="text-xs font-medium text-neutral-600 block">
                        Date souhaitée
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          placeholder="jj/mm/aaaa ou dès que possible"
                          value={formData.preferredDate}
                          onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                          className="w-full px-4 py-3 pr-10 rounded-xl bg-[#EFF1F5] hover:bg-[#E9ECF2] focus:bg-white text-sm text-[#0A0A0A] placeholder:text-neutral-400 placeholder:font-light border border-[#E2E5EC] focus:border-[#0A0A0A] focus:outline-none transition-all"
                        />
                        <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-400">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-medium text-neutral-600 block">
                        Budget prévisionnel
                      </label>
                      <div className="relative">
                        <select
                          value={formData.budget}
                          onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                          className="w-full px-4 py-3 pr-10 rounded-xl bg-[#EFF1F5] hover:bg-[#E9ECF2] focus:bg-white text-sm text-[#0A0A0A] border border-[#E2E5EC] focus:border-[#0A0A0A] focus:outline-none transition-all appearance-none cursor-pointer"
                        >
                          <option value="">Sélectionnez un budget...</option>
                          {budgetOptions.map((opt) => (
                            <option key={opt} value={opt}>
                              {opt}
                            </option>
                          ))}
                        </select>
                        <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-500">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Row 4: Message */}
                  <div className="space-y-2">
                    <label className="text-xs font-medium text-neutral-600 block">
                      Message / Détails du projet
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Parlez-nous de vos objectifs, de vos défis clés et de vos attentes..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#EFF1F5] hover:bg-[#E9ECF2] focus:bg-white text-sm text-[#0A0A0A] placeholder:text-neutral-400 placeholder:font-light border border-[#E2E5EC] focus:border-[#0A0A0A] focus:outline-none transition-all resize-none"
                    />
                  </div>

                  {/* Submit Buttons */}
                  <div className="pt-3 flex items-center gap-2">
                    <button
                      type="submit"
                      disabled={loading}
                      className="px-7 sm:px-8 py-3.5 rounded-full bg-[#0A0A0A] hover:bg-[#EB4604] text-white text-xs sm:text-sm font-semibold transition-all duration-300 shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                    >
                      {loading ? 'Envoi en cours...' : 'Envoyer votre message'}
                    </button>
                    <button
                      type="submit"
                      disabled={loading}
                      aria-label="Soumettre"
                      className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#0A0A0A] hover:bg-[#EB4604] text-white flex items-center justify-center text-xs font-bold transition-all duration-300 shrink-0 shadow-sm hover:scale-105 cursor-pointer"
                    >
                      ↗
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* ── Right Imagery Card (Matching Reference Inspiration) ── */}
            <div className="lg:col-span-5 relative rounded-[28px] sm:rounded-[36px] overflow-hidden min-h-[440px] lg:min-h-full shadow-[0_4px_24px_rgba(0,0,0,0.03)] border border-[#E5E7EB] group flex flex-col justify-between p-6 sm:p-8">
              <Image
                src="/images/approach/step-1.jpg"
                alt="SPARKLINE Studio & Collaboration"
                fill
                quality={85}
                className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />

              {/* Atmospheric Gradient Vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/15 pointer-events-none" />

              {/* Floating Top Right Badge */}
              <div className="relative z-10 flex justify-end">
                <span className="px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-mono border border-white/30 shadow-sm">
                  Votre Vision ↗
                </span>
              </div>

              {/* Bottom Quote & Brand Identity */}
              <div className="relative z-10 text-white space-y-2 pt-24">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#EB4604] font-semibold block">
                  Studio SPARKLINE
                </span>
                <p className="text-sm sm:text-base font-light text-white/95 leading-snug">
                  « Nous concevons des produits d’exception pour les entreprises et bâtisseurs audacieux. »
                </p>
                <span className="text-xs font-mono text-neutral-300 block pt-1">
                  Dakar, Sénégal
                </span>
              </div>
            </div>
          </div>

          {/* ── 3. BOTTOM 3-COLUMN CONTACT INFO (SANS LIGNE AU-DESSUS, TYPOGRAPHIE ET PADDING PARFAITS) ── */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10 pt-4 pb-4">
            {/* Col 1: Call & WhatsApp */}
            <div className="flex flex-col items-center text-center space-y-3.5 group">
              <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-[#EFF1F5] flex items-center justify-center text-neutral-800 transition-transform duration-300 group-hover:scale-105 shadow-xs">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div className="space-y-1">
                <h4 className="text-base sm:text-lg font-bold text-[#0A0A0A]" style={{ fontFamily: 'var(--font-family--primary-font)' }}>
                  Appel &amp; WhatsApp
                </h4>
                <a href="tel:+221785286330" className="text-sm text-neutral-800 hover:text-[#EB4604] transition-colors block font-medium">
                  +221 78 528 63 30
                </a>
                <a href="https://wa.me/221785286330" target="_blank" rel="noopener noreferrer" className="text-xs text-neutral-500 hover:text-[#EB4604] transition-colors block font-light">
                  +221 33 800 00 00
                </a>
              </div>
            </div>

            {/* Col 2: Working Hours */}
            <div className="flex flex-col items-center text-center space-y-3.5 group">
              <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-[#EFF1F5] flex items-center justify-center text-neutral-800 transition-transform duration-300 group-hover:scale-105 shadow-xs">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="space-y-1">
                <h4 className="text-base sm:text-lg font-bold text-[#0A0A0A]" style={{ fontFamily: 'var(--font-family--primary-font)' }}>
                  Horaires d&apos;ouverture
                </h4>
                <p className="text-sm text-neutral-800 font-medium">
                  Lun - Ven : 08h30 - 18h30
                </p>
                <p className="text-xs text-neutral-500 font-light">
                  Samedi &amp; Dimanche : Fermé
                </p>
              </div>
            </div>

            {/* Col 3: Write to Us */}
            <div className="flex flex-col items-center text-center space-y-3.5 group">
              <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-[#EFF1F5] flex items-center justify-center text-neutral-800 transition-transform duration-300 group-hover:scale-105 shadow-xs">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="space-y-1">
                <h4 className="text-base sm:text-lg font-bold text-[#0A0A0A]" style={{ fontFamily: 'var(--font-family--primary-font)' }}>
                  Écrivez-nous
                </h4>
                <a href={`mailto:${siteConfig.contact.email}`} className="text-sm text-neutral-800 hover:text-[#EB4604] transition-colors block font-medium">
                  {siteConfig.contact.email}
                </a>
                <a href="mailto:partnership@sparkline.sn" className="text-xs text-neutral-500 hover:text-[#EB4604] transition-colors block font-light">
                  partnership@sparkline.sn
                </a>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Footer />
    </main>
  )
}
