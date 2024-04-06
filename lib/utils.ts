import type { MusicProvider } from '@/types'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function msToTime(ms?: number) {
  if (!ms) return '0:00'
  const totalSeconds = Math.round(ms / 1000)
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60
  const formattedMinutes = minutes < 10 ? '0' + minutes : minutes.toString()
  const formattedSeconds = seconds < 10 ? '0' + seconds : seconds.toString()
  const formattedTime = `${formattedMinutes}:${formattedSeconds}`

  return formattedTime
}

export async function fileToBlob(file: File) {
  return await new Promise<Blob | null>((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsArrayBuffer(file)
    reader.onload = () => {
      if (reader.result instanceof ArrayBuffer) {
        const blob = new Blob([reader.result], { type: file.type })
        resolve(blob)
      } else {
        reject(new Error('Failed to read file as ArrayBuffer'))
      }
    }
    reader.onerror = () => {
      reject(reader.error)
    }
  })
}

export async function resizeImageToDataURL(
  file: File,
  quality: number,
): Promise<string | null> {
  return await new Promise<string | null>((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      const img = new Image()
      img.src = reader.result as string
      img.onload = () => {
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')
        if (!ctx) {
          reject(new Error('Failed to create canvas context'))
          return
        }
        const scaleFactor = 0.8
        canvas.width = img.width * scaleFactor
        canvas.height = img.height * scaleFactor
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
        const resizedDataURL = canvas.toDataURL('image/jpeg', quality)
        resolve(resizedDataURL)
      }
    }
    reader.onerror = () => {
      reject(reader.error)
    }
  })
}

export async function resizeImageToMaxSizeBase64(file: File, maxSizeInKB: number) {
  let quality = 1
  const maxSizeInBytes = maxSizeInKB * 1024
  let resizedBase64String: string | null = null

  while (!resizedBase64String && quality > 0) {
    const resizedDataURL = await resizeImageToDataURL(file, quality)
    if (resizedDataURL) {
      const fileSizeInBytes = new Blob([resizedDataURL]).size
      if (fileSizeInBytes <= maxSizeInBytes) {
        resizedBase64String = resizedDataURL
      } else {
        quality -= 0.1
      }
    } else {
      quality = 0
    }
  }

  return resizedBase64String
}

export function generatePlaylistDetailsUrl(id: string, provider: MusicProvider) {
  return `/app/playlists/${provider.toLocaleLowerCase()}/${id}`
}

export function generatePlaylistExternalOpen(id: string, provider: MusicProvider) {
  switch (provider) {
    case 'Spotify':
      return `https://open.spotify.com/playlist/${id}`
    case 'YouTube':
      return `https://music.youtube.com/playlist?list=${id}`
    case 'Apple Music':
      return `https://music.apple.com/playlist/${id}`
  }
}

export function generateTrackExternalOpen(id: string, provider: MusicProvider) {
  switch (provider) {
    case 'Spotify':
      return `https://open.spotify.com/track/${id}`
    case 'YouTube':
      return `https://music.youtube.com/watch?v=${id}`
    case 'Apple Music':
      return `https://music.apple.com/song/${id}`
  }
}

export function generateOwnerExternalOpen(id: string, provider: MusicProvider) {
  switch (provider) {
    case 'Spotify':
      return `https://open.spotify.com/user/${id}`
    case 'YouTube':
      return `https://music.youtube.com/channel/${id}`
    case 'Apple Music':
      return `https://music.apple.com/curator/${id}`
  }
}

export function generateArtistExternalOpen(id: string, provider: MusicProvider) {
  switch (provider) {
    case 'Spotify':
      return `https://open.spotify.com/artist/${id}`
    case 'YouTube':
      return `https://music.youtube.com/channel/${id}`
    case 'Apple Music':
      return `https://music.apple.com/curator/${id}`
  }
}
