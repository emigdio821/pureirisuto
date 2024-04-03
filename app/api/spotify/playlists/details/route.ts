import { NextResponse, type NextRequest } from 'next/server'
import { SpotifyApi } from '@spotify/web-api-ts-sdk'

import { envServerSchema } from '@/lib/schemas/server-env'

import { getAccessToken } from '../../access-token/route'

const { SPOTIFY_CLIENT_ID } = envServerSchema

export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get('id')

  try {
    const accessToken = await getAccessToken()
    if (!accessToken) throw new Error('No access token')
    if (!id) throw new Error('Missing playlist id')
    const sdk = SpotifyApi.withAccessToken(SPOTIFY_CLIENT_ID, accessToken)
    const data = await sdk.playlists.getPlaylist(id)

    return NextResponse.json(data)
  } catch (err) {
    console.log('[PLAYLIST_DETAILS_ERR]', err)

    return new Response(null, {
      status: 204,
    })
  }
}
