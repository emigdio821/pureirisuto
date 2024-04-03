import { cookies } from 'next/headers'
import { NextResponse, type NextRequest } from 'next/server'
import type { YTPlaylistDetails } from '@/types'
import { google } from 'googleapis'

export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get('id')
  const tokenCookie = cookies().get('youtube.access-token')?.value
  const token = tokenCookie ? JSON.parse(tokenCookie) : null
  const youtubeSdk = google.youtube({
    version: 'v3',
  })

  try {
    if (!id) throw new Error('Missing id')
    const { data: playlist } = await youtubeSdk.playlists.list({
      id: [id],
      maxResults: 1,
      access_token: token.access_token,
      part: ['snippet', 'status', 'id', 'contentDetails'],
    })

    if (!playlist.items) throw new Error('Playlist details not found')
    const details = playlist.items[0]

    const { data } = await youtubeSdk.playlistItems.list({
      maxResults: 50,
      playlistId: details.id ?? '',
      access_token: token.access_token,
      part: ['snippet', 'status', 'id', 'contentDetails'],
    })

    const response: YTPlaylistDetails = {
      id: details.id ?? '',
      owner: {
        id: details.snippet?.channelId ?? '',
        name: details.snippet?.channelTitle ?? '',
      },
      coverUrl:
        details.snippet?.thumbnails?.standard?.url ??
        details.snippet?.thumbnails?.default?.url ??
        '',
      provider: 'YouTube',
      tracks: data,
      name: details.snippet?.title ?? '',
      description: details.snippet?.description ?? '',
      isPublic: details.status?.privacyStatus !== 'private',
    }

    return NextResponse.json(response)
  } catch (err) {
    console.log('error', err)
    return new Response(null, {
      status: 204,
    })
  }
}
