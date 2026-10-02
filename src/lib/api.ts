import { auth } from "../firebaseConfig";
import { API_URL } from "../config/config";

/**
 * A non-2xx response. `status` lets a caller tell "nothing saved yet" (404) from
 * a real failure, and `body` carries whatever detail the server attached — the
 * certificate gate, for one, lists the steps still outstanding.
 */
export class ApiError extends Error {
    readonly status: number;
    readonly body: unknown;

    constructor(message: string, status: number, body: unknown) {
        super(message);
        this.name = "ApiError";
        this.status = status;
        this.body = body;
    }
}

async function toApiError(res: Response): Promise<ApiError> {
    let body: unknown = null;
    try { body = await res.json(); } catch { /* Preserve the HTTP status text. */ }
    const detail = body as { error?: unknown; message?: unknown } | null;
    const message = [detail?.error, detail?.message].find((value) => typeof value === "string");
    return new ApiError((message as string | undefined) ?? res.statusText, res.status, body);
}

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
    if (!res.ok) throw await toApiError(res);
    return res.json();
}

export async function apiBlob(path: string, init?: RequestInit): Promise<Blob> {
  const token = await auth.currentUser?.getIdToken();

  const res = await fetch(`${API_URL}${path}`, {
    ...init,
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(init?.headers || {}),
    },
  });

  if (!res.ok) throw await toApiError(res);

  return res.blob();
}
