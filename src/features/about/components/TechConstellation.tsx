'use client'

import React from 'react'
import Image from 'next/image'
import { Container } from '@/components/layout/Container'
import { Tag } from '@/components/ui/Tag'
import { RevealOnScroll } from '@/components/motion/RevealOnScroll'

interface TechItem {
  name: string
  category: string
  color: string
  icon: React.ReactNode
}

// ─── Extensive Tech Stack (Dev, DevOps, Cloud, Design, Mobile, Data) ───
const allTechs: TechItem[] = [
  // Frontend & Frameworks
  {
    name: 'Next.js 15',
    category: 'Fullstack & SSR',
    color: '#000000',
    icon: (
      <div className="relative w-full h-full">
        <Image src="/images/approach/Next.js.png" alt="Next.js" fill sizes="40px" className="object-contain" />
      </div>
    ),
  },
  {
    name: 'React 19',
    category: 'UI & State',
    color: '#61DAFB',
    icon: (
      <svg viewBox="-11.5 -10.23174 23 20.46348" className="w-6 h-6">
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
    name: 'TypeScript',
    category: 'Type Safety',
    color: '#3178C6',
    icon: (
      <div className="relative w-full h-full">
        <Image src="/images/approach/typescript.png" alt="TypeScript" fill sizes="40px" className="object-contain rounded-sm" />
      </div>
    ),
  },
  {
    name: 'Tailwind CSS',
    category: 'Design Engine',
    color: '#06B6D4',
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="#06B6D4">
        <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.975 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.975 12 6.001 12z" />
      </svg>
    ),
  },
  {
    name: 'Vue.js',
    category: 'Framework',
    color: '#4FC08D',
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="#4FC08D">
        <path d="M2 3l10 17L22 3h-4l-6 10L6 3H2zm6 0l4 7 4-7h-3l-1 2-1-2H8z" />
      </svg>
    ),
  },
  {
    name: 'Three.js / WebGL',
    category: 'Expériences 3D',
    color: '#000000',
    icon: (
      <div className="relative w-full h-full">
        <Image src="/images/approach/Three.js.png" alt="Three.js" fill sizes="40px" className="object-contain" />
      </div>
    ),
  },

  // Design & Prototyping
  {
    name: 'Figma',
    category: 'Design Systems',
    color: '#F24E1E',
    icon: (
      <svg viewBox="0 0 38 57" className="w-5 h-5" fill="none">
        <path d="M19 28.5C19 23.2533 23.2533 19 28.5 19C33.7467 19 38 23.2533 38 28.5C38 33.7467 33.7467 38 28.5 38C23.2533 38 19 33.7467 19 28.5Z" fill="#1ABCFE" />
        <path d="M0 47.5C0 42.2533 4.25329 38 9.5 38H19V47.5C19 52.7467 14.7467 57 9.5 57C4.25329 57 0 52.7467 0 47.5Z" fill="#0ACF83" />
        <path d="M19 0V19H28.5C33.7467 19 38 14.7467 38 9.5C38 4.25329 33.7467 0 28.5 0H19Z" fill="#FF7262" />
        <path d="M0 9.5C0 14.7467 4.25329 19 9.5 19H19V0H9.5C4.25329 0 0 4.25329 0 9.5Z" fill="#F24E1E" />
        <path d="M0 28.5C0 33.7467 4.25329 38 9.5 38H19V19H9.5C4.25329 19 0 23.2533 0 28.5Z" fill="#A259FF" />
      </svg>
    ),
  },
  {
    name: 'Framer',
    category: 'Interactive UI',
    color: '#0055FF',
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="#0055FF">
        <path d="M4 0h16v8H12l8 8H4V8h8L4 0zm0 16h8v8l-8-8z" />
      </svg>
    ),
  },
  {
    name: 'Photoshop',
    category: 'Asset Creation',
    color: '#31A8FF',
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="#31A8FF">
        <path d="M19.75 2H4.25A2.25 2.25 0 002 4.25v15.5A2.25 2.25 0 004.25 22h15.5A2.25 2.25 0 0022 19.75V4.25A2.25 2.25 0 0019.75 2zM9.8 14.6H8.1v2.1H6.3V7.5h3.5c2.1 0 3.2 1.1 3.2 3.1 0 2.6-1.6 4-3.2 4zm6.2 2.2c-1.8 0-3-1-3-2.3 0-1.5 1.2-2.2 3.2-2.4l1.3-.1v-.3c0-.7-.4-1-1.2-1-.8 0-1.3.3-1.5.9l-1.5-.5c.4-1.2 1.5-1.8 3.1-1.8 1.9 0 2.9.9 2.9 2.7v4.6h-1.6v-.8c-.5.6-1.2 1-2.1 1z" />
      </svg>
    ),
  },
  {
    name: 'Illustrator',
    category: 'Vector Branding',
    color: '#FF9A00',
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="#FF9A00">
        <path d="M19.75 2H4.25A2.25 2.25 0 002 4.25v15.5A2.25 2.25 0 004.25 22h15.5A2.25 2.25 0 0022 19.75V4.25A2.25 2.25 0 0019.75 2zM12.2 16.7h-1.9l-.8-2.4H6.5l-.8 2.4H3.9L7.2 7.3h1.9l3.1 9.4zM16.3 16.7h-1.8V9.8h1.8v6.9zm-.9-8c-.6 0-1.1-.5-1.1-1.1 0-.6.5-1 1.1-1 .6 0 1 .4 1 1 0 .6-.4 1.1-1 1.1z" />
      </svg>
    ),
  },

  // Cloud & Infrastructure
  {
    name: 'AWS',
    category: 'Cloud Infrastructure',
    color: '#FF9900',
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="#FF9900">
        <path d="M6.763 10.036c0 .296.032.535.088.71.064.176.144.368.256.576.04.063.056.127.056.183 0 .08-.048.16-.152.24l-.503.335a.383.383 0 01-.208.072c-.08 0-.16-.04-.239-.112a2.47 2.47 0 01-.287-.375 6.18 6.18 0 01-.248-.471c-.622.734-1.405 1.101-2.347 1.101-.67 0-1.205-.191-1.596-.574-.391-.384-.59-.894-.59-1.533 0-.678.239-1.23.726-1.644.487-.415 1.133-.623 1.955-.623.272 0 .551.024.846.064.296.04.6.104.918.176v-.583c0-.607-.127-1.03-.375-1.277-.255-.248-.686-.367-1.3-.367-.28 0-.568.032-.863.104-.296.072-.583.16-.863.272a2.287 2.287 0 01-.28.104.488.488 0 01-.127.024c-.112 0-.168-.08-.168-.247v-.391c0-.128.016-.224.056-.28a.597.597 0 01.224-.167c.28-.144.616-.264 1.004-.36a4.84 4.84 0 011.244-.152c.95 0 1.644.216 2.091.647.44.43.662 1.085.662 1.963v2.586z" />
        <path d="M18.72 15.654a.93.93 0 01-.088.016 1.2 1.2 0 01-.12.008c-.128 0-.24-.04-.344-.128-.104-.088-.176-.248-.224-.48l-.984-4.052-.984 4.052c-.048.232-.12.392-.224.48-.104.088-.224.128-.36.128a.93.93 0 01-.12-.008.93.93 0 01-.088-.016l-1.408-4.652a2.98 2.98 0 01-.12-.44c0-.176.088-.28.264-.28h.544c.136 0 .232.016.296.056.064.04.112.128.144.272l.688 3.624.928-3.624c.04-.152.088-.232.152-.272.064-.04.168-.056.296-.056h.44c.136 0 .24.016.304.056.064.04.112.128.152.272l.944 3.672.712-3.672c.032-.152.08-.232.144-.272.064-.04.16-.056.296-.056h.52c.176 0 .264.096.264.28a1.1 1.1 0 01-.032.2 2.98 2.98 0 01-.088.248l-1.432 4.644z" />
      </svg>
    ),
  },
  {
    name: 'Google Cloud',
    category: 'Cloud Services',
    color: '#4285F4',
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6">
        <path d="M12.19 5.6l2.85-2.85.14-.78A9.99 9.99 0 002.6 8.8l.96-.07 4.28-.71s.22-.36.33-.34a5.71 5.71 0 014.02-2.08z" fill="#EA4335" />
        <path d="M19.63 8.8A10 10 0 0015.18 2l-2.99 2.99a5.71 5.71 0 012.1 4.3v.54a2.86 2.86 0 010 5.71h-2.1l-.54.57v3.42l.54.54h2.1a7.14 7.14 0 005.34-11.27z" fill="#4285F4" />
        <path d="M5.04 19.97a10 10 0 0010.14.05l-2.99-2.99h-2.1a2.86 2.86 0 01-2.42-4.35L3.38 8.8a10 10 0 001.66 11.17z" fill="#34A853" />
        <path d="M12.19 14.83a2.86 2.86 0 01-2.42-4.35L5.49 6.6a6.81 6.81 0 00-.92 2.2l.96-.07 4.28-.71a5.71 5.71 0 012.38 6.81z" fill="#FBBC05" />
      </svg>
    ),
  },
  {
    name: 'Vercel',
    category: 'Edge Deployment',
    color: '#000000',
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="#000000">
        <path d="M12 1L24 22H0L12 1z" />
      </svg>
    ),
  },
  {
    name: 'Cloudflare',
    category: 'CDN & Security',
    color: '#F38020',
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="#F38020">
        <path d="M18.244 10.97a6.236 6.236 0 00-4.832-4.823c-.347-.07-.7-.107-1.054-.11a6.238 6.238 0 00-5.836 4.025A4.544 4.544 0 002.5 14.5a4.5 4.5 0 004.5 4.5h11.5a4 4 0 004-4c0-1.89-1.31-3.48-3.08-3.89l-.176-.14z" />
      </svg>
    ),
  },

  // DevOps & CI/CD
  {
    name: 'Docker',
    category: 'Conteneurs',
    color: '#2496ED',
    icon: (
      <div className="relative w-full h-full">
        <Image src="/images/approach/Docker.png" alt="Docker" fill sizes="40px" className="object-contain" />
      </div>
    ),
  },
  {
    name: 'Kubernetes',
    category: 'Orchestration',
    color: '#326CE5',
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="#326CE5">
        <path d="M10.204 14.35l.007.01-.999 2.413a5.171 5.171 0 01-2.075-2.597l2.578-.437.004.005a.44.44 0 01.485.606zm3.59 0a.44.44 0 01.486-.606l.004-.005 2.577.437a5.18 5.18 0 01-2.074 2.597l-.999-2.413.007-.01zm-5.015-3.96l.005-.003-1.74-1.963a5.18 5.18 0 013.304-1.18l-.005 2.738-.004.003a.44.44 0 01-.56.406zm6.442 0a.44.44 0 01-.56-.406l-.003-.003-.005-2.738a5.18 5.18 0 013.304 1.18l-1.74 1.963.005.003zm-5.553 2.895l.005-.007-2.12-1.586a5.18 5.18 0 01.536-3.221l2.12 1.586-.005.007a.44.44 0 01-.536 3.22zM12 2a10 10 0 100 20 10 10 0 000-20z" />
      </svg>
    ),
  },
  {
    name: 'Terraform',
    category: 'Infrastructure as Code',
    color: '#7B42BC',
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="#7B42BC">
        <path d="M1.44 0v8.4l7.2 4.15V4.16L1.44 0zm8.64 4.91v8.4l7.2 4.15V9.06l-7.2-4.15zm7.2-.76L10.08.01v8.4l7.2 4.15V4.15zM10.08 14.11v8.4l7.2 4.15v-8.4l-7.2-4.15z" />
      </svg>
    ),
  },
  {
    name: 'GitHub Actions',
    category: 'CI/CD Pipelines',
    color: '#2088FF',
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="#2088FF">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
      </svg>
    ),
  },
  {
    name: 'Nginx',
    category: 'Proxy & Gateway',
    color: '#009639',
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="#009639">
        <path d="M12 0L1.75 6v12L12 24l10.25-6V6zm-1.47 16.06l-3.04-5.3v5.3H5.7V7.94h2.03l3.04 5.3v-5.3h1.79v8.12zm5.94 0H14.5l-3.04-5.3v5.3h-1.79V7.94h1.96l3.04 5.3v-5.3h1.79v8.12z" />
      </svg>
    ),
  },
  {
    name: 'Linux',
    category: 'System Kernel',
    color: '#FCC624',
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="#111">
        <path d="M12.504 0c-.155 0-.315.008-.48.021-4.226.333-3.105 4.807-3.17 6.298-.076 1.092-.3 1.953-1.05 3.02-.885 1.051-2.127 2.75-2.716 4.521-.278.832-.41 1.684-.287 2.489a.424.424 0 00-.11.135c-.26.268-.45.6-.663.839-.199.199-.485.267-.797.4-.313.136-.658.269-.864.68-.09.189-.136.394-.132.602.004.231.063.456.155.63.185.352.575.52.93.546.262.019.5-.08.738-.174.132-.052.356-.157.484-.157.056 0 .088.018.086.064l-.002.055c-.01.143-.048.405.008.52.063.131.182.16.334.196.244.058.596.036.818-.055.094-.04.207-.1.281-.2.15-.195.12-.498.038-.67-.032-.067-.083-.13-.108-.243-.017-.076-.027-.248-.021-.378.006-.126.023-.178.053-.178.023 0 .058.022.088.074l.107.175c.218.302.502.408.82.41.368.003.67-.136.724-.36.025-.103-.003-.196-.066-.27a.52.52 0 00-.26-.178c-.078-.027-.162-.04-.239-.064-.258-.079-.484-.233-.484-.512 0-.195.068-.49.192-.721.227-.423 1.143-1.76 1.143-1.76.1-.17.238-.35.368-.518.08-.103.166-.206.244-.304l.055-.067.003.002c.39-.438.684-1.097.898-1.853a12.46 12.46 0 00.35-2.195c.053-1.06.2-1.987.472-2.775.413-1.201 1.137-2.094 2.148-2.389.297-.087.588-.12.868-.09.234.026.427.107.587.174.27.113.488.28.672.514.366.466.584 1.186.584 2.148 0 .672-.035 1.307-.108 1.883a12.4 12.4 0 01-.406 2.086c-.207.735-.493 1.403-.876 1.847l.003-.002.055.067c.078.098.164.201.244.304.13.168.269.347.368.518 0 0 .916 1.337 1.143 1.76.124.231.192.526.192.721 0 .279-.226.433-.484.512-.077.024-.16.037-.239.064a.52.52 0 00-.26.178c-.063.074-.091.167-.066.27.054.224.356.363.724.36.318-.002.602-.108.82-.41l.107-.175c.03-.052.065-.074.088-.074.03 0 .047.052.053.178.006.13-.004.302-.02.378-.026.113-.077.176-.109.243-.082.172-.112.475.038.67.074.1.187.16.281.2.222.091.574.113.818.055.152-.036.271-.065.334-.196.056-.115.018-.377.008-.52l-.002-.055c-.002-.046.03-.064.086-.064.128 0 .352.105.484.157.239.094.476.193.738.174.355-.026.745-.194.93-.546.092-.174.151-.399.155-.63.004-.208-.042-.413-.132-.602-.206-.411-.551-.544-.864-.68-.312-.133-.598-.201-.797-.4a3.79 3.79 0 01-.663-.839.424.424 0 00-.11-.135c.123-.805-.009-1.657-.287-2.489-.589-1.771-1.831-3.47-2.716-4.521-.75-1.067-.974-1.928-1.05-3.02-.065-1.491 1.057-5.965-3.17-6.298A5.84 5.84 0 0012.504 0z" />
      </svg>
    ),
  },

  // Backend & Databases
  {
    name: 'Node.js',
    category: 'Backend Runtime',
    color: '#339933',
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="#339933">
        <path d="M12 1.85c-.27 0-.55.07-.78.2l-7.44 4.3c-.48.28-.78.8-.78 1.36v8.58c0 .56.3 1.08.78 1.36l1.95 1.12c.95.46 1.27.46 1.7.46 1.4 0 2.2-.85 2.2-2.33V8.44c0-.12-.1-.22-.22-.22H8.3c-.13 0-.23.1-.23.22v8.07c0 .66-.68 1.31-1.77.76L4.2 16.39c-.08-.04-.12-.12-.12-.2V7.6c0-.09.05-.17.12-.21l7.44-4.29c.08-.04.17-.04.24 0l7.44 4.29c.07.04.12.12.12.21v8.58c0 .08-.05.16-.12.2l-7.44 4.29c-.07.04-.16.04-.24 0l-1.88-1.12c-.06-.03-.13-.04-.2-.01-.54.24-.65.28-1.16.42-.12.04-.32.1.07.29l2.48 1.47c.24.13.5.2.78.2.27 0 .54-.07.78-.2l7.44-4.29c.48-.28.78-.8.78-1.36V7.71c0-.56-.3-1.08-.78-1.36l-7.44-4.3c-.23-.13-.5-.2-.78-.2z" />
      </svg>
    ),
  },
  {
    name: 'Python & IA',
    category: 'Intelligence & LLM',
    color: '#3776AB',
    icon: (
      <svg viewBox="0 0 110 110" className="w-6 h-6">
        <path d="M54.5 2C26.6 2 28.3 14.1 28.3 14.1l.03 12.6h26.6v3.8H17.6S2 29 2 56.9c0 28 15.4 27.1 15.4 27.1h9.2v-12.9s-.5-15.4 15.1-15.4h26.1s14.6.2 14.6-14.1V14.1S84.7 2 54.5 2zm-15.3 8.4a4.6 4.6 0 110 9.2 4.6 4.6 0 010-9.2z" fill="#3776AB" />
        <path d="M55.5 108c27.9 0 26.2-12.1 26.2-12.1l-.03-12.6H55.1v-3.8h37.3s15.6 1.5 15.6-26.4c0-28-15.4-27.1-15.4-27.1h-9.2v12.9s.5 15.4-15.1 15.4H42.2s-14.6-.2-14.6 14.1v27.5S25.3 108 55.5 108zm15.3-8.4a4.6 4.6 0 110-9.2 4.6 4.6 0 010 9.2z" fill="#FFD43B" />
      </svg>
    ),
  },
  {
    name: 'PostgreSQL',
    category: 'Relationnel ACID',
    color: '#4169E1',
    icon: (
      <div className="relative w-full h-full">
        <Image src="/images/approach/PostgresSQL.png" alt="PostgreSQL" fill sizes="40px" className="object-contain" />
      </div>
    ),
  },
  {
    name: 'Redis',
    category: 'In-Memory Cache',
    color: '#DC382D',
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="#DC382D">
        <path d="M10.5 2.661l.54.997-1.797.644 2.409.166.56 1.166 1.08-1.67 2.31-.124-1.774-.86.54-.982-1.48.5-1.387-.837zM3.5 9.68c2.94 1.53 7.36 2.59 9.51 3.27 2.15-.69 6.57-1.74 9.51-3.27-2.94-1.53-7.36-2.59-9.51-3.27-2.15.69-6.57 1.74-9.51 3.27zm8.01-2.12c1.68 0 3.04.51 3.04 1.14 0 .63-1.36 1.14-3.04 1.14-1.68 0-3.04-.51-3.04-1.14 0-.63 1.36-1.14 3.04-1.14z" />
      </svg>
    ),
  },
  {
    name: 'MongoDB',
    category: 'NoSQL Document',
    color: '#47A248',
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="#47A248">
        <path d="M17.193 9.555c-1.264-5.58-4.252-7.414-4.573-8.115-.28-.394-.53-.954-.735-1.44-.036.495-.055.685-.523 1.184-.723.566-4.438 3.682-4.74 10.02-.282 5.912 4.27 9.435 4.888 9.884l.07.05A73.49 73.49 0 0111.91 24h.481c.114-1.032.284-2.056.51-3.07.417-.296.604-.463.85-.693a11.342 11.342 0 003.639-8.464c.01-.814-.103-1.662-.197-2.218zm-5.336 8.195s0-8.291.275-8.29c.213 0 .49 10.695.49 10.695-.381-.045-.765-1.76-.765-2.405z" />
      </svg>
    ),
  },
  {
    name: 'GraphQL',
    category: 'Schema & API',
    color: '#E10098',
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="#E10098">
        <path d="M12.002 0a2.138 2.138 0 100 4.277 2.138 2.138 0 000-4.277zm8.54 4.931a2.138 2.138 0 100 4.277 2.138 2.138 0 000-4.277zm0 9.862a2.138 2.138 0 100 4.277 2.138 2.138 0 000-4.277zm-17.08 0a2.138 2.138 0 100 4.277 2.138 2.138 0 000-4.277zm0-9.862a2.138 2.138 0 100 4.277 2.138 2.138 0 000-4.277zm8.54 14.862a2.138 2.138 0 100 4.276 2.138 2.138 0 000-4.276zM5.38 7.47l.96-1.66 12.28 7.1-.96 1.66zm0 9.06l12.28-7.1.96 1.66-12.28 7.1zM4.16 8v8h1.92V8z" />
      </svg>
    ),
  },

  // Mobile & Cross-Platform
  {
    name: 'React Native',
    category: 'iOS & Android',
    color: '#61DAFB',
    icon: (
      <svg viewBox="-11.5 -10.23174 23 20.46348" className="w-6 h-6">
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
    name: 'Flutter',
    category: 'Multiplateforme',
    color: '#02569B',
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6">
        <path d="M14.314 0L2.3 12 6.13 15.83 22.15 0H14.314zM14.314 11.147L8.543 16.918 14.314 22.69 22.15 22.69 16.381 16.92 22.15 11.15H14.314z" fill="#02569B" />
      </svg>
    ),
  },
  {
    name: 'Swift',
    category: 'iOS Native',
    color: '#F05138',
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="#F05138">
        <path d="M7.508 0c-.287 0-.573 0-.86.002-.241.002-.483.003-.724.01-.132.003-.263.009-.395.015A9.154 9.154 0 004.122.2a5.3 5.3 0 00-1.162.445A4.243 4.243 0 001.14 2.48 5.3 5.3 0 00.695 3.64a9.154 9.154 0 00-.173 1.407c-.006.132-.012.264-.015.395-.007.241-.008.483-.01.724C.496 6.454.496 6.74.496 7.027v9.945c0 .287 0 .573.002.86.002.241.003.483.01.724.003.132.009.263.015.395.02.492.064.973.173 1.407a5.3 5.3 0 00.445 1.162A4.243 4.243 0 002.96 23.34a5.3 5.3 0 001.162.445c.434.109.915.153 1.407.173.132.006.263.012.395.015.241.007.483.008.724.01.287.001.573.002.86.002h9.945c.287 0 .574 0 .86-.002.241-.002.483-.003.724-.01.132-.003.264-.009.395-.015a9.154 9.154 0 001.407-.173 5.3 5.3 0 001.162-.445 4.243 4.243 0 001.82-1.82 5.3 5.3 0 00.445-1.162c.109-.434.153-.915.173-1.407.006-.132.012-.264.015-.395.007-.241.008-.483.01-.724.001-.287.002-.573.002-.86V7.027c0-.287 0-.573-.002-.86a33.02 33.02 0 00-.01-.724c-.003-.132-.009-.263-.015-.395a9.154 9.154 0 00-.173-1.407 5.3 5.3 0 00-.445-1.162A4.243 4.243 0 0021.04.66 5.3 5.3 0 0019.878.215a9.154 9.154 0 00-1.407-.173c-.131-.006-.263-.012-.395-.015A33.02 33.02 0 0017.352.017c-.287-.002-.573-.002-.86-.002H7.508zM16.93 17.727c-3.81 2.427-9.058 1.46-12.735-2.186a11.42 11.42 0 01-.454-.51 21.68 21.68 0 005.382 1.816c2.987.554 5.76.155 7.807-1.12z" />
      </svg>
    ),
  },

  // Payments & Ecosystem
  {
    name: 'Stripe',
    category: 'Global Payments',
    color: '#635BFF',
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="#635BFF">
        <path d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697 0 12.165 0 9.667 0 7.589.654 6.104 1.872 4.56 3.147 3.757 4.918 3.757 7.045c0 4.217 2.578 5.921 6.758 7.377 2.514.867 3.385 1.553 3.385 2.564 0 .989-.846 1.639-2.412 1.639-1.897 0-5.173-.994-7.322-2.359L3.2 21.8C5.37 23.074 8.74 24 11.957 24c2.647 0 4.864-.612 6.359-1.756 1.636-1.244 2.483-3.117 2.483-5.394 0-4.366-2.66-6.02-6.823-7.7" />
      </svg>
    ),
  },
  {
    name: 'Wave & OM SDK',
    category: 'Fintech Afrique',
    color: '#EB4604',
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none">
        <rect x="2" y="4" width="20" height="16" rx="4" fill="#EB4604" />
        <path d="M2 9h20" stroke="#FFFFFF" strokeWidth="2" />
        <circle cx="7" cy="15" r="2" fill="#FFFFFF" />
        <path d="M14 15h4" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
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
    <div className="group relative flex items-center gap-3.5 p-3 sm:p-3.5 rounded-[20px] bg-gradient-to-b from-[#FFFFFF] via-[#FDFDFE] to-[#F4F5F8] border border-neutral-200/90 border-b-[3.5px] border-b-[#D5D8DF] shadow-[0_4px_12px_rgba(0,0,0,0.03),0_1px_3px_rgba(0,0,0,0.02),inset_0_1px_0_rgba(255,255,255,1)] hover:border-b-[#C3C7D0] hover:shadow-[0_8px_20px_rgba(0,0,0,0.06),inset_0_1px_0_rgba(255,255,255,1)] transition-all duration-200 cursor-default select-none w-full">
      {/* Top Glossy Light Highlight */}
      <div className="absolute inset-x-4 top-0 h-[1px] bg-gradient-to-r from-transparent via-white to-transparent pointer-events-none" />

      {/* 3D Inset Icon Squircle Well */}
      <div
        className="w-11 h-11 rounded-[14px] flex items-center justify-center shrink-0 p-2 relative bg-gradient-to-b from-white to-[#F0F2F6] border border-neutral-200/80 border-b-[2px] border-b-neutral-300/80 shadow-[inset_0_1px_2px_rgba(255,255,255,1),0_2px_5px_rgba(0,0,0,0.04)]"
      >
        {/* Subtle Ambient Color Glow behind Icon */}
        <div
          className="absolute inset-1 rounded-xl opacity-20 pointer-events-none"
          style={{ background: tech.color }}
        />
        <div className="relative z-10 w-full h-full flex items-center justify-center">
          {tech.icon}
        </div>
      </div>

      {/* Typography & 3D Micro Badge */}
      <div className="min-w-0 flex-1">
        <span className="text-[13px] font-bold text-[#0A0A0A] block leading-tight truncate tracking-[-0.01em] group-hover:text-[#EB4604] transition-colors">
          {tech.name}
        </span>
        <div className="flex items-center gap-1.5 mt-1">
          <span
            className="w-1.5 h-1.5 rounded-full shrink-0"
            style={{ backgroundColor: tech.color }}
          />
          <span className="text-[9.5px] font-mono font-medium text-neutral-500 uppercase tracking-wider truncate">
            {tech.category}
          </span>
        </div>
      </div>
    </div>
  )
}

function ScrollColumn({ techs, speed }: { techs: TechItem[]; speed: number }) {
  return (
    <div className="relative h-[360px] sm:h-[380px] overflow-hidden">
      {/* 3 identical tracks moving in lockstep with exact gap-3 (12px) offset */}
      <div className="flex flex-col gap-3">
        <div
          className="flex flex-col gap-3 shrink-0 animate-vertical-track"
          style={{ animationDuration: `${speed}s` }}
        >
          {techs.map((tech, idx) => (
            <TechCard key={`t1-${tech.name}-${idx}`} tech={tech} />
          ))}
        </div>
        <div
          className="flex flex-col gap-3 shrink-0 animate-vertical-track"
          style={{ animationDuration: `${speed}s` }}
          aria-hidden="true"
        >
          {techs.map((tech, idx) => (
            <TechCard key={`t2-${tech.name}-${idx}`} tech={tech} />
          ))}
        </div>
        <div
          className="flex flex-col gap-3 shrink-0 animate-vertical-track"
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
                />
              </div>
            ))}
          </div>
        </RevealOnScroll>
      </Container>
    </section>
  )
}

