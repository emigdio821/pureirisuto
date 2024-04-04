import { useCallback, useEffect, useState } from 'react'
import type { AccessToken } from '@spotify/web-api-ts-sdk'
import axios from 'axios'
import { toast } from 'sonner'

import { useStore } from '@/lib/store'
import { ExpiredToastBody } from '@/components/expired-toast'

import { useSpotifyProfile } from './use-spotify-profile'

const provider = 'Spotify'
const toastId = 'spotify-expired-toast'

export function useSpotifyInitData() {
  const [loading, setLoading] = useState(true)
  const { data, isLoading } = useSpotifyProfile()
  const [reconnecting, setReconnecting] = useState(false)
  const [expiredSpotify, setExpiredSpotify] = useState(false)
  const addProvider = useStore((state) => state.addConnectedProvider)
  const addProfile = useStore((state) => state.addConnectedProfile)

  const getSpotifyToken = useCallback(async () => {
    return await axios.get<AccessToken | null>('/api/spotify/access-token')
  }, [])

  const handleReconnect = useCallback(async () => {
    try {
      setReconnecting(true)
      await getSpotifyToken()
      setExpiredSpotify(false)
      toast.dismiss(toastId)
      toast.success('Spotify reconnected')
    } catch (err) {
      toast.error('We could not reconnect your account, try again')
    } finally {
      setReconnecting(false)
    }
  }, [getSpotifyToken])

  const expiredToast = useCallback(() => {
    toast(
      <ExpiredToastBody
        id={toastId}
        provider={provider}
        isLoading={reconnecting}
        callback={() => {
          void handleReconnect()
        }}
      />,
      {
        id: toastId,
        dismissible: false,
        duration: Infinity,
      },
    )
  }, [handleReconnect, reconnecting])

  useEffect(() => {
    if (data) {
      addProvider(provider)
      addProfile(provider, data)
    }
  }, [data, addProvider, addProfile])

  useEffect(() => {
    if (expiredSpotify) expiredToast()
  }, [expiredSpotify, expiredToast])

  useEffect(() => {
    let timeOut: NodeJS.Timeout

    async function getInitialData() {
      setLoading(true)
      const { data: token } = await getSpotifyToken()
      if (!token) {
        setLoading(false)
        return
      }

      const expireTime = token.expires
        ? token.expires - Date.now()
        : token.expires_in * 1000

      timeOut = setTimeout(() => {
        setExpiredSpotify(true)
      }, expireTime)

      setLoading(false)
    }

    void getInitialData()

    return () => {
      clearTimeout(timeOut)
    }
  }, [getSpotifyToken, addProvider])

  return { isLoading: loading || isLoading }
}
