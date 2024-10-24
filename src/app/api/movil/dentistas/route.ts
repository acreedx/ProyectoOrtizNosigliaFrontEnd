import { prisma } from "@/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const dentistas = await prisma.person.findMany({
      where: {
        rol: {
          roleName: "Dentista",
        },
      },
      include: {
        rol: true,
      },
    });
    return NextResponse.json({ dentistas });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
