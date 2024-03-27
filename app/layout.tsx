import type { Metadata, Viewport } from 'next'
import { Figtree } from 'next/font/google'

import '@/styles/globals.css'

import { siteConfig } from '@/config/site'
import { cn } from '@/lib/utils'
import { Toaster } from '@/components/ui/sonner'
import { Footer } from '@/components/footer'
import { Providers } from '@/components/providers'

interface RootLayoutProps {
  children: React.ReactNode
}

const fontSans = Figtree({
  subsets: ['latin'],
  variable: '--font-sans',
  preload: true,
})

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s · ${siteConfig.name}`,
  },
  description: siteConfig.description,
  creator: 'Emigdio Torres',
  icons: siteConfig.icons,
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
}

export default function RootLayout({ children }: Readonly<RootLayoutProps>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          'relative flex min-h-screen flex-col bg-background antialiased',
          fontSans.className,
        )}
      >
        <Providers>
          <main>{children}</main>
          <Footer />
          <Toaster />
        </Providers>
      </body>
    </html>
  )
}
