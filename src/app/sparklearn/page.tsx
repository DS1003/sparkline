import React from 'react'
import Link from 'next/link'
import { Metadata } from 'next'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { PageHero } from '@/components/layout/PageHero'
import { SectionCTA } from '@/components/layout/SectionCTA'
import { Container } from '@/components/layout/Container'
import { Section } from '@/components/layout/Section'
import { RevealOnScroll } from '@/components/motion/RevealOnScroll'
import { Counter } from '@/components/ui/Counter'
import { sparklearnRepository } from '@/lib/repositories/sparklearn'

export const metadata: Metadata = {
  title: 'SPARKlearn | Initiatives Éducatives & Formations — SPARKLINE',
  description: 'Masterclasses gratuites, bootcamps immersifs et programmes de formation sur mesure pour faire émerger la prochaine génération de créateurs du numérique.',
}

export default async function SparklearnPage() {
  const overview = await sparklearnRepository.getOverview()

  return (
    <main className="min-h-screen bg-white text-neutral-900">
      <PageHero
        tag="Mission Éducative"
        title="La connaissance est aussi"
        highlight="une étincelle."
        subtitle="SPARKlearn est l'engagement citoyen et éducatif de SPARKLINE pour le mentorat, le partage et l'émancipation des talents numériques en Afrique."
        breadcrumbs={[{ label: 'SPARKlearn', href: '/sparklearn' }]}
      />

      {/* Impact Counters */}
      <Section darker>
        <Container>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <Counter value={overview.masterclassesCount} suffix="+" label="Masterclasses gratuites" description="Organisées dans les universités et communautés" />
            <Counter value={overview.studentsTrained} suffix="+" label="Apprenants formés" description="Futurs ingénieurs, designers et bâtisseurs" />
            <Counter value={overview.activeBootcamps} suffix="" label="Bootcamps actifs" description="Programmes immersifs et ateliers pratiques" />
            <Counter value={overview.partnerInstitutions} suffix="+" label="Institutions partenaires" description="Universités, écoles et incubateurs" />
          </div>
        </Container>
      </Section>

      {/* Two Pillars */}
      <Section>
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <RevealOnScroll>
              <Link href="/sparklearn/masterclasses" className="group p-8 sm:p-12 rounded-3xl bg-[#f4f4f7] border border-[#e2e2e7] shadow-sm hover:border-[#EB4604]/50 transition-all h-full flex flex-col justify-between space-y-8">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-[#EB4604]/10 text-[#EB4604] flex items-center justify-center font-mono font-bold text-lg mb-6">01</div>
                  <h3 className="heading-02 text-neutral-900 group-hover:text-[#EB4604] transition-colors mb-4">Masterclasses gratuites</h3>
                  <p className="text-neutral-600 text-base leading-relaxed">
                    Nous animons des sessions gratuites et interactives de design et d'ingénierie dans les universités, hubs technologiques et espaces communautaires — parce que le savoir ne doit pas avoir de barrière.
                  </p>
                </div>
                <div className="flex items-center gap-2 text-sm font-semibold text-[#EB4604]">
                  <span>Découvrir les Masterclasses</span><span>→</span>
                </div>
              </Link>
            </RevealOnScroll>

            <RevealOnScroll delay={0.1}>
              <Link href="/sparklearn/formations" className="group p-8 sm:p-12 rounded-3xl bg-[#f4f4f7] border border-[#e2e2e7] shadow-sm hover:border-[#EB4604]/50 transition-all h-full flex flex-col justify-between space-y-8">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-[#EB4604]/10 text-[#EB4604] flex items-center justify-center font-mono font-bold text-lg mb-6">02</div>
                  <h3 className="heading-02 text-neutral-900 group-hover:text-[#EB4604] transition-colors mb-4">Formations personnalisées</h3>
                  <p className="text-neutral-600 text-base leading-relaxed">
                    Des bootcamps intensifs, des ateliers pour entreprises et des cursus tutorés conçus pour inculquer des compétences immédiatement applicables et valorisables sur le marché.
                  </p>
                </div>
                <div className="flex items-center gap-2 text-sm font-semibold text-[#EB4604]">
                  <span>Consulter le catalogue</span><span>→</span>
                </div>
              </Link>
            </RevealOnScroll>
          </div>
        </Container>
      </Section>

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
