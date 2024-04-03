import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import type { AccessToken } from '@spotify/web-api-ts-sdk'
import axios, { isAxiosError } from 'axios'

import { envServerSchema } from '@/lib/schemas/server-env'

export const revalidate = 0

const { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, API_URL } = envServerSchema
const basic = Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString(
  'base64',
)
const TOKEN_EP = 'https://accounts.spotify.com/api/token'

async function getAccessToken() {
  const accessToken = cookies().get('spotify.access-token')

  if (accessToken?.value) {
    return JSON.parse(accessToken.value) as AccessToken
  }

  const code = cookies().get('spotify.code')?.value

  try {
    const { data } = await axios.post<AccessToken>(
      TOKEN_EP,
      {
        // grant_type: 'client_credentials',
        code,
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
    handleCookies(data)
    return data
  } catch (err) {
    let errorMsg = 'Access token error'
    if (isAxiosError(err)) {
      errorMsg = err.message
    }
    console.log('[GET_AT_ERR]', errorMsg)
    console.log('Trying to refresh existing one (if any)')
    try {
      const { data } = await refreshAccessToken()
      handleCookies(data)
      return data
    } catch (err) {
      let errorMsg = 'Refresh access token error'
      if (isAxiosError(err)) {
        errorMsg = err.message
      }
      console.log('[REFRESH_AT_ERR]', errorMsg)
      return null
    }
  }
}

async function refreshAccessToken() {
  const refreshToken = cookies().get('spotify.refresh-token')

  return await axios.post<AccessToken>(
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

function handleCookies(data: AccessToken) {
  const now = new Date()
  const expiresInMs = data.expires_in * 1000
  cookies().set('spotify.access-token', JSON.stringify(data), {
    path: '/',
    // httpOnly: true,
    expires: now.getTime() + expiresInMs,
  })
  if (data.refresh_token) {
    cookies().set('spotify.refresh-token', data.refresh_token, {
      path: '/',
      httpOnly: true,
    })
  }
}

export async function GET() {
  const data = await getAccessToken()
  if (!data) return new Response(null, { status: 204 })

  return NextResponse.json(data)
}

export async function POST() {
  const { data } = await refreshAccessToken()

  return NextResponse.json(data)
}
