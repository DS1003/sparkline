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
      <div className="relative rounded-2xl md:rounded-[20px] bg-[#070709] text-white overflow-hidden p-5 sm:p-6 lg:p-8 xl:p-10 min-h-[85svh] sm:min-h-[80svh] lg:min-h-[480px] xl:min-h-[calc(100vh-40px)] xl:max-h-[860px] flex flex-col justify-between shadow-2xl">
        {/* Background Team Image — Responsive Placement (Perfect 4-Person Framing on Mobile & Desktop) */}
        {/* Background Images — Responsive Art Direction */}
        <div className="absolute inset-0 pointer-events-none select-none">
          {/* Mobile Image */}
          <div className="absolute inset-0 block md:hidden">
            <Image
              src="/images/heroes/ChatGPT Image Sep 4, 2026, 08_14_02 AM.png"
              alt="SPARKLINE Hero Background Mobile"
              fill
              priority
              quality={100}
              className="object-cover object-center"
            />
          </div>
          {/* Desktop Image */}
          <div className="absolute inset-0 hidden md:block">
            <Image
              src="/images/heroes/Gemini_Generated_Image_prl3ndprl3ndprl3.jpeg"
              alt="SPARKLINE Hero Background Desktop"
              fill
              priority
              quality={100}
              className="object-cover object-center"
            />
          </div>
        </div>

        {/* Tight Left-Side Contrast Shadow (Terminates strictly after the title text ~42%) */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#070709]/90 from-0% via-[#070709]/60 via-30% to-transparent to-50% pointer-events-none" />

        {/* Top Navbar with Official Logo */}
        <Navbar />

        {/* Main Hero Headline Area with Real Spark Writing Effect */}
        <div className="relative z-10 mt-auto mb-2 md:my-auto pt-16 sm:pt-20 md:pt-0 max-w-3xl xl:max-w-4xl py-1.5 sm:py-2.5 lg:py-2 xl:py-4 space-y-2 sm:space-y-3 lg:space-y-2.5 xl:space-y-4 flex flex-col items-center text-center lg:items-start lg:text-left">
          <RevealOnScroll delay={0.1}>
            <div className="relative inline-flex items-center group cursor-default">
              {/* Controlled Subtle Neon Rim Aura (tight & crisp, no excessive blur) */}
              <div 
                className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-[#EB4604]/40 via-[#FF6A1A]/50 to-[#EB4604]/40 blur-[6px] opacity-60 pointer-events-none" 
              />

              {/* 3D Extruded Outer Rim: Directional Light Gradient (Light on top, deep shadow on bottom) */}
              <div 
                className="relative p-[1.5px] rounded-full bg-gradient-to-b from-[#FFA873] via-[#EB4604] to-[#380D00]"
                style={{
                  boxShadow: '0 10px 25px -4px rgba(0,0,0,0.85), 0 4px 10px rgba(0,0,0,0.6), 0 0 14px rgba(235,70,4,0.35)'
                }}
              >
                {/* 3D Convex Pill Body */}
                <div 
                  className="relative inline-flex items-center gap-2 sm:gap-2.5 px-4.5 py-1.5 sm:px-5 sm:py-2 rounded-full bg-gradient-to-b from-[#1F120A] via-[#0E0805] to-[#060403] backdrop-blur-xl overflow-hidden"
                  style={{
                    boxShadow: 'inset 0 1.5px 1px rgba(255,255,255,0.45), inset 0 -2px 3px rgba(0,0,0,0.85), inset 0 0 10px rgba(235,70,4,0.3)'
                  }}
                >
                  {/* Top curved specular highlight (glass cylinder curvature) */}
                  <div className="absolute top-0 inset-x-5 h-[1px] bg-gradient-to-r from-transparent via-white/60 to-transparent pointer-events-none" />

                  {/* Moving Light Shimmer Beam */}
                  <div className="absolute inset-0 rounded-full overflow-hidden pointer-events-none">
                    <div className="animate-neon-shimmer absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-20deg]" />
                  </div>

                  {/* Subtle inner radial warmth */}
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,106,26,0.18)_0%,transparent_70%)] pointer-events-none" />

                  {/* Sparkling Icon with hot white core & dimensional shadow */}
                  <svg 
                    viewBox="0 0 24 24" 
                    className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white animate-neon-spark relative z-10 shrink-0 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]" 
                    fill="currentColor"
                  >
                    <path d="M12 0C12 0 12 10.5 24 12C24 12 12 13.5 12 24C12 24 12 13.5 0 12C0 12 12 10.5 12 0Z" />
                  </svg>

                  {/* 3D Embossed Neon Text: Crisp White-Hot Core with Controlled Orange Glow and Under-Shadow */}
                  <span 
                    className="relative z-10 text-[9.5px] sm:text-[10.5px] xl:text-[12px] font-bold tracking-[0.2em] sm:tracking-[0.24em] uppercase text-[#FFFBF7]"
                    style={{ 
                      textShadow: '0 1px 3px rgba(0,0,0,0.9), 0 0 2px #FFFFFF, 0 0 8px #FF7A29, 0 0 16px rgba(235,70,4,0.7)' 
                    }}
                  >
                    Agence de transformation digitale
                  </span>
                </div>
              </div>
            </div>
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
                Branding, design et conception d'applications mobiles & web pour startups et leaders
              </h2>
            </RevealOnScroll>

            <RevealOnScroll delay={0.45}>
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4 xl:gap-6 text-[8.5px] sm:text-[10px] xl:text-xs font-mono text-neutral-400 uppercase tracking-wider xl:tracking-widest pt-0.5">
                <div className="flex items-center gap-1.5">
                  <svg viewBox="0 0 24 24" className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#EB4604]" fill="currentColor">
                    <path d="M12 0C12 0 12 10.5 24 12C24 12 12 13.5 12 24C12 24 12 13.5 0 12C0 12 12 10.5 12 0Z" />
                  </svg>
                  STARTUP
                </div>
                <div className="flex items-center gap-1.5">
                  <svg viewBox="0 0 24 24" className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#EB4604]" fill="currentColor">
                    <path d="M12 0C12 0 12 10.5 24 12C24 12 12 13.5 12 24C12 24 12 13.5 0 12C0 12 12 10.5 12 0Z" />
                  </svg>
                  FONDÉ EN 2024
                </div>
                <div className="flex items-center gap-1.5">
                  <svg viewBox="0 0 24 24" className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#EB4604]" fill="currentColor">
                    <path d="M12 0C12 0 12 10.5 24 12C24 12 12 13.5 12 24C12 24 12 13.5 0 12C0 12 12 10.5 12 0Z" />
                  </svg>
                  AGENCE SPARKLINE
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
