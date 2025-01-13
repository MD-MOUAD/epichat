import 'server-only'

import nodemailer from 'nodemailer'
import {
  VERIFICATION_TOKEN_EXP_MIN,
  RESET_TOKEN_EXP_MIN,
} from '@/lib/constants'

export const transport = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    type: 'OAuth2',
    user: process.env.NODEMAILER_GOOGLE_SMTP_USER,
    clientId: process.env.NODEMAILER_GOOGLE_ID,
    clientSecret: process.env.NODEMAILER_GOOGLE_SECRET,
    accessToken: process.env.NODEMAILER_GOOGLE_ACCESS_TOKEN,
    refreshToken: process.env.NODEMAILER_GOOGLE_REFRESH_TOKEN,
  },
})

export const sendVerificationEmail = async (email: string, token: string) => {
  await transport.sendMail({
    from: `"Epichat Team" <${process.env.NODEMAILER_GOOGLE_SMTP_USER}>`,
    to: email,
    subject: 'Verify Your Email Address',
    html: `
    <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e5e7eb; border-radius: 10px; background-color: #f9fafb;">
      <h2 style="text-align: center; color: #12a206; font-size: 28px; margin-bottom: 10px;">Welcome to Epichat!</h2>
      <p style="text-align: center; color: #4b5563; font-size: 18px; margin-top: 0;">We’re thrilled to have you onboard.</p>

      <p style="color: #4b5563; font-size: 16px; margin-bottom: 20px;">Hi there,</p>
      <p style="color: #4b5563; font-size: 16px; margin-bottom: 20px;">Please verify your email address to start exploring the full features of Epichat. This link will expire in <strong>${VERIFICATION_TOKEN_EXP_MIN} minutes</strong>. If you didn’t request this, you can safely ignore this email.</p>

      <div style="text-align: center; margin: 30px 0;">
        <a href="${process.env.AUTH_URL}/auth/new-verification?token=${token}" style="display: inline-block; padding: 12px 24px; font-size: 16px; color: #fff; background-color: #12a206; text-decoration: none; border-radius: 5px; font-weight: bold;">Verify Email</a>
      </div>

      <p style="color: #4b5563; font-size: 16px;">Thank you for joining Epichat! If you have any questions, feel free to reach out to our support team.</p>

      <br />

      <p style="text-align: center; font-size: 12px; color: #9ca3af;">You received this email because you signed up for Epichat. If this wasn’t you, please contact our support team.</p>
      <p style="text-align: center; font-size: 12px; color: #9ca3af;">&copy; 2025 Epichat. All rights reserved.</p>
    </div>
    `,
  })
}

export const sendPasswordResetEmail = async (email: string, token: string) => {
  await transport.sendMail({
    from: `"Epichat Team" <${process.env.NODEMAILER_GOOGLE_SMTP_USER}>`,
    to: email,
    subject: 'Reset Your Password',
    html: `
    <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e5e7eb; border-radius: 10px; background-color: #f9fafb;">
      <h2 style="text-align: center; color: #12a206; font-size: 28px; margin-bottom: 10px;">Reset Your Password</h2>
      <p style="text-align: center; color: #4b5563; font-size: 18px; margin-top: 0;">Need help accessing your account?</p>

      <p style="color: #4b5563; font-size: 16px; margin-bottom: 20px;">Hi there,</p>
      <p style="color: #4b5563; font-size: 16px; margin-bottom: 20px;">We received a request to reset your password. Click the link below to choose a new password. This link will expire in <strong>${RESET_TOKEN_EXP_MIN} minutes</strong>. If you didn’t request this, you can safely ignore this email.</p>

      <div style="text-align: center; margin: 30px 0;">
        <a href="${process.env.AUTH_URL}/auth/new-password?token=${token}" style="display: inline-block; padding: 12px 24px; font-size: 16px; color: #fff; background-color: #12a206; text-decoration: none; border-radius: 5px; font-weight: bold;">Reset Password</a>
      </div>

      <p style="color: #4b5563; font-size: 16px;">If you have any questions or encounter issues, feel free to contact our support team.</p>

      <br />

      <p style="text-align: center; font-size: 12px; color: #9ca3af;">You received this email because a password reset request was made for your Epichat account. If this wasn’t you, please contact our support team immediately.</p>
      <p style="text-align: center; font-size: 12px; color: #9ca3af;">&copy; 2025 Epichat. All rights reserved.</p>
    </div>
    `,
  })
}
