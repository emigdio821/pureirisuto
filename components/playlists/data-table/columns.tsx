'use client'

import Link from 'next/link'
import type { ColumnDef } from '@tanstack/react-table'

import type { PlaylistItem } from '@/hooks/use-playlists'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { ProviderBadge } from '@/components/provider-badge'

import { Actions } from './actions'

export const columns: Array<ColumnDef<PlaylistItem>> = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')
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
    accessorKey: 'name',
    // filterFn: (row, _, value: string) => {
    //   const name = row.original.name
    //   return name.toLowerCase().includes(value.toLowerCase())
    // },
    cell: ({ row }) => (
      <span className="block min-w-[200px] max-w-sm">
        <Button asChild variant="link" className="whitespace-normal text-foreground">
          <Link href={`/playlists/${row.original.id}`}>{row.original.name}</Link>
        </Button>
      </span>
    ),
  },
  {
    header: 'Provider',
    accessorKey: 'provider',
    filterFn: (row, id, value: string) => {
      const rowValue: string = row.getValue(id)
      return value.includes(rowValue.toLocaleLowerCase())
    },
    cell: ({ row }) => {
      const provider = row.original.provider
      return <ProviderBadge provider={provider} />
    },
  },
  {
    header: 'Tracks',
    cell: ({ row }) => {
      return row.original.tracks?.total ?? 0
    },
  },
  {
    header: 'Owner',
    cell: ({ row }) => {
      const owner = row.original.owner
      return (
        <Button variant="link" className="text-foreground" asChild>
          <a href={`https://open.spotify.com/user/${owner.id}`} target="_blank">
            {owner.display_name}
          </a>
        </Button>
      )
    },
  },
  {
    header: 'Type',
    cell: ({ row }) => {
      return <Badge variant="outline">{row.original.public ? 'Public' : 'Private'}</Badge>
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      return <Actions row={row} />
    },
  },
]
