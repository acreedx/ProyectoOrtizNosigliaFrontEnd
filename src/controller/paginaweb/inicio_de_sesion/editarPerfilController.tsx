"use server";
import { prisma } from "@/config/prisma";
import personValidation from "@/models/personValidation";
import { subirFotoDePerfil } from "@/utils/upload_image";
import { Allergy } from "@prisma/client";

export async function listarPerfil(id: string) {
  try {
    const usuario = await prisma.person.findUnique({
      where: {
        id: id,
      },
      include: {
        allergies: true,
      },
    });
    if (!usuario) {
      throw new Error("Perfil no existente");
    }
    return usuario;
  } catch (error) {
    throw new Error("Error al listar el perfil");
  }
}

export async function editarPerfil(id: string, formData: FormData) {
  try {
    const profilePicture = formData.get("photoUrl") as File | undefined;
    const allergies: Allergy[] = [];
    for (let i = 0; formData.has(`allergies[${i}][substance]`); i++) {
      const substance = formData.get(`allergies[${i}][substance]`) as string;
      const reaction = formData.get(`allergies[${i}][reaction]`) as string;
      const notes = formData.get(`allergies[${i}][notes]`) as string;
      allergies.push({
        substance,
        reaction,
        severity: reaction,
        notes,
      } as Allergy);
    }
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
      allergies: allergies,
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
          firstName: data.firstName,
          secondName: data.secondName,
          familyName: data.familyName,
          phone: data.phone,
          mobile: data.mobile,
          gender: data.gender,
          email: data.email,
          birthDate: data.birthDate,
          addressLine: data.addressLine,
          addressCity: data.addressCity,
          maritalStatus: data.maritalStatus,
          identification: data.identification,
          allergies: {
            deleteMany: {},
            create: allergies,
          },
        },
      });
      if (!updatedUser) {
        throw new Error("Error al editar el perfil");
      }
      return {
        success: true,
        message: "Éxito al editar el perfil",
      };
    } else {
      const updatedUser = await prisma.person.update({
        where: {
          id: id,
        },
        data: {
          photoUrl: await subirFotoDePerfil(profilePicture),
          firstName: data.firstName,
          secondName: data.secondName,
          familyName: data.familyName,
          phone: data.phone,
          mobile: data.mobile,
          gender: data.gender,
          email: data.email,
          birthDate: data.birthDate,
          addressLine: data.addressLine,
          addressCity: data.addressCity,
          maritalStatus: data.maritalStatus,
          identification: data.identification,
          allergies: {
            deleteMany: {},
            create: allergies,
          },
        },
      });
      if (!updatedUser) {
        throw new Error("Error al editar el perfil");
      }
      return {
        success: true,
        message: "Éxito al editar el perfil",
      };
    }
  } catch (error) {
    console.log(error);
    throw new Error("Error al editar el perfil");
  }
}
