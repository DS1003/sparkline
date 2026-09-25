'use client'

import React, { useEffect } from 'react'
import { Sparkles, X, SlidersHorizontal, Info } from 'lucide-react'

export interface AlertModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  message: React.ReactNode
  buttonLabel?: string
  icon?: 'info' | 'filters' | 'sparkles'
}

export function AlertModal({
  isOpen,
  onClose,
  title,
  message,
  buttonLabel = 'Compris',
  icon = 'filters',
}: AlertModalProps) {
  useEffect(() => {
    if (!isOpen) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  if (!isOpen) return null

  const IconComponent =
    icon === 'filters'
      ? SlidersHorizontal
      : icon === 'info'
      ? Info
      : Sparkles

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 bg-[#0A0D14]/50 backdrop-blur-md animate-in fade-in duration-200 select-none"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-[420px] bg-white/95 backdrop-blur-xl rounded-2xl sm:rounded-[28px] p-6 sm:p-7 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.15)] border border-white relative animate-in zoom-in-95 slide-in-from-bottom-3 duration-200 ease-out text-center overflow-hidden"
      >
        {/* Subtle decorative background gradient */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[200%] h-40 bg-gradient-to-b from-[#EB4604]/10 to-transparent blur-3xl pointer-events-none" />

        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-neutral-100/60 hover:bg-neutral-200 flex items-center justify-center text-neutral-400 hover:text-neutral-700 cursor-pointer transition-colors z-10"
          title="Fermer"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="relative flex flex-col items-center z-10">
          <div className="relative mb-5">
            <div className="absolute inset-0 bg-[#EB4604]/20 rounded-full blur-xl animate-pulse" />
            <div className="relative w-14 h-14 rounded-2xl bg-gradient-to-b from-white to-orange-50 border border-orange-100 shadow-[0_8px_16px_-6px_rgba(235,70,4,0.25)] flex items-center justify-center text-[#EB4604] ring-4 ring-white">
              <IconComponent className="w-6 h-6" />
            </div>
          </div>

          <h3
            className="text-lg sm:text-xl font-bold tracking-tight text-[#0E1217] mb-2"
            style={{ fontFamily: 'var(--font-family--primary-font)' }}
          >
            {title}
          </h3>
          <div className="text-sm text-neutral-500 leading-relaxed max-w-[320px] mx-auto">
            {message}
          </div>
        </div>

        <div className="mt-7 relative z-10">
          <button
            type="button"
            onClick={onClose}
            className="w-full py-2.5 sm:py-3 rounded-xl sm:rounded-2xl bg-gradient-to-b from-[#0A0D14] to-[#161B26] hover:from-[#161B26] hover:to-[#222938] text-white text-sm font-semibold cursor-pointer shadow-lg shadow-black/10 border border-neutral-800 transition-all hover:scale-[0.98] active:scale-[0.95]"
          >
            {buttonLabel}
          </button>
        </div>
      </div>
    </div>
  )
}
