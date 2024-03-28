import { SpotifyApi, type AccessToken } from '@spotify/web-api-ts-sdk'
import axios from 'axios'
import { getCookie } from 'cookies-next'

import { envClientSchema } from './schemas/client-env'
import { useStore } from './store'

const { NEXT_PUBLIC_SPOTIFY_CLIENT_ID } = envClientSchema

export async function getAccessToken() {
  const sdk = useStore.getState().spotifySdk
  const token = await sdk?.getAccessToken()

  if (!token) {
    const { data } = await axios.get<AccessToken | null>('/api/spotify/access-token')
    if (data) {
      await initSdk()
    }

    return data
  }

  return token
}

export async function initSdk() {
  const tokenCookie = getCookie('spotify.access-token')
  let token: AccessToken | null = null

  if (tokenCookie) {
    token = JSON.parse(tokenCookie) as AccessToken
  } else {
    token = await getAccessToken()
  }

  if (token) {
    await handleStoreState(token)
  }
}

async function handleStoreState(accessToken: AccessToken) {
  const storeState = useStore.getState()
  const sdk = SpotifyApi.withAccessToken(NEXT_PUBLIC_SPOTIFY_CLIENT_ID, accessToken)
  const providers = storeState.connectedProviders
  const hasSpotifyProvider = providers.some((provider) => provider === 'Spotify')
  const user = await sdk.currentUser.profile()

  useStore.setState({
    ...storeState,
    spotifySdk: sdk,
    spotifyUser: user,
    connectedProviders: !hasSpotifyProvider
      ? [...storeState.connectedProviders, 'Spotify']
      : storeState.connectedProviders,
  })
}
