import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import { useProgress } from "../context/ProgressContext";
import { unlockNext } from "../controllers/courseController";

/**
 * Where "Continue" should take someone, from what the server reports:
 * the completion page once every step is done, otherwise the first unfinished
 * step, otherwise the very first page (unlocking it on the way).
 *
 * The step is read as a whole key. The Introduction is `milestone0`, so testing
 * the milestone *number* for truthiness sent anyone still in the Introduction —
 * and anyone who had finished — back to the first page.
 */
export const continueRouteFor = (summary?: {
    completed?: number;
    total?: number;
    currentMilestone?: string | null;
} | null): string | null => {
    if (!summary) return null;
    const { completed = 0, total = 0, currentMilestone } = summary;
    if (total > 0 && completed >= total) return "/milestones/complete";
    if (currentMilestone && completed > 0) return `/milestones/${currentMilestone}`;
    return null;
};

export function useContinueJourney() {
    const navigate = useNavigate();
    const { user } = useAuth();
    const { progress, refreshProgress } = useProgress();

    return useCallback(async () => {
        if (!user) return;

        const route = continueRouteFor(progress?.summary);
        if (route) {
            navigate(route);
            return;
        }

        try {
            const result = await unlockNext({ milestoneId: "milestone0/1", prevMilestoneId: "start" });
            toast.success(result.message);
            await refreshProgress();
            navigate("/milestones/milestone0/1");
        } catch (error) {
            console.error(error);
            toast.error(error instanceof Error ? error.message : "Could not start your journey.");
        }
    }, [navigate, progress, refreshProgress, user]);
}
