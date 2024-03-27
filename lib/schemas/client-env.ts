import { z } from 'zod'

const requiredEnv = z.string().trim().min(1, 'Required env variable')

const envSchema = z.object({
  NEXT_PUBLIC_API_URL: requiredEnv,
  NEXT_PUBLIC_SPOTIFY_CLIENT_ID: requiredEnv,
})

export const envClientSchema = envSchema.parse({
  NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  NEXT_PUBLIC_SPOTIFY_CLIENT_ID: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID,
})
