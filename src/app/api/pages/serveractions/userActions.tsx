"use server";

import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();
export async function habilitateUser(id: string) {
  await prisma.person.update({
    where: { id: id },
    data: {
      active: true,
    },
  });
  revalidatePath("/dashboard/pages/usuarios");
}

export async function dehabilitateUser(id: string) {
  await prisma.person.update({
    where: { id: id },
    data: {
      active: false,
    },
  });
  revalidatePath("/dashboard/pages/usuarios");
}
