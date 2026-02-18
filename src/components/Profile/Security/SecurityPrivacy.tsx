import { useMemo } from "react";
import type { User } from "firebase/auth";
import type { UserProfile } from "../../../lib/types";
import { ChangePasswordCard } from "./ChangePasswordCard";
// import { ProviderList } from "./ProviderList";
// import { SessionList, type SessionInfo } from "./SessionList";
// import { PrivacyControls, type PrivacyState } from "./PrivacyControls";
// import { DangerZone } from "./DangerZone";
import { ShieldCheck } from "lucide-react";

type Props = {
    authUser: User | null;
    profile?: UserProfile | null;
    loading?: boolean;

    onChangePassword: (currentPassword: string, newPassword: string) => Promise<void>;
    onUnlinkProvider?: (providerId: string) => Promise<void>;
    // onFetchSessions: () => Promise<SessionInfo[]>;
    onLogoutAllDevices: () => Promise<void>;
    // onUpdatePrivacy: (patch: Partial<PrivacyState>) => Promise<void>;
    onRequestDataExport: () => Promise<void>;
    onRequestAccountDeletion: (confirmText: string) => Promise<void>;
};

export function SecurityPrivacy({
    authUser,
    profile,
    loading = false,
    onChangePassword,
    // onUnlinkProvider,
    // onFetchSessions,
    // onLogoutAllDevices,
    // onUpdatePrivacy,
    // onRequestDataExport,
    // onRequestAccountDeletion,
}: Props) {
    // const [sessions, setSessions] = useState<SessionInfo[] | null>(null);

    const providerIds = useMemo(() => {
        const ids = authUser?.providerData?.map((p) => p.providerId).filter(Boolean) ?? [];
        return Array.from(new Set(ids));
    }, [authUser]);

    const hasPasswordProvider = useMemo(() => providerIds.includes("password"), [providerIds]);

    // const privacyState: PrivacyState = useMemo(() => {
    //     const prefs = (profile?.preferences ?? {}) as Record<string, unknown>;
    //     return {
    //         aiPersonalizationEnabled: Boolean(prefs.aiPersonalizationEnabled ?? true),
    //         dataRetention: (prefs.dataRetention as PrivacyState["dataRetention"]) ?? "standard",
    //         consentVersion: String(prefs.consentVersion ?? "v1"),
    //         consentUpdatedAt: String(prefs.consentUpdatedAt ?? profile?.createdAt ?? ""),
    //     };
    // }, [profile]);

    const isReady = !!authUser && !!profile && !loading;
    
    return (
        <div className="space-y-5">
            <div className="flex items-start justify-between gap-3">
                <div>
                    <div className="flex items-center gap-2">
                        <ShieldCheck className="h-5 w-5 text-sky-700" />
                        <h3 className="text-base font-semibold text-zinc-900">Security & Privacy</h3>
                    </div>
                    <p className="mt-1 text-sm text-zinc-600">
                        Manage sign-in security, privacy controls, and account data.
                    </p>
                </div>
            </div>

            <ChangePasswordCard
                enabled={isReady && hasPasswordProvider}
                reasonIfDisabled={!hasPasswordProvider ? "Password is managed by your sign-in provider." : undefined}
                onChangePassword={onChangePassword}
            />

            {/* <ProviderList
                loading={!isReady}
                providerIds={providerIds}
                onUnlinkProvider={onUnlinkProvider}
            />

            <SessionList
                loading={!isReady}
                sessions={sessions}
                onLoad={async () => {
                    const data = await onFetchSessions();
                    setSessions(data);
                }}
                onLogoutAll={onLogoutAllDevices}
            />

            <PrivacyControls
                loading={!isReady}
                state={privacyState}
                onUpdate={onUpdatePrivacy}
            /> */}

            {/* <DangerZone
                loading={!isReady}
                onExport={onRequestDataExport}
                onDeleteAccount={onRequestAccountDeletion}
                email={profile?.email ?? authUser?.email ?? ""}
            /> */}
        </div>
    );
}
