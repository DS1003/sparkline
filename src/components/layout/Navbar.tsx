'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Logo } from '../ui/Logo'
import { MobileMenu } from './MobileMenu'

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [servicesDropdown, setServicesDropdown] = useState(false)
  const [sparklearnDropdown, setSparklearnDropdown] = useState(false)
  const pathname = usePathname()

  const isActive = (path: string) => {
    if (path === '/' && pathname === '/') return true
    if (path !== '/' && pathname?.startsWith(path)) return true
    return false
  }

  return (
    <>
      <nav className="w-full flex items-center justify-between py-2 mb-8 relative z-30">
        {/* Official SPARKLINE Logo */}
        <Link href="/" className="flex items-center group transition-transform group-hover:opacity-95">
          <Logo variant="white" size="md" />
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden xl:flex items-center gap-7 text-sm font-medium text-neutral-300">
          <Link
            href="/"
            className={`transition-colors py-1 ${
              isActive('/') && pathname === '/' ? 'text-[#EB4604] font-semibold' : 'hover:text-white'
            }`}
          >
            Accueil
          </Link>

          {/* Work link with badge */}
          <Link
            href="/projects"
            className={`transition-colors py-1 flex items-center gap-1.5 ${
              isActive('/projects') ? 'text-[#EB4604] font-semibold' : 'hover:text-white'
            }`}
          >
            <span>Projets</span>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-full bg-[#EB4604] text-white font-semibold">
              05
            </span>
          </Link>

          {/* Services with Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setServicesDropdown(true)}
            onMouseLeave={() => setServicesDropdown(false)}
          >
            <Link
              href="/services"
              className={`transition-colors py-1 flex items-center gap-1 ${
                isActive('/services') ? 'text-[#EB4604] font-semibold' : 'hover:text-white'
              }`}
            >
              <span>Services</span>
              <svg className="w-3.5 h-3.5 opacity-70" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>

            {servicesDropdown && (
              <div className="absolute top-full left-0 mt-2 w-72 p-3 bg-[#0d0d10] border border-[#222228] rounded-2xl shadow-2xl space-y-1 animate-fadeIn">
                <Link
                  href="/services/digital-solutions"
                  className="block px-3 py-2 rounded-xl text-xs hover:bg-[#18181f] text-neutral-300 hover:text-white transition-colors"
                >
                  <span className="font-semibold block text-white">Solutions digitales</span>
                  <span className="text-neutral-500 text-[11px]">Web, mobile & systèmes sur mesure</span>
                </Link>
                <Link
                  href="/services/ui-ux-design"
                  className="block px-3 py-2 rounded-xl text-xs hover:bg-[#18181f] text-neutral-300 hover:text-white transition-colors"
                >
                  <span className="font-semibold block text-white">Design UI/UX & Produit</span>
                  <span className="text-neutral-500 text-[11px]">Design systems & expérience utilisateur</span>
                </Link>
                <Link
                  href="/services/branding-communication"
                  className="block px-3 py-2 rounded-xl text-xs hover:bg-[#18181f] text-neutral-300 hover:text-white transition-colors"
                >
                  <span className="font-semibold block text-white">Identité visuelle & Communication</span>
                  <span className="text-neutral-500 text-[11px]">Stratégie de marque & contenus</span>
                </Link>
                <Link
                  href="/services/audiovisual"
                  className="block px-3 py-2 rounded-xl text-xs hover:bg-[#18181f] text-neutral-300 hover:text-white transition-colors"
                >
                  <span className="font-semibold block text-white">Audiovisuel & Voix off</span>
                  <span className="text-neutral-500 text-[11px]">Production vidéo, motion & sound design</span>
                </Link>
                <Link
                  href="/services/training"
                  className="block px-3 py-2 rounded-xl text-xs hover:bg-[#18181f] text-neutral-300 hover:text-white transition-colors"
                >
                  <span className="font-semibold block text-white">Formation & Compétences</span>
                  <span className="text-neutral-500 text-[11px]">Ateliers d'équipe & perfectionnement</span>
                </Link>
              </div>
            )}
          </div>

          <Link
            href="/about"
            className={`transition-colors py-1 ${
              isActive('/about') ? 'text-[#EB4604] font-semibold' : 'hover:text-white'
            }`}
          >
            À propos
          </Link>

          {/* SPARKlearn with Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setSparklearnDropdown(true)}
            onMouseLeave={() => setSparklearnDropdown(false)}
          >
            <Link
              href="/sparklearn"
              className={`transition-colors py-1 flex items-center gap-1 ${
                isActive('/sparklearn') ? 'text-[#EB4604] font-semibold' : 'hover:text-white'
              }`}
            >
              <span>SPARKlearn</span>
              <svg className="w-3.5 h-3.5 opacity-70" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>

            {sparklearnDropdown && (
              <div className="absolute top-full left-0 mt-2 w-64 p-3 bg-[#0d0d10] border border-[#222228] rounded-2xl shadow-2xl space-y-1 animate-fadeIn">
                <Link
                  href="/sparklearn"
                  className="block px-3 py-2 rounded-xl text-xs hover:bg-[#18181f] text-neutral-300 hover:text-white transition-colors"
                >
                  <span className="font-semibold block text-white">Présentation</span>
                  <span className="text-neutral-500 text-[11px]">Mission éducative & impact</span>
                </Link>
                <Link
                  href="/sparklearn/masterclasses"
                  className="block px-3 py-2 rounded-xl text-xs hover:bg-[#18181f] text-neutral-300 hover:text-white transition-colors"
                >
                  <span className="font-semibold block text-white">Masterclasses gratuites</span>
                  <span className="text-neutral-500 text-[11px]">Universités & communautés</span>
                </Link>
                <Link
                  href="/sparklearn/formations"
                  className="block px-3 py-2 rounded-xl text-xs hover:bg-[#18181f] text-neutral-300 hover:text-white transition-colors"
                >
                  <span className="font-semibold block text-white">Formations & Bootcamps</span>
                  <span className="text-neutral-500 text-[11px]">Catalogue de compétences pratiques</span>
                </Link>
              </div>
            )}
          </div>

          <Link
            href="/insights"
            className={`transition-colors py-1 ${
              isActive('/insights') ? 'text-[#EB4604] font-semibold' : 'hover:text-white'
            }`}
          >
            Insights
          </Link>

          <Link
            href="/team"
            className={`transition-colors py-1 ${
              isActive('/team') ? 'text-[#EB4604] font-semibold' : 'hover:text-white'
            }`}
          >
            Équipe
          </Link>

          <Link
            href="/careers"
            className={`transition-colors py-1 ${
              isActive('/careers') ? 'text-[#EB4604] font-semibold' : 'hover:text-white'
            }`}
          >
            Carrières
          </Link>

          <Link
            href="/contact"
            className={`transition-colors py-1 ${
              isActive('/contact') ? 'text-[#EB4604] font-semibold' : 'hover:text-white'
            }`}
          >
            Contact
          </Link>
        </div>

        {/* Action Button & Mobile Hamburger */}
        <div className="flex items-center gap-4">
          <Link
            href="/contact"
            className="hidden sm:inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-white text-black text-xs font-semibold hover:bg-neutral-200 transition-all group shadow-md"
          >
            <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-[#EB4604] to-[#FFB901] flex items-center justify-center p-0.5">
              <Logo variant="symbol" className="w-full h-full" />
            </div>
            <span>Démarrer un projet</span>
            <svg
              className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7 17L17 7M17 7H7M17 7V17"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>

          {/* Hamburger button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden w-10 h-10 rounded-full border border-[#333333] bg-[#141418] text-white flex flex-col items-center justify-center gap-1.5 p-2 focus:outline-none"
            aria-label="Toggle menu"
          >
            <span
              className={`w-5 h-0.5 bg-white transition-transform duration-300 ${
                mobileMenuOpen ? 'rotate-45 translate-y-1' : ''
              }`}
            />
            <span
              className={`w-5 h-0.5 bg-white transition-opacity duration-300 ${
                mobileMenuOpen ? 'opacity-0' : 'opacity-100'
              }`}
            />
            <span
              className={`w-5 h-0.5 bg-white transition-transform duration-300 ${
                mobileMenuOpen ? '-rotate-45 -translate-y-1' : ''
              }`}
            />
          </button>
        </div>
      </nav>

      {/* Full screen mobile menu */}
      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
    </>
  )
}
