import { prisma } from "@/config/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const pacientes = await prisma.person.findMany({
      where: {
        rol: {
          roleName: "Paciente",
        },
      },
      select: {
        id: true,
        resourceType: true,
        active: true,
        firstName: true,
        secondName: true,
        familyName: true,
        gender: true,
        birthDate: true,
        phone: true,
        mobile: true,
        email: true,
        addressLine: true,
        addressCity: true,
        maritalStatus: true,
        identification: true,
        username: true,
        password: true,
        lastLogin: true,
        passwordExpiration: true,
        photoUrl: true,
        allergies: true,
      },
    });
    return NextResponse.json({ pacientes });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
