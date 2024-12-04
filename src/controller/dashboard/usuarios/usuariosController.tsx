"use server";
import { authOptions } from "@/config/authOptions";
import { prisma } from "@/config/prisma";
import {
  auditEventTypes,
  auditEventAction,
  modulos,
  auditEventOutcome,
} from "@/enums/auditEventTypes";
import { userStatus } from "@/enums/userStatus";
import personValidation from "@/models/dashboard/personValidation";
import { personFullNameFormater } from "@/utils/format_person_full_name";
import { getPasswordExpiration } from "@/utils/generate_password_expiration";
import { logEvent } from "@/utils/logger";
import { sendEmail } from "@/utils/mailer";
import { generatePassword } from "@/utils/password_generator";
import { hashPassword } from "@/utils/password_hasher";
import { subirFotoDePerfil } from "@/utils/upload_image";
import { Allergy, Person } from "@prisma/client";
import { getServerSession } from "next-auth";

export async function listarUsuarios() {
  try {
    const usuarios = await prisma.person.findMany({
      include: {
        user: true,
      },
    });
    return usuarios;
  } catch (error) {
    throw new Error("Error al listar los datos");
  }
}

export async function listarUsuario(id: string) {
  try {
    const usuario = await prisma.person.findUnique({
      where: {
        id: id,
      },
    });
    if (!usuario) throw new Error("Error al listar los datos");
    return usuario;
  } catch (error) {
    throw new Error("Error al listar los datos");
  }
}
export async function crearUsuario(formData: FormData) {
  const session = await getServerSession(authOptions);
  if (!session) {
    throw new Error("No se ha encontrado la sesión.");
  }
  const profilePicture = formData.get("photoUrl") as File | undefined;
  const data = {
    firstName: formData.get("firstName")?.toString() || "",
    secondName: formData.get("secondName")?.toString(),
    familyName: formData.get("familyName")?.toString() || "",
    phone: formData.get("phone")?.toString() || "",
    mobile: formData.get("mobile")?.toString() || "",
    gender: formData.get("gender")?.toString() || "",
    email: formData.get("email")?.toString() || "",
    birthDate: new Date(formData.get("birthDate")?.toString() || ""),
    addressLine: formData.get("addressLine")?.toString() || "",
    addressCity: formData.get("addressCity")?.toString() || "",
    maritalStatus: formData.get("maritalStatus")?.toString() || "",
    identification: formData.get("identification")?.toString() || "",
    rol: formData.get("rol")?.toString() || "",
  };
  const result = personValidation.safeParse(data);
  if (!result.success) {
    return {
      success: false,
      errors: result.error.format(),
    };
  }
  const AnyPersonUserName = await prisma.person.findFirst({
    where: {
      user: {
        username: data.identification,
      },
    },
  });
  if (AnyPersonUserName) {
    return {
      success: false,
      error: "Ya existe un Usuario con ese Carnet de Identidad",
    };
  }
  const AnyPersonIdentificationName = await prisma.person.findFirst({
    where: {
      identification: data.identification,
    },
  });
  if (AnyPersonIdentificationName) {
    return {
      success: false,
      error: "Ya existe un Usuario con ese Carnet de Identidad",
    };
  }
  const generatedPassword = await generatePassword(
    data.firstName,
    data.familyName,
    data.identification,
  );
  const newPerson = await prisma.person.create({
    data: {
      photoUrl: await subirFotoDePerfil(profilePicture),
      firstName: data.firstName,
      secondName: data.secondName,
      familyName: data.familyName,
      gender: data.gender,
      email: data.email,
      birthDate: new Date(data.birthDate),
      phone: data.phone,
      mobile: data.mobile,
      addressLine: data.addressLine,
      addressCity: data.addressCity,
      maritalStatus: data.maritalStatus,
      identification: data.identification,
      user: {
        create: {
          username: data.identification,
          password: await hashPassword(generatedPassword),
          passwordExpiration: getPasswordExpiration(),
        },
      },
      rol: {
        connect: {
          id: data.rol,
        },
      },
    },
    include: {
      user: true,
    },
  });
  await logEvent({
    type: auditEventTypes.SYSTEM,
    action: auditEventAction.ACCION_CREAR,
    moduleName: modulos.MODULO_USUARIOS,
    personName: personFullNameFormater(session.user),
    personRole: "Usuario",
    detail: "Creación de usuario",
    personId: session.user.id,
    outcome: auditEventOutcome.OUTCOME_EXITO,
  });
  await sendEmail({
    email: newPerson.email,
    subject: "Creación exitosa de cuenta",
    message: `
        ¡Hola ${personFullNameFormater(newPerson)}!
    
        Tu cuenta de usuario ha sido creada exitosamente. Aquí tienes tus credenciales:
    
        - **Nombre de usuario**: ${newPerson.user.username}
        - **Contraseña**: ${generatedPassword}
    
        Por favor, guarda esta información en un lugar seguro.
        
        Despues de tu primer inicio de sesión se te pedirá que cambies tu contraseña
  
        ¡Gracias por unirte a Ortiz Nosiglia!
      `,
  });
  return { success: true };
}

