import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { hashPassword } from "../../utils/password_hasher";
import { getPasswordExpiration } from "../../utils/get_password_expiration";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "POST") {
    try {
      const administradorRole = await prisma.rol.findUnique({
        where: { roleName: "Administrador" },
      });

      if (!administradorRole) {
        return res
          .status(404)
          .json({ error: "Rol de Administrador no encontrado" });
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

      const dentistaRole = await prisma.rol.findUnique({
        where: { roleName: "Dentista" },
      });

      if (!dentistaRole) {
        return res
          .status(404)
          .json({ error: "Rol de Administrador no encontrado" });
      }

      const initialDenstist = await prisma.person.create({
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
            connect: { id: administradorRole.id },
          },
        },
      });

      res.status(200).json({
        message: "Usuario Administrador creado correctamente",
        initialUser,
      });
    } catch (error) {
      res
        .status(500)
        .json({ error: "Error al insertar roles", details: error });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
