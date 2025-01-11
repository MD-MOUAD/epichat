/* eslint-disable @typescript-eslint/no-unused-vars */
import 'server-only'
import type { User } from '@prisma/client'
import { prisma } from '@/lib/prisma'

// Find user by email
export const findUserByEmail = async (email: string): Promise<User | null> => {
  try {
    // Return user object if found, or null if not
    const normalizedEmail = email.toLowerCase()
    const user = await prisma.user.findUnique({
      where: {
        email: normalizedEmail,
      },
    })
    return user
  } catch (error) {
    console.error('Error finding user by email:', error)
    return null
  }
}

// Find user by username
export const findUserByUsername = async (
  username: string
): Promise<User | null> => {
  try {
    const normalizedUsername = username.toLowerCase()
    const user = await prisma.user.findUnique({
      where: {
        username: normalizedUsername,
      },
    })
    return user
  } catch (error) {
    console.error('Error finding user by username:', error)
    return null
  }
}

// Find user by id
type UserWithoutPassword = Omit<User, 'password'>
export const findUserById = async (
  id: string
): Promise<UserWithoutPassword | null> => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    })
    if (!user) return null

    const { password, ...userWithoutPassword } = user

    return userWithoutPassword
  } catch (error) {
    console.error('Error finding user by Id:', error)
    return null
  }
}
