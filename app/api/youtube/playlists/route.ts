import { cookies } from 'next/headers'
import { NextResponse, type NextRequest } from 'next/server'
import { google } from 'googleapis'

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

export async function DELETE(req: NextRequest) {
  const uris = req.nextUrl.searchParams.getAll('uris[]')
  const tokenCookie = cookies().get('youtube.access-token')?.value
  const token = tokenCookie ? JSON.parse(tokenCookie) : null
  const youtubeSdk = google.youtube({
    version: 'v3',
  })

  if (uris.length > 0) {
    await Promise.all(
      uris.map((uri) => {
        return youtubeSdk.playlistItems.delete({
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
