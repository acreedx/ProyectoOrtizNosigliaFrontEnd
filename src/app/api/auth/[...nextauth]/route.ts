import NextAuth, { NextAuthOptions } from "next-auth";
import { Permission, Person, Rol } from "@prisma/client";
import { authOptions } from "@/utils/authOptions";

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
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
