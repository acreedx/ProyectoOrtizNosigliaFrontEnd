"use server";
import { prisma } from "@/config/prisma";
import { userStatus } from "@/enums/userStatus";
import { accountPorDefecto } from "@/utils/default_account";
import { odontogramaPorDefecto } from "@/utils/default_odontograma";
import { getPasswordExpiration } from "@/utils/generate_password_expiration";
import { hashPassword } from "@/utils/password_hasher";
import { Allergy, Contact, OdontogramRows, Person } from "@prisma/client";

export async function listarOdontrograma(pacienteId: string) {
  try {
    const odontograma = await prisma.odontogramRows.findMany({
      where: {
        patientId: pacienteId,
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
    await prisma.$transaction(
      odontogram.map((row) =>
        prisma.odontogramRows.update({
          where: { id: row.id },
          data: {
            fecha: row.fecha ? new Date(row.fecha) : null,
            diagnostico: row.diagnostico,
            tratamiento: row.tratamiento,
          },
        }),
      ),
    );
    return {
      success: true,
      message: "Exito al editar los datos",
    };
  } catch (error) {
    console.log(error);
    throw new Error("Error editar los datos");
  }
}
