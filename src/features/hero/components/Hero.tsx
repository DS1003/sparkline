'use client'

import React from 'react'
import { Tag } from '@/components/ui/Tag'
import { Navbar } from '@/components/layout/Navbar'
import { RevealOnScroll } from '@/components/motion/RevealOnScroll'
import { Button } from '@/components/ui/Button'
import { SparkTitle } from './SparkTitle'

export function Hero() {
  return (
    <section className="w-full bg-white p-2 sm:p-3 md:p-3.5 lg:p-4 xl:p-5">
      {/* Hero Inset Card (Sleek, Framed Proportions on Laptops and Desktops) */}
      <div className="relative rounded-2xl md:rounded-[20px] bg-[#070709] text-white overflow-hidden p-4 sm:p-5 lg:p-6 xl:p-10 min-h-[75svh] sm:min-h-[78svh] lg:min-h-[480px] xl:min-h-[calc(100vh-40px)] xl:max-h-[860px] flex flex-col justify-between shadow-2xl">
        {/* Background Blurred Studio Texture Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-25 mix-blend-luminosity scale-105 transform pointer-events-none"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop')`,
          }}
        />

        {/* Abstract Spark Motifs: Ambient Orbital Glows & Gradient Rings inspired by Logo Symbol */}
        <div className="absolute top-1/3 left-1/4 w-[600px] h-[600px] bg-gradient-to-tr from-[#EB4604]/20 via-[#FFB901]/10 to-transparent rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-10 right-1/4 w-[380px] h-[380px] bg-[#EB4604]/10 rounded-full blur-[100px] pointer-events-none" />

        {/* Top Navbar with Official Logo */}
        <Navbar />

        {/* Main Hero Headline Area with Real Spark Writing Effect */}
        <div className="relative z-10 my-auto max-w-3xl xl:max-w-4xl py-1.5 sm:py-2.5 lg:py-2 xl:py-4 space-y-2 sm:space-y-3 lg:space-y-2.5 xl:space-y-4">
          <RevealOnScroll delay={0.1}>
            <Tag variant="base">Agence de transformation digitale</Tag>
          </RevealOnScroll>

          {/* Spark Writing Title on Strictly 3 Lines */}
          <SparkTitle lines={['Concevoir la', 'nouvelle génération', 'de marques']} />

          <RevealOnScroll delay={0.3}>
            <p className="text-xs sm:text-sm lg:text-[13px] xl:text-base text-neutral-300 max-w-md xl:max-w-lg font-normal leading-relaxed">
              Accompagner les marques dans leur lancement, leur croissance et leur leadership grâce à un design d'exception.
            </p>
          </RevealOnScroll>
        </div>

        {/* Bottom Split Row: Left Metadata & Right Subheading + Dual Pill Buttons */}
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-2.5 sm:gap-3.5 lg:gap-4 xl:gap-6 items-end pt-2.5 sm:pt-3.5 lg:pt-3 xl:pt-5 border-t border-white/10">
          {/* Left Metadata Bar */}
          <div className="lg:col-span-6">
            <RevealOnScroll delay={0.4}>
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 sm:gap-4 xl:gap-7 text-[8.5px] sm:text-[10px] xl:text-xs font-mono text-neutral-400 uppercase tracking-wider xl:tracking-widest">
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

          {/* Right Subheading + Dual Pill Buttons */}
          <div className="lg:col-span-6 flex flex-col items-center text-center lg:items-end lg:text-right space-y-1.5 sm:space-y-2.5 xl:space-y-3.5">
            <RevealOnScroll delay={0.4}>
              <h2 className="text-[11px] sm:text-xs lg:text-[12.5px] xl:text-lg font-medium text-white max-w-xs xl:max-w-md leading-snug">
                Branding, design d'applications mobiles & web pour startups et leaders
              </h2>
            </RevealOnScroll>

            <RevealOnScroll delay={0.5}>
              <div className="flex flex-wrap sm:flex-nowrap items-center justify-center lg:justify-end gap-1.5 sm:gap-2.5 w-full sm:w-auto">
                {/* Red/Orange Pill Button with Official Brand Color */}
                <Button
                  href="/projects"
                  variant="primary"
                  className="px-3 sm:px-4 xl:px-5 py-1.5 sm:py-2 xl:py-2.5 text-[10.5px] sm:text-xs shrink-0"
                >
                  Voir les projets
                </Button>

                {/* White Pill Button */}
                <Button
                  href="/contact"
                  variant="secondary"
                  className="px-3 sm:px-4 xl:px-5 py-1.5 sm:py-2 xl:py-2.5 text-[10.5px] sm:text-xs shrink-0"
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
