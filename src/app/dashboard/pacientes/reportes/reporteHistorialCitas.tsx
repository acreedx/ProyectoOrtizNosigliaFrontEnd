import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { mostrarAlertaError } from "@/utils/show_error_alert";
import { timeFormatter } from "@/utils/time_formater";
import {
  ReporteHistorialCitasPaciente,
  ReporteOrganizaciones,
} from "@/controller/dashboard/reportes/reportesController";
import { birthDateFormater } from "@/utils/birth_date_formater";
import { personFullNameFormater } from "@/utils/format_person_full_name";

export async function generarPDFHistorialCitasPaciente(formData: FormData) {
  const idPaciente = formData.get("id")?.toString();
  if (!idPaciente) {
    throw new Error("No se encontró el id del paciente");
  }
  const citas = await ReporteHistorialCitasPaciente(idPaciente);

  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);
  doc.setTextColor(255, 87, 34);
  doc.text("Reporte de Historial de Citas", pageWidth / 2, 16, {
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
  if (citas.length > 0) {
    const data = citas.map((cita, index) => [
      index + 1,
      cita.specialty,
      birthDateFormater(cita.start),
      birthDateFormater(cita.end),
      cita.reason,
    ]);

    autoTable(doc, {
      head: [["#", "Especialidad", "Fecha de Inicio", "Fecha de Fin", "Razón"]],
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
  } else {
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(0, 0, 0);
    doc.text("El paciente no tiene citas registradas", 14, 62);
  }

  doc.save("reporte_historial_de_citas.pdf");
}
