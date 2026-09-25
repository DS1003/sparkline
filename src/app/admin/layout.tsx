import React from 'react'
import { Metadata } from 'next'
import { getAdminSession } from '@/lib/auth/session'
import { AdminSidebar } from '@/components/admin/AdminSidebar'
import { AdminSidebarProvider } from '@/components/admin/AdminSidebarContext'
import { AdminMainContent } from '@/components/admin/AdminMainContent'
import { AdminHeader } from '@/components/admin/AdminHeader'
import { AdminToastProvider } from '@/components/admin/AdminToastProvider'
import { prisma } from '@/lib/db'

export const metadata: Metadata = {
  title: 'Administration | SPARKLINE',
  description: "Console d'administration propriétaire pour la gestion des leads et abonnés SPARKLINE.",
  robots: { index: false, follow: false },
}

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getAdminSession()

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

  // Login page — no sidebar/header
  if (!session) {
    return (
      <div className="min-h-screen bg-[#F4F5F7] text-[#0A0A0A] font-sans selection:bg-[#EB4604] selection:text-white">
        <AdminToastProvider />
        {children}
      </div>
    )
  }

  return (
    <AdminSidebarProvider>
      <AdminToastProvider />
      <div className="min-h-screen bg-[#F4F5F7] text-[#0A0D14] font-sans selection:bg-[#EB4604] selection:text-white">
        {/* Fixed sidebar — never scrolls with page content */}
        <AdminSidebar totalLeadsCount={totalLeads} newLeadsCount={newLeads} />

        {/* Main content area — left margin dynamically matches sidebar width */}
        <AdminMainContent>
          <AdminHeader
            userName={session.name || 'Direction SPARKLINE'}
            userEmail={session.email || 'admin@sparkline.sn'}
            newLeadsCount={newLeads}
          />
          <main className="flex-1 px-3 sm:px-6 pb-12 pt-2 max-w-[1440px] w-full mx-auto">
            {children}
          </main>
        </AdminMainContent>
      </div>
    </AdminSidebarProvider>
  )
}

