'use client'

import React from 'react'
import { sparklearn } from '@/config/content/sparklearn'
import { Tag } from '@/components/ui/Tag'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/layout/Container'
import { Section } from '@/components/layout/Section'
import { RevealOnScroll } from '@/components/motion/RevealOnScroll'

export function SparkLearnSection() {
  return (
    <Section id="sparklearn" className="bg-[#f0f0f4]">
      <Container>
        <div className="max-w-4xl mx-auto text-center space-y-6 mb-16">
          <RevealOnScroll>
            <Tag variant="v2">Initiative Éducative</Tag>
          </RevealOnScroll>
          <RevealOnScroll delay={0.1}>
            <h2 className="heading-display text-neutral-900">
              SPARK<span className="text-[#EB4604]">learn</span>
            </h2>
          </RevealOnScroll>
          <RevealOnScroll delay={0.2}>
            <p className="text-xl text-neutral-600 max-w-2xl mx-auto font-light">
              {sparklearn.description}
            </p>
          </RevealOnScroll>
        </div>

        {/* 2 Main pillars of SPARKlearn */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {sparklearn.activities.map((activity, idx) => (
            <RevealOnScroll key={activity.id} delay={idx * 0.2}>
              <div className="p-8 sm:p-12 rounded-3xl bg-white border border-[#e2e2e7] shadow-sm hover:border-[#EB4604]/40 transition-colors flex flex-col justify-between h-full space-y-8">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-[#EB4604]/10 text-[#EB4604] flex items-center justify-center font-mono font-bold text-lg mb-6">
                    0{idx + 1}
                  </div>
                  <h3 className="heading-02 text-neutral-900 mb-4">{activity.title}</h3>
                  <p className="text-neutral-600 text-base leading-relaxed mb-6">
                    {activity.description}
                  </p>
                  <div className="space-y-2">
                    <h4 className="text-xs uppercase font-mono tracking-wider text-neutral-400">Objectifs clés</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {activity.goals.map((goal, gIdx) => (
                        <div key={gIdx} className="flex items-center gap-2 text-sm text-neutral-800 font-medium">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#EB4604]" />
                          {goal}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <Button href="/contact" variant="outline" size="sm" className="w-fit border-neutral-300 text-neutral-900 hover:bg-neutral-100">
                  Rejoindre le programme
                </Button>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </Container>
    </Section>
  )
}
