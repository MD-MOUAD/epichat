'use server'

import { generatePasswordResetToken } from '@/lib/data/password-reset-token'
import { findUserByEmail } from '@/lib/data/user'
import { sendPasswordResetEmail } from '@/lib/nodemailer'
import { resetSchema, resetValues } from '@/validations/reset.validation'

export async function passwordReset(values: resetValues) {
  const parsedValues = resetSchema.safeParse(values)
  if (!parsedValues.success) {
    return { error: 'Please enter a valid email address.' }
  }

  const { email } = parsedValues.data

  try {
    const existingUser = await findUserByEmail(email)
    if (!existingUser || !existingUser.password) {
      return { error: 'Email not found!' }
    }
    const verificationToken = await generatePasswordResetToken(
      existingUser.email
    )
    await sendPasswordResetEmail(
      verificationToken.email,
      verificationToken.token
    )
    return { success: 'Reset Email sent!' }
  } catch (error) {
    console.error(error)
    return { error: 'An unexpected error occurred. Please try again.' }
  }
}
