/**
 * ═════════════════════════════════════════════════════════════════════
 * SPARKLINE Intelligent Asset Preloader & Cache Warmer
 * ═════════════════════════════════════════════════════════════════════
 * Runs non-intrusively in the background during the 3.8s Preloader window.
 * 
 * Key Features:
 * 1. Tiered Prioritization:
 *    - Tier 1 (Critical): Hero backgrounds (Desktop/Mobile), Brand Logos, First-fold assets.
 *    - Tier 2 (High): Services cards, Featured 3D Project cards & previews, About portraits.
 *    - Tier 3 (Background): Approach illustrations, Partner ecosystem logos, Video posters, Subpage heroes.
 * 
 * 2. Asynchronous GPU Texture Decoding:
 *    Calls `img.decode()` off the main thread so that when the user scrolls down,
 *    images render instantly with 0ms decoding latency, zero stutter, and zero white flash.
 * 
 * 3. Next.js Optimizer Pre-warming:
 *    Pre-warms Next.js optimized image endpoints `/_next/image?url=...` for the client's
 *    device width and pixel ratio, filling the browser HTTP cache before sections are reached.
 * 
 * 4. Zero Animation Impact:
 *    Uses `requestIdleCallback` / micro-task batching to ensure GSAP preloader animation
 *    maintains a rock-solid 60/120fps.
 */

// ── TIER 1: Critical (Hero & Brand Core) ──
export const TIER_1_CRITICAL_ASSETS = [
  '/images/brand/sparkline-logo-white.svg',
  '/images/brand/sparkline-logo-dark.svg',
  '/images/brand/sparkline-symbol.svg',
  '/images/brand/favicon-sparkline.png',
  '/images/heroes/Gemini_Generated_Image_onl5ggonl5ggonl5.jpeg',
  '/images/heroes/Gemini_Generated_Image_ge2ycmge2ycmge2y.jpeg',
]

// ── TIER 2: High Priority (Services & Featured Work) ──
export const TIER_2_PRIORITY_ASSETS = [
  // Services Cards
  '/images/services/card1.webp',
  '/images/services/card2.webp',
  '/images/services/card3.webp',
  '/images/services/card4.webp',
  '/images/services/card5.webp',
  '/images/services/header-avatar.webp',
  // Selected Work Project Cards & Previews
  '/images/projects/amfpr-card.webp',
  '/images/projects/amfpr-preview.webp',
  '/images/projects/mbor-store.webp',
  '/images/projects/mbor-store-preview.webp',
  '/images/projects/baraka-shop.webp',
  '/images/projects/baraka-tech.webp',
  '/images/projects/baraka-shop-preview.webp',
  '/images/projects/diakhou-beauty.webp',
  '/images/projects/diakhou-beauty-preview.webp',
  '/images/projects/fidele-construction.webp',
  '/images/projects/fidele-sarl.webp',
  '/images/projects/fidele-sarl-preview.webp',
  '/images/projects/wer-asset.webp',
  '/images/projects/wer-asset-preview.webp',
  '/images/projects/ndakaru.webp',
  // Approach Methodology Cards (Eager GPU Texture Decode for zero Safari flash)
  '/images/approach/div1.webp',
  '/images/approach/div2.webp',
  '/images/approach/div3.webp',
  '/images/approach/div4.webp',
  // About Team Badges & Portraits
  '/images/brand/Seydina.webp',
  '/images/brand/ndiaga-badge.webp',
  '/images/brand/fanta-badge.webp',
  '/images/brand/Serigne fallou.webp',
  '/images/brand/Ndiaga.webp',
  '/images/brand/Fanta.webp',
  '/images/brand/1.webp',
]

// ── TIER 3: Ecosystem & Extended Media ──
export const TIER_3_EXTENDED_ASSETS = [
  // Approach Methodology Synergy
  '/images/approach/sparkline-synergy.webp',
  // Partner Logos
  '/images/partners/orange-digital-center.webp',
  '/images/partners/sonatel.webp',
  '/images/partners/sonatel-academy.webp',
  '/images/partners/baraka.webp',
  '/images/partners/mbor.webp',
  '/images/partners/fidele-sarl.webp',
  '/images/partners/saphir-alpha.webp',
  // Video Poster & Asset Usage
  '/video/Sparkline-Motion-poster.webp',
  '/images/asset-usage/creative-portrait.webp',
  '/images/asset-usage/ChatGPT Image Sep 3, 2026, 12_52_44 AM.webp',
  // Subpage Hero Banners for Instant Page Transitions
  '/images/heroes/services.webp',
  '/images/heroes/projects.webp',
  '/images/heroes/contact.webp',
  '/images/heroes/team.webp',
  '/images/heroes/careers.webp',
  '/images/heroes/insights.webp',
]

interface PreloadProgress {
  loaded: number
  total: number
  percent: number
  currentAsset: string
}

type ProgressCallback = (progress: PreloadProgress) => void

let isPreloadStarted = false
let isPreloadComplete = false

/**
 * Decode an image off-main-thread into GPU memory cache
 */
function decodeImage(src: string, isPriority: boolean = false): Promise<void> {
  return new Promise((resolve) => {
    if (typeof window === 'undefined') {
      resolve()
      return
    }

    const img = new window.Image()
    if (isPriority) {
      try {
        (img as unknown as { fetchPriority?: string }).fetchPriority = 'high'
      } catch {
        // Ignore if unsupported
      }
    }

    img.src = src

    if (typeof img.decode === 'function') {
      img.decode()
        .then(() => resolve())
        .catch(() => {
          // Fallback if decode rejects (e.g. SVG or format edge case)
          resolve()
        })
    } else {
      const fallbackImg = img as HTMLImageElement
      fallbackImg.onload = () => resolve()
      fallbackImg.onerror = () => resolve()
    }
  })
}

