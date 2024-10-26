"use server";
import { prisma } from "@/prisma";

export async function getDentistas() {
  try {
    const dentistas = await prisma.person.findMany({
      where: {
        rol: {
          roleName: "Dentista",
        },
      },
    });
    return dentistas;
  } catch (error) {
    throw new Error("Error al listar los dentistas");
  }
}
