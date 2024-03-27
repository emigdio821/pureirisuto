import React from 'react'
import { useParams } from 'next/navigation'
import type { PlaylistedTrack, Track } from '@spotify/web-api-ts-sdk'
import { useQueryClient } from '@tanstack/react-query'
import type { Row } from '@tanstack/react-table'
import { MoreHorizontalIcon } from 'lucide-react'

import { useStore } from '@/lib/store'
import type { PlaylistDetails } from '@/hooks/use-playlist-details'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export function Actions({ row }: { row: Row<PlaylistedTrack<Track>> }) {
  const spotifyUser = useStore((state) => state.spotifyUser)
  const queryClient = useQueryClient()
  const params = useParams<{ id: string }>()
  const playlist = queryClient.getQueryData(['playlist-details', params.id]) as PlaylistDetails
  const provider = playlist?.provider

  function generateExternalOpen(id: string) {
    switch (provider) {
      case 'Spotify':
        return `https://open.spotify.com/playlist/${id}`
      case 'YouTube Music':
        return `https://music.youtube.com/watch?v=${id}`
      case 'Apple Music':
        return `https://music.apple.com/playlist/${id}`
    }
  }

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
          {provider && (
            <a href={generateExternalOpen(row.original.track.id)} target="_blank">
              <span>
                Open on <span className="font-semibold">{provider}</span>
              </span>
            </a>
          )}
        </DropdownMenuItem>
        <DropdownMenuItem>Add to playlist</DropdownMenuItem>
        {spotifyUser?.id === playlist?.owner.id && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <span className="text-destructive">Delete</span>
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
