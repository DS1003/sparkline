'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Container } from '@/components/layout/Container'
import { Section } from '@/components/layout/Section'
import { Tag } from '@/components/ui/Tag'
import { RevealOnScroll } from '@/components/motion/RevealOnScroll'
import { TeamMember } from '@/types'
import { TeamCardBadge } from './TeamCardBadge'

interface TeamShowcaseProps {
  members: TeamMember[]
}

const departments = ['Tous les talents', 'Engineering', 'Design & UX', 'Product & Tech', 'DevOps & SRE', 'ServiceNow']

export function TeamShowcase({ members }: TeamShowcaseProps) {
  const [activeDept, setActiveDept] = useState('Tous les talents')

  const filteredMembers = members.filter((member) => {
    if (activeDept === 'Tous les talents') return true
    if (activeDept === 'ServiceNow') {
      return (
        member.slug === 'ndiaga-lo' ||
        member.role.toLowerCase().includes('servicenow') ||
        member.skills.some((s) => s.toLowerCase().includes('servicenow')) ||
        member.specialties.some((s) => s.toLowerCase().includes('servicenow'))
      )
    }
    if (activeDept === 'Engineering') {
      return true
    }
    if (activeDept === 'Design & UX') {
      return member.department === 'Design & Engineering' || member.role.toLowerCase().includes('ui/ux') || member.role.toLowerCase().includes('designer')
    }
    if (activeDept === 'Product & Tech') {
      return member.department === 'Product & Tech' || member.role.toLowerCase().includes('product')
    }
    if (activeDept === 'DevOps & SRE') {
      return member.department === 'DevOps & SRE' || member.role.toLowerCase().includes('devops') || member.role.toLowerCase().includes('sre')
    }
    return true
  })

  return (
    <Section id="team-showcase" className="py-16 sm:py-20 lg:py-28 bg-[#FAFBFD] border-b border-[#E5E7EB]">
      <Container>
        {/* ── 1. Top Section Header ── */}
        <div className="space-y-6 mb-12 sm:mb-16">
          <RevealOnScroll>
            <Tag variant="v2">Le Collectif SPARKLINE</Tag>
          </RevealOnScroll>

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 lg:gap-16">
            <RevealOnScroll delay={0.1}>
              <h2
                className="text-[clamp(2.25rem,4.5vw,56px)] font-normal text-[#0A0A0A] leading-[1.06] tracking-[-0.03em] max-w-2xl"
                style={{ fontFamily: 'var(--font-family--primary-font)' }}
              >
                Nous bâtissons des systèmes digitaux pour propulser les leaders.
              </h2>
            </RevealOnScroll>

            <RevealOnScroll delay={0.15}>
              <div className="space-y-3 max-w-sm">
                <p className="text-sm sm:text-base text-neutral-500 font-normal leading-relaxed">
                  Une équipe soudée d’ingénieurs, de designers et de stratèges d’élite opérant à l’intersection de la technologie et de l’innovation.
                </p>
              </div>
            </RevealOnScroll>
          </div>
        </div>

        {/* ── 2. Filter Pills ── */}
        <div className="mb-8 sm:mb-12">
          <RevealOnScroll delay={0.2}>
            {/* Desktop / Tablet: Unified Capsule */}
            <div className="hidden sm:inline-flex items-center gap-2 p-1.5 rounded-full bg-white border border-[#E5E7EB] shadow-xs">
              {departments.map((dept) => {
                const isSelected = activeDept === dept
                return (
                  <button
                    key={dept}
                    onClick={() => setActiveDept(dept)}
                    className={`px-4 py-2 rounded-full text-xs font-mono transition-all duration-300 cursor-pointer ${
                      isSelected
                        ? 'bg-[#EB4604] text-white font-semibold shadow-md shadow-[#EB4604]/20'
                        : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
                    }`}
                  >
                    {dept}
                  </button>
                )
              })}
            </div>

            {/* Mobile: Centered Flex-Wrap Chips (Zero Horizontal Scroll) */}
            <div className="sm:hidden flex flex-wrap items-center justify-center gap-2 pt-1 mx-auto max-w-sm">
              {departments.map((dept) => {
                const isSelected = activeDept === dept
                return (
                  <button
                    key={dept}
                    onClick={() => setActiveDept(dept)}
                    className={`px-3.5 py-1.5 rounded-full text-[11px] font-mono transition-all duration-200 cursor-pointer touch-manipulation active:scale-95 ${
                      isSelected
                        ? 'bg-[#EB4604] text-white font-semibold shadow-sm shadow-[#EB4604]/20'
                        : 'bg-white text-neutral-600 border border-[#E5E7EB] shadow-2xs active:bg-neutral-100'
                    }`}
                  >
                    {dept}
                  </button>
                )
              })}
            </div>
          </RevealOnScroll>
        </div>

        {/* ── 3. High-Precision Badge Grid (1-Col Mobile / 2-Cols Tablet / 4-Cols Desktop) ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-6 lg:gap-8 max-w-[360px] sm:max-w-none mx-auto">
          {filteredMembers.map((member, idx) => (
            <RevealOnScroll key={member.slug} delay={Math.min(idx * 0.04, 0.12)} direction="up">
              <TeamCardBadge member={member} index={idx} />
            </RevealOnScroll>
          ))}
        </div>
      </Container>
    </Section>
  )
}
