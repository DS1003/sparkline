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
import { SparkLearnSection } from '@/features/sparklearn/components/SparkLearnSection'
import { Approach } from '@/features/approach/components/Approach'
import { TeamSection } from '@/features/team/components/TeamSection'
import { FAQSection } from '@/features/faq/components/FAQSection'
import { SectionCTA } from '@/components/layout/SectionCTA'
import { Container } from '@/components/layout/Container'
import { articlesRepository } from '@/lib/repositories/insights'
import { ArticleCard } from '@/components/ui/ArticleCard'
import { siteConfig } from '@/config/site'

export const metadata: Metadata = {
  title: 'SPARKLINE | Transformation digitale, Design & Innovation',
  description: siteConfig.description,
}

export default async function HomePage() {
  const latestArticles = await articlesRepository.getFeatured()

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

      {/* 6. SPARKlearn Initiative */}
      <SparkLearnSection />

      {/* 7. Approach Methodology */}
      <Approach />

      {/* 8. Insights Journal Preview */}
      <section className="py-20 bg-white border-t border-[#e2e2e7]">
        <Container>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#EB4604] font-semibold block mb-2">
                Connaissances & Insights
              </span>
              <h2 className="heading-02 text-neutral-900">Derniers articles du Journal</h2>
            </div>
            <Link
              href="/insights"
              className="text-sm font-semibold text-neutral-900 hover:text-[#EB4604] transition-colors flex items-center gap-1"
            >
              <span>Voir tous les articles</span>
              <span>→</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {latestArticles.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        </Container>
      </section>

      {/* 9. Team Roster */}
      <TeamSection />

      {/* 10. Frequently Asked Questions (FAQ) */}
      <FAQSection />

      {/* 11. High-Impact Closing CTA Banner */}
      <SectionCTA />

      {/* 11. Complete Footer */}
      <Footer />
    </main>
  )
}
