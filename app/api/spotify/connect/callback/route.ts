import { cookies } from 'next/headers'
import { NextResponse, type NextRequest } from 'next/server'

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get('code') ?? ''
  cookies().set('spotify.code', code, { path: '/', httpOnly: true })

  return NextResponse.redirect(new URL('/', req.url))
}
