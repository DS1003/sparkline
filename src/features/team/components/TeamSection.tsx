'use client'

import React from 'react'
import Image from 'next/image'
import { teamMembers } from '@/config/content/team'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { Container } from '@/components/layout/Container'
import { Section } from '@/components/layout/Section'
import { RevealOnScroll } from '@/components/motion/RevealOnScroll'

// Mapping official member badges if available
const memberImages: Record<string, string> = {
  seydina: '/images/brand/Seydina.png',
  fanta: '/images/brand/Fanta.png',
  ndiaga: '/images/brand/Ndiaga.png',
  fallou: '/images/brand/Serigne fallou.png',
}

export function TeamSection() {
  return (
    <Section id="team">
      <Container>
        <SectionHeader
          tag="Notre Équipe"
          title="Des talents multidisciplinaires unis par la passion de l’excellence."
          subtitle="Ingénieurs, designers, architectes et stratèges dédiés à la création de solutions numériques d’exception."
          linkText="Rencontrer toute l'équipe"
          linkHref="/team"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, idx) => {
            const avatarSrc = memberImages[member.id]

            return (
              <RevealOnScroll key={member.id} delay={idx * 0.1}>
                <div className="group rounded-3xl bg-[#f4f4f7] border border-[#e2e2e7] shadow-sm overflow-hidden hover:border-[#EB4604]/50 transition-all duration-300 p-8 flex flex-col justify-between h-full space-y-6">
                  <div>
                    {/* Official badge / avatar */}
                    <div className="w-16 h-16 rounded-2xl bg-white border border-[#e2e2e7] shadow-sm overflow-hidden flex items-center justify-center font-mono font-bold text-xl text-[#EB4604] mb-6 group-hover:scale-105 transition-transform relative">
                      {avatarSrc ? (
                        <Image
                          src={avatarSrc}
                          alt={member.name}
                          width={64}
                          height={64}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span>{member.name.split(' ').map((n) => n[0]).join('')}</span>
                      )}
                    </div>

                    <h3 className="heading-03 text-neutral-900 mb-1 group-hover:text-[#EB4604] transition-colors">
                      {member.name}
                    </h3>
                    <p className="text-xs font-mono uppercase tracking-wider text-[#EB4604] mb-4 font-semibold">
                      {member.title}
                    </p>
                    <p className="text-neutral-600 text-sm leading-relaxed">
                      {member.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#e2e2e7] flex items-center justify-between text-xs font-mono text-neutral-400">
                    <span>SPARKLINE CORE</span>
                    <span className="text-[#EB4604] font-semibold">[0{idx + 1}]</span>
                  </div>
                </div>
              </RevealOnScroll>
            )
          })}
        </div>
      </Container>
    </Section>
  )
}
