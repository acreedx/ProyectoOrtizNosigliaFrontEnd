"use server";
import { prisma } from "@/prisma";
import { Treatments } from "@prisma/client";

export async function crearTipoTratamiento(treatment: Treatments) {
  try {
    treatment.active = true;
    await prisma.treatments.create({
      data: treatment,
    });
    return { message: "Éxito al registrar los datos" };
  } catch (error) {
    throw new Error("Error al registrar los datos");
  }
}
