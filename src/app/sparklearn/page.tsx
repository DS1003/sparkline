import React from 'react'
import { Metadata } from 'next'
import { Footer } from '@/components/layout/Footer'
import { PageHero } from '@/components/layout/PageHero'
import { SectionCTA } from '@/components/layout/SectionCTA'
import { sparklearnRepository } from '@/lib/repositories/sparklearn'
import { SparkLearnShowcase } from '@/features/sparklearn/components/SparkLearnShowcase'

export const metadata: Metadata = {
  title: 'Sparklearn | Initiatives Éducatives & Formations — SPARKLINE',
  description: 'Masterclasses gratuites, bootcamps immersifs et programmes de formation sur mesure pour faire émerger la prochaine génération de créateurs du numérique.',
}

export default async function SparklearnPage() {
  const overview = await sparklearnRepository.getOverview()
  const masterclasses = await sparklearnRepository.getMasterclasses()
  const formations = await sparklearnRepository.getFormations()

  return (
    <main className="min-h-screen bg-white text-neutral-900">
      <PageHero
        tag="Mission Éducative"
        title="La connaissance est aussi"
        highlight="une étincelle."
        subtitle="Sparklearn est l'engagement citoyen et éducatif de SPARKLINE pour le mentorat, le partage et l'émancipation des talents numériques en Afrique."
        breadcrumbs={[{ label: 'Sparklearn', href: '/sparklearn' }]}
      />

      {/* ── Modern Bento & Formations Showcase (Inspired by Reference Design) ── */}
      <SparkLearnShowcase
        overview={overview}
        masterclasses={masterclasses}
        formations={formations}
      />

      <SectionCTA
        tag="Collaborer avec SPARKlearn"
        title="VOUS SOUHAITEZ ACCUEILLIR UNE MASTERCLASS OU FORMER VOS ÉQUIPES ?"
        subtitle="Nous concevons des programmes pédagogiques sur mesure pour universités, entreprises et communautés technologiques."
        primaryLabel="Nous contacter"
      />

      <Footer />
    </main>
  )
}
