import React from 'react'
import { Metadata } from 'next'
import { CareersComingSoon } from '@/features/careers/components/CareersComingSoon'
import { Footer } from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: 'Carrières & Talents | SPARKLINE — Bientôt Ouvert',
  description:
    'SPARKLINE prépare ses prochaines sessions de recrutement. Découvrez nos futurs pôles de compétences et inscrivez-vous pour être prévenu dès l’ouverture officielle des candidatures.',
}

export default function CareersPage() {
  return (
    <main className="min-h-screen bg-white text-neutral-900">
      <CareersComingSoon />
      <Footer />
    </main>
  )
}
