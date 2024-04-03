import { z } from 'zod'

const requiredEnv = z.string().trim().min(1, 'Required env variable')

const envSchema = z.object({
  NEXTAUTH_URL: requiredEnv,
  GITHUB_ID: requiredEnv,
  GITHUB_SECRET: requiredEnv,
  NEXTAUTH_SECRET: requiredEnv,
  SPOTIFY_CLIENT_ID: requiredEnv,
  SPOTIFY_CLIENT_SECRET: requiredEnv,
  SPOTIFY_REFRESH_TOKEN: requiredEnv,
  API_URL: requiredEnv,
  YT_API_KEY: requiredEnv,
  YT_CLIENT_ID: requiredEnv,
  YT_CLIENT_SECRET: requiredEnv,
})

export const envServerSchema = envSchema.parse(process.env)
