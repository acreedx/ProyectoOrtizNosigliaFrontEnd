"use server";
import { prisma } from "@/config/prisma";
import { AppointmentStatus } from "@/enums/appointmentsStatus";

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

    const pacientes = await prisma.patient.findMany({
      where: whereClause,
      select: {
        id: true,
        firstName: true,
        secondName: true,
        familyName: true,
        gender: true,
        identification: true,
        user: {
          select: {
            status: true,
          },
        },
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
    console.error(error);
    throw new Error("Error al realizar el reporte");
  }
}

export async function ReporteCitas({
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

    const citas = await prisma.appointment.findMany({
      where: whereClause,
      select: {
        id: true,
        start: true,
        end: true,
        specialty: true,
        reason: true,
        status: true,
        subject: {
          select: { firstName: true, secondName: true, familyName: true },
        },
        practitioner: {
          select: { firstName: true, secondName: true, familyName: true },
        },
      },
    });
    console.log(citas);
    return citas;
  } catch (error) {
    console.error(error);
    throw new Error("Error al realizar el reporte");
  }
}

export async function ReporteUsuarios({
  startDate,
  endDate,
}: {
  startDate?: string;
  endDate?: string;
}) {
  try {
    const whereClause: any = {
      rol: {
        roleName: {
          not: "Paciente",
        },
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

    const usuarios = await prisma.person.findMany({
      where: whereClause,
      select: {
        id: true,
        firstName: true,
        secondName: true,
        familyName: true,
        gender: true,
        identification: true,
        user: {
          select: {
            status: true,
          },
        },
        phone: true,
        email: true,
        createdAt: true,
        rol: true,
      },
    });
    return usuarios;
  } catch (error) {
    console.error(error);
    throw new Error("Error al realizar el reporte");
  }
}

export async function ReporteTratamientos({
  startDate,
  endDate,
}: {
  startDate?: string;
  endDate?: string;
}) {
  try {
    const whereClause: any = {};
    if (startDate || endDate) {
      whereClause.startDate = {};
      if (startDate) {
        whereClause.startDate.gte = new Date(startDate);
      }
      if (endDate) {
        whereClause.startDate.lte = new Date(endDate);
      }
    }

    const carePlans = await prisma.carePlan.findMany({
      where: whereClause,
      select: {
        id: true,
        title: true,
        description: true,
        treatmentType: true,
        startDate: true,
        endDate: true,
        estimatedAppointments: true,
        daysBetweenAppointments: true,
        totalAppointments: true,
        costEstimation: true,
        status: true,
        createdAt: true,
        subject: {
          select: {
            firstName: true,
            secondName: true,
            familyName: true,
          },
        },
      },
    });

    return carePlans;
  } catch (error) {
    console.error(error);
    throw new Error("Error al realizar el reporte");
  }
}

export async function ReporteTiposTratamiento({
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
    const tratamientos = await prisma.treatments.findMany({
      where: whereClause,
      select: {
        id: true,
        title: true,
        treatmentType: true,
        description: true,
        estimatedAppointments: true,
        daysBetweenAppointments: true,
        costEstimation: true,
        active: true,
        createdAt: true,
      },
    });
    return tratamientos;
  } catch (error) {
    console.error(error);
    throw new Error("Error al realizar el reporte");
  }
}
export async function ReporteHistorialCitasPaciente(idPaciente: string) {
  try {
    const citasHistorial = await prisma.appointment.findMany({
      where: {
        subjectId: idPaciente,
        OR: [
          { status: AppointmentStatus.STATUS_COMPLETADA },
          { start: { lt: new Date() } },
        ],
      },
      include: {
        subject: {
          include: {
            allergies: true,
          },
        },
      },
    });
    return citasHistorial;
  } catch (error) {
    console.error(error);
    throw new Error("Error al realizar el reporte");
  }
}

export async function ReporteOdontogramaPaciente(idPaciente: string) {
  try {
    const odontograma = await prisma.odontogramRows.findMany({
      where: {
        patientId: idPaciente,
      },
    });
    return odontograma;
  } catch (error) {
    console.error(error);
    throw new Error("Error al realizar el reporte");
  }
}
