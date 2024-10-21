import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "POST") {
    const permissionsData = [
      {
        permissionName: "Crear usuarios",
        code: "cre_usr",
        active: true,
      },
      {
        permissionName: "Editar usuarios",
        code: "edt_usr",
        active: true,
      },
      {
        permissionName: "Deshabilitar usuarios",
        code: "dsh_usr",
        active: true,
      },
      {
        permissionName: "Crear roles",
        code: "cre_rl",
        active: true,
      },
      {
        permissionName: "Editar roles",
        code: "edt_rl",
        active: true,
      },
      {
        permissionName: "Asignar roles",
        code: "asgn_rl",
        active: true,
      },
      {
        permissionName: "Deshabilitar roles",
        code: "dsh_rl",
        active: true,
      },
      {
        permissionName: "Crear permisos",
        code: "cre_prm",
        active: true,
      },
      {
        permissionName: "Editar permisos",
        code: "edt_prm",
        active: true,
      },
      {
        permissionName: "Deshabilitar permisos",
        code: "dsh_prm",
        active: true,
      },
      {
        permissionName: "Editar odontogramas de pacientes",
        code: "edt_odn",
        active: true,
      },
      {
        permissionName: "Crear citas",
        code: "cre_cit",
        active: true,
      },
      {
        permissionName: "Editar citas",
        code: "edt_cit",
        active: true,
      },
      {
        permissionName: "Deshabilitar citas",
        code: "dsh_cit",
        active: true,
      },
    ];

    try {
      const result = await prisma.permission.createMany({
        data: permissionsData,
      });
      res
        .status(200)
        .json({ message: "Permisos insertados correctamente", result });
    } catch (error) {
      res
        .status(500)
        .json({ error: "Error al insertar permisos", details: error });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
