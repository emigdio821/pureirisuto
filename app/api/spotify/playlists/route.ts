import { NextResponse, type NextRequest } from 'next/server'
import { SpotifyApi } from '@spotify/web-api-ts-sdk'

import { envServerSchema } from '@/lib/schemas/server-env'

import { getAccessToken } from '../access-token/route'

export const revalidate = 0

const { SPOTIFY_CLIENT_ID } = envServerSchema

export async function GET() {
  try {
    const accessToken = await getAccessToken()
    if (!accessToken) throw new Error('No access token')
    const sdk = SpotifyApi.withAccessToken(SPOTIFY_CLIENT_ID, accessToken)
    const data = await sdk.currentUser.playlists.playlists()

    return NextResponse.json(data)
  } catch (err) {
    return new Response(null, {
      status: 204,
    })
  }
}

export async function DELETE(req: NextRequest) {
  const playlistId = req.nextUrl.searchParams.get('id')
  const uris = req.nextUrl.searchParams.getAll('uris[]')
  const accessToken = await getAccessToken()
  if (!accessToken) throw new Error('No access token')
  if (!playlistId) throw new Error('Missing playlist id')
  const sdk = SpotifyApi.withAccessToken(SPOTIFY_CLIENT_ID, accessToken)

  const payload = {
    tracks: uris.map((uri) => ({
      uri,
    })),
  }

  await sdk.playlists.removeItemsFromPlaylist(playlistId, payload)

  return new Response(null, {
    status: 204,
  })
}
