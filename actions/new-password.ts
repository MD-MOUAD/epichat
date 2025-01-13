'use server'

import { getPasswordResetTokenByToken } from '@/lib/data/password-reset-token'
import { findUserByEmail } from '@/lib/data/user'
import { comparePassword, hashPassword } from '@/lib/password'
import { prisma } from '@/lib/prisma'
import {
  newPasswordSchema,
  newPasswordValues,
} from '@/validations/new-password.validation'

export const newPassword = async (values: newPasswordValues, token: string) => {
  if (!token)
    return {
      error:
        'This password reset link is invalid. Please check the link or request a new one.',
    }

  const parsedValues = newPasswordSchema.safeParse(values)
  if (!parsedValues.success)
    return {
      error:
        'The password you entered does not meet the required criteria. Please try again.',
    }

  const { password } = parsedValues.data

  const existingToken = await getPasswordResetTokenByToken(token)
  if (!existingToken)
    return {
      error:
        'This password reset link is invalid or may have been used already. Please request a new one.',
    }

  const hasExpired = new Date(existingToken.expires) < new Date()
  if (hasExpired)
    return {
      error: 'This password reset link has expired. Please request a new one.',
    }

  const existingUser = await findUserByEmail(existingToken.email)

  if (!existingUser || !existingUser.password)
    return { error: 'No account associated with this email address was found.' }

  if (!existingUser.emailVerified)
    return {
      error:
        'Please verify your email address before resetting your password. Check your inbox for a verification link or request a new one.',
    }

  const passwordsMatch = await comparePassword(password, existingUser.password)
  if (passwordsMatch) {
    return {
      error:
        'Your new password cannot be the same as your current password. Please choose a different one.',
    }
  }
  const hashedPassword = await hashPassword(password)
  await prisma.user.update({
    where: { id: existingUser.id },
    data: {
      password: hashedPassword,
    },
  })

  await prisma.passwordResetToken.delete({ where: { id: existingToken.id } })

  return { success: 'Your password has been successfully updated!' }
}
