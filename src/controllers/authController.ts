import { api } from '../lib/api';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebaseConfig';

export const login = async (idToken: string) => {
    try {
        const data = await api<{ message: string; user: any, success: boolean }>(`/api/auth/login`, {
            method: "POST",
            body: JSON.stringify({ idToken }),
        });
        return data;
    } catch (error: any) {
        console.error("Error Log In:", error);
        throw new Error(error?.message ?? "Failed to log in", {
            cause: error,
        });
    }
}

export const register = async (name: string, email: string, password: string) => {
    try {
        const data = await api<{ message: string; uid: string, success: boolean }>(`/api/auth/register`, {
            method: "POST",
            body: JSON.stringify({
                email,
                password,
                name
            }),
        });
        return data;
    } catch (error: any) {
        console.error("Error Sign Up:", error);

        throw new Error(error?.message ?? "Failed to sign up", {
            cause: error,
        });
    }
}

export const logout = async () => {
    try {
        const data = await api<{ message: string, success: boolean }>(`/api/auth/logout`, { method: "POST" });
        return data;
    } catch (error: any) {
        console.error("Error Log Out:", error);

        throw new Error("Failed to log out", {
            cause: error,
        });
    }
}

/**
 * Firebase delivers the reset link out-of-band and the result is deliberately
 * identical whether or not the account exists, so this cannot be used to
 * enumerate users.
 *
 * The `oobCode` lands on the action URL configured in Firebase Console →
 * Authentication → Templates. Leave it at the default and Firebase hosts the
 * reset form itself; point it at `https://<origin>/update-password` to use the
 * in-app `UpdatePassword` page instead. `url` below is only the "continue"
 * destination shown after the reset completes.
 */
export const forgotPassword = async (email: string) => {
    try {
        await sendPasswordResetEmail(auth, email, { url: `${window.location.origin}/login` });
        return { message: "If that email exists, a reset link has been sent.", success: true };
    } catch (error: any) {
        console.error("Error Forgot Password:", error);
        return { message: "If that email exists, a reset link has been sent.", success: true };
    }
}

export const verified = async () => {
    try {
        // anywhere after user is logged in
        const data = await api<{ valid: boolean; uid: string; email: string }>(`/api/auth/verify`, {
            method: "GET",
        });
        return data;
    } catch (error: any) {
        console.error("Error Forgot Password:", error);

        throw new Error("Failed to forgot password", {
            cause: error,
        });
    }
}
