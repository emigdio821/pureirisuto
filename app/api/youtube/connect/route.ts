import { NextResponse } from 'next/server'
import { google } from 'googleapis'

import { envServerSchema } from '@/lib/schemas/server-env'

const scopes = [
  'https://www.googleapis.com/auth/youtube',
  'https://www.googleapis.com/auth/userinfo.email',
  'https://www.googleapis.com/auth/userinfo.profile',
]

const { YT_CLIENT_ID, YT_CLIENT_SECRET, API_URL } = envServerSchema

export async function GET() {
  const oauth2Client = new google.auth.OAuth2(
    YT_CLIENT_ID,
    YT_CLIENT_SECRET,
    `${API_URL}/youtube/connect/callback`,
  )

  const url = oauth2Client.generateAuthUrl({
    scope: scopes,
    prompt: 'consent',
    access_type: 'offline',
    include_granted_scopes: true,
  })

  return NextResponse.json({ url })
}
