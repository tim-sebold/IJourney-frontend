import { useRef } from "react";
import { Camera, ShieldCheck, User as UserIcon } from "lucide-react";
import type { Role } from "../../../lib/types";
import { extractAvatarBasedonName } from "../../../lib/utils";

type Mode = "view" | "edit";

export function ProfileIdentityRow({
    mode,
    name,
    email,
    avatarBase64,
    role,
    currentMilestoneLabel,
    onAvatarFile,
}: {
    mode: Mode;
    name: string;
    email: string;
    avatarBase64?: string;
    role: Role;
    currentMilestoneLabel?: string;
    onAvatarFile?: (file: File) => Promise<void>;
}) {
    const inputRef = useRef<HTMLInputElement | null>(null);

    return (
        <div className="flex items-center gap-4">
            <div className="relative">
                {avatarBase64 ? (
                    <img
                        src={avatarBase64}
                        alt={name}
                        className="h-20 w-20 rounded-full object-cover"
                    />
                ) : (
                    <div className="h-20 w-20 rounded-full bg-ib-1 grid place-items-center text-zinc-600">
                        {
                            name ? (
                                <div className=""><span className="font-bold text-white text-[30px]">{extractAvatarBasedonName(name)}</span></div>
                            ) : <UserIcon className="w-1/2 h-1/2" />
                        }
                    </div>
                )}

                {onAvatarFile && (
                    <>
                        <input
                            ref={inputRef}
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={async (e: React.ChangeEvent<HTMLInputElement>) => {
                                const f = e.target.files?.[0];
                                if (!f) return;
                                await onAvatarFile(f);
                                e.target.value = "";
                            }}
                        />
                        <button
                            type="button"
                            disabled={mode !== "edit"}
                            onClick={() => inputRef.current?.click()}
                            className={[
                                "absolute -bottom-1 -right-1 rounded-full border border-black/10 bg-white p-1.5 shadow-sm transition",
                                mode === "edit"
                                    ? "text-zinc-700 hover:text-zinc-900"
                                    : "text-zinc-300 cursor-not-allowed",
                            ].join(" ")}
                            aria-label="Upload avatar"
                            title="Upload avatar"
                        >
                            <Camera className="h-4 w-4" />
                        </button>
                    </>
                )}
            </div>

            <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                    <h2 className="truncate text-lg font-semibold text-zinc-900">{name || "Your Name"}</h2>

                    <span className="inline-flex items-center gap-1 rounded-full bg-green-500 px-2 py-0.5 text-xs text-white">
                        <ShieldCheck className="h-3.5 w-3.5" />
                        {role}
                    </span>

                    {currentMilestoneLabel ? (
                        <span className="rounded-full bg-sky-50 px-2 py-0.5 text-xs text-sky-700">
                            Current: {currentMilestoneLabel}
                        </span>
                    ) : null}
                </div>

                <p className="mt-0.5 truncate text-sm text-zinc-500">{email}</p>
            </div>
        </div>
    );
}
