import React from 'react'
import { cn } from '@/lib/utils'

interface SectionProps {
  id?: string
  children: React.ReactNode
  className?: string
  darker?: boolean
}

export function Section({ id, children, className, darker }: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        'py-20 md:py-32 relative overflow-hidden',
        darker ? 'bg-[#f7f7f9]' : 'bg-white',
        className
      )}
    >
      {children}
    </section>
  )
}
