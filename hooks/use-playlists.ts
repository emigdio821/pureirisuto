import type { MusicProvider } from '@/types'
import type { SimplifiedPlaylist } from '@spotify/web-api-ts-sdk'
import { useQuery } from '@tanstack/react-query'

import { getAccessToken, spotifySdk } from '@/lib/spotify'

export type PlaylistItem = SimplifiedPlaylist & {
  provider: MusicProvider
}

type Playlists = PlaylistItem[]

export function usePlaylists() {
  async function getPlaylists() {
    let playlists: Playlists = []

    try {
      const token = await getAccessToken()
      if (!token?.access_token) return playlists
      const data = await spotifySdk?.currentUser.playlists.playlists()
      if (data) {
        const spotifyData: PlaylistItem[] = data.items.map((item) => ({
          ...item,
          provider: 'Spotify',
        }))

        playlists = [...playlists, ...spotifyData]

        const ytMusicData: PlaylistItem[] = data.items.map((item) => ({
          ...item,
          provider: 'YouTube Music',
        }))

        playlists = [...playlists, ...ytMusicData]
      }
    } catch (err) {
      let errorMsg = 'Something went wrong while fetching Playlists'
      if (err instanceof Error) {
        errorMsg = err.message
      }
      console.log('[PLAYLISTS_ERR]', errorMsg)
    }

    return playlists
  }

  return useQuery({ queryKey: ['user-playlists'], queryFn: getPlaylists })
}
