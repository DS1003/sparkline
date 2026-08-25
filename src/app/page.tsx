import React from 'react'
import Link from 'next/link'
import { Metadata } from 'next'
import { Footer } from '@/components/layout/Footer'
import { Preloader } from '@/components/layout/Preloader'
import { Hero } from '@/features/hero/components/Hero'
import { MarqueeStrip } from '@/components/motion/MarqueeStrip'
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

      {/* 3. About / Manifesto Section with Link to /about */}
      <About />
      <div className="bg-[#f7f7f9] pb-16 text-center">
        <Container>
          <Link
            href="/about"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-neutral-300 bg-white text-sm font-semibold text-neutral-900 hover:border-[#EB4604] hover:text-[#EB4604] transition-all shadow-sm group"
          >
            <span>Découvrir notre histoire & manifeste</span>
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </Container>
      </div>

      {/* 4. Services Overview Preview */}
      <Services />
      <div className="bg-white pb-16 text-center">
        <Container>
          <Link
            href="/services"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-neutral-300 bg-white text-sm font-semibold text-neutral-900 hover:border-[#EB4604] hover:text-[#EB4604] transition-all shadow-sm group"
          >
            <span>Explorer nos 5 expertises dédiées</span>
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </Container>
      </div>

      {/* 5. Selected Work Showcase */}
      <SelectedWork />

      {/* 6. SPARKlearn Initiative */}
      <SparkLearnSection />
      <div className="bg-[#f0f0f4] pb-16 text-center">
        <Container>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/sparklearn/masterclasses"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-neutral-300 bg-white text-xs font-semibold text-neutral-900 hover:border-[#EB4604] hover:text-[#EB4604] transition-all shadow-sm"
            >
              <span>Découvrir les Masterclasses gratuites →</span>
            </Link>
            <Link
              href="/sparklearn/formations"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-neutral-300 bg-white text-xs font-semibold text-neutral-900 hover:border-[#EB4604] hover:text-[#EB4604] transition-all shadow-sm"
            >
              <span>Consulter le catalogue des formations →</span>
            </Link>
          </div>
        </Container>
      </div>

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
      <div className="bg-white pb-16 text-center">
        <Container>
          <Link
            href="/team"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-neutral-300 bg-white text-sm font-semibold text-neutral-900 hover:border-[#EB4604] hover:text-[#EB4604] transition-all shadow-sm group"
          >
            <span>Découvrir les profils et spécialités de l'équipe</span>
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </Container>
      </div>

      {/* 10. Frequently Asked Questions (FAQ) */}
      <FAQSection />

      {/* 11. High-Impact Closing CTA Banner */}
      <SectionCTA />

      {/* 11. Complete Footer */}
      <Footer />
    </main>
  )
}
