import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

type VerifyResponse =
    | { valid: true; certificateId: string; courseTitle: string; issuedToName: string; issuedAt: string | null }
    | { valid: false; error: string };

export default function VerifyCertificatePage() {
    const { certificateId } = useParams();
    const [data, setData] = useState<VerifyResponse | null>(null);

    useEffect(() => {
        (async () => {
            const res = await fetch(`/api/certificates/verify/${certificateId}`);
            const json = (await res.json()) as VerifyResponse;
            setData(json);
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