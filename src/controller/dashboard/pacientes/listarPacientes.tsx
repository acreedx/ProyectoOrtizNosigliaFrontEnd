"use server";
import { prisma } from "@/config/prisma";

export async function listarPacientes() {
  try {
    const pacientes = await prisma.person.findMany({
      where: {
        rol: {
          roleName: "Paciente",
        },
      },
    });
    return pacientes;
  } catch (error) {
    throw new Error("Error al listar los datos");
  }
}
