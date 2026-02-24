import { useEffect, useState } from "react";
import { Target, Users, Calendar, Lightbulb } from "lucide-react";
import { MilestonePageShell } from "../MilestonePageShell";
import { useMilestoneNav } from "../../../hooks/useMilestoneNav";
import { getMilestone } from "../../../controllers/courseController";
import { useAuth } from "../../../context/AuthContext";

interface SmartGoal {
    goal: string;
    accountabilityPartner: string;
    deadline: string;
}

function TemplateReflection() {
    const { user } = useAuth();
    const [smartGoals, setSmartGoals] = useState<SmartGoal[]>([]);

    useEffect(() => {
        if (!user) return;
        (async () => {
            const response = await getMilestone("milestone7_2");
            if (response?.responses?.smartGoals) {
                setSmartGoals(response.responses.smartGoals as SmartGoal[]);
            }
        })();
    }, [user]);

    const { previous, next, isNextLoading } = useMilestoneNav({
        previousRoute: "/milestones/milestone7/2",
        nextRoute: "/milestones/milestone7/4",
        unlock: { milestoneId: "milestone7/4", prevMilestoneId: "milestone7/3" },
    });

    return (
        <MilestonePageShell
            title="M7.3: Template & Reflection"
            subtitle="Finalizing Your Growth Plan"
            onPrevious={previous}
            onNext={next}
            isNextLoading={isNextLoading}
        >
            <div className="space-y-6">
                <div className="bg-green-50 p-6 rounded-lg border-l-4 border-green-500">
                    <h4 className="text-xl font-bold text-green-800 mb-3">Your Growth Plan Template</h4>
                    <p className="mb-4">
                        Here's a clean template to organize your SMART goals...
                    </p>

                    {smartGoals.map((g, index) => (
                        <div key={index} className="bg-white p-6 rounded-lg shadow mb-6">
                            <div className="flex items-center justify-between mb-4">
                                <h5 className="font-semibold text-green-700">SMART Goal #{index + 1}</h5>
                                <div className="flex items-center gap-2">
                                    <Target className="w-5 h-5 text-green-600" />
                                    <span className="text-sm">Specific</span>
                                </div>
                            </div>
                            <p className="text-sm mb-6">{g.goal || "Your goal description will appear here..."}</p>

                            <div className="flex items-center justify-between mb-4">
                                <h5 className="font-semibold text-green-700">Accountability Partner</h5>
                                <div className="flex items-center gap-2">
                                    <Users className="w-5 h-5 text-green-600" />
                                    <span className="text-sm">Relevant</span>
                                </div>
                            </div>
                            <p className="text-sm mb-6">
                                {g.accountabilityPartner || "Your accountability partner name will appear here..."}
                            </p>

                            <div className="flex items-center justify-between mb-4">
                                <h5 className="font-semibold text-green-700">Check-in Method</h5>
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-5 h-5 text-green-600" />
                                    <span className="text-sm">Time-Bound</span>
                                </div>
                            </div>
                            <p className="text-sm">{g.deadline || "Your check-in method will appear here..."}</p>
                        </div>
                    ))}
                </div>

                <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500">
                    <h4 className="text-xl font-bold text-blue-800 mb-3">Reflection Questions</h4>
                    <ul className="space-y-2 mb-4">
                        {[
                            "How has your understanding of yourself changed throughout this journey?",
                            "What are you most proud of accomplishing in this program?",
                            "What challenges did you overcome, and what did you learn from them?",
                            "How will you continue to grow and develop after completing this program?",
                        ].map((q) => (
                            <li key={q} className="flex items-start gap-2">
                                <Lightbulb className="w-4 h-4 text-blue-600 mt-1" /> {q}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </MilestonePageShell>
    );
}

export default TemplateReflection;
