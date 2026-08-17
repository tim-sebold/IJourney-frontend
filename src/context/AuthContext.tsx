import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import {
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signInWithPopup,
    GoogleAuthProvider,
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
    loginWithGoogle: () => Promise<void>;
    logout: () => Promise<void>;

    refreshProfile: () => Promise<void>;
    patchUserProfile: (patch: Partial<UserProfile>) => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);

    const refreshProfile = useCallback(async () => {
        if (!auth.currentUser) return;
        try {
            const profile = await getProfile();
            setUserProfile(profile as UserProfile);
        } catch (err) {
            console.error("Failed to refresh profile:", err);
        }
    }, []);

    const patchUserProfile = (patch: Partial<UserProfile>) => {
        setUserProfile((prev) => (prev ? { ...prev, ...patch } : prev));
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (u) => {
            setLoading(true);
            setUser(u);
            try {
                if (u) {
                    const profile = await getProfile();
                    setUserProfile(profile as UserProfile);
                } else {
                    setUserProfile(null);
                }
            } catch (err) {
                console.error("Failed to fetch backend profile:", err);
                setUserProfile(null);
            } finally {
                setLoading(false);
            }
        });
        return unsubscribe;
    }, []);

    const getIdToken = useCallback(async () => (user ? user.getIdToken() : null), [user]);

    const loginWithEmailPassword = async (email: string, password: string) => {
        setLoading(true);
        try {
            const cred = await signInWithEmailAndPassword(auth, email, password);
            const idToken = await cred.user.getIdToken();

            const data = await login(idToken);

            if (data.success) {
                toast.success(data.message);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            setLoading(false);
            throw error;
        }
    };

    const loginWithGoogle = async () => {
        setLoading(true);
        try {
            const credential = await signInWithPopup(auth, new GoogleAuthProvider());
            const data = await login(await credential.user.getIdToken());
            toast.success(data.message);
        } catch (error) {
            setLoading(false);
            throw error;
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
            loginWithGoogle,
            logout,
            patchUserProfile,
            refreshProfile
        }),
        [user, userProfile, loading, getIdToken, refreshProfile]
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used within AuthProvider");
    return ctx;
};
