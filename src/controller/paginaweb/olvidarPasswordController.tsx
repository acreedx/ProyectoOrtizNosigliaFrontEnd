"use server";
import { PrismaClient } from "@prisma/client";
import { hashPassword } from "../../utils/password_hasher";
import { sendEmail } from "../../utils/mailer";
import { generatePassword } from "../../utils/password_generator";
import { userStatus } from "@/enums/userStatus";

export async function forgetPassword(formData: FormData) {
  const prisma = new PrismaClient();
  const data = {
    username: formData.get("username")?.toString() || "",
    email: formData.get("email")?.toString() || "",
  };
  const person = await prisma.person.findFirst({
    where: {
      username: data.username,
      email: data.email,
    },
  });
  if (!person) {
    return {
      success: false,
      message: "No se encontró un usuario con esas credenciales",
    };
  }

  const newPassword = await generatePassword(
    person.firstName,
    person.familyName,
    person.identification,
  );
  const updatedPerson = await prisma.person.update({
    where: {
      username: data.username,
    },
    data: {
      status: userStatus.ACTIVO,
      password: await hashPassword(newPassword),
    },
  });
  await sendEmail({
    email: person.email,
    subject: "Se Reestablecio su contraseña exitosamente",
    message: `
      ¡Hola ${person.familyName}!
  
      Tus credenciales se han reestablecido exitosamente. Aquí tienes tus credenciales:
  
      - **Nombre de usuario**: ${updatedPerson.username}
      - **Contraseña**: ${newPassword}
  
      Por favor, guarda esta información en un lugar seguro.
      
      Despues de tu primer inicio de sesión se te pedirá que cambies tu contraseña

      ¡Gracias por unirte a Ortiz Nosiglia!
    `,
  });
  return { success: true };
}
