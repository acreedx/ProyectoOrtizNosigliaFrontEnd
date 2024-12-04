"use server";
import { prisma } from "@/config/prisma";
import { userStatus } from "@/enums/userStatus";
import personValidation from "@/models/dashboard/personValidation";
import { accountPorDefecto } from "@/utils/default_account";
import { odontogramaPorDefecto } from "@/utils/default_odontograma";
import { getPasswordExpiration } from "@/utils/generate_password_expiration";
import { hashPassword } from "@/utils/password_hasher";
import { subirFotoDePerfil } from "@/utils/upload_image";
import { Allergy, Contact, Person } from "@prisma/client";
export async function listarPacientes() {
  try {
    const pacientes = await prisma.patient.findMany({
      include: {
        user: true,
      },
    });
    return pacientes;
  } catch (error) {
    console.log(error);
    throw new Error("Error al listar los datos");
  }
}

export async function listarPaciente(id: string) {
  try {
    const paciente = await prisma.patient.findUnique({
      where: {
        id: id,
      },
      include: {
        contacts: true,
        allergies: true,
      },
    });
    if (!paciente) {
      throw new Error("No se encontro al paciente");
    }
    return paciente;
  } catch (error) {
    console.log(error);
    throw new Error("Error al listar los datos");
  }
}
export async function crearPaciente(
  paciente: Person,
  alergias: Allergy[],
  contactos: Contact[],
) {
  try {
    const nuevoPaciente = await prisma.patient.create({
      data: {
        photoUrl: paciente.photoUrl,
        firstName: paciente.firstName,
        secondName: paciente.secondName,
        familyName: paciente.familyName,
        gender: paciente.gender,
        email: paciente.email,
        birthDate: new Date(paciente.birthDate),
        phone: paciente.phone,
        mobile: paciente.mobile,
        addressLine: paciente.addressLine,
        addressCity: paciente.addressCity,
        maritalStatus: paciente.maritalStatus,
        identification: paciente.identification,
        user: {
          create: {
            username: paciente.identification,
            password: await hashPassword(paciente.rolId),
            passwordExpiration: getPasswordExpiration(),
          },
        },
        allergies: {
          create: alergias,
        },
        contacts: {
          create: contactos,
        },
        odontograma: {
          create: odontogramaPorDefecto,
        },
        account: {
          create: accountPorDefecto,
        },
      },
    });
    return {
      success: true,
      data: nuevoPaciente,
    };
  } catch (error) {
    throw new Error("Error al crear el paciente");
  }
}

export async function editarPaciente(id: string, formData: FormData) {
  try {
    const profilePicture = formData.get("photoUrl") as File | undefined;
    const allergies: Allergy[] = [];
    const contacts: Contact[] = [];
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
    for (let j = 0; formData.has(`contacts[${j}][relationship]`); j++) {
      const relationship = formData.get(
        `contacts[${j}][relationship]`,
      ) as string;
      const name = formData.get(`contacts[${j}][name]`) as string;
      const phone = formData.get(`contacts[${j}][phone]`) as string;
      const mobile = formData.get(`contacts[${j}][mobile]`) as string;
      const email = formData.get(`contacts[${j}][email]`) as string;
      const addressLine = formData.get(`contacts[${j}][addressLine]`) as string;
      const addressCity = formData.get(`contacts[${j}][addressCity]`) as string;
      const gender = formData.get(`contacts[${j}][gender]`) as string;
      contacts.push({
        relationship,
        name,
        phone,
        mobile,
        email,
        addressLine,
        addressCity,
        gender,
        active: true,
      } as Contact);
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
      contacts: contacts,
    };
    const result = personValidation.safeParse(data);
    if (!result.success) {
      return {
        success: false,
        errors: result.error.format(),
      };
    }
    if (profilePicture && profilePicture.name !== "undefined") {
      const updatedUser = await prisma.patient.update({
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
          contacts: {
            deleteMany: {},
            create: contacts,
          },
        },
      });
      if (!updatedUser) {
        throw new Error("Error al editar el paciente");
      }
      return {
        success: true,
        message: "Éxito al editar el paciente",
      };
    } else {
      const updatedUser = await prisma.patient.update({
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
          contacts: {
            deleteMany: {},
            create: contacts,
          },
        },
      });
      if (!updatedUser) {
        throw new Error("Error al editar el paciente");
      }
      return {
        success: true,
        message: "Éxito al editar el paciente",
      };
    }
  } catch (error) {
    console.log(error);
    throw new Error("Error al editar el paciente");
  }
}

export async function habilitarPaciente(id: string) {
  try {
    await prisma.patient.update({
      where: {
        id: id,
      },
      data: {
        user: {
          update: {
            data: {
              status: userStatus.ACTIVO,
            },
          },
        },
      },
    });
    return { message: "Paciente habilitado con éxito" };
  } catch (error) {
    throw new Error("Error al habilitar el paciente");
  }
}

export async function deshabilitarPaciente(id: string) {
  try {
    await prisma.patient.update({
      where: {
        id: id,
      },
      data: {
        user: {
          update: {
            data: {
              status: userStatus.ELIMINADO,
            },
          },
        },
      },
    });
    return { message: "Paciente inhabilitado con éxito" };
  } catch (error: any) {
    console.log(error);
    throw new Error("Error al inhabilitar el paciente");
  }
}

export async function historialDePaciente(id: string) {
  try {
    const citas = await prisma.appointment.findMany({
      where: {
        subjectId: id,
      },
    });
    return citas;
  } catch (error) {
    throw new Error("Error al inhabilitar el paciente");
  }
}
