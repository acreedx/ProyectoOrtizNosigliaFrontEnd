"use server";
import { prisma } from "@/config/prisma";

export async function listarLogs() {
  try {
    const logs = await prisma.auditEvent.findMany({
      select: {
        occurredDateTime: true,
        personName: true,
        personRole: true,
        severity: true,
        outcome: true,
        detail: true,
      },
    });
    return logs;
  } catch (error) {
    throw new Error("Error al listar los datos");
  }
}
