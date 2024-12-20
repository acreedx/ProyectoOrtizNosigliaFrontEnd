"use server";
import { authOptions } from "@/config/authOptions";
import { prisma } from "@/config/prisma";
import {
  AppointmentSpecialty,
  AppointmentStatus,
} from "@/enums/appointmentsStatus";
import { appointmentValidation } from "@/models/paginaweb/appointmentValidation";
import { Appointment, Person } from "@prisma/client";
import { getServerSession } from "next-auth";

export async function crearCita(formData: FormData) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      throw new Error("No se ha encontrado la sesión.");
    }
    const data = {
      descripcion: formData.get("descripcion")?.toString() || "",
      fecha: formData.get("fecha")?.toString() || "",
      hora: formData.get("hora")?.toString() || "",
      doctor: formData.get("doctor")?.toString() || "",
    };
    const result = appointmentValidation.safeParse(data);
    if (!result.success) {
      return {
        success: false,
        errors: result.error.format(),
      };
    }
    const { fecha, hora, doctor } = result.data;
    const start = new Date(`${fecha}T${hora}`);
    const end = new Date(start.getTime() + 30 * 60 * 1000);
    const citaExistente = await prisma.appointment.findFirst({
      where: {
        practitionerId: doctor,
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
        subjectId: session.user.id,
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
        subjectId: session.user.id,
        practitionerId: doctor,
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
export async function listarCitasPorPaciente(): Promise<Appointment[]> {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      throw new Error("No se ha encontrado la sesión.");
    }
    const citas = await prisma.appointment.findMany({
      where: {
        subjectId: session.user.id,
      },
      include: {
        practitioner: true,
      },
    });
    return citas;
  } catch (error: any) {
    console.log(error);
    throw new Error("Error al crear la cita");
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
