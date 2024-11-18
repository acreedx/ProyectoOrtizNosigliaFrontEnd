import { prisma } from "@/config/prisma";
import { personFullNameFormater } from "@/utils/format_person_full_name";
import { sendEmail } from "@/utils/mailer";
import { NextResponse } from "next/server";
import { AppointmentStatus } from "@/enums/appointmentsStatus";
import { userStatus } from "@/enums/userStatus";
import { birthDateFormater } from "@/utils/birth_date_formater";
import { timeFormatter } from "@/utils/time_formater";
const DAYS_BEFORE_NOTIFICATION = 1;
const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + DAYS_BEFORE_NOTIFICATION);
export async function GET(req: Request) {
  try {
    const citas = await prisma.appointment.findMany({
      where: {
        status: AppointmentStatus.STATUS_CONFIRMADA,
        subject: {
          status: {
            not: userStatus.ELIMINADO,
          },
          rol: {
            roleName: "Paciente",
          },
        },
        start: {
          gte: tomorrow,
          lt: new Date(tomorrow.getTime() + 86400000),
        },
      },
      include: {
        subject: true,
        practitioner: true,
      },
    });
    citas.forEach(async (e) => {
      await sendEmail({
        email: e.subject.email,
        subject: "⏰ ¡Recordatorio de tu cita! 🦷",
        message: `
          Hola ${personFullNameFormater(e.subject)}, 👋
      
          Queremos recordarte que tienes una cita confirmada para el día de mañana.

          Motivo: ${e.reason}
          Doctor: ${personFullNameFormater(e.practitioner)}
          Dirección: Calle 15 de Calacoto, DiagnoSur piso 1, consultorio 108, La Paz, Bolivia

          📅 **Fecha**: ${birthDateFormater(e.start)}
          ⏰ **Hora**: ${timeFormatter(e.start)}      
      
          No olvides pasar por aqui, tu salud dental es muy importante para nosotros. Si tienes alguna duda o necesitas más información, ¡no dudes en contactarnos!

          ¡Nos vemos pronto! 💙
      
          Saludos cordiales,  
          El equipo de Ortiz Nosiglia
        `,
      });
    });
    return new Response(`Envio de notificaciones exitoso`);
  } catch (error: any) {
    console.log(error);
    return new Response(`Error al enviar las notificaciones`);
  }
}
