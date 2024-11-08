"use server";
import { prisma } from "@/prisma";

export async function listarRadiografias(id_careplan: string) {
  try {
    const radiografias = await prisma.imagingStudy.findMany({
      where: {
        carePlanId: id_careplan,
      },
    });
    console.log(radiografias);
    return radiografias;
  } catch (error) {
    console.log(error);
    throw new Error("Error al registrar los datos");
  }
}
