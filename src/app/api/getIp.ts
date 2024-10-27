import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const ip =
    req.headers.get("x-forwarded-for") ||
    req.headers.get("remoteAddress") ||
    "IP no disponible";
  return NextResponse.json({ ip });
}
