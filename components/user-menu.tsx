'use client'

import { useState } from 'react'
import Link from 'next/link'
import axios from 'axios'
import type { Session } from 'next-auth'
import { signOut } from 'next-auth/react'

import { useStore } from '@/lib/store'

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
  const spotifySdk = useStore((state) => state.spotifySdk)
  const removeSpotifyUser = useStore((state) => state.removeSpotifyUser)
  const [alertOpen, setAlertOpen] = useState(false)

  async function handleLogout() {
    try {
      setLoading(true)
      spotifySdk?.logOut()
      removeSpotifyUser()
      await axios.post('/api/spotify/disconnect')
      await signOut({ callbackUrl: '/login' })
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
          <Button type="button" variant="unstyledWithHover">
            <Avatar className="h-8 w-8 rounded-md">
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
