import {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useState,
} from 'react';
import { useAuth } from './AuthContext';
import { getUserProgress } from '../controllers/userController';
import type { ProgressContextValue } from '../lib/types';

const ProgressContext = createContext<ProgressContextValue | null>(null);

export function ProgressProvider({ children }: { children: React.ReactNode }) {
    const { user } = useAuth();
    const [currentMilestone, setCurrentMilestone] = useState<number | null>(null);
    const [currentMilestoneChild, setCurrentMilestoneChild] = useState<number | null>(null);
    const [progress, setProgress] = useState<any>(null);
    const [loadingProgress, setLoadingProgress] = useState(false);

    const refreshProgress = async () => {
        if (!user) return;
        setLoadingProgress(true);
        try {
            const data = await getUserProgress();

            const cm =
                (data as any).currentMilestone ? parseInt((data as any).currentMilestone.split("/")[0].replace("milestone", "")) :
                (data as any).summary?.currentMilestone ? parseInt((data as any).summary?.currentMilestone.split("/")[0].replace("milestone", "")) :
                0;

            const cmc = 
                (data as any).currentMilestone ? parseInt((data as any).currentMilestone.split("/")[1]) :
                (data as any).summary?.currentMilestone ? parseInt((data as any).summary?.currentMilestone.split("/")[1]) :
                0;
                
            setCurrentMilestone(cm);
            setCurrentMilestoneChild(cmc);
            setProgress((data as any).progress ?? data);
        } catch (err) {
            console.error("Failed to fetch user progress:", err);
        } finally {
            setLoadingProgress(false);
        }
    };

    useEffect(() => {
        if (user) {
            void refreshProgress();
        } else {
            setCurrentMilestone(null);
            setProgress(null);
        }
    }, [user]);

    const value = useMemo(
        () => ({
            currentMilestone,
            currentMilestoneChild,
            progress,
            loadingProgress,
            refreshProgress,
        }),
        [currentMilestone, currentMilestoneChild, progress, loadingProgress]
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
