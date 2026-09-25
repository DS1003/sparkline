'use client'

import React, { useEffect } from 'react'
import { Trash2, AlertTriangle, AlertCircle, CheckCircle2, X } from 'lucide-react'

export interface ConfirmModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void | Promise<void>
  title: string
  message: React.ReactNode
  confirmLabel?: string
  cancelLabel?: string
  variant?: 'danger' | 'warning' | 'primary'
  loading?: boolean
}

export function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmLabel = 'Confirmer',
  cancelLabel = 'Annuler',
  variant = 'danger',
  loading = false,
}: ConfirmModalProps) {
  useEffect(() => {
    if (!isOpen) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !loading) onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, loading, onClose])

  if (!isOpen) return null

  // Styles based on variant
  const config = {
    danger: {
      glowBg: 'from-red-500/10',
      pulseBg: 'bg-red-500/20',
      iconBoxBg: 'from-white to-red-50 border-red-100 shadow-[0_8px_16px_-6px_rgba(239,68,68,0.25)] text-red-500',
      Icon: Trash2,
      btnBg: 'bg-gradient-to-b from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 border-red-600 shadow-[0_4px_12px_-2px_rgba(239,68,68,0.3)] shadow-inner shadow-red-400/50',
    },
    warning: {
      glowBg: 'from-amber-500/10',
      pulseBg: 'bg-amber-500/20',
      iconBoxBg: 'from-white to-amber-50 border-amber-100 shadow-[0_8px_16px_-6px_rgba(245,158,11,0.25)] text-amber-500',
      Icon: AlertTriangle,
      btnBg: 'bg-gradient-to-b from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 border-amber-600 shadow-[0_4px_12px_-2px_rgba(245,158,11,0.3)] shadow-inner shadow-amber-400/50',
    },
    primary: {
      glowBg: 'from-[#EB4604]/10',
      pulseBg: 'bg-[#EB4604]/20',
      iconBoxBg: 'from-white to-orange-50 border-orange-100 shadow-[0_8px_16px_-6px_rgba(235,70,4,0.25)] text-[#EB4604]',
      Icon: CheckCircle2,
      btnBg: 'bg-gradient-to-b from-[#EB4604] to-[#D43D00] hover:from-[#FF6A1A] hover:to-[#EB4604] border-[#EB4604] shadow-[0_4px_12px_-2px_rgba(235,70,4,0.35)] shadow-inner shadow-orange-400/50',
    },
  }[variant]

  const IconComponent = config.Icon

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
        <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-[200%] h-40 bg-gradient-to-b ${config.glowBg} to-transparent blur-3xl pointer-events-none`} />

        <button
          onClick={onClose}
          disabled={loading}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-neutral-100/60 hover:bg-neutral-200 flex items-center justify-center text-neutral-400 hover:text-neutral-700 cursor-pointer transition-colors z-10"
          title="Fermer"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="relative flex flex-col items-center z-10">
          {/* Animated Icon Container */}
          <div className="relative mb-5">
            <div className={`absolute inset-0 ${config.pulseBg} rounded-full blur-xl animate-pulse`} />
            <div className={`relative w-14 h-14 rounded-2xl bg-gradient-to-b ${config.iconBoxBg} flex items-center justify-center ring-4 ring-white`}>
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

        <div className="mt-7 grid grid-cols-2 gap-3 relative z-10">
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="w-full py-2.5 sm:py-3 rounded-xl sm:rounded-2xl bg-neutral-100 hover:bg-neutral-200 text-sm font-semibold text-neutral-700 cursor-pointer transition-all hover:scale-[0.98] active:scale-[0.95]"
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={loading}
            className={`w-full py-2.5 sm:py-3 rounded-xl sm:rounded-2xl ${config.btnBg} text-white text-sm font-semibold cursor-pointer transition-all hover:scale-[0.98] active:scale-[0.95] flex items-center justify-center gap-2`}
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>En cours...</span>
              </>
            ) : (
              <span>{confirmLabel}</span>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
