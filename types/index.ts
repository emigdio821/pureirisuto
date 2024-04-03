import type { youtube_v3 } from 'googleapis'

export type MusicProvider = 'Spotify' | 'YouTube' | 'Apple Music'

export interface GoogleProfile {
  sub: string
  name: string
  given_name: string
  family_name: string
  picture: string
  email: string
  email_verified: boolean
  locale: string
}

export interface GoogleCredentials {
  refresh_token?: string | null
  expiry_date?: number | null
  access_token?: string | null
  token_type?: string | null
  id_token?: string | null
  scope?: string
}

interface Owner {
  id: string
  name: string
}

export interface YTPlaylistDetails {
  description: string
  id: string
  coverUrl: string
  name: string
  owner: Owner
  isPublic: boolean
  provider: MusicProvider
  tracks: youtube_v3.Schema$PlaylistItemListResponse
}
