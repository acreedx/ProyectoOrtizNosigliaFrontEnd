"use server";
import { PrismaClient } from "@prisma/client";
import personValidation from "../zod_models/personValidation";
import personUpdateValidation from "../zod_models/personUpdateValidation";
import { revalidatePath } from "next/cache";

export async function updateUserDashboard(formData: FormData) {
  const prisma = new PrismaClient();
  const data = {
    userId: formData.get("userId")?.toString() || "",
    firstName: formData.get("firstName")?.toString() || "",
    secondName: formData.get("secondName")?.toString() || "",
    familyName: formData.get("familyName")?.toString() || "",
    phone: formData.get("phone")?.toString() || "",
    mobile: formData.get("mobile")?.toString() || "",
    gender: formData.get("gender")?.toString() || "",
    email: formData.get("email")?.toString() || "",
    birthDate: new Date(formData.get("birthDate")?.toString() || ""),
    addressLine: formData.get("addressLine")?.toString() || "",
    addressCity: formData.get("addressCity")?.toString() || "",
    maritalStatus: formData.get("maritalStatus")?.toString() || "",
    identification: formData.get("identification")?.toString() || "",
    rolID: formData.get("rol")?.toString() || "",
  };

  const result = personUpdateValidation.safeParse(data);
  if (!result.success) {
    return {
      success: false,
      errors: result.error.format(),
    };
  }

  try {
    const updatedPerson = await prisma.person.update({
      where: { id: data.userId },
      data: {
        firstName: data.firstName,
        secondName: data.secondName,
        familyName: data.familyName,
        gender: data.gender,
        email: data.email,
        phone: data.phone,
        mobile: data.mobile,
        addressLine: data.addressLine,
        addressCity: data.addressCity,
        maritalStatus: data.maritalStatus === "Married" ? "Married" : "Single",
        identification: data.identification,
        rolID: data.rolID,
      },
    });
    revalidatePath("/dashboard/pages/usuarios");
    return { success: true, updatedPerson };
  } catch (error) {
    return { success: false, error: "Error actualizando el usuario" };
  }
}
