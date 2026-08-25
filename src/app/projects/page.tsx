import React from 'react'
import { Metadata } from 'next'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { PageHero } from '@/components/layout/PageHero'
import { SectionCTA } from '@/components/layout/SectionCTA'
import { Container } from '@/components/layout/Container'
import { RevealOnScroll } from '@/components/motion/RevealOnScroll'
import { projectsRepository } from '@/lib/repositories/projects'
import { ProjectCard } from '@/components/ui/ProjectCard'

export const metadata: Metadata = {
  title: 'Projets & Réalisations | SPARKLINE — Études de Cas',
  description: 'Découvrez notre portfolio de produits digitaux d’exception, de systèmes de marque et de plateformes logicielles performantes.',
}

export default async function ProjectsPage() {
  const projects = await projectsRepository.getAll()
  const categories = ['Tous', ...new Set(projects.map((p) => p.category))]

  return (
    <main className="min-h-screen bg-white text-neutral-900">
      <PageHero
        tag="Nos Réalisations"
        title="Des produits digitaux conçus pour"
        highlight="l’impact."
        subtitle="Nous façonnons des expériences numériques stratégiques qui génèrent une croissance concrète. Explorez nos études de cas."
        breadcrumbs={[{ label: 'Projets', href: '/projects' }]}
        metaItems={[
          { label: 'Total Projets', value: `${projects.length}+` },
          { label: 'Secteurs', value: 'Fintech, Santé, E-commerce, SaaS, Culture' },
        ]}
      />

      {/* Category Filter Bar */}
      <section className="py-6 bg-white border-b border-[#e2e2e7] sticky top-0 z-20">
        <Container>
          <div className="flex flex-wrap gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                className="px-4 py-2 rounded-full text-xs font-semibold border border-[#e2e2e7] bg-white text-neutral-800 hover:border-[#EB4604] hover:text-[#EB4604] transition-colors"
              >
                {cat}
              </button>
            ))}
          </div>
        </Container>
      </section>

      {/* Project Grid */}
      <section className="py-16 bg-white">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project, idx) => (
              <RevealOnScroll key={project.slug} delay={idx * 0.08}>
                <ProjectCard project={project} featured={idx === 0} />
              </RevealOnScroll>
            ))}
          </div>
        </Container>
      </section>

      <SectionCTA
        title="VOUS AVEZ UN PROJET EN TÊTE ?"
        subtitle="Transformons votre vision en un produit digital de classe internationale."
      />

      <Footer />
    </main>
  )
}
