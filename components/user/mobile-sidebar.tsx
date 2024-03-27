'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

import { NAV_OPTS } from './nav-options'

export function MobileSidebar() {
  const pathname = usePathname()

  return (
    <div className="flex-1">
      <nav className="grid h-full items-start gap-1 px-0 pb-4 text-sm sm:px-4">
        <div className="flex flex-col gap-1">
          {NAV_OPTS.map((option) => {
            let isActive

            if (option.href === '/') {
              isActive = pathname === '/'
            } else {
              isActive = pathname.startsWith(option.href)
            }

            return (
              <Button
                asChild
                size="default"
                variant="unstyled"
                key={option.title}
                className={cn('justify-start text-foreground/60 hover:text-foreground', {
                  'pointer-events-none bg-muted text-foreground': isActive,
                })}
              >
                <Link href={option.href}>{option.title}</Link>
              </Button>
            )
          })}
        </div>
      </nav>
    </div>
  )
}
