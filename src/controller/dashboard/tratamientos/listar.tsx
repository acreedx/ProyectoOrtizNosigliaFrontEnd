"use server";
import { prisma } from "@/config/prisma";

export async function listarTratamientos() {
  try {
    const tratamientos = await prisma.carePlan.findMany({
      include: {
        subject: true,
        imagingStudies: true,
      },
    });
    return tratamientos;
  } catch (error) {
    throw new Error("Error al listar los datos");
  }
}
