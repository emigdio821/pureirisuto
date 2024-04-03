import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import type { GoogleProfile } from '@/types'
import axios, { isAxiosError } from 'axios'

const ME_EP = 'https://www.googleapis.com/oauth2/v3/userinfo'

export async function GET() {
  const tokenCookie = cookies().get('youtube.access-token')?.value
  const token = tokenCookie ? JSON.parse(tokenCookie) : null
  try {
    if (!token) throw new Error('Missing token')
    const { data } = await axios.get<GoogleProfile>(ME_EP, {
      params: {
        access_token: token.access_token,
      },
    })

    return NextResponse.json(data)
  } catch (err) {
    if (isAxiosError(err)) {
      console.log('[YOUTUBE_PROFIE_ERROR]', err.message)
    }
    return new Response(null, {
      status: 204,
    })
  }
}
