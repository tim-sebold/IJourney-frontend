import { getAuth } from "firebase/auth";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { getFunctions, httpsCallable } from "firebase/functions";
import type { SessionInfo } from "../components/Profile/Security/SessionList";

export async function logoutAllDevices() {
  const functions = getFunctions();
  const revoke = httpsCallable(functions, "revokeAllSessions");
  await revoke();
}

function normalizeDevice(v: unknown): SessionInfo["device"] {
  if (v === "desktop" || v === "mobile" || v === "unknown") return v;
  return "unknown";
}

export async function fetchSessions(): Promise<SessionInfo[]> {
  const auth = getAuth();
  const user = auth.currentUser;
  if (!user) throw new Error("Not authenticated");

  const db = getFirestore();
  const snap = await getDocs(collection(db, "users", user.uid, "sessions"));

  return snap.docs.map((d) => {
    const data = d.data() as any;

    return {
      id: d.id,
      device: normalizeDevice(data.device),
      lastActiveAt: typeof data.lastActiveAt === "string" ? data.lastActiveAt : new Date().toISOString(),
      ip: typeof data.ip === "string" ? data.ip : undefined,
      city: typeof data.city === "string" ? data.city : undefined,
      country: typeof data.country === "string" ? data.country : undefined,
      current: Boolean(data.current),
    } satisfies SessionInfo;
  });
}
