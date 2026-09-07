import dynamic from 'next/dynamic'
import { Metadata } from 'next'
import { Footer } from '@/components/layout/Footer'
import { Preloader } from '@/components/layout/Preloader'
import { Hero } from '@/features/hero/components/Hero'
import { MarqueeStrip } from '@/components/motion/MarqueeStrip'
import { ExpertiseMarqueeStrip } from '@/components/motion/ExpertiseMarqueeStrip'
import { About } from '@/features/about/components/About'
import { Services } from '@/features/services/components/Services'
import { siteConfig } from '@/config/site'

// Dynamic imports for below-the-fold sections to drastically reduce initial JS execution and load time
const SelectedWork = dynamic(
  () => import('@/features/projects/components/SelectedWork').then((mod) => mod.SelectedWork)
)
const Approach = dynamic(
  () => import('@/features/approach/components/Approach').then((mod) => mod.Approach)
)
const PartnersSection = dynamic(
  () => import('@/features/partners/components/PartnersSection').then((mod) => mod.PartnersSection)
)
const FAQSection = dynamic(
  () => import('@/features/faq/components/FAQSection').then((mod) => mod.FAQSection)
)
const SectionCTA = dynamic(
  () => import('@/components/layout/SectionCTA').then((mod) => mod.SectionCTA)
)


export const metadata: Metadata = {
  title: 'SPARKLINE | Transformation digitale, Design & Innovation',
  description: siteConfig.description,
}

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white text-neutral-900 overflow-x-clip">
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
      <div className="content-auto">
        <SelectedWork />
      </div>

      {/* 7. Approach Methodology */}
      <div className="content-auto">
        <Approach />
      </div>

      {/* 8. Partners & Ecosystem Ribbon Marquee Section */}
      <div className="content-auto">
        <PartnersSection />
      </div>

      {/* 10. Frequently Asked Questions (FAQ) */}
      <div className="content-auto">
        <FAQSection />
      </div>

      {/* 11. High-Impact Closing CTA Banner */}
      <div className="content-auto">
        <SectionCTA />
      </div>

      {/* 11. Complete Footer */}
      <Footer />
    </main>
  )
}
