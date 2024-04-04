import { cookies } from 'next/headers'
import { NextResponse, type NextRequest } from 'next/server'
import { google } from 'googleapis'
import type { z } from 'zod'

import type { editPlaylistSchema } from '@/lib/schemas/form'

type PostBody = z.infer<typeof editPlaylistSchema> & { playlistId: string }

export async function GET() {
  const tokenCookie = cookies().get('youtube.access-token')?.value
  const token = tokenCookie ? JSON.parse(tokenCookie) : null
  const youtubeSdk = google.youtube({
    version: 'v3',
  })

  try {
    const { data } = await youtubeSdk.playlists.list({
      mine: true,
      maxResults: 50,
      access_token: token.access_token,
      part: ['snippet', 'status', 'id', 'contentDetails'],
    })
    return NextResponse.json(data)
  } catch (err) {
    return new Response(null, {
      status: 204,
    })
  }
}

export async function POST(req: NextRequest) {
  const body: PostBody = await req.json()

  try {
    const tokenCookie = cookies().get('youtube.access-token')?.value
    const token = tokenCookie ? JSON.parse(tokenCookie) : null
    const sdk = google.youtube({
      version: 'v3',
    })

    await sdk.playlists.update({
      part: ['snippet', 'status', 'id', 'contentDetails'],
      access_token: token.access_token,
      requestBody: {
        id: body.playlistId,
        snippet: {
          title: body.title,
          description: body.description,
        },
        status: {
          privacyStatus: body.isPublic ? 'public' : 'private',
        },
      },
    })

    // cover update not supported yet by YouTube
    // if (body.cover) {
    // }

    return new Response(null, {
      status: 204,
    })
  } catch (err) {
    console.log('UPDATE_SPOTIFY_PLAYLIST_ERR', err)
    return new Response(null, {
      status: 204,
    })
  }
}

export async function DELETE(req: NextRequest) {
  const uris = req.nextUrl.searchParams.getAll('uris[]')
  const tokenCookie = cookies().get('youtube.access-token')?.value
  const token = tokenCookie ? JSON.parse(tokenCookie) : null
  const youtubeSdk = google.youtube({
    version: 'v3',
  })

  if (uris.length > 0) {
    await Promise.all(
      uris.map(async (uri) => {
        return await youtubeSdk.playlistItems.delete({
          id: uri,
          access_token: token.access_token,
        })
      }),
    )
  }

  return new Response(null, {
    status: 204,
  })
}
