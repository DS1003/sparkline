import React from 'react'
import { Metadata } from 'next'
import { Footer } from '@/components/layout/Footer'
import { ComingSoon } from '@/features/sparklearn/components/ComingSoon'

export const metadata: Metadata = {
  title: 'Sparklearn | Initiatives Éducatives & Formations — SPARKLINE',
  description: 'Masterclasses gratuites, bootcamps immersifs et programmes de formation sur mesure pour faire émerger la prochaine génération de créateurs du numérique.',
}

export default function SparklearnPage() {
  return (
    <main className="min-h-screen bg-white text-neutral-900 flex flex-col justify-between">
      <ComingSoon />
      <Footer />
    </main>
  )
}
