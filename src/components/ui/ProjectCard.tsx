'use client'

import React from 'react'
import Link from 'next/link'
import { Project } from '@/types'

interface ProjectCardProps {
  project: Project
  featured?: boolean
}

export function ProjectCard({ project, featured }: ProjectCardProps) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className={`group relative rounded-3xl bg-white border border-[#e2e2e7] shadow-sm overflow-hidden hover:border-[#EB4604]/50 transition-all duration-500 flex flex-col justify-between p-8 ${
        featured ? 'h-[460px] md:col-span-2' : 'h-[400px]'
      }`}
    >
      {/* Subtle Glow Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#EB4604]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      {/* Top Meta info */}
      <div className="flex items-center justify-between relative z-10">
        <span className="px-3.5 py-1 rounded-full bg-[#f4f4f7] text-xs font-mono text-neutral-800 font-semibold">
          {project.category}
        </span>
        <span className="text-xs font-mono text-neutral-400">{project.year}</span>
      </div>

      {/* Bottom info */}
      <div className="relative z-10 space-y-3">
        <div className="flex items-center justify-between gap-4">
          <h3 className="heading-03 text-neutral-900 group-hover:text-[#EB4604] transition-colors">
            {project.title}
          </h3>
          <span className="w-10 h-10 rounded-full border border-neutral-300 flex items-center justify-center text-neutral-800 group-hover:border-[#EB4604] group-hover:bg-[#EB4604] group-hover:text-white transition-all shrink-0">
            ↗
          </span>
        </div>
        <p className="text-neutral-600 text-sm max-w-xl line-clamp-2 leading-relaxed">
          {project.summary}
        </p>

        {/* Technologies tag row */}
        <div className="flex flex-wrap gap-2 pt-2">
          {project.technologies.slice(0, 4).map((tech, idx) => (
            <span key={idx} className="text-[11px] font-mono text-neutral-500">
              #{tech}
            </span>
          ))}
        </div>
      </div>
    </Link>
  )
}
