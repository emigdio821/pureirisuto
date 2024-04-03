import { useCallback, useEffect, useState } from 'react'
import type { GoogleCredentials } from '@/types'
import axios from 'axios'
import { toast } from 'sonner'

import { initYouTube } from '@/lib/youtube'
import { ExpiredToastBody } from '@/components/expired-toast'

const toastId = 'youtube-expired-toast'

export function useYoutubeInitData() {
  const [loading, setLoading] = useState(true)
  const [reconnecting, setReconnecting] = useState(false)
  const [expiredToken, setExpiredToken] = useState(false)

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
    let timeOut: NodeJS.Timeout

    async function getInitialData() {
      setLoading(true)
      const { data: token } = await getToken()
      if (!token) {
        setLoading(false)
        return
      }

      await initYouTube()

      const expireTime = token.expiry_date ? token.expiry_date - Date.now() : null

      if (expireTime) {
        timeOut = setTimeout(() => {
          setExpiredToken(true)
        }, expireTime)
      }

      setLoading(false)
    }

    void getInitialData()

    return () => {
      clearTimeout(timeOut)
    }
  }, [getToken])

  return { isLoading: loading }
}
