import { useEffect, useMemo, useState, type ChangeEvent } from "react";
import { Lightbulb } from "lucide-react";
import { MilestonePageShell } from "../MilestonePageShell";
import { useMilestoneNav } from "../../../hooks/useMilestoneNav";
import { getMilestone } from "../../../controllers/courseController";
import { useAuth } from "../../../context/AuthContext";

interface SmartGoal {
    id: number;
    goal: string;
    deadline: string;
    accountabilityPartner: string;
}

const INITIAL_SMART_GOALS: SmartGoal[] = [
    { id: 1, goal: "", deadline: "", accountabilityPartner: "" },
    { id: 2, goal: "", deadline: "", accountabilityPartner: "" },
    { id: 3, goal: "", deadline: "", accountabilityPartner: "" },
];

type SmartGoalField = keyof Pick<SmartGoal, "goal" | "deadline" | "accountabilityPartner">;

function OasisExploration() {
    const { user } = useAuth();
    const [smartGoals, setSmartGoals] = useState<SmartGoal[]>(INITIAL_SMART_GOALS);

    useEffect(() => {
        if (!user) return;
        (async () => {
            const response = await getMilestone("milestone7_2");
            if (response?.responses?.smartGoals) {
                setSmartGoals(response.responses.smartGoals as SmartGoal[]);
            }
        })();
    }, [user]);

    const handleSmartGoalChange = (
        index: number,
        field: SmartGoalField,
        e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
    ) => {
        const value = e.target.value;
        setSmartGoals((prev) => {
            const next = [...prev];
            if (!next[index]) return prev;
            next[index] = { ...next[index], [field]: value };
            return next;
        });
    };

    const isFormValid = useMemo(
        () =>
            smartGoals.every(
                (g) => g.goal.trim() && g.accountabilityPartner.trim() && g.deadline.trim()
            ),
        [smartGoals]
    );

    const { previous, next, isNextLoading } = useMilestoneNav({
        previousRoute: "/milestones/milestone7/1",
        nextRoute: "/milestones/milestone7/3",
        submit: { milestoneKey: "milestone7_2", responses: { smartGoals } },
        unlock: { milestoneId: "milestone7/3", prevMilestoneId: "milestone7/2" },
    });

    return (
        <MilestonePageShell
            title="M7.2: Oasis Exploration"
            subtitle="Creating Your Personal Growth Plan"
            onPrevious={previous}
            onNext={next}
            nextDisabled={!isFormValid}
            isNextLoading={isNextLoading}
        >
            <div className="space-y-6">
                <div className="bg-purple-50 p-6 rounded-lg border-l-4 border-purple-500">
                    <h4 className="text-xl font-bold text-purple-800 mb-3">Your SMART Goal Template</h4>
                    <p className="mb-4">Use this template to create your first SMART goal...</p>

                    <div className="space-y-6">
                        {smartGoals.map((goal, index) => (
                            <div key={goal.id} className="bg-white p-4 rounded-lg shadow">
                                <h5 className="font-semibold text-purple-700 mb-3">Goal #{index + 1}</h5>

                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        What SMART goal can you set...?
                                    </label>
                                    <textarea
                                        value={goal.goal}
                                        onChange={(e) => handleSmartGoalChange(index, "goal", e)}
                                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                        rows={2}
                                    />
                                </div>

                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Who can be your accountability partner?
                                    </label>
                                    <input
                                        value={goal.accountabilityPartner}
                                        onChange={(e) => handleSmartGoalChange(index, "accountabilityPartner", e)}
                                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>

                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        How will you ask them to hold you accountable?
                                    </label>
                                    <textarea
                                        value={goal.deadline}
                                        onChange={(e) => handleSmartGoalChange(index, "deadline", e)}
                                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                        rows={2}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500">
                    <h4 className="text-xl font-bold text-blue-800 mb-3">AI Goal Setting Assistant</h4>
                    <ul className="space-y-2 mb-4">
                        {[
                            "Is your goal specific enough to know exactly what you're working toward?",
                            "How will you measure your progress toward this goal?",
                            "Is this goal achievable given your current resources and constraints?",
                            "How does this goal connect to your Journeyer's Statement?",
                            "What's your deadline for achieving this goal?",
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

export default OasisExploration;
