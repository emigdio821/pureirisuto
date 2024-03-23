import { useQuery } from '@tanstack/react-query'
import axios, { isAxiosError } from 'axios'

import type { SpotifyMeResponse } from '@/types/spotify-api'

const EP = `${process.env.NEXT_PUBLIC_API_URL}/spotify/profile`

export function useSpotifyProfile() {
  async function getSpotifyProfile() {
    try {
      const { data } = await axios.get<SpotifyMeResponse>(EP)

      return data
    } catch (err) {
      let errorMsg = 'Something went wrong while fetching Spotify profile'
      if (isAxiosError(err)) {
        errorMsg = err.message
      }
      console.log('[SPOTIFY_PROFILE_ERR]', errorMsg)
      return null
    }
  }

  return useQuery({ queryKey: ['spotify-profile'], queryFn: getSpotifyProfile })
}
