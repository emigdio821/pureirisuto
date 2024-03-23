import { useState } from 'react'
import Link from 'next/link'
import axios from 'axios'
import { CircleAlertIcon } from 'lucide-react'
import { toast } from 'sonner'

import { useSpotifyProfile } from '@/hooks/use-spotify-profile'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Spinner, SpotifyIcon } from '@/components/icons'
import { ImgPlaceholder } from '@/components/img-placeholder'

export function SpotifyProviderCard() {
  const [loading, setLoading] = useState(false)
  const { data, error, isLoading, refetch } = useSpotifyProfile()

  async function handleDisconnect() {
    setLoading(true)
    await axios.post('/api/spotify/disconnect')
    await refetch()
    setLoading(false)
    toast.success('Disconnected from Spotify')
  }

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <span className="flex items-center">
            <Skeleton className="mr-2 h-5 w-5 rounded-full" />
            <Skeleton className="h-5 w-2/4" />
          </span>
          <div>
            <Skeleton className="h-5 w-3/4" />
          </div>
        </CardHeader>
        <CardContent className="flex h-full flex-col">
          <Skeleton className="h-10 w-[86px]" />
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card>
        <CardContent className="flex h-full flex-col items-center justify-between gap-2 p-4">
          <div className="flex flex-col items-center justify-center gap-2">
            <CircleAlertIcon className="h-5 w-5" />
            <p className="text-sm">{error.message}</p>
          </div>
          <Button
            className="w-full"
            onClick={() => {
              void refetch()
            }}
          >
            Reload
          </Button>
        </CardContent>
      </Card>
    )
  }

  if (!data) {
    return (
      <Card>
        <CardHeader>
          <span className="flex items-center">
            <SpotifyIcon className="mr-2 h-5 w-5" />
            <CardTitle>Spotify</CardTitle>
          </span>
          <CardDescription>Connect your Spotify account</CardDescription>
        </CardHeader>
        <CardContent>
          <Button asChild>
            <Link href="/api/spotify/connect">Connect</Link>
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <span className="flex items-center">
          <SpotifyIcon className="mr-2 h-5 w-5" />
          <CardTitle>Spotify</CardTitle>
        </span>
        <CardDescription>
          <Badge variant="outline">Connected</Badge>
        </CardDescription>
      </CardHeader>
      <CardContent className="flex items-center gap-2">
        <Avatar className="h-8 w-8">
          <AvatarImage alt="user avatar" src={data.images[0].url ?? ''} />
          <AvatarFallback asChild>
            <ImgPlaceholder />
          </AvatarFallback>
        </Avatar>
        <span className="flex flex-col items-start">
          <span className="text-sm font-semibold">{data.display_name}</span>
          <Button
            variant="link"
            disabled={loading}
            className="text-xs"
            onClick={() => {
              void handleDisconnect()
            }}
          >
            Disconnect
            {loading && <Spinner className="ml-2" />}
          </Button>
        </span>
      </CardContent>
    </Card>
  )
}
