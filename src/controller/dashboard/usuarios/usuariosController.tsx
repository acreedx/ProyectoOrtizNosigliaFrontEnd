"use server";
import { prisma } from "@/config/prisma";
import { userStatus } from "@/enums/userStatus";
import userValidation from "@/models/personValidation";
import { subirFotoDePerfil } from "@/utils/upload_image";
import { Person } from "@prisma/client";

export async function listarUsuarios() {
  try {
    const usuarios = await prisma.person.findMany({
      where: {
        rol: {
          roleName: {
            not: "Paciente",
          },
        },
      },
    });
    return usuarios;
  } catch (error) {
    throw new Error("Error al listar los datos");
  }
}

export async function crearUsuario(user: Person) {
  try {
    const usuario = await prisma.person.create({
      data: user,
    });
    return usuario;
  } catch (error) {
    throw new Error("Error al listar los datos");
  }
}

export async function editarUsuario(id: string, formData: FormData) {
  try {
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
    const result = userValidation.safeParse(data);
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
    await prisma.person.update({
      where: {
        id: id,
      },
      data: {
        status: userStatus.ACTIVO,
      },
    });
    return { message: "Éxito al actualizar los datos" };
  } catch (error) {
    throw new Error("Error al listar los datos");
  }
}

export async function deshabilitarUsuario(id: string) {
  try {
    await prisma.person.update({
      where: {
        id: id,
      },
      data: {
        status: userStatus.ELIMINADO,
      },
    });
    return { message: "Éxito al actualizar los datos" };
  } catch (error) {
    throw new Error("Error al listar los datos");
  }
}
