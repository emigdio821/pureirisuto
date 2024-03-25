'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ArrowRightLeftIcon, HomeIcon, ListMusicIcon } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

const SIDEBAR_OPTS = [
  {
    title: 'Dashboard',
    href: '/',
    icon: <HomeIcon className="mr-2 h-4 w-4" />,
  },
  {
    title: 'Playlists',
    href: '/playlists',
    icon: <ListMusicIcon className="mr-2 h-4 w-4" />,
  },
  {
    title: 'Transfer',
    href: '/transfer',
    icon: <ArrowRightLeftIcon className="mr-2 h-4 w-4" />,
  },
]

export function MainSidebar() {
  const pathname = usePathname()

  return (
    <div className="flex-1">
      <nav className="grid items-start gap-1 px-0 text-sm sm:px-4">
        {SIDEBAR_OPTS.map((option) => {
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
              className={cn('justify-start hover:text-primary', {
                'pointer-events-none bg-muted text-primary': isActive,
              })}
            >
              <Link href={option.href}>
                {option.icon}
                {option.title}
              </Link>
            </Button>
          )
        })}
      </nav>
    </div>
  )
}
