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
