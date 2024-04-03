import { cookies } from 'next/headers'
import { NextResponse, type NextRequest } from 'next/server'
import { SpotifyApi, type AccessToken } from '@spotify/web-api-ts-sdk'

import { envServerSchema } from '@/lib/schemas/server-env'

export const revalidate = 0

const { SPOTIFY_CLIENT_ID } = envServerSchema

export async function GET() {
  try {
    const token = cookies().get('spotify.access-token')?.value
    if (!token) throw new Error('No access token')

    const sdk = SpotifyApi.withAccessToken(
      SPOTIFY_CLIENT_ID,
      JSON.parse(token) as AccessToken,
    )
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
  const token = cookies().get('spotify.access-token')?.value
  if (!token) throw new Error('No access token')
  if (!playlistId) throw new Error('No playlist id')
  const sdk = SpotifyApi.withAccessToken(
    SPOTIFY_CLIENT_ID,
    JSON.parse(token) as AccessToken,
  )

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
