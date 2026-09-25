import React from 'react'
import { Metadata } from 'next'
import { getAdminSession } from '@/lib/auth/session'
import { AdminSidebar } from '@/components/admin/AdminSidebar'
import { AdminSidebarProvider } from '@/components/admin/AdminSidebarContext'
import { AdminHeader } from '@/components/admin/AdminHeader'
import { prisma } from '@/lib/db'

export const metadata: Metadata = {
  title: 'Administration | SPARKLINE',
  description: 'Console d’administration propriétaire pour la gestion des leads et abonnés SPARKLINE.',
  robots: { index: false, follow: false },
}

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getAdminSession()

  // Fetch quick lead counts for sidebar badges
  let totalLeads = 0
  let newLeads = 0
  if (session) {
    try {
      const [t, n] = await Promise.all([
        prisma.lead.count(),
        prisma.lead.count({ where: { status: 'NEW' } }),
      ])
      totalLeads = t
      newLeads = n
    } catch {
      // Fallback in case of temporary DB lock
    }
  }

  // Login page layout without sidebar/header
  if (!session) {
    return (
      <div className="min-h-screen bg-[#F4F5F7] text-[#0A0A0A] font-sans selection:bg-[#EB4604] selection:text-white">
        {children}
      </div>
    )
  }

  return (
    <AdminSidebarProvider>
      <div className="min-h-screen bg-[#F4F5F7] text-[#0A0D14] flex font-sans selection:bg-[#EB4604] selection:text-white overflow-x-hidden">
        {/* Left Collapsible Sidebar */}
        <AdminSidebar totalLeadsCount={totalLeads} newLeadsCount={newLeads} />

        {/* Main App Container */}
        <div className="flex-1 flex flex-col min-w-0 max-w-full">
          <AdminHeader
            userName={session.name || 'Direction SPARKLINE'}
            userEmail={session.email || 'admin@sparkline.sn'}
            newLeadsCount={newLeads}
          />
          <main className="flex-1 px-3 sm:px-6 pb-12 pt-2 max-w-[1440px] w-full mx-auto">
            {children}
          </main>
        </div>
      </div>
    </AdminSidebarProvider>
  )
}
