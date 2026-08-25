import React from 'react'
import { cn } from '@/lib/utils'

interface ContainerProps {
  children: React.ReactNode
  className?: string
}

export function Container({ children, className }: ContainerProps) {
  return (
    <div className={cn('w-full px-2.5 sm:px-4 lg:px-5 mx-auto', className)}>
      {children}
    </div>
  )
}
