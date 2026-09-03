'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Tag } from '../ui/Tag'
import { Navbar } from './Navbar'
import { RevealOnScroll } from '../motion/RevealOnScroll'

interface PageHeroProps {
  tag: string
  title: string
  highlight?: string
  pillImage?: string
  subtitle: string
  breadcrumbs?: { label: string; href: string }[]
  metaItems?: { label: string; value: string }[]
}

export function PageHero({
  tag,
  title,
  highlight,
  pillImage,
  subtitle,
  breadcrumbs,
  metaItems,
}: PageHeroProps) {
  return (
    <section className="w-full bg-white p-2.5 sm:p-3.5 md:p-4 lg:p-5">
      <div className="relative rounded-2xl md:rounded-[20px] bg-[#070709] text-white overflow-hidden p-5 sm:p-7 lg:p-8 xl:p-11 min-h-[440px] sm:min-h-[480px] lg:min-h-[500px] xl:min-h-[560px] flex flex-col justify-between items-center text-center shadow-2xl">
        {/* Subtle Ambient Studio Background (Matching About Page Hero) */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-15 mix-blend-luminosity scale-105 pointer-events-none"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2064&auto=format&fit=crop')`,
          }}
        />

        {/* Central Radial Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-[#EB4604]/20 via-[#FFB901]/10 to-transparent rounded-full blur-[150px] pointer-events-none" />

        {/* 1. Integrated Navbar Inside Hero Card (Matches Homepage & About) */}
        <Navbar />

        {/* 2. Top Centered Tag Badge */}
        <div className="relative z-10 pt-2 sm:pt-4 flex justify-center">
          <RevealOnScroll>
            <Tag variant="base">{tag}</Tag>
          </RevealOnScroll>
        </div>

        {/* 3. Center: Hero Headline & Subtitle with Contextual Portrait Capsule */}
        <div className="relative z-10 my-auto max-w-5xl py-4 sm:py-6 space-y-3 sm:space-y-4 text-center">
          <RevealOnScroll delay={0.1}>
            <h1
              className="text-3xl sm:text-5xl md:text-5xl lg:text-[56px] xl:text-7xl 2xl:text-8xl font-bold tracking-tight text-white leading-[1.08]"
              style={{ fontFamily: 'var(--font-family--primary-font)' }}
            >
              <span>{title}</span>{' '}
              {pillImage && (
                <span className="inline-flex items-center align-middle mx-1 sm:mx-2.5 my-0.5 overflow-hidden rounded-full w-12 h-7 sm:w-16 sm:h-10 md:w-18 md:h-11 xl:w-24 xl:h-14 border-2 border-white/30 shadow-lg relative shrink-0 transition-transform duration-300 hover:scale-105">
                  <Image
                    src={pillImage}
                    alt={title}
                    fill
                    quality={95}
                    className="object-cover"
                    sizes="120px"
                  />
                </span>
              )}{' '}
              {highlight && (
                <span className="text-[#EB4604]">{highlight}</span>
              )}
            </h1>
          </RevealOnScroll>

          {subtitle && (
            <RevealOnScroll delay={0.2}>
              <p className="text-xs sm:text-sm lg:text-[15px] xl:text-lg text-neutral-300 max-w-2xl mx-auto font-light leading-relaxed">
                {subtitle}
              </p>
            </RevealOnScroll>
          )}
        </div>

        {/* 4. Bottom Bar: Category / Meta & Breadcrumbs / Year */}
        <div className="relative z-10 w-full pt-4 sm:pt-5 border-t border-white/10 flex items-center justify-between text-[10px] sm:text-xs font-mono text-neutral-400 uppercase tracking-wider xl:tracking-widest px-1 sm:px-2">
          <span>
            {metaItems && metaItems.length > 0 ? (
              <span>
                <span className="text-[#EB4604] font-bold">+</span> {metaItems[0].label}: <span className="text-white">{metaItems[0].value}</span>
              </span>
            ) : (
              'STUDIO DIGITAL & CRÉATIF'
            )}
          </span>

          {breadcrumbs && breadcrumbs.length > 0 ? (
            <div className="flex items-center gap-1.5 text-neutral-400">
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
          ) : metaItems && metaItems.length > 1 ? (
            <span>
              <span className="text-[#EB4604] font-bold">+</span> {metaItems[1].label}: <span className="text-white">{metaItems[1].value}</span>
            </span>
          ) : (
            <span>DEPUIS 2024</span>
          )}
        </div>
      </div>
    </section>
  )
}
