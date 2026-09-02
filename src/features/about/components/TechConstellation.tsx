'use client'

import React from 'react'
import { Container } from '@/components/layout/Container'
import { Tag } from '@/components/ui/Tag'
import { RevealOnScroll } from '@/components/motion/RevealOnScroll'

interface TechItem {
  name: string
  category: string
  color: string
  slug: string
  customUrl?: string
}

// ─── Extensive Tech Stack (Dev, DevOps, Cloud, Design, Mobile, Data) ───
const allTechs: TechItem[] = [
  // Frontend & Frameworks
  { name: 'Next.js 15', category: 'Fullstack & SSR', color: '#000000', slug: 'nextjs' },
  { name: 'React 19', category: 'UI & State', color: '#61DAFB', slug: 'react' },
  { name: 'TypeScript', category: 'Type Safety', color: '#3178C6', slug: 'typescript' },
  { name: 'Tailwind CSS', category: 'Design Engine', color: '#06B6D4', slug: 'tailwindcss' },
  { name: 'Vue.js', category: 'Framework', color: '#4FC08D', slug: 'vue' },
  { name: 'Three.js / WebGL', category: 'Expériences 3D', color: '#000000', slug: 'threejs' },

  // Design & Prototyping
  { name: 'Figma', category: 'Design Systems', color: '#F24E1E', slug: 'figma' },
  { name: 'Framer', category: 'Interactive UI', color: '#0055FF', slug: 'framer', customUrl: 'https://cdn.simpleicons.org/framer/000000' },
  { name: 'Photoshop', category: 'Asset Creation', color: '#31A8FF', slug: 'photoshop' },
  { name: 'Illustrator', category: 'Vector Branding', color: '#FF9A00', slug: 'illustrator' },

  // Cloud & Infrastructure
  { name: 'AWS', category: 'Cloud Infrastructure', color: '#FF9900', slug: 'aws' },
  { name: 'Google Cloud', category: 'Cloud Services', color: '#4285F4', slug: 'google-cloud' },
  { name: 'Vercel', category: 'Edge Deployment', color: '#000000', slug: 'vercel', customUrl: 'https://cdn.simpleicons.org/vercel/000000' },
  { name: 'Cloudflare', category: 'CDN & Security', color: '#F38020', slug: 'cloudflare' },

  // DevOps & CI/CD
  { name: 'Docker', category: 'Conteneurs', color: '#2496ED', slug: 'docker' },
  { name: 'Kubernetes', category: 'Orchestration', color: '#326CE5', slug: 'kubernetes' },
  { name: 'Terraform', category: 'Infrastructure as Code', color: '#7B42BC', slug: 'terraform' },
  { name: 'GitHub Actions', category: 'CI/CD Pipelines', color: '#2088FF', slug: 'github-actions' },
  { name: 'Nginx', category: 'Proxy & Gateway', color: '#009639', slug: 'nginx' },
  { name: 'Linux', category: 'System Kernel', color: '#FCC624', slug: 'linux' },

  // Backend & Databases
  { name: 'Node.js', category: 'Backend Runtime', color: '#339933', slug: 'nodejs' },
  { name: 'Python & IA', category: 'Intelligence & LLM', color: '#3776AB', slug: 'python' },
  { name: 'PostgreSQL', category: 'Relationnel ACID', color: '#4169E1', slug: 'postgresql' },
  { name: 'Redis', category: 'In-Memory Cache', color: '#DC382D', slug: 'redis' },
  { name: 'MongoDB', category: 'NoSQL Document', color: '#47A248', slug: 'mongodb' },
  { name: 'GraphQL', category: 'Schema & API', color: '#E10098', slug: 'graphql' },

  // Mobile & Cross-Platform
  { name: 'React Native', category: 'iOS & Android', color: '#61DAFB', slug: 'react' },
  { name: 'Flutter', category: 'Multiplateforme', color: '#02569B', slug: 'flutter' },
  { name: 'Swift', category: 'iOS Native', color: '#F05138', slug: 'swift' },

  // Payments & Ecosystem
  { name: 'Stripe', category: 'Global Payments', color: '#635BFF', slug: 'stripe' },
  { name: 'Wave & OM SDK', category: 'Fintech Afrique', color: '#EB4604', slug: 'wave', customUrl: 'https://www.socialnetlink.org/wp-content/uploads/2021/06/orange-money-et-wave.jpeg' },

  // Libraries & Services
  { name: 'Reicon', category: 'Icon Library', color: '#09090B', slug: 'reicon', customUrl: 'https://reicon.dev/favicon/android-chrome-192x192.png' },
  { name: 'Resend', category: 'Email API', color: '#000000', slug: 'resend', customUrl: 'https://cdn.simpleicons.org/resend/000000' },
]

// Split technologies into 5 balanced columns for vertical flow
function splitIntoColumns(items: TechItem[], numCols: number): TechItem[][] {
  const cols: TechItem[][] = Array.from({ length: numCols }, () => [])
  items.forEach((item, idx) => {
    cols[idx % numCols].push(item)
  })
  return cols
}

