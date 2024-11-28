import { z } from "zod";

export const appointmentDentistValidation = z.object({
  descripcion: z
    .string()
    .min(10, "La descripción debe tener al menos 10 caracteres"),
  fecha: z
    .string()
    .regex(
      /^\d{4}-\d{2}-\d{2}$/,
      "La fecha debe estar en el formato AAAA-MM-DD",
    ),
  hora: z
    .string()
    .regex(
      /^(?:0[8-9]|1[0-6]):[03]0$/,
      "La hora debe estar en el rango 08:00 a 17:00 con intervalos de 30 minutos",
    ),
  paciente: z.string().min(1, "El campo 'doctor' no puede estar vacío"),
});
