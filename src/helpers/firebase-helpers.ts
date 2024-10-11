import firebaseApp from "@/config/firebase-config";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

export const uploadFilesToFirebaseAndReturnUrls = async (files: File[]) => {
  try {
    const storage = getStorage(firebaseApp);

    const uploadedFilesReferences = await Promise.all(
      files.map(async (file) => {
        const storageRef = ref(storage, `images/${file.name}`);
        await uploadBytes(storageRef, file);
        return storageRef;
      })
    );

    const downloadUrls = await Promise.all(
      uploadedFilesReferences.map(async (ref) => {
        return await getDownloadURL(ref);
      })
    );

    return downloadUrls;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
