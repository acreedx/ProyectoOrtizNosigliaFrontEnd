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
    const pacientes = await prisma.person.findMany({
      where: {
        rol: {
          roleName: "Paciente",
        },
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
    const rolPaciente = await prisma.rol.findFirst({
      where: {
        roleName: "Paciente",
      },
    });
    if (!rolPaciente) {
      return {
        success: false,
        error: "No existe el rol de paciente registrado",
      };
    }
    const nuevoPaciente = await prisma.person.create({
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
        username: paciente.identification,
        password: await hashPassword(paciente.password),
        passwordExpiration: getPasswordExpiration(),
        ...(paciente.organizationId && {
          organization: {
            connect: {
              id: paciente.organizationId,
            },
          },
        }),
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
        rol: {
          connect: { id: rolPaciente.id },
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
    const pacienteActualizado = await prisma.person.update({
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
    await prisma.person.update({
      where: {
        id: id,
      },
      data: {
        status: userStatus.ACTIVO,
      },
    });
    return { message: "Paciente habilitado con éxito" };
  } catch (error) {
    throw new Error("Error al habilitar el paciente");
  }
}

export async function deshabilitarPaciente(id: string) {
  try {
    await prisma.person.update({
      where: {
        id: id,
      },
      data: {
        status: userStatus.ELIMINADO,
      },
    });
    return { message: "Paciente inhabilitado con éxito" };
  } catch (error) {
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
