import { useQuery } from '@tanstack/react-query'
import axios, { isAxiosError } from 'axios'

import type { PlaylistItem } from '@/types/spotify-api'

const EP = '/api/spotify/playlists/details'

export function usePlaylistDetails(id: string) {
  async function getPlaylistDetails() {
    try {
      const { data } = await axios.get<PlaylistItem>(EP, {
        params: {
          id,
        },
      })

      return data
    } catch (err) {
      let errorMsg = 'Something went wrong while fetching Playlist'
      if (isAxiosError(err)) {
        errorMsg = err.message
      }
      console.log('[PLAYLIST_ERR]', errorMsg)
      return null
    }
  }

  return useQuery({ queryKey: ['playlist-details', id], queryFn: getPlaylistDetails })
}
