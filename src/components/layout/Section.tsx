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
        'py-12 sm:py-16 md:py-20 lg:py-24 xl:py-28 relative overflow-clip',
        darker ? 'bg-[#f7f7f9]' : 'bg-white',
        className
      )}
    >
      {children}
    </section>
  )
}
