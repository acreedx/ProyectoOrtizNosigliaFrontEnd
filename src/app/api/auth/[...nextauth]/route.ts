import NextAuth from "next-auth";
import { Patient, Permission, Person, Rol } from "@prisma/client";
import { authOptions } from "@/config/authOptions";

declare module "next-auth" {
  interface Session {
    user:
      | (Person & {
          rol: Rol & { permissions: Permission[] };
        })
      | Patient;
  }
}
declare module "next-auth/jwt" {
  interface JWT {
    user: (Person & { rol: Rol & { permissions: Permission[] } }) | Patient;
  }
}
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
