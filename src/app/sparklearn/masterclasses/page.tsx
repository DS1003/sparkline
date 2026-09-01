import React from 'react'
import { Metadata } from 'next'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { PageHero } from '@/components/layout/PageHero'
import { SectionCTA } from '@/components/layout/SectionCTA'
import { Container } from '@/components/layout/Container'
import { sparklearnRepository } from '@/lib/repositories/sparklearn'
import { MasterclassesShowcase } from '@/features/sparklearn/components/MasterclassesShowcase'

export const metadata: Metadata = {
  title: 'Masterclasses Gratuites — Universités & Communautés | SPARKlearn',
  description: 'Découvrez nos masterclasses techniques et design offertes aux universités, grandes écoles et communautés tech à travers le Sénégal.',
}

export default async function MasterclassesPage() {
  const masterclasses = await sparklearnRepository.getMasterclasses()
  const upcoming = masterclasses.filter((m) => m.status === 'upcoming')
  const completed = masterclasses.filter((m) => m.status === 'completed')

  return (
    <main className="min-h-screen bg-white text-neutral-900">
      <PageHero
        tag="Masterclasses Gratuites"
        title="Partager le savoir,"
        highlight="bâtir l’avenir."
        subtitle="Nous animons des masterclasses de haut niveau dans les universités, hubs technologiques et centres communautaires — 100% gratuitement."
        breadcrumbs={[
          { label: 'SPARKlearn', href: '/sparklearn' },
          { label: 'Masterclasses', href: '/sparklearn/masterclasses' },
        ]}
      />

      {/* ── Visual Bento & Masterclasses Cards Showcase (Inspired by Reference Design) ── */}
      <MasterclassesShowcase masterclasses={masterclasses} />

      <SectionCTA
        tag="Accueillir une Masterclass"
        title="VOUS SOUHAITEZ QUE SPARKLINE INTERVIENNE DANS VOTRE ÉTABLISSEMENT ?"
        subtitle="Nous animons des sessions passionnantes sur le développement web moderne, l'UI/UX design, l'intelligence artificielle et l'entrepreneuriat digital."
        primaryLabel="Demander une masterclass"
      />

      <Footer />
    </main>
  )
}
