'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Navbar } from '@/components/layout/Navbar'
import { Tag } from '@/components/ui/Tag'
import { RevealOnScroll } from '@/components/motion/RevealOnScroll'

export function ComingSoon() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email.trim()) {
      setSubmitted(true)
      setEmail('')
    }
  }

  return (
    <section className="w-full bg-white p-2.5 sm:p-3.5 md:p-4 lg:p-5">
      <div className="relative rounded-2xl md:rounded-[24px] bg-[#070709] text-white overflow-hidden p-5 sm:p-8 lg:p-12 xl:p-14 min-h-[580px] sm:min-h-[640px] lg:min-h-[700px] flex flex-col justify-between shadow-2xl border border-white/10">

        {/* ── Background Image Visible & Vibrant ── */}
        <div className="absolute inset-0 pointer-events-none select-none">
          <Image
            src="/images/heroes/sparklearn-comingsoon-bg.png"
            alt="SPARKlearn Background"
            fill
            priority
            quality={95}
            className="object-cover object-center opacity-60 scale-100"
            sizes="100vw"
          />
          {/* Subtle Dark Gradient Overlay for Readability while Keeping Image Vibrant */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#070709]/70 via-[#070709]/50 to-[#070709]/85" />

          {/* Ambient Orange Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-tr from-[#EB4604]/25 via-[#FFB901]/10 to-transparent rounded-full blur-[130px]" />
        </div>

        {/* 1. Integrated Navbar */}
        <Navbar />

        {/* 2. Main Centered Coming Soon Content */}
        <div className="relative z-10 my-auto max-w-4xl mx-auto text-center py-6 sm:py-10 flex flex-col items-center">
          {/* Tag Badge */}
          <RevealOnScroll>
            <div className="mb-5 sm:mb-6">
              <Tag variant="base">Initiative Éducative • Coming Soon</Tag>
            </div>
          </RevealOnScroll>

          {/* Title */}
          <RevealOnScroll delay={0.1}>
            <h1
              className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.08] mb-4 sm:mb-6 drop-shadow-md"
              style={{ fontFamily: 'var(--font-family--primary-font)' }}
            >
              Forger les compétences <br className="hidden sm:block" />
              du futur avec <span className="text-[#EB4604]">Sparklearn.</span>
            </h1>
          </RevealOnScroll>

          {/* Subtitle */}
          <RevealOnScroll delay={0.15}>
            <p className="text-xs sm:text-base lg:text-lg text-neutral-200 max-w-xl mx-auto font-light leading-relaxed mb-8 sm:mb-10 drop-shadow">
              Notre plateforme dédiée au mentorat, aux masterclasses et aux bootcamps pour les créateurs digitaux en Afrique prépare son lancement.
            </p>
          </RevealOnScroll>

          {/* Email Notification Form */}
          <RevealOnScroll delay={0.2}>
            <div className="w-full max-w-md mb-8 sm:mb-10">
              {!submitted ? (
                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-stretch gap-3 sm:gap-2 sm:bg-black/40 sm:border sm:border-white/20 sm:p-1.5 sm:rounded-full sm:backdrop-blur-md sm:shadow-2xl w-full">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Entrez votre e-mail..."
                    required
                    className="w-full sm:flex-1 px-5 sm:px-5 py-3.5 sm:py-3 bg-black/40 sm:bg-transparent border border-white/20 sm:border-transparent rounded-full sm:rounded-none text-white text-base sm:text-sm placeholder:text-neutral-300 font-light focus:outline-none backdrop-blur-md sm:backdrop-blur-none"
                  />
                  <button
                    type="submit"
                    className="w-full sm:w-auto group px-5 sm:px-7 py-3.5 sm:py-3 rounded-full bg-[#EB4604] hover:bg-[#D43D00] text-white text-sm sm:text-sm font-semibold transition-all duration-300 hover:scale-[1.02] shadow-lg shadow-[#EB4604]/30 active:scale-[0.98] shrink-0 inline-flex items-center justify-center gap-2"
                  >
                    <span>Être notifié</span>
                    <svg
                      className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </form>
              ) : (
                <div className="flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 backdrop-blur-md">
                  <svg className="w-4.5 h-4.5 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-xs sm:text-sm font-medium">Merci ! Vous serez informé(e) en priorité.</span>
                </div>
              )}
            </div>
          </RevealOnScroll>

          {/* Compact Feature Pills */}
          <RevealOnScroll delay={0.25}>
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
              {[
                {
                  icon: <svg className="w-3.5 h-3.5 sm:w-4.5 sm:h-4.5 text-white/90" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5z" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 14v7" /></svg>,
                  label: 'Masterclasses'
                },
                {
                  icon: <svg className="w-3.5 h-3.5 sm:w-4.5 sm:h-4.5 text-white/90" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
                  label: 'Bootcamps'
                },
                {
                  icon: <svg className="w-3.5 h-3.5 sm:w-4.5 sm:h-4.5 text-white/90" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>,
                  label: 'Mentorat'
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-center gap-1.5 sm:gap-2.5 px-3 sm:px-5 py-1.5 sm:py-2.5 rounded-full bg-black/40 border border-white/15 backdrop-blur-md text-[10px] sm:text-sm font-medium text-neutral-200 shadow-sm"
                >
                  <span className="flex items-center justify-center">{item.icon}</span>
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
          </RevealOnScroll>
        </div>

        {/* 3. Bottom Meta Bar */}
        <div className="relative z-10 w-full pt-4 sm:pt-6 border-t border-white/15 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-2.5 text-[10px] sm:text-xs font-mono text-neutral-300 uppercase tracking-wider px-1 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-2">
            <span className="text-[#EB4604] font-bold">+</span>
            <span>Lancement : <span className="text-white font-semibold">Q1 2027</span></span>
          </div>

          <div className="hidden md:flex items-center gap-1.5 text-neutral-300">
            <Link href="/" className="hover:text-white transition-colors">
              Accueil
            </Link>
            <span className="text-neutral-500">/</span>
            <span className="text-[#EB4604]">Sparklearn</span>
          </div>

          <div>
            <span>SPARKLINE ÉDUCATION</span>
          </div>
        </div>

      </div>
    </section>
  )
}
