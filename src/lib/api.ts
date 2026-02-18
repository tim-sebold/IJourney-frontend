import { auth } from "../firebaseConfig";
import { API_URL } from "../config/config";

export async function api<T>(path: string, init?: RequestInit): Promise<T> {
    const token = await auth.currentUser?.getIdToken();
    const res = await fetch(`${API_URL}${path}`, {
        ...init,
        headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
            ...(init?.headers || {}),
        },
    });
    if (!res.ok) {
        let msg = res.statusText;
        try { msg = (await res.json()).error ?? msg; } catch { }
        throw new Error(msg);
    }
    return res.json();
}
