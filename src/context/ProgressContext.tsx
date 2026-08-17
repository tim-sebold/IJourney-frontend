import {
    createContext,
    useContext,
    useCallback,
    useEffect,
    useMemo,
    useState,
} from 'react';
import { useAuth } from './AuthContext';
import { getUserProgress } from '../controllers/userController';
import type { ProgressContextValue } from '../lib/types';

const ProgressContext = createContext<ProgressContextValue | null>(null);

const parseMilestoneKey = (value: unknown): [number, number] => {
    if (typeof value !== 'string') return [0, 0];
    const match = value.match(/^milestone(\d+)[/_](\d+)$/);
    return match ? [Number(match[1]), Number(match[2])] : [0, 0];
};

export function ProgressProvider({ children }: { children: React.ReactNode }) {
    const { user } = useAuth();
    const [currentMilestone, setCurrentMilestone] = useState<number | null>(null);
    const [currentMilestoneChild, setCurrentMilestoneChild] = useState<number | null>(null);
    const [progress, setProgress] = useState<any>(null);
    const [loadingProgress, setLoadingProgress] = useState(false);

    const refreshProgress = useCallback(async () => {
        if (!user) return;
        setLoadingProgress(true);
        try {
            const data = await getUserProgress();

            const response = data as { currentMilestone?: unknown; summary?: { currentMilestone?: unknown }; progress?: unknown };
            const [cm, cmc] = parseMilestoneKey(response.currentMilestone ?? response.summary?.currentMilestone);
                
            setCurrentMilestone(cm);
            setCurrentMilestoneChild(cmc);
            setProgress(response.progress ?? data);
        } catch (err) {
            console.error("Failed to fetch user progress:", err);
        } finally {
            setLoadingProgress(false);
        }
    }, [user]);

    useEffect(() => {
        if (user) {
            void refreshProgress();
        } else {
            setCurrentMilestone(null);
            setProgress(null);
        }
    }, [user, refreshProgress]);

    const value = useMemo(
        () => ({
            currentMilestone,
            currentMilestoneChild,
            progress,
            loadingProgress,
            refreshProgress,
        }),
        [currentMilestone, currentMilestoneChild, progress, loadingProgress, refreshProgress]
    );

    return (
        <ProgressContext.Provider value={value}>
            {children}
        </ProgressContext.Provider>
    );
}

export const useProgress = () => {
    const ctx = useContext(ProgressContext);
    if (!ctx) throw new Error("useProgress must be used within ProgressProvider");
    return ctx;
};
