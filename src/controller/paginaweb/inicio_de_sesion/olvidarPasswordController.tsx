"use server";
import { userStatus } from "@/enums/userStatus";
import { sendEmail } from "@/utils/mailer";
import { generatePassword } from "@/utils/password_generator";
import { hashPassword } from "@/utils/password_hasher";
import { prisma } from "@/config/prisma";
import { getPasswordExpiration } from "@/utils/generate_password_expiration";
import {
  auditEventAction,
  auditEventOutcome,
  auditEventTypes,
  modulos,
} from "@/enums/auditEventTypes";
import { logEvent } from "@/utils/logger";
import { verifyCaptchaToken } from "@/utils/captcha";

export async function forgetPassword(token: string | null, formData: FormData) {
  if (!token) {
    return {
      success: false,
      error: "Token no encontrado",
    };
  }
  const captchaData = await verifyCaptchaToken(token);
  console.log(token);
  if (!captchaData) {
    return {
      success: false,
      error: "Error al verificar el captcha",
    };
  }
  if (!captchaData.success || captchaData.score < 0.5) {
    return {
      success: false,
      error: "Captcha Fallido",
    };
  }
  const data = {
    username: formData.get("username")?.toString() || "",
    email: formData.get("email")?.toString() || "",
  };

  const person = await prisma.patient.findFirst({
    where: {
      user: {
        username: data.username,
      },
      email: data.email,
    },
    include: {
      user: true,
    },
  });

  if (!person || person.user.status === userStatus.ELIMINADO) {
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
  await prisma.user.update({
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
    personRole: "Paciente",
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
  
      - **Nombre de usuario**: ${person.user.username}
      - **Contraseña**: ${newPassword}
  
      Por favor, guarda esta información en un lugar seguro.
      
      Despues de tu primer inicio de sesión se te pedirá que cambies tu contraseña

      ¡Gracias por unirte a Ortiz Nosiglia!
    `,
  });
  return { success: true };
}
