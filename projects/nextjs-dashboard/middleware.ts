import NextAuth from 'next-auth'
import { authConfig } from './auth.config'
 
/* Definimos la configuración de NextAuth en nuestro middleware. */
export default NextAuth(authConfig).auth
 
export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}
