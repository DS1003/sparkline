'use client'

import React from 'react'
import Link from 'next/link'
import { Container } from './Container'
import { Tag } from '../ui/Tag'
import { RevealOnScroll } from '../motion/RevealOnScroll'
import { siteConfig } from '@/config/site'

interface SectionCTAProps {
  tag?: string
  title?: string
  subtitle?: string
  primaryLabel?: string
  primaryHref?: string
  secondaryLabel?: string
  secondaryHref?: string
}

export function SectionCTA({
  tag = 'Démarrer un projet',
  title = 'DONNONS VIE À VOTRE PROJET NUMÉRIQUE.',
  subtitle = 'Vous avez une idée ambitieuse ? Collaborons pour la métamorphoser en une expérience digitale puissante et durable.',
  primaryLabel = 'Réserver un appel découverte',
  primaryHref = '/contact',
  secondaryLabel = 'Découvrir nos réalisations',
  secondaryHref = '/projects',
}: SectionCTAProps) {
  return (
    <section className="w-full bg-white p-2.5 sm:p-4 lg:p-5">
      <div className="relative rounded-2xl md:rounded-[20px] bg-[#070709] text-white overflow-hidden p-8 sm:p-12 lg:p-16 flex flex-col justify-between shadow-2xl">
        {/* Ambient Gradient Glows */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-[#EB4604]/25 via-[#FFB901]/10 to-transparent rounded-full blur-[140px] pointer-events-none" />

        <div className="relative z-10 max-w-6xl space-y-6">
          <RevealOnScroll>
            <Tag variant="base">{tag}</Tag>
          </RevealOnScroll>

          <RevealOnScroll delay={0.1}>
            <h2
              className="text-[clamp(2.25rem,4.4vw,72px)] font-bold text-white tracking-tight leading-[1.05]"
              style={{ fontFamily: 'var(--font-family--primary-font)' }}
            >
              <span className="block lg:whitespace-nowrap">DONNONS VIE À VOTRE</span>
              <span className="block lg:whitespace-nowrap">PROJET NUMÉRIQUE.</span>
            </h2>
          </RevealOnScroll>

          <RevealOnScroll delay={0.2}>
            <p className="text-base sm:text-xl text-neutral-300 max-w-2xl font-light leading-relaxed">
              {subtitle}
            </p>
          </RevealOnScroll>

          <RevealOnScroll delay={0.3}>
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <Link
                href={primaryHref}
                className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-[#EB4604] text-white text-sm font-semibold hover:bg-[#D43D00] transition-all duration-300 shadow-lg shadow-[#EB4604]/30 group"
              >
                <span>{primaryLabel}</span>
                <svg
                  className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7 17L17 7M17 7H7M17 7V17"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>

              <Link
                href={secondaryHref}
                className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-white text-black text-sm font-semibold hover:bg-neutral-200 transition-all duration-300 group"
              >
                <span>{secondaryLabel}</span>
                <svg
                  className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7 17L17 7M17 7H7M17 7V17"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            </div>
          </RevealOnScroll>
        </div>

        {/* Quick Contact Line */}
        <div className="relative z-10 pt-10 mt-10 border-t border-white/10 flex flex-wrap items-center justify-between gap-6 text-xs font-mono text-neutral-400">
          <div className="flex items-center gap-6">
            <span>Ligne directe : <a href={`tel:${siteConfig.contact.phone}`} className="text-white hover:text-[#EB4604] transition-colors">{siteConfig.contact.phone}</a></span>
            <span className="hidden sm:inline text-neutral-600">•</span>
            <span>E-mail : <a href={`mailto:${siteConfig.contact.email}`} className="text-white hover:text-[#EB4604] transition-colors">{siteConfig.contact.email}</a></span>
          </div>
          <div>Dakar, Sénégal <span className="text-[#EB4604]">•</span> Afrique de l'Ouest</div>
        </div>
      </div>
    </section>
  )
}
