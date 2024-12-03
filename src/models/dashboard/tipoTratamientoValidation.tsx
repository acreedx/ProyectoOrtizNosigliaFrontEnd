import { z } from "zod";

const treatmentsSchema = z.object({
  treatmentType: z
    .string()
    .min(3, "El tipo de tratamiento debe tener al menos 3 caracteres")
    .max(50, "El tipo de tratamiento debe tener como máximo 50 caracteres"),
  title: z
    .string()
    .min(3, "El título debe tener al menos 3 caracteres")
    .max(100, "El título debe tener como máximo 100 caracteres"),
  description: z
    .string()
    .min(3, "La descripción debe tener al menos 3 caracteres")
    .max(500, "La descripción debe tener como máximo 500 caracteres"),
  estimatedAppointments: z
    .number()
    .int("Debe ser un número entero")
    .positive("Debe ser un número positivo"),
  daysBetweenAppointments: z
    .number()
    .int("Debe ser un número entero")
    .positive("Debe ser un número positivo"),
  costEstimation: z
    .number()
    .positive("El costo estimado debe ser un número positivo"),
});

export default treatmentsSchema;
