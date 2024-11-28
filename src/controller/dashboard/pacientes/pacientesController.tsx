"use server";
import { prisma } from "@/config/prisma";
import { userStatus } from "@/enums/userStatus";
import { accountPorDefecto } from "@/utils/default_account";
import { odontogramaPorDefecto } from "@/utils/default_odontograma";
import { getPasswordExpiration } from "@/utils/get_password_expiration";
import { hashPassword } from "@/utils/password_hasher";
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

export async function editarPaciente(id: string, paciente: Person) {
  try {
    const pacienteActualizado = await prisma.patient.update({
      where: {
        id: id,
      },
      data: paciente,
    });
    return pacienteActualizado;
  } catch (error) {
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
