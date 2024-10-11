import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { permission } from "process";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "POST") {
    const permisos = await prisma.permission.findMany();
    let permisosEncontrados: string[] = [];
    permisos.forEach((element) => {
      permisosEncontrados.push(element.id);
    });
    const rolesData = [
      {
        roleName: "Paciente",
        description: "Persona que adquiere servicios del centro",
        active: true,
        permissions: permisosEncontrados,
      },
      {
        roleName: "Dentista",
        description: "Persona encargada de tratar a los pacientes",
        active: true,
        permissions: permisosEncontrados,
      },
      {
        roleName: "Secretario",
        description:
          "Personal encargado de administrar la informacion de los pacientes y citas",
        active: true,
        permissions: permisosEncontrados,
      },
      {
        roleName: "Administrador",
        description: "Personal que administra todo en el centro",
        active: true,
        permissions: permisosEncontrados,
      },
      {
        roleName: "Enfermero",
        description: "Ayudante del dentista y del medico temporal",
        active: true,
        permissions: permisosEncontrados,
      },
      {
        roleName: "Medico Temporal",
        description: "Medico que trabaja temporalmente en el centro",
        active: true,
        permissions: permisosEncontrados,
      },
    ];

    try {
      const result = await prisma.rol.createMany({
        data: rolesData,
      });
      res
        .status(200)
        .json({ message: "Roles insertados correctamente", result });
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
