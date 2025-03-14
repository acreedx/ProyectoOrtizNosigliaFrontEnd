"use server";
import { authOptions } from "@/config/authOptions";
import { prisma } from "@/config/prisma";
import { costoCita } from "@/config/system_options";
import { AccountStatus } from "@/enums/accountStatus";
import {
  AppointmentSpecialty,
  AppointmentStatus,
} from "@/enums/appointmentsStatus";
import {
  auditEventAction,
  auditEventOutcome,
  auditEventTypes,
  modulos,
} from "@/enums/auditEventTypes";
import { appointmentDentistValidation } from "@/models/dashboard/appointmentValidation";
import { personFullNameFormater } from "@/utils/format_person_full_name";
import { logEvent } from "@/utils/logger";
import { Appointment } from "@prisma/client";
import { getServerSession } from "next-auth";

export async function listarCitas() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      throw new Error("No se ha encontrado la sesión.");
    }
    const appointments = await prisma.appointment.findMany();
    await logEvent({
      type: auditEventTypes.SYSTEM,
      action: auditEventAction.ACCION_LEER,
      moduleName: modulos.MODULO_CITAS,
      personName: personFullNameFormater(session.user),
      personRole: "Usuario",
      detail: "Listado de citas completo",
      personId: session.user.id,
      outcome: auditEventOutcome.OUTCOME_EXITO,
    });
    return appointments;
  } catch (error) {
    throw new Error("Error al listar las citas");
  }
}

export async function listarCitasPorDentista() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      throw new Error("No se ha encontrado la sesión.");
    }
    const appointments = await prisma.appointment.findMany({
      where: {
        practitionerId: session.user.id,
      },
      include: {
        subject: true,
      },
    });
    await logEvent({
      type: auditEventTypes.SYSTEM,
      action: auditEventAction.ACCION_LEER,
      moduleName: modulos.MODULO_CITAS,
      personName: personFullNameFormater(session.user),
      personRole: "Usuario",
      detail: "Listado de citas por dentista",
      personId: session.user.id,
      outcome: auditEventOutcome.OUTCOME_EXITO,
    });
    return appointments;
  } catch (error) {
    throw new Error("Error al listar las citas");
  }
}

export async function listarCitasPorPaciente(idPaciente: string) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      throw new Error("No se ha encontrado la sesión.");
    }
    const appointments = await prisma.appointment.findMany({
      where: {
        subjectId: idPaciente,
      },
      include: {
        practitioner: true,
      },
    });
    await logEvent({
      type: auditEventTypes.SYSTEM,
      action: auditEventAction.ACCION_LEER,
      moduleName: modulos.MODULO_CITAS,
      personName: personFullNameFormater(session.user),
      personRole: "Usuario",
      detail: "Listado de citas por paciente",
      personId: session.user.id,
      outcome: auditEventOutcome.OUTCOME_EXITO,
    });
    return appointments;
  } catch (error) {
    throw new Error("Error al listar las citas");
  }
}

export async function crearCitaDentista(formData: FormData) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      throw new Error("No se ha encontrado la sesión.");
    }
    const data = {
      descripcion: formData.get("descripcion")?.toString() || "",
      fecha: formData.get("fecha")?.toString() || "",
      hora: formData.get("hora")?.toString() || "",
      paciente: formData.get("paciente")?.toString() || "",
    };
    const result = appointmentDentistValidation.safeParse(data);
    if (!result.success) {
      return {
        success: false,
        errors: result.error.format(),
      };
    }
    const { fecha, hora, paciente } = result.data;
    const start = new Date(`${fecha}T${hora}`);
    const end = new Date(start.getTime() + 30 * 60 * 1000);
    const citaExistente = await prisma.appointment.findFirst({
      where: {
        practitionerId: session.user.id,
        AND: [
          {
            OR: [
              { start: { lte: start }, end: { gt: start } },
              { start: { lt: end }, end: { gte: end } },
              { start: { gte: start }, end: { lte: end } },
            ],
          },
        ],
      },
    });
    if (citaExistente) {
      return {
        success: false,
        error:
          "Seleccione otro horario para la cita, ya hay una reservada en esa fecha y hora.",
      };
    }
    const citaExistentePaciente = await prisma.appointment.findFirst({
      where: {
        subjectId: paciente,
        AND: [
          {
            OR: [
              { start: { lte: start }, end: { gt: start } },
              { start: { lt: end }, end: { gte: end } },
              { start: { gte: start }, end: { lte: end } },
            ],
          },
        ],
      },
    });

    if (citaExistentePaciente) {
      return {
        success: false,
        error:
          "Seleccione otro horario para la cita, ya tiene una reservada en esa fecha y hora.",
      };
    }
    await prisma.appointment.create({
      data: {
        start: start,
        end: end,
        specialty: AppointmentSpecialty.ESPECIALIDAD_CONTINUA,
        reason: result.data.descripcion,
        subjectId: paciente,
        practitionerId: session.user.id,
        status: AppointmentStatus.STATUS_PENDIENTE,
      },
    });
    await logEvent({
      type: auditEventTypes.SYSTEM,
      action: auditEventAction.ACCION_CREAR,
      moduleName: modulos.MODULO_CITAS,
      personName: personFullNameFormater(session.user),
      personRole: "Usuario",
      detail: "Creación de citas",
      personId: session.user.id,
      outcome: auditEventOutcome.OUTCOME_EXITO,
    });
    return {
      success: true,
      message: "Cita registrada con éxito",
    };
  } catch (error: any) {
    throw new Error("Error al crear la cita");
  }
}

