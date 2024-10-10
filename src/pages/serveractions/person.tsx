"use server";
import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../../firebase.config";
import { subirFotoDePerfil } from "../utils/upload_image";
import personValidation from "../zod_models/personValidation";

export async function createPerson(formData: FormData) {
  const prisma = new PrismaClient();
  const profilePicture = formData.get("photoUrl") as File | undefined;
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
    username: formData.get("username")?.toString() || "",
    password: formData.get("password")?.toString() || "",
    confirmPassword: formData.get("confirmPassword")?.toString() || "",
    allergies: allergies,
  };
  console.log(data);
  const result = personValidation.safeParse(data);
  console.log(result);
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
  const personas = await prisma.person.findMany();
  console.log(personas);
  await prisma.person.create({
    data: {
      photoUrl: await subirFotoDePerfil(profilePicture),
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
