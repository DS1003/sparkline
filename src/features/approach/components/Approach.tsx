'use client'

import React from 'react'
import { approach } from '@/config/content/sparklearn'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { Container } from '@/components/layout/Container'
import { Section } from '@/components/layout/Section'
import { RevealOnScroll } from '@/components/motion/RevealOnScroll'

export function Approach() {
  return (
    <Section id="approach" darker>
      <Container>
        <SectionHeader
          tag="Notre Approche"
          title="Une méthodologie éprouvée, de l’idée initiale à l’impact durable."
          subtitle="Comment nous structurons chaque projet de transformation pour une fiabilité et une croissance maximales."
        />

        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {approach.map((step, idx) => (
            <RevealOnScroll key={step.id} delay={idx * 0.1}>
              <div className="p-6 rounded-2xl bg-white border border-[#e2e2e7] shadow-sm hover:border-[#EB4604]/50 transition-colors h-full flex flex-col justify-between space-y-6">
                <div>
                  <span className="text-[#EB4604] font-mono text-2xl font-bold block mb-4">
                    {step.number}
                  </span>
                  <h3 className="heading-04 text-neutral-900 mb-2">{step.title}</h3>
                  <p className="text-neutral-600 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
                <div className="w-full h-1 bg-neutral-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#FFB901] to-[#EB4604]"
                    style={{ width: `${((idx + 1) / approach.length) * 100}%` }}
                  />
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </Container>
    </Section>
  )
}
