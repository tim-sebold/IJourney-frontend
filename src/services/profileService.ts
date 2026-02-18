import { auth } from "../firebaseConfig";

function fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onerror = () => reject(new Error("Failed to read file"));
        reader.onload = () => resolve(String(reader.result));
        reader.readAsDataURL(file);
    });
}

export async function uploadAvatar(file: File): Promise<string> {
    const user = auth.currentUser;
    if (!user) throw new Error("Not authenticated");

    if (!file.type.startsWith("image/")) throw new Error("Only image files are allowed");
    if (file.size > 5 * 1024 * 1024) throw new Error("Image must be under 5MB");

    const base64 = await fileToBase64(file);

    return base64;
}
