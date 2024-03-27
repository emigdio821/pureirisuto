import Link from 'next/link'
import { redirect } from 'next/navigation'
import { Menu } from 'lucide-react'
import { getServerSession } from 'next-auth'

import { siteConfig } from '@/config/site'
import { authOptions } from '@/lib/auth'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { AppInit } from '@/components/app-init'
import { UserMenu } from '@/components/user-menu'
import { MobileSidebar } from '@/components/user/mobile-sidebar'
import { UserNavigation } from '@/components/user/navigation'

interface MainLayoutProps {
  children: React.ReactNode
}

function BrandLink() {
  return (
    <Button asChild variant="unstyledWithHover" className="text-base font-bold">
      <Link href="/">
        <span>{siteConfig.name}</span>
      </Link>
    </Button>
  )
}

export default async function MainLayout({ children }: MainLayoutProps) {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/login')
  }

  return (
    <>
      <header className="sticky top-0 z-50 h-14 border-b bg-card/90 backdrop-blur-md">
        <div className="container flex h-full items-center justify-between">
          <span className="flex items-center gap-2">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="sm:hidden">
                  <Menu className="h-4 w-4" />
                  <span className="sr-only">Toggle navigation menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="flex flex-col">
                <div>
                  <BrandLink />
                </div>
                <MobileSidebar />
              </SheetContent>
            </Sheet>
            <BrandLink />
            <UserNavigation />
          </span>
          <UserMenu session={session} />
        </div>
      </header>

      <AppInit>
        <main className="container flex flex-1 flex-col gap-4 py-4">{children}</main>
      </AppInit>
    </>
  )
}
