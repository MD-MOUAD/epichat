'use server'

import { signIn } from '@/lib/auth'
import { findUserByEmail, findUserByUsername } from '@/lib/data/user'
import { generateVerificationToken } from '@/lib/data/verification-token'
import { sendVerificationEmail } from '@/lib/nodemailer'
import { comparePassword } from '@/lib/password'
import { loginSchema, type loginValues } from '@/validations/login.validation'
import { AuthError } from 'next-auth'
import { isRedirectError } from 'next/dist/client/components/redirect-error'

type Res =
  | { success: true }
  | { success: false; error: string; statusCode: 400 | 401 | 403 | 500 | 409 }
export async function login(values: loginValues): Promise<Res> {
  const parsedValues = loginSchema.safeParse(values)
  if (!parsedValues.success) {
    return { success: false, error: 'Invalid Values', statusCode: 400 }
  }
  const { usernameOrEmail, password } = parsedValues.data

  const isEmail = usernameOrEmail.includes('@')
  const existingUser = isEmail
    ? await findUserByEmail(usernameOrEmail)
    : await findUserByUsername(usernameOrEmail)

  if (!existingUser || !existingUser.password) {
    return {
      success: false,
      error: 'Username/email or password is wrong',
      statusCode: 401,
    }
  }
  const passwordsMatch = await comparePassword(password, existingUser.password)
  if (!passwordsMatch) {
    return {
      success: false,
      error: 'Username/email or password is wrong',
      statusCode: 401,
    }
  }
  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(
      existingUser.email
    )
    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token
    )
    return {
      success: false,
      error: 'Your account is not verified. Please check your email.',
      statusCode: 403,
    }
  }

  try {
    await signIn('credentials', { ...values, redirectTo: '/' })
    return { success: true }
  } catch (error) {
    if (isRedirectError(error)) throw error
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CallbackRouteError':
        case 'CredentialsSignin':
          return {
            success: false,
            error: 'Username/email or password is wrong',
            statusCode: 401,
          }
        case 'AccessDenied':
          return {
            success: false,
            error: 'Your account is not verified. Please check your email.',
            statusCode: 403,
          }
        default:
          return {
            success: false,
            error: 'Internal Server Error. Please try again later.',
            statusCode: 500,
          }
      }
    }
    throw error
  }
}
