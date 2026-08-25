'use client'

import React, { useState } from 'react'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { PageHero } from '@/components/layout/PageHero'
import { Container } from '@/components/layout/Container'
import { Section } from '@/components/layout/Section'
import { RevealOnScroll } from '@/components/motion/RevealOnScroll'
import { siteConfig } from '@/config/site'

const inquiryTypes = [
  { value: 'project', label: 'Démarrer un nouveau projet' },
  { value: 'general', label: 'Demande générale d’information' },
  { value: 'training', label: 'Formations & Ateliers' },
  { value: 'partnership', label: 'Opportunité de partenariat' },
  { value: 'career', label: 'Candidature & Carrière' },
]

const serviceOptions = [
  'Solutions digitales & Applications web',
  'Design UI/UX & Produit',
  'Identité visuelle & Communication',
  'Production audiovisuelle & Voix off',
  'Formation & Renforcement des compétences',
  'Initiatives SPARKlearn',
]

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validate = (formData: FormData) => {
    const newErrors: Record<string, string> = {}
    const name = formData.get('name') as string
    const email = formData.get('email') as string
    const inquiry = formData.get('inquiryType') as string
    const message = formData.get('message') as string

    if (!name || name.length < 2) newErrors.name = 'Le nom doit comporter au moins 2 caractères.'
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = 'Veuillez saisir une adresse e-mail valide.'
    if (!inquiry) newErrors.inquiryType = 'Veuillez sélectionner un type de demande.'
    if (!message || message.length < 10) newErrors.message = 'Votre message doit comporter au moins 10 caractères.'

    return newErrors
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const validationErrors = validate(formData)

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    setErrors({})
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setSubmitted(true)
    }, 1200)
  }

  return (
    <main className="min-h-screen bg-white text-neutral-900">
      <PageHero
        tag="Nous Contacter"
        title="Parlons de votre projet et"
        highlight="illuminons vos ambitions."
        subtitle="Que vous lanciez un produit digital, développiez une marque ou formiez vos équipes — nous sommes prêts à collaborer."
        breadcrumbs={[{ label: 'Contact', href: '/contact' }]}
      />

      <Section darker>
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Left: Contact Details */}
            <div className="space-y-8">
              <RevealOnScroll>
                <h2 className="heading-02 text-neutral-900">
                  DÉCLENCHONS <span className="text-[#EB4604]">L’EXCELLENCE ENSEMBLE.</span>
                </h2>
              </RevealOnScroll>
              <RevealOnScroll delay={0.1}>
                <p className="text-xl text-neutral-600 font-light leading-relaxed max-w-lg">
                  Vous avez une idée ambitieuse ? Métamorphosons-la en une expérience digitale puissante, conçue pour la performance et la pérennité.
                </p>
              </RevealOnScroll>

              <RevealOnScroll delay={0.2} className="space-y-6 pt-6 border-t border-[#e2e2e7]">
                <div>
                  <span className="text-xs font-mono uppercase tracking-widest text-neutral-400 block mb-1">Téléphone / WhatsApp</span>
                  <a href={`tel:${siteConfig.contact.phone}`} className="heading-03 text-neutral-900 hover:text-[#EB4604] transition-colors">
                    {siteConfig.contact.phone}
                  </a>
                </div>
                <div>
                  <span className="text-xs font-mono uppercase tracking-widest text-neutral-400 block mb-1">E-mail</span>
                  <a href={`mailto:${siteConfig.contact.email}`} className="heading-03 text-neutral-900 hover:text-[#EB4604] transition-colors">
                    {siteConfig.contact.email}
                  </a>
                </div>
                <div>
                  <span className="text-xs font-mono uppercase tracking-widest text-neutral-400 block mb-1">Site internet</span>
                  <a href={siteConfig.contact.website} target="_blank" rel="noopener noreferrer" className="heading-04 text-neutral-900 hover:text-[#EB4604] transition-colors">
                    {siteConfig.contact.website}
                  </a>
                </div>
                <div>
                  <span className="text-xs font-mono uppercase tracking-widest text-neutral-400 block mb-1">Localisation</span>
                  <p className="heading-04 text-neutral-900">Dakar, Sénégal</p>
                </div>
              </RevealOnScroll>
            </div>

            {/* Right: Contact Form */}
            <RevealOnScroll delay={0.15}>
              <div className="p-8 sm:p-12 rounded-3xl bg-white border border-[#e2e2e7] shadow-sm">
                {submitted ? (
                  <div className="text-center py-16 space-y-4">
                    <div className="w-16 h-16 rounded-full bg-[#EB4604]/10 text-[#EB4604] flex items-center justify-center text-3xl mx-auto mb-4">✓</div>
                    <h3 className="heading-02 text-neutral-900">Message bien reçu !</h3>
                    <p className="text-neutral-600 text-base max-w-md mx-auto">
                      Merci pour votre prise de contact. Notre équipe étudiera votre demande et vous répondra sous 24 heures ouvrées.
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="mt-6 px-6 py-3 rounded-full border border-neutral-300 text-sm font-semibold text-neutral-900 hover:bg-neutral-100 transition-colors"
                    >
                      Envoyer un autre message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                    {/* Inquiry Type */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono uppercase tracking-wider text-neutral-500 font-medium">Type de demande *</label>
                      <select
                        name="inquiryType"
                        className={`w-full px-4 py-3.5 rounded-xl bg-[#f9f9fb] border text-sm text-neutral-900 focus:outline-none transition-colors ${errors.inquiryType ? 'border-red-400 focus:border-red-500' : 'border-[#e2e2e7] focus:border-[#EB4604]'}`}
                      >
                        <option value="">Sélectionnez un type de demande...</option>
                        {inquiryTypes.map((t) => (
                          <option key={t.value} value={t.value}>{t.label}</option>
                        ))}
                      </select>
                      {errors.inquiryType && <p className="text-xs text-red-500">{errors.inquiryType}</p>}
                    </div>

                    {/* Name */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono uppercase tracking-wider text-neutral-500 font-medium">Votre Nom complet *</label>
                      <input
                        type="text"
                        name="name"
                        placeholder="Ex : Awa Diop"
                        className={`w-full px-4 py-3.5 rounded-xl bg-[#f9f9fb] border text-sm text-neutral-900 focus:outline-none transition-colors ${errors.name ? 'border-red-400 focus:border-red-500' : 'border-[#e2e2e7] focus:border-[#EB4604]'}`}
                      />
                      {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}
                    </div>

                    {/* Email */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono uppercase tracking-wider text-neutral-500 font-medium">Adresse e-mail *</label>
                      <input
                        type="email"
                        name="email"
                        placeholder="awa@entreprise.sn"
                        className={`w-full px-4 py-3.5 rounded-xl bg-[#f9f9fb] border text-sm text-neutral-900 focus:outline-none transition-colors ${errors.email ? 'border-red-400 focus:border-red-500' : 'border-[#e2e2e7] focus:border-[#EB4604]'}`}
                      />
                      {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
                    </div>

                    {/* Phone */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono uppercase tracking-wider text-neutral-500 font-medium">Téléphone (Optionnel)</label>
                      <input
                        type="tel"
                        name="phone"
                        placeholder="+221 7X XXX XX XX"
                        className="w-full px-4 py-3.5 rounded-xl bg-[#f9f9fb] border border-[#e2e2e7] text-sm text-neutral-900 focus:outline-none focus:border-[#EB4604] transition-colors"
                      />
                    </div>

                    {/* Service Interested In */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono uppercase tracking-wider text-neutral-500 font-medium">Service concerné</label>
                      <select name="service" className="w-full px-4 py-3.5 rounded-xl bg-[#f9f9fb] border border-[#e2e2e7] text-sm text-neutral-900 focus:outline-none focus:border-[#EB4604] transition-colors">
                        <option value="">Sélectionnez un service (optionnel)...</option>
                        {serviceOptions.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </div>

                    {/* Message */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono uppercase tracking-wider text-neutral-500 font-medium">Votre Message / Projet *</label>
                      <textarea
                        name="message"
                        rows={5}
                        placeholder="Parlez-nous de votre vision, de vos objectifs et de vos délais..."
                        className={`w-full px-4 py-3.5 rounded-xl bg-[#f9f9fb] border text-sm text-neutral-900 focus:outline-none transition-colors resize-none ${errors.message ? 'border-red-400 focus:border-red-500' : 'border-[#e2e2e7] focus:border-[#EB4604]'}`}
                      />
                      {errors.message && <p className="text-xs text-red-500">{errors.message}</p>}
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-4 rounded-full bg-[#EB4604] text-white text-sm font-semibold hover:bg-[#D43D00] transition-colors shadow-lg shadow-[#EB4604]/25 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {loading ? 'Envoi en cours...' : 'Envoyer le message ↗'}
                    </button>
                  </form>
                )}
              </div>
            </RevealOnScroll>
          </div>
        </Container>
      </Section>

      <Footer />
    </main>
  )
}
