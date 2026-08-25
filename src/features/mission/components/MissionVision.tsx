'use client'

import React from 'react'
import { Tag } from '@/components/ui/Tag'
import { Container } from '@/components/layout/Container'
import { Section } from '@/components/layout/Section'
import { RevealOnScroll } from '@/components/motion/RevealOnScroll'

export function MissionVision() {
  return (
    <Section id="mission-vision">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Mission Card */}
          <RevealOnScroll delay={0.1}>
            <div className="p-8 sm:p-12 rounded-3xl bg-[#f4f4f7] border border-[#e2e2e7] shadow-sm relative overflow-hidden h-full flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <Tag variant="v2">Mission</Tag>
                <h3 className="heading-02 text-neutral-900">Spark Innovation</h3>
                <p className="text-neutral-700 text-lg leading-relaxed font-light">
                  To spark the innovation that moves organizations forward by creating a direct line between vision and execution through strategic and personalized digital solutions.
                </p>
              </div>
              <div className="pt-6 border-t border-[#e2e2e7] text-xs font-mono text-[#EB4604] uppercase tracking-wider font-semibold">
                VISION → EXECUTION → STRATEGY
              </div>
            </div>
          </RevealOnScroll>

          {/* Vision Card */}
          <RevealOnScroll delay={0.2}>
            <div className="p-8 sm:p-12 rounded-3xl bg-[#f4f4f7] border border-[#e2e2e7] shadow-sm relative overflow-hidden h-full flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <Tag variant="v2">Vision</Tag>
                <h3 className="heading-02 text-neutral-900">Illuminate Success</h3>
                <p className="text-neutral-700 text-lg leading-relaxed font-light">
                  To become a trusted partner for organizations navigating digital transformation, guiding them toward a more connected, innovative and sustainable future.
                </p>
              </div>
              <div className="pt-6 border-t border-[#e2e2e7] text-xs font-mono text-[#EB4604] uppercase tracking-wider font-semibold">
                CONNECTED → INNOVATIVE → SUSTAINABLE
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </Container>
    </Section>
  )
}
