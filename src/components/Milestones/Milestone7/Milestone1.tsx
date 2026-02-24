import { Clock } from "lucide-react";
import { MilestonePageShell } from "../MilestonePageShell";
import { useMilestoneNav } from "../../../hooks/useMilestoneNav";

function YieldGrowth() {
    const { previous, next, isNextLoading } = useMilestoneNav({
        previousRoute: "/milestones/milestone6/5",
        nextRoute: "/milestones/milestone7/2",
        unlock: { milestoneId: "milestone7/2", prevMilestoneId: "milestone7/1" },
    });

    return (
        <MilestonePageShell
            title='M7.1: Yield to Growth'
            subtitle="Setting SMART Goals for Your Purpose-Driven Journey"
            onPrevious={previous}
            onNext={next}
            isNextLoading={isNextLoading}
        >
            <div className="space-y-6">
                <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500">
                    <h4 className="text-xl font-bold text-blue-800 mb-3">Welcome to Milestone 7</h4>
                    <p className="mb-4">
                        This final milestone helps you translate your vision into actionable goals
                        using the SMART framework...
                    </p>
                    <div className="flex items-center gap-2 mt-4">
                        <Clock className="w-5 h-5 text-blue-600" />
                        <span>Approximately 45 minutes to complete</span>
                    </div>
                </div>

                <div className="bg-green-50 p-6 rounded-lg border-l-4 border-green-500">
                    <h4 className="text-xl font-bold text-green-800 mb-3">What Are SMART Goals?</h4>
                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                        <div className="bg-white p-4 rounded-lg">
                            <h5 className="font-semibold text-green-700 mb-2">Specific</h5>
                            <p className="text-sm">Be clear about exactly what the goal is and what will be accomplished. Consider giving details about who, what, when, where, why, and how.</p>
                        </div>
                        <div className="bg-white p-4 rounded-lg">
                            <h5 className="font-semibold text-green-700 mb-2">Measurable</h5>
                            <p className="text-sm">Make sure you have a way to track your progress and whether you've achieved your goal.</p>
                        </div>
                        <div className="bg-white p-4 rounded-lg">
                            <h5 className="font-semibold text-green-700 mb-2">Achievable</h5>
                            <p className="text-sm">Set goals that challenge you but are still realistic. They should fit within your power.</p>
                        </div>
                        <div className="bg-white p-4 rounded-lg">
                            <h5 className="font-semibold text-green-700 mb-2">Relevant</h5>
                            <p className="text-sm">Your goals should connect to your interests, dreams, choices, and responsibilities.</p>
                        </div>
                        <div className="bg-white p-4 rounded-lg">
                            <h5 className="font-semibold text-green-700 mb-2">Time-Bound</h5>
                            <p className="text-sm">Give yourself a deadline to create a sense of urgency.</p>
                        </div>
                    </div>
                </div>

                <div className="bg-yellow-50 p-6 rounded-lg border-l-4 border-yellow-500">
                    <h4 className="text-xl font-bold text-yellow-800 mb-3">Examples of SMART Goals</h4>
                    <div className="bg-white p-4 rounded-lg">
                        <p className="text-sm mb-2"><strong>Example:</strong> "I will journal Monday through Friday. Once per day, I will take my emotions and reflect in my journal. I will turn off electronics 30 minutes earlier each night to journal."</p>
                        <p className="text-sm">This will help me identify emotional triggers and become more self-aware over the next three months.</p>
                    </div>
                </div>
            </div>
        </MilestonePageShell>
    );
}

export default YieldGrowth;
