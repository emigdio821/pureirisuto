import type { Session } from 'next-auth'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

import { SidebarOpts } from './options'

interface SidebarContentProps {
  session: Session
  closeSheet?: () => void
}

export function SidebarContent({ closeSheet, session }: SidebarContentProps) {
  const { user } = session

  return (
    <>
      <div className="mb-4 flex items-center gap-2">
        <Avatar className="h-8 w-8">
          <AvatarImage alt="user avatar" src={user?.image ?? ''} />
          <AvatarFallback asChild>
            <div className="bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-500"></div>
          </AvatarFallback>
        </Avatar>
        <h4 className="text-base font-semibold">{user?.name}</h4>
      </div>
      <SidebarOpts closeSheet={closeSheet} />
    </>
  )
}
