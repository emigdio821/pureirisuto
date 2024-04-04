'use client'

import { useState } from 'react'
import Link from 'next/link'
import { decode } from 'html-entities'
import { ChevronLeftIcon, Edit2Icon, ListXIcon, RefreshCcwIcon } from 'lucide-react'

import { usePlaylistDetails } from '@/hooks/use-playlist-details'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'
import { EditPlaylistDetails } from '@/components/form/edit-playlist-details'
import { DataTable } from '@/components/playlists/details/data-table'
import { columns } from '@/components/playlists/details/data-table/columns'
import { SimpleSkeleton } from '@/components/skeletons'

interface PlaylistDetailsParams {
  params: { id: string }
}

export default function YTMusicPlaylistDetails({ params }: PlaylistDetailsParams) {
  const [loading, setLoading] = useState(false)
  const [editDetails, setEditDetails] = useState(false)
  const { data, isLoading, refetch } = usePlaylistDetails(params.id, 'YouTube')

  if (isLoading) return <SimpleSkeleton msg="Retrieving details" />

  return (
    <>
      <Button variant="link" className="self-start" asChild>
        <Link href="/playlists">
          <ChevronLeftIcon className="h-4 w-4" />
          Playlists
        </Link>
      </Button>
      <h3 className="text-2xl font-bold tracking-tight">Playlist details</h3>
      {data ? (
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
                playlist={{
                  id: data.id,
                  coverUrl: data.coverUrl,
                  description: data.description ?? '',
                  title: data.name,
                  provider: 'YouTube',
                  isPublic: data.isPublic,
                  totalTracks: data.tracks.length,
                  owner: data.owner,
                }}
                setLoading={setLoading}
                closeDialog={() => {
                  setEditDetails(false)
                }}
              />
            </DialogContent>
          </Dialog>

          <div className="flex flex-col items-start gap-4 md:flex-row md:items-center">
            <Avatar className="h-36 w-36 rounded-md sm:h-48 sm:w-48">
              <AvatarImage alt={`${data.name} playlist image`} src={data.coverUrl} />
              <AvatarFallback className="rounded-md" />
            </Avatar>
            <div className="flex flex-col">
              <h3 className="text-xl font-bold sm:text-3xl">{data.name}</h3>
              {data.description && (
                <p className="mb-2 text-sm text-muted-foreground">
                  {decode(data.description)}
                </p>
              )}
              <span>
                <Button variant="link" asChild>
                  <a
                    target="_blank"
                    href={`https://music.youtube.com/channel/${data.owner.id}`}
                  >
                    {data.owner.name}
                  </a>
                </Button>
              </span>
              <span className="flex items-center gap-2 text-sm">
                {data.isPublic ? 'Public' : 'Private'} playlist{' '}
                <Separator orientation="vertical" className="h-4" />
                Tracks: {data.tracks.length}
                <Separator orientation="vertical" className="h-4" /> Followers:{' '}
                {data.followers ?? 0}
              </span>
              <span className="mt-2 flex items-center gap-2">
                <Button variant="outline" asChild>
                  <a
                    target="_blank"
                    href={`https://music.youtube.com/playlist?list=${data.id}`}
                  >
                    Open on YouTube
                  </a>
                </Button>
                <Button
                  size="icon"
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setEditDetails(true)
                  }}
                >
                  <Edit2Icon className="size-4" />
                </Button>
              </span>
            </div>
          </div>
          {data.tracks.length > 0 ? (
            <DataTable data={data.tracks} columns={columns} />
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center gap-2 p-6">
                <ListXIcon className="size-6" />
                <p className="text-sm">This playlist is empty</p>
              </CardContent>
            </Card>
          )}
        </>
      ) : (
        <Card>
          <CardContent className="flex flex-col items-center justify-center gap-2 p-6">
            <ListXIcon className="size-6" />
            <p className="text-sm">We could not find this playlist</p>
            <Button
              variant="link"
              onClick={() => {
                void refetch()
              }}
            >
              <RefreshCcwIcon className="mr-2 h-4 w-4" />
              Try again
            </Button>
          </CardContent>
        </Card>
      )}
    </>
  )
}
