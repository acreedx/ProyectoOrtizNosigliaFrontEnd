"use server";
import { authOptions } from "@/config/authOptions";
import { prisma } from "@/config/prisma";
import { personFullNameFormater } from "@/utils/format_person_full_name";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { getServerSession } from "next-auth";

export async function ReportePacientes({
  startDate,
  endDate,
}: {
  startDate?: string;
  endDate?: string;
}) {
  try {
    const whereClause: any = {
      rol: {
        roleName: "Paciente",
      },
    };
    if (startDate || endDate) {
      whereClause.createdAt = {};
      if (startDate) {
        whereClause.createdAt.gte = new Date(startDate);
      }
      if (endDate) {
        whereClause.createdAt.lte = new Date(endDate);
      }
    }

    const pacientes = await prisma.person.findMany({
      where: whereClause,
      select: {
        id: true,
        firstName: true,
        secondName: true,
        familyName: true,
        gender: true,
        identification: true,
        status: true,
        phone: true,
        email: true,
        createdAt: true,
      },
    });

    return pacientes;
  } catch (error) {
    console.error(error);
    throw new Error("Error al listar los datos");
  }
}

export async function ReporteOrganizaciones({
  startDate,
  endDate,
}: {
  startDate?: string;
  endDate?: string;
}) {
  try {
    const whereClause: any = {};

    if (startDate || endDate) {
      whereClause.createdAt = {};
      if (startDate) {
        whereClause.createdAt.gte = new Date(startDate);
      }
      if (endDate) {
        whereClause.createdAt.lte = new Date(endDate);
      }
    }
    const organizaciones = await prisma.organization.findMany({
      where: whereClause,
      select: {
        id: true,
        name: true,
        address: true,
        active: true,
        createdAt: true,
      },
    });

    return organizaciones;
  } catch (error) {
    console.error("Error al obtener organizaciones:", error);
    throw new Error("Error al listar las organizaciones");
  }
}
