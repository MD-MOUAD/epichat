import { z } from 'zod'

export const newPasswordSchema = z.object({
  password: z
    .string()
    .nonempty('Password is required.')
    .min(8, { message: 'Password must be at least 8 characters long.' })
    .regex(/[A-Z]/, {
      message: 'Password must contain at least one uppercase letter.',
    })
    .regex(/[a-z]/, {
      message: 'Password must contain at least one lowercase letter.',
    })
    .regex(/[0-9]/, { message: 'Password must contain at least one number.' })
    .regex(/[@$!%*?&#]/, {
      message: 'Password must contain at least one special character.',
    }),
})

// TypeScript type for the form data
export type newPasswordValues = z.infer<typeof newPasswordSchema>
