import { prisma } from "@/config/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id_cita: string } },
) {
  const { id_cita } = params;
  try {
    const cita = await prisma.appointment.findFirst({
      where: {
        id: id_cita,
      },
    });
    if (!cita) {
      return NextResponse.json(
        { error: "No existe esa cita" },
        { status: 500 },
      );
    }
    return NextResponse.json({ cita });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
