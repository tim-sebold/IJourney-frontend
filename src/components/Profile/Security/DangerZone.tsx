import { useState } from "react";
import { Trash2, AlertTriangle } from "lucide-react";
import { ConfirmDialog } from "./ConfirmDialog";
import { Modal } from "./Modal";
import { useAsync } from "../../../hooks/useAsync";
import { Button } from "../../../elements";

export function DangerZone({
    loading,
    onExport,
    onDeleteAccount,
    email,
}: {
    loading: boolean;
    onExport: () => Promise<void>;
    onDeleteAccount: (confirmText: string) => Promise<void>;
    email: string;
}) {
    const exportAsync = useAsync(onExport);
    const deleteAsync = useAsync(onDeleteAccount);

    const [deleteOpen, setDeleteOpen] = useState(false);
    const [exportConfirmOpen, setExportConfirmOpen] = useState(false);

    const [confirmText, setConfirmText] = useState("");
    const required = "DELETE";

    return (
        <section className="rounded-2xl border border-rose-200 bg-rose-50/40 p-5 sm:p-6">
            <div className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-rose-700" />
                <h4 className="text-sm font-semibold text-zinc-900">Danger zone</h4>
            </div>
            <p className="mt-1 text-sm text-zinc-700">
                Permanently delete your account.
            </p>

            <div className="mt-4 flex justify-end">
                {/* <button
                    type="button"
                    disabled={loading || exportAsync.loading}
                    onClick={() => setExportConfirmOpen(true)}
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-black/10 bg-white px-4 py-3 text-sm font-medium text-zinc-900 hover:bg-zinc-50 disabled:opacity-60"
                >
                    <Download className="h-4 w-4" />
                    {exportAsync.loading ? "Requesting export..." : "Download my data"}
                </button> */}

                <Button
                    type="button"
                    disabled={loading}
                    onClick={() => {
                        setConfirmText("");
                        setDeleteOpen(true);
                    }}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-rose-600 px-4 py-3 text-sm font-medium text-white hover:bg-rose-700 disabled:opacity-60"
                >
                    <Trash2 className="h-4 w-4" />
                    Delete account
                </Button>
            </div>

            <ConfirmDialog
                open={exportConfirmOpen}
                title="Request data export?"
                description="We’ll prepare a downloadable export of your profile, worksheets, and responses. This may take a few minutes."
                confirmText="Request export"
                loading={exportAsync.loading}
                onClose={() => setExportConfirmOpen(false)}
                onConfirm={async () => {
                    try {
                        await exportAsync.run();
                        setExportConfirmOpen(false);
                    } catch { }
                }}
            />

            <Modal open={deleteOpen} title="Delete account" onClose={() => setDeleteOpen(false)}>
                <div className="space-y-3">
                    <p className="text-sm text-zinc-700">
                        This permanently deletes your account and associated course data (worksheets, reflections,
                        and chat history), except where retention is required for security/compliance.
                    </p>

                    <div className="rounded-xl border border-rose-200 bg-rose-50 p-3 text-sm text-rose-800">
                        Signed in as <span className="font-semibold">{email || "—"}</span>
                    </div>

                    <div>
                        <label className="text-xs font-medium text-zinc-600">
                            Type <span className="font-semibold">{required}</span> to confirm
                        </label>
                        <input
                            value={confirmText}
                            onChange={(e) => setConfirmText(e.target.value)}
                            className="mt-2 w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm outline-none focus:border-rose-300"
                            placeholder="DELETE"
                        />
                    </div>

                    {deleteAsync.error ? <p className="text-sm text-rose-600">{deleteAsync.error}</p> : null}

                    <div className="flex items-center justify-end gap-2 pt-2">
                        <button
                            onClick={() => setDeleteOpen(false)}
                            className="rounded-xl border border-black/10 bg-white px-4 py-2 text-sm font-medium text-zinc-800 hover:bg-zinc-50"
                            disabled={deleteAsync.loading}
                        >
                            Cancel
                        </button>
                        <button
                            disabled={deleteAsync.loading || confirmText !== required}
                            onClick={async () => {
                                if (confirmText !== required) return;
                                try {
                                    await deleteAsync.run(confirmText);
                                    setDeleteOpen(false);
                                } catch { }
                            }}
                            className={[
                                "rounded-xl px-4 py-2 text-sm font-medium text-white",
                                confirmText !== required || deleteAsync.loading
                                    ? "bg-zinc-300 cursor-not-allowed"
                                    : "bg-rose-600 hover:bg-rose-700",
                            ].join(" ")}
                        >
                            {deleteAsync.loading ? "Deleting..." : "Delete permanently"}
                        </button>
                    </div>
                </div>
            </Modal>
        </section>
    );
}
