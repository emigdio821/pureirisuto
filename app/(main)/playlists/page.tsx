'use client'

import { ListXIcon } from 'lucide-react'

import { usePlaylists } from '@/hooks/use-playlists'
import { Card, CardContent } from '@/components/ui/card'
import { DataTable } from '@/components/playlists/data-table'
import { columns } from '@/components/playlists/data-table/columns'
import { SimpleSkeleton } from '@/components/skeletons'

export default function PlaylistsPage() {
  const { data, isLoading } = usePlaylists()
  console.log(data)

  if (isLoading) {
    return <SimpleSkeleton msg="Loading playlists" />
  }

  return (
    <>
      <div>
        <h3 className="text-xl font-bold tracking-tight sm:text-2xl">Playlists</h3>
        {!data && (
          <p className="text-sm text-muted-foreground">
            Connect your music provider, and your playlists will be displayed here.
          </p>
        )}
      </div>
      {data ? (
        <DataTable columns={columns} data={data} />
      ) : (
        <Card>
          <CardContent className="flex flex-col items-center justify-center gap-2 p-6">
            <ListXIcon className="size-6" />
            <p className="text-sm">No playlists found</p>
          </CardContent>
        </Card>
      )}
    </>
  )
}
