import { prisma } from "@/prisma";
import { Appointment } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id_dentista: string } },
) {
  try {
    const { id_dentista } = params;
    const citas = prisma.appointment.findMany({
      where: {
        practitionerId: id_dentista,
      },
    });
    return NextResponse.json({ citas });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function GET_BY_ID(
  req: NextRequest,
  { params }: { params: { id_cita: string } },
) {
  const { id_cita } = params;
  try {
    const cita = await prisma.appointment.findFirst({
      where: {
        id: id_cita,
      },
    });
    return NextResponse.json({ cita });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { appointment }: { appointment: Appointment } = await req.json();
    console.log(appointment);
    const validarFechaHora = await prisma.appointment.findMany({
      where: {
        start: appointment.start,
        end: appointment.end,
      },
    });
    if (validarFechaHora) {
      return NextResponse.json({
        error: "Ya existe una fecha en ese horario, por favor elija otro",
      });
    }
    await prisma.appointment.create({
      data: appointment,
    });
    return NextResponse.json({ message: "Cita creada con éxito" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
