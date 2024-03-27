import React from 'react'
import { useParams } from 'next/navigation'
import { useQueryClient } from '@tanstack/react-query'

import type { PlaylistDetails } from '@/hooks/use-playlist-details'
import { ProviderBadge } from '@/components/provider-badge'

export function ProviderTableHeader() {
  const queryClient = useQueryClient()
  const params = useParams<{ id: string }>()
  const playlist = queryClient.getQueryData(['playlist-details', params.id]) as PlaylistDetails
  const provider = playlist?.provider

  return <>{provider ? <ProviderBadge provider={provider} /> : null}</>
}
