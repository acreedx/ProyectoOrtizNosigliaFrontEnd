"use server";
import { prisma } from "@/prisma";

export async function habilitarTipoTratamiento(id: string) {
  try {
    await prisma.treatments.update({
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

export async function deshabilitarTipoTratamiento(id: string) {
  try {
    await prisma.treatments.update({
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
