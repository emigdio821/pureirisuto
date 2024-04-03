import React from 'react'
import type { MusicProvider } from '@/types'
import { toast } from 'sonner'

import { Spinner } from './icons'
import { Button } from './ui/button'

interface ExpiredToastBodyProps {
  id: string
  isLoading: boolean
  provider: MusicProvider
  callback: () => void
}

export function ExpiredToastBody(props: ExpiredToastBodyProps) {
  const { id, provider, isLoading, callback } = props

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col">
        <span className="text-sm font-semibold">Expired session</span>
        <span className="text-sm text-muted-foreground">
          Your {provider} session is expired
        </span>
      </div>
      <div className="flex gap-2">
        <Button
          size="flat"
          className="px-3 py-1"
          disabled={isLoading}
          onClick={() => {
            callback()
          }}
        >
          Reconnect
          {isLoading && (
            <Spinner className="ml-2 h-3 w-3" barsClassName="bg-background" />
          )}
        </Button>
        <Button
          size="flat"
          variant="outline"
          className="px-3 py-1"
          disabled={isLoading}
          onClick={() => {
            toast.dismiss(id)
          }}
        >
          Dismiss
        </Button>
      </div>
    </div>
  )
}
