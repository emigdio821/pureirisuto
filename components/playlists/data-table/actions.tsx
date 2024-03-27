import { useState } from 'react'
import Link from 'next/link'
import type { Row } from '@tanstack/react-table'
import { MoreHorizontalIcon } from 'lucide-react'

import { useStore } from '@/lib/store'
import type { PlaylistItem } from '@/hooks/use-playlists'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { EditPlaylistDetails } from '@/components/form/edit-playlist-details'

export function Actions({ row }: { row: Row<PlaylistItem> }) {
  const [editDetails, setEditDetails] = useState(false)
  const spotifyUser = useStore((state) => state.spotifyUser)

  function generateExternalOpen(id: string) {
    switch (row.original.provider) {
      case 'Spotify':
        return `https://open.spotify.com/playlist/${id}`
      case 'YouTube Music':
        return `https://music.youtube.com/watch?v=${id}`
      case 'Apple Music':
        return `https://music.apple.com/playlist/${id}`
    }
  }

  return (
    <>
      <Dialog open={editDetails} onOpenChange={setEditDetails}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Edit playlist</DialogTitle>
            <DialogDescription>Update playlist details</DialogDescription>
          </DialogHeader>
          <EditPlaylistDetails
            playlist={row.original}
            closeDialog={() => {
              setEditDetails(false)
            }}
          />
        </DialogContent>
      </Dialog>

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
            <a href={generateExternalOpen(row.original.id)} target="_blank">
              <span>
                View on <span className="font-semibold">{row.original.provider}</span>
              </span>
            </a>
          </DropdownMenuItem>
          {spotifyUser?.id === row.original.owner.id && (
            <DropdownMenuItem
              onClick={() => {
                setEditDetails(true)
              }}
            >
              Edit details
            </DropdownMenuItem>
          )}
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <span className="text-destructive">Delete</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}
