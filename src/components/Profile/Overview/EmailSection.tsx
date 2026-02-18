import { Mail } from "lucide-react";

export function EmailSection({
    email,
    lastUpdatedLabel,
}: {
    email: string;
    lastUpdatedLabel: string;
}) {
    return (
        <section className="pt-2">
            <h4 className="font-semibold text-zinc-900">My email Address</h4>

            <div className="mt-3 flex items-center gap-3">
                <div className="grid h-11 w-11 place-items-center rounded-full bg-sky-500/10 text-sky-700">
                    <Mail className="h-4 w-4" />
                </div>

                <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-zinc-900">{email}</p>
                    <p className="text-xs text-zinc-500">{lastUpdatedLabel}</p>
                </div>
            </div>

            <div className="mt-6 h-px w-full bg-black/5" />
            <div className="h-24" />
        </section>
    );
}
