'use client'

import { Fragment } from 'react'
import type { ColumnDef } from '@tanstack/react-table'
import { MoreHorizontalIcon } from 'lucide-react'

import type { TrackItem } from '@/types/spotify-api'
import { msToTime } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
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
    accessorKey: 'title',
    filterFn: (row, _, value: string) => {
      const name = row.original.track.name
      return name.toLowerCase().includes(value.toLowerCase())
    },
    cell: ({ row }) => {
      const track = row.original.track

      return (
        <span className="block max-w-sm">
          <Button asChild variant="link" className="whitespace-normal text-foreground">
            <a href={`https://open.spotify.com/track/${track.id}`} target="_blank">
              {track.name}
            </a>
          </Button>
        </span>
      )
    },
  },
  {
    header: 'Provider',
    cell: ({ row }) => {
      return (
        <Badge variant="outline">
          <span className="text-[#1DB954]">Spotify</span>
        </Badge>
      )
    },
  },
  {
    header: 'Artist',
    cell: ({ row }) => {
      const trackName = row.original.track.name
      const artists = row.original.track.artists

      return (
        <>
          {artists.map((artist, index: number) => (
            <Fragment key={`${trackName}-${artist.id}`}>
              <Button
                asChild
                variant="link"
                className="text-foreground"
                key={`${trackName}-${artist.id}`}
              >
                <a href={`https://open.spotify.com/artist/${artist.id}`} target="_blank">
                  {artist.name}
                </a>
              </Button>
              {index < artists.length - 1 && (
                <span key={`${trackName}-${artist.id}-separator`}>, </span>
              )}
            </Fragment>
          ))}
        </>
      )
    },
  },
  {
    header: 'Album',
    cell: ({ row }) => {
      const album = row.original.track.album

      return (
        <Button variant="link" className="text-foreground" asChild>
          <a href={`https://open.spotify.com/album/${album.id}`} target="_blank">
            {album.name}
          </a>
        </Button>
      )
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
