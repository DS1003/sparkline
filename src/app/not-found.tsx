import React from 'react'
import Link from 'next/link'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { Container } from '@/components/layout/Container'

export default function NotFound() {
  return (
    <main className="min-h-screen bg-white text-neutral-900">
      <section className="w-full bg-white p-2.5 sm:p-4 lg:p-5">
        <div className="relative rounded-2xl md:rounded-[20px] bg-[#070709] text-white overflow-hidden min-h-[520px] flex flex-col justify-between p-6 sm:p-8 lg:p-12 text-center shadow-2xl">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-[#EB4604]/15 via-[#FFB901]/8 to-transparent rounded-full blur-[160px] pointer-events-none" />

          {/* Integrated Navbar Inside Card */}
          <Navbar />

          <div className="relative z-10 space-y-6 my-auto py-8">
            <h1 className="text-[120px] sm:text-[160px] font-bold font-mono text-[#EB4604] leading-none tracking-tight">
              404
            </h1>
            <h2 className="heading-01 text-white">Cette étincelle s'est perdue.</h2>
            <p className="text-neutral-400 text-lg max-w-md mx-auto leading-relaxed">
              La page que vous recherchez n&apos;existe pas ou a été déplacée. Retrouvons ensemble le bon chemin.
            </p>
            <div className="flex flex-wrap gap-4 justify-center pt-4">
              <Link
                href="/"
                className="px-6 py-3 rounded-full bg-[#EB4604] text-white text-sm font-semibold hover:bg-[#D43D00] transition-colors shadow-lg shadow-[#EB4604]/25"
              >
                Retour à l'accueil
              </Link>
              <Link
                href="/contact"
                className="px-6 py-3 rounded-full border border-white/20 text-white text-sm font-semibold hover:bg-white/10 transition-colors"
              >
                Nous contacter
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
