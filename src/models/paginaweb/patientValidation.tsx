import { z } from "zod";

const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

const schema = z
  .object({
    firstName: z
      .string()
      .min(3, "Debe tener más de 3 caracteres")
      .max(50, "Debe tener menos de 50 caracteres"),
    secondName: z
      .string()
      .min(3, "Debe tener más de 3 caracteres")
      .max(50, "Debe tener menos de 50 caracteres")
      .optional(),
    familyName: z
      .string()
      .min(3, "Debe tener más de 3 caracteres")
      .max(50, "Debe tener menos de 50 caracteres"),
    phone: z
      .string()
      .length(7, "El teléfono debe tener 8 dígitos")
      .regex(
        /^(?!.*(\d)\1{7})[234]\d{6}$/,
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
        /^(?!.*(\d)\1{7})[67]\d{7}$/,
        "El celular debe tener 8 dígitos, empezar con 6 o 7, y contener solo números válidos.",
      )
      .refine(
        (value) => !/^(\d)\1{7}$/.test(value),
        "Ingrese un celular valido",
      ),
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
    username: z
      .string()
      .min(3, "Debe tener más de 3 caracteres")
      .max(50, "Debe tener menos de 50 caracteres"),
    password: z
      .string()
      .min(6, "La contraseña debe tener al menos 6 caracteres")
      .max(50, "Debe tener menos de 50 caracteres")
      .regex(
        passwordRegex,
        "La contraseña debe contener al menos una letra mayúscula, una letra minúscula, un número y un carácter especial.",
      ),
    confirmPassword: z
      .string()
      .min(6, "La confirmación de contraseña debe tener al menos 6 caracteres"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  });
export default schema;
