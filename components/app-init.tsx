'use client'

import { useEffect, useState } from 'react'

import { initSdk } from '@/lib/spotify'

import { SimpleSkeleton } from './skeletons'

interface AppInitProps {
  children: React.ReactNode
}

export function AppInit({ children }: AppInitProps) {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function initSdks() {
      await initSdk()
      setLoading(false)
    }

    void initSdks()
  }, [])

  if (loading)
    return (
      <div className="my-4">
        <SimpleSkeleton msg="Loading initial data" />
      </div>
    )

  return <>{children}</>
}
