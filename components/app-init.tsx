'use client'

import { useCallback, useEffect, useState } from 'react'
import type { MusicProvider } from '@/types'
import { toast } from 'sonner'

import { initSdk } from '@/lib/spotify'
import { useStore } from '@/lib/store'

import { Spinner } from './icons'
import { SimpleSkeleton } from './skeletons'
import { Button } from './ui/button'

interface AppInitProps {
  children: React.ReactNode
}

interface ExpiredToastProps {
  id: string
  provider: MusicProvider
}

export function AppInit({ children }: AppInitProps) {
  const [loading, setLoading] = useState(true)
  const [reconnecting, setReconnecting] = useState(false)
  const [expiredSpotify, setExpiredSpotify] = useState(false)
  const spotifySdk = useStore((state) => state.spotifySdk)
  const removeSpotifySdk = useStore((state) => state.removeSpotifySdk)

  const getSpotifyAT = useCallback(async () => {
    return await spotifySdk?.getAccessToken()
  }, [spotifySdk])

  const handleReconnect = useCallback(async () => {
    try {
      setReconnecting(true)
      await initSdk()
      removeSpotifySdk()
      setExpiredSpotify(false)
      toast.dismiss('spotify-expired-token-toast')
      toast.success('Spotify reconnected')
    } catch (err) {
      toast.error('We could not reconnect your account, try again')
    } finally {
      setReconnecting(false)
    }
  }, [removeSpotifySdk])

  const expiredToast = useCallback(
    ({ id, provider }: ExpiredToastProps) => {
      return toast(
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
              disabled={reconnecting}
              onClick={() => {
                void handleReconnect()
              }}
            >
              Reconnect
              {reconnecting && (
                <Spinner className="ml-2 h-3 w-3" barsClassName="bg-background" />
              )}
            </Button>
            <Button
              size="flat"
              variant="outline"
              className="px-3 py-1"
              disabled={reconnecting}
              onClick={() => {
                toast.dismiss(id)
              }}
            >
              Dismiss
            </Button>
          </div>
        </div>,
        {
          id,
          dismissible: false,
          duration: Infinity,
        },
      )
    },
    [handleReconnect, reconnecting],
  )

  useEffect(() => {
    async function initSdks() {
      setLoading(true)
      let timeOut: NodeJS.Timeout
      const token = await getSpotifyAT()

      if (!token) {
        await initSdk()
        return
      }

      if (token?.expires) {
        const expireTime = token.expires - Date.now()
        timeOut = setTimeout(() => {
          setExpiredSpotify(true)
        }, expireTime)
      }

      setLoading(false)

      return () => {
        clearTimeout(timeOut)
      }
    }

    void initSdks()
  }, [getSpotifyAT])

  useEffect(() => {
    if (expiredSpotify) {
      expiredToast({ provider: 'Spotify', id: 'spotify-expired-toast' })
    }
  }, [expiredSpotify, expiredToast])

  if (loading)
    return (
      <div className="my-4">
        <SimpleSkeleton msg="Loading initial data" />
      </div>
    )

  return <>{children}</>
}
