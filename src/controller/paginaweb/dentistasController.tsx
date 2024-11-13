"use server";
import { prisma } from "@/config/prisma";

export async function getDentistas() {
  try {
    const dentistas = await prisma.person.findMany({
      where: {
        rol: {
          roleName: "Dentista",
        },
      },
      include: {
        qualifications: true,
      },
    });
    console.log(dentistas);
    return dentistas;
  } catch (error) {
    throw new Error("Error al listar los dentistas");
  }
}
