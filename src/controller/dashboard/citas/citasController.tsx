"use server";
import AppointmentStats from "@/app/dashboard/components/Dashboard/AppointmentStats";
import { authOptions } from "@/config/authOptions";
import { prisma } from "@/config/prisma";
import {
  AppointmentSpecialty,
  AppointmentStatus,
} from "@/enums/appointmentsStatus";
import { appointmentDentistValidation } from "@/models/appointmentDentistModel";
import { appointmentValidation } from "@/models/appointmentModel";
import { Appointment } from "@prisma/client";
import { getServerSession } from "next-auth";

export async function listarCitas() {
  try {
    const appointments = await prisma.appointment.findMany();
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
    return appointments;
  } catch (error) {
    throw new Error("Error al listar las citas");
  }
}

export async function listarCitasPorPaciente(idPaciente: string) {
  try {
    const appointments = await prisma.appointment.findMany({
      where: {
        subjectId: idPaciente,
      },
      include: {
        practitioner: true,
      },
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
    return {
      success: true,
      message: "Cita registrada con éxito",
    };
  } catch (error: any) {
    console.log(error);
    throw new Error("Error al crear la cita");
  }
}

export async function editarCita(id: string, appointment: Appointment) {
  try {
    await prisma.appointment.update({
      where: {
        id: id,
      },
      data: appointment,
    });
    return { message: "Éxito al actualizar la cita" };
  } catch (error) {
    throw new Error("Error al actualizar la cita");
  }
}

export async function deshabilitarCita(id: string) {
  try {
    await prisma.appointment.update({
      where: {
        id: id,
      },
      data: {
        status: AppointmentStatus.STATUS_CANCELADA,
      },
    });
    return { message: "Éxito al deshabilitar la cita" };
  } catch (error) {
    throw new Error("Error al deshabilitar la cita");
  }
}

export async function rehabilitarCita(id: string) {
  try {
    await prisma.appointment.update({
      where: {
        id: id,
      },
      data: {
        status: AppointmentStatus.STATUS_PENDIENTE,
      },
    });
    return { message: "Éxito al habilitar la cita" };
  } catch (error) {
    throw new Error("Error al habilitar la cita");
  }
}

export async function confirmarCita(id: string) {
  try {
    await prisma.appointment.update({
      where: {
        id: id,
      },
      data: {
        status: AppointmentStatus.STATUS_CONFIRMADA,
      },
    });
    return { message: "Éxito al confirmar la cita" };
  } catch (error) {
    throw new Error("Error al habilitar la cita");
  }
}
export async function cancelarCita(id: string) {
  try {
    await prisma.appointment.update({
      where: {
        id: id,
      },
      data: {
        status: AppointmentStatus.STATUS_CANCELADA,
      },
    });
    return { message: "Éxito al cancelar la cita" };
  } catch (error) {
    throw new Error("Error al habilitar la cita");
  }
}

export async function completarCita(id: string) {
  try {
    await prisma.appointment.update({
      where: {
        id: id,
      },
      data: {
        status: AppointmentStatus.STATUS_COMPLETADA,
      },
    });
    return { message: "Éxito al completar la cita" };
  } catch (error) {
    throw new Error("Error al habilitar la cita");
  }
}
