import { z } from "zod";

const rolSchema = z.object({
  roleName: z
    .string()
    .min(3, "El nombre del rol debe tener al menos 3 caracteres")
    .max(50, "El nombre del rol debe tener como máximo 50 caracteres"),
  description: z
    .string()
    .min(3, "La descripción debe tener al menos 3 caracteres")
    .max(50, "La descripción debe tener como máximo 50 caracteres"),
  permissionIDs: z
    .array(z.string())
    .min(1, "Debes seleccionar al menos un permiso"),
});

export default rolSchema;
