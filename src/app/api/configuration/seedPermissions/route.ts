import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
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

    return NextResponse.json({
      message: "Permisos insertados correctamente",
      result,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Error al insertar permisos", details: error },
      { status: 500 },
    );
  }
}
