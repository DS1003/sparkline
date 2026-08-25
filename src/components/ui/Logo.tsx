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
  // Dimensions based on size preset (Original horizontal logo aspect ratio is ~1983x400 = 4.95:1)
  const dimensions = {
    sm: { width: 130, height: 26 },
    md: { width: 160, height: 32 },
    lg: { width: 200, height: 40 },
    hero: { width: 240, height: 48 },
    footer: { width: 220, height: 44 },
    symbol: { width: 44, height: 44 },
  }

  if (variant === 'symbol') {
    return (
      <div className={cn('relative inline-flex items-center justify-center shrink-0', className)}>
        <Image
          src="/images/brand/sparkline-symbol.svg"
          alt="SPARKLINE Symbol"
          width={dimensions.symbol.width}
          height={dimensions.symbol.height}
          priority={priority}
          className="w-auto h-full object-contain"
        />
      </div>
    )
  }

  const logoSrc =
    variant === 'dark'
      ? '/images/brand/sparkline-logo-dark.svg'
      : '/images/brand/sparkline-logo-white.svg'

  const { width, height } = dimensions[size] || dimensions.md

  return (
    <div className={cn('relative inline-flex items-center shrink-0 select-none', className)}>
      <Image
        src={logoSrc}
        alt="SPARKLINE Official Logo"
        width={width}
        height={height}
        priority={priority}
        className="w-auto h-8 sm:h-9 object-contain"
        style={{
          aspectRatio: '1983 / 400',
        }}
      />
    </div>
  )
}
