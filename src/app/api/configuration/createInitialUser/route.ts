import { getPasswordExpiration } from "@/utils/get_password_expiration";
import { hashPassword } from "@/utils/password_hasher";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const administradorRole = await prisma.rol.findUnique({
      where: { roleName: "Administrador" },
    });

    if (!administradorRole) {
      return NextResponse.json(
        { error: "Rol de Administrador no encontrado" },
        { status: 404 },
      );
    }

    const dentistaRole = await prisma.rol.findUnique({
      where: { roleName: "Dentista" },
    });
    if (!dentistaRole) {
      return NextResponse.json(
        { error: "Rol de Dentista no encontrado" },
        { status: 404 },
      );
    }

    const initialUser = await prisma.person.create({
      data: {
        active: true,
        firstName: "Jaime",
        secondName: "Adrian",
        familyName: "Herrera",
        gender: "Masculino",
        birthDate: new Date("2003-06-05"),
        email: "adrianhlinares@gmail.com",
        addressLine: "Calle Francisco Katari #1338",
        addressCity: "La Paz",
        maritalStatus: "Single",
        identification: "13679995",
        phone: "2285515",
        mobile: "73744202",
        username: "AdrianHerrera",
        password: await hashPassword("1234Aa@"),
        photoUrl: "https://example.com/photo.jpg",
        passwordExpiration: getPasswordExpiration(),
        rol: {
          connect: { id: administradorRole.id },
        },
      },
    });

    const initialDentist = await prisma.person.create({
      data: {
        active: true,
        firstName: "Jaime",
        secondName: "Adrian",
        familyName: "Herrera",
        gender: "Masculino",
        birthDate: new Date("2003-06-05"),
        email: "adrianhlinares@gmail.com",
        addressLine: "Calle Francisco Katari #1338",
        addressCity: "La Paz",
        maritalStatus: "Single",
        identification: "13679995",
        phone: "2285515",
        mobile: "73744202",
        username: "DentistaInicial",
        password: await hashPassword("1234Aa@"),
        photoUrl: "https://example.com/photo.jpg",
        passwordExpiration: getPasswordExpiration(),
        rol: {
          connect: { id: dentistaRole.id },
        },
      },
    });

    return NextResponse.json({
      message: "Usuarios creados correctamente",
      initialUser,
      initialDentist,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Error al insertar usuarios", details: error },
      { status: 500 },
    );
  }
}
