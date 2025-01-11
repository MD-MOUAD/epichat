import { z } from 'zod'

// Regular expression for basic email and username validation
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/

export const loginSchema = z.object({
  // Username or email can be provided, one of them must be present
  usernameOrEmail: z
    .string()
    .nonempty('Username or email is required.')
    .refine((val) => emailRegex.test(val) || usernameRegex.test(val), {
      message: 'Please enter a valid email or username.',
    }),

  // Password validation
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

export type loginValues = z.infer<typeof loginSchema>
