import React from 'react'
import { cn } from '@/lib/utils'

interface TagProps {
  children: React.ReactNode
  variant?: 'base' | 'v2'
  className?: string
}

export function Tag({ children, variant = 'base', className }: TagProps) {
  return (
    <div
      className={cn(
        'inline-flex items-center gap-2.5 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full border text-xs sm:text-[13px] font-mono tracking-[0.1em] uppercase font-semibold select-none transition-all duration-300 backdrop-blur-md group',
        variant === 'base'
          ? 'bg-white/[0.08] border-white/15 text-white hover:border-[#EB4604]/70 hover:bg-white/[0.12] shadow-[0_4px_20px_rgba(0,0,0,0.3)]'
          : 'bg-white border-neutral-200/90 text-[#0A0A0A] hover:border-[#EB4604]/60 hover:shadow-[0_6px_20px_rgba(235,70,4,0.12)] shadow-[0_2px_10px_rgba(0,0,0,0.05)]',
        className
      )}
    >
      {/* Precision Glowing Orange Pulse Dot */}
      <span className="relative flex h-2.5 w-2.5 shrink-0 items-center justify-center">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#EB4604] opacity-35 group-hover:opacity-75" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-[#EB4604] shadow-[0_0_6px_#EB4604]" />
      </span>

      {/* Label Text */}
      <span className="leading-none">{children}</span>
    </div>
  )
}
