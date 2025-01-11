import NextAuth from 'next-auth'
import authConfig from '@/lib/auth.config'
import { publicRoutes } from '@/routes'

const auth = NextAuth(authConfig).auth

export default auth((req) => {
  const { pathname } = req.nextUrl
  const isLoggedIn = !!req.auth?.user
  const isPublicRoute = publicRoutes.includes(pathname)
  const isAuthRoute = pathname.startsWith('/auth')
  const isAuthApi = pathname.startsWith('/api/auth')

  if (isAuthApi || isPublicRoute) return

  if (isAuthRoute) {
    if (!isLoggedIn) return
    return Response.redirect(new URL('/', req.nextUrl))
  }

  if (!isPublicRoute && !isLoggedIn) {
    return Response.redirect(new URL('/auth/login', req.nextUrl))
  }
  return
})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}
