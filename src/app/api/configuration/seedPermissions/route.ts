import { prisma } from "@/config/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const permissionsData = [
    {
      permissionName: "Pagina Web",
      code: "pg_adm",
      active: true,
    },
    {
      permissionName: "Aplicación Móvil",
      code: "mov_adm",
      active: true,
    },
    {
      permissionName: "Dashboard",
      code: "dsh_adm",
      active: true,
    },
    {
      permissionName: "Pacientes",
      code: "dsh_pct_adm",
      active: true,
    },
    {
      permissionName: "Organizaciones",
      code: "dsh_org_adm",
      active: true,
    },
    {
      permissionName: "Citas",
      code: "dsh_cts_adm",
      active: true,
    },
    {
      permissionName: "Usuarios",
      code: "dsh_usu_adm",
      active: true,
    },
    {
      permissionName: "Roles",
      code: "dsh_rol_adm",
      active: true,
    },
    {
      permissionName: "Logs",
      code: "dsh_log_adm",
      active: true,
    },
    {
      permissionName: "Tratamientos",
      code: "dsh_trs_adm",
      active: true,
    },
    {
      permissionName: "Tipos de tratamiento",
      code: "dsh_ttrs_adm",
      active: true,
    },
  ];

  try {
    const permissions = await prisma.permission.findMany();
    if (permissions.length === 0) {
      const result = await prisma.permission.createMany({
        data: permissionsData,
      });
      return NextResponse.json({
        message: "Permisos insertados correctamente",
        result,
      });
    } else {
      return NextResponse.json({
        message: "Permisos insertados correctamente",
      });
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Error al insertar permisos", details: error },
      { status: 500 },
    );
  }
}
