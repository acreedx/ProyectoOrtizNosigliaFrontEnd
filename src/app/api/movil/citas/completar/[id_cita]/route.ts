import { prisma } from "@/config/prisma";
import { NextRequest, NextResponse } from "next/server";

const STATUS_TEXT = "completed";
export async function PUT(
  req: NextRequest,
  { params }: { params: { id_cita: string; diagnostico: string } },
) {
  const { id_cita, diagnostico } = params;
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
        description: diagnostico,
      },
    });
    return NextResponse.json({ message: "Cita completada con éxito" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
