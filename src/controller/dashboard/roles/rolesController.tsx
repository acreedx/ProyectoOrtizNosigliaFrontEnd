"use server";

import { prisma } from "@/config/prisma";
import { Rol } from "@prisma/client";
export async function habilitarRol(id: string) {
  try {
    await prisma.rol.update({
      where: {
        id: id,
      },
      data: {
        active: true,
      },
    });
    return { message: "Éxito al actualizar los datos" };
  } catch (error) {
    console.log(error);
    throw new Error("Error al actualizar los datos");
  }
}
export async function deshabilitarRol(id: string) {
  try {
    await prisma.rol.update({
      where: {
        id: id,
      },
      data: {
        active: false,
      },
    });
    return { message: "Éxito al actualizar los datos" };
  } catch (error) {
    console.log(error);
    throw new Error("Error al actualizar los datos");
  }
}

export async function createRol(formData: FormData) {
  try {
    const roleName = formData.get("roleName") as string;
    const description = formData.get("description") as string;
    const permissions = formData.getAll("permissions") as string[];

    if (!roleName || !description || permissions.length === 0) {
      throw new Error("Todos los campos son requeridos.");
    }

    const permissionsDB = await prisma.permission.findMany({});
    let selectedPermissions: string[] = [];
    permissions.forEach((permission, index) => {
      if (permission === "on") {
        selectedPermissions.push(permissionsDB[index].id);
      }
    });

    const newRole = await prisma.rol.create({
      data: {
        roleName,
        description,
        permissionIDs: selectedPermissions,
      },
    });

    return { message: "Éxito al crear el rol", newRole };
  } catch (error: any) {
    console.error(error);
    throw new Error("Error al crear el rol");
  }
}

export async function editarRol(id: string, formData: FormData) {
  try {
    const roleName = formData.get("roleName") as string;
    const description = formData.get("description") as string;
    const permissions = formData.getAll("permissions") as string[];

    if (!id || !roleName || !description || permissions.length === 0) {
      throw new Error("Todos los campos son requeridos.");
    }
    const permissionsDB = await prisma.permission.findMany({
      where: {
        id: { in: permissions },
      },
    });

    if (permissionsDB.length !== permissions.length) {
      throw new Error("Algunos permisos seleccionados no son válidos.");
    }
    if (permissions.length === 0) {
      throw new Error("Todos los Roles deben tener un permiso asignado");
    }
    await prisma.rol.update({
      where: {
        id,
      },
      data: {
        roleName,
        description,
        permissionIDs: permissions,
      },
    });

    return { message: "Éxito al editar los datos" };
  } catch (error: any) {
    console.error(error);
    throw new Error("Ocurrió un error inesperado al editar el rol.");
  }
}

export async function listarRol(id: string): Promise<Rol> {
  try {
    const rol = await prisma.rol.findUnique({
      where: {
        id: id,
      },
    });
    if (!rol) {
      throw new Error("No existe ese rol.");
    }
    return rol;
  } catch (error: any) {
    console.error(error);
    throw new Error("Ocurrió un error inesperado al editar el rol.");
  }
}

export async function listarRoles() {
  try {
    const roles = await prisma.rol.findMany();
    return roles;
  } catch (error: any) {
    console.error(error);
    throw new Error("Ocurrió un error inesperado al editar el rol.");
  }
}

export async function listarPermisos() {
  try {
    const permisos = await prisma.permission.findMany();
    return permisos;
  } catch (error: any) {
    console.error(error);
    throw new Error("Ocurrió un error inesperado al editar el rol.");
  }
}
