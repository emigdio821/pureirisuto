'use client'

import { ExternalLinkIcon } from 'lucide-react'

import { usePlaylistDetails } from '@/hooks/use-playlist-details'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/icons'
import { ImgPlaceholder } from '@/components/img-placeholder'

interface PlaylistDetailsParams {
  params: { id: string }
}

export default function PlaylistDetails({ params }: PlaylistDetailsParams) {
  const { data, isLoading } = usePlaylistDetails(params.id)
  console.log(data)

  if (isLoading) {
    return <Spinner />
  }

  if (!data) {
    return (
      <div className="flex flex-col py-4">
        <h2 className="text-xl font-semibold">Playlist details</h2>
        <p className="mb-4 text-sm text-muted-foreground">
          We could not find this playlist, try again
        </p>
      </div>
    )
  }

  return (
    <div className="flex flex-col py-4">
      <h2 className="mb-4 text-xl font-semibold">Playlist details</h2>
      <div className="flex items-center gap-2">
        <Avatar className="h-36 w-36 rounded-md">
          <AvatarImage alt={`${data.name} playlist image`} src={data.images[0].url ?? ''} />
          <AvatarFallback asChild className="rounded-md">
            <ImgPlaceholder />
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <h3 className="text-3xl font-bold">{data.name}</h3>
          {data.description && (
            <p className="mb-2 text-sm text-muted-foreground">{data.description}</p>
          )}
          <span>{data.owner.display_name}</span>
          <span className="text-sm">
            {data.tracks.total} tracks · {data.public ? 'Public' : 'Private'} playlist
          </span>
          <span>
            <Button variant="link" className="" asChild>
              <a href={`https://open.spotify.com/playlist/${data.id}`} target="_blank">
                Spotify
                <ExternalLinkIcon className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </span>
        </div>
      </div>
    </div>
  )
}
