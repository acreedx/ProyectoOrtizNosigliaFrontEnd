"use server";
import { prisma } from "@/config/prisma";
import { userStatus } from "@/enums/userStatus";
import { Person } from "@prisma/client";

export async function listarUsuarios() {
  try {
    const usuarios = await prisma.person.findMany({
      where: {
        rol: {
          roleName: {
            not: "Paciente",
          },
        },
      },
    });
    return usuarios;
  } catch (error) {
    throw new Error("Error al listar los datos");
  }
}

export async function crearUsuario(user: Person) {
  try {
    const usuario = await prisma.person.create({
      data: user,
    });
    return usuario;
  } catch (error) {
    throw new Error("Error al listar los datos");
  }
}

export async function editarUsuario(id: string, user: Person) {
  try {
    const usuario = await prisma.person.update({
      where: {
        id: id,
      },
      data: user,
    });
    return usuario;
  } catch (error) {
    throw new Error("Error al listar los datos");
  }
}

export async function habilitarUsuario(id: string) {
  try {
    await prisma.person.update({
      where: {
        id: id,
      },
      data: {
        status: userStatus.ACTIVO,
      },
    });
    return { message: "Éxito al actualizar los datos" };
  } catch (error) {
    throw new Error("Error al listar los datos");
  }
}

export async function deshabilitarUsuario(id: string) {
  try {
    await prisma.person.update({
      where: {
        id: id,
      },
      data: {
        status: userStatus.ELIMINADO,
      },
    });
    return { message: "Éxito al actualizar los datos" };
  } catch (error) {
    throw new Error("Error al listar los datos");
  }
}
