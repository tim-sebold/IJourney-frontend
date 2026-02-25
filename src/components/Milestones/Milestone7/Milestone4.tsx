
import { useState } from 'react';
import { useAuth } from '../../../context/AuthContext';

import { MilestonePageShell } from '../MilestonePageShell';
import { useMilestoneNav } from '../../../hooks/useMilestoneNav';
import { CompletionCard } from './components/CompletionCard';
import { CertificateCard } from './components/CertificateCard';
import { NextStepsCard } from './components/NextStepCard';
import toast from 'react-hot-toast';
import { downloadCertificate } from '../../../controllers/courseController';

function CelebrationCompletion() {
    const { user } = useAuth();
    const [loading, setLoading] = useState<boolean>(false);

    const download = async () => {
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
            a.download = "iJourney-Certificate.pdf";
            document.body.appendChild(a);
            a.click();
            a.remove();
            window.URL.revokeObjectURL(url);

            toast.success("Certificate downloaded!");
        } catch (e) {
            const message = e instanceof Error ? e.message : "Download failed.";
            toast.error(message);
        } finally {
            setLoading(false);
        }
    };

    const { previous, next, isNextLoading } = useMilestoneNav({
        previousRoute: "/milestones/milestone7/3",
        nextRoute: "/milestones/milestone7/5",
        unlock: { milestoneId: "milestone7/5", prevMilestoneId: "milestone7/4" },
    });

    return (
        <MilestonePageShell
            title="M7.4: Celebration & Completion"
            subtitle="Finalizing Your Growth Plan"
            onPrevious={previous}
            onNext={next}
            isNextLoading={isNextLoading}
        >
            <div className="flex flex-col gap-6">
                <div className="space-y-6">
                    <CompletionCard />
                    <CertificateCard name={user?.displayName} downloadFunc={download} loading={loading} />
                    <NextStepsCard />
                </div>
            </div>
        </MilestonePageShell>
    )
}

export default CelebrationCompletion;