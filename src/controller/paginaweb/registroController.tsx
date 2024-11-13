"use server";
import { Allergy, PrismaClient } from "@prisma/client";
import { subirFotoDePerfil } from "../../utils/upload_image";
import personValidation from "../../models/personValidation";
import { hashPassword } from "../../utils/password_hasher";
import { getPasswordExpiration } from "../../utils/get_password_expiration";
import { generatePassword } from "../../utils/password_generator";
import { sendEmail } from "@/utils/mailer";
import { odontogramaPorDefecto } from "@/utils/default_odontograma";
import { accountPorDefecto } from "@/utils/default_account";

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
    const reaction =
      formData.get(`allergies[${i}][reaction]`)?.toString() || "";
    const severity =
      reaction === "mild"
        ? "Baja"
        : reaction === "moderate"
          ? "Media"
          : reaction === "severe"
            ? "Severa"
            : "Baja";
    allergies.push({
      substance: formData.get(`allergies[${i}][substance]`)?.toString() || "",
      reaction: severity,
      severity: formData.get(`allergies[${i}][reaction]`)?.toString() || "",
      notes: formData.get(`allergies[${i}][notes]`)?.toString() || "",
    });
    i++;
  }
  const data = {
    firstName: formData.get("firstName")?.toString() || "",
    secondName: formData.get("secondName")?.toString(),
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
    allergies: allergies,
  };
  const result = personValidation.safeParse(data);
  if (!result.success) {
    return {
      success: false,
      errors: result.error.format(),
    };
  }
  const AnyPersonUserName = await prisma.person.findFirst({
    where: {
      username: data.identification,
    },
  });
  if (AnyPersonUserName) {
    return {
      success: false,
      error: "Ya existe un Usuario con ese Carnet de Identidad",
    };
  }
  const AnyPersonIdentificationName = await prisma.person.findFirst({
    where: {
      identification: data.identification,
    },
  });
  if (AnyPersonIdentificationName) {
    return {
      success: false,
      error: "Ya existe un Usuario con ese Carnet de Identidad",
    };
  }
  const rolPaciente = await prisma.rol.findFirst({
    where: {
      roleName: "Paciente",
    },
  });
  if (!rolPaciente) {
    return {
      success: false,
      error: "No existe el rol de paciente registrado",
    };
  }

  const generatedPassword = await generatePassword(
    data.firstName,
    data.familyName,
    data.identification,
  );
  const newPerson = await prisma.person.create({
    data: {
      photoUrl: await subirFotoDePerfil(profilePicture),
      firstName: data.firstName,
      secondName: data.secondName,
      familyName: data.familyName,
      gender: data.gender,
      email: data.email,
      birthDate: new Date(data.birthDate),
      phone: data.phone,
      mobile: data.mobile,
      addressLine: data.addressLine,
      addressCity: data.addressCity,
      maritalStatus: data.maritalStatus,
      identification: data.identification,
      username: data.identification,
      password: await hashPassword(generatedPassword),
      passwordExpiration: getPasswordExpiration(),
      allergies: {
        create: data.allergies.map(
          (allergy) =>
            ({
              substance: allergy.substance,
              reaction: allergy.reaction,
              severity: allergy.severity,
              notes: allergy.notes,
            }) as Allergy,
        ),
      },
      odontograma: {
        create: odontogramaPorDefecto,
      },
      account: {
        create: accountPorDefecto,
      },
      rol: {
        connect: { id: rolPaciente.id },
      },
    },
  });
  await sendEmail({
    email: newPerson.email,
    subject: "Creación exitosa de cuenta",
    message: `
      ¡Hola ${newPerson.firstName}!
  
      Tu cuenta ha sido creada exitosamente. Aquí tienes tus credenciales:
  
      - **Nombre de usuario**: ${newPerson.username}
      - **Contraseña**: ${generatedPassword}
  
      Por favor, guarda esta información en un lugar seguro.
      
      Despues de tu primer inicio de sesión se te pedirá que cambies tu contraseña


      ¡Gracias por unirte a Ortiz Nosiglia!
    `,
  });
  return { success: true };
}
