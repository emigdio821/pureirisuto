import { useState } from 'react'
import { useParams } from 'next/navigation'
import { useQueryClient } from '@tanstack/react-query'
import type { Row } from '@tanstack/react-table'
import axios from 'axios'
import { MoreHorizontalIcon } from 'lucide-react'
import { toast } from 'sonner'

import { useStore } from '@/lib/store'
import { generateTrackExternalOpen } from '@/lib/utils'
import type { PlaylistDetails, TrackItem } from '@/hooks/use-playlist-details'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { AlertConfirm } from '@/components/alert-confirm'

export function Actions({ row }: { row: Row<TrackItem> }) {
  const [alertOpen, setAlertOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const profiles = useStore((state) => state.connectedProfiles)
  const queryClient = useQueryClient()
  const params = useParams<{ id: string }>()
  const playlist = queryClient.getQueryData([
    'playlist-details',
    params.id,
  ]) as PlaylistDetails
  const provider = playlist?.provider

  function canDeleteTracks() {
    switch (provider) {
      case 'Spotify':
        return profiles.spotify?.id === playlist?.owner.id
      case 'YouTube':
        return true
      case 'Apple Music':
        return false
      default:
        return false
    }
  }

  function getDeleteParams() {
    switch (provider) {
      case 'Spotify':
        return {
          id: playlist?.id,
          uris: [row.original.uri],
        }
      case 'YouTube':
        return {
          uris: [row.original.id],
        }
    }
  }

  async function handleDeleteTrack() {
    if (playlist && provider) {
      setLoading(true)
      try {
        await axios.delete(`/api/${provider.toLocaleLowerCase()}/playlists`, {
          params: getDeleteParams(),
        })
        await queryClient.invalidateQueries({ queryKey: ['playlist-details', params.id] })
        toast.success(`Track "${row.original.name}" deleted`)
      } catch (err) {
        console.log('[DELETE_TRACK_PLAYLIST_DETAILS]', err)
        toast.error('We could not delete this track, try again')
      } finally {
        setLoading(false)
        setAlertOpen(false)
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
                Track: <span className="font-semibold">{row.original.name}</span>
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
                href={generateTrackExternalOpen(row.original.id, provider)}
              >
                <span>
                  Open on <span className="font-semibold">{provider}</span>
                </span>
              </a>
            )}
          </DropdownMenuItem>
          <DropdownMenuItem>Add to playlist</DropdownMenuItem>
          {canDeleteTracks() && (
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
