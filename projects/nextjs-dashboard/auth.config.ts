import type { NextAuthConfig } from 'next-auth'

export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl }}) {
      const isLoggedIn = !!auth?.user
      const isInDashboard = nextUrl.pathname.startsWith('/dashboard')

      if (isInDashboard) {
        if (isLoggedIn) return true
        return false
      } else if (isLoggedIn) {
        return Response.redirect(new URL('/dashboard', nextUrl))
      }

      return true
    }
  },
  providers: []
} satisfies NextAuthConfig
