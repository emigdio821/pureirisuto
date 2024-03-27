'use client'

import { useState } from 'react'
import type { Session } from 'next-auth'
import { signOut } from 'next-auth/react'

import { AlertConfirm } from './alert-confirm'
import { ImgPlaceholder } from './img-placeholder'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'

interface UserMenuProps {
  session: Session
  hideName?: boolean
}

export function UserMenu({ session, hideName }: UserMenuProps) {
  const { user } = session
  const [alertOpen, setAlertOpen] = useState(false)

  return (
    <>
      <AlertConfirm
        open={alertOpen}
        onOpenChange={setAlertOpen}
        description="This action is going to end your session"
        action={async () => {
          await signOut({ callbackUrl: '/login' })
        }}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button type="button" variant="unstyledWithHover" className="gap-2 rounded-full">
            <Avatar className="h-8 w-8 rounded-full">
              <AvatarImage alt="user avatar" src={user?.image ?? ''} />
              <AvatarFallback asChild>
                <ImgPlaceholder />
              </AvatarFallback>
            </Avatar>
            {!hideName && (
              <span className="text-base font-semibold tracking-tight">{user?.name}</span>
            )}
            <span className="sr-only">Toggle user menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel className="flex flex-col">
            <span className="text-base">{user?.name}</span>
            <span className="text-xs text-muted-foreground">{user?.email}</span>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem disabled>Profile</DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              setAlertOpen(true)
            }}
          >
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}
