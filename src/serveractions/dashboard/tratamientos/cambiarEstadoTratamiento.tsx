"use server";
import { carePlanStatus } from "@/enums/carePlanStatus";
import { prisma } from "@/prisma";

export async function habilitarTratamiento(id: string) {
  try {
    await prisma.carePlan.update({
      where: {
        id: id,
      },
      data: {
        status: carePlanStatus.ENCURSO,
      },
    });
    return { message: "Éxito al actualizar los datos" };
  } catch (error) {
    console.log(error);
    throw new Error("Error al actualizar los datos");
  }
}

export async function deshabilitarTratamiento(id: string) {
  try {
    await prisma.carePlan.update({
      where: {
        id: id,
      },
      data: {
        status: carePlanStatus.CANCELADO,
      },
    });
    return { message: "Éxito al actualizar los datos" };
  } catch (error) {
    console.log(error);
    throw new Error("Error al actualizar los datos");
  }
}

export async function completarTratamiento(id: string) {
  try {
    const appointment = await prisma.carePlan.findUnique({
      where: {
        id: id,
      },
    });
    await prisma.carePlan.update({
      where: {
        id: id,
      },
      data: {
        status: carePlanStatus.COMPLETADO,
        endDate: new Date(),
        totalAppointments: appointment?.estimatedAppointments,
      },
    });
    return { message: "Éxito al actualizar los datos" };
  } catch (error) {
    console.log(error);
    throw new Error("Error al actualizar los datos");
  }
}
