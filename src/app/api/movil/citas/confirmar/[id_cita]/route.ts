import { prisma } from "@/prisma";
import { NextRequest, NextResponse } from "next/server";

const STATUS_TEXT = "confirmed";
export async function PUT(
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
    await prisma.appointment.update({
      where: {
        id: id_cita,
      },
      data: {
        status: STATUS_TEXT,
      },
    });
    return NextResponse.json({ message: "Cita confirmada con éxito" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
