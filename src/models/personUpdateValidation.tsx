import { z } from "zod";

const personUpdateValidation = z.object({
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
    .length(7, "El teléfono debe tener 7 dígitos")
    .regex(
      /^(?!.*(\d)\1{7})[234]\d{6}$/,
      "El teléfono debe tener 7 dígitos, empezar con 2, 3 o 4, y contener solo números válidos.",
    )
    .refine(
      (value) => !/^(\d)\1{7}$/.test(value),
      "Ingrese un teléfono válido",
    ),
  mobile: z
    .string()
    .length(8, "El celular debe tener 8 dígitos")
    .regex(
      /^(?!.*(\d)\1{7})[67]\d{7}$/,
      "El celular debe tener 8 dígitos, empezar con 6 o 7, y contener solo números válidos.",
    )
    .refine((value) => !/^(\d)\1{7}$/.test(value), "Ingrese un celular válido"),
  gender: z
    .string()
    .min(1, "Debe seleccionar un género válido")
    .max(10, "El género debe tener menos de 10 caracteres"),
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
  maritalStatus: z
    .string()
    .min(3, "Debe tener más de 3 caracteres")
    .max(50, "Debe tener menos de 50 caracteres"),
  identification: z
    .string()
    .regex(/^\d+$/, "El carnet debe contener solo números"),
  rolID: z
    .string()
    .min(1, "Debe seleccionar un rol válido")
    .max(50, "El rol debe tener menos de 50 caracteres"),
});

export default personUpdateValidation;
