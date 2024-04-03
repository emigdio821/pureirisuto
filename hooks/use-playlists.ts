import type { MusicProvider } from '@/types'
import type { Page, SimplifiedPlaylist } from '@spotify/web-api-ts-sdk'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import type { youtube_v3 } from 'googleapis'

interface PlaylistOwner {
  id: string
  name: string
}

export interface PlaylistItem {
  id: string
  title: string
  coverUrl: string
  isPublic?: boolean
  totalTracks: number
  description: string
  owner: PlaylistOwner
  provider: MusicProvider
  isCollaborative?: boolean
}

export function usePlaylists() {
  async function getPlaylists() {
    let playlists: PlaylistItem[] = []

    try {
      const { data: spotifyPlaylists } = await axios.get<Page<SimplifiedPlaylist>>(
        '/api/spotify/playlists',
      )
      const { data: ytPlaylists } =
        await axios.get<youtube_v3.Schema$PlaylistListResponse>('/api/youtube/playlists')

      if (spotifyPlaylists) {
        const spotifyData: PlaylistItem[] = spotifyPlaylists.items.map((item) => ({
          id: item.id,
          title: item.name,
          isPublic: item.public,
          coverUrl: item.images[0].url,
          description: item.description,
          totalTracks: item.tracks?.total ?? 0,
          owner: {
            id: item.owner.id,
            name: item.owner.display_name,
          },
          provider: 'Spotify',
          isCollaborative: item.collaborative,
        }))

        playlists = [...playlists, ...spotifyData]
      }

      if (ytPlaylists?.items) {
        const ytMusicData: PlaylistItem[] = ytPlaylists.items.map((item) => ({
          id: item.id ?? '',
          title: item.snippet?.title ?? '',
          coverUrl:
            item.snippet?.thumbnails?.standard?.url ??
            item.snippet?.thumbnails?.default?.url ??
            '',
          description: item.snippet?.description ?? '',
          isPublic: item.status?.privacyStatus === 'public',
          totalTracks: item.contentDetails?.itemCount ?? 0,
          owner: {
            id: item.snippet?.channelId ?? '',
            name: item.snippet?.channelTitle ?? '',
          },
          provider: 'YouTube',
        }))

        playlists = [...playlists, ...ytMusicData]
      }
    } catch (err) {
      let errorMsg = 'Something went wrong while fetching Playlists'
      if (err instanceof Error) {
        errorMsg = err.message
      }
      console.log('[PLAYLISTS_ERR]', errorMsg)
    }

    return playlists
  }

  return useQuery({ queryKey: ['user-playlists'], queryFn: getPlaylists })
}
