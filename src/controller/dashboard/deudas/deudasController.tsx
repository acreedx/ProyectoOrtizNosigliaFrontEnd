"use server";
import { prisma } from "@/config/prisma";
import { AccountStatus } from "@/enums/accountStatus";

export async function listarDeudas() {
  try {
    const cuentas = await prisma.patient.findMany({
      include: {
        account: true,
      },
      where: {
        account: {
          billingStatus: AccountStatus.CON_DEUDA,
        },
      },
    });
    return cuentas;
  } catch (error) {
    console.log(error);
    throw new Error("Error al listar las cuentas");
  }
}
export async function pagarDeuda(id: string) {
  try {
    await prisma.account.update({
      where: {
        id: id,
      },
      data: {
        balance: 0,
        billingStatus: AccountStatus.SIN_DEUDA,
      },
    });
    return {
      message: "Éxito al actualizar los datos",
    };
  } catch (error) {
    console.log(error);
    throw new Error("Error al actualizar los datos");
  }
}
