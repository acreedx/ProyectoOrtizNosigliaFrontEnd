"use server";
import { prisma } from "@/config/prisma";
import { userStatus } from "@/enums/userStatus";
import { accountPorDefecto } from "@/utils/default_account";
import { odontogramaPorDefecto } from "@/utils/default_odontograma";
import { getPasswordExpiration } from "@/utils/get_password_expiration";
import { hashPassword } from "@/utils/password_hasher";
import { Allergy, Contact, OdontogramRows, Person } from "@prisma/client";

export async function listarOdontrograma(pacienteId: string) {
  try {
    const odontograma = await prisma.odontogramRows.findMany({
      where: {
        personId: pacienteId,
      },
    });
    return odontograma;
  } catch (error) {
    console.log(error);
    throw new Error("Error al listar los datos");
  }
}

export async function editarOdontograma(odontogram: OdontogramRows[]) {
  try {
    await prisma.odontogramRows.updateMany({
      data: odontogram,
    });
    return {
      success: true,
      message: "Exito al editar los datos",
    };
  } catch (error) {
    throw new Error("Error al crear el paciente");
  }
}
