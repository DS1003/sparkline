'use client'

import React, { useState } from 'react'
import { Container } from '@/components/layout/Container'
import { Section } from '@/components/layout/Section'
import { Tag } from '@/components/ui/Tag'
import { RevealOnScroll } from '@/components/motion/RevealOnScroll'
import { siteConfig } from '@/config/site'

interface FAQItem {
  id: string
  number: string
  question: string
  answer: string
}

const faqs: FAQItem[] = [
  {
    id: 'services',
    number: '01',
    question: 'Quels services votre agence propose-t-elle ?',
    answer:
      'Nous offrons une gamme complète d’expertises intégrées : Design UI/UX & Systèmes de Design, développement d’applications Web & Mobiles sur-mesure, identités de marque stratégiques, architectures Cloud et programmes d’apprentissage Sparklearn.',
  },
  {
    id: 'approach',
    number: '02',
    question: 'Comment abordez-vous un nouveau projet ?',
    answer:
      'Notre méthode repose sur 4 étapes rigoureuses : Cadrage stratégique & Découverte, Architecture & Prototypage haute fidélité, Développement agile en sprints courts, et Déploiement avec suivi des performances.',
  },
  {
    id: 'timeline',
    number: '03',
    question: 'Quels sont les délais moyens pour un projet ?',
    answer:
      'Les délais sont calibrés selon la complexité : comptez 2 à 4 semaines pour une identité de marque ou une landing page haute conversion, et 6 à 12 semaines pour une plateforme web SaaS ou une application mobile complète.',
  },
  {
    id: 'revisions',
    number: '04',
    question: 'Comment gérez-vous les révisions et retours ?',
    answer:
      'Nous travaillons en cycles itératifs transparents avec des démonstrations hebdomadaires. Des jalons de validation dédiés sont intégrés à chaque étape clé pour garantir une totale conformité avec vos attentes.',
  },
  {
    id: 'pricing',
    number: '05',
    question: 'Combien coûtent vos services ?',
    answer:
      'Chaque solution étant personnalisée, nous élaborons un devis clair et transparent après un premier atelier de cadrage gratuit, adapté à vos objectifs stratégiques et à vos exigences techniques.',
  },
]

export function FAQSection() {
  const [openId, setOpenId] = useState<string | null>('services')

  const toggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id))
  }

  return (
    <Section id="faq" className="py-20 sm:py-28 lg:py-36 bg-white text-neutral-900 overflow-hidden">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">

          {/* ── Left Column: Editorial Sticky Header ── */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-32 text-center lg:text-left">
            <RevealOnScroll>
              <div className="flex justify-center lg:justify-start">
                <Tag variant="v2">FAQ</Tag>
              </div>
            </RevealOnScroll>

            <RevealOnScroll delay={0.1}>
              <h2
                className="text-[clamp(2.25rem,4.5vw,56px)] font-normal text-[#0A0A0A] leading-[1.05] tracking-[-0.035em]"
                style={{ fontFamily: 'var(--font-family--primary-font)' }}
              >
                Des questions ?<br />
                Nous avons les réponses
              </h2>
            </RevealOnScroll>

            <RevealOnScroll delay={0.15}>
              <p className="text-sm sm:text-base text-neutral-500 font-light leading-relaxed max-w-md mx-auto lg:mx-0">
                Tout ce que vous devez savoir sur notre processus, nos tarifs et notre façon de collaborer au quotidien.
              </p>
            </RevealOnScroll>

            {/* Refined Minimalist Action Pill */}
            <RevealOnScroll delay={0.2}>
              <div className="pt-2 flex justify-center lg:justify-start">
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="inline-flex items-center gap-3 px-4 sm:px-5 py-3 rounded-full bg-[#F4F5F8] hover:bg-[#0A0A0A] text-neutral-700 hover:text-white border border-neutral-200/60 hover:border-[#0A0A0A] transition-all duration-300 text-xs font-mono group shadow-sm hover:shadow-md"
                >
                  <span className="w-2 h-2 rounded-full bg-[#EB4604] group-hover:scale-125 transition-transform" />
                  <span className="font-medium">Une question spécifique ? Écrivez-nous</span>
                  <span className="text-neutral-400 group-hover:text-white group-hover:translate-x-0.5 transition-all">↗</span>
                </a>
              </div>
            </RevealOnScroll>
          </div>

          {/* ── Right Column: High-End Architectural Accordion Cards ── */}
          <div className="lg:col-span-7 flex flex-col space-y-3.5 sm:space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = openId === faq.id

              return (
                <RevealOnScroll key={faq.id} delay={0.06 * idx}>
                  <div
                    onClick={() => toggle(faq.id)}
                    className={`group cursor-pointer transition-all duration-300 rounded-[24px] sm:rounded-[28px] overflow-hidden border ${isOpen
                        ? 'bg-[#F9FAFB] border-[#0A0A0A]/20 shadow-[0_12px_32px_rgba(0,0,0,0.04),0_1px_3px_rgba(0,0,0,0.02)]'
                        : 'bg-[#F8F9FA] hover:bg-[#F0F2F5] border-transparent hover:border-neutral-200/60 shadow-[0_2px_8px_rgba(0,0,0,0.015)]'
                      }`}
                  >
                    {/* Question Header Bar */}
                    <div className="flex items-center justify-between gap-3 sm:gap-4 p-4 sm:p-6 lg:px-7">
                      <div className="flex items-center gap-3 sm:gap-4.5 min-w-0">
                        {/* Number Index */}
                        <span className="text-[10px] sm:text-xs font-mono font-medium tracking-wider text-neutral-400 group-hover:text-neutral-700 transition-colors shrink-0">
                          {faq.number}
                        </span>

                        <h3
                          className="text-sm sm:text-lg font-medium text-[#0A0A0A] leading-snug select-none"
                          style={{ fontFamily: 'var(--font-family--primary-font)' }}
                        >
                          {faq.question}
                        </h3>
                      </div>

                      {/* Smooth Circular Micro-Interaction Button */}
                      <div
                        className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full border flex items-center justify-center text-sm font-light shrink-0 transition-all duration-300 ${isOpen
                            ? 'bg-[#0A0A0A] text-white border-[#0A0A0A] rotate-45 shadow-sm'
                            : 'bg-white border-neutral-200/80 text-neutral-600 group-hover:border-neutral-300 group-hover:bg-white group-hover:text-[#0A0A0A]'
                          }`}
                      >
                        <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                        </svg>
                      </div>
                    </div>

                    {/* Expandable Answer Content */}
                    <div
                      className={`grid transition-all duration-300 ease-in-out px-4 sm:px-6 lg:px-7 ${isOpen
                          ? 'grid-rows-[1fr] opacity-100 pb-5 sm:pb-6 pt-0'
                          : 'grid-rows-[0fr] opacity-0 pb-0 pt-0'
                        }`}
                    >
                      <div className="overflow-hidden">
                        <div className="border-t border-neutral-200/70 pt-3 sm:pt-4 pl-5 sm:pl-8">
                          <p className="text-xs sm:text-base text-neutral-600 font-light leading-relaxed">
                            {faq.answer}
                          </p>
                        </div>
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
