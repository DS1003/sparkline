import React from 'react'
import Link from 'next/link'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { PageHero } from '@/components/layout/PageHero'
import { SectionCTA } from '@/components/layout/SectionCTA'
import { Container } from '@/components/layout/Container'
import { Section } from '@/components/layout/Section'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { RevealOnScroll } from '@/components/motion/RevealOnScroll'
import { servicesRepository, servicesData } from '@/lib/repositories/services'
import { projectsRepository } from '@/lib/repositories/projects'
import { ProjectCard } from '@/components/ui/ProjectCard'

// Generate all service routes at build time
export async function generateStaticParams() {
  return servicesData.map((s) => ({ slug: s.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const service = await servicesRepository.getBySlug(slug)
  if (!service) return { title: 'Service non trouvé | SPARKLINE' }
  return {
    title: `${service.title} | Services SPARKLINE`,
    description: service.summary,
  }
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const service = await servicesRepository.getBySlug(slug)
  if (!service) notFound()

  const otherServices = await servicesRepository.getOtherServices(slug)
  const allProjects = await projectsRepository.getAll()
  const relatedProjects = allProjects.filter((p) => service.relatedProjects.includes(p.slug))

  return (
    <main className="min-h-screen bg-white text-neutral-900">
      <PageHero
        tag={`Service [${service.number}]`}
        title={service.title}
        subtitle={service.summary}
        breadcrumbs={[
          { label: 'Services', href: '/services' },
          { label: service.title, href: `/services/${service.slug}` },
        ]}
        metaItems={[
          { label: 'Catégorie', value: service.number },
          { label: 'Domaines clés', value: `${service.capabilities.length} compétences` },
        ]}
      />

      {/* What We Do */}
      <Section darker>
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div className="space-y-6">
              <RevealOnScroll>
                <span className="text-xs font-mono uppercase tracking-widest text-[#EB4604] font-semibold">
                  Notre Intervention
                </span>
              </RevealOnScroll>
              <RevealOnScroll delay={0.1}>
                <h2 className="heading-02 text-neutral-900">{service.tagline}</h2>
              </RevealOnScroll>
              <RevealOnScroll delay={0.2}>
                <p className="text-neutral-600 text-base sm:text-lg leading-relaxed">
                  {service.description}
                </p>
              </RevealOnScroll>
            </div>

            <div className="space-y-4">
              <RevealOnScroll delay={0.2}>
                <h3 className="text-xs font-mono uppercase tracking-widest text-neutral-400 font-semibold mb-4">
                  Compétences Clés
                </h3>
              </RevealOnScroll>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {service.capabilities.map((cap, idx) => (
                  <RevealOnScroll key={idx} delay={0.1 + idx * 0.05}>
                    <div className="flex items-center gap-3 p-4 rounded-2xl bg-white border border-[#e2e2e7] shadow-sm text-sm font-medium text-neutral-800">
                      <span className="w-2 h-2 rounded-full bg-[#EB4604] shrink-0" />
                      {cap}
                    </div>
                  </RevealOnScroll>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Process Methodology */}
      <Section>
        <Container>
          <SectionHeader
            tag="Notre Méthode"
            title={`Comment nous déployons ${service.title.toLowerCase()}.`}
            subtitle="Une démarche structurée et transparente, de l’analyse initiale à la mise en production."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {service.process.map((step, idx) => (
              <RevealOnScroll key={idx} delay={idx * 0.1}>
                <div className="p-6 rounded-2xl bg-[#f4f4f7] border border-[#e2e2e7] shadow-sm h-full flex flex-col justify-between space-y-4">
                  <div>
                    <span className="text-[#EB4604] font-mono text-2xl font-bold block mb-3">
                      {step.step}
                    </span>
                    <h3 className="heading-04 text-neutral-900 mb-2">{step.title}</h3>
                    <p className="text-neutral-600 text-sm leading-relaxed">{step.description}</p>
                  </div>
                  <div className="w-full h-1 bg-neutral-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#FFB901] to-[#EB4604]"
                      style={{ width: `${((idx + 1) / service.process.length) * 100}%` }}
                    />
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </Container>
      </Section>

      {/* Technologies & Deliverables */}
      <Section darker>
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <RevealOnScroll>
              <div className="space-y-6">
                <h3 className="text-xs font-mono uppercase tracking-widest text-[#EB4604] font-semibold">
                  Technologies & Outils
                </h3>
                <div className="flex flex-wrap gap-3">
                  {service.technologies.map((tech, idx) => (
                    <span key={idx} className="px-4 py-2 rounded-full bg-white border border-[#e2e2e7] text-sm font-medium text-neutral-800">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </RevealOnScroll>

            <RevealOnScroll delay={0.1}>
              <div className="space-y-6">
                <h3 className="text-xs font-mono uppercase tracking-widest text-[#EB4604] font-semibold">
                  Ce Que Vous Obtenez
                </h3>
                <ul className="space-y-3">
                  {service.deliverables.map((d, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-neutral-800 font-medium">
                      <span className="w-5 h-5 rounded-full bg-[#EB4604]/10 text-[#EB4604] flex items-center justify-center text-xs font-bold shrink-0">
                        ✓
                      </span>
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            </RevealOnScroll>
          </div>
        </Container>
      </Section>

      {/* Related Projects */}
      {relatedProjects.length > 0 && (
        <Section>
          <Container>
            <SectionHeader
              tag="Projets Associés"
              title={`Découvrez ${service.title} en action.`}
              linkText="Voir tous les projets"
              linkHref="/projects"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {relatedProjects.map((project) => (
                <ProjectCard key={project.slug} project={project} />
              ))}
            </div>
          </Container>
        </Section>
      )}

      {/* Explore Other Services */}
      <Section darker>
        <Container>
          <h3 className="text-xs font-mono uppercase tracking-widest text-[#EB4604] font-semibold mb-8">
            Explorer nos autres services
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {otherServices.map((s) => (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                className="p-6 rounded-2xl bg-white border border-[#e2e2e7] shadow-sm hover:border-[#EB4604]/50 transition-colors group"
              >
                <span className="text-[#EB4604] font-mono text-lg font-bold block mb-2">{s.number}</span>
                <h4 className="heading-04 text-neutral-900 group-hover:text-[#EB4604] transition-colors">{s.title}</h4>
              </Link>
            ))}
          </div>
        </Container>
      </Section>

      <SectionCTA
        title={`PRÊT À INVESTIR DANS : ${service.title.toUpperCase()} ?`}
        subtitle="Discutons de vos besoins spécifiques et bâtissons une feuille de route sur mesure."
      />

      <Footer />
    </main>
  )
}
