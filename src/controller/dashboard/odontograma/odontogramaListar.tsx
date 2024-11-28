"use server";

import { prisma } from "@/config/prisma";

export async function obtenerOdontograma(pacienteId: string) {
  try {
    const odontograma = await prisma.odontogramRows.findMany({
      where: {
        patientId: pacienteId,
      },
    });
    return odontograma;
  } catch (error) {
    console.error("Error al obtener el odontograma:", error);
    throw new Error("No se pudo obtener el odontograma.");
  }
}

export async function editarOdontograma(pacienteId: string) {
  try {
    const odontograma = await prisma.odontogramRows.findMany({
      where: {
        patientId: pacienteId,
      },
    });
    return odontograma;
  } catch (error) {
    console.error("Error al obtener el odontograma:", error);
    throw new Error("No se pudo obtener el odontograma.");
  }
}
