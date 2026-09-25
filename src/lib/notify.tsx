'use client'

import React from 'react'
import { toast, ToastOptions } from 'react-toastify'
import { CheckCircle2, AlertCircle, Info, AlertTriangle } from 'lucide-react'

const defaultOptions: ToastOptions = {
  position: 'bottom-right',
  autoClose: 3200,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
}

export const notify = {
  success: (message: string, options?: ToastOptions) => {
    return toast.success(message, {
      ...defaultOptions,
      icon: <CheckCircle2 className="w-5 h-5 text-[#EB4604]" />,
      ...options,
    })
  },
  error: (message: string, options?: ToastOptions) => {
    return toast.error(message, {
      ...defaultOptions,
      icon: <AlertCircle className="w-5 h-5 text-red-500" />,
      ...options,
    })
  },
  info: (message: string, options?: ToastOptions) => {
    return toast.info(message, {
      ...defaultOptions,
      icon: <Info className="w-5 h-5 text-neutral-300" />,
      ...options,
    })
  },
  warning: (message: string, options?: ToastOptions) => {
    return toast.warning(message, {
      ...defaultOptions,
      icon: <AlertTriangle className="w-5 h-5 text-[#FFB901]" />,
      ...options,
    })
  },
}

export { toast }
