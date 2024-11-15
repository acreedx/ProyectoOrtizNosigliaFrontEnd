"use server";
import { userStatus } from "@/enums/userStatus";
import { sendEmail } from "@/utils/mailer";
import { generatePassword } from "@/utils/password_generator";
import { hashPassword } from "@/utils/password_hasher";
import { prisma } from "@/config/prisma";
import { getPasswordExpiration } from "@/utils/get_password_expiration";
import {
  auditEventAction,
  auditEventOutcome,
  auditEventTypes,
  modulos,
} from "@/enums/auditEventTypes";
import { logEvent } from "@/utils/logger";

export async function forgetPassword(formData: FormData) {
  const data = {
    username: formData.get("username")?.toString() || "",
    email: formData.get("email")?.toString() || "",
  };

  const person = await prisma.person.findFirst({
    where: {
      username: data.username,
      email: data.email,
    },
    include: {
      rol: true,
    },
  });

  if (!person || person.status === userStatus.ELIMINADO) {
    return {
      success: false,
      message: "Credenciales Incorrectas.",
    };
  }
  const newPassword = await generatePassword(
    person.firstName,
    person.familyName,
    person.identification,
  );
  await prisma.person.update({
    where: {
      username: data.username,
    },
    data: {
      status: userStatus.NUEVO,
      passwordAttempts: 0,
      passwordExpiration: getPasswordExpiration(),
      password: await hashPassword(newPassword),
    },
  });
  await logEvent({
    type: auditEventTypes.AUTHENTICATION,
    action: auditEventAction.ACCION_RECUPERAR_CONTRASENA,
    personId: person.id,
    personRole: person.rol.roleName,
    personName: person.firstName,
    moduleName: modulos.MODULO_PAGINA_WEB,
    detail: "Solicitud de restablecimiento de contraseña completada.",
    outcome: auditEventOutcome.OUTCOME_EXITO,
  });
  await sendEmail({
    email: person.email,
    subject: "Se Reestablecio su contraseña exitosamente",
    message: `
      ¡Hola ${person.familyName}!
  
      Tus credenciales se han reestablecido exitosamente. Aquí tienes tus credenciales:
  
      - **Nombre de usuario**: ${person.username}
      - **Contraseña**: ${newPassword}
  
      Por favor, guarda esta información en un lugar seguro.
      
      Despues de tu primer inicio de sesión se te pedirá que cambies tu contraseña

      ¡Gracias por unirte a Ortiz Nosiglia!
    `,
  });
  return { success: true };
}
