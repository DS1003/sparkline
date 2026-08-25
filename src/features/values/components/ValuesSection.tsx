'use client'

import React from 'react'
import Image from 'next/image'
import { values } from '@/config/content/values'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { Container } from '@/components/layout/Container'
import { Section } from '@/components/layout/Section'
import { RevealOnScroll } from '@/components/motion/RevealOnScroll'

export function ValuesSection() {
  return (
    <Section id="values" darker>
      <Container>
        <SectionHeader
          tag="Core Values"
          title="The principles that guide our work and partnerships."
          subtitle="How we maintain quality, trust, and creative momentum."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((val, idx) => (
            <RevealOnScroll key={val.id} delay={idx * 0.05}>
              <div className="p-6 rounded-2xl bg-white border border-[#e2e2e7] shadow-sm hover:border-[#EB4604]/50 transition-colors h-full flex flex-col justify-between space-y-4 group">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#EB4604]/10 to-[#FFB901]/10 border border-[#EB4604]/20 flex items-center justify-center mb-4 p-2 group-hover:scale-105 transition-transform">
                    <Image
                      src="/images/brand/sparkline-symbol.svg"
                      alt="Spark"
                      width={20}
                      height={20}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <h3 className="heading-04 text-neutral-900 mb-2">{val.title}</h3>
                  <p className="text-neutral-600 text-sm leading-relaxed">
                    {val.description}
                  </p>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </Container>
    </Section>
  )
}
