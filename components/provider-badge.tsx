import type { MusicProvider } from '@/types'

import { cn } from '@/lib/utils'

import { Badge } from './ui/badge'

export function ProviderBadge({ provider }: { provider: MusicProvider }) {
  return (
    <Badge variant="outline">
      <span
        className={cn('text-center', {
          'text-[#ff0000]': provider === 'YouTube',
          'text-[#1db954]': provider === 'Spotify',
          'text-[#f94c57]': provider === 'Apple Music',
        })}
      >
        {provider}
      </span>
    </Badge>
  )
}
