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

    const pacienteRole = await prisma.rol.findUnique({
      where: { roleName: "Paciente" },
    });

    if (!pacienteRole) {
      return NextResponse.json(
        { error: "Rol de Paciente no encontrado" },
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
        photoUrl:
          "https://media.istockphoto.com/id/1371009338/photo/portrait-of-confident-a-young-dentist-working-in-his-consulting-room.jpg?s=612x612&w=0&k=20&c=I212vN7lPpAOwGKRoEY9kYWunJaMj9vH2g-8YBGc2MI=",
        passwordExpiration: getPasswordExpiration(),
        rol: {
          connect: { id: dentistaRole.id },
        },
      },
    });

    const initialPatient = await prisma.person.create({
      data: {
        active: true,
        firstName: "Juan",
        secondName: "Pablo",
        familyName: "Mendoza",
        gender: "Masculino",
        birthDate: new Date("2003-06-05"),
        email: "adrianhlinares@gmail.com",
        addressLine: "Calle Francisco Katari #1338",
        addressCity: "La Paz",
        maritalStatus: "Single",
        identification: "13679995",
        phone: "2285515",
        mobile: "73744202",
        username: "PacienteInicial",
        password: await hashPassword("1234Aa@"),
        photoUrl: "https://cdn-icons-png.flaticon.com/512/1430/1430453.png",
        passwordExpiration: getPasswordExpiration(),
        rol: {
          connect: { id: pacienteRole.id },
        },
      },
    });

    return NextResponse.json({
      message: "Usuarios creados correctamente",
      initialUser,
      initialDentist,
      initialPatient,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Error al insertar usuarios", details: error },
      { status: 500 },
    );
  }
}
