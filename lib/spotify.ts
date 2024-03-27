import { SpotifyApi, type AccessToken } from '@spotify/web-api-ts-sdk'
import axios from 'axios'
import { getCookie } from 'cookies-next'

import { envClientSchema } from './schemas/client-env'

const { NEXT_PUBLIC_SPOTIFY_CLIENT_ID } = envClientSchema

export let spotifySdk = initSdk()

export async function getAccessToken() {
  const token = await spotifySdk?.getAccessToken()
  if (!token?.access_token) {
    const { data } = await axios.get<AccessToken | null>('/api/spotify/access-token')
    if (data?.access_token) {
      spotifySdk = initSdk()
    }

    return data
  }

  return token
}

function initSdk() {
  const accessTokenCookie = getCookie('spotify.access-token')

  if (accessTokenCookie) {
    const accessToken = JSON.parse(accessTokenCookie) as AccessToken
    return SpotifyApi.withAccessToken(NEXT_PUBLIC_SPOTIFY_CLIENT_ID, accessToken)
  }

  return null
}
