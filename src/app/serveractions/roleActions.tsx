"use server";

import { Permission, PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const prisma = new PrismaClient();
export async function habilitarRol(id: string) {
  await prisma.rol.update({
    where: {
      id: id,
    },
    data: {
      active: true,
    },
  });
  revalidatePath("/dashboard/pages/roles");
}
export async function deshabilitarRol(id: string) {
  await prisma.rol.update({
    where: {
      id: id,
    },
    data: {
      active: false,
    },
  });
  revalidatePath("/dashboard/pages/roles");
}
export async function updateRol(formData: FormData) {
  const id = formData.get("id") as string;
  const roleName = formData.get("roleName") as string;
  const description = formData.get("description") as string;
  const permissions = formData.getAll("permissions") as string[]; // Recoge todos los permisos seleccionados

  if (!id || !roleName || !description || permissions.length === 0) {
    throw new Error("Todos los campos son requeridos.");
  }

  const selectedPermissions = permissions.map((permission, index) => {
    return {
      id: index, // Asigna un ID basado en el índice
      name: permission, // El valor del checkbox (en este caso, "on")
    };
  });
  console.log(selectedPermissions);
  const permissionsDB = await prisma.permission.findMany({});
  let newPermissions: string[] = [];
  let index = 0;
  permissions.forEach((e) => {
    if (e === "on") {
      newPermissions.push(permissionsDB[index].id);
    }
    index++;
  });
  // Actualiza el rol
  await prisma.rol.update({
    where: {
      id: id,
    },
    data: {
      roleName,
      description,
      permissionIDs: newPermissions,
    },
  });

  revalidatePath("/dashboard/pages/roles");
  redirect("/dashboard/pages/roles");
}
