'use client'

import Link from 'next/link'
import type { ColumnDef } from '@tanstack/react-table'
import { MoreHorizontalIcon } from 'lucide-react'

import type { TrackItem } from '@/types/spotify-api'
import { msToTime } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export const columns: Array<ColumnDef<TrackItem>> = [
  {
    header: 'Title',
    cell: ({ row }) => {
      return <span className="block max-w-sm">{row.original.track.name}</span>
    },
  },
  {
    header: 'Provider',
    cell: ({ row }) => {
      return 'Spotify' // TODO: Retrieve Music Provider
    },
  },
  {
    header: 'Artist',
    cell: ({ row }) => {
      return row.original.track.artists.map((artist) => artist.name).join(', ')
    },
  },
  {
    header: 'Album',
    cell: ({ row }) => {
      return row.original.track.album.name
    },
  },
  {
    header: 'Duration',
    cell: ({ row }) => {
      return msToTime(row.original.track.duration_ms)
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
              <a href={`https://open.spotify.com/track/${row.original.track.id}`} target="_blank">
                <span>
                  Open on <span className="font-semibold">Spotify</span>
                </span>
              </a>
            </DropdownMenuItem>
            <DropdownMenuItem>Add to playlist</DropdownMenuItem>
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
