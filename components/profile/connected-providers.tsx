'use client'

import { useStore } from '@/lib/store'
import { ProviderBadge } from '@/components/provider-badge'

export function ConnectedProviders() {
  const connectedProviders = useStore((state) => state.connectedProviders)

  return (
    <>
      {connectedProviders.length > 0 ? (
        <div>
          <h4 className="text-sm font-semibold leading-none tracking-tight">
            Connected providers
          </h4>
          {connectedProviders.map((provider) => (
            <ProviderBadge key={provider} provider={provider} />
          ))}
        </div>
      ) : null}
    </>
  )
}
