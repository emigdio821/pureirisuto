import Link from 'next/link'
import { ArrowRightLeftIcon, ListMusicIcon, LogOutIcon, PlugZapIcon } from 'lucide-react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'

const sidebarOpts = [
  {
    title: 'Connect services',
    href: '',
    icon: <PlugZapIcon className="mr-2 h-4 w-4" />,
  },
  {
    title: 'Playlists',
    href: '',
    icon: <ListMusicIcon className="mr-2 h-4 w-4" />,
  },
  {
    title: 'Transfer',
    href: '',
    icon: <ArrowRightLeftIcon className="mr-2 h-4 w-4" />,
  },
]

export function UserSidebar() {
  return (
    <aside className="fixed top-0 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 border-r px-4 py-4 sm:sticky sm:flex sm:flex-col">
      <div className="mb-6 flex items-center gap-2">
        <Avatar className="h-8 w-8">
          <AvatarImage
            src="https://i.pinimg.com/originals/55/e7/f3/55e7f3d50ec02281323bf2aac8b1ed46.png"
            alt="user avatar"
          />
          <AvatarFallback>ET</AvatarFallback>
        </Avatar>
        <h4 className="text-lg font-semibold">Emigdio Torres</h4>
      </div>
      <div className="flex h-full flex-col justify-between">
        <ul>
          {sidebarOpts.map((option) => (
            <li key={option.title}>
              <Button asChild variant="ghost" className="w-full justify-start">
                <Link href={option.href}>
                  {option.icon}
                  {option.title}
                </Link>
              </Button>
            </li>
          ))}
        </ul>
        <Button variant="secondary">
          Log out <LogOutIcon className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </aside>
  )
}
