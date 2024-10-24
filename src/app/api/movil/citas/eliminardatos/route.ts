import { prisma } from "@/prisma"; // Asegúrate de ajustar la ruta
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await prisma.appointment.deleteMany({});
    return NextResponse.json({ message: "Exito" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
