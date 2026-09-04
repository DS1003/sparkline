'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
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
    services: ['Applications Web & Mobile'] as string[],
    preferredDate: '',
    budget: '5M - 15M FCFA',
    message: '',
  })

  const toggleService = React.useCallback((service: string) => {
    setFormData((prev) => {
      const exists = prev.services.includes(service)
      const nextServices = exists
        ? prev.services.filter((s) => s !== service)
        : [...prev.services, service]
      
      // Ensure at least one service remains selected
      return {
        ...prev,
        services: nextServices.length === 0 ? [service] : nextServices,
      }
    })
  }, [])

  const isOnlySparklearn = React.useMemo(() => {
    return formData.services.length === 1 && formData.services[0] === 'Sparklearn Formation'
  }, [formData.services])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (loading) return
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setSubmitted(true)
    }, 600)
  }

  const handleResetForm = React.useCallback(() => {
    setSubmitted(false)
    setFormData({
      name: '',
      email: '',
      phone: '',
      services: ['Applications Web & Mobile'],
      preferredDate: '',
      budget: '5M - 15M FCFA',
      message: '',
    })
  }, [])

  return (
    <main className="min-h-screen bg-[#F7F8FA] text-neutral-900">
      {/* ── 1. HERO OF THE CONTACT PAGE ── */}
      <PageHero
        tag="Nous Contacter"
        title="Parlons de votre projet et"
        pillImage="/images/heroes/contact.webp"
        highlight="illuminons vos ambitions."
        subtitle="Que vous lanciez un produit digital, développiez une marque ou formiez vos équipes — nous sommes prêts à collaborer."
        breadcrumbs={[{ label: 'Contact', href: '/contact' }]}
      />

      {/* ── 2. SMOOTH 3D SOFT PILL CONTACT SECTION ── */}
      <Section className="py-8 sm:py-16 lg:py-24 bg-[#F7F8FA]">
        <Container>
          {/* Top Section Header */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-3 sm:gap-6 mb-6 sm:mb-12">
            <div className="space-y-2 sm:space-y-3">
              <RevealOnScroll>
                <Tag variant="v2">Planifier un projet</Tag>
              </RevealOnScroll>
              <RevealOnScroll delay={0.08}>
                <h2
                  className="text-2xl sm:text-4xl lg:text-[56px] font-normal text-[#0A0A0A] leading-[1.1] tracking-[-0.035em]"
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
            <div className="lg:col-span-7 bg-white rounded-[24px] sm:rounded-[40px] p-4 sm:p-9 lg:p-10 border border-neutral-200/80 shadow-[inset_0_1px_1px_rgba(255,255,255,1),inset_0_-2px_4px_rgba(0,0,0,0.03),0_16px_40px_-15px_rgba(0,0,0,0.06)] flex flex-col justify-between relative overflow-hidden min-h-[480px] sm:min-h-[580px]">
              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success-card"
                    initial={{ opacity: 0, y: 25, scale: 0.94, filter: 'blur(6px)' }}
                    animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, y: -20, scale: 0.96, filter: 'blur(4px)' }}
                    transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-col justify-between h-full py-4 sm:py-6 space-y-6"
                  >
                    {/* Clean Header Indicator */}
                    <div className="flex items-center justify-between pb-2 border-b border-neutral-100">
                      <span className="text-[11px] font-mono font-medium uppercase tracking-widest text-neutral-400">
                        Message envoyé
                      </span>
                      <span className="text-[10px] font-mono text-neutral-400">
                        Réponse sous 24h
                      </span>
                    </div>

                    {/* Clean Sharp Checkmark Emblem (Zero Fuzzy Glow) */}
                    <div className="text-center space-y-4 my-auto">
                      <div className="relative mx-auto flex items-center justify-center">
                        {/* 3D Convex Badge — Crisp & Sharp */}
                        <motion.div
                          initial={{ scale: 0, rotate: -25 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ type: 'spring', stiffness: 280, damping: 18, delay: 0.1 }}
                          className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-b from-[#FF5E1E] to-[#D43D00] text-white flex items-center justify-center shadow-[inset_0_2px_2px_rgba(255,255,255,0.6),inset_0_-3px_4px_rgba(0,0,0,0.35),0_4px_16px_rgba(0,0,0,0.08)]"
                        >
                          {/* Animated SVG Checkmark Drawing */}
                          <svg
                            className="w-8 h-8 sm:w-10 sm:h-10 text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.2)]"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={3}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <motion.path
                              d="M5 13l4 4L19 7"
                              initial={{ pathLength: 0, opacity: 0 }}
                              animate={{ pathLength: 1, opacity: 1 }}
                              transition={{ duration: 0.5, delay: 0.3, ease: 'easeOut' }}
                            />
                          </svg>
                        </motion.div>
                      </div>

                      <div className="space-y-2">
                        <motion.h3
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.25, duration: 0.4 }}
                          className="text-2xl sm:text-3xl font-bold text-[#0A0A0A] tracking-tight leading-tight"
                          style={{ fontFamily: 'var(--font-family--primary-font)' }}
                        >
                          Demande transmise avec succès !
                        </motion.h3>

                        <motion.p
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.32, duration: 0.4 }}
                          className="text-neutral-500 text-xs sm:text-sm max-w-md mx-auto font-light leading-relaxed"
                        >
                          {formData.name ? `Merci ${formData.name}. ` : 'Merci. '}
                          Votre message a bien été reçu. Nos directeurs de projet étudient votre brief et reviendront vers vous sous 24 heures ouvrées.
                        </motion.p>
                      </div>

                      {/* Interactive Submission Summary Capsule */}
                      <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.45 }}
                        className="max-w-lg mx-auto bg-[#F8F9FB] rounded-2xl p-4 sm:p-5 border border-neutral-200/80 shadow-[inset_0_1.5px_3px_rgba(0,0,0,0.03)] text-left space-y-3"
                      >
                        <div className="flex items-center justify-between text-[11px] font-mono text-neutral-400 border-b border-neutral-200/60 pb-2">
                          <span className="uppercase tracking-wider font-medium">Récapitulatif du brief</span>
                          <span className="text-neutral-700 font-semibold truncate max-w-[180px]">
                            {formData.email || 'Email enregistré'}
                          </span>
                        </div>

                        <div className="space-y-1.5">
                          <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 block">
                            Besoins sélectionnés
                          </span>
                          <div className="flex flex-wrap gap-1.5">
                            {formData.services.map((srv, idx) => (
                              <span
                                key={idx}
                                className="px-2.5 py-1 rounded-full bg-white border border-neutral-200/90 text-neutral-800 text-[11px] font-medium shadow-2xs"
                              >
                                {srv}
                              </span>
                            ))}
                          </div>
                        </div>

                        {!isOnlySparklearn && formData.budget && (
                          <div className="flex items-center justify-between text-[11px] pt-1 border-t border-neutral-200/60">
                            <span className="text-neutral-500 font-light">Budget indicatif :</span>
                            <span className="font-mono font-bold text-[#EB4604] bg-[#EB4604]/10 px-2.5 py-0.5 rounded-full border border-[#EB4604]/20">
                              {formData.budget}
                            </span>
                          </div>
                        )}
                      </motion.div>
                    </div>

                    {/* Dual Bottom Action Bar */}
                    <motion.div
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.48, duration: 0.4 }}
                      className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2"
                    >
                      <button
                        type="button"
                        onClick={handleResetForm}
                        className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#0A0A0A] hover:bg-[#EB4604] text-white text-xs font-semibold shadow-md active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2"
                      >
                        <span>Envoyer une autre demande</span>
                        <span>↺</span>
                      </button>

                      <a
                        href="https://wa.me/221785286330"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full sm:w-auto px-6 py-3 rounded-full bg-white hover:bg-neutral-50 text-neutral-800 text-xs font-semibold border border-neutral-200/90 shadow-2xs hover:border-[#EB4604]/40 active:scale-95 transition-all flex items-center justify-center gap-2"
                      >
                        <span>WhatsApp direct</span>
                        <span className="text-[#EB4604]">↗</span>
                      </a>
                    </motion.div>
                  </motion.div>
                ) : (
                  <motion.form
                    key="contact-form"
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20, scale: 0.97, filter: 'blur(4px)' }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="space-y-5"
                  >
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

                    {/* 1. Smooth 3D Pill Chips: Service Scope (Multi-select) */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-semibold text-neutral-700 block">
                          Quel est votre besoin principal ?
                        </label>
                        <span className="text-[10px] font-mono text-neutral-400">
                          Choix multiple possible
                        </span>
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {serviceOptions.map((service) => {
                          const isSelected = formData.services.includes(service)
                          return (
                            <button
                              key={service}
                              type="button"
                              onClick={() => toggleService(service)}
                              className={`px-3 py-2.5 rounded-full text-[11px] sm:text-xs font-medium transition-all duration-200 cursor-pointer flex items-center justify-between gap-1 w-full touch-manipulation active:scale-[0.98] ${
                                isSelected
                                  ? 'bg-[#0A0A0A] text-white border border-[#0A0A0A] shadow-[inset_0_1px_1px_rgba(255,255,255,0.3),inset_0_-2px_2px_rgba(0,0,0,0.35),0_4px_12px_rgba(0,0,0,0.15)] scale-[1.01]'
                                  : 'bg-white text-neutral-700 border border-neutral-200/90 shadow-[inset_0_1px_1px_rgba(255,255,255,1),inset_0_-1.5px_2px_rgba(0,0,0,0.04),0_2px_6px_rgba(0,0,0,0.04)] hover:shadow-[inset_0_1px_1px_rgba(255,255,255,1),inset_0_-1.5px_2px_rgba(0,0,0,0.08),0_4px_10px_rgba(0,0,0,0.06)] hover:scale-[1.01]'
                              }`}
                            >
                              <span className="truncate">{service}</span>
                              <span className={isSelected ? 'text-[#EB4604] font-bold shrink-0' : 'text-neutral-400 shrink-0'}>
                                {isSelected ? '✓' : '+'}
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
                          autoComplete="name"
                          autoCapitalize="words"
                          enterKeyHint="next"
                          placeholder="Fanta Ndao"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full px-3 sm:px-4 py-2.5 rounded-xl sm:rounded-2xl bg-[#F8F9FB] focus:bg-white text-base sm:text-sm text-neutral-900 placeholder:text-neutral-400 border border-neutral-200/90 shadow-[inset_0_1.5px_3px_rgba(0,0,0,0.04)] focus:border-[#EB4604] focus:shadow-[0_0_0_3px_rgba(235,70,4,0.12)] focus:outline-none transition-all font-medium touch-manipulation"
                        />
                      </div>

                      <div className="space-y-1 sm:space-y-1.5 min-w-0">
                        <label className="text-[11px] sm:text-xs font-semibold text-neutral-700 block truncate">
                          Adresse e-mail <span className="text-[#EB4604]">*</span>
                        </label>
                        <input
                          type="email"
                          required
                          autoComplete="email"
                          inputMode="email"
                          autoCapitalize="none"
                          spellCheck={false}
                          enterKeyHint="next"
                          placeholder="fanta@entreprise.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full px-3 sm:px-4 py-2.5 rounded-xl sm:rounded-2xl bg-[#F8F9FB] focus:bg-white text-base sm:text-sm text-neutral-900 placeholder:text-neutral-400 border border-neutral-200/90 shadow-[inset_0_1.5px_3px_rgba(0,0,0,0.04)] focus:border-[#EB4604] focus:shadow-[0_0_0_3px_rgba(235,70,4,0.12)] focus:outline-none transition-all font-medium touch-manipulation"
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
                          autoComplete="tel"
                          inputMode="tel"
                          enterKeyHint="next"
                          placeholder="+221 78 528 63 30"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full px-3 sm:px-4 py-2.5 rounded-xl sm:rounded-2xl bg-[#F8F9FB] focus:bg-white text-base sm:text-sm text-neutral-900 placeholder:text-neutral-400 border border-neutral-200/90 shadow-[inset_0_1.5px_3px_rgba(0,0,0,0.04)] focus:border-[#EB4604] focus:shadow-[0_0_0_3px_rgba(235,70,4,0.12)] focus:outline-none transition-all font-medium touch-manipulation"
                        />
                      </div>

                      <div className="space-y-1 sm:space-y-1.5 min-w-0">
                        <label className="text-[11px] sm:text-xs font-semibold text-neutral-700 block truncate">
                          Délai visé
                        </label>
                        <input
                          type="text"
                          autoComplete="off"
                          enterKeyHint="next"
                          placeholder="Dès que possible"
                          value={formData.preferredDate}
                          onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                          className="w-full px-3 sm:px-4 py-2.5 rounded-xl sm:rounded-2xl bg-[#F8F9FB] focus:bg-white text-base sm:text-sm text-neutral-900 placeholder:text-neutral-400 border border-neutral-200/90 shadow-[inset_0_1.5px_3px_rgba(0,0,0,0.04)] focus:border-[#EB4604] focus:shadow-[0_0_0_3px_rgba(235,70,4,0.12)] focus:outline-none transition-all font-medium touch-manipulation"
                        />
                      </div>
                    </div>

                    {/* 4. Smooth 3D Segmented Pills: Budget (Disabled when only Sparklearn Formation is chosen) */}
                    <div
                      className={`space-y-1.5 sm:space-y-2 transition-all duration-300 ${
                        isOnlySparklearn ? 'opacity-40 pointer-events-none select-none' : 'opacity-100'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-semibold text-neutral-700 block">
                          Budget estimé
                        </label>
                        {isOnlySparklearn && (
                          <span className="text-[10px] font-mono text-[#EB4604] font-medium">
                            Non applicable pour formation seule
                          </span>
                        )}
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {budgetOptions.map((budget) => {
                          const isSelected = !isOnlySparklearn && formData.budget === budget
                          return (
                            <button
                              key={budget}
                              type="button"
                              disabled={isOnlySparklearn}
                              onClick={() => setFormData({ ...formData, budget })}
                              className={`py-2 sm:py-2.5 px-2.5 sm:px-3 rounded-full text-xs font-mono font-medium transition-all duration-200 text-center cursor-pointer disabled:cursor-not-allowed touch-manipulation ${
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
                        rows={3}
                        enterKeyHint="send"
                        placeholder="Décrivez vos ambitions, vos attentes et les points clés de votre projet..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full min-h-[76px] sm:min-h-[88px] px-3.5 sm:px-4 py-2.5 rounded-xl sm:rounded-2xl bg-[#F8F9FB] focus:bg-white text-base sm:text-sm text-neutral-900 placeholder:text-neutral-400 border border-neutral-200/90 shadow-[inset_0_1.5px_3px_rgba(0,0,0,0.04)] focus:border-[#EB4604] focus:shadow-[0_0_0_3px_rgba(235,70,4,0.12)] focus:outline-none transition-all resize-none font-medium touch-manipulation"
                      />
                    </div>

                    {/* 6. Smooth 3D Master Action Pill Button */}
                    <div className="pt-1 sm:pt-2">
                      <button
                        type="submit"
                        disabled={loading}
                        className="relative overflow-hidden w-full py-3.5 px-6 sm:px-7 rounded-full bg-[#EB4604] hover:bg-[#D43D00] text-white font-semibold text-xs sm:text-sm shadow-[inset_0_1.5px_1px_rgba(255,255,255,0.4),inset_0_-2.5px_3px_rgba(0,0,0,0.25),0_8px_24px_rgba(235,70,4,0.3)] hover:shadow-[0_10px_28px_rgba(235,70,4,0.4)] active:translate-y-[1px] transition-all flex items-center justify-between group cursor-pointer disabled:opacity-90 disabled:cursor-not-allowed touch-manipulation"
                      >
                        {/* Shimmer laser beam while loading */}
                        {loading && (
                          <motion.div
                            initial={{ x: '-100%' }}
                            animate={{ x: '200%' }}
                            transition={{ repeat: Infinity, duration: 1.2, ease: 'easeInOut' }}
                            className="absolute inset-y-0 w-1/2 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-20deg] pointer-events-none"
                          />
                        )}

                        {/* Button Label */}
                        <div className="flex items-center gap-2 relative z-10">
                          <span>
                            {loading ? 'Envoi en cours' : 'Envoyer votre demande'}
                          </span>
                          {loading && (
                            <span className="flex items-center gap-1 pt-0.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-white animate-bounce [animation-delay:-0.3s]" />
                              <span className="w-1.5 h-1.5 rounded-full bg-white animate-bounce [animation-delay:-0.15s]" />
                              <span className="w-1.5 h-1.5 rounded-full bg-white animate-bounce" />
                            </span>
                          )}
                        </div>

                        {/* Action Icon Pill */}
                        <span className="relative z-10 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white text-[#EB4604] flex items-center justify-center font-bold text-xs shadow-sm transition-transform group-hover:translate-x-1 shrink-0">
                          {loading ? (
                            <svg className="w-4 h-4 animate-spin text-[#EB4604]" viewBox="0 0 24 24" fill="none">
                              <circle className="opacity-25" cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2.5" />
                              <path className="opacity-100" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" d="M12 3a9 9 0 0 1 9 9" />
                            </svg>
                          ) : (
                            '↗'
                          )}
                        </span>

                        {/* Sleek bottom progress track */}
                        {loading && (
                          <motion.div
                            initial={{ x: '-100%' }}
                            animate={{ x: '100%' }}
                            transition={{ repeat: Infinity, duration: 1.4, ease: 'easeInOut' }}
                            className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-white/80 to-transparent"
                          />
                        )}
                      </button>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>

            {/* ── Right Imagery Card (Smooth Rounded 3D) ── */}
            <div className="lg:col-span-5 relative rounded-[28px] sm:rounded-[40px] overflow-hidden min-h-[220px] sm:min-h-[380px] lg:min-h-full border border-neutral-200/80 shadow-[inset_0_1px_1px_rgba(255,255,255,1),inset_0_-2px_4px_rgba(0,0,0,0.03),0_16px_40px_-15px_rgba(0,0,0,0.06)] group flex flex-col justify-between p-5 sm:p-8">
              <Image
                src="/images/contact/dakar-vision.webp"
                alt="SPARKLINE Studio & Collaboration — Dakar, Sénégal"
                fill
                quality={80}
                loading="lazy"
                className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
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

          {/* ── 3. BOTTOM CONTACT INFO (RESPONSIVE DOCK: FULL TOUCH CARDS ON MOBILE, EDITORIAL DOCK ON DESKTOP) ── */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-8 lg:gap-12 pt-8 sm:pt-12 border-t border-neutral-200/70">
            {/* Col 1: Call & WhatsApp */}
            <a
              href="tel:+221785286330"
              className="flex flex-row sm:flex-col items-center sm:text-center text-left gap-3.5 sm:gap-3 p-3.5 sm:p-0 rounded-2xl sm:rounded-none bg-white sm:bg-transparent border sm:border-0 border-neutral-200/80 shadow-[0_2px_8px_rgba(0,0,0,0.03)] sm:shadow-none group min-w-0 transition-all active:scale-[0.98] sm:active:scale-100 touch-manipulation"
            >
              <div className="w-11 h-11 sm:w-13 sm:h-13 rounded-2xl bg-[#F8F9FB] sm:bg-white border border-neutral-200/90 shadow-[inset_0_1.5px_1px_rgba(255,255,255,1),inset_0_-2px_3px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.04)] flex items-center justify-center text-neutral-800 group-hover:border-[#EB4604]/40 group-hover:text-[#EB4604] group-hover:scale-105 transition-all duration-300 shrink-0">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:-rotate-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div className="space-y-0.5 sm:space-y-1 flex-1 min-w-0">
                <h4 className="text-xs sm:text-base font-bold text-[#0A0A0A] tracking-tight truncate group-hover:text-[#EB4604] transition-colors" style={{ fontFamily: 'var(--font-family--primary-font)' }}>
                  Téléphone
                </h4>
                <p className="text-xs sm:text-sm text-neutral-800 group-hover:text-[#EB4604] transition-colors font-semibold truncate">
                  +221 78 528 63 30
                </p>
                <span className="text-[10px] sm:text-xs text-neutral-400 font-light block truncate">
                  WhatsApp Direct • Appel
                </span>
              </div>
              <span className="sm:hidden text-neutral-400 text-sm font-semibold shrink-0 group-hover:text-[#EB4604] transition-colors">
                ↗
              </span>
            </a>

            {/* Col 2: Working Hours */}
            <div className="flex flex-row sm:flex-col items-center sm:text-center text-left gap-3.5 sm:gap-3 p-3.5 sm:p-0 rounded-2xl sm:rounded-none bg-white sm:bg-transparent border sm:border-0 border-neutral-200/80 shadow-[0_2px_8px_rgba(0,0,0,0.03)] sm:shadow-none group min-w-0">
              <div className="w-11 h-11 sm:w-13 sm:h-13 rounded-2xl bg-[#F8F9FB] sm:bg-white border border-neutral-200/90 shadow-[inset_0_1.5px_1px_rgba(255,255,255,1),inset_0_-2px_3px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.04)] flex items-center justify-center text-neutral-800 group-hover:border-[#EB4604]/40 group-hover:text-[#EB4604] group-hover:scale-105 transition-all duration-300 shrink-0">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:rotate-45" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="space-y-0.5 sm:space-y-1 flex-1 min-w-0">
                <h4 className="text-xs sm:text-base font-bold text-[#0A0A0A] tracking-tight truncate group-hover:text-[#EB4604] transition-colors" style={{ fontFamily: 'var(--font-family--primary-font)' }}>
                  Horaires
                </h4>
                <p className="text-xs sm:text-sm text-neutral-800 font-semibold truncate">
                  08h30 - 18h30
                </p>
                <span className="text-[10px] sm:text-xs text-neutral-400 font-light block truncate">
                  Lun - Ven (Dakar, UTC)
                </span>
              </div>
            </div>

            {/* Col 3: Write to Us */}
            <a
              href={`mailto:${siteConfig.contact.email}`}
              className="flex flex-row sm:flex-col items-center sm:text-center text-left gap-3.5 sm:gap-3 p-3.5 sm:p-0 rounded-2xl sm:rounded-none bg-white sm:bg-transparent border sm:border-0 border-neutral-200/80 shadow-[0_2px_8px_rgba(0,0,0,0.03)] sm:shadow-none group min-w-0 transition-all active:scale-[0.98] sm:active:scale-100 touch-manipulation"
            >
              <div className="w-11 h-11 sm:w-13 sm:h-13 rounded-2xl bg-[#F8F9FB] sm:bg-white border border-neutral-200/90 shadow-[inset_0_1.5px_1px_rgba(255,255,255,1),inset_0_-2px_3px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.04)] flex items-center justify-center text-neutral-800 group-hover:border-[#EB4604]/40 group-hover:text-[#EB4604] group-hover:scale-105 transition-all duration-300 shrink-0">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:-translate-y-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="space-y-0.5 sm:space-y-1 flex-1 min-w-0">
                <h4 className="text-xs sm:text-base font-bold text-[#0A0A0A] tracking-tight truncate group-hover:text-[#EB4604] transition-colors" style={{ fontFamily: 'var(--font-family--primary-font)' }}>
                  E-mail direct
                </h4>
                <p className="text-xs sm:text-sm text-neutral-800 group-hover:text-[#EB4604] transition-colors font-semibold truncate">
                  {siteConfig.contact.email}
                </p>
                <span className="text-[10px] sm:text-xs text-neutral-400 font-light block truncate">
                  Réponse sous 24h
                </span>
              </div>
              <span className="sm:hidden text-neutral-400 text-sm font-semibold shrink-0 group-hover:text-[#EB4604] transition-colors">
                ↗
              </span>
            </a>
          </div>
        </Container>
      </Section>

      <Footer />
    </main>
  )
}
