'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import {
  Mail,
  Lock,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  AlertCircle,
  Eye,
  EyeOff,
  Inbox,
  FileSpreadsheet,
  Users,
} from 'lucide-react'

export default function AdminLoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirectPath = searchParams.get('redirect') || '/admin'

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !password || loading) return

    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      const data = await res.json()

      if (res.ok && data.success) {
        router.push(redirectPath)
        router.refresh()
      } else {
        setError(data.error || 'Identifiants administrateur invalides.')
      }
    } catch {
      setError('Erreur de communication avec le serveur.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen lg:h-screen lg:h-[100dvh] w-full bg-[#EAEBED] text-[#0A0A0A] p-2 sm:p-3 lg:p-3.5 flex items-center justify-center overflow-x-hidden lg:overflow-hidden relative selection:bg-[#EB4604] selection:text-white">
      {/* Background Soft Glow Ambience */}
      <div className="absolute top-10 left-1/4 w-[500px] h-[500px] bg-[#EB4604]/[0.035] rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[500px] h-[500px] bg-[#FFB901]/[0.03] rounded-full blur-3xl pointer-events-none" />

      {/* Main Master Card: Takes full screen with sculpted rounded corners on desktop, centered card on mobile */}
      <div className="w-full max-w-md lg:max-w-none lg:h-full bg-white rounded-2xl sm:rounded-[32px] lg:rounded-[36px] border border-neutral-200/80 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05),0_1px_2px_rgba(0,0,0,0.02)] p-3 sm:p-4 lg:p-3.5 relative z-10 flex flex-col lg:flex-row overflow-hidden my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8 w-full h-full items-stretch">

          {/* LEFT PANEL: Vibrant Brand Identity & Feature Steps (Desktop only) */}
          <div className="hidden lg:flex lg:col-span-7 h-full rounded-[20px] sm:rounded-[26px] lg:rounded-[30px] p-6 sm:p-8 lg:p-12 flex-col justify-between relative overflow-hidden text-white bg-gradient-to-br from-[#0C0F17] via-[#1C1215] to-[#EB4604] shadow-inner select-none">

            {/* Ambient Lighting & Glow Flares */}
            <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#FFB901]/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-1/4 -right-16 w-80 h-80 bg-[#FF5A1F]/30 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />

            {/* Top Brand Header */}
            <div className="relative z-10 flex items-center justify-between">
              <Link href="/" className="inline-flex items-center group transition-transform duration-200 hover:scale-[1.02]">
                <Image
                  src="/images/brand/sparkline-logo-white.svg"
                  alt="SPARKLINE"
                  width={155}
                  height={36}
                  priority
                  className="h-7 sm:h-8 w-auto object-contain"
                />
              </Link>
            </div>

            {/* Center Hero Message */}
            <div className="relative z-10 my-auto py-8">
              {/* Badge Pill */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-medium text-white mb-5 shadow-xs">
                <span>Console de Pilotage</span>
              </div>

              {/* Bold Title */}
              <h2
                className="text-3xl sm:text-4xl lg:text-[44px] font-bold tracking-tight text-white leading-[1.12] mb-4"
                style={{ fontFamily: 'var(--font-family--primary-font)' }}
              >
                Pilotez l’impact.
                <span className="block text-white/85 font-normal sm:font-medium">
                  Illuminez le succès.
                </span>
              </h2>

              {/* Description */}
              <p className="text-sm sm:text-base text-white/80 max-w-md leading-relaxed">
                Supervisez vos prospects, pipeline de devis et abonnés newsletter au sein d’un écosystème haute performance.
              </p>
            </div>

            {/* Bottom 3 Feature Step Cards */}
            <div className="relative z-10 grid grid-cols-3 gap-2.5 sm:gap-3.5 pt-4">
              {/* Card 1: Active Highlighted Card */}
              <div className="bg-white rounded-2xl p-3.5 sm:p-4 text-[#0A0D14] shadow-lg transition-transform duration-200 hover:-translate-y-0.5">
                <div className="w-6 h-6 rounded-full bg-[#EB4604] text-white text-xs font-bold flex items-center justify-center mb-3 shadow-xs">
                  1
                </div>
                <p className="text-xs sm:text-[13px] font-bold leading-tight text-[#0A0D14]">
                  Superviser les leads
                </p>
              </div>

              {/* Card 2: Glassmorphic Translucent Card */}
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-3.5 sm:p-4 text-white hover:bg-white/15 transition-all duration-200">
                <div className="w-6 h-6 rounded-full bg-white/20 text-white text-xs font-bold flex items-center justify-center mb-3">
                  2
                </div>
                <p className="text-xs sm:text-[13px] font-semibold leading-tight text-white/95">
                  Pipeline & Devis
                </p>
              </div>

              {/* Card 3: Glassmorphic Translucent Card */}
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-3.5 sm:p-4 text-white hover:bg-white/15 transition-all duration-200">
                <div className="w-6 h-6 rounded-full bg-white/20 text-white text-xs font-bold flex items-center justify-center mb-3">
                  3
                </div>
                <p className="text-xs sm:text-[13px] font-semibold leading-tight text-white/95">
                  Abonnés Newsletter
                </p>
              </div>
            </div>

          </div>

          {/* RIGHT PANEL: Clean, High-End Authentication Form */}
          <div className="lg:col-span-5 h-full p-2 sm:p-6 lg:p-10 flex flex-col justify-center max-w-md mx-auto w-full my-auto">

            {/* Header Section */}
            <div>
              {/* Mobile-only Top Logo */}
              <div className="lg:hidden flex justify-center mb-5 sm:mb-6">
                <Image
                  src="/images/brand/sparkline-logo-dark.svg"
                  alt="SPARKLINE"
                  width={150}
                  height={34}
                  priority
                  className="h-7 w-auto object-contain"
                />
              </div>

              <h1
                className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 text-center lg:text-left"
                style={{ fontFamily: 'var(--font-family--primary-font)' }}
              >
                Connexion
              </h1>
              <p className="text-xs sm:text-sm text-neutral-500 mt-1.5 text-center lg:text-left">
                Entrez vos identifiants pour accéder à l’administration.
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mt-4 sm:mt-6 p-3.5 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2.5 font-medium animate-shake">
                <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleLogin} className="space-y-4 sm:space-y-5 mt-5 sm:mt-6">

              {/* Field 1: Email */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-neutral-700 block">
                  Adresse e-mail
                </label>
                <div className="relative rounded-2xl bg-neutral-50/80 hover:bg-neutral-100/60 focus-within:bg-white border border-neutral-200/90 focus-within:border-[#EB4604] focus-within:ring-4 focus-within:ring-[#EB4604]/10 transition-all flex items-center">
                  <div className="pl-4 pr-2 text-neutral-400 pointer-events-none">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="admin@sparkline.sn"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full py-3.5 pr-4 text-base sm:text-sm bg-transparent rounded-2xl text-neutral-900 placeholder:text-neutral-400 focus:outline-none font-sans"
                  />
                </div>
              </div>

              {/* Field 2: Password with Eye Toggle */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-neutral-700 block">
                    Mot de passe
                  </label>
                  <span className="text-[11px] font-mono text-neutral-400">
                    Chiffré AES-256
                  </span>
                </div>
                <div className="relative rounded-2xl bg-neutral-50/80 hover:bg-neutral-100/60 focus-within:bg-white border border-neutral-200/90 focus-within:border-[#EB4604] focus-within:ring-4 focus-within:ring-[#EB4604]/10 transition-all flex items-center">
                  <div className="pl-4 pr-2 text-neutral-400 pointer-events-none">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    autoComplete="current-password"
                    placeholder="••••••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full py-3.5 pr-2 text-base sm:text-sm bg-transparent rounded-2xl text-neutral-900 placeholder:text-neutral-400 focus:outline-none font-sans"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="p-3 text-neutral-400 hover:text-neutral-700 transition-colors cursor-pointer"
                    title={showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                <p className="text-[11px] text-neutral-400 leading-tight pt-0.5">
                  Réservé aux comptes administrateurs autorisés SPARKLINE.
                </p>
              </div>

              {/* Submit Primary Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 px-6 rounded-2xl bg-[#EB4604] hover:bg-[#D43D00] active:scale-[0.99] text-white text-sm font-bold shadow-lg shadow-[#EB4604]/25 hover:shadow-xl hover:shadow-[#EB4604]/35 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed mt-2"
              >
                {loading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Connexion en cours...</span>
                  </>
                ) : (
                  <>
                    <span>Continuer</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                  </>
                )}
              </button>

            </form>

            {/* Divider */}
            <div className="relative my-6 text-center">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-neutral-200/80" />
              </div>
              <span className="relative bg-white px-3 text-[11px] font-mono uppercase tracking-wider text-neutral-400 font-medium">
                Accès Public
              </span>
            </div>

            {/* Return to Public Site */}
            <Link
              href="/"
              className="group w-full py-3.5 px-5 rounded-2xl bg-white hover:bg-neutral-50/80 border border-neutral-200/90 hover:border-neutral-300 text-neutral-700 hover:text-[#0A0D14] text-xs sm:text-[13px] font-semibold flex items-center justify-center gap-2.5 transition-all duration-200 shadow-2xs hover:shadow-xs active:scale-[0.99] cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4 text-neutral-400 group-hover:text-[#EB4604] group-hover:-translate-x-1 transition-all duration-200" />
              <span>Retourner au site public</span>
              <span className="w-1 h-1 rounded-full bg-neutral-300 group-hover:bg-[#EB4604] transition-colors" />
              <span className="text-[11px] font-mono font-normal text-neutral-400 group-hover:text-neutral-600 transition-colors">
                sparkline.sn ↗
              </span>
            </Link>

            {/* Bottom Security Disclaimer */}
            <p className="text-[11px] text-neutral-400 text-center mt-6 leading-relaxed">
              En vous connectant, vous confirmez être un membre accrédité de l’équipe SPARKLINE. Session sécurisée par jeton chiffré.
            </p>

          </div>

        </div>
      </div>
    </div>
  )
}
