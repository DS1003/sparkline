'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
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
    <section className="w-full bg-white p-2 sm:p-3 md:p-3.5 lg:p-4 xl:p-5">
      <div className="relative rounded-2xl md:rounded-[24px] bg-[#070709] text-white overflow-hidden p-4 sm:p-6 lg:p-6 xl:p-8 min-h-[520px] sm:min-h-[580px] lg:min-h-0 lg:h-[calc(100vh-2rem)] lg:max-h-[800px] xl:max-h-[850px] flex flex-col justify-between shadow-2xl border border-white/10">

        {/* ── Background Image Visible & Vibrant ── */}
        <div className="absolute inset-0 pointer-events-none select-none">
          <Image
            src="/images/heroes/sparklearn-comingsoon-bg.webp"
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
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] bg-gradient-to-tr from-[#EB4604]/25 via-[#FFB901]/10 to-transparent rounded-full blur-[120px]" />
        </div>

        {/* 1. Integrated Navbar */}
        <Navbar />

        {/* 2. Main Centered Coming Soon Content */}
        <div className="relative z-10 my-auto w-full max-w-3xl xl:max-w-4xl mx-auto text-center py-1 sm:py-2 flex flex-col items-center">
          {/* Tag Badge */}
          <RevealOnScroll>
            <div className="mb-2.5 sm:mb-3.5 lg:mb-3 xl:mb-4">
              <Tag variant="base">Initiative Éducative • Coming Soon</Tag>
            </div>
          </RevealOnScroll>

          {/* Title */}
          <RevealOnScroll delay={0.1}>
            <h1
              className="text-2xl sm:text-4xl md:text-5xl lg:text-[40px] xl:text-[50px] 2xl:text-6xl font-bold tracking-tight text-white leading-[1.1] mb-2.5 sm:mb-3.5 lg:mb-3 xl:mb-4 drop-shadow-md"
              style={{ fontFamily: 'var(--font-family--primary-font)' }}
            >
              Forger les compétences <br className="hidden sm:block" />
              du futur avec <span className="text-[#EB4604]">Sparklearn.</span>
            </h1>
          </RevealOnScroll>

          {/* Subtitle */}
          <RevealOnScroll delay={0.15}>
            <p className="text-xs sm:text-sm lg:text-sm xl:text-base text-neutral-200 max-w-md lg:max-w-lg xl:max-w-xl mx-auto font-light leading-relaxed mb-3.5 sm:mb-5 lg:mb-4 xl:mb-5 drop-shadow">
              Notre plateforme dédiée au mentorat, aux masterclasses et aux bootcamps pour les créateurs digitaux en Afrique prépare son lancement.
            </p>
          </RevealOnScroll>

          {/* Email Notification Form */}
          <RevealOnScroll delay={0.2} className="w-full flex justify-center">
            <div className="w-full max-w-sm sm:max-w-md mb-3.5 sm:mb-5 lg:mb-4 xl:mb-5">
              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.98 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                    className="p-2 sm:p-2.5 pl-3 sm:pl-3.5 pr-2.5 sm:pr-3 rounded-full bg-[#121214] border border-[#EB4604] text-white flex items-center justify-between gap-2 sm:gap-3 shadow-xl w-full max-w-full"
                  >
                    <div className="flex items-center gap-2 sm:gap-2.5 min-w-0 flex-1">
                      <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#EB4604] text-white flex items-center justify-center shrink-0 shadow-sm">
                        <svg
                          className="w-3 h-3 sm:w-3.5 sm:h-3.5"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </div>
                      <span className="text-xs sm:text-sm font-medium text-white truncate text-left">
                        <span className="sm:hidden">Merci ! Inscription validée.</span>
                        <span className="hidden sm:inline">Merci ! Vous serez informé(e) en priorité.</span>
                      </span>
                    </div>

                    <button
                      onClick={() => setSubmitted(false)}
                      className="text-[11px] sm:text-xs text-neutral-400 hover:text-white px-2.5 py-1 rounded-full bg-white/10 hover:bg-white/15 transition-colors shrink-0 font-medium cursor-pointer"
                    >
                      Modifier
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.25 }}
                    onSubmit={handleSubmit}
                    className="w-full max-w-full"
                  >
                    <div className="rounded-full border border-white/20 bg-black/60 hover:border-white/35 focus-within:border-[#EB4604] p-1.5 pl-3.5 sm:pl-5 flex items-center justify-between transition-all duration-300 shadow-xl w-full max-w-full">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Entrez votre e-mail..."
                        required
                        className="bg-transparent text-white placeholder:text-neutral-400 focus:outline-none w-full min-w-0 text-base sm:text-sm font-normal py-1 pr-2 touch-manipulation"
                      />
                      <button
                        type="submit"
                        className="group px-3.5 sm:px-5 py-2 rounded-full bg-[#EB4604] hover:bg-[#D43D00] text-white text-xs sm:text-xs xl:text-sm font-semibold transition-all duration-300 hover:scale-[1.02] shadow-md shadow-[#EB4604]/30 active:scale-[0.98] shrink-0 inline-flex items-center justify-center gap-1.5 select-none"
                      >
                        <span>Être notifié</span>
                        <svg
                          className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </button>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </RevealOnScroll>

          {/* Compact Feature Pills */}
          <RevealOnScroll delay={0.25}>
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5">
              {[
                {
                  icon: <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white/90" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5z" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 14v7" /></svg>,
                  label: 'Masterclasses'
                },
                {
                  icon: <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white/90" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
                  label: 'Bootcamps'
                },
                {
                  icon: <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white/90" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>,
                  label: 'Mentorat'
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-black/40 border border-white/15 backdrop-blur-md text-[10px] sm:text-xs font-medium text-neutral-200 shadow-sm"
                >
                  <span className="flex items-center justify-center">{item.icon}</span>
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
          </RevealOnScroll>
        </div>

        {/* 3. Bottom Meta Bar */}
        <div className="relative z-10 w-full pt-3 sm:pt-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-[10px] sm:text-xs font-mono text-neutral-300 uppercase tracking-wider px-1 text-center sm:text-left">
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
