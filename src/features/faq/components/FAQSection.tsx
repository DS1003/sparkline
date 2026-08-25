'use client'

import React, { useState } from 'react'
import { Container } from '@/components/layout/Container'
import { Section } from '@/components/layout/Section'
import { Tag } from '@/components/ui/Tag'
import { RevealOnScroll } from '@/components/motion/RevealOnScroll'

interface FAQItem {
  id: string
  question: string
  answer: string
}

const faqs: FAQItem[] = [
  {
    id: 'services',
    question: 'Quels services votre agence propose-t-elle ?',
    answer:
      'Nous offrons une gamme complète d’expertises : Design UI/UX & Produit, développement d’applications web & mobiles sur mesure, création d’identités de marque fortes, production audiovisuelle et programmes d’apprentissage SPARKlearn.',
  },
  {
    id: 'approach',
    question: 'Comment abordez-vous un nouveau projet ?',
    answer:
      'Notre méthodologie éprouvée repose sur 4 étapes : Comprendre (recherche et cadrage stratégique), Concevoir (architecture et prototypage interactif), Bâtir (développement agile haute performance) et Propulser (déploiement, analytics et optimisation continue).',
  },
  {
    id: 'timeline',
    question: 'Quels sont les délais moyens pour un projet ?',
    answer:
      'Les délais dépendent de l’envergure du projet : comptez 2 à 4 semaines pour une identité de marque ou une landing page haute conversion, et 6 à 12 semaines pour une plateforme web ou application mobile complète.',
  },
  {
    id: 'revisions',
    question: 'Comment gérez-vous les révisions et retours ?',
    answer:
      'Nous travaillons en cycles itératifs transparents avec des démonstrations hebdomadaires. Des phases d’ajustements dédiées sont intégrées à chaque étape clé pour garantir une totale conformité avec votre vision.',
  },
  {
    id: 'pricing',
    question: 'Combien coûtent vos services ?',
    answer:
      'Chaque solution étant sur mesure, nous élaborons un devis clair et transparent après un premier atelier de cadrage gratuit, adapté à vos objectifs de croissance et à vos exigences techniques.',
  },
]

export function FAQSection() {
  const [openId, setOpenId] = useState<string | null>(null)

  const toggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id))
  }

  return (
    <Section id="faq" className="py-16 sm:py-20 lg:py-28 bg-white">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          
          {/* ── Left Column: Sticky Editorial Header ── */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-28">
            <RevealOnScroll>
              <Tag variant="v2">FAQ</Tag>
            </RevealOnScroll>

            <RevealOnScroll delay={0.1}>
              <h2
                className="text-[clamp(2.25rem,4vw,56px)] font-normal text-[#0A0A0A] leading-[1.06] tracking-[-0.03em]"
                style={{ fontFamily: 'var(--font-family--primary-font)' }}
              >
                Des questions ?<br />
                Nous avons les réponses
              </h2>
            </RevealOnScroll>

            <RevealOnScroll delay={0.2}>
              <p className="text-sm sm:text-base text-neutral-500 font-normal leading-relaxed max-w-md">
                Tout ce que vous devez savoir sur notre processus, nos tarifs et notre façon de collaborer au quotidien.
              </p>
            </RevealOnScroll>
          </div>

          {/* ── Right Column: Stacked Capsule Pill Accordion List ── */}
          <div className="lg:col-span-7 flex flex-col space-y-3.5 sm:space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = openId === faq.id

              return (
                <RevealOnScroll key={faq.id} delay={0.08 * idx}>
                  <div
                    onClick={() => toggle(faq.id)}
                    className={`cursor-pointer transition-all duration-300 rounded-[24px] sm:rounded-[32px] overflow-hidden ${
                      isOpen
                        ? 'bg-[#f0f1f5] shadow-sm'
                        : 'bg-[#f4f5f8] hover:bg-[#eceef2]'
                    }`}
                  >
                    {/* Question Header Bar */}
                    <div className="flex items-center justify-between gap-4 p-5 sm:p-6 lg:px-8 lg:py-6">
                      <h3
                        className="text-base sm:text-lg font-medium text-[#0A0A0A] leading-snug select-none"
                        style={{ fontFamily: 'var(--font-family--primary-font)' }}
                      >
                        {faq.question}
                      </h3>

                      {/* Animated Plus / Close Toggle Icon */}
                      <span
                        className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center text-xl sm:text-2xl font-light text-[#0A0A0A] shrink-0 transition-transform duration-300 ${
                          isOpen ? 'rotate-45 text-[#EB4604]' : 'rotate-0'
                        }`}
                      >
                        +
                      </span>
                    </div>

                    {/* Expandable Answer Content */}
                    <div
                      className={`grid transition-all duration-300 ease-in-out px-5 sm:px-6 lg:px-8 ${
                        isOpen
                          ? 'grid-rows-[1fr] opacity-100 pb-6 pt-1'
                          : 'grid-rows-[0fr] opacity-0 pb-0 pt-0'
                      }`}
                    >
                      <div className="overflow-hidden">
                        <p className="text-sm sm:text-base text-neutral-600 font-normal leading-relaxed border-t border-neutral-200/60 pt-4">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                </RevealOnScroll>
              )
            })}
          </div>

        </div>
      </Container>
    </Section>
  )
}
