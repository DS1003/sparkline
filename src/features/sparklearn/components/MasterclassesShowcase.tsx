'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { Masterclass } from '@/types'
import { Container } from '@/components/layout/Container'
import { RevealOnScroll } from '@/components/motion/RevealOnScroll'
import { Tag } from '@/components/ui/Tag'

interface MasterclassesShowcaseProps {
  masterclasses: Masterclass[]
}

const disciplines = [
  'Architecture Web & Next.js',
  'UI/UX & Design Systems',
  'IA Générative & Workflows Dev',
  'FinTech & Passerelles Mobiles',
  'Cloud, Edge & DevOps',
  'Product Management & Leadership',
]

export function MasterclassesShowcase({ masterclasses }: MasterclassesShowcaseProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  const categories = [
    { id: 'all', label: 'Toutes les sessions' },
    { id: 'Ingénierie & Cloud', label: 'Ingénierie & Cloud' },
    { id: 'UI/UX & Design', label: 'UI/UX & Design' },
    { id: 'Intelligence Artificielle', label: 'IA & Workflows' },
    { id: 'FinTech & Systèmes', label: 'FinTech' },
    { id: 'Stratégie & Leadership', label: 'Leadership' },
  ]

  const filteredMasterclasses =
    selectedCategory === 'all'
      ? masterclasses
      : masterclasses.filter((m) => m.category === selectedCategory)

  return (
    <div className="py-12 sm:py-16 bg-[#FAFBFD] border-b border-[#E5E7EB]">
      <Container>
        {/* ── 1. Top Bento 3-Column Layout (Sans Boutons de Redirection) ── */}
        <div className="rounded-[24px] sm:rounded-[28px] bg-white border border-[#E5E7EB] p-6 sm:p-8 lg:p-9 shadow-[0_4px_25px_rgba(0,0,0,0.02)] mb-12 sm:mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
            {/* ── Column 1: Vertical Disciplines List ── */}
            <div className="lg:col-span-3 flex flex-col justify-between space-y-4 pr-0 lg:pr-2">
              <div className="space-y-3.5">
                <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 font-bold block">
                  Disciplines Clés
                </span>
                <ul className="space-y-2.5">
                  {disciplines.map((item, idx) => (
                    <li
                      key={idx}
                      className="text-xs sm:text-[13px] font-medium text-neutral-700 hover:text-[#EB4604] transition-colors flex items-center gap-2.5 select-none group"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-neutral-300 group-hover:bg-[#EB4604] transition-colors shrink-0" />
                      <span className="truncate">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-3 border-t border-neutral-100 flex items-center justify-between text-[10px] font-mono text-neutral-400">
                <span>100% GRATUIT</span>
                <span>UNIVERSITÉS &amp; HUBS</span>
              </div>
            </div>

            {/* ── Column 2: Center Spotlight Card ── */}
            <div className="lg:col-span-4 rounded-[20px] sm:rounded-[24px] bg-[#F7F8FA] border border-neutral-200/80 p-6 sm:p-7 flex flex-col justify-between space-y-5">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#EB4604] font-bold">
                    Engagement Citoyen
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-white text-[10px] font-mono text-neutral-500 border border-neutral-200">
                    Impact Direct
                  </span>
                </div>

                <h3
                  className="text-xl sm:text-2xl font-bold text-[#0A0A0A] tracking-tight leading-snug"
                  style={{ fontFamily: 'var(--font-family--primary-font)' }}
                >
                  Masterclasses Gratuites
                </h3>

                <p className="text-neutral-600 text-xs sm:text-sm font-light leading-relaxed">
                  Sessions immersives animées au cœur des universités et hubs technologiques pour transmettre les standards d’ingénierie et de design d’élite.
                </p>
              </div>

              <div className="pt-3 border-t border-neutral-200/60 flex flex-wrap items-center gap-2 text-[11px] font-mono text-neutral-600">
                <span className="px-2.5 py-1 rounded-md bg-white border border-neutral-200/80">
                  Ateliers Pratiques
                </span>
                <span className="px-2.5 py-1 rounded-md bg-white border border-neutral-200/80">
                  Mentorat Senior
                </span>
              </div>
            </div>

            {/* ── Column 3: Big Matte Black Hero Card ── */}
            <div className="lg:col-span-5 rounded-[20px] sm:rounded-[24px] bg-[#0A0A0A] text-white p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden border border-neutral-800 shadow-xl group">
              <div className="relative z-10 space-y-3.5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 font-bold">
                    Sparklearn Academy
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-white/10 text-[10px] font-mono text-neutral-300">
                    Excellence &amp; Craft
                  </span>
                </div>

                <h3
                  className="text-xl sm:text-2xl lg:text-[26px] font-bold text-white tracking-tight leading-snug"
                  style={{ fontFamily: 'var(--font-family--primary-font)' }}
                >
                  Façonnons ensemble l’élite numérique !
                </h3>

                <p className="text-neutral-300 text-xs sm:text-sm font-light leading-relaxed max-w-sm">
                  Ateliers pratiques et formations tutorées conçus par les ingénieurs seniors et designers de SPARKLINE pour propulser les créateurs de demain.
                </p>
              </div>

              <div className="relative z-10 pt-4 border-t border-neutral-800 flex items-center justify-between text-[11px] font-mono text-neutral-400">
                <span>DAKAR &amp; INTERNATIONAL</span>
                <span className="text-white font-semibold">100% PRATIQUE</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── 2. Masterclasses & Sessions Grid (Compact 4-Column Grid) ── */}
        <div className="space-y-8">
          {/* Header & Filter Controls */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-2">
            <div className="space-y-2">
              <RevealOnScroll>
                <Tag variant="v2">Sessions &amp; Masterclasses</Tag>
              </RevealOnScroll>
              <RevealOnScroll delay={0.1}>
                <h2
                  className="text-2xl sm:text-3xl lg:text-4xl font-normal text-[#0A0A0A] leading-tight tracking-[-0.03em]"
                  style={{ fontFamily: 'var(--font-family--primary-font)' }}
                >
                  Nos Masterclasses &amp; Formations.
                </h2>
              </RevealOnScroll>
            </div>

            {/* Compact Filter Pills */}
            <RevealOnScroll delay={0.15}>
              <div className="flex flex-wrap items-center gap-1.5">
                {categories.map((cat) => {
                  const isActive = selectedCategory === cat.id
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-300 cursor-pointer border ${isActive
                          ? 'bg-[#0A0A0A] text-white border-[#0A0A0A] shadow-xs'
                          : 'bg-white text-neutral-600 border-[#E5E7EB] hover:border-neutral-400 hover:text-[#0A0A0A]'
                        }`}
                    >
                      {cat.label}
                    </button>
                  )
                })}
              </div>
            </RevealOnScroll>
          </div>

          {/* Compact Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 items-stretch">
            {filteredMasterclasses.map((mc, idx) => (
              <RevealOnScroll key={mc.slug} delay={idx * 0.06} className="flex">
                <div className="w-full rounded-[18px] bg-white border border-[#E5E7EB] overflow-hidden shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_25px_rgba(0,0,0,0.06)] hover:border-neutral-300 transition-all duration-300 flex flex-col justify-between group">
                  <div>
                    {/* Compact Top Cover Image */}
                    <div className="relative w-full h-36 sm:h-40 overflow-hidden bg-neutral-100">
                      {mc.coverImage && (
                        <Image
                          src={mc.coverImage}
                          alt={mc.title}
                          fill
                          unoptimized
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                        />
                      )}
                      {/* Floating Status Badge */}
                      <div className="absolute top-2.5 left-2.5 z-10 flex items-center gap-1">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[9px] font-mono font-bold uppercase tracking-wider ${mc.status === 'upcoming'
                              ? 'bg-[#EB4604] text-white shadow-xs'
                              : 'bg-[#0A0A0A]/85 backdrop-blur-md text-white'
                            }`}
                        >
                          {mc.status === 'upcoming' ? 'À venir' : 'Terminée'}
                        </span>
                      </div>
                    </div>

                    {/* Content Body */}
                    <div className="p-4 sm:p-5 space-y-2.5">
                      <div className="flex items-center justify-between text-[10px] font-mono text-neutral-400">
                        <span>{mc.category || 'Formation'}</span>
                        <span>{mc.date}</span>
                      </div>

                      <h3
                        className="text-sm sm:text-[15px] font-bold text-[#0A0A0A] leading-snug tracking-tight group-hover:text-[#EB4604] transition-colors line-clamp-2"
                        style={{ fontFamily: 'var(--font-family--primary-font)' }}
                      >
                        {mc.title}
                      </h3>

                      <p className="text-neutral-500 text-xs font-light leading-relaxed line-clamp-2">
                        {mc.description}
                      </p>

                      {/* Topics micro-pills */}
                      <div className="flex flex-wrap gap-1 pt-1">
                        {mc.topics.slice(0, 2).map((topic, tIdx) => (
                          <span
                            key={tIdx}
                            className="px-2 py-0.5 rounded bg-neutral-100 text-neutral-600 text-[9px] font-mono truncate max-w-full"
                          >
                            {topic}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Footer Speaker / Mentor Info */}
                  <div className="p-4 sm:p-5 pt-3 border-t border-neutral-100 flex items-center justify-between">
                    <div className="flex items-center gap-2 min-w-0">
                      {mc.speakerAvatar ? (
                        <div className="relative w-6 h-6 rounded-full overflow-hidden border border-neutral-200 shrink-0">
                          <Image
                            src={mc.speakerAvatar}
                            alt={mc.speaker || 'Speaker'}
                            fill
                            className="object-cover"
                          />
                        </div>
                      ) : (
                        <div className="w-6 h-6 rounded-full bg-neutral-200 text-neutral-700 font-bold text-[10px] flex items-center justify-center shrink-0">
                          {mc.speaker?.charAt(0) || 'S'}
                        </div>
                      )}
                      <div className="min-w-0">
                        <p className="text-xs font-semibold text-neutral-900 truncate">
                          {mc.speaker || 'SPARKLINE Lead'}
                        </p>
                        <p className="text-[10px] font-mono text-neutral-400 truncate">
                          {mc.institution}
                        </p>
                      </div>
                    </div>

                    <span className="w-6 h-6 rounded-full bg-neutral-100 group-hover:bg-[#0A0A0A] group-hover:text-white flex items-center justify-center text-[10px] text-neutral-700 transition-colors shrink-0">
                      ↗
                    </span>
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </Container>
    </div>
  )
}
