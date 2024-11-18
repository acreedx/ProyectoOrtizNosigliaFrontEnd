"use server";
import { prisma } from "@/config/prisma";

export async function listarRadiografias(id_careplan: string) {
  try {
    const radiografias = await prisma.imagingStudy.findMany({
      where: {
        carePlanId: id_careplan,
        active: true,
      },
    });
    return radiografias;
  } catch (error: any) {
    console.log(error);
    throw new Error("Error al registrar los datos");
  }
}
