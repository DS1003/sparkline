import React from 'react'
import { cn } from '@/lib/utils'

interface ContainerProps {
  children: React.ReactNode
  className?: string
}

export function Container({ children, className }: ContainerProps) {
  return (
    <div className={cn('w-full max-w-[1440px] px-3.5 sm:px-6 lg:px-8 xl:px-10 mx-auto', className)}>
      {children}
    </div>
  )
}
