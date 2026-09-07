import React from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'

interface LogoProps {
  variant?: 'white' | 'dark' | 'symbol'
  className?: string
  priority?: boolean
  size?: 'sm' | 'md' | 'lg' | 'hero' | 'footer'
}

export function Logo({
  variant = 'white',
  className,
  priority = true,
  size = 'md',
}: LogoProps) {
  // Size classes for horizontal brand logo
  const sizeClasses = {
    sm: 'h-6 sm:h-7',
    md: 'h-8 sm:h-9',
    lg: 'h-10 sm:h-11',
    hero: 'h-12 sm:h-14',
    footer: 'h-10 sm:h-11',
    symbol: 'h-8 sm:h-9',
  }

  if (variant === 'symbol') {
    return (
      <div className={cn('relative inline-flex items-center justify-center shrink-0', className)}>
        <Image
          src="/images/brand/sparkline-symbol.svg"
          alt="SPARKLINE Symbol"
          width={884}
          height={884}
          priority={priority}
          className="w-auto h-full object-contain"
          style={{ width: 'auto', height: 'auto' }}
        />
      </div>
    )
  }

  const logoSrc =
    variant === 'dark'
      ? '/images/brand/sparkline-logo-dark.svg'
      : '/images/brand/sparkline-logo-white.svg'

  return (
    <div className={cn('relative inline-flex items-center shrink-0 select-none', className)}>
      <Image
        src={logoSrc}
        alt="SPARKLINE Official Logo"
        width={1983}
        height={400}
        priority={priority}
        className={cn('w-auto object-contain', sizeClasses[size] || sizeClasses.md)}
        style={{
          width: 'auto',
          aspectRatio: '1983 / 400',
        }}
      />
    </div>
  )
}

