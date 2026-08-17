import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../../lib/api";

type VerifyResponse =
    | { valid: true; certificateId: string; courseTitle: string; issuedToName: string; issuedAt: string | null }
    | { valid: false; error: string };

export default function VerifyCertificatePage() {
    const { certificateId } = useParams();
    const [data, setData] = useState<VerifyResponse | null>(null);

    useEffect(() => {
        (async () => {
            if (!certificateId) {
                setData({ valid: false, error: "Certificate ID is missing." });
                return;
            }

            try {
                const json = await api<VerifyResponse>(`/api/certificates/verify/${encodeURIComponent(certificateId)}`);
                setData(json);
            } catch {
                setData({ valid: false, error: "Unable to reach the certificate service." });
            }
        })();
    }, [certificateId]);

    if (!data) return <div className="p-6">Checking certificate…</div>;

    if (!data.valid) {
        return <div className="p-6">❌ {data.error}</div>;
    }

    return (
        <div className="p-6 max-w-xl mx-auto space-y-2">
            <h2 className="text-xl font-bold">✅ Certificate Verified</h2>
            <div><b>Certificate ID:</b> {data.certificateId}</div>
            <div><b>Course:</b> {data.courseTitle}</div>
            <div><b>Issued To:</b> {data.issuedToName}</div>
            <div><b>Issued At:</b> {data.issuedAt ? new Date(data.issuedAt).toLocaleString() : "-"}</div>
        </div>
    );
}
