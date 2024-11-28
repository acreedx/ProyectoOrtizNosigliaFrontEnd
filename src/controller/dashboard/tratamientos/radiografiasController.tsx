"use server";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { prisma } from "@/config/prisma";
import { storage } from "../../../../firebase.config";
import { getServerSession } from "next-auth";
import { authOptions } from "@/config/authOptions";

const CARPETA_IMAGENES = "radiografias/";
const subirArchivoAFirebase = async (file: File): Promise<string> => {
  const storageRef = ref(storage, `${CARPETA_IMAGENES}${file.name}`);
  const snapshot = await uploadBytes(storageRef, file);
  const downloadURL = await getDownloadURL(snapshot.ref);
  return downloadURL;
};

export async function agregarRadiografias(
  formData: FormData,
  carePlanId: string,
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      throw Error("El usuario no ha iniciado sesión");
    }
    for (let i = 0; formData.has(`estudios[${i}][descripcion]`); i++) {
      const descripcion = formData.get(`estudios[${i}][descripcion]`) as string;
      const fileInput = formData.getAll(`estudios[${i}][files]`) as File[];
      if (fileInput && fileInput.length > 0) {
        const fileUrls = await Promise.all(
          fileInput.map((file) => subirArchivoAFirebase(file)),
        );
        await prisma.imagingStudy.create({
          data: {
            description: descripcion,
            active: true,
            media: fileUrls,
            carePlanId: carePlanId,
          },
        });
      } else {
        throw new Error("No se han seleccionado archivos para el estudio.");
      }
    }
    return {
      success: true,
      message: "Radiografías registradas correctamente",
    };
  } catch (error: any) {
    console.error(error);
    throw new Error("Error al registrar las radiografías");
  }
}

export async function deshabilitarEstudio(imagingStudyId: string) {
  try {
    await prisma.imagingStudy.update({
      where: {
        id: imagingStudyId,
      },
      data: {
        active: false,
      },
    });
    return {
      message: "Éxito al deshabilitar el estudio",
    };
  } catch (error: any) {
    console.error(error);
    throw new Error("Error al registrar las radiografías");
  }
}

export async function habilitarEstudio(imagingStudyId: string) {
  try {
    await prisma.imagingStudy.update({
      where: {
        id: imagingStudyId,
      },
      data: {
        active: true,
      },
    });
    return {
      message: "Éxito al habilitar el estudio",
    };
  } catch (error: any) {
    console.error(error);
    throw new Error("Error al registrar las radiografías");
  }
}
