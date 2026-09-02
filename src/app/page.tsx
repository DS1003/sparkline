import React from 'react'
import Link from 'next/link'
import { Metadata } from 'next'
import { Footer } from '@/components/layout/Footer'
import { Preloader } from '@/components/layout/Preloader'
import { Hero } from '@/features/hero/components/Hero'
import { MarqueeStrip } from '@/components/motion/MarqueeStrip'
import { ExpertiseMarqueeStrip } from '@/components/motion/ExpertiseMarqueeStrip'
import { About } from '@/features/about/components/About'
import { Services } from '@/features/services/components/Services'
import { SelectedWork } from '@/features/projects/components/SelectedWork'
import { Approach } from '@/features/approach/components/Approach'
import { PartnersSection } from '@/features/partners/components/PartnersSection'
import { FAQSection } from '@/features/faq/components/FAQSection'
import { SectionCTA } from '@/components/layout/SectionCTA'
import { siteConfig } from '@/config/site'


export const metadata: Metadata = {
  title: 'SPARKLINE | Transformation digitale, Design & Innovation',
  description: siteConfig.description,
}

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white text-neutral-900 overflow-hidden">
      <Preloader />

      {/* 1. Immersive Hero with Nested Navbar */}
      <Hero />

      {/* 2. Client Partner Infinite Marquee */}
      <MarqueeStrip />

      {/* 3. About / Manifesto Section with "En chiffres" stats */}
      <About />

      {/* 3.5 Red Expertise Marquee Strip (Solutions Hybrides, Réseaux, Observabilité, etc.) */}
      <ExpertiseMarqueeStrip />

      {/* 4. Services Overview Preview */}
      <Services />

      {/* 5. Selected Work Showcase */}
      <SelectedWork />

      {/* 7. Approach Methodology */}
      <Approach />

      {/* 8. Partners & Ecosystem Ribbon Marquee Section */}
      <PartnersSection />

      {/* 10. Frequently Asked Questions (FAQ) */}
      <FAQSection />

      {/* 11. High-Impact Closing CTA Banner */}
      <SectionCTA />

      {/* 11. Complete Footer */}
      <Footer />
    </main>
  )
}
