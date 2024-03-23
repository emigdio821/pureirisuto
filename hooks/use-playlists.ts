import { useQuery } from '@tanstack/react-query'
import axios, { isAxiosError } from 'axios'

import type { PLaylistsResponse } from '@/types/spotify-api'

const EP = `${process.env.NEXT_PUBLIC_API_URL}/spotify/playlists`

export function usePlaylists() {
  async function getPlaylists() {
    try {
      const { data } = await axios.get<PLaylistsResponse>(EP)

      return data
    } catch (err) {
      let errorMsg = 'Something went wrong while fetching Playlists'
      if (isAxiosError(err)) {
        errorMsg = err.message
      }
      console.log('[PLAYLISTS_ERR]', errorMsg)
      return null
    }
  }

  return useQuery({ queryKey: ['user-playlists'], queryFn: getPlaylists })
}
