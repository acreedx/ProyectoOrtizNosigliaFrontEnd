import { prisma } from "@/config/prisma";
import { NextRequest, NextResponse } from "next/server";

const getBolivianTime = () => {
  const nowUTC = new Date();
  const bolivianOffset = 4 * 60;
  nowUTC.setMinutes(
    nowUTC.getMinutes() - nowUTC.getTimezoneOffset() + bolivianOffset,
  );
  return nowUTC;
};

export const dynamic = "force-dynamic";

export async function GET(
  req: NextRequest,
  { params }: { params: { id_dentista: string } },
) {
  try {
    const { id_dentista } = params;
    const bolivianTime = getBolivianTime();
    const citasActivas = await prisma.appointment.findMany({
      where: {
        practitionerId: id_dentista,
        start: {
          lte: bolivianTime,
        },
        end: {
          gte: bolivianTime,
        },
      },
      include: {
        subject: {
          include: {
            allergies: true,
          },
        },
      },
    });

    if (citasActivas.length > 0) {
      return NextResponse.json({ cita: citasActivas[0] });
    } else {
      return NextResponse.json({
        message: "No hay citas activas en este momento.",
      });
    }
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
