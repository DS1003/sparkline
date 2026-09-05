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
import { careersRepository } from '@/lib/repositories/careers'

export const metadata: Metadata = {
  title: 'Carrières | Rejoignez l’équipe SPARKLINE',
  description: 'Découvrez nos opportunités professionnelles et rejoignez une équipe passionnée d’ingénieurs, de designers et de stratèges digitaux à Dakar, Sénégal.',
}

export default async function CareersPage() {
  const positions = await careersRepository.getAll()

  return (
    <main className="min-h-screen bg-white text-neutral-900">
      <PageHero
        tag="Rejoindre SPARKLINE"
        title="Bâtir le futur"
        pillImage="/images/heroes/careers.webp"
        highlight="avec nous."
        subtitle="Nous réunissons des talents ambitieux, créatifs et rigoureux, passionnés par l'excellence logicielle et l'impact digital."
        breadcrumbs={[{ label: 'Carrières', href: '/careers' }]}
      />

      {/* Culture Section */}
      <Section darker>
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: (
                  <svg className="w-6 h-6 text-[#EB4604]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                  </svg>
                ),
                title: 'Autonomie & Responsabilité',
                desc: 'Nous faisons confiance à nos talents pour décider, créer et innover sans micro-management.'
              },
              {
                icon: (
                  <svg className="w-6 h-6 text-[#EB4604]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <circle cx="12" cy="12" r="9" />
                    <circle cx="12" cy="12" r="5" />
                    <circle cx="12" cy="12" r="1.5" />
                  </svg>
                ),
                title: 'Exigence & Rigueur du Détail',
                desc: 'Nous recherchons la perfection au pixel près, des architectures propres et un design réfléchi.'
              },
              {
                icon: (
                  <svg className="w-6 h-6 text-[#EB4604]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-.778.099-1.533.284-2.253" />
                  </svg>
                ),
                title: 'Impact & Mission',
                desc: 'Chaque projet est sélectionné pour apporter une valeur tangible et durable en Afrique et à l’international.'
              },
            ].map((item, idx) => (
              <RevealOnScroll key={idx} delay={idx * 0.1}>
                <div className="p-8 rounded-3xl bg-white border border-[#e2e2e7] shadow-sm h-full space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#EB4604]/10 border border-[#EB4604]/20 flex items-center justify-center">
                    {item.icon}
                  </div>
                  <h3 className="heading-04 text-neutral-900">{item.title}</h3>
                  <p className="text-neutral-600 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </Container>
      </Section>

      {/* Open Positions */}
      <Section>
        <Container>
          <div className="mb-12">
            <span className="text-xs font-mono uppercase tracking-widest text-[#EB4604] font-semibold block mb-2">
              Postes Ouverts
            </span>
            <h2 className="heading-02 text-neutral-900">Opportunités Actuelles</h2>
          </div>

          <div className="space-y-6">
            {positions.map((pos, idx) => (
              <RevealOnScroll key={pos.slug} delay={idx * 0.08}>
                <div className="p-8 rounded-3xl border border-[#e2e2e7] bg-white hover:border-[#EB4604]/50 transition-colors shadow-sm space-y-6">
                  {/* Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h3 className="heading-03 text-neutral-900">{pos.title}</h3>
                      <div className="flex flex-wrap gap-3 mt-2 text-xs font-mono text-neutral-500">
                        <span className="px-2.5 py-0.5 rounded-full bg-[#f4f4f7]">{pos.department}</span>
                        <span className="px-2.5 py-0.5 rounded-full bg-[#f4f4f7]">{pos.type}</span>
                        <span className="px-2.5 py-0.5 rounded-full bg-[#f4f4f7]">{pos.location}</span>
                        <span className="px-2.5 py-0.5 rounded-full bg-[#f4f4f7]">{pos.experience}</span>
                      </div>
                    </div>
                    <Link
                      href={`/contact?inquiry=career&position=${encodeURIComponent(pos.title)}`}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#EB4604] text-white text-xs font-semibold hover:bg-[#D43D00] transition-colors shadow-md shadow-[#EB4604]/25 shrink-0"
                    >
                      Postuler ↗
                    </Link>
                  </div>

                  <p className="text-neutral-600 text-base leading-relaxed">{pos.summary}</p>

                  {/* Responsibilities */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-[#e2e2e7]">
                    <div className="space-y-3">
                      <h4 className="text-xs font-mono uppercase tracking-wider text-neutral-400 font-semibold">Responsabilités</h4>
                      <ul className="space-y-2">
                        {pos.responsibilities.map((r, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-neutral-700">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#EB4604] mt-2 shrink-0" />
                            {r}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="space-y-3">
                      <h4 className="text-xs font-mono uppercase tracking-wider text-neutral-400 font-semibold">Profil Recherché</h4>
                      <ul className="space-y-2">
                        {pos.requirements.map((r, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-neutral-700">
                            <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 mt-2 shrink-0" />
                            {r}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Perks */}
                  <div className="pt-4">
                    <h4 className="text-xs font-mono uppercase tracking-wider text-neutral-400 font-semibold mb-3">Avantages & Environnement</h4>
                    <div className="flex flex-wrap gap-2">
                      {pos.perks.map((perk, i) => (
                        <span key={i} className="px-3 py-1.5 rounded-full bg-[#EB4604]/5 border border-[#EB4604]/20 text-xs text-neutral-800 font-medium">
                          {perk}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </Container>
      </Section>

      <SectionCTA
        tag="Candidature Spontanée"
        title="VOUS NE TROUVEZ PAS VOTRE PROFIL DANS LA LISTE ?"
        subtitle="Envoyez-nous une candidature spontanée — si vous êtes passionné et rigoureux, nous serons ravis d'échanger avec vous."
        primaryLabel="Déposer une candidature"
      />

      <Footer />
    </main>
  )
}