function TechCard({ tech }: { tech: TechItem }) {
  return (
    <div className="group relative flex items-center gap-4 px-4 py-3.5 rounded-2xl bg-white/80 backdrop-blur-sm border border-transparent hover:border-neutral-200/60 shadow-[0_1px_3px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)] transition-all duration-300 cursor-default select-none w-full overflow-hidden">
      {/* Subtle left accent line on hover */}
      <div
        className="absolute left-0 top-3 bottom-3 w-[3px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ backgroundColor: tech.color }}
      />

      {/* Free-floating logo with soft ambient halo — no box */}
      <div className="relative w-10 h-10 flex items-center justify-center shrink-0">
        {/* Ambient color halo behind icon */}
        <div
          className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-15 blur-lg transition-opacity duration-500 scale-150"
          style={{ background: tech.color }}
        />
        <img
          src={tech.customUrl || `https://cdn.reicon.dev/logos/${tech.slug}/original.svg`}
          alt={`${tech.name} Logo`}
          className={`relative z-10 w-7 h-7 group-hover:scale-110 transition-transform duration-300 ${tech.customUrl ? 'object-cover rounded-lg' : 'object-contain'}`}
          onError={(e) => {
            e.currentTarget.style.display = 'none';
            if (e.currentTarget.nextElementSibling) {
              (e.currentTarget.nextElementSibling as HTMLElement).style.display = 'flex';
            }
          }}
        />
        <div
          className="hidden relative z-10 text-xs font-black items-center justify-center w-7 h-7 rounded-lg"
          style={{ color: tech.color }}
        >
          {tech.name.charAt(0)}
        </div>
      </div>

      {/* Typography */}
      <div className="min-w-0 flex-1">
        <span className="text-[13px] font-semibold text-[#1A1A1A] block leading-tight truncate tracking-[-0.01em] group-hover:text-[#EB4604] transition-colors duration-300">
          {tech.name}
        </span>
        <span className="text-[9px] font-mono font-medium text-neutral-400 uppercase tracking-widest truncate block mt-0.5">
          {tech.category}
        </span>
      </div>
    </div>
  )
}

function ScrollColumn({ techs, speed, reverse = false }: { techs: TechItem[]; speed: number; reverse?: boolean }) {
  const trackClass = reverse ? 'animate-vertical-track-reverse' : 'animate-vertical-track'

  return (
    <div className="relative h-[360px] sm:h-[380px] overflow-hidden">
      <div className="flex flex-col gap-3">
        <div
          className={`flex flex-col gap-3 shrink-0 ${trackClass}`}
          style={{ animationDuration: `${speed}s` }}
        >
          {techs.map((tech, idx) => (
            <TechCard key={`t1-${tech.name}-${idx}`} tech={tech} />
          ))}
        </div>
        <div
          className={`flex flex-col gap-3 shrink-0 ${trackClass}`}
          style={{ animationDuration: `${speed}s` }}
          aria-hidden="true"
        >
          {techs.map((tech, idx) => (
            <TechCard key={`t2-${tech.name}-${idx}`} tech={tech} />
          ))}
        </div>
        <div
          className={`flex flex-col gap-3 shrink-0 ${trackClass}`}
          style={{ animationDuration: `${speed}s` }}
          aria-hidden="true"
        >
          {techs.map((tech, idx) => (
            <TechCard key={`t3-${tech.name}-${idx}`} tech={tech} />
          ))}
        </div>
      </div>
    </div>
  )
}

export function TechConstellation() {
  const columns = splitIntoColumns(allTechs, 5)

  // Subtle speed offsets per column for organic flowing motion
  const columnSpeeds = [22, 26, 20, 25, 23]

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-[#F6F6F8] border-b border-[#e2e2e7] overflow-hidden" id="tech-stack">
      <Container>
        {/* ── Top Editorial Header ── */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 lg:gap-16 mb-10 sm:mb-14">
          <div className="space-y-4 max-w-xl">
            <RevealOnScroll>
              <Tag variant="v2">Technologies & Architecture</Tag>
            </RevealOnScroll>
            <RevealOnScroll delay={0.1}>
              <h2
                className="text-3xl sm:text-5xl lg:text-[52px] font-normal text-[#0A0A0A] leading-[1.08] tracking-[-0.035em]"
                style={{ fontFamily: 'var(--font-family--primary-font)' }}
              >
                Notre Arsenal Technologique.
              </h2>
            </RevealOnScroll>
          </div>

          <RevealOnScroll delay={0.15}>
            <p className="text-sm sm:text-base text-neutral-500 font-light leading-relaxed max-w-md lg:text-right">
              Une stack moderne et évolutive : DevOps, Cloud haute disponibilité, Design Systems, Intelligence Artificielle et solutions de paiement panafricaines.
            </p>
          </RevealOnScroll>
        </div>

        {/* ── Multi-Column Infinite Vertical Scroll Grid with Seamless Alpha Mask ── */}
        <RevealOnScroll>
          <div
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-3.5 overflow-hidden"
            style={{
              maskImage: 'linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 1) 15%, rgba(0, 0, 0, 1) 85%, transparent 100%)',
              WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 1) 15%, rgba(0, 0, 0, 1) 85%, transparent 100%)',
            }}
          >
            {columns.map((col, colIdx) => (
              <div
                key={colIdx}
                className={`${colIdx >= 2 ? 'hidden sm:block' : ''} ${colIdx >= 3 ? 'hidden lg:block' : ''}`}
              >
                <ScrollColumn
                  techs={col}
                  speed={columnSpeeds[colIdx]}
                  reverse={colIdx % 2 === 1}
                />
              </div>
            ))}
          </div>
        </RevealOnScroll>
      </Container>
    </section>
  )
}
