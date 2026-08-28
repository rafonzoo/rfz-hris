import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: { email: {}, password: {} },
      async authorize(current) {
        const { prisma } = await import("@/prisma");
        const user = await prisma.user.findUnique({
          where: { email: (current.email as string) ?? "" },
        });

        // Check by username
        if (!user) return null;

        // Check password
        const { compare } = await import("bcrypt");
        if (!(await compare(current.password as string, user.password))) {
          return null;
        }

        return user;
      },
    }),
  ],
  pages: { signIn: "/signin" },
});
