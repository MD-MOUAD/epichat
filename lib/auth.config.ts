import Google from 'next-auth/providers/google'
import type { NextAuthConfig } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { loginSchema } from '@/validations/login.validation'
import { oauthVerifyEmailAction } from '@/actions/oAuthEmailVerification'
import { findUserByEmail, findUserByUsername } from '@/lib/data/user'
import { comparePassword } from '@/lib/password'
// import { generateVerificationToken } from '@/lib/data/verification-token'
// import { sendVerificationEmail } from '@/lib/nodemailer'

export default {
  pages: {
    signIn: '/auth/login',
  },
  secret: process.env.AUTH_SECRET,
  callbacks: {
    jwt({ token, user }) {
      // User is available during sign-in
      if (user?.id) token.id = user.id

      return token
    },
    session({ token, session }) {
      session.user.id = token.id
      return session
    },
    async signIn({ user, account, profile }) {
      if (account?.provider === 'google') {
        if (!!profile?.email_verified) {
          if (!user.username && user.id) {
            let username = user.name
              ? user.name
                  .replace(/[^a-zA-Z0-9]/g, '')
                  .toLowerCase()
                  .slice(0, 15)
              : 'user'
            username = `${username}${user.id.slice(0, 5)}`
            user.username = username
          }
          return true
        }
        return false
      }
      if (account?.provider === 'credentials') {
        return !!user.emailVerified
      }
      return false
    },
  },
  events: {
    async linkAccount({ user, account }) {
      if (account.provider === 'google') {
        if (user.email) await oauthVerifyEmailAction(user.email)
      }
    },
  },
  providers: [
    Google,
    Credentials({
      credentials: {
        usernameOrEmail: { label: 'Username or Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials) => {
        try {
          const parsedValues = loginSchema.safeParse(credentials)
          if (!parsedValues.success) {
            return null
          }
          const { usernameOrEmail, password } = parsedValues.data

          const isEmail = usernameOrEmail.includes('@')
          const user = isEmail
            ? await findUserByEmail(usernameOrEmail)
            : await findUserByUsername(usernameOrEmail)
          if (!user || !user.password) return null
          const passwordsMatch = await comparePassword(password, user.password)
          if (!passwordsMatch) return null

          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { password: hashedPassword, ...userWithoutPassword } = user
          return userWithoutPassword
        } catch {
          return null
        }
      },
    }),
  ],
} satisfies NextAuthConfig
