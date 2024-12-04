"use server";
import { authOptions } from "@/config/authOptions";
import { prisma } from "@/config/prisma";
import {
  auditEventTypes,
  auditEventAction,
  modulos,
  auditEventOutcome,
} from "@/enums/auditEventTypes";
import { userStatus } from "@/enums/userStatus";
import { accountPorDefecto } from "@/utils/default_account";
import { odontogramaPorDefecto } from "@/utils/default_odontograma";
import { personFullNameFormater } from "@/utils/format_person_full_name";
import { getPasswordExpiration } from "@/utils/generate_password_expiration";
import { logEvent } from "@/utils/logger";
import { hashPassword } from "@/utils/password_hasher";
import { Allergy, Contact, OdontogramRows, Person } from "@prisma/client";
import { getServerSession } from "next-auth";

export async function listarOdontrograma(pacienteId: string) {
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
      detail: "Listado de odontograma de paciente",
      personId: session.user.id,
      outcome: auditEventOutcome.OUTCOME_EXITO,
    });
    return odontograma;
  } catch (error) {
    console.log(error);
    throw new Error("Error al listar los datos");
  }
}

export async function editarOdontograma(odontogram: OdontogramRows[]) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      throw new Error("No se ha encontrado la sesión.");
    }
    await prisma.$transaction(
      odontogram.map((row) =>
        prisma.odontogramRows.update({
          where: { id: row.id },
          data: {
            fecha: row.fecha ? new Date(row.fecha) : null,
            diagnostico: row.diagnostico,
            tratamiento: row.tratamiento,
          },
        }),
      ),
    );
    await logEvent({
      type: auditEventTypes.SYSTEM,
      action: auditEventAction.ACCION_EDITAR,
      moduleName: modulos.MODULO_PACIENTES,
      personName: personFullNameFormater(session.user),
      personRole: "Usuario",
      detail: "Editar odontograma de paciente",
      personId: session.user.id,
      outcome: auditEventOutcome.OUTCOME_EXITO,
    });
    return {
      success: true,
      message: "Exito al editar los datos",
    };
  } catch (error) {
    console.log(error);
    throw new Error("Error editar los datos");
  }
}
