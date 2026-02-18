import React, { useEffect } from "react";
import { X } from "lucide-react";

export function Modal({
    open,
    title,
    children,
    onClose,
}: {
    open: boolean;
    title: string;
    children: React.ReactNode;
    onClose: () => void;
}) {
    useEffect(() => {
        if (!open) return;
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [open, onClose]);

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 grid place-items-center p-4">
            <button
                className="absolute inset-0 bg-black/40"
                aria-label="Close"
                onClick={onClose}
            />
            <div className="relative w-full max-w-lg rounded-2xl border border-black/10 bg-white shadow-xl">
                <div className="flex items-center justify-between border-b border-black/5 px-5 py-4">
                    <h4 className="text-sm font-semibold text-zinc-900">{title}</h4>
                    <button
                        onClick={onClose}
                        className="rounded-lg p-2 text-zinc-500 hover:bg-zinc-100 hover:text-zinc-700"
                        aria-label="Close modal"
                    >
                        <X className="h-4 w-4" />
                    </button>
                </div>
                <div className="p-5">{children}</div>
            </div>
        </div>
    );
}
