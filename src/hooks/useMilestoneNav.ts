import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import { unlockNext, submitMilestone } from "../controllers/courseController";
import type { UseMilestoneNavOptions } from "../lib/types";

export function useMilestoneNav<TResponses extends Record<string, unknown>>(
    options: UseMilestoneNavOptions<TResponses>
) {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [isNextLoading, setIsNextLoading] = useState(false);

    const previous = useCallback(() => {
        navigate(options.previousRoute);
    }, [navigate, options.previousRoute]);

    const next = useCallback(async () => {
        const requireAuth = options.requireAuth ?? true;
        if (requireAuth && !user) {
            toast.error("You need to log in to unlock the next milestone.");
            return;
        }

        setIsNextLoading(true);
        try {
            if (options.submit) {
                if(!user) {
                    toast.error("You need to authenticate again!");
                    return;
                }
                await submitMilestone(options.submit.milestoneKey, {
                    userId: user?.uid,
                    responses: options.submit.responses,
                });
            }

            if (options.unlock && user) {
                const result = await unlockNext({
                    userId: user.uid,
                    milestoneId: options.unlock.milestoneId,
                    prevMilestoneId: options.unlock.prevMilestoneId,
                });
                toast.success(result.message);
            }

            navigate(options.nextRoute);
        } catch (err) {
            const message = err instanceof Error ? err.message : "Something went wrong.";
            toast.error(message);
            console.error(err);
        } finally {
            setIsNextLoading(false);
        }
    }, [navigate, options, user]);

    return { previous, next, isNextLoading, user };
}
