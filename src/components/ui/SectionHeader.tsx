import React from 'react'
import { Tag } from './Tag'
import { cn } from '@/lib/utils'

interface SectionHeaderProps {
  tag: string
  title: string
  subtitle?: string
  align?: 'left' | 'center'
  linkText?: string
  linkHref?: string
  className?: string
  tagVariant?: 'base' | 'v2'
}

export function SectionHeader({
  tag,
  title,
  subtitle,
  align = 'left',
  linkText,
  linkHref,
  className,
  tagVariant = 'v2',
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        'flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16',
        align === 'center' && 'md:flex-col md:items-center text-center',
        className
      )}
    >
      <div className="max-w-5xl space-y-4">
        <Tag variant={tagVariant}>{tag}</Tag>
        <h2 className="heading-02 text-neutral-900 font-semibold">{title}</h2>
        {subtitle && <p className="text-lg text-neutral-600 max-w-3xl">{subtitle}</p>}
      </div>

      {linkText && linkHref && (
        <a
          href={linkHref}
          className="group inline-flex items-center gap-3 text-sm font-medium text-neutral-900 hover:text-[#DE322D] transition-colors"
        >
          <span className="w-10 h-10 rounded-full border border-neutral-300 flex items-center justify-center group-hover:border-[#DE322D] group-hover:bg-[#DE322D]/10 transition-colors">
            <svg
              className="w-4 h-4 transition-transform group-hover:translate-x-1"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M27.53 16.5298L18.53 25.5298C18.3878 25.6623 18.1998 25.7344 18.0055 25.731C17.8112 25.7276 17.6258 25.6489 17.4884 25.5115C17.351 25.3741 17.2723 25.1887 17.2688 24.9944C17.2654 24.8001 17.3375 24.612 17.47 24.4698L25.1887 16.7498H5C4.80109 16.7498 4.61032 16.6708 4.46967 16.5302C4.32902 16.3895 4.25 16.1988 4.25 15.9998C4.25 15.8009 4.32902 15.6102 4.46967 15.4695C4.61032 15.3289 4.80109 15.2498 5 15.2498H25.1887L17.47 7.52985C17.3375 7.38767 17.2654 7.19962 17.2688 7.00532C17.2723 6.81102 17.351 6.62564 17.4884 6.48822C17.6258 6.35081 17.8112 6.2721 18.0055 6.26867C18.1998 6.26524 18.3878 6.33737 18.53 6.46985L27.53 15.4698C27.6705 15.6105 27.7493 15.8011 27.7493 15.9998C27.7493 16.1986 27.6705 16.3892 27.53 16.5298Z"
                fill="currentColor"
              />
            </svg>
          </span>
          <span className="heading-04">{linkText}</span>
        </a>
      )}
    </div>
  )
}
