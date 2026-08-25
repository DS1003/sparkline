import React from 'react'
import Image from 'next/image'
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
        'inline-flex items-center gap-2.5 px-4 py-2 rounded-full border text-[11px] sm:text-[12px] tracking-[0.1em] uppercase font-semibold select-none transition-all',
        variant === 'base'
          ? 'bg-[#141418] border-[#25252b] text-white'
          : 'bg-[#f0f1f5] border-[#e2e4ea] text-[#0A0A0A]',
        className
      )}
    >
      {/* Official Symbol as mini badge icon */}
      <span className="w-4 h-4 sm:w-[18px] sm:h-[18px] relative flex items-center justify-center shrink-0">
        <Image
          src="/images/brand/sparkline-symbol.svg"
          alt="Spark"
          width={18}
          height={18}
          className="w-full h-full object-contain"
        />
      </span>
      <span className="leading-none">{children}</span>
    </div>
  )
}
