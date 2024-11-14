import { prisma } from "@/config/prisma";
import { routes } from "@/config/routes";
import {
  auditEventTypes,
  auditEventAction,
  modulos,
  auditEventOutcome,
} from "@/enums/auditEventTypes";
import { NextAuthOptions } from "next-auth";
import { logEvent } from "./logger";
import bcrypt from "bcryptjs";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
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
          await logEvent({
            type: auditEventTypes.AUTHENTICATION,
            action: auditEventAction.ACCION_INICIAR_SESION,
            moduleName: modulos.MODULO_PAGINA_WEB,
            personName: user.firstName,
            personRole: user.rol.roleName,
            detail: "Intento de inicio de sesión fallido",
            personId: user.id,
            outcome: auditEventOutcome.OUTCOME_ERROR,
          });
          throw new Error("Credenciales Incorrectas");
        }
        user.firstName;
        await logEvent({
          type: auditEventTypes.AUTHENTICATION,
          action: auditEventAction.ACCION_INICIAR_SESION,
          moduleName: modulos.MODULO_PAGINA_WEB,
          personName: user.firstName,
          personRole: user.rol.roleName,
          personId: user.id,
        });
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
    signIn: routes.login,
    signOut: routes.login,
  },
};
