import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { SpotifyApi, type AccessToken } from '@spotify/web-api-ts-sdk'

import { envServerSchema } from '@/lib/schemas/server-env'

const { SPOTIFY_CLIENT_ID } = envServerSchema

export async function GET() {
  try {
    const token = cookies().get('spotify.access-token')?.value
    if (!token) throw new Error('No access token')
    const sdk = SpotifyApi.withAccessToken(
      SPOTIFY_CLIENT_ID,
      JSON.parse(token) as AccessToken,
    )
    const profile = await sdk.currentUser.profile()

    return NextResponse.json(profile)
  } catch (err) {
    return new Response(null, {
      status: 204,
    })
  }
}
