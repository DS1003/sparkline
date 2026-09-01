import React from 'react'
import { Metadata } from 'next'
import { Footer } from '@/components/layout/Footer'
import { PageHero } from '@/components/layout/PageHero'
import { SectionCTA } from '@/components/layout/SectionCTA'
import { TeamShowcase } from '@/features/team/components/TeamShowcase'
import { teamRepository } from '@/lib/repositories/team'

export const metadata: Metadata = {
  title: 'Notre Équipe | SPARKLINE — Talents Multidisciplinaires',
  description: 'Faites connaissance avec les ingénieurs, designers et stratèges de SPARKLINE — animés par la passion de concevoir des expériences digitales mémorables.',
}

export default async function TeamPage() {
  const members = await teamRepository.getAll()

  return (
    <main className="min-h-screen bg-white text-neutral-900">
      {/* 1. Page Hero (Untouched) */}
      <PageHero
        tag="Notre Équipe"
        title="Des talents multidisciplinaires"
        highlight="unis par l’exigence."
        subtitle="Un collectif soudé d'ingénieurs, designers, architectes et stratèges bâtissant des solutions digitales impactantes."
        breadcrumbs={[{ label: 'Équipe', href: '/team' }]}
        metaItems={[
          { label: 'Pôles d’expertise', value: 'Tech, UX/UI, DevOps, Produit' },
          { label: 'Culture Studio', value: 'Excellence & Impact' },
        ]}
      />

      {/* 2. Enhanced Team Badge Showcase (Exact Screenshot Card Design) */}
      <TeamShowcase members={members} />

      {/* 3. Closing High-Impact CTA Banner */}
      <SectionCTA
        tag="Rejoindre SPARKLINE"
        title="ENVIE DE REJOINDRE NOTRE COLLECTIF ?"
        subtitle="Nous sommes constamment à la recherche d'ingénieurs passionnés, de designers créatifs et d'esprits innovants."
        primaryLabel="Consulter nos offres d’emploi"
        primaryHref="/careers"
      />

      {/* 4. Complete Footer */}
      <Footer />
    </main>
  )
}
