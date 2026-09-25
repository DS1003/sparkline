'use client'

import React from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export function AdminToastProvider() {
  return (
    <>
      <style jsx global>{`
        .Toastify__toast-container {
          z-index: 99999 !important;
          padding: 12px;
        }
        .Toastify__toast {
          background: #0A0D14 !important;
          color: #FFFFFF !important;
          border: 1px solid rgba(255, 255, 255, 0.1) !important;
          border-radius: 18px !important;
          box-shadow: 0 20px 40px -15px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.05) !important;
          font-family: inherit !important;
          font-size: 13px !important;
          font-weight: 500 !important;
          padding: 14px 18px !important;
          margin-bottom: 10px !important;
          backdrop-filter: blur(12px) !important;
        }
        .Toastify__toast--success {
          border-left: 3px solid #EB4604 !important;
        }
        .Toastify__toast--error {
          border-left: 3px solid #EF4444 !important;
        }
        .Toastify__toast--info {
          border-left: 3px solid #3B82F6 !important;
        }
        .Toastify__toast--warning {
          border-left: 3px solid #FFB901 !important;
        }
        .Toastify__progress-bar {
          background: linear-gradient(90deg, #FFB901, #EB4604) !important;
          height: 3px !important;
        }
        .Toastify__close-button {
          color: rgba(255, 255, 255, 0.4) !important;
          opacity: 1 !important;
          transition: color 0.15s ease !important;
          margin-left: 12px !important;
        }
        .Toastify__close-button:hover {
          color: #FFFFFF !important;
        }
      `}</style>
      <ToastContainer
        position="bottom-right"
        autoClose={3500}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  )
}
