"use client";
import { ReporteUsuarios } from "@/controller/dashboard/reportes/reportesController";
import { mostrarAlertaError } from "@/utils/show_error_alert";
import { timeFormatter } from "@/utils/time_formater";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export async function generarPDFUsuarios(formData: FormData) {
  const startDate = formData.get("startDate")?.toString();
  const endDate = formData.get("endDate")?.toString();
  const pacientes = await ReporteUsuarios({ startDate, endDate });
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);
  doc.setTextColor(255, 87, 34);
  doc.text("Reporte de Usuarios", pageWidth / 2, 16, { align: "center" });
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
    }
    doc.text(`Período: ${startDate} a ${endDate}`, 14, 54);
  } else {
    doc.text("Período: Todos los registros", 14, 54);
  }
  const data = pacientes.map((paciente, index) => [
    index + 1,
    `${paciente.firstName} ${paciente.secondName || ""} ${paciente.familyName}`,
    paciente.gender,
    paciente.identification,
    paciente.user.status,
    paciente.phone || "N/A",
    paciente.email || "N/A",
    paciente.rol.roleName,
    new Date(paciente.createdAt).toLocaleDateString(),
  ]);
  autoTable(doc, {
    head: [
      [
        "#",
        "Nombre",
        "Género",
        "Identificación",
        "Estado",
        "Teléfono",
        "Correo Electrónico",
        "Rol",
        "Fecha de Registro",
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
  doc.save("reporte_usuarios.pdf");
}
