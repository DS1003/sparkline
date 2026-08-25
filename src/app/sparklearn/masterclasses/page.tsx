import React from 'react'
import { Metadata } from 'next'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { PageHero } from '@/components/layout/PageHero'
import { SectionCTA } from '@/components/layout/SectionCTA'
import { Container } from '@/components/layout/Container'
import { RevealOnScroll } from '@/components/motion/RevealOnScroll'
import { sparklearnRepository } from '@/lib/repositories/sparklearn'

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

      {/* Upcoming Events */}
      {upcoming.length > 0 && (
        <section className="py-20 bg-[#f7f7f9] border-t border-[#e2e2e7]">
          <Container>
            <span className="text-xs font-mono uppercase tracking-widest text-[#EB4604] font-semibold block mb-8">
              Événements à venir
            </span>
            <div className="space-y-6">
              {upcoming.map((mc, idx) => (
                <RevealOnScroll key={mc.slug} delay={idx * 0.1}>
                  <div className="p-8 rounded-3xl bg-white border border-[#EB4604]/30 shadow-sm space-y-4">
                    <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-neutral-500">
                      <span className="px-3 py-1 rounded-full bg-[#EB4604] text-white font-semibold uppercase">À venir</span>
                      <span>{mc.date}</span>
                      <span>•</span>
                      <span>{mc.location}</span>
                      <span>•</span>
                      <span>{mc.attendeesCount} participants attendus</span>
                    </div>
                    <h3 className="heading-03 text-neutral-900">{mc.title}</h3>
                    <p className="text-neutral-600 text-base leading-relaxed">{mc.description}</p>
                    <div className="flex flex-wrap gap-2 pt-2">
                      {mc.topics.map((t, i) => (
                        <span key={i} className="text-[11px] font-mono text-neutral-500 bg-[#f4f4f7] px-2.5 py-1 rounded-full">{t}</span>
                      ))}
                    </div>
                  </div>
                </RevealOnScroll>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* Past Events */}
      <section className="py-20 bg-white">
        <Container>
          <span className="text-xs font-mono uppercase tracking-widest text-neutral-400 font-semibold block mb-8">
            Masterclasses Récentes
          </span>
          <div className="space-y-6">
            {completed.map((mc, idx) => (
              <RevealOnScroll key={mc.slug} delay={idx * 0.1}>
                <div className="p-8 rounded-3xl bg-[#f4f4f7] border border-[#e2e2e7] shadow-sm space-y-4">
                  <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-neutral-500">
                    <span className="px-3 py-1 rounded-full bg-neutral-200 text-neutral-700 font-semibold uppercase">Terminée</span>
                    <span>{mc.date}</span>
                    <span>•</span>
                    <span>{mc.institution}</span>
                    <span>•</span>
                    <span>{mc.attendeesCount} participants</span>
                  </div>
                  <h3 className="heading-03 text-neutral-900">{mc.title}</h3>
                  <p className="text-neutral-600 text-base leading-relaxed">{mc.description}</p>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {mc.topics.map((t, i) => (
                      <span key={i} className="text-[11px] font-mono text-neutral-500 bg-white px-2.5 py-1 rounded-full border border-[#e2e2e7]">{t}</span>
                    ))}
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </Container>
      </section>

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
