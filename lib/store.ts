import type { MusicProvider } from '@/types'
import type { SpotifyApi, UserProfile as SpotifyUser } from '@spotify/web-api-ts-sdk'
import { create, type StateCreator } from 'zustand'
import { devtools } from 'zustand/middleware'

export interface StoreState {
  spotifySdk: SpotifyApi | null
  spotifyUser: SpotifyUser | null
  connectedProviders: MusicProvider[]
  addSpotifySdk: (spotifySdk: SpotifyApi) => void
  addSpotifyUser: (spotifyUser: SpotifyUser) => void
  removeSpotifyUser: () => void
}

const storeCreator: StateCreator<StoreState> = (set) => ({
  spotifySdk: null,
  spotifyUser: null,
  connectedProviders: [],
  addSpotifySdk: (spotifySdk: SpotifyApi) => {
    set((state) => ({ ...state, spotifySdk }))
  },
  addSpotifyUser: (spotifyUser: SpotifyUser) => {
    set((state) => ({ ...state, spotifyUser }))
  },
  removeSpotifyUser: () => {
    set((state) => ({ ...state, spotifyUser: null }))
  },
})

export const useStore = create<StoreState>()(devtools(storeCreator))
