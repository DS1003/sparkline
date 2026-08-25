import React from 'react'
import { Metadata } from 'next'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { PageHero } from '@/components/layout/PageHero'
import { SectionCTA } from '@/components/layout/SectionCTA'
import { Container } from '@/components/layout/Container'
import { RevealOnScroll } from '@/components/motion/RevealOnScroll'
import { FormationCard } from '@/components/ui/FormationCard'
import { sparklearnRepository } from '@/lib/repositories/sparklearn'

export const metadata: Metadata = {
  title: 'Formations & Bootcamps — SPARKlearn | SPARKLINE',
  description: 'Découvrez nos bootcamps intensifs en développement web full-stack, design d’expérience utilisateur (UI/UX) et montée en compétences d’équipes.',
}

export default async function FormationsPage() {
  const formations = await sparklearnRepository.getFormations()

  return (
    <main className="min-h-screen bg-white text-neutral-900">
      <PageHero
        tag="Catalogue de Formations"
        title="Apprendre. Bâtir."
        highlight="Transformer."
        subtitle="Des programmes pratiques et immersifs conçus pour doter les talents et les entreprises des compétences numériques les plus recherchées."
        breadcrumbs={[
          { label: 'SPARKlearn', href: '/sparklearn' },
          { label: 'Formations', href: '/sparklearn/formations' },
        ]}
      />

      <section className="py-20 bg-white">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {formations.map((f, idx) => (
              <RevealOnScroll key={f.slug} delay={idx * 0.1}>
                <FormationCard formation={f} />
              </RevealOnScroll>
            ))}
          </div>
        </Container>
      </section>

      <SectionCTA
        tag="Formation sur mesure"
        title="BESOIN D'UN PROGRAMME ADAPTÉ À VOTRE ÉQUIPE ?"
        subtitle="Nous élaborons des cursus pédagogiques personnalisés, directement alignés avec vos objectifs techniques et business."
        primaryLabel="Demander une formation sur mesure"
      />

      <Footer />
    </main>
  )
}