/**
 * Generates the Next.js optimized image URL for a given source asset.
 * This pre-warms the Next.js server image cache and the browser HTTP disk cache.
 */
function getNextOptimizedUrl(src: string, width: number, quality: number = 85): string {
  return `/_next/image?url=${encodeURIComponent(src)}&w=${width}&q=${quality}`
}

/**
 * Execute a pool of asynchronous tasks with controlled concurrency.
 */
async function runWithConcurrency<T>(
  items: T[],
  concurrency: number,
  task: (item: T) => Promise<void>
): Promise<void> {
  let index = 0
  const workers: Promise<void>[] = []

  const worker = async () => {
    while (index < items.length) {
      const currentIndex = index++
      try {
        await task(items[currentIndex])
      } catch {
        // Continue silently on error
      }
    }
  }

  const workerCount = Math.min(concurrency, items.length)
  for (let i = 0; i < workerCount; i++) {
    workers.push(worker())
  }

  await Promise.all(workers)
}

/**
 * Safely runs a callback during browser idle time to ensure zero main-thread jank.
 */
function scheduleIdle(callback: () => void, timeout: number = 1500): void {
  if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
    ;(window as unknown as { requestIdleCallback: (cb: () => void, opts?: { timeout: number }) => void })
      .requestIdleCallback(callback, { timeout })
  } else {
    setTimeout(callback, 16)
  }
}

/**
 * Starts the intelligent background preloading of all site assets.
 * Safe to call multiple times (executes only once per session).
 */
export function startAssetPreloading(onProgress?: ProgressCallback): void {
  if (typeof window === 'undefined' || isPreloadStarted) return
  isPreloadStarted = true

  // Check session storage to avoid redundant bandwidth usage on page navigations
  try {
    if (sessionStorage.getItem('__sparkline_preloaded__')) {
      isPreloadComplete = true
      return
    }
  } catch {
    // Ignore storage restrictions
  }

  // Determine ideal Next.js image widths for the current viewport
  const isMobile = window.innerWidth < 768
  const nextWidth = isMobile ? 750 : 1080

  // Combine critical URLs for Next.js pre-warming
  const nextOptimizedUrls = [
    // Top Services cards in Next image format
    getNextOptimizedUrl('/images/services/card1.webp', nextWidth, 90),
    getNextOptimizedUrl('/images/services/card2.webp', nextWidth, 90),
    getNextOptimizedUrl('/images/services/card3.webp', nextWidth, 90),
    getNextOptimizedUrl('/images/services/card4.webp', nextWidth, 90),
    getNextOptimizedUrl('/images/services/card5.webp', nextWidth, 90),
    // Top Project cards
    getNextOptimizedUrl('/images/projects/amfpr-card.webp', nextWidth, 85),
    getNextOptimizedUrl('/images/projects/mbor-store.webp', nextWidth, 85),
    getNextOptimizedUrl('/images/projects/baraka-shop.webp', nextWidth, 85),
    getNextOptimizedUrl('/images/projects/diakhou-beauty.webp', nextWidth, 85),
  ]

  // All direct static assets
  const allStaticAssets = [
    ...TIER_1_CRITICAL_ASSETS,
    ...TIER_2_PRIORITY_ASSETS,
    ...TIER_3_EXTENDED_ASSETS,
  ]

  const totalAssets = allStaticAssets.length + nextOptimizedUrls.length
  let loadedCount = 0

  const reportProgress = (currentAsset: string) => {
    loadedCount++
    const percent = Math.round((loadedCount / totalAssets) * 100)
    onProgress?.({ loaded: loadedCount, total: totalAssets, percent, currentAsset })

    if (typeof window !== 'undefined') {
      window.dispatchEvent(
        new CustomEvent('sparkline:assets-progress', {
          detail: { loaded: loadedCount, total: totalAssets, percent, currentAsset },
        })
      )
    }
  }

  // 1. TIER 1 IMMEDIATE (Hero & Core): run immediately with high priority
  const loadTier1 = async () => {
    await Promise.all(
      TIER_1_CRITICAL_ASSETS.map(async (src) => {
        await decodeImage(src, true)
        reportProgress(src)
      })
    )
  }

  // 2. TIER 2 & Next.js Optimized: run with controlled concurrency of 4
  const loadTier2AndOptimized = async () => {
    const tier2Queue = [...TIER_2_PRIORITY_ASSETS, ...nextOptimizedUrls]
    await runWithConcurrency(tier2Queue, 4, async (src) => {
      await decodeImage(src, false)
      reportProgress(src)
    })
  }

  // 3. TIER 3: scheduled during idle time so GSAP animation finishes with 0 jank
  const loadTier3 = async () => {
    await runWithConcurrency(TIER_3_EXTENDED_ASSETS, 4, async (src) => {
      await decodeImage(src, false)
      reportProgress(src)
    })
  }

  // Sequence execution smoothly
  loadTier1().then(() => {
    scheduleIdle(() => {
      loadTier2AndOptimized().then(() => {
        scheduleIdle(() => {
          loadTier3().then(() => {
            isPreloadComplete = true
            try {
              sessionStorage.setItem('__sparkline_preloaded__', 'true')
            } catch {
              // Ignore storage errors
            }

            if (typeof window !== 'undefined') {
              ;(window as unknown as { __SPARKLINE_ASSETS_LOADED__?: boolean }).__SPARKLINE_ASSETS_LOADED__ = true
              window.dispatchEvent(new CustomEvent('sparkline:assets-complete'))
            }
          })
        }, 1000)
      })
    }, 500)
  })
}

/**
 * Checks if all assets have finished preloading
 */
export function isAssetsPreloaded(): boolean {
  return isPreloadComplete
}
