"use server";
import { prisma } from "@/prisma";

export async function listarTratamientos() {
  try {
    const tratamientos = await prisma.carePlan.findMany({
      include: {
        subject: true,
      },
    });
    return tratamientos;
  } catch (error) {
    throw new Error("Error al listar los datos");
  }
}
