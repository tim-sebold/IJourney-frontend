import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import {
    onAuthStateChanged,
    onIdTokenChanged,
    signInWithEmailAndPassword,
    signOut
} from 'firebase/auth';
import type { User } from 'firebase/auth';
import toast from 'react-hot-toast';
import type { UserProfile } from '../lib/types';
import { auth } from '../firebaseConfig';
import { getProfile } from '../controllers/userController';
import { login, logout as logoutUser } from '../controllers/authController';

type AuthContextValue = {
    user: User | null;
    userProfile: UserProfile | null;
    loading: boolean;
    getIdToken: () => Promise<string | null>;
    loginWithEmailPassword: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;

    refreshProfile: () => Promise<void>;
    patchUserProfile: (patch: Partial<UserProfile>) => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);

    const refreshProfile = async () => {
        if (!auth.currentUser) return;
        try {
            const profile = await getProfile();
            setUserProfile(profile as UserProfile);
        } catch (err) {
            console.error("Failed to refresh profile:", err);
        }
    }

    const patchUserProfile = (patch: Partial<UserProfile>) => {
        setUserProfile((prev) => (prev ? { ...prev, ...patch } : prev));
    }

    useEffect(() => {
        const unsub1 = onAuthStateChanged(auth, async (u) => {
            setUser(u);
            setLoading(false);

            if (u) {
                try {
                    const profile = await getProfile();

                    setUserProfile(profile as UserProfile);
                } catch (err) {
                    console.error("Failed to fetch backend profile:", err);
                }
            } else {
                setUserProfile(null);
            }
        });
        const unsub2 = onIdTokenChanged(auth, (u) => setUser(u));
        return () => {
            unsub1();
            unsub2();
        };
    }, []);

    const getIdToken = async () => (user ? user.getIdToken() : null);

    const loginWithEmailPassword = async (email: string, password: string) => {
        setLoading(true);
        try {
            const cred = await signInWithEmailAndPassword(auth, email, password);
            const idToken = await cred.user.getIdToken();

            const data = await login(idToken);
            setUserProfile(data.user as UserProfile);

            if (data.success) {
                toast.success(data.message);
            } else {
                toast.error(data.message);
            }
        } finally {
            setLoading(false);
        }
    };

    const logout = async () => {
        setLoading(true);
        try {
            const data = await logoutUser();

            if (data.success) {
                setUserProfile(null);
                toast.success(data.message);
            } else {
                toast.error(data.message);
            }
        } catch (error: any) {
            toast.error(error?.message);
        } finally {
            await signOut(auth)
            setLoading(false);
        }
    };

    const value = useMemo<AuthContextValue>(
        () => ({
            user,
            userProfile,
            loading,
            getIdToken,
            loginWithEmailPassword,
            logout,
            patchUserProfile,
            refreshProfile
        }),
        [user, userProfile, loading]
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used within AuthProvider");
    return ctx;
};
