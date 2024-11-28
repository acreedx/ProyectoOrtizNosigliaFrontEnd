"use server";
import AppointmentStats from "@/app/dashboard/components/Dashboard/AppointmentStats";
import { prisma } from "@/config/prisma";
import { AppointmentStatus } from "@/enums/appointmentsStatus";
import { Appointment } from "@prisma/client";

export async function listarCitas() {
  try {
    const appointments = await prisma.appointment.findMany();
    return appointments;
  } catch (error) {
    throw new Error("Error al listar las citas");
  }
}

export async function listarCitasPorDentista(idDentista: string) {
  try {
    const appointments = await prisma.appointment.findMany({
      where: {
        practitionerId: idDentista,
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

export async function crearCita(appointment: Appointment) {
  try {
    await prisma.appointment.create({
      data: appointment,
    });
    return { message: "Éxito al crear la cita" };
  } catch (error) {
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
