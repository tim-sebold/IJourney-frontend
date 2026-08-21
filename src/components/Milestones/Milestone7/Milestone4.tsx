
import { useAuth } from '../../../context/AuthContext';

import { MilestonePageShell } from '../MilestonePageShell';
import { useMilestoneNav } from '../../../hooks/useMilestoneNav';
import { useCertificateDownload } from '../../../hooks/useCertificateDownload';
import { CompletionCard } from './components/CompletionCard';
import { CertificateCard } from './components/CertificateCard';
import { NextStepsCard } from './components/NextStepCard';

function CelebrationCompletion() {
    const { user } = useAuth();
    const { download, loading } = useCertificateDownload();

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
