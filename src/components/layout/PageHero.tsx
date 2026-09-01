'use client'

import React from 'react'
import Link from 'next/link'
import { Tag } from '../ui/Tag'
import { Navbar } from './Navbar'
import { RevealOnScroll } from '../motion/RevealOnScroll'

interface PageHeroProps {
  tag: string
  title: string
  highlight?: string
  subtitle: string
  breadcrumbs?: { label: string; href: string }[]
  metaItems?: { label: string; value: string }[]
}

export function PageHero({
  tag,
  title,
  highlight,
  subtitle,
  breadcrumbs,
  metaItems,
}: PageHeroProps) {
  return (
    <section className="w-full bg-white p-2.5 sm:p-4 lg:p-5">
      <div className="relative rounded-2xl md:rounded-[20px] bg-[#070709] text-white overflow-hidden p-5 sm:p-8 lg:p-12 min-h-[400px] sm:min-h-[480px] lg:min-h-[540px] flex flex-col justify-between shadow-2xl">
        {/* Ambient Blurred Studio Backdrop */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20 mix-blend-luminosity scale-105 pointer-events-none"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop')`,
          }}
        />

        {/* Ambient Gradient Glows */}
        <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-gradient-to-tr from-[#EB4604]/20 via-[#FFB901]/10 to-transparent rounded-full blur-[140px] pointer-events-none" />

        {/* 1. Integrated Top Navbar (Inside the Card, matching Homepage layout) */}
        <Navbar />

        {/* 2. Top Breadcrumbs / Tag row */}
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 pt-4 sm:pt-6">
          <RevealOnScroll>
            <Tag variant="base">{tag}</Tag>
          </RevealOnScroll>

          {breadcrumbs && breadcrumbs.length > 0 && (
            <div className="flex items-center gap-2 text-[11px] sm:text-xs font-mono text-neutral-400">
              <Link href="/" className="hover:text-white transition-colors">
                Accueil
              </Link>
              {breadcrumbs.map((crumb, idx) => (
                <React.Fragment key={idx}>
                  <span className="text-neutral-600">/</span>
                  <Link href={crumb.href} className="hover:text-[#EB4604] transition-colors">
                    {crumb.label}
                  </Link>
                </React.Fragment>
              ))}
            </div>
          )}
        </div>

        {/* 3. Central Display Headline Area */}
        <div className="relative z-10 my-auto max-w-4xl py-5 sm:py-6 space-y-4 sm:space-y-5">
          <RevealOnScroll delay={0.1}>
            <h1
              className="text-[clamp(2.1rem,6vw,68px)] lg:text-7xl xl:text-8xl text-white tracking-tight leading-[1.04] font-bold"
              style={{ fontFamily: 'var(--font-family--primary-font)' }}
            >
              {title}{' '}
              {highlight && (
                <span className="text-[#EB4604]">{highlight}</span>
              )}
            </h1>
          </RevealOnScroll>

          <RevealOnScroll delay={0.2}>
            <p className="text-sm sm:text-lg lg:text-xl text-neutral-300 max-w-2xl font-light leading-relaxed">
              {subtitle}
            </p>
          </RevealOnScroll>
        </div>

        {/* 4. Optional Bottom Meta Bar */}
        {metaItems && metaItems.length > 0 && (
          <div className="relative z-10 pt-5 sm:pt-6 border-t border-white/10 flex flex-wrap gap-4 sm:gap-8 text-[11px] sm:text-xs font-mono text-neutral-400 uppercase tracking-widest">
            {metaItems.map((item, idx) => (
              <div key={idx}>
                <span className="text-[#EB4604] font-bold">+</span> {item.label}: <span className="text-white">{item.value}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
