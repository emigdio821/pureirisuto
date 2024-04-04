'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

import { NAV_OPTS } from './nav-options'

export function UserNavigation() {
  const pathname = usePathname()

  return (
    <nav className="ml-4 hidden gap-1 sm:flex">
      {NAV_OPTS.map((option) => {
        let isActive

        if (option.href === '/app') {
          isActive = pathname === '/app'
        } else {
          isActive = pathname.startsWith(option.href)
        }

        return (
          <Button
            asChild
            variant="unstyled"
            key={option.title}
            className={cn('px-3 py-1 text-foreground/60 hover:text-foreground', {
              'pointer-events-none bg-muted text-foreground': isActive,
            })}
          >
            <Link href={option.href}>{option.title}</Link>
          </Button>
        )
      })}
    </nav>
  )
}
