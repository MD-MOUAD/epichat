'use server'

import { signIn } from '@/lib/auth'
import { type loginValues } from '@/validations/login.validation'
import { AuthError } from 'next-auth'
import { isRedirectError } from 'next/dist/client/components/redirect-error'

type Res =
  | { success: true }
  | { success: false; error: string; statusCode: 401 | 403 | 500 | 409 }
export async function login(values: loginValues): Promise<Res> {
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
        case 'OAuthAccountAlreadyLinked' as AuthError['type']:
          return {
            success: false,
            error:
              'This email is already linked to another account. Please use the original provider.',
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
