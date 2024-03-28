import { z } from 'zod'

const requiredField = z.string().trim().min(1, 'Required field')
const optionalField = z.string().trim()

export const loginSchema = z.object({
  username: requiredField,
  password: requiredField,
})

export const editPlaylistSchema = z.object({
  title: requiredField,
  description: optionalField,
  isPublic: z.boolean(),
  cover: optionalField,
})
