'use client'

import { Fragment } from 'react'
import type { PlaylistedTrack, Track } from '@spotify/web-api-ts-sdk'
import type { ColumnDef } from '@tanstack/react-table'

import { msToTime } from '@/lib/utils'
import { Button } from '@/components/ui/button'

import { Actions } from './actions'
import { ProviderTableHeader } from './provider-table-header'

export const columns: Array<ColumnDef<PlaylistedTrack<Track>>> = [
  {
    header: 'Title',
    accessorKey: 'title',
    filterFn: (row, _, value: string) => {
      const name = row.original.track.name
      return name.toLowerCase().includes(value.toLowerCase())
    },
    cell: ({ row }) => {
      const track = row.original.track

      return (
        <span className="block max-w-sm">
          <Button asChild variant="link" className="whitespace-normal text-foreground">
            <a href={`https://open.spotify.com/track/${track.id}`} target="_blank">
              {track.name}
            </a>
          </Button>
        </span>
      )
    },
  },
  {
    header: 'Provider',
    cell: () => {
      return <ProviderTableHeader />
    },
  },
  {
    header: 'Artist',
    cell: ({ row }) => {
      const trackName = row.original.track.name
      const artists = row.original.track.artists

      return (
        <>
          {artists.map((artist, index: number) => (
            <Fragment key={`${trackName}-${artist.id}`}>
              <Button
                asChild
                variant="link"
                className="text-foreground"
                key={`${trackName}-${artist.id}`}
              >
                <a href={`https://open.spotify.com/artist/${artist.id}`} target="_blank">
                  {artist.name}
                </a>
              </Button>
              {index < artists.length - 1 && (
                <span key={`${trackName}-${artist.id}-separator`}>, </span>
              )}
            </Fragment>
          ))}
        </>
      )
    },
  },
  {
    header: 'Album',
    cell: ({ row }) => {
      const album = row.original.track.album

      return (
        <Button variant="link" className="text-foreground" asChild>
          <a href={`https://open.spotify.com/album/${album.id}`} target="_blank">
            {album.name}
          </a>
        </Button>
      )
    },
  },
  {
    header: 'Duration',
    cell: ({ row }) => {
      return msToTime(row.original.track.duration_ms)
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      return <Actions row={row} />
    },
  },
]
