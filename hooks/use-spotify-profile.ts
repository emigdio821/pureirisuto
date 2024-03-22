import type { SpotifyMeResponse } from '@/types'
import { useQuery } from '@tanstack/react-query'
import axios, { isAxiosError } from 'axios'

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
      throw new Error(errorMsg)
    }
  }

  return useQuery({ queryKey: ['spotify-profile'], queryFn: getSpotifyProfile })
}
