import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import type { GoogleCredentials } from '@/types'
import { google } from 'googleapis'

import { envServerSchema } from '@/lib/schemas/server-env'

export const revalidate = 0

const { YT_CLIENT_ID, YT_CLIENT_SECRET, NEXTAUTH_URL } = envServerSchema

function handleCookies(data: GoogleCredentials) {
  cookies().set('youtube.access-token', JSON.stringify(data), {
    path: '/',
    // httpOnly: true,
    expires: data.expiry_date ?? 0,
  })
  if (data.refresh_token) {
    cookies().set('youtube.refresh-token', data.refresh_token, {
      path: '/',
      httpOnly: true,
    })
  }
}

export async function exchangeCode(code: string) {
  await getAccessToken(code)
}

export async function getAccessToken(cbCode?: string) {
  const oauth2Client = new google.auth.OAuth2(
    YT_CLIENT_ID,
    YT_CLIENT_SECRET,
    NEXTAUTH_URL,
  )

  try {
    const code = cbCode ?? cookies().get('youtube.code')?.value
    if (!code) throw new Error('Missing code cookie')
    const { tokens } = await oauth2Client.getToken(code)
    handleCookies(tokens)

    return tokens
  } catch (err) {
    // refresh token
    const refreshToken = cookies().get('youtube.refresh-token')?.value
    if (!refreshToken) return null

    oauth2Client.setCredentials({
      refresh_token: refreshToken,
    })
    const { credentials } = await oauth2Client.refreshAccessToken()
    handleCookies(credentials)

    return credentials
  }
}

export async function GET() {
  const data = await getAccessToken()
  if (!data) return new Response(null, { status: 204 })
  return NextResponse.json(data)
}
