import Link from 'next/link'
import { redirect } from 'next/navigation'
import { AudioLinesIcon, Menu } from 'lucide-react'
import { getServerSession } from 'next-auth'

import { siteConfig } from '@/config/site'
import { authOptions } from '@/lib/auth'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { UserMenu } from '@/components/user-menu'
import { MainSidebar } from '@/components/user/sidebar'

interface MainLayoutProps {
  children: React.ReactNode
}

function BrandLink() {
  return (
    <Button asChild variant="unstyledWithHover" className="text-lg font-semibold">
      <Link href="/">
        <AudioLinesIcon className="mr-2 h-4 w-4" />
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
    <div className="container grid h-screen min-h-[600px] w-full p-0 sm:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-card sm:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4">
            <BrandLink />
            <UserMenu session={session} />
          </div>
          <MainSidebar />
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 items-center justify-between gap-4 bg-card px-4 sm:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="h-4 w-4" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
              <div>
                <BrandLink />
              </div>
              <MainSidebar />
            </SheetContent>
          </Sheet>
          <UserMenu session={session} />
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4">
          {children}
          {/* <div className="flex items-center">
            <h1 className="text-xl font-semibold">Inventory</h1>
          </div>
          <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
            <div className="flex flex-col items-center gap-1 text-center">
              <h3 className="text-2xl font-bold tracking-tight">You have no products</h3>
              <p className="text-sm text-muted-foreground">
                You can start selling as soon as you add a product.
              </p>
              <Button className="mt-4">Add Product</Button>
            </div>
          </div> */}
        </main>
      </div>
    </div>
  )
}
