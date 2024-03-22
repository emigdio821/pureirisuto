import { GhostIcon } from 'lucide-react'

import { Card, CardContent } from '@/components/ui/card'

export default function PlaylistsPage() {
  return (
    <div className="flex flex-col py-4">
      <h2 className="text-xl font-semibold">Playlists</h2>
      <p className="mb-4 text-sm text-muted-foreground">
        Connect your music provider, and your playlists will be displayed here.
      </p>
      <Card>
        <CardContent className="flex flex-col items-center justify-center gap-2 p-6">
          <GhostIcon className="h-8 w-8" />
          <p>No playlists found</p>
        </CardContent>
      </Card>
    </div>
  )
}
