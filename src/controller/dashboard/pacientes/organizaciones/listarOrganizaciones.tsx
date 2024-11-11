"use server";
import { prisma } from "@/config/prisma";

export async function listarOrganizaciones() {
  try {
    const organizaciones = await prisma.organization.findMany();
    return organizaciones;
  } catch (error) {
    throw new Error("Error al listar los datos");
  }
}
