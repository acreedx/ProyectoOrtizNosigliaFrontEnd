import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { prisma } from "@/prisma";
import { Permission, Person, Rol } from "@prisma/client";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {
          label: "username",
          type: "text",
          placeholder: "Ingresa tu nombre de usuario...",
        },
        password: { label: "password", type: "password", placeholder: "*****" },
      },
      async authorize(credentials, req) {
        const user = await prisma.person.findFirst({
          where: {
            username: credentials?.username,
          },
          include: {
            rol: {
              include: {
                permissions: true,
              },
            },
          },
        });
        if (!user) {
          throw new Error("Credenciales Incorrectas");
        }
        const isPasswordValid = await bcrypt.compare(
          credentials!.password!,
          user.password,
        );
        if (!isPasswordValid) {
          throw new Error("Credenciales Incorrectas");
        }
        user.password = "";
        return user;
      },
    }),
  ],
  session: {
    maxAge: 3600,
    strategy: "jwt",
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    maxAge: 3600,
  },
  callbacks: {
    async jwt({ account, token, user, profile, session }) {
      if (user) token.user = user as any;
      return token;
    },
    async session({ session, token }) {
      session.user = token.user;
      return session;
    },
  },
  pages: {
    signIn: "/paginaweb/login",
    signOut: "/paginaweb/login",
  },
});

declare module "next-auth" {
  interface Session {
    user: Person & { rol: Rol & { permissions: Permission[] } };
  }
}
declare module "next-auth/jwt" {
  interface JWT {
    user: Person & { rol: Rol & { permissions: Permission[] } };
  }
}
export { handler as GET, handler as POST };
