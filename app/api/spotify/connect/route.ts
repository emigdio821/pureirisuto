import { NextResponse } from 'next/server'

import { envServerSchema } from '@/lib/schemas/server-env'

const { SPOTIFY_CLIENT_ID, API_URL } = envServerSchema

const scopes = [
  'user-read-email',
  'user-read-private',
  'user-library-read',
  'user-top-read',
  'user-read-recently-played',
  'user-read-playback-state',
  'user-modify-playback-state',
  'user-read-currently-playing',
  'user-read-recently-played',
  'user-follow-read',
  'playlist-read-private',
  'playlist-read-collaborative',
].join(',')

const params = {
  scope: scopes,
  response_type: 'code',
  redirect_uri: `${API_URL}/spotify/connect/callback`,
  client_id: SPOTIFY_CLIENT_ID,
  show_dialog: 'true',
}
const queryParamString = new URLSearchParams(params).toString()
const AUTH_URL = `https://accounts.spotify.com/authorize?${queryParamString}`

export async function GET() {
  return NextResponse.redirect(new URL(AUTH_URL))
}
