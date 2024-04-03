import { NextResponse } from 'next/server'
import { SpotifyApi } from '@spotify/web-api-ts-sdk'

import { envServerSchema } from '@/lib/schemas/server-env'

import { getAccessToken } from '../access-token/route'

const { SPOTIFY_CLIENT_ID } = envServerSchema

export async function GET() {
  try {
    const accessToken = await getAccessToken()
    if (!accessToken) throw new Error('No access token')
    const sdk = SpotifyApi.withAccessToken(SPOTIFY_CLIENT_ID, accessToken)
    const profile = await sdk.currentUser.profile()

    return NextResponse.json(profile)
  } catch (err) {
    return new Response(null, {
      status: 204,
    })
  }
}
