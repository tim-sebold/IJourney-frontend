import { useCallback, useState } from "react";

export function useAsync<TArgs extends any[], TResult>(fn: (...args: TArgs) => Promise<TResult>) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const run = useCallback(
        async (...args: TArgs) => {
            setLoading(true);
            setError(null);
            try {
                return await fn(...args);
            } catch (e: unknown) {
                const message =
                    e instanceof Error ? e.message : "Something went wrong";
                console.log("error:", error);
                
                setError(message);
                throw new Error(message);
            } finally {
                setLoading(false);
            }
        },
        [fn]
    );

    return { run, loading, error, setError };
}
