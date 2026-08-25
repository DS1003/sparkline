import React from 'react'
import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { SectionCTA } from '@/components/layout/SectionCTA'
import { Container } from '@/components/layout/Container'
import { Section } from '@/components/layout/Section'
import { RevealOnScroll } from '@/components/motion/RevealOnScroll'
import { Counter } from '@/components/ui/Counter'
import { stats } from '@/config/content/sparklearn'
import { teamRepository } from '@/lib/repositories/team'

export const metadata: Metadata = {
  title: 'À propos | SPARKLINE — Manifeste, Vision & Ingénierie Digitale',
  description:
    'SPARKLINE crée une ligne directe entre les idées, la stratégie et la technologie pour métamorphoser les ambitions en solutions concrètes et durables.',
}

export default async function AboutPage() {
  const teamMembers = await teamRepository.getAll()

  return (
    <main className="min-h-screen bg-white text-neutral-900">
      {/* 1. Stodio-Inspired About Hero Section */}
      <section className="w-full bg-white p-2.5 sm:p-4 lg:p-5">
        <div className="relative rounded-2xl md:rounded-[20px] bg-[#070709] text-white overflow-hidden p-6 sm:p-8 lg:p-12 min-h-[520px] lg:min-h-[600px] flex flex-col justify-between items-center text-center shadow-2xl">
          {/* Subtle Ambient Studio Background */}
          <div
            className="absolute inset-0 bg-cover bg-center opacity-15 mix-blend-luminosity scale-105 pointer-events-none"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2064&auto=format&fit=crop')`,
            }}
          />

          {/* Central Radial Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-[#EB4604]/20 via-[#FFB901]/10 to-transparent rounded-full blur-[150px] pointer-events-none" />

          {/* Integrated Navbar Inside Hero Card (Matches Homepage) */}
          <Navbar />

          {/* Top: + WHO WE ARE Pill Tag */}
          <div className="relative z-10 pt-4">
            <RevealOnScroll>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white text-[#070709] text-xs font-mono font-bold uppercase tracking-wider shadow-md">
                <span className="w-3.5 h-3.5 rounded-full bg-[#EB4604] text-white flex items-center justify-center text-[10px] font-bold">
                  +
                </span>
                <span>QUI SOMMES-NOUS</span>
              </div>
            </RevealOnScroll>
          </div>

          {/* Center: Hero Headline with Inline Portrait Pill */}
          <div className="relative z-10 my-auto max-w-5xl py-8 space-y-4">
            <RevealOnScroll delay={0.1}>
              <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white leading-[1.08]">
                Bâtir des réussites
                <br className="hidden sm:inline" />
                {' '}digitales{' '}
                <span className="inline-flex items-center align-middle mx-1.5 sm:mx-3 my-1 overflow-hidden rounded-full w-14 h-9 sm:w-20 sm:h-12 md:w-24 md:h-14 border-2 border-white/30 shadow-lg relative shrink-0">
                  <Image
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop"
                    alt="Créateur SPARKLINE"
                    fill
                    className="object-cover"
                    sizes="96px"
                  />
                </span>
                {' '}durables.
              </h1>
            </RevealOnScroll>
          </div>

          {/* Bottom Bar: Agency Category & Year */}
          <div className="relative z-10 w-full pt-6 border-t border-white/10 flex items-center justify-between text-xs font-mono text-neutral-400 uppercase tracking-widest px-2">
            <span>STUDIO DIGITAL & CRÉATIF</span>
            <span>DEPUIS 2024</span>
          </div>
        </div>
      </section>

      {/* 2. OUR STORY Editorial Section */}
      <section className="py-20 lg:py-28 bg-white border-b border-[#e2e2e7]">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left Tag: + NOTRE HISTOIRE */}
            <div className="lg:col-span-3">
              <RevealOnScroll>
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#f4f4f7] border border-[#e2e2e7] text-neutral-900 text-xs font-mono font-bold uppercase tracking-wider">
                  <span className="w-3.5 h-3.5 rounded-full bg-[#EB4604] text-white flex items-center justify-center text-[10px] font-bold">
                    +
                  </span>
                  <span>NOTRE HISTOIRE</span>
                </div>
              </RevealOnScroll>
            </div>

            {/* Right: Narrative Story Content */}
            <div className="lg:col-span-9 space-y-8">
              <RevealOnScroll delay={0.1}>
                <p className="text-2xl sm:text-3xl md:text-4xl text-neutral-900 font-normal leading-snug tracking-tight">
                  Depuis 2024, SPARKLINE est un collectif digital multidisciplinaire dédié à une mission fondamentale : transformer des idées audacieuses en marques et produits numériques leaders grâce à l’alliance parfaite de la stratégie technique et du design centré sur l’humain.
                </p>
              </RevealOnScroll>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-[#e2e2e7]">
                <RevealOnScroll delay={0.2}>
                  <p className="text-neutral-600 text-base sm:text-lg leading-relaxed font-light">
                    Fondée à Dakar avec une vision internationale, SPARKLINE comble le fossé entre la vision créative et l’exécution technique. Nous ne créons pas de simples sites web ; nous bâtissons des moteurs numériques évolutifs permettant aux entreprises africaines et globales de dominer leurs secteurs.
                  </p>
                </RevealOnScroll>

                <RevealOnScroll delay={0.3}>
                  <p className="text-neutral-600 text-base sm:text-lg leading-relaxed font-light">
                    Des applications web d’entreprise aux architectures d’expérience utilisateur intuitives, en passant par des identités visuelles mémorables et la transmission de savoirs via SPARKlearn, nos réalisations se caractérisent par la précision, la rapidité et une exigence esthétique absolue.
                  </p>
                </RevealOnScroll>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 3. The Core Concept: Spark & Line */}
      <Section darker id="concept">
        <Container>
          <div className="mb-14 space-y-3">
            <span className="text-xs font-mono uppercase tracking-widest text-[#EB4604] font-semibold block">
              La Dualité Fondatrice
            </span>
            <h2 className="heading-01 text-neutral-900">L'Anatomie de SPARKLINE : Quand l'Énergie rencontre la Direction.</h2>
            <p className="text-neutral-600 text-lg max-w-2xl font-light">
              Notre identité s'articule autour de deux principes complémentaires qui guident chaque produit que nous concevons.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
            <RevealOnScroll delay={0.1}>
              <div className="p-8 md:p-12 rounded-3xl bg-white border border-[#e2e2e7] shadow-sm relative overflow-hidden h-full flex flex-col justify-between space-y-8">
                <div className="absolute top-0 right-0 w-44 h-44 bg-gradient-to-br from-[#FFB901]/15 to-[#EB4604]/15 rounded-full blur-3xl pointer-events-none" />
                <div className="space-y-4">
                  <span className="text-4xl font-bold font-mono text-[#EB4604] block">
                    01. SPARK (L'Étincelle)
                  </span>
                  <h3 className="heading-02 text-neutral-900">L'Étincelle de l'Innovation</h3>
                  <p className="text-neutral-600 text-base sm:text-lg leading-relaxed">
                    L'étincelle est le déclencheur. Elle symbolise l’impulsion créative, l’audace, l’énergie initiale et l’ambition qui bousculent le statu quo. Sans étincelle, aucune transformation digitale ne voit le jour.
                  </p>
                </div>
                <div className="pt-6 border-t border-[#e2e2e7] text-xs font-mono text-neutral-400 uppercase tracking-widest">
                  CRÉATIVITÉ • INSPIRATION • ÉNERGIE
                </div>
              </div>
            </RevealOnScroll>

            <RevealOnScroll delay={0.2}>
              <div className="p-8 md:p-12 rounded-3xl bg-white border border-[#e2e2e7] shadow-sm relative overflow-hidden h-full flex flex-col justify-between space-y-8">
                <div className="absolute top-0 right-0 w-44 h-44 bg-gradient-to-br from-[#FFB901]/15 to-[#EB4604]/15 rounded-full blur-3xl pointer-events-none" />
                <div className="space-y-4">
                  <span className="text-4xl font-bold font-mono text-[#EB4604] block">
                    02. LINE (La Ligne)
                  </span>
                  <h3 className="heading-02 text-neutral-900">La Ligne Stratégique</h3>
                  <p className="text-neutral-600 text-base sm:text-lg leading-relaxed">
                    La ligne est la trajectoire. Elle incarne la stratégie, l’ingénierie rigoureuse, la direction claire et la discipline qui relient directement une idée à un impact économique mesurable et durable.
                  </p>
                </div>
                <div className="pt-6 border-t border-[#e2e2e7] text-xs font-mono text-neutral-400 uppercase tracking-widest">
                  STRATÉGIE • STRUCTURE • EXÉCUTION
                </div>
              </div>
            </RevealOnScroll>
          </div>

          {/* Stats By the Numbers */}
          <div className="pt-12 border-t border-[#e2e2e7]">
            <div className="mb-8">
              <span className="text-xs font-mono uppercase tracking-widest text-[#EB4604] font-semibold">
                Notre Bilan en Chiffres
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat) => (
                <Counter
                  key={stat.id}
                  value={stat.value}
                  suffix={stat.suffix}
                  label={stat.label}
                  description={stat.description}
                />
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* 4. Meet The Team Preview */}
      <section className="py-20 lg:py-28 bg-white border-t border-[#e2e2e7]">
        <Container>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#EB4604] font-semibold block mb-2">
                Le Collectif
              </span>
              <h2 className="heading-01 text-neutral-900">Créateurs & Ingénieurs Passionnés</h2>
            </div>
            <Link
              href="/team"
              className="inline-flex items-center gap-2 text-sm font-semibold text-neutral-900 hover:text-[#EB4604] transition-colors"
            >
              <span>Découvrir tous les membres</span>
              <span>→</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.slice(0, 3).map((member, idx) => (
              <RevealOnScroll key={member.slug} delay={idx * 0.1}>
                <Link
                  href={`/team/${member.slug}`}
                  className="group rounded-3xl bg-[#f4f4f7] border border-[#e2e2e7] shadow-sm overflow-hidden hover:border-[#EB4604]/50 transition-all p-8 flex flex-col justify-between h-full space-y-6"
                >
                  <div>
                    <div className="w-16 h-16 rounded-2xl bg-white border border-[#e2e2e7] shadow-sm flex items-center justify-center font-mono font-bold text-xl text-[#EB4604] mb-6 group-hover:scale-105 transition-transform">
                      {member.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                    </div>
                    <h3 className="heading-03 text-neutral-900 mb-1 group-hover:text-[#EB4604] transition-colors">
                      {member.name}
                    </h3>
                    <p className="text-xs font-mono uppercase tracking-wider text-[#EB4604] font-semibold mb-3">
                      {member.role}
                    </p>
                    <p className="text-neutral-600 text-sm leading-relaxed line-clamp-3">
                      {member.bio}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#e2e2e7] flex items-center justify-between text-xs font-mono text-neutral-400">
                    <span>{member.experienceYears}+ ans d’expérience</span>
                    <span className="text-[#EB4604] font-semibold group-hover:translate-x-1 transition-transform">Profil →</span>
                  </div>
                </Link>
              </RevealOnScroll>
            ))}
          </div>
        </Container>
      </section>

      {/* 5. Section CTA */}
      <SectionCTA
        title="BÂTISSONS VOTRE EMPREINTE DIGITALE."
        subtitle="Transformez vos idées en solutions numériques d'exception avec SPARKLINE."
        primaryLabel="Démarrer un projet"
        primaryHref="/contact?inquiry=project"
      />

      <Footer />
    </main>
  )
}
