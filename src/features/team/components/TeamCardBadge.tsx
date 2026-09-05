'use client'

import React, { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { TeamMember } from '@/types'

interface TeamCardBadgeProps {
  member: TeamMember
  index?: number
}

export function TeamCardBadge({ member }: TeamCardBadgeProps) {
  const [isFlipped, setIsFlipped] = useState(false)
  const isTouchDevice = useRef(false)
  const avatarSrc = member.avatar || '/images/brand/Seydina.webp'

  useEffect(() => {
    if (typeof window !== 'undefined' && !window.matchMedia('(hover: hover)').matches) {
      isTouchDevice.current = true
    }
  }, [])

  const handleMouseEnter = () => {
    if (isTouchDevice.current) return
    setIsFlipped(true)
  }

  const handleMouseLeave = () => {
    if (isTouchDevice.current) return
    setIsFlipped(false)
  }

  const handleTouchStart = () => {
    isTouchDevice.current = true
  }

  const handleClick = () => {
    setIsFlipped((prev) => !prev)
  }

  return (
    <div
      className="relative w-full aspect-[7/10.4] select-none cursor-pointer group"
      style={{ perspective: '1200px' }}
      onTouchStart={handleTouchStart}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
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
        className="relative w-full h-full rounded-[24px] sm:rounded-[30px] will-change-transform"
        style={{
          transformStyle: 'preserve-3d',
          transform: isFlipped ? 'rotateY(180deg) translateY(-4px) scale(1.015)' : 'rotateY(0deg) translateY(0) scale(1)',
          transition: 'transform 0.75s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.5s ease',
          boxShadow: isFlipped
            ? '0 20px 50px -10px rgba(0, 0, 0, 0.12), 0 10px 25px rgba(235, 70, 4, 0.08)'
            : '0 6px 20px rgba(0, 0, 0, 0.04)',
        }}
      >
        {/* ═══════════════════════════════════════════════════════════
            FRONT FACE: Official Poster Badge Image (Isolated for iOS)
            ═══════════════════════════════════════════════════════════ */}
        <div
          className={`absolute inset-0 w-full h-full rounded-[24px] sm:rounded-[30px] bg-white border border-[#E5E7EB] overflow-hidden flex flex-col justify-between transition-opacity duration-300 ${
            isFlipped ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(0deg) translateZ(1px)',
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

            {/* Flip Hint Indicator Badge (Hidden when card is flipped) */}
            {!isFlipped && (
              <div className="absolute top-3.5 right-3.5 z-10 opacity-90 sm:opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white/90 backdrop-blur-md text-neutral-800 text-[9.5px] font-mono border border-neutral-200/80 shadow-md">
                  <span className="text-[#EB4604]">↺</span>
                  <span>Détails</span>
                </span>
              </div>
            )}
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════
            BACK FACE: High-End Digital Pass Profile (Isolated for iOS)
            ═══════════════════════════════════════════════════════════ */}
        <div
          className={`absolute inset-0 w-full h-full rounded-[24px] sm:rounded-[30px] bg-white border border-neutral-200 text-neutral-900 p-4.5 sm:p-5 lg:p-6 flex flex-col justify-between overflow-hidden shadow-xl transition-opacity duration-300 ${
            !isFlipped ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg) translateZ(1px)',
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

          {/* 1. Header Bar: Brand + Department Tag (Non-Colliding Layout) */}
          <div className="relative z-10 flex items-center justify-between gap-2 border-b border-neutral-100 pb-2.5 sm:pb-3 shrink-0">
            <div className="flex items-center gap-1.5 shrink-0">
              <div className="relative w-4.5 h-4.5 sm:w-5 sm:h-5 shrink-0">
                <Image
                  src="/images/brand/sparkline-symbol.svg"
                  alt="Sparkline"
                  fill
                  className="object-contain"
                />
              </div>
              <span
                className="text-xs sm:text-sm font-bold text-[#0A0A0A] tracking-tight shrink-0"
                style={{ fontFamily: 'var(--font-family--primary-font)' }}
              >
                Sparkline
              </span>
            </div>

            <span className="px-2.5 py-0.5 rounded-full bg-[#EB4604]/10 border border-[#EB4604]/25 text-[#EB4604] text-[9px] sm:text-[9.5px] font-mono font-semibold uppercase tracking-wider shrink-0 max-w-[130px] truncate">
              {member.department || 'Talent'}
            </span>
          </div>

          {/* 2. Main Identity, Role & Bio */}
          <div className="relative z-10 space-y-1.5 sm:space-y-2 my-auto py-0.5">
            <div className="space-y-0.5">
              <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-widest text-neutral-400 font-semibold block">
                {member.experienceYears}+ ans d&apos;expérience
              </span>
              <h3
                className="text-lg sm:text-xl lg:text-2xl font-bold text-[#0A0A0A] tracking-tight leading-snug"
                style={{ fontFamily: 'var(--font-family--primary-font)' }}
              >
                {member.name}
              </h3>
              <p className="text-[11px] sm:text-xs font-mono text-[#EB4604] font-semibold leading-snug">
                {member.role}
              </p>
            </div>

            <p className="text-neutral-600 text-[11px] sm:text-xs font-light leading-relaxed line-clamp-3">
              {member.bio}
            </p>

            {/* Skills Badges */}
            {member.skills && member.skills.length > 0 && (
              <div className="flex flex-wrap gap-1 pt-0.5">
                {member.skills.slice(0, 4).map((skill, sIdx) => (
                  <span
                    key={sIdx}
                    className="px-2 py-0.5 rounded-md bg-neutral-100 border border-neutral-200/80 text-[9px] sm:text-[9.5px] font-mono text-neutral-700"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* 3. Direct Contact Strip & Social Action Dock */}
          <div className="relative z-10 space-y-2 border-t border-neutral-100 pt-2.5 sm:pt-3 shrink-0">
            {/* Direct Contact Info */}
            <div className="space-y-0.5 text-[11px] sm:text-xs font-mono">
              {member.email && (
                <a
                  href={`mailto:${member.email}`}
                  onClick={(e) => e.stopPropagation()}
                  className="flex items-center gap-1.5 text-neutral-600 hover:text-[#EB4604] transition-colors truncate"
                >
                  <span className="text-[#EB4604]">✉</span>
                  <span className="truncate">{member.email}</span>
                </a>
              )}

              {member.phone && (
                <a
                  href={`tel:${member.phone.replace(/\s+/g, '')}`}
                  onClick={(e) => e.stopPropagation()}
                  className="flex items-center gap-1.5 text-neutral-600 hover:text-[#EB4604] transition-colors"
                >
                  <span className="text-[#EB4604]">📞</span>
                  <span>{member.phone}</span>
                </a>
              )}
            </div>

            {/* Bottom Action Dock: LinkedIn + GitHub + Flip Back */}
            <div className="pt-0.5 flex items-center gap-1.5 sm:gap-2">
              {member.socials?.linkedin && (
                <a
                  href={member.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="flex-1 py-2 sm:py-2.5 px-3 sm:px-4 rounded-full bg-[#0A66C2] hover:bg-[#084E96] text-white text-[11px] sm:text-xs font-semibold text-center transition-all duration-300 flex items-center justify-center gap-1 shadow-sm active:scale-98"
                >
                  <span>LinkedIn</span>
                  <span className="text-[9px]">↗</span>
                </a>
              )}

              {member.socials?.instagram && (
                <a
                  href={member.socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="flex-1 py-2 sm:py-2.5 px-3 sm:px-4 rounded-full bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F77737] hover:opacity-90 text-white text-[11px] sm:text-xs font-semibold text-center transition-all duration-300 flex items-center justify-center gap-1 shadow-sm active:scale-98"
                >
                  <span>Instagram</span>
                  <span className="text-[9px]">↗</span>
                </a>
              )}

              {!member.socials?.instagram && member.socials?.github && (
                <a
                  href={member.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="flex-1 py-2 sm:py-2.5 px-3 sm:px-4 rounded-full bg-neutral-900 hover:bg-black text-white text-[11px] sm:text-xs font-semibold text-center transition-all duration-300 flex items-center justify-center gap-1 shadow-sm active:scale-98"
                >
                  <span>GitHub</span>
                  <span className="text-[9px]">↗</span>
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
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-neutral-100 hover:bg-[#EB4604] hover:text-white text-neutral-700 flex items-center justify-center text-xs sm:text-sm transition-colors shrink-0 active:scale-90"
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
