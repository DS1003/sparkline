'use client'

import React from 'react'
import Link from 'next/link'
import { Article } from '@/types'

interface ArticleCardProps {
  article: Article
}

export function ArticleCard({ article }: ArticleCardProps) {
  return (
    <Link
      href={`/insights/${article.slug}`}
      className="group rounded-3xl bg-white border border-[#e2e2e7] shadow-sm hover:border-[#EB4604]/50 transition-all duration-300 p-8 flex flex-col justify-between h-[360px]"
    >
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs font-mono text-neutral-400">
          <span className="text-[#EB4604] font-semibold uppercase">{article.category}</span>
          <span>{article.readTime}</span>
        </div>

        <h3 className="heading-04 text-neutral-900 group-hover:text-[#EB4604] transition-colors leading-snug">
          {article.title}
        </h3>

        <p className="text-neutral-600 text-sm line-clamp-3 leading-relaxed">
          {article.summary}
        </p>
      </div>

      <div className="pt-4 border-t border-[#e2e2e7] flex items-center justify-between text-xs text-neutral-500 font-mono">
        <span>Par {article.author}</span>
        <span className="text-neutral-400">{article.publishedAt}</span>
      </div>
    </Link>
  )
}
