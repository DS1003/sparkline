'use client'

import React from 'react'
import Image from 'next/image'
import { Tag } from '@/components/ui/Tag'
import { Navbar } from '@/components/layout/Navbar'
import { RevealOnScroll } from '@/components/motion/RevealOnScroll'
import { Button } from '@/components/ui/Button'
import { SparkTitle } from './SparkTitle'

export function Hero() {
  return (
    <section id="main-hero" className="w-full bg-white p-2 sm:p-3 md:p-3.5 lg:p-4 xl:p-5">
      {/* Hero Inset Card (Sleek, Framed Proportions on Laptops and Desktops) */}
      <div className="relative rounded-2xl md:rounded-[20px] bg-[#070709] text-white overflow-hidden p-4 sm:p-5 lg:p-6 xl:p-10 min-h-[75svh] sm:min-h-[78svh] lg:min-h-[480px] xl:min-h-[calc(100vh-40px)] xl:max-h-[860px] flex flex-col justify-between shadow-2xl">
        {/* Background Team Image — Responsive Placement (Perfect 4-Person Framing on Mobile & Desktop) */}
        <picture className="absolute inset-0 pointer-events-none select-none">
          <source media="(max-width: 767px)" srcSet="/images/heroes/hero-mobile-gemini.png" />
          <Image
            src="/images/heroes/Gemini_Generated_Image_qvm2qkqvm2qkqvm2.jpeg"
            alt="SPARKLINE Team"
            fill
            priority
            quality={100}
            className="object-cover object-top md:object-center pointer-events-none select-none"
          />
        </picture>

        {/* Tight Left-Side Contrast Shadow (Terminates strictly after the title text ~42%) */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#070709]/85 from-0% via-[#070709]/50 via-30% to-transparent to-42% pointer-events-none" />

        {/* Top Navbar with Official Logo */}
        <Navbar />

        {/* Main Hero Headline Area with Real Spark Writing Effect */}
        <div className="relative z-10 mt-auto mb-2 md:my-auto pt-16 sm:pt-20 md:pt-0 max-w-3xl xl:max-w-4xl py-1.5 sm:py-2.5 lg:py-2 xl:py-4 space-y-2 sm:space-y-3 lg:space-y-2.5 xl:space-y-4">
          <RevealOnScroll delay={0.1}>
            <Tag variant="base" size="sm">Agence de transformation digitale</Tag>
          </RevealOnScroll>

          {/* Spark Writing Title on Strictly 3 Lines */}
          <SparkTitle lines={['Concevoir la', 'nouvelle génération', 'de marques']} />

          <RevealOnScroll delay={0.3}>
            <p className="text-xs sm:text-sm lg:text-[13px] xl:text-base text-neutral-300 max-w-md xl:max-w-lg font-normal leading-relaxed">
              Accompagner les marques dans leur lancement, leur croissance et leur leadership grâce à un design d'exception.
            </p>
          </RevealOnScroll>
        </div>

        {/* Bottom Split Row: Left Subheading & Metadata | Right Action Buttons */}
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-4 lg:gap-6 items-end pt-2.5 sm:pt-3.5 lg:pt-3 xl:pt-5 border-t border-white/10">
          {/* Left Column: Subheading & Metadata */}
          <div className="lg:col-span-7 flex flex-col items-center text-center lg:items-start lg:text-left space-y-2 sm:space-y-2.5">
            <RevealOnScroll delay={0.4}>
              <h2 className="text-xs sm:text-sm lg:text-sm xl:text-lg font-medium text-white max-w-md xl:max-w-lg leading-snug">
                Branding, design d'applications mobiles & web pour startups et leaders
              </h2>
            </RevealOnScroll>

            <RevealOnScroll delay={0.45}>
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5 sm:gap-4 xl:gap-6 text-[8.5px] sm:text-[10px] xl:text-xs font-mono text-neutral-400 uppercase tracking-wider xl:tracking-widest pt-0.5">
                <div>
                  <span className="text-[#EB4604] font-bold">+</span> DÉFINIR
                </div>
                <div>
                  <span className="text-[#EB4604] font-bold">+</span> FONDÉ EN 2024
                </div>
                <div>
                  <span className="text-[#EB4604] font-bold">+</span> SYSTÈME : AGENCE SPARKLINE
                </div>
              </div>
            </RevealOnScroll>
          </div>

          {/* Right Column: Dual Action Buttons */}
          <div className="lg:col-span-5 flex items-center justify-center lg:justify-end">
            <RevealOnScroll delay={0.5}>
              <div className="flex flex-wrap sm:flex-nowrap items-center justify-center lg:justify-end gap-2 sm:gap-2.5 w-full sm:w-auto">
                {/* Red/Orange Pill Button with Official Brand Color */}
                <Button
                  href="/projects"
                  variant="primary"
                  className="px-3.5 sm:px-4.5 xl:px-6 py-1.5 sm:py-2 xl:py-2.5 text-[11px] sm:text-xs shrink-0"
                >
                  Voir les projets
                </Button>

                {/* White Pill Button */}
                <Button
                  href="/contact"
                  variant="secondary"
                  className="px-3.5 sm:px-4.5 xl:px-6 py-1.5 sm:py-2 xl:py-2.5 text-[11px] sm:text-xs shrink-0"
                >
                  Nous contacter
                </Button>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </div>
    </section>
  )
}
