'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowRight,
  CheckCircle2,
  Bell,
  ShieldCheck,
} from 'lucide-react'
import { Navbar } from '@/components/layout/Navbar'
import { RevealOnScroll } from '@/components/motion/RevealOnScroll'
import { notify } from '@/lib/notify'

export function CareersComingSoon() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim() || loading) return

    setLoading(true)
    setErrorMsg('')

    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email.trim(),
          source: 'careers_waitlist',
        }),
      })

      const data = await res.json()

      if (res.ok && data.success) {
        setSubmitted(true)
        setEmail('')
        notify.success('Inscription validée ! Vous serez alerté dès l’ouverture.')
      } else {
        setErrorMsg(data.error || 'Une erreur est survenue.')
        notify.error(data.error || 'Erreur lors de l’inscription.')
      }
    } catch {
      setErrorMsg('Connexion impossible. Veuillez réessayer.')
      notify.error('Connexion impossible.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full bg-white select-none">
      {/* ── 1. Hero Frame (Dark Luxury Container) ── */}
      <section className="w-full bg-white p-2.5 sm:p-3.5 md:p-4 lg:p-5">
        <div className="relative rounded-2xl md:rounded-[24px] bg-[#070709] text-white overflow-hidden p-5 sm:p-7 lg:p-8 xl:p-10 min-h-[580px] sm:min-h-[640px] lg:min-h-[700px] xl:min-h-[750px] flex flex-col justify-between shadow-2xl border border-white/10">
          {/* Subtle Ambient Background Lighting */}
          <div className="absolute inset-0 pointer-events-none select-none">
            {/* Background Image with Deep Contrast */}
            <Image
              src="/images/heroes/careers.webp"
              alt="Talents SPARKLINE"
              fill
              priority
              quality={90}
              className="object-cover object-center opacity-30 mix-blend-luminosity scale-105"
              sizes="100vw"
            />
            {/* Multi-layer Vignette Gradients */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#070709]/85 via-[#070709]/60 to-[#070709]/95" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(235,70,4,0.18)_0%,transparent_60%)]" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[550px] h-[350px] bg-gradient-to-t from-[#EB4604]/20 via-[#FFB901]/10 to-transparent rounded-full blur-[120px]" />
          </div>

          {/* Top Navbar Inside Hero */}
          <Navbar />

          {/* Center Content */}
          <div className="relative z-10 my-auto w-full max-w-3xl xl:max-w-4xl mx-auto text-center py-6 sm:py-8 flex flex-col items-center">
            {/* Status Pill Badge */}
            <RevealOnScroll>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/15 border border-white/15 backdrop-blur-md text-neutral-200 text-xs font-semibold tracking-wide mb-4 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-[#EB4604] animate-pulse" />
                <span className="text-white/80 font-mono uppercase text-[11px] tracking-wider">
                  Session 2026/2027 • Recrutement Bientôt Ouvert
                </span>
              </div>
            </RevealOnScroll>

            {/* Headline with Pill Image */}
            <RevealOnScroll delay={0.1}>
              <h1
                className="text-3xl sm:text-5xl md:text-6xl lg:text-[54px] xl:text-[62px] font-bold tracking-tight text-white leading-[1.1] mb-3 sm:mb-4 drop-shadow-md"
                style={{ fontFamily: 'var(--font-family--primary-font)' }}
              >
                Bâtir le futur{' '}
                <span className="inline-flex align-middle mx-1 -mt-1 sm:-mt-2">
                  <span className="relative inline-block w-14 sm:w-20 md:w-24 h-7 sm:h-10 md:h-12 rounded-full overflow-hidden border-2 border-white/20 shadow-md">
                    <Image
                      src="/images/heroes/careers.webp"
                      alt="Talent"
                      fill
                      className="object-cover object-center"
                    />
                  </span>
                </span>{' '}
                <span className="text-[#EB4604]">avec nous.</span>
              </h1>
            </RevealOnScroll>

            {/* Subtitle explaining current state */}
            <RevealOnScroll delay={0.15}>
              <p className="text-sm sm:text-base lg:text-[17px] text-neutral-300 max-w-xl lg:max-w-2xl mx-auto font-light leading-relaxed mb-6 sm:mb-8 drop-shadow">
                Nous préparons et structurons actuellement nos futures promotions de recrutement.
                <span className="font-semibold text-white"> Nos postes sont temporairement fermés à l’instant T</span>,
                mais nous ouvrirons très prochainement les portes de notre studio aux talents les plus audacieux.
              </p>
            </RevealOnScroll>

            {/* Interactive Alert Capture Box */}
            <RevealOnScroll delay={0.2} className="w-full flex justify-center">
              <div className="w-full max-w-lg">
                <AnimatePresence mode="wait">
                  {submitted ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="p-4 sm:p-5 rounded-2xl bg-white/10 backdrop-blur-md border border-emerald-400/30 text-white flex items-center justify-center gap-3"
                    >
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                      <div className="text-left text-xs sm:text-sm">
                        <strong className="block text-white font-semibold">
                          Vous êtes sur la liste prioritaire !
                        </strong>
                        <span className="text-neutral-300">
                          Vous recevrez un email dès l’ouverture officielle des candidatures.
                        </span>
                      </div>
                    </motion.div>
                  ) : (
                    <form
                      onSubmit={handleSubmit}
                      className="flex flex-col sm:flex-row items-center gap-2 p-1.5 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl"
                    >
                      <div className="relative flex-1 w-full flex items-center">
                        <Bell className="w-4 h-4 text-neutral-400 ml-3.5 shrink-0" />
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Votre email professionnel..."
                          className="w-full px-3 py-2.5 bg-transparent text-white placeholder-neutral-400 text-xs sm:text-sm focus:outline-none"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#EB4604] hover:bg-[#D43D00] text-white text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer shadow-md shadow-[#EB4604]/25 shrink-0 flex items-center justify-center gap-1.5"
                      >
                        <span>{loading ? 'Inscription...' : 'M’alerter à l’ouverture'}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </form>
                  )}
                </AnimatePresence>

                {errorMsg && <p className="text-xs text-rose-400 mt-2 font-medium">{errorMsg}</p>}

                {/* Privacy line using clean SVG icon instead of emoji */}
                <div className="flex items-center justify-center gap-1.5 text-[11px] text-neutral-400 mt-3 font-mono">
                  <ShieldCheck className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                  <span>Zéro spam. Uniquement la notification d’ouverture des postes.</span>
                </div>
              </div>
            </RevealOnScroll>
          </div>

          {/* Bottom Meta Bar */}
          <div className="relative z-10 w-full pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-neutral-400">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              <span>STATUT ACTUEL : PRÉPARATION DU STUDIO</span>
            </div>
            <div>PROCHAINE SESSION : Q4 2026 / Q1 2027</div>
            <div>LOCALISATION : DAKAR & REMOTE HYBRIDE</div>
          </div>
        </div>
      </section>
    </div>
  )
}
