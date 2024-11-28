export { default } from "next-auth/middleware";
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { routes } from "./config/routes";
import { userTypes } from "./enums/userTypes";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (!token) {
    return NextResponse.redirect(new URL(routes.login, req.url));
  }

  const isPerson = token.user.resourceType === userTypes.Persona;
  const isPatient = token.user.resourceType === userTypes.Paciente;
  if (isPatient) {
    return NextResponse.redirect(new URL(routes.acceso_no_autorizado, req.url));
  }
  if (isPerson) {
    return NextResponse.next();
  }
  return NextResponse.redirect(new URL(routes.acceso_no_autorizado, req.url));
}
export const config = { matcher: ["/dashboard/:path*"] };
