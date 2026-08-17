import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { auth, storage } from "../firebaseConfig";

export async function uploadAvatar(file: File): Promise<string> {
    const user = auth.currentUser;
    if (!user) throw new Error("Not authenticated");

    if (!file.type.startsWith("image/")) throw new Error("Only image files are allowed");
    if (file.size > 5 * 1024 * 1024) throw new Error("Image must be under 5MB");

    const extension = file.name.split('.').pop()?.toLowerCase() || 'jpg';
    const avatarRef = ref(storage, `avatars/${user.uid}/profile.${extension}`);
    await uploadBytes(avatarRef, file, { contentType: file.type });
    return getDownloadURL(avatarRef);
}
