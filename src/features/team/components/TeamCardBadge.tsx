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
      className="relative w-full aspect-[7/10] select-none cursor-pointer group"
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
        className="relative w-full h-full rounded-[28px] sm:rounded-[32px] will-change-transform"
        style={{
          transformStyle: 'preserve-3d',
          transform: isFlipped ? 'rotateY(180deg) translateY(-6px) scale(1.015)' : 'rotateY(0deg) translateY(0) scale(1)',
          transition: 'transform 0.75s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.5s ease',
          boxShadow: isFlipped
            ? '0 24px 60px -10px rgba(0, 0, 0, 0.12), 0 12px 30px rgba(235, 70, 4, 0.08)'
            : '0 8px 24px rgba(0, 0, 0, 0.04)',
        }}
      >
        {/* ═══════════════════════════════════════════════════════════
            FRONT FACE: Official Poster Badge Image
            ═══════════════════════════════════════════════════════════ */}
        <div
          className="absolute inset-0 w-full h-full rounded-[28px] sm:rounded-[32px] bg-white border border-[#E5E7EB] overflow-hidden flex flex-col justify-between"
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
              quality={90}
              className="object-cover"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 360px"
            />

            {/* Flip Hint Indicator Badge */}
            <div className="absolute top-4 right-4 z-10 opacity-90 sm:opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-neutral-800 text-[10px] font-mono border border-neutral-200/80 shadow-md">
                <span className="text-[#EB4604]">↺</span>
                <span>Détails</span>
              </span>
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════
            BACK FACE: High-End Digital Pass Profile in LIGHT MODE
            ═══════════════════════════════════════════════════════════ */}
        <div
          className="absolute inset-0 w-full h-full rounded-[28px] sm:rounded-[32px] bg-white border border-neutral-200 text-neutral-900 p-6 sm:p-7 flex flex-col justify-between overflow-hidden shadow-xl"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        >
          {/* Ambient Background Watermark */}
          <div className="absolute -top-10 -right-10 w-44 h-44 opacity-[0.04] pointer-events-none select-none">
            <Image
              src="/images/brand/sparkline-symbol.svg"
              alt=""
              fill
              className="object-contain"
            />
          </div>

          {/* 1. Header Bar: Brand + Department Tag */}
          <div className="relative z-10 flex items-center justify-between border-b border-neutral-100 pb-3.5 shrink-0">
            <div className="flex items-center gap-2">
              <div className="relative w-5 h-5 shrink-0">
                <Image
                  src="/images/brand/sparkline-symbol.svg"
                  alt="Sparkline"
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

            <span className="px-3 py-0.5 rounded-full bg-[#EB4604]/10 border border-[#EB4604]/25 text-[#EB4604] text-[10px] font-mono font-semibold uppercase tracking-wider shrink-0">
              {member.department || 'Talent'}
            </span>
          </div>

          {/* 2. Main Identity, Role & Bio */}
          <div className="relative z-10 space-y-2.5 my-auto py-1">
            <div className="space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 font-semibold block">
                {member.experienceYears}+ ans d&apos;expérience
              </span>
              <h3
                className="text-xl sm:text-2xl font-bold text-[#0A0A0A] tracking-tight leading-snug"
                style={{ fontFamily: 'var(--font-family--primary-font)' }}
              >
                {member.name}
              </h3>
              <p className="text-xs sm:text-[13px] font-mono text-[#EB4604] font-semibold leading-snug">
                {member.role}
              </p>
            </div>

            <p className="text-neutral-600 text-xs sm:text-[13px] font-light leading-relaxed line-clamp-3">
              {member.bio}
            </p>

            {/* Skills Badges */}
            {member.skills && member.skills.length > 0 && (
              <div className="flex flex-wrap gap-1.5 pt-1">
                {member.skills.slice(0, 4).map((skill, sIdx) => (
                  <span
                    key={sIdx}
                    className="px-2.5 py-0.5 rounded-md bg-neutral-100 border border-neutral-200/80 text-[10px] font-mono text-neutral-700"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* 3. Direct Contact Strip & Social Action Dock */}
          <div className="relative z-10 space-y-2.5 border-t border-neutral-100 pt-3.5 shrink-0">
            {/* Direct Contact Info */}
            <div className="space-y-1 text-xs font-mono">
              {member.email && (
                <a
                  href={`mailto:${member.email}`}
                  onClick={(e) => e.stopPropagation()}
                  className="flex items-center gap-2 text-neutral-600 hover:text-[#EB4604] transition-colors truncate"
                >
                  <span className="text-[#EB4604]">✉</span>
                  <span className="truncate">{member.email}</span>
                </a>
              )}

              {member.phone && (
                <a
                  href={`tel:${member.phone.replace(/\s+/g, '')}`}
                  onClick={(e) => e.stopPropagation()}
                  className="flex items-center gap-2 text-neutral-600 hover:text-[#EB4604] transition-colors"
                >
                  <span className="text-[#EB4604]">📞</span>
                  <span>{member.phone}</span>
                </a>
              )}
            </div>

            {/* Bottom Action Dock: LinkedIn + Flip Back */}
            <div className="pt-1 flex items-center gap-2">
              {member.socials?.linkedin && (
                <a
                  href={member.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="flex-1 py-2.5 px-4 rounded-full bg-[#0A66C2] hover:bg-[#084E96] text-white text-xs font-semibold text-center transition-all duration-300 flex items-center justify-center gap-1.5 shadow-sm active:scale-98"
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
                  className="flex-1 py-2.5 px-4 rounded-full bg-neutral-900 hover:bg-black text-white text-xs font-semibold text-center transition-all duration-300 flex items-center justify-center gap-1.5 shadow-sm active:scale-98"
                >
                  <span>GitHub</span>
                  <span className="text-[10px]">↗</span>
                </a>
              )}

              {/* Flip back button */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  setIsFlipped(false)
                }}
                aria-label="Retourner"
                className="w-9 h-9 rounded-full bg-neutral-100 hover:bg-[#EB4604] hover:text-white text-neutral-700 flex items-center justify-center text-sm transition-colors shrink-0 active:scale-90"
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
