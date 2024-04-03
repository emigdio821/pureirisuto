import type { GoogleProfile } from '@/types'
import { useQuery } from '@tanstack/react-query'
import axios, { isAxiosError } from 'axios'

export function useGoogleProfile() {
  async function getGoogleProfile() {
    let profile: GoogleProfile | null = null
    try {
      const { data } = await axios.get<GoogleProfile>('/api/youtube/profile')
      profile = data
    } catch (err) {
      let errorMsg = 'Something went wrong while fetching Youtube profile'
      if (isAxiosError(err)) {
        errorMsg = err.message
      }
      console.log('[YOUTUBE_PROFILE_ERR]', errorMsg)
    }

    return profile
  }

  return useQuery({ queryKey: ['google-profile'], queryFn: getGoogleProfile })
}
