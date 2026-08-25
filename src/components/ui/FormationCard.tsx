'use client'

import React from 'react'
import Link from 'next/link'
import { Formation } from '@/types'

interface FormationCardProps {
  formation: Formation
}

export function FormationCard({ formation }: FormationCardProps) {
  return (
    <div className="group rounded-3xl bg-white border border-[#e2e2e7] shadow-sm hover:border-[#EB4604]/50 transition-all duration-300 p-8 flex flex-col justify-between h-full space-y-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="px-3 py-1 rounded-full bg-[#f4f4f7] text-xs font-mono text-neutral-800 font-semibold">
            {formation.format}
          </span>
          <span className="text-xs font-mono text-neutral-400">{formation.duration}</span>
        </div>

        <h3 className="heading-03 text-neutral-900 leading-snug">
          {formation.title}
        </h3>

        <p className="text-neutral-600 text-sm leading-relaxed">
          {formation.summary}
        </p>

        <div className="space-y-2 pt-2">
          <h4 className="text-xs font-mono uppercase tracking-wider text-neutral-400 font-semibold">
            Au programme :
          </h4>
          <ul className="space-y-1 text-xs text-neutral-700 font-medium">
            {formation.curriculum.slice(0, 3).map((item, idx) => (
              <li key={idx} className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#EB4604]" />
                {item.module}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="pt-4 border-t border-[#e2e2e7] flex items-center justify-between">
        <span className="text-xs font-mono text-neutral-400">Niveau : {formation.level}</span>
        <Link
          href="/contact?inquiry=training"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#EB4604] hover:underline"
        >
          <span>S’inscrire / En savoir plus</span>
          <span>→</span>
        </Link>
      </div>
    </div>
  )
}
