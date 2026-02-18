import { useState } from "react";
import { Link2, Unlink } from "lucide-react";
import { providerMeta } from "../../../lib/utils";
import { ConfirmDialog } from "./ConfirmDialog";
import { useAsync } from "../../../hooks/useAsync";

export function ProviderList({
    loading,
    providerIds,
    onUnlinkProvider,
}: {
    loading: boolean;
    providerIds: string[];
    onUnlinkProvider?: (providerId: string) => Promise<void>;
}) {
    const [unlinkId, setUnlinkId] = useState<string | null>(null);
    const unlinkAsync = useAsync(async (pid: string) => {
        if (!onUnlinkProvider) return;
        await onUnlinkProvider(pid);
    });

    return (
        <section className="rounded-2xl border border-black/5 bg-white p-5 sm:p-6">
            <div className="flex items-center gap-2">
                <Link2 className="h-5 w-5 text-zinc-800" />
                <h4 className="text-sm font-semibold text-zinc-900">Connected sign-in providers</h4>
            </div>
            <p className="mt-1 text-sm text-zinc-600">
                Manage the accounts you can use to sign in.
            </p>

            <div className="mt-4 space-y-2">
                {loading ? (
                    <div className="h-10 w-full animate-pulse rounded-xl bg-zinc-100" />
                ) : providerIds.length === 0 ? (
                    <p className="text-sm text-zinc-500">No providers found.</p>
                ) : (
                    providerIds.map((pid) => {
                        const { label, Icon } = providerMeta(pid);
                        return (
                            <div
                                key={pid}
                                className="flex items-center justify-between rounded-xl border border-black/5 bg-white px-4 py-3"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="grid h-9 w-9 place-items-center rounded-full bg-zinc-100 text-zinc-700">
                                        <Icon className="h-4 w-4" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-zinc-900">{label}</p>
                                        <p className="text-xs text-zinc-500">{pid}</p>
                                    </div>
                                </div>

                                {onUnlinkProvider ? (
                                    <button
                                        className="inline-flex items-center gap-2 rounded-xl border border-black/10 bg-white px-3 py-2 text-xs font-medium text-zinc-800 hover:bg-zinc-50"
                                        onClick={() => setUnlinkId(pid)}
                                    >
                                        <Unlink className="h-4 w-4" />
                                        Unlink
                                    </button>
                                ) : (
                                    <span className="text-xs text-zinc-500">Managed by provider</span>
                                )}
                            </div>
                        );
                    })
                )}
            </div>

            <ConfirmDialog
                open={!!unlinkId}
                title="Unlink provider"
                description="Unlinking can prevent you from signing in. Only unlink if you have another sign-in method available."
                confirmText="Unlink"
                danger
                loading={unlinkAsync.loading}
                onClose={() => setUnlinkId(null)}
                onConfirm={async () => {
                    if (!unlinkId) return;
                    try {
                        await unlinkAsync.run(unlinkId);
                        setUnlinkId(null);
                    } catch { }
                }}
            />
        </section>
    );
}
