import { useQuery } from '@tanstack/react-query'

import { getAccessToken, spotifySdk } from '@/lib/spotify'

export function useSpotifyProfile() {
  async function getSpotifyProfile() {
    try {
      const token = await getAccessToken()
      if (!token?.access_token) {
        return null
      }

      const data = await spotifySdk?.currentUser.profile()

      return data
    } catch (err) {
      let errorMsg = 'Something went wrong while fetching Spotify profile'
      if (err instanceof Error) {
        errorMsg = err.message
      }
      console.log('[SPOTIFY_PROFILE_ERR]', errorMsg)
      return null
    }
  }

  return useQuery({ queryKey: ['spotify-profile'], queryFn: getSpotifyProfile })
}
