"use server";
import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import personValidation from "../zod_models/personValidation";

export async function handleSubmit(formData: FormData) {
  const prisma = new PrismaClient();
  const allergies: {
    substance: string;
    reaction: string;
    severity: string;
    notes: string;
  }[] = [];

  let i = 0;
  while (formData.get(`allergies[${i}][substance]`)) {
    allergies.push({
      substance: formData.get(`allergies[${i}][substance]`)?.toString() || "",
      reaction: formData.get(`allergies[${i}][reaction]`)?.toString() || "",
      severity: formData.get(`allergies[${i}][severity]`)?.toString() || "mild", // valor por defecto
      notes: formData.get(`allergies[${i}][notes]`)?.toString() || "",
    });
    i++;
  }
  const data = {
    photoUrl: formData.get("photoUrl")?.toString() || "",
    firstName: formData.get("firstName")?.toString() || "",
    secondName: formData.get("secondName")?.toString() || "",
    familyName: formData.get("familyName")?.toString() || "",
    gender: formData.get("gender")?.toString() || "",
    email: formData.get("email")?.toString() || "",
    birthDate: formData.get("birthDate")?.toString() || "",
    addressLine: formData.get("addressLine")?.toString() || "",
    addressCity: formData.get("addressCity")?.toString() || "",
    maritalStatus: formData.get("maritalStatus")?.toString() || "",
    identification: formData.get("identification")?.toString() || "",
    username: formData.get("username")?.toString() || "",
    password: formData.get("password")?.toString() || "",
    confirmPassword: formData.get("confirmPassword")?.toString() || "",
    allergies: allergies,
  };
  const result = personValidation.safeParse(data);
  if (!result.success) {
    return {
      success: false,
      errors: result.error.format(),
    };
  }
  const rolPaciente = await prisma.rol.findFirst({
    where: {
      roleName: "Paciente",
    },
  });
  await prisma.person.create({
    data: {
      photoUrl: data.photoUrl,
      firstName: data.firstName,
      active: true,
      secondName: data.secondName,
      familyName: data.familyName,
      gender: data.gender,
      email: data.email,
      birthDate: new Date(data.birthDate),
      addressLine: data.addressLine,
      addressCity: data.addressCity,
      maritalStatus: data.maritalStatus === "Married" ? "Married" : "Single",
      identification: data.identification,
      username: data.username,
      password: data.password,
      allergies: {
        create: data.allergies.map((allergy) => ({
          substance: allergy.substance,
          reaction: allergy.reaction,
          severity: allergy.severity as any,
          notes: allergy.notes,
        })),
      },
      rolID: rolPaciente ? rolPaciente.id : "",
    },
  });
  return { success: true };
}
