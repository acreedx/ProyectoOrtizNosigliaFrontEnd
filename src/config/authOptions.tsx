import { prisma } from "@/config/prisma";
import { routes } from "@/config/routes";
import {
  auditEventTypes,
  auditEventAction,
  modulos,
  auditEventOutcome,
} from "@/enums/auditEventTypes";
import { NextAuthOptions, User } from "next-auth";
import bcrypt from "bcryptjs";
import CredentialsProvider from "next-auth/providers/credentials";
import { logEvent } from "@/utils/logger";
import { Person } from "@prisma/client";
import { SignInResponse } from "next-auth/react";
import { userStatus } from "@/enums/userStatus";
import { verifyCaptchaToken } from "@/utils/captcha";

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
        token: { label: "token", type: "text" },
      },
      async authorize(credentials, req) {
        if (!credentials?.token) {
          throw new Error("Token no encontrado");
        }
        const captchaData = await verifyCaptchaToken(credentials.token);
        if (!captchaData) {
          throw new Error("Error al verificar el captcha");
        }
        if (!captchaData.success || captchaData.score < 0.5) {
          throw new Error("Captcha Fallido");
        }
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
        if (!user || user.status === userStatus.ELIMINADO) {
          throw new Error("Credenciales Incorrectas");
        }
        const isPasswordValid = await bcrypt.compare(
          credentials!.password!,
          user.password,
        );
        if (!isPasswordValid) {
          if (user.passwordAttempts >= 5) {
            await prisma.person.update({
              where: {
                id: user.id,
              },
              data: {
                status: userStatus.BLOQUEADO,
              },
            });
            throw new Error(
              "El usuario esta bloqueado, cambie su contraseña para continuar",
            );
          }
          await prisma.person.update({
            where: {
              id: user.id,
            },
            data: {
              passwordAttempts: user.passwordAttempts + 1,
            },
          });
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
        if (user.status === userStatus.BLOQUEADO) {
          throw new Error(
            "El usuario esta bloqueado, cambie su contraseña para continuar",
          );
        }

        if (user.passwordExpiration < new Date()) {
          throw new Error(
            "Su contraseña a expirado, debe cambiarla para iniciar sesión",
          );
        }
        if (user.status === userStatus.NUEVO) {
          throw new Error(
            "Usuario Nuevo, debe cambiar su contraseña para acceder",
          );
        }
        await logEvent({
          type: auditEventTypes.AUTHENTICATION,
          action: auditEventAction.ACCION_INICIAR_SESION,
          moduleName: modulos.MODULO_PAGINA_WEB,
          personName: user.firstName,
          personRole: user.rol.roleName,
          personId: user.id,
        });
        await prisma.person.update({
          where: {
            id: user.id,
          },
          data: {
            passwordAttempts: 0,
            lastLogin: new Date(),
          },
        });
        user.password = "_";
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
