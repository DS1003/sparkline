'use client'

import React, { useEffect } from 'react'
import { LogOut, X } from 'lucide-react'

interface LogoutModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  loading?: boolean
}

export function LogoutModal({ isOpen, onClose, onConfirm, loading = false }: LogoutModalProps) {
  useEffect(() => {
    if (!isOpen) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !loading) onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, loading, onClose])

  if (!isOpen) return null

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-[#0A0D14]/40 backdrop-blur-md animate-in fade-in duration-300 select-none"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-[400px] bg-white/90 backdrop-blur-xl rounded-2xl sm:rounded-[32px] p-6 sm:p-8 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] border border-white relative animate-in zoom-in-95 slide-in-from-bottom-4 duration-300 ease-out text-center overflow-hidden"
      >
        {/* Subtle decorative background gradient */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[200%] h-40 bg-gradient-to-b from-red-500/10 to-transparent blur-3xl pointer-events-none" />

        <button
          onClick={onClose}
          disabled={loading}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-neutral-100/50 hover:bg-neutral-200 flex items-center justify-center text-neutral-400 hover:text-neutral-700 cursor-pointer transition-colors z-10"
          title="Fermer"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="relative flex flex-col items-center z-10">
          {/* Animated Icon Container */}
          <div className="relative mb-6">
            <div className="absolute inset-0 bg-red-500/20 rounded-full blur-xl animate-pulse" />
            <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-b from-white to-red-50 border border-red-100 shadow-[0_8px_16px_-6px_rgba(239,68,68,0.2)] flex items-center justify-center text-red-500 ring-4 ring-white">
              <LogOut className="w-7 h-7 -ml-0.5" />
            </div>
          </div>

          <h3
            className="text-xl font-bold tracking-tight text-[#0E1217] mb-2"
            style={{ fontFamily: 'var(--font-family--primary-font)' }}
          >
            Déconnexion
          </h3>
          <p className="text-sm text-neutral-500 leading-relaxed max-w-[280px] mx-auto">
            Êtes-vous sûr de vouloir quitter votre session <strong className="font-semibold text-neutral-700">SPARKLINE</strong> ? Vous devrez vous reconnecter.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-3 relative z-10">
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="w-full py-3 rounded-2xl bg-neutral-100 hover:bg-neutral-200 text-sm font-semibold text-neutral-700 cursor-pointer transition-all hover:scale-[0.98] active:scale-[0.95]"
          >
            Annuler
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={loading}
            className="w-full py-3 rounded-2xl bg-gradient-to-b from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white text-sm font-semibold cursor-pointer shadow-[0_4px_12px_-2px_rgba(239,68,68,0.3)] shadow-inner shadow-red-400/50 border border-red-600 transition-all hover:scale-[0.98] active:scale-[0.95] flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>En cours...</span>
              </>
            ) : (
              <span>Confirmer</span>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
