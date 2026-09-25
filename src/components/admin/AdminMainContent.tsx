'use client'

import React from 'react'
import { useAdminSidebar } from './AdminSidebarContext'

export function AdminMainContent({ children }: { children: React.ReactNode }) {
  const { isCollapsed } = useAdminSidebar()

  return (
    <div
      className={`flex flex-col flex-1 min-h-screen min-w-0 transition-[margin-left] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isCollapsed ? 'md:ml-[72px]' : 'md:ml-64'
      }`}
    >
      {children}
    </div>
  )
}
