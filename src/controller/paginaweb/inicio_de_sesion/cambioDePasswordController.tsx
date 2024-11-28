"use server";
import { hashPassword } from "../../../utils/password_hasher";
import bcrypt from "bcryptjs";
import changePasswordValidation from "../../../models/changePasswordValidation";
import { userStatus } from "@/enums/userStatus";
import { prisma } from "@/config/prisma";
import { getPasswordExpiration } from "@/utils/get_password_expiration";
import { logEvent } from "@/utils/logger";
import {
  auditEventAction,
  auditEventOutcome,
  auditEventTypes,
  modulos,
} from "@/enums/auditEventTypes";

export async function changePassword(formData: FormData) {
  const data = {
    username: formData.get("username")?.toString() || "",
    password: formData.get("password")?.toString() || "",
    newpassword: formData.get("newpassword")?.toString() || "",
    confirmnewpassword: formData.get("confirmnewpassword")?.toString() || "",
  };
  const result = changePasswordValidation.safeParse(data);
  if (!result.success) {
    return {
      success: false,
      errors: result.error.format(),
    };
  }
  const person = await prisma.patient.findFirst({
    where: {
      user: {
        username: data.username,
      },
    },
    include: {
      user: true,
    },
  });
  if (!person) {
    return {
      success: false,
      message: "Credenciales Incorrectas",
    };
  }
  if (person.user.status === userStatus.ELIMINADO) {
    return {
      success: false,
      message: "Credenciales Incorrectas",
    };
  }
  const isPasswordValid = await bcrypt.compare(
    data.password,
    person.user.password,
  );
  if (!isPasswordValid) {
    return {
      success: false,
      message: "Credenciales Incorrectas",
    };
  }
  await prisma.user.update({
    where: {
      username: data.username,
    },
    data: {
      status: userStatus.ACTIVO,
      passwordAttempts: 0,
      passwordExpiration: getPasswordExpiration(),
      password: await hashPassword(data.newpassword),
    },
  });
  await logEvent({
    type: auditEventTypes.AUTHENTICATION,
    action: auditEventAction.ACCION_CAMBIAR_CONTRASENA,
    moduleName: modulos.MODULO_PAGINA_WEB,
    personName: person.firstName,
    personRole: "Paciente",
    personId: person.id,
    outcome: auditEventOutcome.OUTCOME_EXITO,
    detail: "Cambio de contraseña exitoso.",
  });
  return { success: true };
}
