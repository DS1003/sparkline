'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Container } from '@/components/layout/Container'
import { Tag } from '@/components/ui/Tag'
import { RevealOnScroll } from '@/components/motion/RevealOnScroll'

interface TechNode {
  id: string
  name: string
  category: string
  description: string
  // Coordinates on 1000x560 landscape canvas
  x: number
  y: number
  floatDelay: number
  icon: React.ReactNode
}

export function TechConstellation() {
  const [activeNode, setActiveNode] = useState<string | null>(null)

  const nodes: TechNode[] = [
    {
      id: 'nextjs',
      name: 'Next.js 15',
      category: 'Framework & SSR',
      description: 'Architecture serveur ultra-rapide, App Router, streaming & Server Actions.',
      x: 180,
      y: 100,
      floatDelay: 0,
      icon: (
        <div className="relative w-full h-full">
          <Image
            src="/images/approach/Next.js.png"
            alt="Next.js"
            fill
            quality={85}
            sizes="48px"
            className="object-contain"
          />
        </div>
      ),
    },
    {
      id: 'react',
      name: 'React 19',
      category: 'UI & State',
      description: 'Moteur de composants réactifs, Hooks modernes et fluidité d’exécution.',
      x: 370,
      y: 75,
      floatDelay: 0.4,
      icon: (
        <svg viewBox="-11.5 -10.23174 23 20.46348" className="w-7 h-7 sm:w-8 sm:h-8">
          <circle cx="0" cy="0" r="2.05" fill="#61dafb" />
          <g stroke="#61dafb" strokeWidth="1" fill="none">
            <ellipse rx="11" ry="4.2" />
            <ellipse rx="11" ry="4.2" transform="rotate(60)" />
            <ellipse rx="11" ry="4.2" transform="rotate(120)" />
          </g>
        </svg>
      ),
    },
    {
      id: 'typescript',
      name: 'TypeScript',
      category: 'Type Safety',
      description: 'Typage statique strict garantissant la robustesse et zéro bug critique.',
      x: 630,
      y: 75,
      floatDelay: 0.8,
      icon: (
        <div className="relative w-full h-full">
          <Image
            src="/images/approach/typescript.png"
            alt="TypeScript"
            fill
            quality={85}
            sizes="48px"
            className="object-contain rounded-md"
          />
        </div>
      ),
    },
    {
      id: 'threejs',
      name: 'Three.js / WebGL',
      category: 'Expériences 3D',
      description: 'Scènes 3D interactives, calculs GPU shaders et immersion sensorielle.',
      x: 820,
      y: 100,
      floatDelay: 0.2,
      icon: (
        <div className="relative w-full h-full">
          <Image
            src="/images/approach/Three.js.png"
            alt="Three.js"
            fill
            quality={85}
            sizes="48px"
            className="object-contain"
          />
        </div>
      ),
    },
    {
      id: 'figma',
      name: 'Figma Systems',
      category: 'Design & Tokens',
      description: 'Design systems scalables, bibliothèques UI partagées et prototypage.',
      x: 110,
      y: 280,
      floatDelay: 0.6,
      icon: (
        <svg viewBox="0 0 38 57" className="w-6 h-6 sm:w-7 sm:h-7" fill="none">
          <path d="M19 28.5C19 23.2533 23.2533 19 28.5 19C33.7467 19 38 23.2533 38 28.5C38 33.7467 33.7467 38 28.5 38C23.2533 38 19 33.7467 19 28.5Z" fill="#1ABCFE" />
          <path d="M0 47.5C0 42.2533 4.25329 38 9.5 38H19V47.5C19 52.7467 14.7467 57 9.5 57C4.25329 57 0 52.7467 0 47.5Z" fill="#0ACF83" />
          <path d="M19 0V19H28.5C33.7467 19 38 14.7467 38 9.5C38 4.25329 33.7467 0 28.5 0H19Z" fill="#FF7262" />
          <path d="M0 9.5C0 14.7467 4.25329 19 9.5 19H19V0H9.5C4.25329 0 0 4.25329 0 9.5Z" fill="#F24E1E" />
          <path d="M0 28.5C0 33.7467 4.25329 38 9.5 38H19V19H9.5C4.25329 19 0 23.2533 0 28.5Z" fill="#A259FF" />
        </svg>
      ),
    },
    {
      id: 'docker',
      name: 'Docker & Cloud',
      category: 'DevOps & Infra',
      description: 'Conteneurisation sécurisée, pipelines CI/CD et déploiements à l’échelle.',
      x: 890,
      y: 280,
      floatDelay: 1.0,
      icon: (
        <div className="relative w-full h-full">
          <Image
            src="/images/approach/Docker.png"
            alt="Docker"
            fill
            quality={85}
            sizes="48px"
            className="object-contain"
          />
        </div>
      ),
    },
    {
      id: 'python',
      name: 'Python & IA',
      category: 'LLM & Intelligence',
      description: 'Pipelines d’intelligence artificielle, RAG, NLP et modèles prédictifs.',
      x: 180,
      y: 460,
      floatDelay: 0.3,
      icon: (
        <svg viewBox="0 0 110 110" className="w-7 h-7 sm:w-8 sm:h-8">
          <path
            d="M54.5 2C26.6 2 28.3 14.1 28.3 14.1l.03 12.6h26.6v3.8H17.6S2 29 2 56.9c0 28 15.4 27.1 15.4 27.1h9.2v-12.9s-.5-15.4 15.1-15.4h26.1s14.6.2 14.6-14.1V14.1S84.7 2 54.5 2zm-15.3 8.4a4.6 4.6 0 110 9.2 4.6 4.6 0 010-9.2z"
            fill="#3776AB"
          />
          <path
            d="M55.5 108c27.9 0 26.2-12.1 26.2-12.1l-.03-12.6H55.1v-3.8h37.3s15.6 1.5 15.6-26.4c0-28-15.4-27.1-15.4-27.1h-9.2v12.9s.5 15.4-15.1 15.4H42.2s-14.6-.2-14.6 14.1v27.5S25.3 108 55.5 108zm15.3-8.4a4.6 4.6 0 110-9.2 4.6 4.6 0 010 9.2z"
            fill="#FFD43B"
          />
        </svg>
      ),
    },
    {
      id: 'tailwind',
      name: 'Tailwind CSS 4',
      category: 'Design Engine',
      description: 'Moteur de styles haute performance, responsive et tokens typographiques.',
      x: 370,
      y: 485,
      floatDelay: 0.7,
      icon: (
        <svg viewBox="0 0 24 24" className="w-7 h-7 sm:w-8 sm:h-8" fill="#06B6D4">
          <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.975 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.975 12 6.001 12z" />
        </svg>
      ),
    },
    {
      id: 'postgresql',
      name: 'PostgreSQL',
      category: 'Données & SQL',
      description: 'Base relationnelle ACID avancée, indexation spatiale & robustesse enterprise.',
      x: 630,
      y: 485,
      floatDelay: 0.5,
      icon: (
        <div className="relative w-full h-full">
          <Image
            src="/images/approach/PostgresSQL.png"
            alt="PostgreSQL"
            fill
            quality={85}
            sizes="48px"
            className="object-contain"
          />
        </div>
      ),
    },
    {
      id: 'fintech',
      name: 'Fintech & Mobile SDKs',
      category: 'Paiements & API',
      description: 'Connecteurs Wave, Orange Money, PayDunya, Stripe & Passerelles bancaires.',
      x: 820,
      y: 460,
      floatDelay: 0.9,
      icon: (
        <svg viewBox="0 0 24 24" className="w-7 h-7 sm:w-8 sm:h-8" fill="none">
          <rect x="2" y="4" width="20" height="16" rx="4" fill="#EB4604" />
          <path d="M2 9h20" stroke="#FFFFFF" strokeWidth="2" />
          <circle cx="7" cy="15" r="2" fill="#FFFFFF" />
          <path d="M14 15h4" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
        </svg>
      ),
    },
  ]

  // Center hub exact coordinate in 1000x560 space
  const center = { x: 500, y: 280 }

  return (
    <section className="py-24 lg:py-32 bg-white border-b border-[#e2e2e7] overflow-hidden" id="tech-stack">
      <Container>
        {/* ── Top Editorial Header ── */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 lg:gap-16 mb-12 sm:mb-16">
          <div className="space-y-4 max-w-xl">
            <RevealOnScroll>
              <Tag variant="v2">Technologies & Architecture</Tag>
            </RevealOnScroll>
            <RevealOnScroll delay={0.1}>
              <h2
                className="text-3xl sm:text-5xl lg:text-[52px] font-normal text-[#0A0A0A] leading-[1.08] tracking-[-0.035em]"
                style={{ fontFamily: 'var(--font-family--primary-font)' }}
              >
                Notre Constellation Technologique.
              </h2>
            </RevealOnScroll>
          </div>

          <RevealOnScroll delay={0.15}>
            <p className="text-sm sm:text-base text-neutral-500 font-light leading-relaxed max-w-md lg:text-right">
              Chaque brique est sélectionnée avec rigueur pour offrir une réactivité maximale, une évolutivité sans faille et une sécurité absolue.
            </p>
          </RevealOnScroll>
        </div>

        {/* ── Open Landscape Constellation Stage (Pure 3D Tactile Architecture) ── */}
        <div className="relative w-full min-h-[520px] sm:min-h-[580px] lg:min-h-[640px] flex items-center justify-center select-none">
          {/* ── SVG Connecting Bezier Lines Layer ── */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none z-0"
            viewBox="0 0 1000 560"
            preserveAspectRatio="none"
          >
            {nodes.map((node) => {
              const targetX = node.x
              const targetY = node.y
              const centerX = center.x
              const centerY = center.y

              // Organic bezier control points
              const deltaX = targetX - centerX
              const deltaY = targetY - centerY
              let cp1x = centerX + deltaX * 0.4
              let cp1y = centerY + deltaY * 0.1
              let cp2x = centerX + deltaX * 0.6
              let cp2y = centerY + deltaY * 0.9

              // Horizontal nodes (Figma & Docker) curve adjustments
              if (Math.abs(deltaY) < 30) {
                cp1y = centerY - 20
                cp2y = targetY - 20
              }

              const pathData = `M ${centerX} ${centerY} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${targetX} ${targetY}`
              const isActive = activeNode === node.id

              return (
                <g key={`circuit-${node.id}`}>
                  {/* Clean Dashed Connecting Line (Solid, No Glow) */}
                  <path
                    d={pathData}
                    fill="none"
                    stroke={isActive ? '#EB4604' : '#CBD5E1'}
                    strokeWidth={isActive ? '2.5' : '1.5'}
                    strokeDasharray={isActive ? 'none' : '5 7'}
                    className="transition-colors duration-200"
                  />
                </g>
              )
            })}
          </svg>

          {/* ── Central Master SPARKLINE Hub (3D Physical Tactile Block) ── */}
          <div
            className="absolute z-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center cursor-default"
          >
            {/* Master Core 3D Squircle Card */}
            <motion.div
              whileHover={{ y: -3 }}
              className="relative w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-[28px] sm:rounded-[34px] bg-white border-2 border-neutral-200 border-b-[5px] border-b-neutral-300/90 shadow-[0_12px_24px_rgba(0,0,0,0.08),0_4px_6px_rgba(0,0,0,0.04)] flex flex-col items-center justify-center p-3 text-neutral-900 z-10 group transition-all duration-200"
            >
              {/* Official SPARKLINE Pictogram Symbol */}
              <div className="relative w-10 h-10 sm:w-12 sm:h-12 mb-1 flex items-center justify-center">
                <Image
                  src="/images/brand/sparkline-symbol.svg"
                  alt="SPARKLINE Emblem"
                  fill
                  priority
                  className="object-contain"
                />
              </div>

              <span className="text-[10px] sm:text-[11px] font-mono uppercase font-bold tracking-wider text-neutral-900 leading-tight">
                SPARKLINE
              </span>
              <span className="text-[8px] sm:text-[9px] font-mono text-[#EB4604] font-bold tracking-widest">
                CORE ENGINE
              </span>
            </motion.div>
          </div>

          {/* ── Orbiting Technology Nodes (3D Physical Tactile Cards) ── */}
          {nodes.map((node) => {
            const isActive = activeNode === node.id
            const leftPercent = (node.x / 1000) * 100
            const topPercent = (node.y / 560) * 100

            return (
              <div
                key={node.id}
                style={{
                  left: `${leftPercent}%`,
                  top: `${topPercent}%`,
                  transform: 'translate(-50%, -50%)',
                }}
                className="absolute z-10"
                onMouseEnter={() => setActiveNode(node.id)}
                onMouseLeave={() => setActiveNode(null)}
              >
                <motion.div
                  animate={{
                    y: [0, -5, 0],
                  }}
                  transition={{
                    duration: 4.2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: node.floatDelay,
                  }}
                  whileHover={{ y: -4 }}
                  className={`relative cursor-pointer rounded-[22px] sm:rounded-[26px] bg-white p-3 sm:p-3.5 border transition-all duration-200 flex items-center gap-3 ${
                    isActive
                      ? 'border-[#EB4604] border-b-[4px] border-b-[#C93B03] shadow-[0_16px_32px_rgba(235,70,4,0.18),0_4px_8px_rgba(0,0,0,0.06)] z-30 scale-105'
                      : 'border-neutral-200/90 border-b-[4px] border-b-neutral-300 shadow-[0_10px_20px_rgba(0,0,0,0.06),0_2px_4px_rgba(0,0,0,0.04)] hover:border-neutral-300'
                  }`}
                >
                  {/* Real Official Technology Icon Container (3D Inset Box) */}
                  <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl bg-[#F4F5F8] border border-neutral-200/90 shadow-[inset_0_2px_4px_rgba(0,0,0,0.04)] flex items-center justify-center shrink-0 p-1.5 overflow-hidden">
                    {node.icon}
                  </div>

                  {/* Node Label Typography */}
                  <div className="text-left hidden sm:block pr-1.5">
                    <span className="text-xs sm:text-sm font-bold text-neutral-900 block leading-tight">
                      {node.name}
                    </span>
                    <span className="text-[10px] font-mono text-neutral-400 block leading-tight">
                      {node.category}
                    </span>
                  </div>

                  {/* Interactive Tooltip on Hover (3D Tactile Card) */}
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 6, scale: 0.96 }}
                        transition={{ duration: 0.15 }}
                        className="absolute left-1/2 -translate-x-1/2 top-full mt-3 w-56 sm:w-64 p-3.5 rounded-2xl bg-white text-neutral-900 text-left shadow-[0_18px_36px_rgba(0,0,0,0.12),0_4px_8px_rgba(0,0,0,0.04)] border border-neutral-200 border-b-[3px] border-b-neutral-300 z-50 pointer-events-none"
                      >
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-[10px] font-mono uppercase text-[#EB4604] font-bold tracking-wider">
                            {node.category}
                          </span>
                          <span className="w-1.5 h-1.5 rounded-full bg-[#EB4604]" />
                        </div>
                        <p className="text-xs text-neutral-600 font-normal leading-relaxed">
                          {node.description}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </div>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
