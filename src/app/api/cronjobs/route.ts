import { prisma } from "@/config/prisma";
import { personFullNameFormater } from "@/utils/format_person_full_name";
import { sendEmail } from "@/utils/mailer";
import { NextResponse } from "next/server";
import { carePlanStatus } from "@/enums/carePlanStatus";
import cron from "node-cron";
const DAYS_BEFORE_NOTIFICATION = 2;

cron.schedule("* * * * *", async () => {
  console.log("######################################");
  console.log("#                                    #");
  console.log("# Running scheduler every minute #");
  console.log("#                                    #");
  console.log("######################################");

  const today = new Date();
  const carePlans = await prisma.carePlan.findMany({
    where: { status: carePlanStatus.ENCURSO },
    include: { subject: true },
  });

  console.log(carePlans);

  for (const carePlan of carePlans) {
    const daysSinceStart = Math.floor(
      (today.getTime() - carePlan.startDate.getTime()) / (1000 * 60 * 60 * 24),
    );

    const theoreticalAppointments = Math.floor(
      daysSinceStart / carePlan.daysBetweenAppointments,
    );

    if (theoreticalAppointments < carePlan.estimatedAppointments) {
      const nextAppointmentDate = new Date(carePlan.startDate);
      nextAppointmentDate.setDate(
        carePlan.startDate.getDate() +
          theoreticalAppointments * carePlan.daysBetweenAppointments,
      );

      if (nextAppointmentDate.getTime() < today.getTime()) {
        nextAppointmentDate.setDate(
          nextAppointmentDate.getDate() + carePlan.daysBetweenAppointments,
        );
      }

      const daysUntilNextAppointment =
        (nextAppointmentDate.getTime() - today.getTime()) /
        (1000 * 60 * 60 * 24);

      console.log("enviar notificacion");
      await sendEmail({
        email: carePlan.subject.email,
        subject: "⏰ ¡Recordatorio de tu tratamiento dental! 🦷",
        message: `
          Hola ${personFullNameFormater(carePlan.subject)}, 👋
      
          Queremos recordarte que **deberías programar tu próxima cita** para continuar con tu tratamiento de **${carePlan.title}**.
      
          📅 **Fecha sugerida para la cita**: ${nextAppointmentDate.toLocaleDateString()}
      
          No dejes pasar más tiempo, tu salud dental es muy importante para nosotros. Si tienes alguna duda o necesitas más información, ¡no dudes en contactarnos!
      
          ¡Nos vemos pronto! 💙
      
          Saludos cordiales,  
          El equipo de Ortiz Nosiglia
        `,
      });
    }
  }
});
export async function POST(req: Request) {
  try {
    return NextResponse.json({ data: "Success", status: 200 });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
}

async function scheduleCarePlanReminders() {}
