"use server";
import { prisma } from "@/config/prisma";

export async function listarLogs() {
  try {
    const logs = await prisma.auditEvent.findMany();
    return logs;
  } catch (error) {
    throw new Error("Error al listar los datos");
  }
}
