"use server";
import { prisma } from "@/config/prisma";
import { Organization } from "@prisma/client";

export async function listarOrganizaciones() {
  try {
    const organizaciones = await prisma.organization.findMany();
    console.log(organizaciones);
    return organizaciones;
  } catch (error) {
    throw new Error("Error al listar los datos");
  }
}

export async function crearOrganizacion(organization: Organization) {
  try {
    await prisma.organization.create({
      data: organization,
    });
    return { message: "Éxito al crear los datos" };
  } catch (error) {
    console.log(error);
    throw new Error("Error al crear los datos");
  }
}

export async function editarOrganizacion(
  id: string,
  organization: Organization,
) {
  try {
    await prisma.organization.update({
      where: {
        id: id,
      },
      data: organization,
    });
    return { message: "Éxito al actualizar los datos" };
  } catch (error) {
    throw new Error("Error al actualizar los datos");
  }
}

export async function eliminarOrganizacion(id: string) {
  try {
    await prisma.organization.update({
      where: {
        id: id,
      },
      data: {
        active: false,
      },
    });
    return { message: "Éxito al deshabilitar los datos" };
  } catch (error) {
    throw new Error("Error al deshabilitar los datos");
  }
}

export async function rehabilitarOrganizacion(id: string) {
  try {
    await prisma.organization.update({
      where: {
        id: id,
      },
      data: {
        active: true,
      },
    });
    return { message: "Éxito al actualizar los datos" };
  } catch (error) {
    throw new Error("Error al actualizar los datos");
  }
}
