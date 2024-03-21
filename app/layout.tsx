import type { Metadata, Viewport } from 'next'
import { Figtree } from 'next/font/google'

import './globals.css'

import { siteConfig } from '@/config/site'
import { cn } from '@/lib/utils'
import Footer from '@/components/footer'
import { Providers } from '@/components/providers'
import { UserSidebar } from '@/components/user-sidebar'

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
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
}

export default function RootLayout({ children }: Readonly<RootLayoutProps>) {
  return (
    <html lang="en">
      <body
        className={cn(
          'relative flex min-h-screen flex-col bg-background antialiased ',
          fontSans.className,
        )}
      >
        <Providers>
          <main>
            <div className="border-b">
              <div className="container gap-4 sm:grid sm:grid-cols-[220px_minmax(0,1fr)]">
                <UserSidebar />
                {children}
              </div>
            </div>
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