export async function editarUsuario(id: string, formData: FormData) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      throw new Error("No se ha encontrado la sesión.");
    }
    const profilePicture = formData.get("photoUrl") as File | undefined;
    const data = {
      firstName: formData.get("firstName")?.toString() || "",
      secondName: formData.get("secondName")?.toString(),
      familyName: formData.get("familyName")?.toString() || "",
      phone: formData.get("phone")?.toString() || "",
      mobile: formData.get("mobile")?.toString() || "",
      gender: formData.get("gender")?.toString() || "",
      email: formData.get("email")?.toString() || "",
      birthDate: new Date(formData.get("birthDate")?.toString() || ""),
      addressLine: formData.get("addressLine")?.toString() || "",
      addressCity: formData.get("addressCity")?.toString() || "",
      maritalStatus: formData.get("maritalStatus")?.toString() || "",
      identification: formData.get("identification")?.toString() || "",
    };
    const result = personValidation.safeParse(data);
    if (!result.success) {
      return {
        success: false,
        errors: result.error.format(),
      };
    }
    if (profilePicture) {
      const updatedUser = await prisma.person.update({
        where: {
          id: id,
        },
        data: {
          ...data,
          photoUrl: await subirFotoDePerfil(profilePicture),
        },
      });
      if (!updatedUser) {
        throw new Error("Error al editar el usuario");
      }
      await logEvent({
        type: auditEventTypes.SYSTEM,
        action: auditEventAction.ACCION_EDITAR,
        moduleName: modulos.MODULO_USUARIOS,
        personName: personFullNameFormater(session.user),
        personRole: "Usuario",
        detail: "Edición de usuario",
        personId: session.user.id,
        outcome: auditEventOutcome.OUTCOME_EXITO,
      });
      return {
        success: true,
        message: "Éxito al editar el usuario",
      };
    } else {
      const updatedUser = await prisma.person.update({
        where: {
          id: id,
        },
        data: {
          ...data,
        },
      });
      if (!updatedUser) {
        throw new Error("Error al editar el usuario");
      }
      await logEvent({
        type: auditEventTypes.SYSTEM,
        action: auditEventAction.ACCION_EDITAR,
        moduleName: modulos.MODULO_USUARIOS,
        personName: personFullNameFormater(session.user),
        personRole: "Usuario",
        detail: "Edición de usuario",
        personId: session.user.id,
        outcome: auditEventOutcome.OUTCOME_EXITO,
      });
      return {
        success: true,
        message: "Éxito al editar el usuario",
      };
    }
  } catch (error) {
    console.log(error);
    throw new Error("Error al editar el usuario");
  }
}

export async function habilitarUsuario(id: string) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      throw new Error("No se ha encontrado la sesión.");
    }
    await prisma.person.update({
      where: {
        id: id,
      },
      data: {
        user: {
          update: {
            status: userStatus.ACTIVO,
          },
        },
      },
    });
    await logEvent({
      type: auditEventTypes.SYSTEM,
      action: auditEventAction.ACCION_EDITAR,
      moduleName: modulos.MODULO_USUARIOS,
      personName: personFullNameFormater(session.user),
      personRole: "Usuario",
      detail: "Habilitar Usuarios",
      personId: session.user.id,
      outcome: auditEventOutcome.OUTCOME_EXITO,
    });
    return { message: "Éxito al actualizar los datos" };
  } catch (error) {
    throw new Error("Error al listar los datos");
  }
}

export async function deshabilitarUsuario(id: string) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      throw new Error("No se ha encontrado la sesión.");
    }
    await prisma.person.update({
      where: {
        id: id,
      },
      data: {
        user: {
          update: {
            status: userStatus.ELIMINADO,
          },
        },
      },
    });
    await logEvent({
      type: auditEventTypes.SYSTEM,
      action: auditEventAction.ACCION_ELIMINAR,
      moduleName: modulos.MODULO_USUARIOS,
      personName: personFullNameFormater(session.user),
      personRole: "Usuario",
      detail: "Deshabilitar Usuarios",
      personId: session.user.id,
      outcome: auditEventOutcome.OUTCOME_EXITO,
    });
    return { message: "Éxito al actualizar los datos" };
  } catch (error) {
    throw new Error("Error al listar los datos");
  }
}

export async function bloquearUsuario(id: string) {
  try {
    await prisma.person.update({
      where: {
        id: id,
      },
      data: {
        user: {
          update: {
            status: userStatus.BLOQUEADO,
          },
        },
      },
    });
    return { message: "Éxito al actualizar los datos" };
  } catch (error) {
    throw new Error("Error al listar los datos");
  }
}
