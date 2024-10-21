import { z } from "zod";

const personValidation = z.object({
  firstName: z
    .string()
    .min(3, "Debe tener más de 3 caracteres")
    .max(50, "Debe tener menos de 50 caracteres"),
  secondName: z
    .string()
    .min(3, "Debe tener más de 3 caracteres")
    .max(50, "Debe tener menos de 50 caracteres"),
  familyName: z
    .string()
    .min(3, "Debe tener más de 3 caracteres")
    .max(50, "Debe tener menos de 50 caracteres"),
  phone: z
    .string()
    .length(7, "El teléfono debe tener 8 dígitos")
    .regex(
      /^(?!.*(\d)\1{7})[234]\d{6}$/, // Valida 8 dígitos, empieza con 2, 3 o 4, y no contiene números repetidos
      "El teléfono debe tener 8 dígitos, empezar con 2, 3 o 4, y contener solo números válidos.",
    )
    .refine(
      (value) => !/^(\d)\1{7}$/.test(value),
      "Ingrese un telefono valido",
    ),
  mobile: z
    .string()
    .length(8, "El celular debe tener 8 dígitos")
    .regex(
      /^(?!.*(\d)\1{7})[67]\d{7}$/, // Valida 8 dígitos, empieza con 6 o 7, y no contiene números repetidos
      "El celular debe tener 8 dígitos, empezar con 6 o 7, y contener solo números válidos.",
    )
    .refine((value) => !/^(\d)\1{7}$/.test(value), "Ingrese un celular valido"),
  email: z
    .string()
    .email("El correo no es válido")
    .max(50, "Debe tener menos de 50 caracteres"),
  birthDate: z.date().refine((date) => {
    const today = new Date();
    const twoYearsAgo = new Date(today.setFullYear(today.getFullYear() - 2));
    return date <= twoYearsAgo;
  }, "La fecha de nacimiento debe ser mayor a hace 2 años"),
  addressLine: z
    .string()
    .min(3, "Debe tener más de 3 caracteres")
    .max(50, "Debe tener menos de 50 caracteres"),
  addressCity: z
    .string()
    .min(3, "Debe tener más de 3 caracteres")
    .max(50, "Debe tener menos de 50 caracteres"),
  identification: z
    .string()
    .regex(/^\d+$/, "El carnet debe contener solo números"),
});
export default personValidation;
