import { useCallback, useEffect, useState } from 'react'
import type { GoogleCredentials } from '@/types'
import axios from 'axios'
import { toast } from 'sonner'

import { useStore } from '@/lib/store'
import { ExpiredToastBody } from '@/components/expired-toast'

import { useGoogleProfile } from './use-google-profile'

const provider = 'YouTube'
const toastId = 'youtube-expired-toast'

export function useYoutubeInitData() {
  const [loading, setLoading] = useState(true)
  const { data, isLoading } = useGoogleProfile()
  const [reconnecting, setReconnecting] = useState(false)
  const [expiredToken, setExpiredToken] = useState(false)
  const addProvider = useStore((state) => state.addConnectedProvider)
  const addProfile = useStore((state) => state.addConnectedProfile)

  const getToken = useCallback(async () => {
    return await axios.get<GoogleCredentials | null>('/api/youtube/access-token')
  }, [])

  const handleReconnect = useCallback(async () => {
    try {
      setReconnecting(true)
      await getToken()
      setExpiredToken(false)
      toast.dismiss(toastId)
      toast.success('YouTube reconnected')
    } catch (err) {
      toast.error('We could not reconnect your YouTube account, try again')
    } finally {
      setReconnecting(false)
    }
  }, [getToken])

  const expiredToast = useCallback(() => {
    toast(
      <ExpiredToastBody
        id={toastId}
        provider="YouTube"
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
    if (expiredToken) expiredToast()
  }, [expiredToken, expiredToast])

  useEffect(() => {
    if (data) {
      addProvider(provider)
      addProfile(provider, data)
    }
  }, [data, addProvider, addProfile])

  useEffect(() => {
    let timeOut: NodeJS.Timeout

    async function handleTokenExpiration() {
      setLoading(true)
      const { data: token } = await getToken()
      if (!token) {
        setLoading(false)
        return
      }

      const expireTime = token.expiry_date ? token.expiry_date - Date.now() : null

      if (expireTime) {
        timeOut = setTimeout(() => {
          setExpiredToken(true)
        }, expireTime)
      }

      setLoading(false)
    }

    void handleTokenExpiration()

    return () => {
      clearTimeout(timeOut)
    }
  }, [getToken, addProvider])

  return { isLoading: loading || isLoading }
}
