import Link from 'next/link'
import { CircleAlertIcon } from 'lucide-react'

import { useSpotifyProfile } from '@/hooks/use-spotify-profile'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { SpotifyIcon } from '@/components/icons'

export function SpotifyProviderCard() {
  const { data, error, isLoading, refetch } = useSpotifyProfile()
  console.log(data)

  if (isLoading) {
    return (
      <Card className="w-80">
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
      <Card className="w-80">
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
      <Card className="w-80">
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
    <Card className="w-80">
      <CardHeader>
        <span className="flex items-center">
          <SpotifyIcon className="mr-2 h-5 w-5" />
          <CardTitle>Spotify</CardTitle>
        </span>
        <CardDescription>Connected</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="flex h-10 items-center justify-center rounded-lg border px-4 py-2 text-sm">
          <span>
            Connected as <span className="font-semibold">{data.display_name}</span>
          </span>
        </p>
      </CardContent>
    </Card>
  )
}
