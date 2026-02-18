import { getAuth } from "firebase/auth";
import { getFirestore, doc, updateDoc, serverTimestamp, setDoc } from "firebase/firestore";

export async function requestAccountDeletion(confirmText: string) {
  if (confirmText !== "DELETE") {
    throw new Error("Confirmation text invalid");
  }

  const auth = getAuth();
  const user = auth.currentUser;
  if (!user) throw new Error("Not authenticated");

  const db = getFirestore();

  await setDoc(doc(db, "users", user.uid, "deletion", "request"), {
    status: "requested",
    requestedAt: serverTimestamp(),
  });
}


export async function updatePrivacySettings(
  patch: Record<string, any>
) {
  const auth = getAuth();
  const user = auth.currentUser;
  if (!user) throw new Error("Not authenticated");

  const db = getFirestore();

  await updateDoc(doc(db, "users", user.uid), {
    preferences: patch,
    updatedAt: serverTimestamp(),
  });
}

export async function requestDataExport() {
  const auth = getAuth();
  const user = auth.currentUser;
  if (!user) throw new Error("Not authenticated");

  const db = getFirestore();

  await setDoc(doc(db, "users", user.uid, "exports", "latest"), {
    status: "pending",
    requestedAt: serverTimestamp(),
  });
}
