'use client'

import React from 'react'
import Link from 'next/link'
import { Logo } from '@/components/ui/Logo'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center bg-white">
      <div className="w-14 h-14 rounded-2xl bg-[#EB4604]/10 text-[#EB4604] flex items-center justify-center text-2xl font-bold mb-6">
        !
      </div>
      <h2 className="text-2xl font-bold text-neutral-900 mb-3">Une erreur est survenue.</h2>
      <p className="text-neutral-600 text-base max-w-md mb-8">
        Un imprévu technique s&apos;est produit lors du chargement de cette page. Veuillez réessayer ou retourner à l&apos;accueil.
      </p>
      <div className="flex gap-4">
        <button
          onClick={() => reset()}
          className="px-6 py-3 rounded-full bg-[#EB4604] text-white text-sm font-semibold hover:bg-[#D43D00] transition-colors shadow-md"
        >
          Réessayer
        </button>
        <Link
          href="/"
          className="px-6 py-3 rounded-full border border-neutral-300 text-neutral-900 text-sm font-semibold hover:bg-neutral-100 transition-colors"
        >
          Retour à l'accueil
        </Link>
      </div>
    </div>
  )
}
