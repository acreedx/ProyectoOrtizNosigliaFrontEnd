import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
<<<<<<<< HEAD:src/utils/upload_image.tsx
import { storage } from "../../firebase.config";
========
import { storage } from "../../../../../firebase.config";
>>>>>>>> 94210b95966e13d3b0e080002bee3f21a5448582:src/app/api/pages/utils/upload_image.tsx

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
