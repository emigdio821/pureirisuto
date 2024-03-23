import { NextResponse } from 'next/server'
import axios from 'axios'

import type { PLaylistsResponse } from '@/types/spotify-api'

import { getAccessToken } from '../access-token/route'

export const revalidate = 0
const PLAYLISTS_EP = 'https://api.spotify.com/v1/me/playlists'

export async function GET() {
  try {
    const { access_token: AT } = await getAccessToken()
    const { data } = await axios.get<PLaylistsResponse>(PLAYLISTS_EP, {
      headers: {
        Authorization: `Bearer ${AT}`,
      },
    })
    return NextResponse.json({
      spotify: data,
      yt_music: null,
      apple_music: null,
    })
  } catch (err) {
    return NextResponse.json({
      spotify: null,
      yt_music: null,
      apple_music: null,
    })
  }
}
