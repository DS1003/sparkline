'use client'

import React from 'react'
import Link from 'next/link'
import { Logo } from '@/components/ui/Logo'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html>
      <body>
        <div className="min-h-screen bg-[#070709] text-white flex flex-col items-center justify-center p-6 text-center">
          <div className="mb-8">
            <Logo variant="symbol" className="w-16 h-16" />
          </div>
          <h1 className="text-6xl font-bold font-mono text-[#EB4604] mb-4">Error</h1>
          <h2 className="text-2xl font-semibold mb-4">Something went wrong.</h2>
          <p className="text-neutral-400 text-lg max-w-md mb-8 leading-relaxed">
            An unexpected error occurred. Our team has been notified and is working to resolve it.
          </p>
          <div className="flex gap-4">
            <button
              onClick={() => reset()}
              className="px-6 py-3 rounded-full bg-[#EB4604] text-white font-semibold hover:bg-[#D43D00] transition-colors"
            >
              Try Again
            </button>
            <Link
              href="/"
              className="px-6 py-3 rounded-full border border-white/20 text-white font-semibold hover:bg-white/10 transition-colors"
            >
              Back Home
            </Link>
          </div>
        </div>
      </body>
    </html>
  )
}
