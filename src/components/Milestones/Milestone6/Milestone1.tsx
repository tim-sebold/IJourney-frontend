import { MilestonePageShell } from '../MilestonePageShell';
import { useMilestoneNav } from '../../../hooks/useMilestoneNav';

import { Clock, Target, Users, Star, Heart, GraduationCap, Gift } from 'lucide-react';

function EnvisioningFuture() {
    const { previous, next, isNextLoading } = useMilestoneNav({
        previousRoute: "/milestones/milestone5/5",
        nextRoute: "/milestones/milestone6/2",
        unlock: { milestoneId: "milestone6/2", prevMilestoneId: "milestone6/1" },
    });

    return (
        <MilestonePageShell
            title="M6.1: Envisioning Your Future"
            subtitle="Creating Your Personal Vision for a Purpose-Driven Life"
            onPrevious={previous}
            onNext={next}
            isNextLoading={isNextLoading}
        >
            <div className="flex flex-col gap-6">
                <div className="space-y-6">
                    <div className="bg-yellow-50 p-6 rounded-lg border-l-4 border-yellow-500">
                        <h4 className="text-xl font-bold text-yellow-800 mb-3">Welcome to Milestone 6</h4>
                        <p className="mb-4">This milestone helps you define your future self by creating an "iJOURNEY Career Project Fair" presentation. The goal is to synthesize all the self-discovery work from previous milestones into a cohesive vision of your ideal future.</p>
                        <div className="flex items-center gap-2 mt-4">
                            <Clock className="w-5 h-5 text-yellow-600" />
                            <span>Approximately 90 minutes to complete</span>
                        </div>
                    </div>

                    <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500">
                        <h4 className="text-xl font-bold text-blue-800 mb-3">The iJOURNEY Career Project Fair</h4>
                        <div className="mb-4 flex flex-wrap items-center gap-2">
                            <span className="rounded-full bg-blue-600 px-3 py-1 text-xs font-bold uppercase tracking-wide text-white">Optional</span>
                            <span className="text-sm font-semibold text-blue-900">This activity is optional — but worth doing.</span>
                        </div>
                        <p className="mb-4">You'll create a presentation (like a school project fair) that showcases your future career path and personal brand. Your presentation should include:</p>
                        <ul className="space-y-2 mb-4">
                            <li className="flex items-start gap-2"><Target className="w-4 h-4 text-blue-600 mt-1" /> <strong>Your Future Self:</strong> Who you envision becoming professionally and personally</li>
                            <li className="flex items-start gap-2"><Users className="w-4 h-4 text-blue-600 mt-1" /> <strong>Your Ideal Job/Role:</strong> What specific position or type of work you aspire to</li>
                            <li className="flex items-start gap-2"><GraduationCap className="w-4 h-4 text-blue-600 mt-1" /> <strong>Your Educational Path:</strong> How you plan to get there (tying back to Milestone 5)</li>
                            <li className="flex items-start gap-2"><Star className="w-4 h-4 text-blue-600 mt-1" /> <strong>Your Personal Brand:</strong> What makes you unique and valuable in your chosen field</li>
                            <li className="flex items-start gap-2"><Heart className="w-4 h-4 text-blue-600 mt-1" /> <strong>Your Impact:</strong> What difference you want to make in the world through your work</li>
                        </ul>
                        <p className="mt-4">This isn't just about a job title; it's about creating a fulfilling life and career that aligns with your core values and passions.</p>
                        <div className="mt-4 flex items-start gap-3 rounded-lg bg-white p-4 shadow">
                            <Gift className="mt-0.5 h-5 w-5 shrink-0 text-blue-600" />
                            <p className="text-sm">
                                <strong>Finish it and win a prize!</strong> Anyone who completes the Career Project Fair
                                can send it to <strong>RIZE Prevention</strong> to receive a prize.
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </MilestonePageShell>
    )
}

export default EnvisioningFuture;