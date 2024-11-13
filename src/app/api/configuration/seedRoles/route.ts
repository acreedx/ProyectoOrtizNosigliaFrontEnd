import { prisma } from "@/config/prisma";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const permisos = await prisma.permission.findMany();
    const permisosEncontrados = permisos.map((element) => element.id);
    const roles = await prisma.rol.findMany();
    if (roles.length === 0) {
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
      return NextResponse.json({
        message: "Roles insertados correctamente",
        createdRoles,
      });
    } else {
      return NextResponse.json({
        message: "Roles insertados correctamente",
      });
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Error al insertar roles", details: error },
      { status: 500 },
    );
  }
}
