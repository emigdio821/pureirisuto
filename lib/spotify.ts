import type { UserProfile } from '@spotify/web-api-ts-sdk'
import axios from 'axios'

import { useStore } from './store'

export async function initSpotify() {
  const storeState = useStore.getState()
  const { data: profile } = await axios.get<UserProfile | null>('/api/spotify/profile')

  if (profile) {
    const providers = storeState.connectedProviders
    const hasSpotifyProvider = providers.some((provider) => provider === 'Spotify')

    useStore.setState({
      ...storeState,
      connectedProfiles: {
        ...storeState.connectedProfiles,
        spotify: profile,
      },
      connectedProviders: !hasSpotifyProvider
        ? [...storeState.connectedProviders, 'Spotify']
        : storeState.connectedProviders,
    })
  }
}
