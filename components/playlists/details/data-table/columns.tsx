'use client'

import { Fragment } from 'react'
import type { ColumnDef } from '@tanstack/react-table'
import { MinusIcon } from 'lucide-react'

import {
  generateArtistExternalOpen,
  generateTrackExternalOpen,
  msToTime,
} from '@/lib/utils'
import type { TrackItem } from '@/hooks/use-playlist-details'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'

import { Actions } from './actions'
import { ProviderTableHeader } from './provider-table-header'

export const columns: Array<ColumnDef<TrackItem>> = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => {
          table.toggleAllPageRowsSelected(!!value)
        }}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => {
          row.toggleSelected(!!value)
        }}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    header: 'Title',
    accessorKey: 'title',
    filterFn: (row, _, value: string) => {
      const name = row.original.name
      return name.toLowerCase().includes(value.toLowerCase())
    },
    cell: ({ row }) => (
      <span className="block min-w-[200px] max-w-sm">
        <Button asChild variant="link" className="whitespace-normal text-foreground">
          <a
            target="_blank"
            href={generateTrackExternalOpen(row.original.id, row.original.provider)}
          >
            {row.original.name}
          </a>
        </Button>
      </span>
    ),
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
      const trackName = row.original.name
      const artists = row.original.artists

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
                <a
                  target="_blank"
                  href={generateArtistExternalOpen(artist.id, row.original.provider)}
                >
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
      const album = row.original.album

      return (
        <>
          {album ? (
            <Button variant="link" className="text-foreground" asChild>
              <a href={`https://open.spotify.com/album/${album.id}`} target="_blank">
                {album.name}
              </a>
            </Button>
          ) : (
            <MinusIcon className="size-4" />
          )}
        </>
      )
    },
  },
  {
    header: 'Duration',
    cell: ({ row }) =>
      row.original.durationMs ? (
        msToTime(row.original.durationMs)
      ) : (
        <MinusIcon className="size-4" />
      ),
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      return <Actions row={row} />
    },
  },
]
