import type { UserProfile } from '@spotify/web-api-ts-sdk'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

export function useSpotifyProfile() {
  async function getSpotifyProfile() {
    let profile: UserProfile | null = null

    try {
      const { data } = await axios.get<UserProfile | null>('/api/spotify/profile')
      profile = data
    } catch (err) {
      let errorMsg = 'Something went wrong while fetching Spotify profile'
      if (err instanceof Error) {
        errorMsg = err.message
      }
      console.log('[SPOTIFY_PROFILE_ERR]', errorMsg)
    }

    return profile
  }

  return useQuery({ queryKey: ['spotify-profile'], queryFn: getSpotifyProfile })
}
