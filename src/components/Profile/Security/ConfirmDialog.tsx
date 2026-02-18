import { Modal } from "./Modal";

export function ConfirmDialog({
    open,
    title,
    description,
    confirmText = "Confirm",
    cancelText = "Cancel",
    danger,
    onConfirm,
    onClose,
    loading,
}: {
    open: boolean;
    title: string;
    description: string;
    confirmText?: string;
    cancelText?: string;
    danger?: boolean;
    loading?: boolean;
    onConfirm: () => Promise<void> | void;
    onClose: () => void;
}) {
    return (
        <Modal open={open} title={title} onClose={onClose}>
            <p className="text-sm text-zinc-700">{description}</p>

            <div className="mt-5 flex items-center justify-end gap-2">
                <button
                    onClick={onClose}
                    className="rounded-xl border border-black/10 bg-white px-4 py-2 text-sm font-medium text-zinc-800 hover:bg-zinc-50"
                    disabled={loading}
                >
                    {cancelText}
                </button>
                <button
                    onClick={() => onConfirm()}
                    disabled={loading}
                    className={[
                        "rounded-xl px-4 py-2 text-sm font-medium text-white",
                        danger ? "bg-rose-600 hover:bg-rose-700" : "bg-sky-600 hover:bg-sky-700",
                        loading ? "opacity-60 cursor-not-allowed" : "",
                    ].join(" ")}
                >
                    {loading ? "Working..." : confirmText}
                </button>
            </div>
        </Modal>
    );
}
