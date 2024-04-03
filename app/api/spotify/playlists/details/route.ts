import { cookies } from 'next/headers'
import { NextResponse, type NextRequest } from 'next/server'
import { SpotifyApi, type AccessToken } from '@spotify/web-api-ts-sdk'

import { envServerSchema } from '@/lib/schemas/server-env'

const { SPOTIFY_CLIENT_ID } = envServerSchema

export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get('id')

  try {
    const token = cookies().get('spotify.access-token')?.value
    if (!token) throw new Error('No access token')
    if (!id) throw new Error('Missing playlist id')
    const sdk = SpotifyApi.withAccessToken(
      SPOTIFY_CLIENT_ID,
      JSON.parse(token) as AccessToken,
    )
    const data = await sdk.playlists.getPlaylist(id)

    return NextResponse.json(data)
  } catch (err) {
    console.log('[PLAYLIST_DETAILS_ERR]', err)

    return new Response(null, {
      status: 204,
    })
  }
}
