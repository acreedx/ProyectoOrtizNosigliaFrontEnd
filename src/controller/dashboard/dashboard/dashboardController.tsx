"use server";
import { authOptions } from "@/config/authOptions";
import { prisma } from "@/config/prisma";
import { AppointmentStatus } from "@/enums/appointmentsStatus";
import {
  auditEventTypes,
  auditEventAction,
  modulos,
  auditEventOutcome,
} from "@/enums/auditEventTypes";
import { personFullNameFormater } from "@/utils/format_person_full_name";
import { logEvent } from "@/utils/logger";
import { getServerSession } from "next-auth";

export async function listarCitasTotales() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      throw new Error("No se ha encontrado la sesión.");
    }
    const [
      appointmentsPendientes,
      appointmentsConfirmed,
      appointmentsCanceled,
      totalAppointments,
    ] = await Promise.all([
      prisma.appointment.count({
        where: { status: AppointmentStatus.STATUS_PENDIENTE },
      }),
      prisma.appointment.count({
        where: { status: AppointmentStatus.STATUS_CONFIRMADA },
      }),
      prisma.appointment.count({
        where: { status: AppointmentStatus.STATUS_CANCELADA },
      }),
      prisma.appointment.count({
        where: { status: AppointmentStatus.STATUS_COMPLETADA },
      }),
    ]);
    await logEvent({
      type: auditEventTypes.SYSTEM,
      action: auditEventAction.ACCION_LEER,
      moduleName: modulos.MODULO_USUARIOS,
      personName: personFullNameFormater(session.user),
      personRole: "Usuario",
      detail: "Listado de estadísticas del dashboard",
      personId: session.user.id,
      outcome: auditEventOutcome.OUTCOME_EXITO,
    });
    return [
      appointmentsPendientes,
      appointmentsConfirmed,
      appointmentsCanceled,
      totalAppointments,
    ];
  } catch (error) {
    throw new Error("Error al listar los datos");
  }
}

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

export async function listarPacientesDashboard() {
  try {
    const patients = await prisma.patient.findMany({
      orderBy: {
        createdAt: "desc",
      },
      take: 10,
    });
    return patients;
  } catch (error) {
    throw new Error("Error al listar los datos");
  }
}
