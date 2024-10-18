import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../../../../firebase.config";

export const subirFotoDePerfil = async (
  image: File | undefined,
): Promise<string> => {
  try {
    if (!image) {
      return "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg";
    }
    const storageRef = ref(storage, `images/${image.name}`);
    const snapshot = await uploadBytes(storageRef, image);
    const downloadURL = await getDownloadURL(snapshot.ref);
    return downloadURL;
  } catch (error) {
    console.log(error);
    return "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg";
  }
};
