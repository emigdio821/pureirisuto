'use client'

import Link from 'next/link'
import { decode } from 'html-entities'
import { ChevronLeftIcon, ListXIcon, RefreshCcwIcon } from 'lucide-react'

import { usePlaylistDetails } from '@/hooks/use-playlist-details'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { DataTable } from '@/components/playlists/details/data-table'
import { columns } from '@/components/playlists/details/data-table/columns'
import { SimpleSkeleton } from '@/components/skeletons'

interface PlaylistDetailsParams {
  params: { id: string }
}

export default function PlaylistDetails({ params }: PlaylistDetailsParams) {
  const { data, isLoading, refetch } = usePlaylistDetails(params.id)

  if (isLoading) {
    return <SimpleSkeleton msg="Loading playlist" />
  }

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
          <div className="flex flex-col items-start gap-4 md:flex-row md:items-center">
            <Avatar className="h-36 w-36 rounded-md sm:h-48 sm:w-48">
              <AvatarImage alt={`${data.name} playlist image`} src={data.images[0].url} />
              <AvatarFallback className="rounded-md" />
            </Avatar>
            <div className="flex flex-col">
              <h3 className="text-xl font-bold sm:text-3xl">{data.name}</h3>
              {data.description && (
                <p className="mb-2 text-sm text-muted-foreground">{decode(data.description)}</p>
              )}
              <span>
                <Button variant="link" asChild>
                  <a href={`https://open.spotify.com/user/${data.owner.id}`} target="_blank">
                    {data.owner.display_name}
                  </a>
                </Button>
              </span>
              <span className="flex items-center gap-2 text-sm">
                {data.public ? 'Public' : 'Private'} playlist{' '}
                <Separator orientation="vertical" className="h-4" /> {data.tracks.total} tracks{' '}
                <Separator orientation="vertical" className="h-4" /> {data.followers.total}{' '}
                {data.followers.total > 1 ? 'followers' : 'follower'}
              </span>
              <span className="mt-2">
                <Button variant="outline" asChild>
                  <a href={`https://open.spotify.com/playlist/${data.id}`} target="_blank">
                    Open on Spotify
                  </a>
                </Button>
              </span>
            </div>
          </div>
          {data.tracks.items.length > 0 ? (
            <DataTable data={data.tracks.items} columns={columns} />
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
            <p className="text-sm">We could not find this playlist</p>
            <Button
              variant="link"
              onClick={() => {
                void refetch()
              }}
            >
              <RefreshCcwIcon className="mr-2 h-4 w-4" />
              Reload
            </Button>
          </CardContent>
        </Card>
      )}
    </>
  )
}
