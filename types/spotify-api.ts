export interface SpotifyAccessTokenResponse {
  access_token: string
  token_type: string
  expires_in: number
  refresh_token: string
  scope: string
}

export interface SpotifyMeResponse {
  country: string
  display_name: string
  email: string
  explicit_content: {
    filter_enabled: boolean
    filter_locked: boolean
  }
  external_urls: {
    spotify: string
  }
  followers: {
    href: string
    total: number
  }
  href: string
  id: string
  images: Array<{
    url: string
    height: number
    width: number
  }>
  product: string
  type: string
  uri: string
}

export interface PLaylistsResponse {
  spotify: SpotifyPLaylistsResponse | null
  yt_music: null
  apple_music: null
}
export interface SpotifyPLaylistsResponse {
  href: string
  limit: number
  next: string
  offset: number
  previous: string
  total: number
  items: PlaylistItem[]
}

export interface PlaylistItem {
  collaborative: boolean
  description: string
  external_urls: ExternalUrls
  href: string
  id: string
  images: PlaylistImage[]
  name: string
  owner: PalylistOwner
  public: boolean
  snapshot_id: string
  tracks: PlaylistTracks
  type: string
  uri: string
}

export interface ExternalUrls {
  spotify: string
}

export interface PlaylistImage {
  url: string
  height: number
  width: number
}

export interface PalylistOwner {
  external_urls: ExternalUrls
  followers: Followers
  href: string
  id: string
  type: string
  uri: string
  display_name: string
}

export interface Followers {
  href: string
  total: number
}

export interface PlaylistTracks {
  href: string
  total: number
}
