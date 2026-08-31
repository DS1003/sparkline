'use client'

import React, { useState } from 'react'
import { Tag } from '@/components/ui/Tag'
import { Container } from '@/components/layout/Container'
import { Section } from '@/components/layout/Section'
import { RevealOnScroll } from '@/components/motion/RevealOnScroll'
import { siteConfig } from '@/config/site'

const inquiryTypes = [
  { value: 'project', label: 'Démarrer un nouveau projet' },
  { value: 'audit', label: 'Audit & Refonte digitale' },
  { value: 'product', label: 'Design UI/UX & Architecture' },
  { value: 'engineering', label: 'Développement Web & Mobile' },
  { value: 'consulting', label: 'Conseil & Transformation' },
]

export function ContactSection() {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [activeStep, setActiveStep] = useState(1)
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    inquiryType: 'project',
    budget: '5M - 15M FCFA',
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
    <Section id="contact" className="relative py-20 sm:py-28 lg:py-32 bg-[#000000] text-white overflow-hidden">
      <Container className="relative z-10">
        {/* ── Top Badge & Header ── */}
        <div className="space-y-4 text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <RevealOnScroll>
            <div className="inline-flex items-center justify-center">
              <Tag variant="base">Nous Contacter</Tag>
            </div>
          </RevealOnScroll>
          <RevealOnScroll delay={0.1}>
            <h2
              className="text-[clamp(2.25rem,4.5vw,56px)] font-normal text-white leading-[1.08] tracking-[-0.03em]"
              style={{ fontFamily: 'var(--font-family--primary-font)' }}
            >
              <span>Déclenchons </span>
              <span className="text-[#EB4604] font-medium">l’excellence ensemble.</span>
            </h2>
          </RevealOnScroll>
        </div>

        {/* ── Split Card Container (Inspired by Reference Design) ── */}
        <RevealOnScroll delay={0.15}>
          <div className="rounded-[32px] sm:rounded-[40px] border border-white/10 bg-[#08080a] overflow-hidden shadow-[0_30px_90px_rgba(0,0,0,0.95)] grid grid-cols-1 lg:grid-cols-12 max-w-6xl mx-auto">
            {/* ── Left Panel: Atmospheric Gradient & Step Flow ── */}
            <div className="lg:col-span-5 p-8 sm:p-12 lg:p-14 relative flex flex-col justify-between overflow-hidden bg-gradient-to-br from-[#0c1a16] via-[#091210] to-[#040807] border-b lg:border-b-0 lg:border-r border-white/10">
              {/* Subtle ambient green-teal luxury glow */}
              <div className="absolute top-0 left-0 w-80 h-80 bg-[#10b981]/10 rounded-full blur-[100px] pointer-events-none" />
              <div className="absolute bottom-0 right-0 w-72 h-72 bg-[#065f46]/15 rounded-full blur-[90px] pointer-events-none" />

              <div className="relative z-10 space-y-6">
                <div className="space-y-3">
                  <h3
                    className="text-3xl sm:text-4xl lg:text-5xl font-light text-white tracking-tight leading-[1.1]"
                    style={{ fontFamily: 'var(--font-family--primary-font)' }}
                  >
                    Démarrez votre projet avec nous
                  </h3>
                  <p className="text-sm sm:text-base text-neutral-300 font-light leading-relaxed">
                    Complétez ces informations clés pour cadrer vos ambitions et échanger directement avec nos experts sous 24h.
                  </p>
                </div>

                {/* ── Direct Quick Links ── */}
                <div className="pt-4 space-y-3">
                  <a
                    href="https://wa.me/221785286330"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3.5 rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 transition-all text-xs font-mono text-neutral-200 hover:text-white group"
                  >
                    <span className="w-8 h-8 rounded-full bg-[#25D366]/20 text-[#25D366] flex items-center justify-center text-sm shrink-0">
                      💬
                    </span>
                    <div className="flex-1">
                      <span className="text-[10px] text-neutral-400 block uppercase tracking-wider">WhatsApp Direct</span>
                      <span className="font-semibold text-white">+221 78 528 63 30</span>
                    </div>
                    <span className="text-neutral-400 group-hover:translate-x-0.5 transition-transform">→</span>
                  </a>

                  <a
                    href={`mailto:${siteConfig.contact.email}`}
                    className="flex items-center gap-3 p-3.5 rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 transition-all text-xs font-mono text-neutral-200 hover:text-white group"
                  >
                    <span className="w-8 h-8 rounded-full bg-[#EB4604]/20 text-[#EB4604] flex items-center justify-center text-sm shrink-0">
                      ✉
                    </span>
                    <div className="flex-1">
                      <span className="text-[10px] text-neutral-400 block uppercase tracking-wider">E-mail Direct</span>
                      <span className="font-semibold text-white">{siteConfig.contact.email}</span>
                    </div>
                    <span className="text-neutral-400 group-hover:translate-x-0.5 transition-transform">→</span>
                  </a>
                </div>
              </div>

              {/* ── Bottom Step Cards (Exact Reference Design Element) ── */}
              <div className="relative z-10 grid grid-cols-3 gap-2.5 sm:gap-3 pt-10">
                {/* Step 1: Active Solid White Card */}
                <div
                  onClick={() => setActiveStep(1)}
                  className={`p-3.5 sm:p-4 rounded-2xl transition-all duration-300 cursor-pointer flex flex-col justify-between h-28 sm:h-32 ${activeStep === 1
                      ? 'bg-white text-black shadow-lg shadow-black/40 scale-[1.02]'
                      : 'bg-white/[0.06] hover:bg-white/[0.1] text-white border border-white/10'
                    }`}
                >
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${activeStep === 1 ? 'bg-black text-white' : 'bg-white/20 text-white'
                      }`}
                  >
                    1
                  </div>
                  <div>
                    <span className={`text-[11px] sm:text-xs font-medium leading-tight block ${activeStep === 1 ? 'text-black' : 'text-neutral-200'}`}>
                      Votre vision & projet
                    </span>
                  </div>
                </div>

                {/* Step 2: Glassmorphism Card */}
                <div
                  onClick={() => setActiveStep(2)}
                  className={`p-3.5 sm:p-4 rounded-2xl transition-all duration-300 cursor-pointer flex flex-col justify-between h-28 sm:h-32 ${activeStep === 2
                      ? 'bg-white text-black shadow-lg shadow-black/40 scale-[1.02]'
                      : 'bg-white/[0.06] hover:bg-white/[0.1] text-white border border-white/10'
                    }`}
                >
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${activeStep === 2 ? 'bg-black text-white' : 'bg-white/20 text-white'
                      }`}
                  >
                    2
                  </div>
                  <div>
                    <span className={`text-[11px] sm:text-xs font-medium leading-tight block ${activeStep === 2 ? 'text-black' : 'text-neutral-200'}`}>
                      Cadrage sous 24h
                    </span>
                  </div>
                </div>

                {/* Step 3: Glassmorphism Card */}
                <div
                  onClick={() => setActiveStep(3)}
                  className={`p-3.5 sm:p-4 rounded-2xl transition-all duration-300 cursor-pointer flex flex-col justify-between h-28 sm:h-32 ${activeStep === 3
                      ? 'bg-white text-black shadow-lg shadow-black/40 scale-[1.02]'
                      : 'bg-white/[0.06] hover:bg-white/[0.1] text-white border border-white/10'
                    }`}
                >
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${activeStep === 3 ? 'bg-black text-white' : 'bg-white/20 text-white'
                      }`}
                  >
                    3
                  </div>
                  <div>
                    <span className={`text-[11px] sm:text-xs font-medium leading-tight block ${activeStep === 3 ? 'text-black' : 'text-neutral-200'}`}>
                      Lancement agile
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* ── Right Panel: Modern Dark Minimalist Form ── */}
            <div className="lg:col-span-7 p-8 sm:p-12 lg:p-14 bg-[#08080a] flex flex-col justify-center">
              {submitted ? (
                <div className="text-center py-16 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-white/10 text-white flex items-center justify-center text-3xl mx-auto mb-4 border border-white/20">
                    ✓
                  </div>
                  <h3
                    className="text-2xl sm:text-3xl font-bold text-white tracking-tight"
                    style={{ fontFamily: 'var(--font-family--primary-font)' }}
                  >
                    Demande transmise avec succès
                  </h3>
                  <p className="text-neutral-400 text-sm max-w-md mx-auto font-light leading-relaxed">
                    Merci pour votre confiance. Notre équipe analysera votre projet et prendra contact avec vous dans les prochaines 24 heures.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-6 px-7 py-3 rounded-full border border-white/20 text-xs font-mono font-semibold text-white hover:bg-white/10 transition-colors"
                  >
                    Envoyer une autre demande
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Form Header */}
                  <div className="space-y-1">
                    <h3
                      className="text-2xl sm:text-3xl font-bold text-white tracking-tight"
                      style={{ fontFamily: 'var(--font-family--primary-font)' }}
                    >
                      Initier votre projet
                    </h3>
                    <p className="text-xs sm:text-sm text-neutral-400 font-light">
                      Renseignez vos coordonnées pour recevoir un échange personnalisé.
                    </p>
                  </div>

                  {/* ── Quick Action Direct Buttons ── */}
                  <div className="grid grid-cols-2 gap-3 pt-1">
                    <a
                      href="https://wa.me/221785286330"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-3 px-4 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-white text-xs font-mono flex items-center justify-center gap-2 transition-all hover:scale-[1.01]"
                    >
                      <span className="text-[#25D366] text-sm">💬</span>
                      <span>WhatsApp</span>
                    </a>

                    <a
                      href={`mailto:${siteConfig.contact.email}`}
                      className="py-3 px-4 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-white text-xs font-mono flex items-center justify-center gap-2 transition-all hover:scale-[1.01]"
                    >
                      <span className="text-[#EB4604] text-sm">✉</span>
                      <span>Email</span>
                    </a>
                  </div>

                  {/* ── Divider ── */}
                  <div className="relative flex items-center justify-center">
                    <div className="w-full border-t border-white/10" />
                    <span className="absolute bg-[#08080a] px-3 text-[11px] font-mono text-neutral-500 uppercase tracking-wider">
                      Ou formulaire
                    </span>
                  </div>

                  {/* ── Interactive Input Form ── */}
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Row 1: Name & Company */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 block">
                          Nom complet *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Ex : Awa Diop"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs sm:text-sm placeholder-neutral-600 focus:outline-none focus:border-white/40 transition-colors"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 block">
                          Entreprise / Organisation
                        </label>
                        <input
                          type="text"
                          placeholder="Ex : Baobab Labs"
                          value={formData.company}
                          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs sm:text-sm placeholder-neutral-600 focus:outline-none focus:border-white/40 transition-colors"
                        />
                      </div>
                    </div>

                    {/* Row 2: Email & Phone */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 block">
                          Adresse e-mail *
                        </label>
                        <input
                          type="email"
                          required
                          placeholder="awa@entreprise.sn"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs sm:text-sm placeholder-neutral-600 focus:outline-none focus:border-white/40 transition-colors"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 block">
                          Téléphone / WhatsApp
                        </label>
                        <input
                          type="tel"
                          placeholder="+221 78 528 63 30"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs sm:text-sm placeholder-neutral-600 focus:outline-none focus:border-white/40 transition-colors"
                        />
                      </div>
                    </div>

                    {/* Row 3: Service Type */}
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 block">
                        Type de demande *
                      </label>
                      <select
                        value={formData.inquiryType}
                        onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-[#101014] border border-white/10 text-white text-xs sm:text-sm focus:outline-none focus:border-white/40 transition-colors"
                      >
                        {inquiryTypes.map((type) => (
                          <option key={type.value} value={type.value} className="bg-[#121216] text-white">
                            {type.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Row 4: Message */}
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 block">
                        Votre message / vision *
                      </label>
                      <textarea
                        required
                        rows={3}
                        placeholder="Parlez-nous de vos objectifs, de votre planning et de vos besoins..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs sm:text-sm placeholder-neutral-600 focus:outline-none focus:border-white/40 transition-colors resize-none"
                      />
                    </div>

                    {/* Submit Button (Solid White High Contrast as in Reference Design) */}
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-4 rounded-xl bg-white hover:bg-neutral-200 text-black text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-300 shadow-xl hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed mt-2"
                    >
                      {loading ? 'Transmission en cours...' : 'Envoyer ma demande →'}
                    </button>

                    <div className="text-center pt-2">
                      <span className="text-[11px] font-mono text-neutral-500">
                        ✦ Réponse sous 24h ouvrées • Confidentialité garantie
                      </span>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </div>
        </RevealOnScroll>
      </Container>
    </Section>
  )
}
