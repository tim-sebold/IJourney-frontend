import { useEffect, useState } from "react";
import { Sliders, Info } from "lucide-react";
import { useAsync } from "../../../hooks/useAsync";

export type PrivacyState = {
    aiPersonalizationEnabled: boolean;
    dataRetention: "standard" | "minimized" | "extended";
    consentVersion?: string;
    consentUpdatedAt?: string;
};

export function PrivacyControls({
    loading,
    state,
    onUpdate,
}: {
    loading: boolean;
    state: PrivacyState;
    onUpdate: (patch: Partial<PrivacyState>) => Promise<void>;
}) {
    const [local, setLocal] = useState(state);
    const { run, loading: saving, error } = useAsync(onUpdate);

    useEffect(() => setLocal(state), [state]);

    const dirty =
        local.aiPersonalizationEnabled !== state.aiPersonalizationEnabled ||
        local.dataRetention !== state.dataRetention;

    return (
        <section className="rounded-2xl border border-black/5 bg-white p-5 sm:p-6">
            <div className="flex items-center gap-2">
                <Sliders className="h-5 w-5 text-zinc-800" />
                <h4 className="text-sm font-semibold text-zinc-900">Privacy controls</h4>
            </div>
            <p className="mt-1 text-sm text-zinc-600">
                Control personalization and how long your data is stored.
            </p>

            <div className="mt-4 space-y-4">
                <div className="flex items-start justify-between gap-4 rounded-xl border border-black/5 p-4">
                    <div>
                        <p className="text-sm font-medium text-zinc-900">AI personalization</p>
                        <p className="mt-1 text-sm text-zinc-600">
                            When enabled, the platform may use your responses to tailor prompts and guidance.
                        </p>
                    </div>

                    <button
                        type="button"
                        disabled={loading}
                        onClick={() =>
                            setLocal((p) => ({ ...p, aiPersonalizationEnabled: !p.aiPersonalizationEnabled }))
                        }
                        className={[
                            "relative h-7 w-12 rounded-full transition",
                            local.aiPersonalizationEnabled ? "bg-sky-600" : "bg-zinc-300",
                            loading ? "opacity-60 cursor-not-allowed" : "",
                        ].join(" ")}
                        aria-label="Toggle AI personalization"
                    >
                        <span
                            className={[
                                "absolute top-0.5 h-6 w-6 rounded-full bg-white shadow transition",
                                local.aiPersonalizationEnabled ? "left-5" : "left-0.5",
                            ].join(" ")}
                        />
                    </button>
                </div>

                <div className="rounded-xl border border-black/5 p-4">
                    <p className="text-sm font-medium text-zinc-900">Data retention</p>
                    <p className="mt-1 text-sm text-zinc-600">
                        Choose how long your reflections and worksheet responses are kept.
                    </p>

                    <select
                        disabled={loading}
                        value={local.dataRetention}
                        onChange={(e) => setLocal((p) => ({ ...p, dataRetention: e.target.value as any }))}
                        className="mt-3 w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm outline-none focus:border-sky-300 disabled:bg-zinc-50"
                    >
                        <option value="standard">Standard (recommended)</option>
                        <option value="minimized">Minimized (store less)</option>
                        <option value="extended">Extended (store longer)</option>
                    </select>

                    <div className="mt-3 flex items-start gap-2 text-xs text-zinc-500">
                        <Info className="mt-0.5 h-4 w-4" />
                        <p>
                            Retention options depend on your organization’s policy. Some records may be retained for
                            compliance/security auditing.
                        </p>
                    </div>
                </div>

                <div className="flex items-center justify-between gap-3">
                    <div className="text-xs text-zinc-500">
                        Consent version: <span className="font-medium">{state.consentVersion ?? "—"}</span>
                        {state.consentUpdatedAt ? (
                            <>
                                {" "}
                                • updated{" "}
                                <span className="font-medium">
                                    {new Date(state.consentUpdatedAt).toLocaleDateString()}
                                </span>
                            </>
                        ) : null}
                    </div>

                    <button
                        type="button"
                        disabled={loading || saving || !dirty}
                        onClick={async () => {
                            try {
                                await run({
                                    aiPersonalizationEnabled: local.aiPersonalizationEnabled,
                                    dataRetention: local.dataRetention,
                                    consentUpdatedAt: new Date().toISOString(),
                                });
                            } catch { }
                        }}
                        className={[
                            "rounded-xl px-4 py-2 text-sm font-medium text-white",
                            !dirty || loading || saving
                                ? "bg-zinc-300 cursor-not-allowed"
                                : "bg-sky-600 hover:bg-sky-700",
                        ].join(" ")}
                    >
                        {saving ? "Saving..." : "Save privacy settings"}
                    </button>
                </div>

                {error ? <p className="text-sm text-rose-600">{error}</p> : null}
            </div>
        </section>
    );
}
