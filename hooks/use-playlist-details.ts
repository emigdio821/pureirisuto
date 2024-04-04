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
  uri?: string
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
    const { data: spotifyDetails } = await axios.get<Playlist<Track> | null>(
      `/api/spotify/playlists/details`,
      {
        params: {
          id,
        },
      },
    )
    if (spotifyDetails) {
      details = {
        collaborative: spotifyDetails.collaborative,
        description: spotifyDetails.description,
        followers: spotifyDetails.followers.total,
        id: spotifyDetails.id,
        coverUrl: spotifyDetails.images[0].url,
        name: spotifyDetails.name,
        owner: {
          id: spotifyDetails.owner.id,
          name: spotifyDetails.owner.display_name,
        },
        isPublic: spotifyDetails.public,
        provider: 'Spotify',
        tracks: spotifyDetails.tracks.items.map(({ track }) => ({
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
          uri: track.uri,
        })),
      }
    }

    return details
  }, [id])

  const handleYTDetails = useCallback(async () => {
    let details: PlaylistDetailsItem | null = null
    const { data: ytDetails } = await axios.get<YTPlaylistDetails | null>(
      `/api/youtube/playlists/details`,
      {
        params: {
          id,
        },
      },
    )
    if (ytDetails) {
      details = {
        id,
        name: ytDetails.name,
        description: ytDetails.description,
        coverUrl: ytDetails.coverUrl,
        owner: {
          id: ytDetails.owner.id,
          name: ytDetails.owner.name,
        },
        provider: 'YouTube',
        isPublic: ytDetails.isPublic,
        tracks:
          ytDetails.tracks.items?.map((track) => ({
            id: track.id ?? '',
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
