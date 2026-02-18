import { useEffect, useMemo, useState } from "react";
import type { UserProfile } from "../lib/types";
import { validateProfileDraft } from "../lib/validation";

export type ProfileDraftMode = "view" | "edit";

const EDITABLE_KEYS = ["name", "displayName", "gender", "country", "avatarBase64"] as const;
type EditableKey = (typeof EDITABLE_KEYS)[number];

type UseProfileDraftArgs = {
    profile?: UserProfile | null; 
    onSaveProfile: (patch: Partial<UserProfile>) => Promise<void>;
};

type ProfileDraftErrors = Record<string, string>;

const EMPTY_PROFILE: UserProfile = {
    uid: "",
    name: "",
    email: "",
    gender: "",
    country: "",
    role: "user",
    currentMilestone: "",
};

export function useProfileDraft({ profile, onSaveProfile }: UseProfileDraftArgs) {
    const resolvedProfile = profile ?? EMPTY_PROFILE;

    const [mode, setMode] = useState<ProfileDraftMode>("view");
    const [draft, setDraft] = useState<UserProfile>(resolvedProfile);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (mode === "view") setDraft(resolvedProfile);
    }, [resolvedProfile, mode]);

    const errors: ProfileDraftErrors = useMemo(() => {
        return validateProfileDraft(draft);
    }, [draft]);

    const dirty = useMemo(() => {
        if (!profile) return false;
        return EDITABLE_KEYS.some((k) => draft[k] !== resolvedProfile[k]);
    }, [draft, resolvedProfile, profile]);

    const startEdit = () => {
        setDraft(resolvedProfile);
        setMode("edit");
    };

    const cancelEdit = () => {
        setDraft(resolvedProfile);
        setMode("view");
    };

    const setField = <K extends EditableKey>(key: K, value: UserProfile[K]) => {
        setDraft((prev) => ({ ...prev, [key]: value }));
    };

    const buildPatch = (): Partial<UserProfile> => {
        if (!profile) return {};

        const patch: Partial<Pick<UserProfile, EditableKey>> = {};

        EDITABLE_KEYS.forEach(<K extends EditableKey>(k: K) => {
            if (draft[k] !== resolvedProfile[k]) {
                patch[k] = draft[k];
            }
        });

        return patch as Partial<UserProfile>;
    };

    const save = async () => {
        if (!profile) return;

        if (Object.keys(errors).length > 0) return;

        const patch = buildPatch();
        
        if (Object.keys(patch).length === 0) {
            setMode("view");
            return;
        }

        setSaving(true);
        try {
            await onSaveProfile(patch);
            setMode("view");
        } finally {
            setSaving(false);
        }
    };

    return {
        mode,
        draft,
        errors,
        dirty,
        saving,
        isReady: !!profile,

        startEdit,
        cancelEdit,
        setField,
        save,
    };
}
