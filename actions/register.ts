'use server'

import { findUserByEmail, findUserByUsername } from '@/lib/data/user'
import { generateVerificationToken } from '@/lib/data/verification-token'
import { sendVerificationEmail } from '@/lib/nodemailer'
import { hashPassword } from '@/lib/password'
import { prisma } from '@/lib/prisma'
import {
  type registerValues,
  registerSchema,
} from '@/validations/register.validation'
import { z } from 'zod'

type Res =
  | { success: true; message: string }
  | {
      success: false
      error: z.inferFlattenedErrors<typeof registerSchema>
      statusCode: 400
    }
  | { success: false; error: string; statusCode: 409 | 500 }
export async function register(values: registerValues): Promise<Res> {
  const parsedValues = registerSchema.safeParse(values)

  if (!parsedValues.success) {
    // Flatten the errors and return both formErrors and fieldErrors
    const flattenedErrors = parsedValues.error.flatten()
    return {
      success: false,
      error: flattenedErrors,
      statusCode: 400,
    }
  }

  const { username, email, password } = parsedValues.data
  try {
    // Check if email already exists
    const existingEmail = await findUserByEmail(email)
    if (existingEmail) {
      return {
        success: false,
        error: 'This email is already registered. Please use a different one.',
        statusCode: 409,
      }
    }

    // Check if username already exists
    const existingUsername = await findUserByUsername(username)
    if (existingUsername) {
      return {
        success: false,
        error: 'This username is already taken. Please try another one.',
        statusCode: 409,
      }
    }

    // hash the password
    const hashedPassword = await hashPassword(password)

    // Save user to database
    await prisma.user.create({
      data: {
        username: username.toLowerCase(),
        email: email.toLowerCase(),
        name: username,
        password: hashedPassword,
      },
    })
    const verificationToken = await generateVerificationToken(email)

    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token
    )

    return {
      success: true,
      message: 'Success! Please verify your email.',
    }
  } catch (error) {
    console.error(error)
    return {
      success: false,
      error: 'Internal Server Error. Please try again later.',
      statusCode: 500,
    }
  }
}
