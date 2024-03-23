'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ArrowRightLeftIcon, HomeIcon, ListMusicIcon, LogOutIcon } from 'lucide-react'
import { signOut } from 'next-auth/react'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

const SIDEBAR_OPTS = [
  {
    title: 'Home',
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

export function SidebarOpts({ closeSheet }: { closeSheet?: () => void }) {
  const pathname = usePathname()

  return (
    <div className="flex h-full flex-col justify-between">
      <ul className="space-y-1">
        {SIDEBAR_OPTS.map((option) => {
          const isActive = pathname === option.href

          return (
            <li key={option.title}>
              <Button
                asChild
                variant="ghost"
                className={cn('w-full justify-start', {
                  'pointer-events-none bg-primary text-primary-foreground': isActive,
                })}
              >
                <Link
                  href={option.href}
                  onClick={() => {
                    closeSheet && closeSheet()
                  }}
                >
                  {option.icon}
                  {option.title}
                </Link>
              </Button>
            </li>
          )
        })}
      </ul>
      <Button
        variant="outline"
        onClick={async () => {
          await signOut({ callbackUrl: '/login' })
        }}
      >
        Log out <LogOutIcon className="ml-2 h-4 w-4" />
      </Button>
    </div>
  )
}
