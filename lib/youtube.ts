import type { GoogleProfile } from '@/types'
import axios from 'axios'

import { useStore } from './store'

export async function initYouTube() {
  const storeState = useStore.getState()
  const { data: profile } = await axios.get<GoogleProfile | null>('/api/youtube/profile')

  if (profile) {
    const providers = storeState.connectedProviders
    const hasProvider = providers.some((provider) => provider === 'YouTube')

    useStore.setState({
      ...storeState,
      connectedProfiles: {
        ...storeState.connectedProfiles,
        youtube: profile,
      },
      connectedProviders: !hasProvider
        ? [...storeState.connectedProviders, 'YouTube']
        : storeState.connectedProviders,
    })
  }
}
