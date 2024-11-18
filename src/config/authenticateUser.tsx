import {
  auditEventTypes,
  auditEventAction,
  modulos,
  auditEventOutcome,
} from "@/enums/auditEventTypes";
import { userStatus } from "@/enums/userStatus";
import { logEvent } from "@/utils/logger";
import { prisma } from "./prisma";
import bcrypt from "bcryptjs";

export async function authenticateUser(credentials: {
  username: string;
  password: string;
}) {
  const user = await prisma.person.findFirst({
    where: {
      username: credentials.username,
      rol: {
        active: true,
      },
    },
    include: {
      rol: {
        include: {
          permissions: true,
        },
      },
    },
  });

  if (!user || user.status === userStatus.ELIMINADO) {
    throw new Error("Credenciales Incorrectas");
  }

  const isPasswordValid = await bcrypt.compare(
    credentials.password,
    user.password,
  );

  if (!isPasswordValid) {
    if (user.passwordAttempts >= 5) {
      await prisma.person.update({
        where: { id: user.id },
        data: { status: userStatus.BLOQUEADO },
      });
      throw new Error(
        "El usuario esta bloqueado, cambie su contraseña para continuar",
      );
    }

    await prisma.person.update({
      where: { id: user.id },
      data: { passwordAttempts: user.passwordAttempts + 1 },
    });

    await logEvent({
      type: auditEventTypes.AUTHENTICATION,
      action: auditEventAction.ACCION_INICIAR_SESION,
      moduleName: modulos.MODULO_PAGINA_WEB,
      personName: user.firstName,
      personRole: user.rol.roleName,
      detail: "Intento de inicio de sesión fallido",
      personId: user.id,
      outcome: auditEventOutcome.OUTCOME_ERROR,
    });

    throw new Error("Credenciales Incorrectas");
  }

  if (user.status === userStatus.BLOQUEADO) {
    throw new Error(
      "El usuario esta bloqueado, cambie su contraseña para continuar",
    );
  }

  if (user.passwordExpiration < new Date()) {
    throw new Error(
      "Su contraseña a expirado, debe cambiarla para iniciar sesión",
    );
  }

  if (user.status === userStatus.NUEVO) {
    throw new Error("Usuario Nuevo, debe cambiar su contraseña para acceder");
  }

  await logEvent({
    type: auditEventTypes.AUTHENTICATION,
    action: auditEventAction.ACCION_INICIAR_SESION,
    moduleName: modulos.MODULO_PAGINA_WEB,
    personName: user.firstName,
    personRole: user.rol.roleName,
    personId: user.id,
  });

  await prisma.person.update({
    where: { id: user.id },
    data: {
      passwordAttempts: 0,
      lastLogin: new Date(),
    },
  });

  user.password = "_";
  return user;
}
