// import { NextResponse } from 'next/server'
// import axios from 'axios'

import { NextResponse, type NextRequest } from 'next/server'
import axios from 'axios'

import type { PlaylistItem } from '@/types/spotify-api'

import { getAccessToken } from '../../access-token/route'

const PLAYLIST_EP = 'https://api.spotify.com/v1/playlists'

export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get('id')

  try {
    const { access_token: AT } = await getAccessToken()
    const { data } = await axios.get<PlaylistItem>(`${PLAYLIST_EP}/${id}`, {
      headers: {
        Authorization: `Bearer ${AT}`,
      },
    })
    return NextResponse.json(data)
  } catch (err) {
    return new Response(null, {
      status: 204,
    })
  }
}
