'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { TeamMember } from '@/types'

interface TeamCardBadgeProps {
  member: TeamMember
  index?: number
}

export function TeamCardBadge({ member }: TeamCardBadgeProps) {
  const [isFlipped, setIsFlipped] = useState(false)
  const avatarSrc = member.avatar || '/images/brand/Seydina.png'

  return (
    <div
      className="relative w-full aspect-[7/9.8] select-none cursor-pointer group"
      style={{ perspective: '1200px' }}
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
      onClick={() => setIsFlipped((prev) => !prev)}
      role="button"
      tabIndex={0}
      aria-label={`Carte de ${member.name} — Cliquer ou survoler pour détails`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          setIsFlipped((prev) => !prev)
        }
      }}
    >
      {/* ── 3D Flipper Box with GPU Acceleration ── */}
      <div
        className="relative w-full h-full rounded-[24px] sm:rounded-[28px] lg:rounded-[32px] will-change-transform"
        style={{
          transformStyle: 'preserve-3d',
          transform: isFlipped ? 'rotateY(180deg) translateY(-8px) scale(1.02)' : 'rotateY(0deg) translateY(0) scale(1)',
          transition: 'transform 0.75s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.5s ease',
          boxShadow: isFlipped
            ? '0 30px 70px -10px rgba(0, 0, 0, 0.15), 0 15px 35px rgba(235, 70, 4, 0.12)'
            : '0 10px 30px rgba(0, 0, 0, 0.05)',
        }}
      >
        {/* ═══════════════════════════════════════════════════════════
            FRONT FACE: Official Poster Badge Image
            ═══════════════════════════════════════════════════════════ */}
        <div
          className="absolute inset-0 w-full h-full rounded-[24px] sm:rounded-[28px] lg:rounded-[32px] bg-white border border-[#E5E7EB] overflow-hidden flex flex-col justify-between"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
          }}
        >
          <div className="relative w-full h-full">
            <Image
              src={avatarSrc}
              alt={`${member.name} — ${member.role}`}
              fill
              quality={100}
              unoptimized
              className="object-cover"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 340px"
            />

            {/* Subtle Interactive Flip Badge Hint on Front */}
            <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-neutral-800 text-[10px] font-mono border border-neutral-200 shadow-md">
                <span className="text-[#EB4604]">↺</span>
                <span>Détails</span>
              </span>
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════
            BACK FACE: Elaborate 3D Detailed Profile in LIGHT MODE
            ═══════════════════════════════════════════════════════════ */}
        <div
          className="absolute inset-0 w-full h-full rounded-[24px] sm:rounded-[28px] lg:rounded-[32px] bg-white border border-neutral-200/90 text-neutral-900 p-5 sm:p-6 flex flex-col justify-between overflow-hidden shadow-2xl"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        >
          {/* Subtle Ambient Background Watermark */}
          <div className="absolute -top-12 -right-12 w-44 h-44 opacity-[0.06] pointer-events-none select-none">
            <Image
              src="/images/brand/sparkline-symbol.svg"
              alt="Watermark"
              fill
              className="object-contain"
            />
          </div>

          {/* 1. Header Bar: Brand + Department Tag */}
          <div className="relative z-10 flex items-center justify-between border-b border-neutral-100 pb-3 shrink-0">
            <div className="flex items-center gap-1.5">
              <div className="relative w-5 h-5 shrink-0">
                <Image
                  src="/images/brand/sparkline-symbol.svg"
                  alt="Sparkline Symbol"
                  fill
                  className="object-contain"
                />
              </div>
              <span
                className="text-sm font-bold text-[#0A0A0A] tracking-tight"
                style={{ fontFamily: 'var(--font-family--primary-font)' }}
              >
                Sparkline
              </span>
            </div>

            <span className="px-2.5 py-0.5 rounded-full bg-[#EB4604]/10 border border-[#EB4604]/25 text-[#EB4604] text-[9.5px] sm:text-[10px] font-mono font-semibold uppercase tracking-wider">
              {member.department || 'Talent'}
            </span>
          </div>

          {/* 2. Main Identity & Bio */}
          <div className="relative z-10 space-y-2.5 my-auto py-1">
            <div className="space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 font-semibold block">
                {member.experienceYears}+ ans d&apos;expérience
              </span>
              <h3
                className="text-lg sm:text-xl font-bold text-[#0A0A0A] tracking-tight leading-tight"
                style={{ fontFamily: 'var(--font-family--primary-font)' }}
              >
                {member.name}
              </h3>
              <p className="text-xs font-mono text-[#EB4604] font-semibold leading-snug">
                {member.role}
              </p>
            </div>

            <p className="text-neutral-600 text-[11px] sm:text-xs font-light leading-relaxed line-clamp-3">
              {member.bio}
            </p>

            {/* Skills Pills in Light Mode */}
            {member.skills && (
              <div className="flex flex-wrap gap-1 pt-1">
                {member.skills.slice(0, 4).map((skill, sIdx) => (
                  <span
                    key={sIdx}
                    className="px-2 py-0.5 rounded-md bg-neutral-100 border border-neutral-200 text-[9.5px] font-mono text-neutral-700"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* 3. Direct Contact & Social Links */}
          <div className="relative z-10 space-y-2 border-t border-neutral-100 pt-3 shrink-0">
            {/* Contact Rows */}
            <div className="space-y-1 text-[10px] sm:text-[11px] font-mono">
              {member.email && (
                <a
                  href={`mailto:${member.email}`}
                  onClick={(e) => e.stopPropagation()}
                  className="flex items-center gap-2 text-neutral-700 hover:text-[#EB4604] transition-colors truncate group/link"
                >
                  <span className="text-[#EB4604] shrink-0">✉</span>
                  <span className="truncate underline decoration-neutral-300 group-hover/link:decoration-[#EB4604]">
                    {member.email}
                  </span>
                </a>
              )}

              {member.phone && (
                <a
                  href={`tel:${member.phone.replace(/\s+/g, '')}`}
                  onClick={(e) => e.stopPropagation()}
                  className="flex items-center gap-2 text-neutral-700 hover:text-[#EB4604] transition-colors"
                >
                  <span className="text-[#EB4604] shrink-0">📞</span>
                  <span>{member.phone}</span>
                </a>
              )}

              <div className="flex items-center gap-2 text-neutral-400 text-[9.5px]">
                <span className="text-neutral-400">📍</span>
                <span>Dakar, Sénégal</span>
              </div>
            </div>

            {/* Social Buttons Dock in Light Mode */}
            <div className="pt-2 flex items-center gap-2">
              {member.socials?.linkedin && (
                <a
                  href={member.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="flex-1 py-2 px-3 rounded-full bg-[#0A66C2] hover:bg-[#084E96] text-white text-[11px] font-semibold text-center transition-all duration-300 flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <span>LinkedIn</span>
                  <span className="text-[10px]">↗</span>
                </a>
              )}

              {member.socials?.github && (
                <a
                  href={member.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="flex-1 py-2 px-3 rounded-full bg-neutral-900 hover:bg-black text-white text-[11px] font-semibold text-center transition-all duration-300 flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <span>GitHub</span>
                  <span className="text-[10px]">↗</span>
                </a>
              )}

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  setIsFlipped(false)
                }}
                aria-label="Retourner"
                className="w-8 h-8 rounded-full bg-neutral-100 hover:bg-[#EB4604] hover:text-white text-neutral-700 flex items-center justify-center text-xs transition-colors shrink-0"
              >
                ↺
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
