import { useCallback } from 'react'
import type { MusicProvider, YTPlaylistDetails } from '@/types'
import type { Playlist, Track } from '@spotify/web-api-ts-sdk'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

export type PlaylistDetails = PlaylistDetailsItem | null

interface Owner {
  id: string
  name: string
}

interface AlbumOrArtist {
  id: string
  name: string
}

export interface TrackItem {
  id: string
  durationMs?: number
  artists: AlbumOrArtist[]
  name: string
  explicit?: boolean
  provider: MusicProvider
  album?: AlbumOrArtist
}

export interface PlaylistDetailsItem {
  collaborative?: boolean
  description?: string
  followers?: number
  id: string
  coverUrl: string
  name: string
  owner: Owner
  isPublic: boolean
  provider: MusicProvider
  tracks: TrackItem[]
}

export function usePlaylistDetails(id: string, provider: MusicProvider) {
  const handleSpotifyDetails = useCallback(async () => {
    let details: PlaylistDetailsItem | null = null
    const { data } = await axios.get<Playlist<Track> | null>(
      `/api/spotify/playlists/details`,
      {
        params: {
          id,
        },
      },
    )
    if (data) {
      details = {
        collaborative: data.collaborative,
        description: data.description,
        followers: data.followers.total,
        id: data.id,
        coverUrl: data.images[0].url,
        name: data.name,
        owner: {
          id: data.owner.id,
          name: data.owner.display_name,
        },
        isPublic: data.public,
        provider: 'Spotify',
        tracks: data.tracks.items.map(({ track }) => ({
          id: track.id,
          name: track.name,
          durationMs: track.duration_ms,
          href: track.href,
          explicit: track.explicit,
          artists: track.artists.map((artist) => ({
            id: artist.id,
            name: artist.name,
          })),
          provider: 'Spotify',
          album: {
            id: track.album.id,
            name: track.album.name,
          },
        })),
      }
    }

    return details
  }, [id])

  const handleYTDetails = useCallback(async () => {
    let details: PlaylistDetailsItem | null = null
    const { data } = await axios.get<YTPlaylistDetails | null>(
      `/api/youtube/playlists/details`,
      {
        params: {
          id,
        },
      },
    )
    if (data) {
      details = {
        id,
        name: data.name,
        coverUrl: data.coverUrl,
        owner: {
          id: data.owner.id,
          name: data.owner.name,
        },
        provider: 'YouTube',
        isPublic: data.isPublic,
        tracks:
          data.tracks.items?.map((track) => ({
            id: track.snippet?.resourceId?.videoId ?? '',
            name: track.snippet?.title ?? '',
            provider: 'YouTube',
            artists: [
              {
                id: track.snippet?.videoOwnerChannelId ?? '',
                name: track.snippet?.videoOwnerChannelTitle?.replace('- Topic', '') ?? '',
              },
            ],
          })) ?? [],
      }
    }

    return details
  }, [id])

  async function getPlaylistDetails() {
    let details: PlaylistDetails = null

    try {
      switch (provider) {
        case 'Spotify': {
          details = await handleSpotifyDetails()
          break
        }
        case 'YouTube': {
          details = await handleYTDetails()
          break
        }
      }

      console.log(details)
    } catch (err) {
      let errorMsg = 'Something went wrong while fetching Playlist'
      if (err instanceof Error) {
        errorMsg = err.message
      }
      console.log('[PLAYLIST_ERR]', errorMsg)
    }
    return details
  }

  return useQuery({ queryKey: ['playlist-details', id], queryFn: getPlaylistDetails })
}
