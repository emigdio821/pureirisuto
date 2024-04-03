import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
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
