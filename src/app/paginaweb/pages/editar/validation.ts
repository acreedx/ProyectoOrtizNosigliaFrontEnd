import { z } from "zod";

const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
const schema = z
  .object({
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
    newpassword: z
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
  .refine((data) => data.newpassword === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  });
export default schema;
