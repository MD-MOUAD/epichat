import { z } from 'zod'

export const resetSchema = z.object({
  email: z
    .string()
    .nonempty('Email is required.')
    .email({ message: 'Please enter a valid email address.' }),
})

// TypeScript type for the form data
export type resetValues = z.infer<typeof resetSchema>
