import nodemailer from "nodemailer";
import { z } from "zod";

const emailSchema = z.object({
  email: z.string().email(),
  subject: z.string().min(1),
  message: z.string().min(1),
});

export async function sendEmail(data: {
  email: string;
  subject: string;
  message: string;
}) {
  const parsedData = emailSchema.safeParse(data);
  if (!parsedData.success) {
    throw new Error("Datos de correo inválidos");
  }
  const { email, subject, message } = parsedData.data;
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: subject,
      text: message,
    });
    return { message: "Correo enviado exitosamente" };
  } catch (error) {
    console.error("Error al enviar el correo:", error);
    throw new Error("Error enviando el correo");
  }
}
