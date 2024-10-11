"use server";

import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();
export async function habilitarRol(id: string) {
  await prisma.rol.update({
    where: {
      id: id,
    },
    data: {
      active: true,
    },
  });
  revalidatePath("/dashboard/pages/roles");
}
export async function deshabilitarRol(id: string) {
  await prisma.rol.update({
    where: {
      id: id,
    },
    data: {
      active: false,
    },
  });
  revalidatePath("/dashboard/pages/roles");
}
