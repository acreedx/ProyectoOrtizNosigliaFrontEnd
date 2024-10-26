"use server";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

export async function crearCita(formData: FormData) {
  const session = await getServerSession(authOptions);
  if (!session) {
    throw new Error("No se ha encontrado la sesión.");
  }
  console.log(session.user.id);
  const data = {
    descripcion: formData.get("descripcion")?.toString() || "",
    fecha: formData.get("fecha")?.toString() || "",
    hora: formData.get("hora")?.toString() || "",
    doctor: formData.get("doctor")?.toString() || "",
  };
  console.log(data);
  revalidatePath("/paginaweb/citas");
}
