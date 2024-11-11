"use server";
import { prisma } from "@/config/prisma";
import { revalidatePath } from "next/cache";

export async function rehabilitarOrganizacion(id: string) {
  try {
    await prisma.organization.update({
      where: {
        id: id,
      },
      data: {
        active: true,
      },
    });
    return { message: "Éxito al actualizar los datos" };
  } catch (error) {
    throw new Error("Error al listar los datos");
  }
}
