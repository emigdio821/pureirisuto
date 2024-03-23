import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function POST() {
  cookies().delete('spotify.code')
  cookies().delete('spotify.access-token')
  cookies().delete('spotify.refresh-token')

  return NextResponse.json({ response: 'ok' }, { status: 200 })
}
