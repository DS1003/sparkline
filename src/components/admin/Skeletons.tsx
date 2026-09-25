'use client'

import React from 'react'

// Base shimmer block component — Light, clean pearl tone with silky white sheen (NO dark gray)
export function SkeletonBlock({
  className = '',
  rounded = 'rounded-xl',
}: {
  className?: string
  rounded?: string
}) {
  return (
    <div
      className={`relative overflow-hidden bg-[#ECEEF2] ${rounded} ${className} before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1.8s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/80 before:to-transparent`}
    />
  )
}

// ── 1. Table Skeleton (Used in Newsletter & Leads table view) ──
export function TableSkeleton({ rowsCount = 6 }: { rowsCount?: number }) {
  return (
    <div className="w-full animate-in fade-in duration-300">
      {/* Desktop Table View */}
      <div className="hidden md:block overflow-hidden">
        {/* Table Header */}
        <div className="px-6 py-4 bg-neutral-50/90 border-b border-neutral-200/60 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <SkeletonBlock className="w-4 h-4" rounded="rounded" />
            <SkeletonBlock className="w-32 h-3" rounded="rounded-md" />
          </div>
          <div className="flex items-center gap-8">
            <SkeletonBlock className="w-24 h-3" rounded="rounded-md" />
            <SkeletonBlock className="w-20 h-3" rounded="rounded-md" />
            <SkeletonBlock className="w-20 h-3" rounded="rounded-md" />
            <SkeletonBlock className="w-16 h-3" rounded="rounded-md" />
          </div>
        </div>

        {/* Rows */}
        <div className="divide-y divide-neutral-100/90">
          {Array.from({ length: rowsCount }).map((_, idx) => (
            <div
              key={idx}
              className="px-6 py-4 flex items-center justify-between bg-white hover:bg-neutral-50/30 transition-colors"
            >
              {/* Left: Checkbox + Avatar + Title/Email */}
              <div className="flex items-center gap-3.5 min-w-[280px]">
                <SkeletonBlock className="w-4 h-4 shrink-0" rounded="rounded" />
                <SkeletonBlock className="w-9 h-9 shrink-0" rounded="rounded-full" />
                <div className="space-y-1.5 flex-1">
                  <SkeletonBlock className="w-40 h-3.5" rounded="rounded-md" />
                  <SkeletonBlock className="w-28 h-2.5" rounded="rounded-md" />
                </div>
              </div>

              {/* Middle: Source / Badge */}
              <div className="flex items-center gap-2">
                <SkeletonBlock className="w-24 h-6" rounded="rounded-full" />
              </div>

              {/* Status Pill */}
              <div className="w-28 flex justify-center">
                <SkeletonBlock className="w-20 h-6" rounded="rounded-full" />
              </div>

              {/* Date */}
              <div className="w-24 flex justify-end">
                <SkeletonBlock className="w-16 h-3" rounded="rounded-md" />
              </div>

              {/* Actions */}
              <div className="w-20 flex justify-end gap-1.5">
                <SkeletonBlock className="w-7 h-7" rounded="rounded-lg" />
                <SkeletonBlock className="w-7 h-7" rounded="rounded-lg" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile Card Skeleton View */}
      <div className="md:hidden divide-y divide-neutral-200/60">
        {Array.from({ length: 4 }).map((_, idx) => (
          <div key={idx} className="p-4 space-y-3 bg-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <SkeletonBlock className="w-4 h-4" rounded="rounded" />
                <SkeletonBlock className="w-9 h-9" rounded="rounded-full" />
                <div className="space-y-1">
                  <SkeletonBlock className="w-36 h-3.5" rounded="rounded-md" />
                  <SkeletonBlock className="w-20 h-2.5" rounded="rounded-md" />
                </div>
              </div>
              <SkeletonBlock className="w-6 h-6" rounded="rounded-md" />
            </div>
            <div className="flex items-center justify-between pt-1">
              <SkeletonBlock className="w-20 h-6" rounded="rounded-full" />
              <SkeletonBlock className="w-16 h-3" rounded="rounded-md" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── 2. Kanban Skeleton (Used in Leads Kanban view) ──
export function KanbanSkeleton() {
  const columns = ['Nouveau', 'Contacté', 'Qualifié', 'En cours', 'Gagné']
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 animate-in fade-in duration-300">
      {columns.map((_, cIdx) => (
        <div
          key={cIdx}
          className="bg-[#F8F9FA] rounded-2xl p-3 border border-neutral-200/70 flex flex-col gap-3 min-h-[420px]"
        >
          {/* Column Header */}
          <div className="flex items-center justify-between px-1.5 py-1">
            <div className="flex items-center gap-2">
              <SkeletonBlock className="w-2.5 h-2.5" rounded="rounded-full" />
              <SkeletonBlock className="w-20 h-3.5" rounded="rounded-md" />
            </div>
            <SkeletonBlock className="w-5 h-5" rounded="rounded-full" />
          </div>

          {/* Lead Card Placeholders */}
          <div className="space-y-3 flex-1">
            {Array.from({ length: cIdx === 0 ? 3 : 2 }).map((_, rIdx) => (
              <div
                key={rIdx}
                className="bg-white rounded-xl p-3.5 border border-neutral-200/70 shadow-xs space-y-3"
              >
                <div className="flex items-start justify-between">
                  <div className="space-y-1.5 flex-1">
                    <SkeletonBlock className="w-32 h-3.5" rounded="rounded-md" />
                    <SkeletonBlock className="w-24 h-2.5" rounded="rounded-md" />
                  </div>
                  <SkeletonBlock className="w-5 h-5 shrink-0" rounded="rounded" />
                </div>
                <div className="flex flex-wrap gap-1.5">
                  <SkeletonBlock className="w-16 h-4" rounded="rounded-md" />
                  <SkeletonBlock className="w-20 h-4" rounded="rounded-md" />
                </div>
                <div className="pt-2 border-t border-neutral-100 flex items-center justify-between">
                  <SkeletonBlock className="w-14 h-3" rounded="rounded-md" />
                  <SkeletonBlock className="w-16 h-5" rounded="rounded-full" />
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

// ── 3. Metric Cards Skeleton (Used in Dashboard overview) ──
export function MetricCardsSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {Array.from({ length: 4 }).map((_, idx) => (
        <div
          key={idx}
          className="bg-white rounded-2xl sm:rounded-[24px] p-5 sm:p-6 border border-neutral-200/80 shadow-xs relative overflow-hidden space-y-4"
        >
          <div className="flex items-center justify-between">
            <SkeletonBlock className="w-28 h-3" rounded="rounded-md" />
            <SkeletonBlock className="w-9 h-9" rounded="rounded-xl" />
          </div>
          <div className="space-y-2">
            <SkeletonBlock className="w-24 h-7" rounded="rounded-lg" />
            <div className="flex items-center gap-2">
              <SkeletonBlock className="w-12 h-4.5" rounded="rounded-full" />
              <SkeletonBlock className="w-24 h-2.5" rounded="rounded-md" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

// ── 4. Full Dashboard Skeleton ──
export function DashboardSkeleton() {
  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Banner / Welcome Skeleton */}
      <div className="bg-white rounded-2xl sm:rounded-[24px] p-5 sm:p-6 border border-neutral-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-2">
          <SkeletonBlock className="w-48 h-5" rounded="rounded-lg" />
          <SkeletonBlock className="w-72 h-3.5" rounded="rounded-md" />
        </div>
        <div className="flex items-center gap-2.5">
          <SkeletonBlock className="w-28 h-8" rounded="rounded-full" />
          <SkeletonBlock className="w-32 h-8" rounded="rounded-full" />
        </div>
      </div>

      {/* 4 Metric Cards */}
      <MetricCardsSkeleton />

      {/* Studio / Chart Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Studio Timer Box Skeleton */}
        <div className="bg-white rounded-2xl sm:rounded-[24px] p-5 sm:p-6 border border-neutral-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <SkeletonBlock className="w-32 h-3.5" rounded="rounded-md" />
            <SkeletonBlock className="w-6 h-6" rounded="rounded-lg" />
          </div>
          <SkeletonBlock className="w-full h-24" rounded="rounded-2xl" />
          <div className="space-y-2">
            <SkeletonBlock className="w-full h-2.5" rounded="rounded-md" />
            <SkeletonBlock className="w-3/4 h-2.5" rounded="rounded-md" />
          </div>
        </div>

        {/* Center/Right: Activity Chart Box Skeleton */}
        <div className="lg:col-span-2 bg-white rounded-2xl sm:rounded-[24px] p-5 sm:p-6 border border-neutral-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <SkeletonBlock className="w-40 h-3.5" rounded="rounded-md" />
            <SkeletonBlock className="w-28 h-6" rounded="rounded-full" />
          </div>
          <div className="h-44 flex items-end justify-between gap-2 pt-6">
            {Array.from({ length: 7 }).map((_, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2">
                <SkeletonBlock
                  className={`w-full ${i % 2 === 0 ? 'h-28' : 'h-16'}`}
                  rounded="rounded-lg"
                />
                <SkeletonBlock className="w-6 h-2.5" rounded="rounded-sm" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Leads Table Skeleton */}
      <div className="bg-white rounded-2xl sm:rounded-[24px] border border-neutral-200/80 shadow-xs overflow-hidden">
        <div className="px-6 py-4 border-b border-neutral-100 flex items-center justify-between">
          <SkeletonBlock className="w-36 h-3.5" rounded="rounded-md" />
          <SkeletonBlock className="w-20 h-3" rounded="rounded-md" />
        </div>
        <TableSkeleton rowsCount={4} />
      </div>
    </div>
  )
}
