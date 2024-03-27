import type { MusicProvider } from '@/types'
import type { Playlist, Track } from '@spotify/web-api-ts-sdk'
import { useQuery } from '@tanstack/react-query'

import { getAccessToken } from '@/lib/spotify'
import { useStore } from '@/lib/store'

// export type TrackItem = PlaylistedTrack<Track> & {
//   provider: MusicProvider
// }

// export type PlaylistDetailsItem = Omit<Playlist<Track>, 'tracks'> & {
//   tracks: Omit<Page<PlaylistedTrack<Track>>, 'items'> & {
//     items: TrackItem[]
//   }
// }

// export type PlaylistDetails = PlaylistDetailsItem | null
export type PlaylistDetailsItem = Playlist<Track> & { provider: MusicProvider }
export type PlaylistDetails = PlaylistDetailsItem | null

export function usePlaylistDetails(id: string) {
  const spotifySdk = useStore((state) => state.spotifySdk)

  async function getPlaylistDetails() {
    let details: PlaylistDetails = null
    try {
      const token = await getAccessToken()
      if (!token?.access_token) return details

      const data = await spotifySdk?.playlists.getPlaylist(id)
      if (data) {
        details = {
          ...data,
          provider: 'Spotify',
        }
        // const dataWithProvider: TrackItem[] = data.tracks.items.map((item) => ({
        //   ...item,
        //   provider: 'Spotify',
        // }))

        // details = {
        //   ...data,
        //   tracks: {
        //     ...data.tracks,
        //     items: dataWithProvider,
        //   },
        // }
      }
    } catch (err) {
      let errorMsg = 'Something went wrong while fetching Playlist'
      if (err instanceof Error) {
        errorMsg = err.message
      }
      console.log('[PLAYLIST_ERR]', errorMsg)
    }
    return details
  }

  return useQuery({ queryKey: ['playlist-details', id], queryFn: getPlaylistDetails })
}
