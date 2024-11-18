import { prisma } from "@/config/prisma";
import { userStatus } from "@/enums/userStatus";
import { accountPorDefecto } from "@/utils/default_account";
import { odontogramaPorDefecto } from "@/utils/default_odontograma";
import { getPasswordExpiration } from "@/utils/get_password_expiration";
import { hashPassword } from "@/utils/password_hasher";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const usuarios = await prisma.person.findMany();
    if (usuarios.length === 0) {
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

      const initialAdministrador = await prisma.person.create({
        data: {
          photoUrl:
            "https://media.istockphoto.com/id/1371009338/photo/portrait-of-confident-a-young-dentist-working-in-his-consulting-room.jpg?s=612x612&w=0&k=20&c=I212vN7lPpAOwGKRoEY9kYWunJaMj9vH2g-8YBGc2MI=",
          firstName: "Jaime",
          secondName: "Adrian",
          familyName: "Herrera",
          gender: "masculino",
          birthDate: new Date("2003-06-05"),
          phone: "2285515",
          mobile: "73744202",
          email: "adrianhlinares@gmail.com",
          addressLine: "Calle Francisco Katari #1338",
          addressCity: "La Paz",
          maritalStatus: "soltero",
          identification: "13679995",
          username: "AdrianHerrera",
          password: await hashPassword("1234Aa@"),
          passwordExpiration: getPasswordExpiration(),
          status: userStatus.ACTIVO,
          odontograma: {
            create: odontogramaPorDefecto,
          },
          account: {
            create: accountPorDefecto,
          },
          rol: {
            connect: { id: administradorRole.id },
          },
        },
      });

      const dentist1 = await prisma.person.create({
        data: {
          firstName: "Fernando",
          familyName: "Ortiz Nosiglia",
          gender: "masculino",
          birthDate: new Date("2003-06-05"),
          email: "adrianhlinares@gmail.com",
          addressLine: "Calle Francisco Katari #1338",
          addressCity: "La Paz",
          maritalStatus: "soltero",
          identification: "13679988",
          phone: "2285515",
          mobile: "73744202",
          username: "DentistaFernando",
          password: await hashPassword("1234Aa@"),
          photoUrl:
            "https://firebasestorage.googleapis.com/v0/b/proyectoortiznosiglia.appspot.com/o/fotosDePerfil%2FFernando.png?alt=media&token=1eebe1de-72c7-4bf6-9337-861582e05593",
          passwordExpiration: getPasswordExpiration(),
          status: userStatus.ACTIVO,
          odontograma: {
            create: odontogramaPorDefecto,
          },
          qualifications: {
            create: [
              {
                start: new Date("2003-08-19"),
                end: new Date("2007-08-19"),
                name: "Odontólogo",
                issuer: "Universidad Internacional de Los Andes",
              },
            ],
          },
          account: {
            create: accountPorDefecto,
          },
          rol: {
            connect: { id: dentistaRole.id },
          },
        },
      });
      const dentist2 = await prisma.person.create({
        data: {
          firstName: "Álvaro",
          familyName: "Ortiz Nosiglia",
          gender: "masculino",
          birthDate: new Date("2003-06-05"),
          email: "adrianhlinares@gmail.com",
          addressLine: "Calle Francisco Katari #1338",
          addressCity: "La Paz",
          maritalStatus: "soltero",
          identification: "13679989",
          phone: "2285515",
          mobile: "73744202",
          username: "DentistaFernando",
          password: await hashPassword("1234Aa@"),
          photoUrl:
            "https://firebasestorage.googleapis.com/v0/b/proyectoortiznosiglia.appspot.com/o/fotosDePerfil%2FAlvaro.png?alt=media&token=f9d131c2-b5d5-4cf5-8efe-7a96cb5e99ea",
          passwordExpiration: getPasswordExpiration(),
          status: userStatus.ACTIVO,
          odontograma: {
            create: odontogramaPorDefecto,
          },
          account: {
            create: accountPorDefecto,
          },
          qualifications: {
            create: [
              {
                start: new Date("2003-08-19"),
                end: new Date("2007-08-19"),
                name: "Odontólogo",
                issuer: "Universidad Internacional de Los Andes",
              },
            ],
          },
          rol: {
            connect: { id: dentistaRole.id },
          },
        },
      });
      const dentist3 = await prisma.person.create({
        data: {
          firstName: "Javier",
          familyName: "Ortiz Nosiglia",
          gender: "masculino",
          birthDate: new Date("2003-06-05"),
          email: "adrianhlinares@gmail.com",
          addressLine: "Calle Francisco Katari #1338",
          addressCity: "La Paz",
          maritalStatus: "soltero",
          identification: "13679990",
          phone: "2285515",
          mobile: "73744202",
          username: "DentistaFernando",
          password: await hashPassword("1234Aa@"),
          photoUrl:
            "https://firebasestorage.googleapis.com/v0/b/proyectoortiznosiglia.appspot.com/o/fotosDePerfil%2FJavier.png?alt=media&token=451730fa-b8ab-453d-8d7a-929dfad026e0",
          passwordExpiration: getPasswordExpiration(),
          status: userStatus.ACTIVO,
          odontograma: {
            create: odontogramaPorDefecto,
          },
          account: {
            create: accountPorDefecto,
          },
          qualifications: {
            create: [
              {
                start: new Date("2003-08-19"),
                end: new Date("2007-08-19"),
                name: "Odontólogo",
                issuer: "Universidad Internacional de Los Andes",
              },
            ],
          },
          rol: {
            connect: { id: dentistaRole.id },
          },
        },
      });
      const initialPatient = await prisma.person.create({
        data: {
          firstName: "Juan",
          secondName: "Pablo",
          familyName: "Mendoza Fernandez",
          gender: "masculino",
          birthDate: new Date("2003-06-05"),
          email: "adrianhlinares@gmail.com",
          addressLine: "Calle Francisco Katari #1338",
          addressCity: "La Paz",
          maritalStatus: "soltero",
          identification: "13679997",
          phone: "2285515",
          mobile: "73744202",
          username: "PacienteInicial",
          password: await hashPassword("1234Aa@"),
          photoUrl: "https://cdn-icons-png.flaticon.com/512/1430/1430453.png",
          passwordExpiration: getPasswordExpiration(),
          status: userStatus.ACTIVO,
          account: {
            create: accountPorDefecto,
          },
          odontograma: {
            create: odontogramaPorDefecto,
          },
          rol: {
            connect: { id: pacienteRole.id },
          },
        },
      });

      return NextResponse.json({
        message: "Usuarios creados correctamente",
        initialAdministrador,
        dentist1,
        dentist2,
        dentist3,
        initialPatient,
      });
    } else {
      return NextResponse.json({
        message: "Usuarios creados correctamente",
      });
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Error al insertar usuarios", details: error },
      { status: 500 },
    );
  }
}
