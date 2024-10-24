import { prisma } from "@/prisma";
import { NextRequest, NextResponse } from "next/server";

export function GET() {
  try {
    const pacientes = prisma.person.findMany({
      where: {
        rol: {
          roleName: "Paciente",
        },
      },
      include: {
        rol: true,
      },
    });
    return NextResponse.json({ pacientes });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET_BY_ID(
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
        rol: true,
      },
    });
    return NextResponse.json({ paciente });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
