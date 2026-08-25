import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { SectionCTA } from '@/components/layout/SectionCTA'
import { Container } from '@/components/layout/Container'
import { Section } from '@/components/layout/Section'
import { RevealOnScroll } from '@/components/motion/RevealOnScroll'
import { teamRepository, teamData } from '@/lib/repositories/team'

export async function generateStaticParams() {
  return teamData.map((m) => ({ slug: m.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const member = await teamRepository.getBySlug(slug)
  if (!member) return { title: 'Membre non trouvé | SPARKLINE' }
  return {
    title: `${member.name} — ${member.role} | Équipe SPARKLINE`,
    description: member.bio,
  }
}

export default async function TeamMemberPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const member = await teamRepository.getBySlug(slug)
  if (!member) notFound()

  return (
    <main className="min-h-screen bg-white text-neutral-900">
      {/* Member Hero */}
      <section className="w-full bg-white p-2.5 sm:p-4 lg:p-5">
        <div className="relative rounded-2xl md:rounded-[20px] bg-[#070709] text-white overflow-hidden p-6 sm:p-8 lg:p-12 min-h-[460px] flex flex-col justify-between shadow-2xl">
          <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-tr from-[#EB4604]/20 via-[#FFB901]/10 to-transparent rounded-full blur-[140px] pointer-events-none" />

          {/* Integrated Navbar Inside Hero Card */}
          <Navbar />

          <div className="relative z-10 flex items-center gap-2 text-xs font-mono text-neutral-400 pt-6">
            <Link href="/" className="hover:text-white transition-colors">Accueil</Link>
            <span className="text-neutral-600">/</span>
            <Link href="/team" className="hover:text-[#EB4604] transition-colors">Équipe</Link>
            <span className="text-neutral-600">/</span>
            <span className="text-white">{member.name}</span>
          </div>

          <div className="relative z-10 my-auto flex flex-col lg:flex-row items-start gap-10 py-8">
            {/* Avatar */}
            <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-3xl bg-[#141418] border border-[#222228] overflow-hidden flex items-center justify-center shrink-0">
              {member.avatar ? (
                <Image src={member.avatar} alt={member.name} width={128} height={128} className="w-full h-full object-cover" />
              ) : (
                <span className="text-4xl font-bold font-mono text-[#EB4604]">{member.name.split(' ').map(n => n[0]).join('').slice(0, 2)}</span>
              )}
            </div>

            <div className="space-y-3">
              <RevealOnScroll>
                <h1 className="heading-display text-white font-bold">{member.name}</h1>
              </RevealOnScroll>
              <RevealOnScroll delay={0.1}>
                <p className="text-lg sm:text-xl text-[#EB4604] font-semibold font-mono">{member.role}</p>
              </RevealOnScroll>
              <RevealOnScroll delay={0.2}>
                <p className="text-base text-neutral-300 max-w-2xl font-light leading-relaxed">{member.bio}</p>
              </RevealOnScroll>
            </div>
          </div>

          <div className="relative z-10 pt-6 border-t border-white/10 flex flex-wrap gap-8 text-xs font-mono text-neutral-400 uppercase tracking-widest">
            <div><span className="text-[#EB4604] font-bold">+</span> Expérience : <span className="text-white">{member.experienceYears}+ Ans</span></div>
            <div><span className="text-[#EB4604] font-bold">+</span> Cœur de métier : <span className="text-white">{member.specialties[0]}</span></div>
          </div>
        </div>
      </section>

      {/* Skills & Specialties */}
      <Section darker>
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <RevealOnScroll>
              <div className="space-y-6">
                <h3 className="text-xs font-mono uppercase tracking-widest text-[#EB4604] font-semibold">Spécialités Clés</h3>
                <ul className="space-y-3">
                  {member.specialties.map((s, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-neutral-800 font-medium text-base">
                      <span className="w-2 h-2 rounded-full bg-[#EB4604] shrink-0" />
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            </RevealOnScroll>

            <RevealOnScroll delay={0.1}>
              <div className="space-y-6">
                <h3 className="text-xs font-mono uppercase tracking-widest text-[#EB4604] font-semibold">Compétences Techniques</h3>
                <div className="flex flex-wrap gap-3">
                  {member.skills.map((skill, idx) => (
                    <span key={idx} className="px-4 py-2 rounded-full bg-white border border-[#e2e2e7] text-sm font-medium text-neutral-800">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </RevealOnScroll>
          </div>

          {/* Social Links */}
          {member.socials && (
            <div className="pt-12 border-t border-[#e2e2e7] mt-12 flex flex-wrap gap-4">
              {member.socials.linkedin && (
                <a href={member.socials.linkedin} target="_blank" rel="noopener noreferrer" className="px-4 py-2 rounded-full border border-[#e2e2e7] text-sm text-neutral-800 hover:border-[#EB4604] hover:text-[#EB4604] transition-colors">
                  LinkedIn ↗
                </a>
              )}
              {member.socials.github && (
                <a href={member.socials.github} target="_blank" rel="noopener noreferrer" className="px-4 py-2 rounded-full border border-[#e2e2e7] text-sm text-neutral-800 hover:border-[#EB4604] hover:text-[#EB4604] transition-colors">
                  GitHub ↗
                </a>
              )}
              {member.socials.twitter && (
                <a href={member.socials.twitter} target="_blank" rel="noopener noreferrer" className="px-4 py-2 rounded-full border border-[#e2e2e7] text-sm text-neutral-800 hover:border-[#EB4604] hover:text-[#EB4604] transition-colors">
                  Twitter ↗
                </a>
              )}
            </div>
          )}
        </Container>
      </Section>

      {/* Back to Team */}
      <section className="py-12 bg-white border-t border-[#e2e2e7]">
        <Container>
          <Link
            href="/team"
            className="inline-flex items-center gap-2 text-sm font-semibold text-neutral-900 hover:text-[#EB4604] transition-colors"
          >
            <span>←</span>
            <span>Retour à toute l’équipe</span>
          </Link>
        </Container>
      </section>

      <SectionCTA />
      <Footer />
    </main>
  )
}
