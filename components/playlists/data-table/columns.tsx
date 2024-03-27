'use client'

import Link from 'next/link'
import type { ColumnDef } from '@tanstack/react-table'
import { MoreHorizontalIcon } from 'lucide-react'

import { cn } from '@/lib/utils'
import type { PlaylistItem } from '@/hooks/use-playlists'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export const columns: Array<ColumnDef<PlaylistItem>> = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => {
          table.toggleAllPageRowsSelected(!!value)
        }}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => {
          row.toggleSelected(!!value)
        }}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    header: 'Title',
    accessorKey: 'name',
    // filterFn: (row, _, value: string) => {
    //   const name = row.original.name
    //   return name.toLowerCase().includes(value.toLowerCase())
    // },
    cell: ({ row }) => (
      <span className="block min-w-[200px] max-w-sm">
        <Button asChild variant="link" className="whitespace-normal text-foreground">
          <Link href={`/playlists/${row.original.id}`}>{row.original.name}</Link>
        </Button>
      </span>
    ),
  },
  {
    header: 'Provider',
    accessorKey: 'provider',
    filterFn: (row, id, value: string) => {
      const rowValue: string = row.getValue(id)
      return value.includes(rowValue.toLocaleLowerCase())
    },
    cell: ({ row }) => {
      const provider = row.original.provider

      return (
        <Badge variant="outline">
          <span
            className={cn('text-center', {
              'text-[#ff0000]': provider === 'YouTube Music',
              'text-[#1db954]': provider === 'Spotify',
              'text-[#f94c57]': provider === 'Apple Music',
            })}
          >
            {provider}
          </span>
        </Badge>
      )
    },
  },
  {
    header: 'Tracks',
    cell: ({ row }) => {
      return row.original.tracks?.total ?? 0
    },
  },
  {
    header: 'Owner',
    cell: ({ row }) => {
      const owner = row.original.owner
      return (
        <Button variant="link" className="text-foreground" asChild>
          <a href={`https://open.spotify.com/user/${owner.id}`} target="_blank">
            {owner.display_name}
          </a>
        </Button>
      )
    },
  },
  {
    header: 'Type',
    cell: ({ row }) => {
      return <Badge variant="outline">{row.original.public ? 'Public' : 'Private'}</Badge>
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontalIcon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem asChild>
              <Link href={`/playlists/${row.original.id}`}>Open</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <a href={`https://open.spotify.com/playlist/${row.original.id}`} target="_blank">
                <span>
                  Open on <span className="font-semibold">Spotify</span>
                </span>
              </a>
            </DropdownMenuItem>
            <DropdownMenuItem>Edit details</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <span className="text-destructive">Delete</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
