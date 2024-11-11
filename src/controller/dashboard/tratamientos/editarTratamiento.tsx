"use server";
import { prisma } from "@/config/prisma";
import { CarePlan } from "@prisma/client";

export async function editarTratamiento(id: string, carePlan: CarePlan) {
  try {
    await prisma.carePlan.update({
      where: {
        id: id,
      },
      data: carePlan,
    });
    return { message: "Éxito al editar los datos" };
  } catch (error) {
    console.log(error);
    throw new Error("Error al editar los datos");
  }
}
