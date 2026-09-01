'use client'

import React from 'react'
import Link from 'next/link'
import { Logo } from '../ui/Logo'

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
}

const navLinks = [
  { label: 'Accueil', href: '/' },
  { label: 'À propos', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Projets', href: '/projects' },
  { label: 'Équipe', href: '/team' },
  { label: 'SPARKlearn', href: '/sparklearn' },
  { label: 'Contact', href: '/contact' },
]

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 bg-[#070709] text-white flex flex-col justify-between p-6 sm:p-8 overflow-y-auto animate-fadeIn xl:hidden">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <Link href="/" onClick={onClose}>
          <Logo variant="white" size="sm" />
        </Link>
        <button
          onClick={onClose}
          className="w-10 h-10 rounded-full border border-[#333333] bg-[#141418] text-white flex items-center justify-center font-bold"
        >
          ✕
        </button>
      </div>

      {/* Nav Links List */}
      <nav className="flex flex-col gap-4 py-8">
        {navLinks.map((item, idx) => (
          <Link
            key={idx}
            href={item.href}
            onClick={onClose}
            className="text-xl sm:text-2xl font-semibold text-neutral-200 hover:text-[#EB4604] transition-colors py-1 flex items-center justify-between group"
          >
            <span>{item.label}</span>
            <span className="text-sm font-mono text-neutral-600 group-hover:text-[#EB4604] transition-colors">
              →
            </span>
          </Link>
        ))}
      </nav>

      {/* Footer / CTA */}
      <div className="space-y-4 pt-6 border-t border-white/10">
        <Link
          href="/contact"
          onClick={onClose}
          className="w-full inline-flex items-center justify-center py-4 rounded-full bg-[#EB4604] text-white font-semibold hover:bg-[#D43D00] transition-colors"
        >
          Démarrer un projet
        </Link>
        <p className="text-xs text-center text-neutral-500 font-mono">
          Déclenchez le changement <span className="text-[#EB4604]">•</span> Illuminez le succès
        </p>
      </div>
    </div>
  )
}
