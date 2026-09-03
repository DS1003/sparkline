import React from 'react'
import { Metadata } from 'next'
import { Footer } from '@/components/layout/Footer'
import { PageHero } from '@/components/layout/PageHero'
import { SectionCTA } from '@/components/layout/SectionCTA'
import { Services } from '@/features/services/components/Services'

export const metadata: Metadata = {
  title: 'Services | SPARKLINE — Expertises & Solutions Digitales',
  description: 'Découvrez nos 5 pôles d’expertise : Solutions digitales, Design UI/UX, Identité visuelle, Production audiovisuelle et Formations spécialisées.',
}

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-white text-neutral-900">
      {/* 1. Page Hero */}
      <PageHero
        tag="Nos Services"
        title="Un éventail complet"
        pillImage="/images/heroes/services.jpg"
        highlight="d'expertises digitales."
        subtitle="Nous ne nous contentons pas de concevoir des produits : nous architecturons des écosystèmes complets bâtis pour un impact pérenne."
        breadcrumbs={[{ label: 'Services', href: '/services' }]}
        metaItems={[
          { label: 'Disciplines', value: '5 Pôles d’expertise' },
          { label: 'Méthodologie', value: 'Stratégique & Agile' },
        ]}
      />

      {/* 2. Interactive Hardware-Accelerated ScrollStack Services Showcase */}
      <Services isServicesPage={true} hideHeader={true} />

      {/* 3. Closing High-Impact CTA Banner */}
      <SectionCTA
        title="BESOIN D'UNE SOLUTION SUR MESURE ?"
        subtitle="Chaque projet est unique. Discutons de vos défis spécifiques et définissons ensemble votre feuille de route."
        primaryLabel="Démarrer une conversation"
        primaryHref="/contact?inquiry=services"
      />

      {/* 4. Complete Footer */}
      <Footer />
    </main>
  )
}
