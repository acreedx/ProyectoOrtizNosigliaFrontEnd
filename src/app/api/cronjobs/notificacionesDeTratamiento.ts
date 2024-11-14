import { prisma } from "@/config/prisma";
import { personFullNameFormater } from "@/utils/format_person_full_name";
import { sendEmail } from "@/utils/mailer";
import cron from "node-cron";
import { NextApiRequest, NextApiResponse } from "next";

const DAYS_BEFORE_NOTIFICATION = 2;

cron.schedule("* * * * *", async () => {
  await scheduleCarePlanReminders();
  console.log("Cron de notificaciones de tratamiento ejecutado a las 8:00 AM");
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    await scheduleCarePlanReminders();
    res.status(200).json({ message: "Notificaciones enviadas con éxito" });
  } catch (error) {
    res.status(500).json({ error: "Error enviando notificaciones" });
  }
}

async function scheduleCarePlanReminders() {
  const today = new Date();
  const carePlans = await prisma.carePlan.findMany({
    where: { status: "Pendiente" },
    include: { subject: true },
  });

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
      const daysUntilNextAppointment =
        (nextAppointmentDate.getTime() - today.getTime()) /
        (1000 * 60 * 60 * 24);

      if (
        daysUntilNextAppointment <= DAYS_BEFORE_NOTIFICATION &&
        daysUntilNextAppointment >= 0
      ) {
        await sendEmail({
          email: carePlan.subject.email,
          subject: "Recordatorio de tratamiento",
          message: `Hola ${personFullNameFormater(
            carePlan.subject,
          )}, deberías programar tu próxima cita para el ${nextAppointmentDate.toLocaleDateString()}, para continuar con tu tratamiento de ${carePlan.title}`,
        });
      }
    }
  }
}
