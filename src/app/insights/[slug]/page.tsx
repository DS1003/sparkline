import React from 'react'
import Link from 'next/link'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { SectionCTA } from '@/components/layout/SectionCTA'
import { Container } from '@/components/layout/Container'
import { Section } from '@/components/layout/Section'
import { Tag } from '@/components/ui/Tag'
import { RevealOnScroll } from '@/components/motion/RevealOnScroll'
import { insightsRepository, articlesData } from '@/lib/repositories/insights'

export async function generateStaticParams() {
  return articlesData.map((a) => ({ slug: a.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const article = await insightsRepository.getBySlug(slug)
  if (!article) return { title: 'Article non trouvé | SPARKLINE' }
  return {
    title: `${article.title} | Journal SPARKLINE`,
    description: article.summary,
  }
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const article = await insightsRepository.getBySlug(slug)
  if (!article) notFound()

  return (
    <main className="min-h-screen bg-white text-neutral-900">
      <section className="w-full bg-white p-2.5 sm:p-4 lg:p-5">
        <div className="relative rounded-2xl md:rounded-[20px] bg-[#070709] text-white overflow-hidden p-6 sm:p-8 lg:p-12 min-h-[420px] flex flex-col justify-between shadow-2xl">
          {/* High-Performance Lightweight Ambient Lighting */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(235,70,4,0.14)_0%,transparent_65%)] pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(255,185,1,0.06)_0%,transparent_60%)] pointer-events-none" />
          <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-tr from-[#EB4604]/20 via-[#FFB901]/10 to-transparent rounded-full blur-[140px] pointer-events-none" />

          {/* Integrated Navbar Inside Hero Card */}
          <Navbar />

          <div className="relative z-10 flex items-center gap-1 sm:gap-1.5 text-xs font-mono text-neutral-400 uppercase tracking-wider pt-6 font-medium">
            <Link href="/" className="hover:text-white transition-colors duration-200">Accueil</Link>
            <span className="text-white/40">/</span>
            <Link href="/insights" className="hover:text-white transition-colors duration-200">Insights</Link>
            <span className="text-white/40">/</span>
            <span className="text-[#EB4604] truncate max-w-[280px]">{article.title}</span>
          </div>

          <div className="relative z-10 my-auto max-w-3xl py-8 space-y-5">
            <RevealOnScroll>
              <Tag variant="base">{article.category}</Tag>
            </RevealOnScroll>
            <RevealOnScroll delay={0.1}>
              <h1 className="heading-01 text-white font-bold leading-tight">{article.title}</h1>
            </RevealOnScroll>
            <RevealOnScroll delay={0.2}>
              <p className="text-base text-neutral-300 font-light leading-relaxed">{article.summary}</p>
            </RevealOnScroll>
          </div>

          <div className="relative z-10 pt-6 border-t border-white/10 flex flex-wrap gap-8 text-xs font-mono text-neutral-400 uppercase tracking-widest">
            <div>Par <span className="text-white">{article.author}</span></div>
            <div>{article.publishedAt}</div>
            <div>{article.readTime}</div>
          </div>
        </div>
      </section>

      {/* Article Body */}
      <Section>
        <Container>
          <div className="max-w-3xl mx-auto space-y-8">
            {article.content.map((paragraph, idx) => (
              <RevealOnScroll key={idx} delay={idx * 0.05}>
                <p className="text-neutral-700 text-lg leading-[1.8] font-light">{paragraph}</p>
              </RevealOnScroll>
            ))}

            {/* Tags */}
            <div className="pt-8 border-t border-[#e2e2e7] flex flex-wrap gap-2">
              {article.tags.map((tag, idx) => (
                <span key={idx} className="px-3 py-1.5 rounded-full bg-[#f4f4f7] border border-[#e2e2e7] text-xs font-mono text-neutral-600">
                  #{tag}
                </span>
              ))}
            </div>

            {/* Author Card */}
            <div className="p-6 rounded-2xl bg-[#f4f4f7] border border-[#e2e2e7] flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#EB4604]/10 text-[#EB4604] flex items-center justify-center font-bold font-mono shrink-0">
                {article.author.split(' ').map(n => n[0]).join('').slice(0, 2)}
              </div>
              <div>
                <p className="font-semibold text-neutral-900">{article.author}</p>
                <p className="text-xs text-neutral-500">{article.authorRole} chez SPARKLINE</p>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Back to Insights */}
      <section className="py-12 bg-white border-t border-[#e2e2e7]">
        <Container>
          <Link
            href="/insights"
            className="inline-flex items-center gap-2 text-sm font-semibold text-neutral-900 hover:text-[#EB4604] transition-colors"
          >
            <span>←</span>
            <span>Retour à tous les articles</span>
          </Link>
        </Container>
      </section>

      <SectionCTA />
      <Footer />
    </main>
  )
}
