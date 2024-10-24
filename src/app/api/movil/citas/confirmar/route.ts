import { prisma } from "@/prisma";
import { NextRequest, NextResponse } from "next/server";

const STATUS_TEXT = "confirmed";
export async function PUT(
  req: NextRequest,
  { params }: { params: { id_cita: string } },
) {
  const { id_cita } = params;
  try {
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
