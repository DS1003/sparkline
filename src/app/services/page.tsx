import React from 'react'
import Link from 'next/link'
import { Metadata } from 'next'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { PageHero } from '@/components/layout/PageHero'
import { SectionCTA } from '@/components/layout/SectionCTA'
import { Container } from '@/components/layout/Container'
import { RevealOnScroll } from '@/components/motion/RevealOnScroll'
import { servicesRepository } from '@/lib/repositories/services'

export const metadata: Metadata = {
  title: 'Services | SPARKLINE — Expertises & Solutions Digitales',
  description: 'Découvrez nos 5 pôles d’expertise : Solutions digitales, Design UI/UX, Identité visuelle, Production audiovisuelle et Formations spécialisées.',
}

export default async function ServicesPage() {
  const services = await servicesRepository.getAll()

  return (
    <main className="min-h-screen bg-white text-neutral-900">
      <PageHero
        tag="Nos Services"
        title="Un éventail complet"
        highlight="d'expertises digitales."
        subtitle="Nous ne nous contentons pas de concevoir des produits : nous architecturons des écosystèmes complets bâtis pour un impact pérenne."
        breadcrumbs={[{ label: 'Services', href: '/services' }]}
        metaItems={[
          { label: 'Disciplines', value: '5 Pôles d’expertise' },
          { label: 'Méthodologie', value: 'Stratégique & Agile' },
        ]}
      />

      {/* Interactive Services Catalogue */}
      <section className="py-20 bg-white">
        <Container>
          <div className="space-y-6">
            {services.map((service, idx) => (
              <RevealOnScroll key={service.slug} delay={idx * 0.08}>
                <Link
                  href={`/services/${service.slug}`}
                  className="group flex flex-col lg:flex-row lg:items-center justify-between gap-6 p-8 sm:p-10 rounded-3xl border border-[#e2e2e7] bg-white hover:bg-[#fafafa] hover:border-[#EB4604]/50 transition-all duration-500 shadow-sm"
                >
                  {/* Left: Number + Title */}
                  <div className="flex items-start gap-6 lg:gap-10">
                    <span className="text-[#EB4604] font-mono text-3xl sm:text-4xl font-bold shrink-0 pt-1">
                      {service.number}
                    </span>
                    <div className="space-y-2">
                      <h2 className="heading-01 text-neutral-900 group-hover:text-[#EB4604] transition-colors">
                        {service.title}
                      </h2>
                      <p className="text-neutral-600 text-base sm:text-lg max-w-xl font-light leading-relaxed">
                        {service.tagline}
                      </p>
                    </div>
                  </div>

                  {/* Right: Arrow + Capabilities Preview */}
                  <div className="flex items-center gap-6 shrink-0">
                    <div className="hidden md:flex flex-wrap gap-2 max-w-xs">
                      {service.capabilities.slice(0, 3).map((cap, i) => (
                        <span key={i} className="text-[11px] font-mono text-neutral-500 bg-[#f4f4f7] px-2 py-0.5 rounded-full">
                          {cap}
                        </span>
                      ))}
                    </div>
                    <span className="w-12 h-12 rounded-full border border-neutral-300 flex items-center justify-center text-neutral-800 group-hover:border-[#EB4604] group-hover:bg-[#EB4604] group-hover:text-white transition-all text-lg shrink-0">
                      ↗
                    </span>
                  </div>
                </Link>
              </RevealOnScroll>
            ))}
          </div>
        </Container>
      </section>

      <SectionCTA
        title="BESOIN D'UNE SOLUTION SUR MESURE ?"
        subtitle="Chaque projet est unique. Discutons de vos défis spécifiques et définissons ensemble votre feuille de route."
        primaryLabel="Démarrer une conversation"
      />

      <Footer />
    </main>
  )
}
