import type {} from 'next-auth/jwt'
import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'

declare module 'next-auth' {
  interface Session {
    uid: string
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    uid?: string
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: { email: {}, password: {} },
      async authorize(current) {
        const { prisma } = await import('@/prisma')
        const user = await prisma.user.findUnique({
          where: { email: (current.email as string) ?? '' },
        })

        // Check by username
        if (!user) {
          return null
        }

        // Check password
        const { compare } = await import('bcrypt')
        if (!(await compare(current.password as string, user.password))) {
          return null
        }

        return { email: user.email, id: user.id }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.uid = user.id
      }
      return token
    },
    session({ session, token }) {
      if (token.uid) {
        session.uid = token.uid
      }

      return session
    },
  },
  pages: { signIn: '/signin' },
})
