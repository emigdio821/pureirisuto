import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import axios, { isAxiosError } from 'axios'

import type { SpotifyAccessTokenResponse } from '@/types/spotify-api'
import { envServerSchema } from '@/lib/schemas/server-env'

export const revalidate = 0

const { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, API_URL } = envServerSchema
const basic = Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString('base64')
const TOKEN_EP = 'https://accounts.spotify.com/api/token'

async function _getAccessToken() {
  const code = cookies().get('spotify.code')

  return await axios.post<SpotifyAccessTokenResponse>(
    TOKEN_EP,
    {
      // grant_type: 'client_credentials',
      code: code?.value,
      redirect_uri: `${API_URL}/spotify/connect/callback`,
      grant_type: 'authorization_code',
    },
    {
      headers: {
        Authorization: `Basic ${basic}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    },
  )
}

async function refreshAccessToken() {
  const refreshToken = cookies().get('spotify.refresh-token')

  return await axios.post<SpotifyAccessTokenResponse>(
    TOKEN_EP,
    {
      grant_type: 'refresh_token',
      refresh_token: refreshToken?.value,
    },
    {
      headers: {
        Authorization: `Basic ${basic}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    },
  )
}

function handleCookies(expiresIn: number, accessToken: string, refreshToken?: string) {
  const now = new Date()
  const expiresInMs = expiresIn * 1000 - 600000
  cookies().set('spotify.access-token', accessToken, {
    path: '/',
    httpOnly: true,
    expires: now.getTime() + expiresInMs,
  })
  if (refreshToken) {
    cookies().set('spotify.refresh-token', refreshToken, {
      path: '/',
      httpOnly: true,
    })
  }
}

export async function getAccessToken() {
  const accessToken = cookies().get('spotify.access-token')

  if (accessToken?.value) {
    return {
      access_token: accessToken.value,
    }
  }

  try {
    const { data } = await _getAccessToken()
    handleCookies(data.expires_in, data.access_token, data.refresh_token)
    return data
  } catch (err) {
    let errorMsg = 'Access token error'
    if (isAxiosError(err)) {
      errorMsg = err.message
    }
    console.log('[GET_AT_ERR]', errorMsg)
    console.log('Trying to refresh existing one...')
    try {
      const { data } = await refreshAccessToken()
      handleCookies(data.expires_in, data.access_token)
      return data
    } catch (err) {
      let errorMsg = 'Refresh access token error'
      if (isAxiosError(err)) {
        errorMsg = err.message
      }
      console.log('[REFRESH_AT_ERR]', errorMsg)
      return {
        access_token: null,
        token_type: null,
        expires_in: null,
        refresh_token: null,
        scope: null,
      }
    }
  }
}

export async function GET() {
  const data = await getAccessToken()

  return NextResponse.json(data)
}
