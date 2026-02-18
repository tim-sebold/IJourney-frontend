import { useEffect, useState } from "react";
import { Laptop, Smartphone, LogOut } from "lucide-react";
import { ConfirmDialog } from "./ConfirmDialog";
import { useAsync } from "../../../hooks/useAsync";

export type SessionInfo = {
    id: string;
    device: "desktop" | "mobile" | "unknown";
    ip?: string;
    city?: string;
    country?: string;
    lastActiveAt: string;
    current?: boolean;
};

function deviceIcon(device: SessionInfo["device"]) {
    if (device === "mobile") return Smartphone;
    if (device === "desktop") return Laptop;
    return Laptop;
}

export function SessionList({
    loading,
    sessions,
    onLoad,
    onLogoutAll,
}: {
    loading: boolean;
    sessions: SessionInfo[] | null;
    onLoad: () => Promise<void>;
    onLogoutAll: () => Promise<void>;
}) {
    const [confirmOpen, setConfirmOpen] = useState(false);
    const logoutAll = useAsync(onLogoutAll);

    useEffect(() => {
        if (loading) return;
        if (sessions == null) onLoad();
    }, [loading]);

    return (
        <section className="rounded-2xl border border-black/5 bg-white p-5 sm:p-6">
            <div className="flex items-start justify-between gap-4">
                <div>
                    <div className="flex items-center gap-2">
                        <Laptop className="h-5 w-5 text-zinc-800" />
                        <h4 className="text-sm font-semibold text-zinc-900">Active sessions</h4>
                    </div>
                    <p className="mt-1 text-sm text-zinc-600">
                        See where you’re signed in. Log out of all devices if something looks off.
                    </p>
                </div>

                <button
                    className={[
                        "inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium text-white",
                        "bg-zinc-900 hover:bg-zinc-800",
                        loading ? "opacity-60 cursor-not-allowed" : "",
                    ].join(" ")}
                    disabled={loading}
                    onClick={() => setConfirmOpen(true)}
                >
                    <LogOut className="h-4 w-4" />
                    Log out all
                </button>
            </div>

            <div className="mt-4 space-y-2">
                {loading || sessions == null ? (
                    <div className="h-12 w-full animate-pulse rounded-xl bg-zinc-100" />
                ) : sessions.length === 0 ? (
                    <p className="text-sm text-zinc-500">No sessions found.</p>
                ) : (
                    sessions.map((s) => {
                        const Icon = deviceIcon(s.device);
                        const label = new Date(s.lastActiveAt).toLocaleString();
                        const location = [s.city, s.country].filter(Boolean).join(", ");
                        return (
                            <div
                                key={s.id}
                                className="flex items-center justify-between rounded-xl border border-black/5 bg-white px-4 py-3"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="grid h-9 w-9 place-items-center rounded-full bg-zinc-100 text-zinc-700">
                                        <Icon className="h-4 w-4" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-zinc-900">
                                            {s.current ? "This device" : "Device session"}
                                        </p>
                                        <p className="text-xs text-zinc-500">
                                            Last active: {label}
                                            {location ? ` • ${location}` : ""}
                                            {s.ip ? ` • ${s.ip}` : ""}
                                        </p>
                                    </div>
                                </div>

                                {s.current ? (
                                    <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-xs text-emerald-700">
                                        current
                                    </span>
                                ) : (
                                    <span className="text-xs text-zinc-500">active</span>
                                )}
                            </div>
                        );
                    })
                )}
            </div>

            <ConfirmDialog
                open={confirmOpen}
                title="Log out of all devices?"
                description="This will sign you out everywhere. You’ll need to sign in again on each device."
                confirmText="Log out all"
                danger
                loading={logoutAll.loading}
                onClose={() => setConfirmOpen(false)}
                onConfirm={async () => {
                    try {
                        await logoutAll.run();
                        setConfirmOpen(false);
                    } catch { }
                }}
            />
        </section>
    );
}
