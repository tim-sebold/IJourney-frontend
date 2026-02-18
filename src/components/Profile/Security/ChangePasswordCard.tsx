import { useMemo, useState } from "react";
import { KeyRound, AlertTriangle } from "lucide-react";
import { Modal } from "./Modal";
import { useAsync } from "../../../hooks/useAsync";
import { Button } from "../../../elements";
import toast from "react-hot-toast";

function passwordStrength(pw: string) {
    const score =
        (pw.length >= 8 ? 1 : 0) +
        (/[A-Z]/.test(pw) ? 1 : 0) +
        (/[a-z]/.test(pw) ? 1 : 0) +
        (/\d/.test(pw) ? 1 : 0) +
        (/[^A-Za-z0-9]/.test(pw) ? 1 : 0);
    return score;
}

export function ChangePasswordCard({
    enabled,
    reasonIfDisabled,
    onChangePassword,
}: {
    enabled: boolean;
    reasonIfDisabled?: string;
    onChangePassword: (currentPassword: string, newPassword: string) => Promise<void>;
}) {
    const [open, setOpen] = useState(false);
    const [currentPw, setCurrentPw] = useState("");
    const [newPw, setNewPw] = useState("");
    const [confirmPw, setConfirmPw] = useState("");
    const [localError, setLocalError] = useState<string | null>(null);

    const { run, loading, error, setError } = useAsync(onChangePassword);

    const strength = useMemo(() => passwordStrength(newPw), [newPw]);
    const strengthLabel = useMemo(() => {
        if (!newPw) return "—";
        if (strength <= 2) return "Weak";
        if (strength === 3) return "Okay";
        if (strength === 4) return "Strong";
        return "Very strong";
    }, [strength, newPw]);

    const canSubmit =
        enabled &&
        currentPw.length > 0 &&
        newPw.length > 0 &&
        confirmPw.length > 0 &&
        newPw === confirmPw &&
        strength >= 3;

    return (
        <section className="rounded-2xl border border-black/5 bg-white p-5 sm:p-6">
            <div className="flex items-start justify-between gap-4">
                <div>
                    <div className="flex items-center gap-2">
                        <KeyRound className="h-5 w-5 text-zinc-800" />
                        <h4 className="text-sm font-semibold text-zinc-900">Change password</h4>
                    </div>
                    <p className="mt-1 text-sm text-zinc-600">
                        Update your password to keep your account secure.
                    </p>
                    {!enabled && (
                        <p className="mt-2 text-sm text-zinc-500">
                            <span className="inline-flex items-center gap-1">
                                <AlertTriangle className="h-4 w-4" />
                                {reasonIfDisabled ?? "This action is unavailable."}
                            </span>
                        </p>
                    )}
                </div>

                <Button
                    type="button"
                    disabled={!enabled}
                    onClick={() => {
                        setOpen(true);
                        setLocalError(null);
                        setError(null);
                        setCurrentPw("");
                        setNewPw("");
                        setConfirmPw("");
                    }}
                    className={[
                        "rounded-xl px-4 py-2 text-sm font-medium text-white cursor-pointer",
                        enabled ? "bg-sky-600 hover:bg-sky-700" : "bg-zinc-300 cursor-not-allowed",
                    ].join(" ")}
                >
                    Change
                </Button>
            </div>

            <Modal open={open} title="Change password" onClose={() => setOpen(false)}>
                <form className="space-y-4">
                    <input type="text" id="username" autoComplete="username" className="hidden" />
                    <Field
                        label="Current password"
                        type="password"
                        value={currentPw}
                        onChange={setCurrentPw}
                        autoComplete="current-password"
                    />
                    <Field
                        label="New password"
                        type="password"
                        value={newPw}
                        onChange={setNewPw}
                        autoComplete="new-password"
                        hint={`Strength: ${strengthLabel} (min: 8 chars, mix letters/numbers)`}
                    />
                    <Field
                        label="Confirm new password"
                        type="password"
                        value={confirmPw}
                        autoComplete="confirm-new-password"
                        onChange={setConfirmPw}
                    />

                    {newPw && confirmPw && newPw !== confirmPw && (
                        <p className="text-sm text-rose-600">Passwords do not match.</p>
                    )}

                    {(localError || error) && (
                        <p className="text-sm text-rose-600">{localError ?? error}</p>
                    )}

                    <div className="flex items-center justify-end gap-2 pt-2">
                        <Button
                            onClick={() => setOpen(false)}
                            className="rounded-xl border border-black/10 bg-white px-4 py-2 text-sm font-medium text-zinc-800 hover:bg-zinc-50"
                            disabled={loading}
                        >
                            Cancel
                        </Button>
                        <Button
                            disabled={!canSubmit || loading}
                            onClick={async () => {
                                setLocalError(null);
                                if (strength < 3) {
                                    setLocalError("Please choose a stronger password.");
                                    return;
                                }
                                try {
                                    await run(currentPw, newPw);
                                    toast.success("Your password was updated successfully.")
                                    setOpen(false);
                                } catch {
                                    setCurrentPw("");
                                }
                            }}
                            className={[
                                "rounded-xl px-4 py-2 text-sm font-medium text-white cursor-pointer",
                                !canSubmit || loading
                                    ? "bg-zinc-300 cursor-not-allowed"
                                    : "bg-sky-600 hover:bg-sky-700",
                            ].join(" ")}
                        >
                            {loading ? "Updating..." : "Update password"}
                        </Button>
                    </div>
                </form>
            </Modal>
        </section>
    );
}

function Field({
    label,
    value,
    onChange,
    type = "text",
    hint,
    autoComplete,
}: {
    label: string;
    value: string;
    onChange: (v: string) => void;
    type?: string;
    hint?: string;
    autoComplete: string
}) {
    return (
        <div>
            <label className="text-xs font-medium text-zinc-600">{label}</label>
            <input
                type={type}
                value={value || ""}
                onChange={(e) => onChange(e.target.value)}
                className="mt-2 w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm outline-none focus:border-sky-300"
                autoComplete={autoComplete}
            />
            {hint ? <p className="mt-1 text-xs text-zinc-500">{hint}</p> : null}
        </div>
    );
}
