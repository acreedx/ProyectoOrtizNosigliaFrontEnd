import { Patient } from "@prisma/client";

const IDENTIFICATOR = "PAT";
export const generate_patient_username = (patient: Patient) => {
  return `${patient.identification}${IDENTIFICATOR}`;
};
