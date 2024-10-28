"use server";
import { prisma } from "@/prisma";
import { revalidatePath } from "next/cache";

export async function eliminarOrganizacion(id: string) {
  try {
    await prisma.organization.update({
      where: {
        id: id,
      },
      data: {
        active: false,
      },
    });
    return { message: "Éxito al actualizar los datos" };
  } catch (error) {
    throw new Error("Error al listar los datos");
  }
}
