"use server";
import { prisma } from "@/config/prisma";
import { Organization } from "@prisma/client";

export async function editarOrganizacion(organization: Organization) {
  try {
    await prisma.organization.update({
      where: {
        id: organization.id,
      },
      data: organization,
    });
    return { message: "Éxito al actualizar los datos" };
  } catch (error) {
    throw new Error("Error al listar los datos");
  }
}
