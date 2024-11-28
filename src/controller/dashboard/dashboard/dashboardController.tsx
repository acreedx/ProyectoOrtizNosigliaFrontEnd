"use server";
import { prisma } from "@/config/prisma";
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
