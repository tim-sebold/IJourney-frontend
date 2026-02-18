import {
    getAuth,
    EmailAuthProvider,
    reauthenticateWithCredential,
    updatePassword,
} from "firebase/auth";

export async function changePassword(
    currentPassword: string,
    newPassword: string
) {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user || !user.email) {
        throw new Error("User not authenticated");
    }

    try {
        const credential = EmailAuthProvider.credential(
            user.email,
            currentPassword
        );

        await reauthenticateWithCredential(user, credential);
        await updatePassword(user, newPassword);
    } catch (error: any) {
        switch (error.code) {
            case "auth/wrong-password":
                throw new Error("Your current password is incorrect.");

            case "auth/too-many-requests":
                throw new Error("Too many attempts. Please try again later.");

            case "auth/requires-recent-login":
                throw new Error("Please log in again before changing your password.");

            case "auth/weak-password":
                throw new Error("Your new password is too weak.");

            case "auth/user-mismatch":
                throw new Error("Authentication mismatch. Please log in again.");

            case "auth/invalid-credential":
                throw new Error("Your current password is incorrect.");

            default:
                throw new Error(error.message || "Failed to change password.");
        }
    }
}
