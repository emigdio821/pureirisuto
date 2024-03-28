import { useState } from 'react'
import Link from 'next/link'
import type { Row } from '@tanstack/react-table'
import { MoreHorizontalIcon } from 'lucide-react'

import { useStore } from '@/lib/store'
import { generatePlaylistDetailsUrl, generatePlaylistExternalOpen } from '@/lib/utils'
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
  const id = row.original.id
  const provider = row.original.provider
  const [editDetails, setEditDetails] = useState(false)
  const [loading, setLoading] = useState(false)
  const spotifyUser = useStore((state) => state.spotifyUser)

  return (
    <>
      <Dialog
        open={editDetails}
        onOpenChange={(opened) => {
          if (!loading) {
            setEditDetails(opened)
          }
        }}
      >
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Edit playlist</DialogTitle>
            <DialogDescription>Update playlist details</DialogDescription>
          </DialogHeader>
          <EditPlaylistDetails
            playlist={row.original}
            setLoading={setLoading}
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
            <Link href={generatePlaylistDetailsUrl(id, provider)}>Open</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <a target="_blank" href={generatePlaylistExternalOpen(id, provider)}>
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
