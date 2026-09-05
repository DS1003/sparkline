import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { siteConfig } from '@/config/site'
import { ScrollToTop } from '@/components/ui/ScrollToTop'
import { ScrollProgressBar } from '@/components/ui/ScrollProgressBar'
import { BubbleNav } from '@/components/layout/BubbleNav'
import { ClickSpark } from '@/components/effects/ClickSpark'
import { SmoothScrollProvider } from '@/components/layout/SmoothScrollProvider'


const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} — ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [...siteConfig.keywords],
  authors: [...siteConfig.authors],
  creator: siteConfig.creator,
  icons: {
    icon: [
      { url: '/images/brand/favicon-sparkline.png', type: 'image/png' },
      { url: '/favicon.ico', sizes: 'any' },
    ],
    apple: [
      { url: '/images/brand/favicon-sparkline.png', sizes: '180x180', type: 'image/png' },
    ],
    shortcut: '/images/brand/favicon-sparkline.png',
  },
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: '@sparkline_sn',
  },
  metadataBase: new URL(siteConfig.url),
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-[#0a0a0a] text-white antialiased selection:bg-[#DE322D] selection:text-white`}
      >
        <ClickSpark
          sparkColor="var(--spark-primary)"
          sparkSize={8}
          sparkRadius={18}
          sparkCount={6}
          duration={350}
          easing="ease-out"
        >
          <ScrollProgressBar />
          <SmoothScrollProvider>
            <BubbleNav />
            {children}
            <ScrollToTop />
          </SmoothScrollProvider>
        </ClickSpark>
      </body>
    </html>
  )
}

