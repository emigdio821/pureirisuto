'use client'

import Link from 'next/link'
import type { ColumnDef } from '@tanstack/react-table'
import { MoreHorizontalIcon } from 'lucide-react'

import type { PlaylistItem } from '@/types/spotify-api'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export const columns: Array<ColumnDef<PlaylistItem>> = [
  {
    accessorKey: 'name',
    header: 'Title',
    cell: ({ row }) => {
      return <span className="block max-w-sm">{row.original.name}</span>
    },
  },
  {
    accessorKey: 'provider',
    header: 'Provider',
    cell: ({ row }) => {
      return 'Spotify' // TODO: Retrieve Music Provider
    },
  },
  {
    accessorKey: 'tracks',
    header: 'Tracks',
    cell: ({ row }) => {
      return row.original.tracks.total
    },
  },
  {
    accessorKey: 'owner',
    header: 'Owner',
    cell: ({ row }) => {
      return row.original.owner.display_name
    },
  },
  {
    accessorKey: 'type',
    header: 'Type',
    cell: ({ row }) => {
      return row.original.public ? 'Public' : 'Private'
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
