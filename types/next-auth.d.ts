import { type User as DefaultUser } from 'next-auth'
import { type JWT as DefaultJWT } from 'next-auth/jwt'
import { type User as PrismaUser } from '@prisma/client'

declare module 'next-auth' {
  interface User extends DefaultUser {
    // user.emailVerified (id is defined in latest versions)
    emailVerified: PrismaUser['emailVerified']
    username: PrismaUser['username']
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends DefaultJWT {
    // token.id
    id: PrismaUser['id']
  }
}
