import { NextResponse } from 'next/server'
import type { SpotifyMeResponse } from '@/types'
import axios from 'axios'

import { getAccessToken } from '../access-token/route'

const ME_EP = 'https://api.spotify.com/v1/me'

export async function GET() {
  try {
    const { access_token: AT } = await getAccessToken()
    const { data } = await axios.get<SpotifyMeResponse>(ME_EP, {
      headers: {
        Authorization: `Bearer ${AT}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
    return NextResponse.json(data)
  } catch (err) {
    return new Response('Error', { status: 500 })
  }
}
