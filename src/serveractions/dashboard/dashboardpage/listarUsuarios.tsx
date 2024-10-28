"use server";
import { prisma } from "@/prisma";

export async function listarUsuarios() {
  try {
    const persons = await prisma.person.findMany({
      orderBy: {
        createdAt: "desc",
      },
      take: 10,
    });
    return persons;
  } catch (error) {
    throw new Error("Error al listar los datos");
  }
}
