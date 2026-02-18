import { api } from '../lib/api';

export const login = async (idToken: string) => {
    try {
        const data = await api<{ message: string; user: any, success: boolean }>(`/api/auth/login`, {
            method: "POST",
            body: JSON.stringify({ idToken }),
        });
        return data;
    } catch (error: any) {
        console.error("Error Log In:", error);
        throw new Error("Failed to save introduction", {
            cause: error,
        });
    }
}

export const register = async (name: string, email: string, password: string, role: string) => {
    try {
        const data = await api<{ message: string; uid: string, success: boolean }>(`/api/auth/register`, {
            method: "POST",
            body: JSON.stringify({
                email,
                password,
                name,
                role
            }),
        });
        return data;
    } catch (error: any) {
        console.error("Error Sign Up:", error);

        throw new Error("Failed to sign up", {
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

export const forgotPassword = async (email: string) => {
    try {
        const data = await api<{ message: string, link: string, success: boolean }>(`/api/auth/forgot-password`, {
            method: "POST",
            body: JSON.stringify({ email }),
        });
        return data;
    } catch (error: any) {
        console.error("Error Forgot Password:", error);

        throw new Error("Failed to forgot password", {
            cause: error,
        });
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