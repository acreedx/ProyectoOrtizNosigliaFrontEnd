import { prisma } from "@/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await prisma.organization.create({
      data: {
        name: "Seguros La Nueva Vida S.A.",
        address: "Calle 10, Zona Sur",
      },
    });
    return NextResponse.json({
      message: "Organizaciones creadas correctamente",
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Error al insertar las organizaciones", details: error },
      { status: 500 },
    );
  }
}