'use client'

import React, { useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import {
  LayoutDashboard,
  Inbox,
  Mail,
  LogOut,
  ExternalLink,
  Compass,
  PanelLeftClose,
} from 'lucide-react'
import { LogoutModal } from './LogoutModal'
import { useAdminSidebar } from './AdminSidebarContext'

interface AdminSidebarProps {
  totalLeadsCount?: number
  newLeadsCount?: number
}

export function AdminSidebar({ totalLeadsCount = 0, newLeadsCount = 0 }: AdminSidebarProps) {
  const pathname = usePathname()
  const router = useRouter()
  const { isCollapsed, setIsCollapsed } = useAdminSidebar()
  const [loggingOut, setLoggingOut] = React.useState(false)
  const [showLogoutModal, setShowLogoutModal] = React.useState(false)

  // Auto-collapse after 5 seconds of inactivity & hover-to-redeploy
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const userManuallyCollapsedRef = useRef(false)

  const clearAutoCollapseTimer = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current)
      timerRef.current = null
    }
  }, [])

  const startAutoCollapseTimer = useCallback(() => {
    clearAutoCollapseTimer()
    if (!isCollapsed && !showLogoutModal) {
      timerRef.current = setTimeout(() => {
        setIsCollapsed(true)
      }, 5000)
    }
  }, [clearAutoCollapseTimer, isCollapsed, showLogoutModal, setIsCollapsed])

  // Automatically arm the 5s timer whenever sidebar is expanded
  useEffect(() => {
    if (!isCollapsed) {
      startAutoCollapseTimer()
    } else {
      clearAutoCollapseTimer()
    }
    return () => clearAutoCollapseTimer()
  }, [isCollapsed, startAutoCollapseTimer, clearAutoCollapseTimer])

  // Hover over collapsed sidebar redeploys it immediately
  const handleMouseEnter = () => {
    clearAutoCollapseTimer()
    if (isCollapsed && !userManuallyCollapsedRef.current) {
      setIsCollapsed(false)
    }
  }

  const handleMouseMove = () => {
    clearAutoCollapseTimer()
    if (isCollapsed && !userManuallyCollapsedRef.current) {
      setIsCollapsed(false)
    }
  }

  const handleMouseLeave = () => {
    userManuallyCollapsedRef.current = false
    startAutoCollapseTimer()
  }

  const handleManualToggle = (e?: React.MouseEvent) => {
    e?.stopPropagation()
    if (!isCollapsed) {
      userManuallyCollapsedRef.current = true
      clearAutoCollapseTimer()
      setIsCollapsed(true)
    } else {
      userManuallyCollapsedRef.current = false
      setIsCollapsed(false)
    }
  }

  // Do not render on login page
  if (pathname === '/admin/login') return null

  const handleLogout = async () => {
    if (loggingOut) return
    setLoggingOut(true)
    try {
      await fetch('/api/admin/logout', { method: 'POST' })
      router.push('/admin/login')
      router.refresh()
    } catch {
      router.push('/admin/login')
    } finally {
      setLoggingOut(false)
      setShowLogoutModal(false)
    }
  }

  const menuItems = [
    {
      label: 'Dashboard',
      href: '/admin',
      icon: LayoutDashboard,
      badge: null,
    },
    {
      label: 'Leads & Devis',
      href: '/admin/leads',
      icon: Inbox,
      badge: newLeadsCount > 0 ? `${newLeadsCount}` : totalLeadsCount > 0 ? `${totalLeadsCount}` : null,
      badgeHighlight: newLeadsCount > 0,
    },
    {
      label: 'Newsletter',
      href: '/admin/newsletter',
      icon: Mail,
      badge: null,
    },
  ]

  const generalItems = [
    {
      label: 'Studio & Site',
      href: '/',
      icon: Compass,
      external: true,
    },
  ]

  return (
    <aside
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative shrink-0 bg-white border-r border-neutral-200/70 hidden md:flex flex-col justify-between min-h-screen sticky top-0 h-screen z-30 select-none px-3.5 py-5 transition-[width] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-[width] ${
        isCollapsed ? 'w-[72px]' : 'w-64'
      }`}
    >
      <div className="space-y-6">
        {/* ── Brand Header: Full horizontal logo when deployed, perfectly centered pictogram when retracted ── */}
        <div className="relative h-9 flex items-center w-full">
          <Link
            href="/admin"
            className={`flex items-center h-8 group transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              isCollapsed ? 'mx-auto justify-center' : 'justify-start'
            }`}
            title="SPARKLINE Administration"
          >
            {/* Retracted Mode: Pictogram only (sparkline-symbol.svg) */}
            <div
              className={`transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                isCollapsed
                  ? 'w-8 h-8 opacity-100 scale-100 flex items-center justify-center'
                  : 'w-0 h-0 opacity-0 scale-75 overflow-hidden pointer-events-none'
              }`}
            >
              <Image
                src="/images/brand/sparkline-symbol.svg"
                alt="SPARKLINE"
                width={32}
                height={32}
                priority
                className="w-8 h-8 object-contain transition-transform duration-200 group-hover:scale-105 block shrink-0"
              />
            </div>

            {/* Deployed Mode: Complete horizontal logo (sparkline-logo-dark.svg) */}
            <div
              className={`transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                isCollapsed
                  ? 'w-0 h-0 opacity-0 scale-95 overflow-hidden pointer-events-none'
                  : 'w-auto h-7 opacity-100 scale-100 flex items-center'
              }`}
            >
              <Image
                src="/images/brand/sparkline-logo-dark.svg"
                alt="SPARKLINE"
                width={145}
                height={29}
                priority
                className="h-7 w-auto object-contain shrink-0 transition-transform duration-200 group-hover:scale-[1.02] block"
              />
            </div>
          </Link>

          {/* Single Collapse Button: Absolute right, never interferes with centering */}
          <button
            onClick={handleManualToggle}
            className={`absolute right-0 top-1/2 -translate-y-1/2 w-8 h-8 rounded-xl bg-neutral-50 hover:bg-neutral-100 border border-neutral-200/70 text-neutral-400 hover:text-neutral-800 flex items-center justify-center transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] cursor-pointer shadow-2xs hover:scale-105 active:scale-95 shrink-0 z-10 ${
              isCollapsed
                ? 'opacity-0 scale-75 pointer-events-none'
                : 'opacity-100 scale-100'
            }`}
            title="Réduire le menu (⌘B)"
          >
            <PanelLeftClose className="w-4 h-4" />
          </button>
        </div>

        {/* ── Menu Section ── */}
        <div className="space-y-1">
          {/* Section Heading with smooth crossfade divider */}
          <div className="relative h-5 flex items-center px-3 mb-1">
            <span
              className={`text-[11px] font-mono uppercase tracking-wider text-neutral-400 font-semibold whitespace-nowrap transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                isCollapsed ? 'opacity-0 -translate-x-2 pointer-events-none' : 'opacity-100 translate-x-0'
              }`}
            >
              Menu
            </span>
            <div
              className={`absolute inset-x-3 h-px bg-neutral-200/80 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                isCollapsed ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'
              }`}
            />
          </div>

          <nav className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href

              return (
                <div key={item.href} className="relative group/item">
                  <Link
                    href={item.href}
                    className={`flex items-center h-11 px-3 rounded-2xl text-sm font-medium transition-colors duration-200 ${
                      isActive
                        ? 'bg-[#0A0D14] text-white shadow-xs'
                        : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100/70'
                    }`}
                  >
                    {/* Fixed 20x20 Icon Anchor */}
                    <div className="w-5 h-5 shrink-0 flex items-center justify-center relative">
                      <Icon
                        className={`w-4 h-4 shrink-0 transition-colors ${
                          isActive
                            ? 'text-[#EB4604]'
                            : 'text-neutral-400 group-hover/item:text-neutral-700'
                        }`}
                      />
                      {/* Micro-dot alert in collapsed mode */}
                      {item.badge && (
                        <span
                          className={`absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full ring-2 ring-white transition-opacity duration-300 ${
                            isCollapsed ? 'opacity-100' : 'opacity-0'
                          } ${item.badgeHighlight ? 'bg-[#EB4604] animate-pulse' : 'bg-neutral-400'}`}
                        />
                      )}
                    </div>

                    {/* Sliding Label & Badge */}
                    <div
                      className={`flex items-center justify-between flex-1 overflow-hidden whitespace-nowrap transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                        isCollapsed
                          ? 'max-w-0 opacity-0 -translate-x-3 pointer-events-none'
                          : 'max-w-[170px] opacity-100 translate-x-0 ml-3'
                      }`}
                    >
                      <span
                        className={`truncate ${
                          isActive
                            ? 'font-bold text-white'
                            : 'text-neutral-600 group-hover/item:text-neutral-900'
                        }`}
                      >
                        {item.label}
                      </span>

                      {/* Badge in expanded mode */}
                      {item.badge && (
                        <span
                          className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-bold ml-2 shrink-0 ${
                            isActive
                              ? item.badgeHighlight
                                ? 'bg-[#EB4604] text-white'
                                : 'bg-neutral-900 text-white'
                              : item.badgeHighlight
                              ? 'bg-[#EB4604]/10 text-[#EB4604]'
                              : 'bg-neutral-100 text-neutral-600'
                          }`}
                        >
                          {item.badge}
                        </span>
                      )}
                    </div>
                  </Link>

                  {/* Hover Tooltip in Collapsed Mode */}
                  {isCollapsed && (
                    <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-xl bg-[#0A0D14] text-white text-xs font-semibold shadow-xl whitespace-nowrap opacity-0 pointer-events-none translate-x-1 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all duration-150 z-50 flex items-center gap-2">
                      <span>{item.label}</span>
                      {item.badge && (
                        <span className="px-1.5 py-0.2 rounded-full text-[10px] font-mono font-bold bg-[#EB4604] text-white">
                          {item.badge}
                        </span>
                      )}
                      <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-2 h-2 bg-[#0A0D14] rotate-45" />
                    </div>
                  )}
                </div>
              )
            })}
          </nav>
        </div>
      </div>

      {/* ── General Section (Anchored at bottom, no duplicate card) ── */}
      <div className="mt-auto pt-4 space-y-1 border-t border-neutral-200/60">
        {/* Section Heading with smooth crossfade divider */}
        <div className="relative h-5 flex items-center px-3 mb-1">
          <span
            className={`text-[11px] font-mono uppercase tracking-wider text-neutral-400 font-semibold whitespace-nowrap transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              isCollapsed ? 'opacity-0 -translate-x-2 pointer-events-none' : 'opacity-100 translate-x-0'
            }`}
          >
            Général
          </span>
          <div
            className={`absolute inset-x-3 h-px bg-neutral-200/80 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              isCollapsed ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'
            }`}
          />
        </div>

        <nav className="space-y-1">
          {generalItems.map((item) => {
            const Icon = item.icon
            return (
              <div key={item.label} className="relative group/general">
                <Link
                  href={item.href}
                  target={item.external ? '_blank' : undefined}
                  className="flex items-center h-11 px-3 rounded-2xl text-sm font-medium text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100/70 transition-colors duration-200"
                >
                  <div className="w-5 h-5 shrink-0 flex items-center justify-center">
                    <Icon className="w-4 h-4 text-neutral-400 group-hover/general:text-neutral-700 shrink-0" />
                  </div>
                  <div
                    className={`flex items-center justify-between flex-1 overflow-hidden whitespace-nowrap transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                      isCollapsed
                        ? 'max-w-0 opacity-0 -translate-x-3 pointer-events-none'
                        : 'max-w-[170px] opacity-100 translate-x-0 ml-3'
                    }`}
                  >
                    <span className="truncate">{item.label}</span>
                    {item.external && <ExternalLink className="w-3.5 h-3.5 text-neutral-400 ml-2 shrink-0" />}
                  </div>
                </Link>

                {/* Tooltip in Collapsed Mode */}
                {isCollapsed && (
                  <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-xl bg-[#0A0D14] text-white text-xs font-semibold shadow-xl whitespace-nowrap opacity-0 pointer-events-none translate-x-1 group-hover/general:opacity-100 group-hover/general:translate-x-0 transition-all duration-150 z-50 flex items-center gap-1.5">
                    <span>{item.label}</span>
                    <ExternalLink className="w-3 h-3 text-neutral-400" />
                    <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-2 h-2 bg-[#0A0D14] rotate-45" />
                  </div>
                )}
              </div>
            )
          })}

          {/* Logout Button */}
          <div className="relative group/logout">
            <button
              onClick={() => setShowLogoutModal(true)}
              disabled={loggingOut}
              className="w-full flex items-center h-11 px-3 rounded-2xl text-sm font-medium text-neutral-600 hover:text-red-600 hover:bg-red-50/70 transition-colors duration-200 cursor-pointer"
            >
              <div className="w-5 h-5 shrink-0 flex items-center justify-center">
                <LogOut className="w-4 h-4 text-neutral-400 group-hover/logout:text-red-500 shrink-0" />
              </div>
              <div
                className={`overflow-hidden whitespace-nowrap transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  isCollapsed
                    ? 'max-w-0 opacity-0 -translate-x-3 pointer-events-none'
                    : 'max-w-[170px] opacity-100 translate-x-0 ml-3'
                }`}
              >
                <span className="truncate">{loggingOut ? 'Déconnexion...' : 'Déconnexion'}</span>
              </div>
            </button>

            {/* Tooltip in Collapsed Mode */}
            {isCollapsed && (
              <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-xl bg-[#0A0D14] text-white text-xs font-semibold shadow-xl whitespace-nowrap opacity-0 pointer-events-none translate-x-1 group-hover/logout:opacity-100 group-hover/logout:translate-x-0 transition-all duration-150 z-50 flex items-center gap-1.5">
                <span>Déconnexion</span>
                <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-2 h-2 bg-[#0A0D14] rotate-45" />
              </div>
            )}
          </div>
        </nav>
      </div>

      {/* Logout Confirmation Modal */}
      <LogoutModal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={handleLogout}
        loading={loggingOut}
      />
    </aside>
  )
}
