import React from 'react'
import { Metadata } from 'next'
import { Footer } from '@/components/layout/Footer'
import { PageHero } from '@/components/layout/PageHero'
import { SectionCTA } from '@/components/layout/SectionCTA'
import { SelectedWork } from '@/features/projects/components/SelectedWork'
import { projectsRepository } from '@/lib/repositories/projects'

export const metadata: Metadata = {
  title: 'Projets & Réalisations | SPARKLINE — Études de Cas',
  description: 'Découvrez notre portfolio de produits digitaux d’exception, de systèmes de marque et de plateformes logicielles performantes.',
}

export default async function ProjectsPage() {
  const projects = await projectsRepository.getAll()

  return (
    <main className="min-h-screen bg-white text-neutral-900">
      {/* 1. Page Hero */}
      <PageHero
        tag="Nos Réalisations"
        title="Des produits digitaux conçus pour"
        pillImage="/images/heroes/projects.webp"
        highlight="l’impact."
        subtitle="Nous façonnons des expériences numériques stratégiques qui génèrent une croissance concrète. Explorez nos études de cas."
        breadcrumbs={[{ label: 'Projets', href: '/projects' }]}
        metaItems={[
          { label: 'Total Projets', value: `${projects.length}+` },
          { label: 'Secteurs', value: 'Fintech, Santé, E-commerce, SaaS, Culture' },
        ]}
      />

      {/* 2. 3D Panoramic Curved Projects Showcase (Light Mode on /projects) */}
      <SelectedWork isProjectsPage={true} theme="light" />

      {/* 3. High-Impact Closing CTA Banner */}
      <SectionCTA
        title="VOUS AVEZ UN PROJET EN TÊTE ?"
        subtitle="Transformons votre vision en un produit digital de classe internationale."
        primaryLabel="Démarrer un projet"
        primaryHref="/contact?inquiry=project"
      />

      {/* 4. Complete Footer */}
      <Footer />
    </main>
  )
}
