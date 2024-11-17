import { prisma } from "@/config/prisma";
import { personFullNameFormater } from "@/utils/format_person_full_name";
import { sendEmail } from "@/utils/mailer";
import { NextResponse } from "next/server";
import { carePlanStatus } from "@/enums/carePlanStatus";
import cron from "node-cron";
import { AppointmentStatus } from "@/enums/appointmentsStatus";
import { userStatus } from "@/enums/userStatus";
const DAYS_BEFORE_NOTIFICATION = 2;

cron.schedule("*/5 * * * *", async () => {
  const citas = await prisma.appointment.findMany({
    where: {
      status: AppointmentStatus.STATUS_CONFIRMADA,
      subject: {
        status: {
          not: userStatus.ELIMINADO,
        },
      },
    },
    include: {
      subject: true,
    },
  });
  citas.forEach(async (e) => {
    await sendEmail({
      email: e.subject.email,
      subject: "⏰ ¡Recordatorio de tu cita! 🦷",
      message: `
          Hola ${personFullNameFormater(e.subject)}, 👋
      
          Queremos recordarte que tienes una cita confirmada para el día de mañana ** ${e.reason} **.
      
          📅 **Fecha inicio para la cita**: ${e.start}
          📅 **Fecha fin para la cita**: ${e.end}          
      
          No olvides pasar por aqui, tu salud dental es muy importante para nosotros. Si tienes alguna duda o necesitas más información, ¡no dudes en contactarnos!
      
          ¡Nos vemos pronto! 💙
      
          Saludos cordiales,  
          El equipo de Ortiz Nosiglia
        `,
    });
  });
});
export async function POST(req: Request) {
  try {
    return NextResponse.json({ data: "Success", status: 200 });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
