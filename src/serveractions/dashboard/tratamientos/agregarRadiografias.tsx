"use server";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { prisma } from "@/prisma";
import { ImagingStudy } from "@prisma/client";
import { storage } from "../../../../firebase.config";

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

export async function agregarRadiografias(
  imagingStudies: ImagingStudy[],
  files: { [key: string]: File[] },
) {
  try {
    console.log("Archivos");
    console.log(files);
    const updatedImagingStudies = await Promise.all(
      imagingStudies.map(async (study) => {
        const fileUrls = await Promise.all(
          files[study.id]?.map((file) => subirArchivoAFirebase(file)) || [],
        );
        await prisma.imagingStudy.create({
          data: {
            ...study,
            media: fileUrls,
          },
        });

        return { ...study, media: fileUrls };
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
