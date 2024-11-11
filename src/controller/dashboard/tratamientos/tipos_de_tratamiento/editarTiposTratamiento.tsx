"use server";
import { prisma } from "@/config/prisma";
import { Treatments } from "@prisma/client";

export async function editarTipoTratamiento(id: string, treatment: Treatments) {
  try {
    await prisma.treatments.update({
      where: {
        id: id,
      },
      data: treatment,
    });
    return { message: "Éxito al editar los datos" };
  } catch (error) {
    console.log(error);
    throw new Error("Error al editar los datos");
  }
}
