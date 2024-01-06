import NextAuth from 'next-auth'
import { authConfig } from './auth.config'
import Credentials from 'next-auth/providers/credentials'
import { z } from 'zod'
import { sql } from '@vercel/postgres'
import bcrypt from 'bcrypt'

import type { User } from '@/app/lib/definitions'

async function getUser(email: string): Promise<User | undefined> {
  try {
    // const user = await sql<User>`SELECT * FROM users WHERE email=${email}`
    // return user.rows[0]

    return {
      id: '1',
      email: 'cesarvillalobosolmos.01@gmail.com',
      name: 'Cesar Villalobos Olmos',
      password: await bcrypt.hash('123456', 10)
    }
  } catch (error) {
    console.error('Failed to fetch user:', error)
    throw new Error('Failed to fetch user.')
  }
}

/* Exportamos las funciones de auth, signIn y signOut de NextAuth. */
export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      /* Creamos nuestra función de autorización que se ejecutara cuando queramos
      autorizar a un usuario, es decir, iniciar sesión con el. */
      async authorize(credentials) {
        const parsedCredentials = z
          .object({
            email: z.string().email(),
            password: z.string().min(6),
          })
          .safeParse(credentials)

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data
          const user = await getUser(email)

          if (!user) return null

          const passwordsMatch = await bcrypt.compare(password, user.password)

          if (passwordsMatch) return user
        }

        console.log('Invalid credentials')
        return null
      }
    }),
  ]
})
