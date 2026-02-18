import { useMemo, useState } from "react";
import type {
    UserProfile,
    GenderOption,
    CountryOption,
    Navkey,
} from "../../../lib/types";
import { useAuth } from "../../../context/AuthContext";
import toast from "react-hot-toast";
import { uploadAvatar } from "../../../services/profileService";

import {
    changePassword,
} from "../../../services/securityService";

import {
    // fetchSessions,
    logoutAllDevices,
} from "../../../services/sessionService";

import {
    // updatePrivacySettings,
    requestDataExport,
    requestAccountDeletion,
} from "../../../services/privacyService";

import { ProfileShell } from "../../../components/Profile/ProfileShell";
import { TopNavIcons } from "../../../components/Profile/Overview/TopNavIcons";
import { ProfileIdentityRow } from "../../../components/Profile/Overview/ProfileIdentityRow";
import { ProfileForm } from "../../../components/Profile/Overview/ProfileForm";
import { EmailSection } from "../../../components/Profile/Overview/EmailSection";
import { ProfileActions } from "../../../components/Profile/Overview/ProfileActions";
import { SecurityPrivacy } from "../../../components/Profile/Security/SecurityPrivacy";

import { useProfileDraft } from "../../../hooks/useProfileDraft";
import { doc, updateDoc } from "firebase/firestore";
import { auth, db } from "../../../firebaseConfig";
import { updateProfile } from "firebase/auth";

function ProfileSkeleton() {
    return (
        <div className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm">
            <div className="h-6 w-48 animate-pulse rounded bg-zinc-200" />
            <div className="mt-3 h-4 w-40 animate-pulse rounded bg-zinc-200" />
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="h-12 animate-pulse rounded-xl bg-zinc-200" />
                <div className="h-12 animate-pulse rounded-xl bg-zinc-200" />
                <div className="h-12 animate-pulse rounded-xl bg-zinc-200" />
                <div className="h-12 animate-pulse rounded-xl bg-zinc-200" />
            </div>
        </div>
    );
}

export default function ProfilePage() {
    const { user, userProfile, patchUserProfile, refreshProfile } = useAuth();
    const [active, setActive] = useState<Navkey>("overview");

    const authUser = user ?? null;
    const profile = userProfile ?? null;

    const safeOnSaveProfile = async (patch: Partial<UserProfile>) => {
        if (!user) throw new Error("Not authenticated");

        await updateDoc(doc(db, "users", user.uid), patch);
        await updateProfile(auth.currentUser!, {
            displayName: patch.displayName ?? patch.name,
        });
        patchUserProfile(patch);
        await refreshProfile();
        toast.success("Your profile was updated successfully.")
    }

    const {
        mode,
        draft,
        dirty,
        errors,
        startEdit,
        cancelEdit,
        setField,
        save,
        saving,
        isReady,
    } = useProfileDraft({
        profile,
        onSaveProfile: safeOnSaveProfile,
    });

    const welcomeName = useMemo(() => {
        return (profile?.displayName ?? profile?.name) || "—";
    }, [profile?.displayName, profile?.name]);

    // const headerDate = useMemo(() => {
    //     const last = profile?.lastLogin;
    //     const d = last ? new Date(last) : new Date();
    //     return d.toLocaleDateString(undefined, {
    //         weekday: "short",
    //         day: "2-digit",
    //         month: "long",
    //         year: "numeric",
    //     });
    // }, [profile?.lastLogin]);

    return (
        <ProfileShell>
            <div className="mx-auto w-full max-w-6xl px-4 py-10">
                <div className="overflow-hidden rounded-2xl border border-black/5 bg-white shadow-sm">
                    <TopNavIcons
                        active={active}
                        setActive={setActive}
                        welcomeName={welcomeName}
                    />

                    <div className="p-5 sm:p-8">
                        {!isReady ? (
                            <ProfileSkeleton />
                        ) : (
                            <>
                                {active === "overview" && (
                                    <div className="flex flex-col gap-6">
                                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                                            <ProfileIdentityRow
                                                mode={mode}
                                                name={draft.name}
                                                email={draft.email}
                                                avatarBase64={draft.avatarBase64}
                                                role={draft.role}
                                                currentMilestoneLabel={draft.currentMilestone}
                                                onAvatarFile={async (file) => {
                                                    if (!uploadAvatar) return;
                                                    const base64 = await uploadAvatar(file);
                                                    setField("avatarBase64", base64);
                                                }}
                                            />

                                            <ProfileActions
                                                mode={mode}
                                                dirty={dirty}
                                                saving={saving}
                                                onEdit={startEdit}
                                                onCancel={cancelEdit}
                                                onSave={save}
                                            />
                                        </div>

                                        <ProfileForm
                                            mode={mode}
                                            values={{
                                                name: draft.name,
                                                displayName: draft.displayName ?? "",
                                                gender: draft.gender as GenderOption,
                                                country: draft.country as CountryOption,
                                            }}
                                            errors={errors}
                                            onChange={(key, value) => setField(key as any, value as any)}
                                        />

                                        <EmailSection email={draft.email} lastUpdatedLabel="1 month ago" />
                                    </div>
                                )}

                                {active === "security" && (
                                    <SecurityPrivacy
                                        authUser={authUser}
                                        profile={draft}
                                        loading={!isReady}
                                        onChangePassword={changePassword}
                                        // onFetchSessions={fetchSessions}
                                        onLogoutAllDevices={logoutAllDevices}
                                        // onUpdatePrivacy={updatePrivacySettings}
                                        onRequestDataExport={requestDataExport}
                                        onRequestAccountDeletion={requestAccountDeletion}
                                    />
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </ProfileShell>
    );
}
