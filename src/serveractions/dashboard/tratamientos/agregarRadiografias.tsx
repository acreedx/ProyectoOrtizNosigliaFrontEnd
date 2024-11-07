"use server";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { prisma } from "@/prisma";
import { ImagingStudy } from "@prisma/client";
import { storage } from "../../../../firebase.config";

// Función para subir un archivo a Firebase y obtener la URL
const subirArchivoAFirebase = async (file: File): Promise<string> => {
  try {
    if (!file) {
      return "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg";
    }
    const storageRef = ref(storage, `images/${file.name}`);
    const snapshot = await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);
    return downloadURL;
  } catch (error) {
    console.error("Error al subir el archivo a Firebase:", error);
    return "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg";
  }
};

// Server action para agregar radiografías
export async function agregarRadiografias(
  imagingStudies: ImagingStudy[],
  files: { [key: string]: File[] },
) {
  try {
    // Aquí se obtiene las URLs de los archivos
    const updatedImagingStudies = await Promise.all(
      imagingStudies.map(async (study) => {
        // Subir los archivos relacionados a este estudio
        const fileUrls = await Promise.all(
          files[study.id]?.map((file) => subirArchivoAFirebase(file)) || [],
        );

        // Crear un nuevo estudio de imagen con las URLs de los archivos
        await prisma.imagingStudy.create({
          data: {
            ...study,
            media: fileUrls, // Guardar las URLs en el campo 'media'
          },
        });

        return { ...study, media: fileUrls }; // Devolver el estudio actualizado con las URLs
      }),
    );

    return {
      message: "Radiografías registradas correctamente",
      updatedImagingStudies,
    };
  } catch (error) {
    console.error("Error al registrar las radiografías:", error);
    throw new Error("Error al registrar las radiografías");
  }
}
