'use client'

import { ListXIcon } from 'lucide-react'

import { usePlaylists } from '@/hooks/use-playlists'
import { Card, CardContent } from '@/components/ui/card'
import { DataTable } from '@/components/playlists/data-table'
import { columns } from '@/components/playlists/data-table/columns'
import { TableSkeleton } from '@/components/playlists/skeletons'

export default function PlaylistsPage() {
  const { data, isLoading } = usePlaylists()

  if (isLoading) {
    return <TableSkeleton />
  }

  if (!data) {
    return (
      <div className="flex flex-col py-4">
        <h2 className="text-xl font-semibold">Playlists</h2>
        <p className="mb-4 text-sm text-muted-foreground">
          Connect your music provider, and your playlists will be displayed here.
        </p>
        <Card>
          <CardContent className="flex flex-col items-center justify-center gap-2 p-6">
            <ListXIcon className="h-8 w-8" />
            <p>No playlists found</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="flex h-[calc(100vh-3.5rem)] flex-col py-4">
      <h2 className="mb-4 text-xl font-semibold">Playlists</h2>
      <DataTable columns={columns} data={data.spotify?.items ?? []} />
    </div>
  )
}
