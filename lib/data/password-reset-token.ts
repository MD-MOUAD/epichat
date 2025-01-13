import 'server-only'
import { prisma } from '@/lib/prisma'
import { v4 as uuid4 } from 'uuid'
import { RESET_TOKEN_EXP_MIN } from '../constants'

export const getPasswordResetTokenByEmail = async (email: string) => {
  try {
    const passwordResetToken = await prisma.passwordResetToken.findFirst({
      where: { email },
    })
    return passwordResetToken
  } catch {
    return null
  }
}

export const getPasswordResetTokenByToken = async (token: string) => {
  try {
    const passwordResetToken = await prisma.passwordResetToken.findUnique({
      where: { token },
    })
    return passwordResetToken
  } catch {
    return null
  }
}

export const generatePasswordResetToken = async (email: string) => {
  const token = uuid4()
  const now = new Date().getTime()
  const expirationInMS = RESET_TOKEN_EXP_MIN * 60 * 1000
  const expires = new Date(now + expirationInMS)

  const existingToken = await getPasswordResetTokenByEmail(email)
  if (existingToken) {
    await prisma.passwordResetToken.delete({
      where: { id: existingToken.id },
    })
  }

  const passwordResetToken = await prisma.passwordResetToken.create({
    data: {
      email,
      token,
      expires,
    },
  })
  return passwordResetToken
}
