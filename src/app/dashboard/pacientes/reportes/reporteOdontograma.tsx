import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { timeFormatter } from "@/utils/time_formater";
import {
  ReporteHistorialCitasPaciente,
  ReporteOdontogramaPaciente,
} from "@/controller/dashboard/reportes/reportesController";
import { birthDateFormater } from "@/utils/birth_date_formater";
import { listarPaciente } from "@/controller/dashboard/pacientes/pacientesController";
import { personFullNameFormater } from "@/utils/format_person_full_name";

export async function generarPDFOdontogramaPaciente(id: string) {
  const odontograma = await ReporteOdontogramaPaciente(id);
  const paciente = await listarPaciente(id);
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);
  doc.setTextColor(255, 87, 34);
  doc.text("Reporte de Odontograma de Paciente", pageWidth / 2, 16, {
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
  doc.text(`Paciente: ${personFullNameFormater(paciente)}`, 14, 56);
  if (odontograma.length > 0) {
    const data = odontograma.map((row, index) => [
      index + 1,
      row.msc,
      row.temp ? row.temp : "-",
      row.piezas ? row.piezas : "-",
      row.fecha ? birthDateFormater(row.fecha) : "-",
      row.diagnostico ? row.diagnostico : "-",
      row.tratamiento ? row.tratamiento : "-",
    ]);

    autoTable(doc, {
      head: [
        ["#", "MSC", "Temp", "Pieza", "Fecha", "Diagnóstico", "Tratamiento"],
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
  } else {
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(0, 0, 0);
    doc.text("El paciente no tiene citas registradas", 14, 62);
  }

  doc.save(`reporte_odontograma_${personFullNameFormater(paciente)}.pdf`);
}
