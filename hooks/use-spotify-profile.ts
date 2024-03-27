import type { UserProfile } from '@spotify/web-api-ts-sdk'
import { useQuery } from '@tanstack/react-query'

import { getAccessToken } from '@/lib/spotify'
import { useStore } from '@/lib/store'

export function useSpotifyProfile() {
  const spotifySdk = useStore((state) => state.spotifySdk)

  async function getSpotifyProfile() {
    let profile: UserProfile | null = null
    try {
      const token = await getAccessToken()
      if (!token?.access_token) return profile

      profile = (await spotifySdk?.currentUser.profile()) ?? null
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
