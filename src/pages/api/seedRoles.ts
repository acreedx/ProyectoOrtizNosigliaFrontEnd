import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "POST") {
    try {
      const permisos = await prisma.permission.findMany();
      const permisosEncontrados = permisos.map((element) => element.id);
      const rolesData = [
        {
          roleName: "Paciente",
          description: "Persona que adquiere servicios del centro",
          active: true,
        },
        {
          roleName: "Dentista",
          description: "Persona encargada de tratar a los pacientes",
          active: true,
        },
        {
          roleName: "Secretario",
          description:
            "Personal encargado de administrar la información de los pacientes y citas",
          active: true,
        },
        {
          roleName: "Administrador",
          description: "Personal que administra todo en el centro",
          active: true,
        },
        {
          roleName: "Enfermero",
          description: "Ayudante del dentista y del médico temporal",
          active: true,
        },
        {
          roleName: "Médico Temporal",
          description: "Médico que trabaja temporalmente en el centro",
          active: true,
        },
      ];
      const createdRoles = await Promise.all(
        rolesData.map(async (role) => {
          return await prisma.rol.create({
            data: {
              ...role,
              permissions: {
                connect: permisosEncontrados.map((id) => ({ id })),
              },
            },
          });
        }),
      );
      res
        .status(200)
        .json({ message: "Roles insertados correctamente", createdRoles });
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
