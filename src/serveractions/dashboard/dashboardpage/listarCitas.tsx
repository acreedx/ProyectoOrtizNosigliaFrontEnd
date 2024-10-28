"use server";
import { prisma } from "@/prisma";
import { AppointmentStatus } from "@/enums/appointmentsStatus";

export async function listarCitasTotales() {
  try {
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
