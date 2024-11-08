"use server";
import { prisma } from "@/prisma";

export async function listarTiposTratamiento() {
  try {
    const tipos_tratamiento = await prisma.treatments.findMany();
    return tipos_tratamiento;
  } catch (error) {
    throw new Error("Error al listar los datos");
  }
}
export async function listarTiposTratamientoActivos() {
  try {
    const tipos_tratamiento = await prisma.treatments.findMany({
      where: {
        active: true,
      },
    });
    return tipos_tratamiento;
  } catch (error) {
    throw new Error("Error al listar los datos");
  }
}
