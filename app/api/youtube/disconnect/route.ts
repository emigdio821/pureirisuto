import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function POST() {
  cookies().delete('youtube.code')
  cookies().delete('youtube.access-token')
  cookies().delete('youtube.refresh-token')

  return NextResponse.json({ response: 'ok' }, { status: 200 })
}
