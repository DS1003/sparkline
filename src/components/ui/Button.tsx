'use client'

import React from 'react'
import { cn } from '@/lib/utils'
import { ClickSpark } from '@/components/effects/ClickSpark'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'glass' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
  href?: string
  icon?: React.ReactNode
  className?: string
  clickSpark?: boolean
}

export function Button({
  variant = 'primary',
  size = 'md',
  children,
  href,
  icon,
  className,
  clickSpark = false,
  ...props
}: ButtonProps) {
  const baseClasses =
    'group relative inline-flex items-center justify-center overflow-hidden rounded-full font-medium transition-all duration-300 select-none tracking-tight'

  const variants = {
    primary:
      'bg-gradient-to-r from-[#FF5C1C] via-[#EB4604] to-[#E03D00] text-white border border-white/25 shadow-[0_8px_24px_-4px_rgba(235,70,4,0.45),inset_0_1px_1px_rgba(255,255,255,0.35)] hover:shadow-[0_12px_32px_-2px_rgba(235,70,4,0.65),inset_0_1px_1px_rgba(255,255,255,0.5)] hover:scale-[1.02] active:scale-[0.98]',
    secondary:
      'bg-white text-neutral-900 border border-white/90 shadow-[0_8px_24px_-4px_rgba(0,0,0,0.35),inset_0_1px_1px_rgba(255,255,255,1),inset_0_-2px_4px_rgba(0,0,0,0.06)] hover:bg-neutral-100 hover:shadow-[0_12px_28px_-4px_rgba(0,0,0,0.45)] hover:scale-[1.02] active:scale-[0.98]',
    glass:
      'bg-white/[0.08] hover:bg-white/[0.15] text-white border border-white/20 hover:border-white/35 backdrop-blur-xl shadow-[0_8px_24px_-4px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.2)] hover:scale-[1.02] active:scale-[0.98]',
    outline: 'bg-transparent border border-[#333333] text-neutral-900 hover:border-black hover:bg-neutral-100',
    ghost: 'bg-transparent text-neutral-900 hover:bg-neutral-100',
  }

  const sizes = {
    sm: 'px-4 py-2 text-xs gap-2',
    md: 'px-5 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-[13px] gap-2.5 sm:gap-3',
    lg: 'px-7 sm:px-8 py-3.5 sm:py-4 text-sm sm:text-base gap-3 sm:gap-3.5',
  }

  const defaultIcon =
    icon !== undefined ? (
      icon
    ) : (
      <span
        className={cn(
          'w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center transition-all duration-300 shrink-0',
          variant === 'primary'
            ? 'bg-black/20 text-white group-hover:bg-white group-hover:text-[#EB4604]'
            : variant === 'secondary'
            ? 'bg-neutral-900/10 text-neutral-900 group-hover:bg-neutral-900 group-hover:text-white'
            : variant === 'glass'
            ? 'bg-white/10 text-white group-hover:bg-white group-hover:text-neutral-950'
            : 'bg-neutral-200/60 text-current'
        )}
      >
        <svg
          className="w-3 h-3 sm:w-3.5 sm:h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7 17L17 7M17 7H7M17 7V17"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    )

  const content = (
    <>
      {/* Light shimmer sweep on hover */}
      <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out pointer-events-none" />
      <span className="relative z-10 flex items-center gap-2 sm:gap-2.5">
        <span>{children}</span>
        {defaultIcon}
      </span>
    </>
  )

  const buttonElement = href ? (
    <a href={href} className={cn(baseClasses, variants[variant], sizes[size], className)}>
      {content}
    </a>
  ) : (
    <button className={cn(baseClasses, variants[variant], sizes[size], className)} {...props}>
      {content}
    </button>
  )

  if (clickSpark) {
    return (
      <ClickSpark
        sparkColor="var(--spark-primary)"
        sparkSize={8}
        sparkRadius={18}
        sparkCount={6}
        duration={350}
        easing="ease-out"
      >
        {buttonElement}
      </ClickSpark>
    )
  }

  return buttonElement
}
