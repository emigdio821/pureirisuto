import type { Playlist, Track } from '@spotify/web-api-ts-sdk'
import { useQuery } from '@tanstack/react-query'

import { getAccessToken, spotifySdk } from '@/lib/spotify'

type PlaylistDetails = Playlist<Track> | null

export function usePlaylistDetails(id: string) {
  async function getPlaylistDetails() {
    let details: PlaylistDetails = null
    try {
      const token = await getAccessToken()
      if (!token?.access_token) return details

      const data = await spotifySdk?.playlists.getPlaylist(id)
      details = data ?? null
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
