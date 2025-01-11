import 'server-only'
import { prisma } from '@/lib/prisma'
import { v4 as uuid4 } from 'uuid'
import { VERIFICATION_TOKEN_EXP_MIN } from '../constants'

export const getVerificationTokenByEmail = async (email: string) => {
  try {
    const verificationToken = await prisma.verificationToken.findFirst({
      where: { email },
    })
    return verificationToken
  } catch {
    return null
  }
}

export const getVerificationTokenByToken = async (token: string) => {
  try {
    const verificationToken = await prisma.verificationToken.findUnique({
      where: { token },
    })
    return verificationToken
  } catch {
    return null
  }
}

export const generateVerificationToken = async (email: string) => {
  const token = uuid4()
  const now = new Date().getTime()
  const expirationInMS = VERIFICATION_TOKEN_EXP_MIN * 60 * 1000 // 1 hour
  const expires = new Date(now + expirationInMS)

  const existingToken = await getVerificationTokenByEmail(email)
  if (existingToken) {
    await prisma.verificationToken.delete({
      where: { id: existingToken.id },
    })
  }

  const verificationToken = await prisma.verificationToken.create({
    data: {
      email,
      token,
      expires,
    },
  })
  return verificationToken
}
