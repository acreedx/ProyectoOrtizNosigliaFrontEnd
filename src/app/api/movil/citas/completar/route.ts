import { prisma } from "@/prisma";
import { NextRequest, NextResponse } from "next/server";

const STATUS_TEXT = "completed";
export async function PUT(
  req: NextRequest,
  { params }: { params: { id_cita: string; diagnostico: string } },
) {
  const { id_cita, diagnostico } = params;
  try {
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
