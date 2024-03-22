'use client'

import { useState } from 'react'
import { MenuIcon } from 'lucide-react'
import type { Session } from 'next-auth'

import { siteConfig } from '@/config/site'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'

import { SidebarContent } from './content'

export function MobileUserSidebar({ session }: { session: Session }) {
  const [sheetOpen, setSheetOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 block w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sm:hidden">
      <div className="container flex h-14 items-center">
        <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
          <SheetTrigger>
            <MenuIcon className="h-4 w-4" />
          </SheetTrigger>
          <SheetContent side="left" className="flex max-w-xs flex-col">
            <SidebarContent
              session={session}
              closeSheet={() => {
                setSheetOpen(false)
              }}
            />
          </SheetContent>
        </Sheet>
        <h4 className="ml-2 font-semibold">{siteConfig.name}</h4>
      </div>
    </header>
  )
}
