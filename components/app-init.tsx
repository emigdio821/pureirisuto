'use client'

import { useSpotifyInitData } from '@/hooks/use-spotify-init-data'
import { useYoutubeInitData } from '@/hooks/use-youtube-init-data'

import { SimpleSkeleton } from './skeletons'

interface AppInitProps {
  children: React.ReactNode
}

export function AppInit({ children }: AppInitProps) {
  const { isLoading: spotifyLoading } = useSpotifyInitData()
  const { isLoading: ytLoading } = useYoutubeInitData()
  const loading = spotifyLoading || ytLoading

  if (loading)
    return (
      <div className="my-4">
        <SimpleSkeleton msg="Loading initial data" />
      </div>
    )

  return <>{children}</>
}
