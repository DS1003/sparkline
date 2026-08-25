import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Metadata } from 'next'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { PageHero } from '@/components/layout/PageHero'
import { SectionCTA } from '@/components/layout/SectionCTA'
import { Container } from '@/components/layout/Container'
import { RevealOnScroll } from '@/components/motion/RevealOnScroll'
import { teamRepository } from '@/lib/repositories/team'

export const metadata: Metadata = {
  title: 'Notre Équipe | SPARKLINE — Talents Multidisciplinaires',
  description: 'Faites connaissance avec les ingénieurs, designers et stratèges de SPARKLINE — animés par la passion de concevoir des expériences digitales mémorables.',
}

export default async function TeamPage() {
  const members = await teamRepository.getAll()

  return (
    <main className="min-h-screen bg-white text-neutral-900">
      <PageHero
        tag="Notre Équipe"
        title="Des talents multidisciplinaires"
        highlight="unis par l’exigence."
        subtitle="Un collectif soudé d'ingénieurs, designers, architectes et stratèges bâtissant des solutions digitales impactantes."
        breadcrumbs={[{ label: 'Équipe', href: '/team' }]}
      />

      <section className="py-20 bg-white">
        <Container>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {members.map((member, idx) => (
              <RevealOnScroll key={member.slug} delay={idx * 0.08}>
                <Link
                  href={`/team/${member.slug}`}
                  className="group rounded-3xl bg-[#f4f4f7] border border-[#e2e2e7] shadow-sm overflow-hidden hover:border-[#EB4604]/50 transition-all duration-300 p-8 flex flex-col justify-between h-full space-y-6"
                >
                  <div>
                    <div className="w-16 h-16 rounded-2xl bg-white border border-[#e2e2e7] shadow-sm overflow-hidden flex items-center justify-center font-mono font-bold text-xl text-[#EB4604] mb-6 group-hover:scale-105 transition-transform relative">
                      {member.avatar ? (
                        <Image src={member.avatar} alt={member.name} width={64} height={64} className="w-full h-full object-cover" />
                      ) : (
                        <span>{member.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}</span>
                      )}
                    </div>

                    <h3 className="heading-03 text-neutral-900 mb-1 group-hover:text-[#EB4604] transition-colors">
                      {member.name}
                    </h3>
                    <p className="text-xs font-mono uppercase tracking-wider text-[#EB4604] mb-4 font-semibold">
                      {member.role}
                    </p>
                    <p className="text-neutral-600 text-sm leading-relaxed line-clamp-3">
                      {member.bio}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#e2e2e7] flex items-center justify-between text-xs font-mono text-neutral-400">
                    <span>{member.experienceYears}+ ans d’expérience</span>
                    <span className="text-[#EB4604] font-semibold group-hover:translate-x-1 transition-transform">Voir le profil →</span>
                  </div>
                </Link>
              </RevealOnScroll>
            ))}
          </div>
        </Container>
      </section>

      <SectionCTA
        tag="Rejoindre SPARKLINE"
        title="ENVIE DE REJOINDRE NOTRE COLLECTIF ?"
        subtitle="Nous sommes constamment à la recherche d'ingénieurs passionnés, de designers créatifs et d'esprits innovants."
        primaryLabel="Consulter nos offres d’emploi"
        primaryHref="/careers"
      />

      <Footer />
    </main>
  )
}
