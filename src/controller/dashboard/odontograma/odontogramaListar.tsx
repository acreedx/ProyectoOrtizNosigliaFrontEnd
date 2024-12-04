"use server";

import { authOptions } from "@/config/authOptions";
import { prisma } from "@/config/prisma";
import {
  auditEventTypes,
  auditEventAction,
  modulos,
  auditEventOutcome,
} from "@/enums/auditEventTypes";
import { personFullNameFormater } from "@/utils/format_person_full_name";
import { logEvent } from "@/utils/logger";
import { getServerSession } from "next-auth";

export async function obtenerOdontograma(pacienteId: string) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      throw new Error("No se ha encontrado la sesión.");
    }
    const odontograma = await prisma.odontogramRows.findMany({
      where: {
        patientId: pacienteId,
      },
    });
    await logEvent({
      type: auditEventTypes.SYSTEM,
      action: auditEventAction.ACCION_LEER,
      moduleName: modulos.MODULO_PACIENTES,
      personName: personFullNameFormater(session.user),
      personRole: "Usuario",
      detail: "Listar Odontograma de paciente",
      personId: session.user.id,
      outcome: auditEventOutcome.OUTCOME_EXITO,
    });
    return odontograma;
  } catch (error) {
    console.error("Error al obtener el odontograma:", error);
    throw new Error("No se pudo obtener el odontograma.");
  }
}

export async function editarOdontograma(pacienteId: string) {
  try {
    const odontograma = await prisma.odontogramRows.findMany({
      where: {
        patientId: pacienteId,
      },
    });
    return odontograma;
  } catch (error) {
    console.error("Error al obtener el odontograma:", error);
    throw new Error("No se pudo obtener el odontograma.");
  }
}