export async function editarCita(id: string, appointment: Appointment) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      throw new Error("No se ha encontrado la sesión.");
    }
    await prisma.appointment.update({
      where: {
        id: id,
      },
      data: appointment,
    });
    await logEvent({
      type: auditEventTypes.SYSTEM,
      action: auditEventAction.ACCION_EDITAR,
      moduleName: modulos.MODULO_CITAS,
      personName: personFullNameFormater(session.user),
      personRole: "Usuario",
      detail: "Edición de citas",
      personId: session.user.id,
      outcome: auditEventOutcome.OUTCOME_EXITO,
    });
    return { message: "Éxito al actualizar la cita" };
  } catch (error) {
    throw new Error("Error al actualizar la cita");
  }
}

export async function deshabilitarCita(id: string) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      throw new Error("No se ha encontrado la sesión.");
    }
    await prisma.appointment.update({
      where: {
        id: id,
      },
      data: {
        status: AppointmentStatus.STATUS_CANCELADA,
      },
    });
    await logEvent({
      type: auditEventTypes.SYSTEM,
      action: auditEventAction.ACCION_EDITAR,
      moduleName: modulos.MODULO_CITAS,
      personName: personFullNameFormater(session.user),
      personRole: "Usuario",
      detail: "Deshabilitación de citas",
      personId: session.user.id,
      outcome: auditEventOutcome.OUTCOME_EXITO,
    });
    return { message: "Éxito al deshabilitar la cita" };
  } catch (error) {
    throw new Error("Error al deshabilitar la cita");
  }
}

export async function rehabilitarCita(id: string) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      throw new Error("No se ha encontrado la sesión.");
    }
    await prisma.appointment.update({
      where: {
        id: id,
      },
      data: {
        status: AppointmentStatus.STATUS_PENDIENTE,
      },
    });
    await logEvent({
      type: auditEventTypes.SYSTEM,
      action: auditEventAction.ACCION_EDITAR,
      moduleName: modulos.MODULO_CITAS,
      personName: personFullNameFormater(session.user),
      personRole: "Usuario",
      detail: "Rehabilitación de citas",
      personId: session.user.id,
      outcome: auditEventOutcome.OUTCOME_EXITO,
    });
    return { message: "Éxito al habilitar la cita" };
  } catch (error) {
    throw new Error("Error al habilitar la cita");
  }
}

export async function confirmarCita(id: string) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      throw new Error("No se ha encontrado la sesión.");
    }
    await prisma.appointment.update({
      where: {
        id: id,
      },
      data: {
        status: AppointmentStatus.STATUS_CONFIRMADA,
      },
    });
    await logEvent({
      type: auditEventTypes.SYSTEM,
      action: auditEventAction.ACCION_EDITAR,
      moduleName: modulos.MODULO_CITAS,
      personName: personFullNameFormater(session.user),
      personRole: "Usuario",
      detail: "Confirmación de citas",
      personId: session.user.id,
      outcome: auditEventOutcome.OUTCOME_EXITO,
    });
    return { message: "Éxito al confirmar la cita" };
  } catch (error) {
    throw new Error("Error al habilitar la cita");
  }
}
export async function cancelarCita(id: string) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      throw new Error("No se ha encontrado la sesión.");
    }
    await prisma.appointment.update({
      where: {
        id: id,
      },
      data: {
        status: AppointmentStatus.STATUS_CANCELADA,
      },
    });
    await logEvent({
      type: auditEventTypes.SYSTEM,
      action: auditEventAction.ACCION_EDITAR,
      moduleName: modulos.MODULO_CITAS,
      personName: personFullNameFormater(session.user),
      personRole: "Usuario",
      detail: "Cancelación de citas",
      personId: session.user.id,
      outcome: auditEventOutcome.OUTCOME_EXITO,
    });
    return { message: "Éxito al cancelar la cita" };
  } catch (error) {
    throw new Error("Error al habilitar la cita");
  }
}

export async function completarCita(id: string, formData: FormData) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      throw new Error("No se ha encontrado la sesión.");
    }
    const diagnostico = formData.get("diagnostico")?.toString() || "";
    const updatedAppointment = await prisma.appointment.update({
      where: {
        id: id,
      },
      data: {
        status: AppointmentStatus.STATUS_COMPLETADA,
      },
    });
    await prisma.encounter.create({
      data: {
        type: updatedAppointment.specialty,
        start: updatedAppointment.start,
        end: updatedAppointment.end,
        reason: updatedAppointment.reason,
        diagnosis: diagnostico,
        subjectId: updatedAppointment.subjectId,
        practitionerId: updatedAppointment.practitionerId,
        appointmentId: updatedAppointment.id,
      },
    });
    await prisma.patient.update({
      where: {
        id: updatedAppointment.subjectId,
      },
      data: {
        account: {
          update: {
            data: {
              balance: {
                increment: costoCita,
              },
              billingStatus: AccountStatus.CON_DEUDA,
            },
          },
        },
      },
    });
    await logEvent({
      type: auditEventTypes.SYSTEM,
      action: auditEventAction.ACCION_EDITAR,
      moduleName: modulos.MODULO_CITAS,
      personName: personFullNameFormater(session.user),
      personRole: "Usuario",
      detail: "Completación de citas",
      personId: session.user.id,
      outcome: auditEventOutcome.OUTCOME_EXITO,
    });
    return { message: "Éxito al completar la cita" };
  } catch (error) {
    throw new Error("Error al habilitar la cita");
  }
}
