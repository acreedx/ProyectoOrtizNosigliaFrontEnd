import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { mostrarAlertaError } from "@/utils/show_error_alert";
import { timeFormatter } from "@/utils/time_formater";
import {
  ReporteOrganizaciones,
  ReporteTratamientos,
} from "@/controller/dashboard/reportes/reportesController";

export async function generarPDFTratamientos(formData: FormData) {
  const startDate = formData.get("startDate")?.toString();
  const endDate = formData.get("endDate")?.toString();
  const carePlans = await ReporteTratamientos({ startDate, endDate });
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);
  doc.setTextColor(255, 87, 34);
  doc.text("Reporte de Planes de Tratamiento", pageWidth / 2, 16, {
    align: "center",
  });
  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(0, 0, 0);
  doc.text("Centro de Salud Ortiz Nosiglia", 14, 30);
  doc.text(
    "Dirección: Calle 15 de Calacoto, DiagnoSur piso 1, consultorio 108, La Paz, Bolivia",
    14,
    38,
  );
  doc.text(
    `Fecha del reporte: ${new Date().toLocaleDateString()}, Hora: ${timeFormatter(new Date())}`,
    14,
    46,
  );

  if (startDate && endDate) {
    if (startDate > endDate) {
      mostrarAlertaError(
        "La fecha de inicio no puede ser mayor a la fecha de límite",
      );
      return;
    }
    doc.text(`Período: ${startDate} a ${endDate}`, 14, 54);
  } else {
    doc.text("Período: Todos los registros", 14, 54);
  }

  const data = carePlans.map((plan, index) => [
    index + 1,
    plan.title,
    plan.description,
    plan.treatmentType,
    `${new Date(plan.startDate).toLocaleDateString()} - ${
      plan.endDate ? new Date(plan.endDate).toLocaleDateString() : "N/A"
    }`,
    plan.estimatedAppointments,
    plan.daysBetweenAppointments,
    plan.totalAppointments ?? "N/A",
    `$${plan.costEstimation.toFixed(2)} bs`,
    plan.status,
  ]);
  autoTable(doc, {
    head: [
      [
        "#",
        "Título",
        "Descripción",
        "Tipo de Tratamiento",
        "Periodo",
        "Citas Estimadas",
        "Días Entre Citas",
        "Total de Citas",
        "Costo Estimado",
        "Estado",
      ],
    ],
    body: data,
    startY: 62,
    theme: "grid",
    headStyles: {
      fillColor: [255, 87, 34],
      textColor: [255, 255, 255],
      fontSize: 12,
      fontStyle: "bold",
    },
    styles: {
      fontSize: 10,
      textColor: [51, 51, 51],
    },
    alternateRowStyles: {
      fillColor: [255, 245, 235],
    },
    margin: { left: 14, right: 14 },
  });
  doc.save("reporte_planes_tratamiento.pdf");
}
