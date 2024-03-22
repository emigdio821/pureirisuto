import { z } from 'zod'

const requiredField = z.string().trim().min(1, 'Required field')

export const loginSchema = z.object({
  username: requiredField,
  password: requiredField,
})
