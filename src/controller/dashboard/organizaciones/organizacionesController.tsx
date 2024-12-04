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
import { Organization } from "@prisma/client";
import { getServerSession } from "next-auth";

export async function listarOrganizaciones() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      throw new Error("No se ha encontrado la sesión.");
    }
    const organizaciones = await prisma.organization.findMany();
    await logEvent({
      type: auditEventTypes.SYSTEM,
      action: auditEventAction.ACCION_LEER,
      moduleName: modulos.MODULO_USUARIOS,
      personName: personFullNameFormater(session.user),
      personRole: "Usuario",
      detail: "Listado de Organizaciones",
      personId: session.user.id,
      outcome: auditEventOutcome.OUTCOME_EXITO,
    });
    return organizaciones;
  } catch (error) {
    throw new Error("Error al listar los datos");
  }
}

export async function crearOrganizacion(organization: Organization) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      throw new Error("No se ha encontrado la sesión.");
    }
    await prisma.organization.create({
      data: organization,
    });
    await logEvent({
      type: auditEventTypes.SYSTEM,
      action: auditEventAction.ACCION_CREAR,
      moduleName: modulos.MODULO_USUARIOS,
      personName: personFullNameFormater(session.user),
      personRole: "Usuario",
      detail: "Creación de organización",
      personId: session.user.id,
      outcome: auditEventOutcome.OUTCOME_EXITO,
    });
    return { message: "Éxito al crear los datos" };
  } catch (error) {
    console.log(error);
    throw new Error("Error al crear los datos");
  }
}

export async function editarOrganizacion(
  id: string,
  organization: Organization,
) {
  try {
    await prisma.organization.update({
      where: {
        id: id,
      },
      data: organization,
    });
    return { message: "Éxito al actualizar los datos" };
  } catch (error) {
    throw new Error("Error al actualizar los datos");
  }
}

export async function eliminarOrganizacion(id: string) {
  try {
    await prisma.organization.update({
      where: {
        id: id,
      },
      data: {
        active: false,
      },
    });
    return { message: "Éxito al deshabilitar los datos" };
  } catch (error) {
    throw new Error("Error al deshabilitar los datos");
  }
}

export async function rehabilitarOrganizacion(id: string) {
  try {
    await prisma.organization.update({
      where: {
        id: id,
      },
      data: {
        active: true,
      },
    });
    return { message: "Éxito al actualizar los datos" };
  } catch (error) {
    throw new Error("Error al actualizar los datos");
  }
}
