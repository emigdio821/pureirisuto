'use client'

import { useState } from 'react'
import Link from 'next/link'
import axios from 'axios'
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

export function UserMenu({ session }: { session: Session }) {
  const { user } = session
  const [loading, setLoading] = useState(false)
  const [alertOpen, setAlertOpen] = useState(false)

  async function handleLogout() {
    try {
      setLoading(true)
      await axios.post('/api/spotify/disconnect')
      await axios.post('/api/youtube/disconnect')
      await signOut({ callbackUrl: '/' })
    } catch (err) {
      setLoading(false)
      console.log('[LOGOUT_ERR]', err)
    }
  }

  return (
    <>
      <AlertConfirm
        open={alertOpen}
        isActionLoading={loading}
        onOpenChange={setAlertOpen}
        description="This action is going to end all your sessions"
        action={() => {
          void handleLogout()
        }}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button type="button" variant="unstyledWithHover" className="rounded-full">
            <Avatar className="h-8 w-8">
              <AvatarImage alt="user avatar" src={user?.image ?? ''} />
              <AvatarFallback asChild>
                <ImgPlaceholder />
              </AvatarFallback>
            </Avatar>
            <span className="sr-only">Toggle user menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel className="flex flex-col">
            <span className="text-base">{user?.name}</span>
            <span className="text-xs text-muted-foreground">{user?.email}</span>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href="/profile">Profile</Link>
          </DropdownMenuItem>
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
