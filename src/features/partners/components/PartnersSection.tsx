'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Container } from '@/components/layout/Container'
import { Section } from '@/components/layout/Section'
import { Tag } from '@/components/ui/Tag'
import { RevealOnScroll } from '@/components/motion/RevealOnScroll'

interface PartnerItem {
  id: string
  name: string
  role: string
  initials: string
  color: string
  avatar?: string
  type?: 'partner' | 'badge'
  badgeText?: string
}

const row1: PartnerItem[] = [
  { id: '1-1', name: 'Orange Digital Center', role: 'Incubateur Tech', initials: 'OD', color: '#FF7900', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80' },
  { id: '1-2', name: 'Awa Diop', role: 'Baobab Ventures', initials: 'AD', color: '#3B82F6', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80' },
  { id: '1-b1', name: '', role: '', initials: '', color: '#EB4604', type: 'badge', badgeText: 'REJOINDRE LE RÉSEAU' },
  { id: '1-3', name: 'Wave Money', role: 'Fintech Mobile', initials: 'WM', color: '#10B981', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80' },
  { id: '1-4', name: 'Seydou Diallo', role: 'Teranga Capital', initials: 'SD', color: '#8B5CF6', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80' },
  { id: '1-5', name: 'Gainde 2000', role: 'GovTech & Digital', initials: 'G2', color: '#059669', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&auto=format&fit=crop&q=80' },
  { id: '1-b2', name: '', role: '', initials: '', color: '#0A0A0A', type: 'badge', badgeText: 'JOIN US ↗' },
  { id: '1-6', name: 'Mariama Sow', role: 'AfriqInvest Fund', initials: 'MS', color: '#EC4899', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80' },
  { id: '1-7', name: 'Wër Asset', role: 'PropTech & BTP', initials: 'WA', color: '#F59E0B', avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&auto=format&fit=crop&q=80' },
]

const row2: PartnerItem[] = [
  { id: '2-1', name: 'Sonatel Innovation', role: 'Télécoms & Infra', initials: 'SI', color: '#0284C7', avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=100&auto=format&fit=crop&q=80' },
  { id: '2-2', name: 'Mamadou Ndiaye', role: 'Dakar Dem Dikk', initials: 'MN', color: '#10B981', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop&q=80' },
  { id: '2-b1', name: '', role: '', initials: '', color: '#EB4604', type: 'badge', badgeText: 'DEVENIR PARTENAIRE' },
  { id: '2-3', name: 'PayDunya', role: 'Paiement en Ligne', initials: 'PD', color: '#6366F1', avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&auto=format&fit=crop&q=80' },
  { id: '2-4', name: 'Cheikh Fall', role: 'AfriLabs Africa', initials: 'CF', color: '#D97706', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&auto=format&fit=crop&q=80' },
  { id: '2-5', name: 'NexaHealth', role: 'E-Santé & IA', initials: 'NH', color: '#0D9488', avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=100&auto=format&fit=crop&q=80' },
  { id: '2-b2', name: '', role: '', initials: '', color: '#0A0A0A', type: 'badge', badgeText: 'NOUVEAU PROJET ↗' },
  { id: '2-6', name: 'Fatou Bintou', role: 'Sénégal Numérique', initials: 'FB', color: '#8B5CF6', avatar: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=100&auto=format&fit=crop&q=80' },
  { id: '2-7', name: 'Kirène Group', role: 'Supply Chain', initials: 'KG', color: '#EF4444', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80' },
]

const row3: PartnerItem[] = [
  { id: '3-1', name: 'Wôy Academy', role: 'EdTech & IA', initials: 'WA', color: '#8B5CF6', avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=100&auto=format&fit=crop&q=80' },
  { id: '3-2', name: 'Fadel Kane', role: 'Fintech Alliance', initials: 'FK', color: '#3B82F6', avatar: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=100&auto=format&fit=crop&q=80' },
  { id: '3-b1', name: '', role: '', initials: '', color: '#EB4604', type: 'badge', badgeText: 'COLLABORER AVEC NOUS' },
  { id: '3-3', name: 'Touba AgriTech', role: 'Agro-Industrie', initials: 'TA', color: '#16A34A', avatar: 'https://images.unsplash.com/photo-1542206395-9feb3edaa68d?w=100&auto=format&fit=crop&q=80' },
  { id: '3-4', name: 'Aïssatou Ba', role: 'Sahel Energy', initials: 'AB', color: '#CA8A04', avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=100&auto=format&fit=crop&q=80' },
  { id: '3-5', name: 'TerangaPay', role: 'Microfinance', initials: 'TP', color: '#2563EB', avatar: 'https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?w=100&auto=format&fit=crop&q=80' },
  { id: '3-b2', name: '', role: '', initials: '', color: '#0A0A0A', type: 'badge', badgeText: 'JOIN US ↗' },
  { id: '3-6', name: 'Ibrahima Sarr', role: 'Logistics Hub', initials: 'IS', color: '#7C3AED', avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&auto=format&fit=crop&q=80' },
  { id: '3-7', name: 'LuxeAura Paris', role: 'Brand & Retail', initials: 'LA', color: '#EA580C', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80' },
]

export function PartnersSection() {
  return (
    <Section id="partners" className="py-20 sm:py-28 lg:py-36 bg-white text-neutral-900 overflow-hidden relative">
      {/* ── CSS Keyframes for Infinite Smooth Ribbon Marquee ── */}
      <style jsx>{`
        @keyframes marquee-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-right {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .animate-ribbon-left {
          animation: marquee-left 35s linear infinite;
        }
        .animate-ribbon-right {
          animation: marquee-right 40s linear infinite;
        }
        .animate-ribbon-left-slow {
          animation: marquee-left 45s linear infinite;
        }
        .ribbon-container:hover .animate-ribbon-left,
        .ribbon-container:hover .animate-ribbon-right,
        .ribbon-container:hover .animate-ribbon-left-slow {
          animation-play-state: paused;
        }
      `}</style>

      {/* ── Top Editorial Header ── */}
      <Container className="mb-14 sm:mb-18">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 lg:gap-16">
          <div className="space-y-4 max-w-xl">
            <RevealOnScroll>
              <Tag variant="v2">Nos Partenaires & Écosystème</Tag>
            </RevealOnScroll>
            <RevealOnScroll delay={0.1}>
              <h2
                className="text-[clamp(2.25rem,4.5vw,56px)] font-normal text-[#0A0A0A] leading-[1.05] tracking-[-0.035em]"
                style={{ fontFamily: 'var(--font-family--primary-font)' }}
              >
                Une alliance d’acteurs visionnaires.
              </h2>
            </RevealOnScroll>
          </div>

          <RevealOnScroll delay={0.15}>
            <p className="text-sm sm:text-base text-neutral-500 font-light leading-relaxed max-w-md lg:text-right">
              Startups audacieuses, grands groupes et institutions publiques font confiance à SPARKLINE pour concevoir et déployer leurs plateformes critiques.
            </p>
          </RevealOnScroll>
        </div>
      </Container>

      {/* ── Floating Pill Capsule Marquee Ribbons (Clean Edge to Edge) ── */}
      <div className="ribbon-container relative w-full select-none py-2 overflow-hidden">
        {/* Ribbon Stream */}
        <div className="space-y-4 sm:space-y-5">
          {/* ── ROW 1 (Moving Left) ── */}
          <div className="flex w-full overflow-visible">
            <div className="animate-ribbon-left flex gap-3 sm:gap-4 items-center shrink-0 w-max pr-3 sm:pr-4 py-1">
              {[...row1, ...row1, ...row1].map((item, idx) => (
                <React.Fragment key={`r1-${idx}`}>
                  {item.type === 'badge' ? (
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-2 px-6 py-2.5 sm:py-3 rounded-full text-white text-xs font-mono font-bold tracking-wider uppercase transition-all duration-300 hover:scale-105 shadow-md shrink-0"
                      style={{ backgroundColor: item.color }}
                    >
                      <span>{item.badgeText}</span>
                    </Link>
                  ) : (
                    <div className="inline-flex items-center gap-3 sm:gap-3.5 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-[#F4F5F8] hover:bg-white border border-neutral-200/80 hover:border-[#EB4604]/40 shadow-[0_2px_8px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)] transition-all duration-300 cursor-pointer shrink-0 group">
                      <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full overflow-hidden shrink-0 relative bg-neutral-200 border border-neutral-200">
                        {item.avatar ? (
                          <Image
                            src={item.avatar}
                            alt={item.name}
                            fill
                            sizes="36px"
                            unoptimized
                            className="object-cover"
                          />
                        ) : (
                          <div
                            className="w-full h-full flex items-center justify-center text-white text-xs font-bold"
                            style={{ backgroundColor: item.color }}
                          >
                            {item.initials}
                          </div>
                        )}
                      </div>
                      <div className="text-left pr-1">
                        <span className="text-xs sm:text-sm font-semibold text-[#0A0A0A] group-hover:text-[#EB4604] transition-colors block leading-tight">
                          {item.name}
                        </span>
                        <span className="text-[10px] text-neutral-400 font-mono block">
                          {item.role}
                        </span>
                      </div>
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* ── ROW 2 (Moving Right) ── */}
          <div className="flex w-full overflow-visible">
            <div className="animate-ribbon-right flex gap-3 sm:gap-4 items-center shrink-0 w-max pr-3 sm:pr-4 py-1">
              {[...row2, ...row2, ...row2].map((item, idx) => (
                <React.Fragment key={`r2-${idx}`}>
                  {item.type === 'badge' ? (
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-2 px-6 py-2.5 sm:py-3 rounded-full text-white text-xs font-mono font-bold tracking-wider uppercase transition-all duration-300 hover:scale-105 shadow-md shrink-0"
                      style={{ backgroundColor: item.color }}
                    >
                      <span>{item.badgeText}</span>
                    </Link>
                  ) : (
                    <div className="inline-flex items-center gap-3 sm:gap-3.5 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-[#F4F5F8] hover:bg-white border border-neutral-200/80 hover:border-[#EB4604]/40 shadow-[0_2px_8px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)] transition-all duration-300 cursor-pointer shrink-0 group">
                      <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full overflow-hidden shrink-0 relative bg-neutral-200 border border-neutral-200">
                        {item.avatar ? (
                          <Image
                            src={item.avatar}
                            alt={item.name}
                            fill
                            sizes="36px"
                            unoptimized
                            className="object-cover"
                          />
                        ) : (
                          <div
                            className="w-full h-full flex items-center justify-center text-white text-xs font-bold"
                            style={{ backgroundColor: item.color }}
                          >
                            {item.initials}
                          </div>
                        )}
                      </div>
                      <div className="text-left pr-1">
                        <span className="text-xs sm:text-sm font-semibold text-[#0A0A0A] group-hover:text-[#EB4604] transition-colors block leading-tight">
                          {item.name}
                        </span>
                        <span className="text-[10px] text-neutral-400 font-mono block">
                          {item.role}
                        </span>
                      </div>
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* ── ROW 3 (Moving Left Slow - Visible on tablet & desktop) ── */}
          <div className="hidden sm:flex w-full overflow-visible">
            <div className="animate-ribbon-left-slow flex gap-3 sm:gap-4 items-center shrink-0 w-max pr-3 sm:pr-4 py-1">
              {[...row3, ...row3, ...row3].map((item, idx) => (
                <React.Fragment key={`r3-${idx}`}>
                  {item.type === 'badge' ? (
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-2 px-6 py-2.5 sm:py-3 rounded-full text-white text-xs font-mono font-bold tracking-wider uppercase transition-all duration-300 hover:scale-105 shadow-md shrink-0"
                      style={{ backgroundColor: item.color }}
                    >
                      <span>{item.badgeText}</span>
                    </Link>
                  ) : (
                    <div className="inline-flex items-center gap-3 sm:gap-3.5 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-[#F4F5F8] hover:bg-white border border-neutral-200/80 hover:border-[#EB4604]/40 shadow-[0_2px_8px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)] transition-all duration-300 cursor-pointer shrink-0 group">
                      <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full overflow-hidden shrink-0 relative bg-neutral-200 border border-neutral-200">
                        {item.avatar ? (
                          <Image
                            src={item.avatar}
                            alt={item.name}
                            fill
                            sizes="36px"
                            unoptimized
                            className="object-cover"
                          />
                        ) : (
                          <div
                            className="w-full h-full flex items-center justify-center text-white text-xs font-bold"
                            style={{ backgroundColor: item.color }}
                          >
                            {item.initials}
                          </div>
                        )}
                      </div>
                      <div className="text-left pr-1">
                        <span className="text-xs sm:text-sm font-semibold text-[#0A0A0A] group-hover:text-[#EB4604] transition-colors block leading-tight">
                          {item.name}
                        </span>
                        <span className="text-[10px] text-neutral-400 font-mono block">
                          {item.role}
                        </span>
                      </div>
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}
