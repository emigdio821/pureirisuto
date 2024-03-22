'use client'

import { AppleMusicProviderCard } from './apple-music'
import { SpotifyProviderCard } from './spotify'
import { YTMusicProviderCard } from './yt-music'

export function MusicProviderCards() {
  return (
    <>
      <SpotifyProviderCard />
      <YTMusicProviderCard />
      <AppleMusicProviderCard />
    </>
  )
}
