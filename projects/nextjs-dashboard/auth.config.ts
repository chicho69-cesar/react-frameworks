import type { NextAuthConfig } from 'next-auth'

/* Exportamos el objeto de configuración para next auth. */
export const authConfig = {
  /* Definimos la ruta de signIn */
  pages: {
    signIn: '/login',
  },
  /* Definimos los callbacks de autorización. En este caso para determinar si el
  usuario esta logueado o no. */
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
  /* Definimos los proveedores de autenticación. */
  providers: []
} satisfies NextAuthConfig
