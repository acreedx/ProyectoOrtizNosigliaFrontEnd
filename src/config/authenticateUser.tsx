import {
  auditEventTypes,
  auditEventAction,
  modulos,
  auditEventOutcome,
} from "@/enums/auditEventTypes";
import { logEvent } from "@/utils/logger";
import { prisma } from "./prisma";
import bcrypt from "bcryptjs";
import { Patient, Permission, Person, Rol, User } from "@prisma/client";
import { personFullNameFormater } from "@/utils/format_person_full_name";
import { userStatus } from "@/enums/userStatus";

export async function authenticateUser(credentials: {
  username: string;
  password: string;
}): Promise<
  | (Person & {
      rol: Rol & {
        permissions: Permission[];
      };
    })
  | Patient
> {
  const user = await prisma.user.findFirst({
    where: {
      username: credentials.username,
    },
    include: {
      patient: true,
      person: {
        include: {
          rol: {
            include: {
              permissions: true,
            },
          },
        },
      },
    },
  });

  if (!user) {
    throw new Error("Credenciales Incorrectas");
  }

  const isPasswordValid = await bcrypt.compare(
    credentials.password,
    user.password,
  );

  if (!isPasswordValid) {
    if (user.passwordAttempts >= 5) {
      await prisma.user.update({
        where: { id: user.id },
        data: { status: userStatus.BLOQUEADO },
      });
      throw new Error(
        "El usuario está bloqueado, cambie su contraseña para continuar",
      );
    }
    if (user.patient) {
      await logEvent({
        type: auditEventTypes.AUTHENTICATION,
        action: auditEventAction.ACCION_INICIAR_SESION,
        moduleName: modulos.MODULO_PAGINA_WEB,
        personName: personFullNameFormater(user.patient),
        personRole: "Paciente",
        detail: "Intento de inicio de sesión fallido",
        personId: user.id,
        outcome: auditEventOutcome.OUTCOME_ERROR,
      });
    } else if (user.person) {
      await logEvent({
        type: auditEventTypes.AUTHENTICATION,
        action: auditEventAction.ACCION_INICIAR_SESION,
        moduleName: modulos.MODULO_PAGINA_WEB,
        personName: personFullNameFormater(user.person),
        personRole: user.person.rol.roleName,
        detail: "Intento de inicio de sesión fallido",
        personId: user.id,
        outcome: auditEventOutcome.OUTCOME_ERROR,
      });
    }
    await prisma.user.update({
      where: { id: user.id },
      data: { passwordAttempts: user.passwordAttempts + 1 },
    });
    throw new Error("Credenciales Incorrectas");
  }

  if (user.status === userStatus.BLOQUEADO) {
    throw new Error(
      "El usuario está bloqueado, cambie su contraseña para continuar",
    );
  }

  if (user.passwordExpiration < new Date()) {
    throw new Error(
      "Su contraseña ha expirado, debe cambiarla para iniciar sesión",
    );
  }

  if (user.status === userStatus.NUEVO) {
    throw new Error("Usuario Nuevo, debe cambiar su contraseña para acceder");
  }

  await prisma.user.update({
    where: { id: user.id },
    data: {
      passwordAttempts: 0,
      lastLogin: new Date(),
    },
  });

  if (user.patient) {
    await logEvent({
      type: auditEventTypes.AUTHENTICATION,
      action: auditEventAction.ACCION_INICIAR_SESION,
      moduleName: modulos.MODULO_PAGINA_WEB,
      personName: personFullNameFormater(user.patient),
      personRole: "Paciente",
      detail: "Intento de inicio de sesión fallido",
      personId: user.id,
      outcome: auditEventOutcome.OUTCOME_ERROR,
    });
    return user.patient;
  } else if (user.person) {
    await logEvent({
      type: auditEventTypes.AUTHENTICATION,
      action: auditEventAction.ACCION_INICIAR_SESION,
      moduleName: modulos.MODULO_PAGINA_WEB,
      personName: personFullNameFormater(user.person),
      personRole: user.person.rol.roleName,
      detail: "Intento de inicio de sesión fallido",
      personId: user.id,
      outcome: auditEventOutcome.OUTCOME_ERROR,
    });
    return user.person;
  } else {
    throw new Error("Tipo de usuario no encontrado");
  }
}
