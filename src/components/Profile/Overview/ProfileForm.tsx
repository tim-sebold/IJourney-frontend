import type { CountryOption, GenderOption } from "../../../lib/types"; // adjust

type Mode = "view" | "edit";

type Values = {
    name: string;
    displayName: string;
    gender: GenderOption;
    country: CountryOption;
};

type Errors = Partial<Record<keyof Values, string>>;

export function ProfileForm({
    mode,
    values,
    errors,
    onChange,
}: {
    mode: Mode;
    values: Values;
    errors: Errors;
    onChange: <K extends keyof Values>(key: K, value: Values[K]) => void;
}) {
    const disabled = mode !== "edit";

    return (
        <section>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field
                    label="Full Name"
                    disabled={disabled}
                    value={values.name}
                    placeholder="Your Full Name"
                    error={errors.name}
                    onChange={(v) => onChange("name", v)}
                />

                <Field
                    label="Display Name"
                    disabled={disabled}
                    value={values.displayName}
                    placeholder="What should we call you?"
                    error={errors.displayName}
                    onChange={(v) => onChange("displayName", v)}
                />

                <SelectField<GenderOption>
                    label="Gender"
                    disabled={disabled}
                    value={values.gender}
                    error={errors.gender}
                    onChange={(v) => onChange("gender", v)}
                    options={[
                        { value: "", label: "—" },
                        { value: "female", label: "Female" },
                        { value: "male", label: "Male" },
                        { value: "nonbinary", label: "Non-binary" },
                        { value: "prefer_not_say", label: "Prefer not to say" },
                    ]}
                />

                <SelectField<CountryOption>
                    label="Country"
                    disabled={disabled}
                    value={values.country}
                    error={errors.country}
                    onChange={(v) => onChange("country", v)}
                    options={[
                        { value: "", label: "—" },
                        { value: "us", label: "United States" },
                        { value: "ca", label: "Canada" },
                        { value: "uk", label: "United Kingdom" },
                        { value: "au", label: "Australia" },
                        { value: "in", label: "India" },
                    ]}
                />
            </div>
        </section>
    );
}

function Field({
    label,
    value,
    placeholder,
    disabled,
    error,
    onChange,
}: {
    label: string;
    value: string;
    placeholder?: string;
    disabled?: boolean;
    error?: string;
    onChange: (v: string) => void;
}) {
    return (
        <div>
            <label className="text-xs font-medium text-zinc-600">{label}</label>
            <input
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                disabled={disabled}
                className={[
                    "mt-2 w-full rounded-xl border px-4 py-3 text-sm outline-none transition",
                    disabled ? "bg-zinc-50 text-zinc-700 border-black/5" : "bg-white border-black/10 focus:border-sky-300",
                    error ? "border-rose-300 focus:border-rose-300" : "",
                ].join(" ")}
            />
            {error ? <p className="mt-1 text-xs text-rose-600">{error}</p> : null}
        </div>
    );
}

function SelectField<T extends string>({
    label,
    value,
    disabled,
    error,
    options,
    onChange,
}: {
    label: string;
    value: T;
    disabled?: boolean;
    error?: string;
    options: Array<{ value: T; label: string }>;
    onChange: (v: T) => void;
}) {
    return (
        <div>
            <label className="text-xs font-medium text-zinc-600">{label}</label>
            <select
                value={value}
                disabled={disabled}
                onChange={(e) => onChange(e.target.value as T)}
                className={[
                    "mt-2 w-full rounded-xl border px-4 py-3 text-sm outline-none transition",
                    disabled ? "bg-zinc-50 text-zinc-700 border-black/5" : "bg-white border-black/10 focus:border-sky-300",
                    error ? "border-rose-300 focus:border-rose-300" : "",
                ].join(" ")}
            >
                {options.map((o) => (
                    <option key={o.value} value={o.value}>
                        {o.label}
                    </option>
                ))}
            </select>
            {error ? <p className="mt-1 text-xs text-rose-600">{error}</p> : null}
        </div>
    );
}
