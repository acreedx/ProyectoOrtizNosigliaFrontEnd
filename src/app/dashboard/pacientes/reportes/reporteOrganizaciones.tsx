import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { mostrarAlertaError } from "@/utils/show_error_alert";
import { timeFormatter } from "@/utils/time_formater";
import { ReporteOrganizaciones } from "@/controller/dashboard/reportes/reportesController";

export async function generarPDFOrganizaciones(formData: FormData) {
  const startDate = formData.get("startDate")?.toString();
  const endDate = formData.get("endDate")?.toString();

  const organizaciones = await ReporteOrganizaciones({ startDate, endDate });

  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);
  doc.setTextColor(255, 87, 34);
  doc.text("Reporte de Organizaciones", pageWidth / 2, 16, { align: "center" });
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

  const data = organizaciones.map((org, index) => [
    index + 1,
    org.name,
    org.address,
    org.active ? "Activo" : "Inactivo",
    new Date(org.createdAt).toLocaleDateString(),
  ]);

  autoTable(doc, {
    head: [
      [
        "#",
        "Nombre de la Organización",
        "Dirección",
        "Estado",
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

  doc.save("reporte_organizaciones.pdf");
}
