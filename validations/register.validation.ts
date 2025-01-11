import { z } from 'zod'

export const registerSchema = z.object({
  username: z
    .string()
    .nonempty('Username is required.')
    .min(3, { message: 'Username must be at least 3 characters long.' })
    .max(20, { message: 'Username cannot exceed 20 characters.' })
    .regex(/^[a-zA-Z0-9_]+$/, {
      message: 'Username can only contain letters, numbers, and underscores.',
    })
    .refine((username) => !username.endsWith('_oau'), {
      message: 'Username cannot end with "_oau" as it is reserved for OAuth.',
    }),
  email: z
    .string()
    .nonempty('Email is required.')
    .email({ message: 'Please enter a valid email address.' }),
  password: z
    .string()
    .nonempty('Password is required.')
    .min(8, { message: 'Password must be at least 8 characters long.' })
    .max(32, { message: 'Password must be at most 32 characters long.' })
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
export type registerValues = z.infer<typeof registerSchema>
