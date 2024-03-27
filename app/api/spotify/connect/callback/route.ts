import { cookies } from 'next/headers'
import { NextResponse, type NextRequest } from 'next/server'

import { exchangeCode } from '../../access-token/route'

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get('code') ?? ''
  await exchangeCode(code)
  cookies().set('spotify.code', code, { path: '/', httpOnly: true })

  return NextResponse.redirect(new URL('/', req.url))
}
