'use client'

import { useState } from 'react'
import axios from 'axios'
import { signOut } from 'next-auth/react'

import { useStore } from '@/lib/store'
import { Button } from '@/components/ui/button'
import { AlertConfirm } from '@/components/alert-confirm'

export function ProfileCardContent() {
  const [loading, setLoading] = useState(false)
  const removeProfiles = useStore((state) => state.removeConnectedProfiles)
  const [alertOpen, setAlertOpen] = useState(false)

  async function handleLogout() {
    try {
      setLoading(true)
      removeProfiles()
      await axios.post('/api/spotify/disconnect')
      await signOut({ callbackUrl: '/login' })
    } catch (err) {
      setLoading(false)
      console.log('[LOGOUT_ERR]', err)
    }
  }

  return (
    <>
      <AlertConfirm
        open={alertOpen}
        isActionLoading={loading}
        onOpenChange={setAlertOpen}
        description="This action is going to end all your sessions"
        action={() => {
          void handleLogout()
        }}
      />
      <Button
        onClick={() => {
          setAlertOpen(true)
        }}
      >
        Logout
      </Button>
    </>
  )
}
