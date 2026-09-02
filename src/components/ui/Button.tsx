'use client'

import React from 'react'
import { cn } from '@/lib/utils'
import { ClickSpark } from '@/components/effects/ClickSpark'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
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
    'group relative inline-flex items-center justify-center overflow-hidden rounded-full font-medium transition-all duration-300 select-none'

  const variants = {
    primary: 'bg-[#EB4604] text-white hover:bg-[#D43D00] shadow-md shadow-[#EB4604]/25',
    secondary: 'bg-white text-black hover:bg-neutral-200',
    outline: 'bg-transparent border border-[#333333] text-neutral-900 hover:border-black hover:bg-neutral-100',
    ghost: 'bg-transparent text-neutral-900 hover:bg-neutral-100',
  }

  const sizes = {
    sm: 'px-4 py-2 text-xs gap-2',
    md: 'px-6 py-3 text-sm gap-2.5',
    lg: 'px-8 py-4 text-base gap-3',
  }

  const defaultIcon = icon || (
    <svg
      className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7 17L17 7M17 7H7M17 7V17"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )

  const content = (
    <>
      <span className="relative z-10 flex items-center gap-2">
        {children}
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
