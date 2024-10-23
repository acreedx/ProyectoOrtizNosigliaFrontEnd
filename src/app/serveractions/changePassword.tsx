"use server";
import { PrismaClient } from "@prisma/client";
import { hashPassword } from "../../utils/password_hasher";
import bcrypt from "bcryptjs";
import changePasswordValidation from "../../zod_models/changePasswordValidation";

export async function changePassword(formData: FormData) {
  const prisma = new PrismaClient();
  const data = {
    username: formData.get("username")?.toString() || "",
    password: formData.get("password")?.toString() || "",
    newpassword: formData.get("newpassword")?.toString() || "",
    confirmnewpassword: formData.get("confirmnewpassword")?.toString() || "",
  };
  const result = changePasswordValidation.safeParse(data);
  if (!result.success) {
    return {
      success: false,
      errors: result.error.format(),
    };
  }
  const person = await prisma.person.findFirst({
    where: {
      username: data.username,
    },
  });
  if (!person) {
    return {
      success: false,
      message: "Usuario no encontrado",
    };
  }
  console.log(data.password);
  const isPasswordValid = await bcrypt.compare(data.password, person.password);
  if (!isPasswordValid) {
    return {
      success: false,
      message: "Usuario o contraseña incorrectos",
    };
  }
  await prisma.person.update({
    where: {
      username: data.username,
    },
    data: {
      active: true,
      password: await hashPassword(data.newpassword),
    },
  });
  return { success: true };
}
