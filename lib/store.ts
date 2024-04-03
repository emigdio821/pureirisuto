import type { GoogleProfile, MusicProvider } from '@/types'
import type { UserProfile as SpotifyProfile } from '@spotify/web-api-ts-sdk'
import { create, type StateCreator } from 'zustand'
import { devtools } from 'zustand/middleware'

interface ConnectedProfiles {
  spotify: SpotifyProfile | null
  youtube: GoogleProfile | null
  appleMusic: null
}

export interface StoreState {
  connectedProviders: MusicProvider[]
  connectedProfiles: ConnectedProfiles
  addConnectedProvider: (provider: MusicProvider) => void
  removeConnectedProfile: (provider: MusicProvider) => void
  removeConnectedProfiles: () => void
}

const storeCreator: StateCreator<StoreState> = (set) => ({
  connectedProfiles: {
    spotify: null,
    youtube: null,
    appleMusic: null,
  },
  connectedProviders: [],
  addConnectedProvider: (provider) => {
    set((state) => {
      const hasProvider = state.connectedProviders.some((prov) => prov === provider)

      return {
        ...state,
        connectedProviders: hasProvider
          ? state.connectedProviders
          : [...state.connectedProviders, provider],
      }
    })
  },
  removeConnectedProfile: (provider) => {
    set((state) => {
      switch (provider) {
        case 'Spotify':
          return {
            ...state,
            connectedProfiles: { ...state.connectedProfiles, spotify: null },
          }
        case 'YouTube':
          return {
            ...state,
            connectedProfiles: { ...state.connectedProfiles, youtube: null },
          }
        case 'Apple Music':
          return {
            ...state,
            connectedProfiles: { ...state.connectedProfiles, appleMusic: null },
          }
      }
    })
  },
  removeConnectedProfiles: () => {
    set((state) => ({ ...state, connectedUsers: null }))
  },
})

export const useStore = create<StoreState>()(devtools(storeCreator))
