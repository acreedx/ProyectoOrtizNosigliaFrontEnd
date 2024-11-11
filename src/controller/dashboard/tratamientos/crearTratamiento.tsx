"use server";
import { carePlanStatus } from "@/enums/carePlanStatus";
import { prisma } from "@/config/prisma";
import { CarePlan } from "@prisma/client";

export async function crearTratamiento(carePlan: CarePlan) {
  try {
    carePlan.status = carePlanStatus.ENCURSO;
    await prisma.carePlan.create({
      data: carePlan,
    });
    return { message: "Éxito al registrar los datos" };
  } catch (error) {
    console.log(error);
    throw new Error("Error al registrar los datos");
  }
}
