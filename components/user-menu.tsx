'use client'

import { LogOutIcon, MoonIcon, SunIcon } from 'lucide-react'
import type { Session } from 'next-auth'
import { signOut } from 'next-auth/react'
import { useTheme } from 'next-themes'

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
  const { setTheme, resolvedTheme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="unstyledWithHover" className="ml-auto h-8 w-8 rounded-full">
          <Avatar className="h-full w-full">
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
        <DropdownMenuItem
          onClick={() => {
            setTheme(resolvedTheme === 'light' ? 'dark' : 'light')
          }}
        >
          <SunIcon className="mr-2 hidden h-4 w-4 dark:block" />
          <MoonIcon className="mr-2 block h-4 w-4 dark:hidden" />
          Toggle theme
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={async () => {
            await signOut({ callbackUrl: '/login' })
          }}
        >
          <LogOutIcon className="mr-2 h-4 w-4" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
