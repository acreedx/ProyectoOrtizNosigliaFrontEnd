import { NextRequest, NextResponse } from "next/server";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../../../../firebase.config";
import { prisma } from "@/config/prisma";

const subirArchivoAFirebase = async (file: File): Promise<string> => {
  try {
    const storageRef = ref(storage, `images/${file.name}`);
    const snapshot = await uploadBytes(storageRef, file);
    return await getDownloadURL(snapshot.ref);
  } catch (error) {
    console.error("Error al subir el archivo a Firebase:", error);
    throw new Error("Error al subir el archivo a Firebase");
  }
};

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const imagingStudies = formData
      .getAll("imagingStudies")
      .map((study) => JSON.parse(study.toString()));
    const files = formData.getAll("files");
    const urls = await Promise.all(
      files.map((file: any) => subirArchivoAFirebase(file)),
    );

    const savedStudies = await Promise.all(
      imagingStudies.map(async (study: any) => {
        const newStudy = await prisma.imagingStudy.create({
          data: {
            active: study.active,
            description: "",
            personId: study.personId,
            carePlanId: study.carePlanId,
            media: urls,
          },
        });
        return newStudy;
      }),
    );
    return NextResponse.json({
      message: "Radiografías guardadas correctamente",
      savedStudies,
    });
  } catch (error) {
    console.error("Error al guardar radiografías:", error);
    return NextResponse.json(
      {
        error:
          "Error al subir archivos y guardar los estudios en la base de datos",
      },
      { status: 500 },
    );
  }
}
