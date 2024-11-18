import { NextRequest, NextResponse } from "next/server";
import { AppointmentStatus } from "@/enums/appointmentsStatus";
import { prisma } from "@/config/prisma";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const { descripcion, fecha, hora, doctor, usuarioId } = await req.json();
    if (!descripcion || !fecha || !hora || !doctor || !usuarioId) {
      return NextResponse.json(
        { error: "Faltan datos requeridos." },
        { status: 400 },
      );
    }
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
      return NextResponse.json(
        { error: "Ya hay una cita en ese horario para este doctor." },
        { status: 400 },
      );
    }
    const citaExistentePaciente = await prisma.appointment.findFirst({
      where: {
        subjectId: usuarioId,
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
      return NextResponse.json(
        { error: "Ya tienes una cita reservada en ese horario." },
        { status: 400 },
      );
    }

    await prisma.appointment.create({
      data: {
        start: start,
        end: end,
        specialty: "ESPECIALIDAD_CONTINUA",
        reason: descripcion,
        subjectId: usuarioId,
        practitionerId: doctor,
        status: AppointmentStatus.STATUS_PENDIENTE,
      },
    });

    // Responder con éxito
    return NextResponse.json({ message: "Cita creada con éxito." });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json(
      { error: "Error al crear la cita." },
      { status: 500 },
    );
  }
}
