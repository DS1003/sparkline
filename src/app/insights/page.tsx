import React from 'react'
import { Metadata } from 'next'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { PageHero } from '@/components/layout/PageHero'
import { SectionCTA } from '@/components/layout/SectionCTA'
import { Container } from '@/components/layout/Container'
import { RevealOnScroll } from '@/components/motion/RevealOnScroll'
import { ArticleCard } from '@/components/ui/ArticleCard'
import { insightsRepository } from '@/lib/repositories/insights'

export const metadata: Metadata = {
  title: 'Insights & Journal | SPARKLINE — Pensée & Réflexion Numérique',
  description: 'Consultez nos réflexions sur la transformation digitale, le design UI/UX, l’architecture logicielle et l’écosystème tech en Afrique.',
}

export default async function InsightsPage() {
  const articles = await insightsRepository.getAll()

  return (
    <main className="min-h-screen bg-white text-neutral-900">
      <PageHero
        tag="Connaissances & Insights"
        title="Des idées qui"
        highlight="illuminent le progrès."
        subtitle="Notre journal sur la transformation digitale, les bonnes pratiques d'ingénierie, les design systems et l'innovation technologique en Afrique."
        breadcrumbs={[{ label: 'Insights', href: '/insights' }]}
      />

      <section className="py-20 bg-white">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article, idx) => (
              <RevealOnScroll key={article.slug} delay={idx * 0.08}>
                <ArticleCard article={article} />
              </RevealOnScroll>
            ))}
          </div>
        </Container>
      </section>

      <SectionCTA
        tag="Contribuer"
        title="UN SUJET QUE VOUS SOUHAITERIEZ NOUS VOIR ABORDER ?"
        subtitle="Nous accueillons volontiers les contributions invitées et les propositions de collaboration de la communauté tech."
        primaryLabel="Nous contacter"
      />

      <Footer />
    </main>
  )
}
