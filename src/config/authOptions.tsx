import { routes } from "@/config/routes";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { verifyCaptchaToken } from "@/utils/captcha";
import { authenticateUser } from "./authenticateUser";

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
        if (!credentials) {
          throw new Error("Credenciales inválidas");
        }
        if (!credentials.token) {
          throw new Error("Token no encontrado");
        }
        const captchaData = await verifyCaptchaToken(credentials.token);
        if (!captchaData) {
          throw new Error("Error al verificar el captcha");
        }
        if (!captchaData.success || captchaData.score < 0.5) {
          throw new Error("Captcha Fallido");
        }
        const response = await authenticateUser({
          username: credentials.username,
          password: credentials.password,
        });
        if (!response) {
          throw new Error("Credenciales inválidas");
        }
        console.log(response);
        return response;
      },
    }),
  ],
  session: {
    maxAge: 3600,
    strategy: "jwt",
  },

  jwt: {
    maxAge: 3600,
    secret: process.env.JWT_SECRET,
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
