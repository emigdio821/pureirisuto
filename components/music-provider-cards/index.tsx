'use client'

import { AppleMusicProviderCard } from './apple-music'
import { SpotifyProviderCard } from './spotify'
import { YouTubeProviderCard } from './youtube'

export function MusicProviderCards() {
  return (
    <>
      <SpotifyProviderCard />
      <YouTubeProviderCard />
      <AppleMusicProviderCard />
    </>
  )
}
