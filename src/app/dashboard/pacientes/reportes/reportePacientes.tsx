import { personFullNameFormater } from "@/utils/format_person_full_name";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { Button } from "@chakra-ui/react";
import { listarPacientes } from "@/controller/dashboard/pacientes/pacientesController";

const handleGeneratePDF = async () => {
  const doc = new jsPDF();

  doc.setFontSize(16);
  doc.text("Reporte de Pacientes", 14, 16);
  const patients = await listarPacientes();
  const data = patients.map((patient) => [
    patient.id,
    personFullNameFormater(patient),
    patient.gender,
    patient.identification,
    patient.status,
  ]);

  doc.save("reporte_pacientes.pdf");
};
export default function ReportePacientes() {
  return (
    <Button colorScheme="blue" onClick={handleGeneratePDF}>
      Generar Reporte PDF
    </Button>
  );
}
