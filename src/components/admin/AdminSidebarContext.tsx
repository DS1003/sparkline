'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

interface AdminSidebarContextType {
  isCollapsed: boolean
  setIsCollapsed: React.Dispatch<React.SetStateAction<boolean>>
  toggleSidebar: () => void
}

const AdminSidebarContext = createContext<AdminSidebarContextType | undefined>(undefined)

const STORAGE_KEY = 'sparkline_admin_sidebar_collapsed'

export function AdminSidebarProvider({ children }: { children: React.ReactNode }) {
  const [isCollapsed, setIsCollapsed] = useState(false)

  // Initialize from localStorage on client with intelligent default for small PC screens
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored !== null) {
        setIsCollapsed(stored === 'true')
      } else {
        // On screens < 1280px (MacBook 13", smaller PC displays), default to compact sidebar to maximize space
        if (typeof window !== 'undefined' && window.innerWidth < 1280) {
          setIsCollapsed(true)
        }
      }
    } catch {
      // localStorage may be disabled or restricted
    }
  }, [])

  const toggleSidebar = () => {
    setIsCollapsed((prev) => {
      const next = !prev
      try {
        localStorage.setItem(STORAGE_KEY, String(next))
      } catch {
        // Ignore localStorage error
      }
      return next
    })
  }

  // Keyboard shortcut: ⌘B or Ctrl+B to toggle sidebar cleanly
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'b') {
        const target = e.target as HTMLElement | null
        if (
          target &&
          (target.tagName === 'INPUT' ||
            target.tagName === 'TEXTAREA' ||
            target.isContentEditable)
        ) {
          return
        }
        e.preventDefault()
        toggleSidebar()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <AdminSidebarContext.Provider value={{ isCollapsed, setIsCollapsed, toggleSidebar }}>
      {children}
    </AdminSidebarContext.Provider>
  )
}

export function useAdminSidebar() {
  const context = useContext(AdminSidebarContext)
  if (!context) {
    throw new Error('useAdminSidebar must be used within an AdminSidebarProvider')
  }
  return context
}
