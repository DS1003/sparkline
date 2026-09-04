import React from 'react'
import Link from 'next/link'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { SectionCTA } from '@/components/layout/SectionCTA'
import { Container } from '@/components/layout/Container'
import { Section } from '@/components/layout/Section'
import { Tag } from '@/components/ui/Tag'
import { RevealOnScroll } from '@/components/motion/RevealOnScroll'
import { projectsRepository, projectsData } from '@/lib/repositories/projects'

export async function generateStaticParams() {
  return projectsData.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const project = await projectsRepository.getBySlug(slug)
  if (!project) return { title: 'Projet non trouvé | SPARKLINE' }
  return {
    title: `${project.title} — Étude de cas | SPARKLINE`,
    description: project.summary,
  }
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = await projectsRepository.getBySlug(slug)
  if (!project) notFound()

  const allProjects = await projectsRepository.getAll()
  const currentIdx = allProjects.findIndex((p) => p.slug === slug)
  const nextProject = allProjects[(currentIdx + 1) % allProjects.length]

  return (
    <main className="min-h-screen bg-white text-neutral-900">
      {/* Case Study Hero */}
      <section className="w-full bg-white p-2.5 sm:p-4 lg:p-5">
        <div className="relative rounded-2xl md:rounded-[20px] bg-[#070709] text-white overflow-hidden p-6 sm:p-8 lg:p-12 min-h-[520px] flex flex-col justify-between shadow-2xl">
          <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-gradient-to-tr from-[#EB4604]/20 via-[#FFB901]/10 to-transparent rounded-full blur-[140px] pointer-events-none" />

          {/* Integrated Navbar Inside Hero Card */}
          <Navbar />

          {/* Top: Breadcrumbs + Meta */}
          <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 pt-6">
            <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
              <Link href="/" className="hover:text-white transition-colors">Accueil</Link>
              <span className="text-neutral-600">/</span>
              <Link href="/projects" className="hover:text-[#EB4604] transition-colors">Projets</Link>
              <span className="text-neutral-600">/</span>
              <span className="text-white">{project.title}</span>
            </div>
            <span className="text-xs font-mono text-neutral-500">{project.year}</span>
          </div>

          {/* Title + Category */}
          <div className="relative z-10 my-auto max-w-4xl py-8 space-y-5">
            <RevealOnScroll>
              <Tag variant="base">{project.category}</Tag>
            </RevealOnScroll>
            <RevealOnScroll delay={0.1}>
              <h1 className="heading-display text-white font-bold">{project.title}</h1>
            </RevealOnScroll>
            <RevealOnScroll delay={0.2}>
              <p className="text-lg sm:text-xl text-neutral-300 max-w-2xl font-light leading-relaxed">
                {project.summary}
              </p>
            </RevealOnScroll>
          </div>

          {/* Bottom Meta: Client + Technologies + Live Link */}
          <div className="relative z-10 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-neutral-400 uppercase tracking-widest">
            <div className="flex flex-wrap gap-8">
              <div><span className="text-[#EB4604] font-bold">+</span> Client : <span className="text-white">{project.client}</span></div>
              <div><span className="text-[#EB4604] font-bold">+</span> Année : <span className="text-white">{project.year}</span></div>
              <div><span className="text-[#EB4604] font-bold">+</span> Type : <span className="text-white">{project.type || project.category}</span></div>
            </div>
            {project.url && (
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#EB4604] hover:bg-[#D43D00] text-white font-semibold lowercase tracking-normal text-xs transition-all shadow-md shadow-[#EB4604]/20"
              >
                <span>Visiter le site</span>
                <span className="text-sm">↗</span>
              </a>
            )}
          </div>
        </div>
      </section>

      {/* Challenge & Solution */}
      <Section darker>
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <RevealOnScroll>
              <div className="space-y-4">
                <span className="text-xs font-mono uppercase tracking-widest text-[#EB4604] font-semibold">Le Défi</span>
                <p className="text-neutral-700 text-base sm:text-lg leading-relaxed">{project.challenge}</p>
              </div>
            </RevealOnScroll>
            <RevealOnScroll delay={0.1}>
              <div className="space-y-4">
                <span className="text-xs font-mono uppercase tracking-widest text-[#EB4604] font-semibold">Notre Solution</span>
                <p className="text-neutral-700 text-base sm:text-lg leading-relaxed">{project.solution}</p>
              </div>
            </RevealOnScroll>
          </div>
        </Container>
      </Section>

      {/* Deliverables & Technologies */}
      <Section>
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <RevealOnScroll>
              <div className="space-y-6">
                <h3 className="text-xs font-mono uppercase tracking-widest text-[#EB4604] font-semibold">Livrables Clés</h3>
                <ul className="space-y-3">
                  {project.deliverables.map((d, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-neutral-800 font-medium text-base">
                      <span className="w-6 h-6 rounded-full bg-[#EB4604]/10 text-[#EB4604] flex items-center justify-center text-xs font-bold shrink-0">
                        {String(idx + 1).padStart(2, '0')}
                      </span>
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            </RevealOnScroll>

            <RevealOnScroll delay={0.1}>
              <div className="space-y-6">
                <h3 className="text-xs font-mono uppercase tracking-widest text-[#EB4604] font-semibold">Technologies Déployées</h3>
                <div className="flex flex-wrap gap-3">
                  {project.technologies.map((tech, idx) => (
                    <span key={idx} className="px-4 py-2 rounded-full bg-[#f4f4f7] border border-[#e2e2e7] text-sm font-medium text-neutral-800">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </RevealOnScroll>
          </div>
        </Container>
      </Section>

      {/* Impact & Results */}
      <Section darker>
        <Container>
          <RevealOnScroll>
            <div className="p-8 sm:p-12 rounded-3xl bg-white border border-[#e2e2e7] shadow-sm space-y-6">
              <span className="text-xs font-mono uppercase tracking-widest text-[#EB4604] font-semibold">Impact & Résultats</span>
              <p className="heading-03 text-neutral-900 leading-snug">{project.impact}</p>

              {project.testimonial && (
                <div className="pt-8 border-t border-[#e2e2e7] space-y-3">
                  <blockquote className="text-lg text-neutral-700 italic leading-relaxed">
                    &ldquo;{project.testimonial.quote}&rdquo;
                  </blockquote>
                  <div className="text-sm font-semibold text-neutral-900">
                    {project.testimonial.author}
                    <span className="text-neutral-500 font-normal"> — {project.testimonial.role}</span>
                  </div>
                </div>
              )}
            </div>
          </RevealOnScroll>
        </Container>
      </Section>

      {/* Next Project Navigator */}
      <section className="py-16 bg-white border-t border-[#e2e2e7]">
        <Container>
          <Link
            href={`/projects/${nextProject.slug}`}
            className="group flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 p-8 rounded-3xl border border-[#e2e2e7] hover:border-[#EB4604]/50 transition-all"
          >
            <div>
              <span className="text-xs font-mono text-neutral-400 uppercase tracking-widest block mb-2">Projet Suivant</span>
              <h3 className="heading-02 text-neutral-900 group-hover:text-[#EB4604] transition-colors">{nextProject.title}</h3>
              <p className="text-sm text-neutral-600">{nextProject.category} — {nextProject.year}</p>
            </div>
            <span className="w-14 h-14 rounded-full border border-neutral-300 flex items-center justify-center text-xl text-neutral-800 group-hover:border-[#EB4604] group-hover:bg-[#EB4604] group-hover:text-white transition-all shrink-0">
              →
            </span>
          </Link>
        </Container>
      </section>

      <SectionCTA />
      <Footer />
    </main>
  )
}
