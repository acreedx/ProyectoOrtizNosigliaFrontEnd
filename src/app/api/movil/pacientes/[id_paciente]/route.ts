import { prisma } from "@/prisma";
import { NextRequest, NextResponse } from "next/server";
export async function GET(
  req: NextRequest,
  { params }: { params: { id_paciente: string } },
) {
  const { id_paciente } = params;

  try {
    const paciente = await prisma.person.findFirst({
      where: {
        rol: {
          roleName: "Paciente",
        },
        id: id_paciente,
      },
      include: {
        allergies: true,
      },
    });
    if (!paciente) {
      return NextResponse.json(
        { error: "No existe ese paciente" },
        { status: 500 },
      );
    }
    return NextResponse.json({ paciente });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
