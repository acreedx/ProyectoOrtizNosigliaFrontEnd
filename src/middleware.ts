import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";
export async function middleware(request: NextRequest) {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error(
      "El secreto JWT no esta definido en las variables de entorno",
    );
  }
  const userJwtToken = request.cookies.get("access_token");
  if (userJwtToken === undefined) {
    return NextResponse.redirect(
      new URL("/paginaweb/pages/login", request.url),
    );
  } else {
    try {
      const secretKey = new TextEncoder().encode(secret);
      const { payload } = await jwtVerify(userJwtToken.value, secretKey);
      console.log(payload);
      return NextResponse.next();
    } catch (e) {
      return NextResponse.redirect(
        new URL("/paginaweb/pages/login", request.url),
      );
    }
  }
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
