'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { siteConfig } from '@/config/site'

export function Footer() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubscribed(true)
      setEmail('')
    }
  }

  return (
    <footer className="w-full bg-white p-2.5 sm:p-4 lg:p-5 pt-0">
      {/* Floating 100% Pure Black Inset Card */}
      <div className="relative rounded-2xl md:rounded-[20px] bg-black text-white p-5 sm:p-10 lg:p-14 overflow-hidden shadow-2xl">

        {/* Background Watermark: White SPARKLINE Symbol */}
        <div className="absolute top-1/2 right-[-5%] sm:right-[-2%] -translate-y-1/2 w-[400px] h-[400px] sm:w-[550px] sm:h-[550px] lg:w-[700px] lg:h-[700px] pointer-events-none select-none">
          <Image
            src="/images/brand/Symbole/Blanc.svg"
            alt=""
            fill
            sizes="700px"
            className="object-contain opacity-[0.04]"
            aria-hidden="true"
          />
        </div>

        {/* 1. Full-Width Official SPARKLINE Logo Section */}
        <div className="relative z-10 w-full pb-6 sm:pb-12 border-b border-white/10">
          <Link href="/" className="group block w-full select-none" aria-label="SPARKLINE Home">
            <div className="w-full flex items-center justify-start my-1 sm:my-2 transition-transform duration-500 group-hover:scale-[1.005]">
              <Image
                src="/images/brand/sparkline-logo-white.svg"
                alt="SPARKLINE Official Logo"
                width={1983}
                height={400}
                priority
                className="w-full h-auto max-w-full object-contain object-left filter drop-shadow-[0_0_40px_rgba(235,70,4,0.4)]"
              />
            </div>
          </Link>
        </div>

        {/* 2. Middle Grid: Newsletter & Multi-Column Navigation */}
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start py-8 sm:py-12">
          {/* Left Column: Stay updated with SPARKLINE news */}
          <div className="lg:col-span-6 space-y-5 sm:space-y-6 flex flex-col items-center lg:items-start text-center lg:text-left">
            <h2 className="text-xl sm:text-3xl lg:text-4xl font-normal text-white tracking-tight leading-[1.2]">
              Restez informé des
              <br />
              actualités de SPARKLINE
            </h2>

            {/* Newsletter Subscription Pill Input */}
            {subscribed ? (
              <div className="w-full max-w-xl p-3.5 sm:p-4 rounded-full bg-[#EB4604]/10 border border-[#EB4604]/40 text-xs sm:text-sm text-[#FFB901] flex items-center gap-2">
                <span className="text-[#EB4604] font-bold">✓</span>
                <span>Merci ! Vous êtes désormais abonné à nos actualités.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="w-full max-w-xl">
                <div className="rounded-full border border-white/80 bg-transparent p-1.5 sm:p-2.5 pl-4 sm:pl-7 flex items-center justify-between transition-colors shadow-sm">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Entrez votre adresse e-mail"
                    required
                    className="bg-transparent text-white placeholder-neutral-400 focus:outline-none w-full text-base font-light tracking-wide py-1"
                  />
                  <button
                    type="submit"
                    aria-label="S'abonner"
                    className="w-9 h-9 sm:w-12 sm:h-12 rounded-full bg-white text-[#070709] flex items-center justify-center font-bold text-sm sm:text-lg shrink-0 ml-2 hover:bg-[#EB4604] hover:text-white transition-all shadow-md"
                  >
                    ↗
                  </button>
                </div>
              </form>
            )}

            {/* Social Pill Badges */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5 sm:gap-3 pt-3">
              {[
                {
                  label: 'LinkedIn',
                  href: siteConfig.socials.linkedin,
                  icon: (
                    <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
                      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                    </svg>
                  ),
                },
                {
                  label: 'Instagram',
                  href: siteConfig.socials.instagram,
                  icon: (
                    <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  ),
                },
                {
                  label: 'Facebook',
                  href: siteConfig.socials.facebook,
                  icon: (
                    <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  ),
                },
              ].map((soc, idx) => (
                <a
                  key={idx}
                  href={soc.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={soc.label}
                  className="px-3.5 sm:px-4 py-2 rounded-full bg-[#1c1c20] hover:bg-[#2c2c34] text-white transition-all flex items-center gap-2 group shadow-sm hover:scale-105"
                >
                  <span className="text-white flex items-center justify-center shrink-0">{soc.icon}</span>
                  <span className="text-xs text-neutral-300 group-hover:text-white transition-colors font-medium">↗</span>
                </a>
              ))}
            </div>
          </div>

          {/* Right Columns: Clean Official Sitemap Navigation */}
          <div className="lg:col-span-6 grid grid-cols-2 gap-8 text-sm text-center lg:text-left">
            {/* Column 1 */}
            <div className="space-y-3.5 flex flex-col items-center lg:items-start">
              <Link href="/" className="text-neutral-300 hover:text-white hover:translate-x-0.5 transition-all">Accueil</Link>
              <Link href="/about" className="text-neutral-300 hover:text-white hover:translate-x-0.5 transition-all">À propos</Link>
              <Link href="/services" className="text-neutral-300 hover:text-white hover:translate-x-0.5 transition-all">Services</Link>
              <Link href="/projects" className="text-neutral-300 hover:text-white hover:translate-x-0.5 transition-all">Projets</Link>
            </div>

            {/* Column 2 */}
            <div className="space-y-3.5 flex flex-col items-center lg:items-start">
              <Link href="/team" className="text-neutral-300 hover:text-white hover:translate-x-0.5 transition-all">Équipe</Link>
              <Link href="/sparklearn" className="text-neutral-300 hover:text-white hover:translate-x-0.5 transition-all">Sparklearn</Link>
              <Link href="/contact" className="text-neutral-300 hover:text-white hover:translate-x-0.5 transition-all">Contact</Link>
            </div>
          </div>
        </div>

        {/* 3. Bottom Bar: Copyright, Tagline & Legal */}
        <div className="relative z-10 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-400 gap-3 text-center">
          <p>
            SPARKLINE © {new Date().getFullYear()}. Tous droits réservés. Propulsé par <span className="text-white font-medium">SPARKLINE</span>.
          </p>
          <div className="flex items-center gap-3">
            <Link href="/privacy" className="hover:text-white transition-colors">Politique de confidentialité</Link>
            <span className="text-neutral-600">|</span>
            <Link href="/terms" className="hover:text-white transition-colors">Conditions d'utilisation</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
