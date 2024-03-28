import React, { useState } from 'react'
import { useParams } from 'next/navigation'
import type { PlaylistedTrack, Track } from '@spotify/web-api-ts-sdk'
import { useQueryClient } from '@tanstack/react-query'
import type { Row } from '@tanstack/react-table'
import { MoreHorizontalIcon } from 'lucide-react'
import { toast } from 'sonner'

import { useStore } from '@/lib/store'
import { generateTrackExternalOpen } from '@/lib/utils'
import type { PlaylistDetails } from '@/hooks/use-playlist-details'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { AlertConfirm } from '@/components/alert-confirm'

export function Actions({ row }: { row: Row<PlaylistedTrack<Track>> }) {
  const [alertOpen, setAlertOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const spotifySdk = useStore((state) => state.spotifySdk)
  const spotifyUser = useStore((state) => state.spotifyUser)
  const queryClient = useQueryClient()
  const params = useParams<{ id: string }>()
  const playlist = queryClient.getQueryData([
    'playlist-details',
    params.id,
  ]) as PlaylistDetails
  const provider = playlist?.provider

  async function handleDeleteTrack() {
    const payload = {
      tracks: [
        {
          uri: row.original.track.uri,
        },
      ],
    }

    if (playlist) {
      setLoading(true)
      try {
        await spotifySdk?.playlists.removeItemsFromPlaylist(playlist.id, payload)
        await queryClient.invalidateQueries({ queryKey: ['playlist-details', params.id] })
        toast.success(`Track "${row.original.track.name}" deleted`)
      } catch (err) {
        console.log('[DELETE_TRACK_PLAYLIST_DETAILS]', err)
        toast.error('We could not delete this track, try again')
      } finally {
        setLoading(false)
      }
    }
  }

  return (
    <>
      <AlertConfirm
        open={alertOpen}
        isActionLoading={loading}
        onOpenChange={setAlertOpen}
        description={
          <span className="flex flex-col">
            <span>
              <span>
                Track: <span className="font-semibold">{row.original.track.name}</span>
              </span>
            </span>
            <span>This action cannot be undone</span>
          </span>
        }
        action={() => {
          void handleDeleteTrack()
        }}
      />
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
              <a
                target="_blank"
                href={generateTrackExternalOpen(row.original.track.id, provider)}
              >
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
              <DropdownMenuItem
                onClick={() => {
                  setAlertOpen(true)
                }}
              >
                <span className="text-destructive">Delete</span>
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}
