import { z } from "zod";

const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

const changePasswordValidation = z
  .object({
    username: z
      .string()
      .min(3, "Debe tener más de 3 caracteres")
      .max(50, "Debe tener menos de 50 caracteres"),
    password: z.string().min(1, "El password no puede estar vacío"),
    newpassword: z
      .string()
      .min(6, "La contraseña debe tener al menos 6 caracteres")
      .max(50, "Debe tener menos de 50 caracteres")
      .regex(
        passwordRegex,
        "La contraseña debe contener al menos una letra mayúscula, una letra minúscula, un número y un carácter especial.",
      ),
    confirmnewpassword: z
      .string()
      .min(1, "La confirmación del nuevo password no puede estar vacío"),
  })
  .refine((data) => data.newpassword === data.confirmnewpassword, {
    message: "La nueva contraseñas no coincide con la confirmación",
    path: ["confirmnewpassword"],
  })
  .refine((data) => data.password !== data.newpassword, {
    message: "La nueva contraseña no puede ser igual a la actual",
    path: ["newpassword"],
  });
export default changePasswordValidation;
