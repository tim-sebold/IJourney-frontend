import { useCallback, useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import { downloadCertificate } from "../controllers/courseController";
import { ApiError } from "../lib/api";

/**
 * The certificate is offered from more than one place — M7.4, the final page of M7.5
 * and the completion page — so that nobody has to walk back into the module to fetch
 * their PDF. All of them share this.
 *
 * `outstanding` lists the steps the server says still need an answer when it
 * refuses the download; render it with `OutstandingSteps` beside the button.
 */
export function useCertificateDownload() {
    const { user } = useAuth();
    const [loading, setLoading] = useState(false);
    const [outstanding, setOutstanding] = useState<string[]>([]);

    const download = useCallback(async () => {
        if (!user) {
            toast.error("Please check authentication and retry.");
            return;
        }

        try {
            setLoading(true);
            const blob = await downloadCertificate();

            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = "iJOURNEY-Certificate.pdf";
            document.body.appendChild(a);
            a.click();
            a.remove();
            window.URL.revokeObjectURL(url);

            setOutstanding([]);
            toast.success("Certificate downloaded!");
        } catch (e) {
            const steps = e instanceof ApiError
                ? (e.body as { outstanding?: unknown } | null)?.outstanding
                : undefined;
            setOutstanding(Array.isArray(steps) ? steps.filter((step) => typeof step === "string") : []);
            toast.error(e instanceof Error ? e.message : "Download failed.");
        } finally {
            setLoading(false);
        }
    }, [user]);

    return { download, loading, outstanding };
}
