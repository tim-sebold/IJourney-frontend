import { useNavigate } from "react-router-dom";
import { useAuth } from '../../../context/AuthContext';
import { getMilestone, submitMilestone, unlockNext } from "../../../controllers/courseController";
import toast from "react-hot-toast";

import { Lightbulb } from "lucide-react";
import { CustomButton } from "../../../elements/buttons";
import type { ChangeEvent } from 'react'
import { useEffect, useMemo, useState, } from "react";

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

type SmartGoalField = keyof Pick<
    SmartGoal,
    "goal" | "deadline" | "accountabilityPartner"
>;

function OasisExploration() {
    const navigate = useNavigate();
    const { user } = useAuth();

    const [smartGoals, setSmartGoals] = useState<SmartGoal[]>(
        INITIAL_SMART_GOALS
    );

    useEffect(() => {
        if(user) {
            const getResponse = async () => {
                const response = await getMilestone('milestone7_2');
                if (response) {
                    setSmartGoals(response.responses.smartGoals as SmartGoal[]);
                }
            }
            getResponse();
        }
    }, [user])

    // Single helper to handle all goal field changes
    const handleSmartGoalChange = (
        index: number,
        field: SmartGoalField,
        e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
    ) => {
        const { value } = e.target;

        setSmartGoals((prevGoals) => {
            const nextGoals = [...prevGoals];
            const goal = nextGoals[index];

            // defensive: in case index is out of bounds
            if (!goal) return prevGoals;

            nextGoals[index] = {
                ...goal,
                [field]: value,
            };

            return nextGoals;
        });
    };

    // Derived validity: true only if every field of every goal is non-empty
    const isFormValid = useMemo(
        () =>
            smartGoals.every(
                (g) =>
                    g.goal.trim() !== "" &&
                    g.accountabilityPartner.trim() !== "" &&
                    g.deadline.trim() !== ""
            ),
        [smartGoals]
    );

    const next = async () => {
        if (!user) {
            toast.error("You need to log in to unlock the next milestone.");
            return;
        }

        try {
            await submitMilestone("milestone7_2", {
                userId: user.uid,
                responses: { smartGoals },
            })
            const result = await unlockNext({
                userId: user.uid,
                milestoneId: "milestone7/3",
                prevMilestoneId: "milestone7/2",
            });
            toast.success(result.message);
            navigate("/milestones/milestone7/3");
        } catch (error) {
            console.error(error);
            const message =
                error instanceof Error ? error.message : "Something went wrong.";
            toast.error(message);
        }
    };

    const previous = () => {
        navigate("/milestones/milestone7/1");
    };

    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col items-center text-center">
                <h3 className="font-bold">M7.2: Oasis Exploration</h3>
                <h6>Creating Your Personal Growth Plan</h6>
            </div>

            <div className="flex flex-col gap-6">
                <div className="space-y-6">
                    {/* SMART Goal Template */}
                    <div className="bg-purple-50 p-6 rounded-lg border-l-4 border-purple-500">
                        <h4 className="text-xl font-bold text-purple-800 mb-3">
                            Your SMART Goal Template
                        </h4>
                        <p className="mb-4">
                            Use this template to create your first SMART goal based on your
                            unchartered career territory map (from previous milestones).
                        </p>

                        <div className="space-y-6">
                            {smartGoals.map((goal, index) => (
                                <div
                                    key={goal.id}
                                    className="bg-white p-4 rounded-lg shadow"
                                >
                                    <h5 className="font-semibold text-purple-700 mb-3">
                                        Goal #{index + 1}
                                    </h5>

                                    {/* Goal text */}
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            What SMART goal can you set based on your Unchartered
                                            Career Territory map?
                                        </label>
                                        <textarea
                                            value={goal.goal}
                                            onChange={(e) =>
                                                handleSmartGoalChange(index, "goal", e)
                                            }
                                            placeholder="Describe your specific, measurable, achievable, relevant, and time-bound goal"
                                            className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                            rows={2}
                                        />
                                    </div>

                                    {/* Accountability Partner */}
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Who can be your goal's mini-comrade with you as you try to
                                            accomplish it? This could be a friend, a mentor, or even a
                                            family member. Someone whom you could hold you
                                            accountable. Having someone to guide you can make a huge
                                            difference.
                                        </label>
                                        <input
                                            type="text"
                                            value={goal.accountabilityPartner}
                                            onChange={(e) =>
                                                handleSmartGoalChange(
                                                    index,
                                                    "accountabilityPartner",
                                                    e
                                                )
                                            }
                                            placeholder="Name your Accountability Partner"
                                            className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>

                                    {/* How will they hold you accountable */}
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            How will you ask them to hold you accountable?
                                        </label>
                                        <textarea
                                            value={goal.deadline}
                                            onChange={(e) =>
                                                handleSmartGoalChange(index, "deadline", e)
                                            }
                                            placeholder="Describe how you will check in with your accountability partner"
                                            className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                            rows={2}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* AI Goal Setting Assistant */}
                    <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500">
                        <h4 className="text-xl font-bold text-blue-800 mb-3">
                            AI Goal Setting Assistant
                        </h4>
                        <p className="mb-4">
                            Our AI chatbot can help you refine your SMART goals by asking
                            probing questions:
                        </p>
                        <ul className="space-y-2 mb-4">
                            <li className="flex items-start gap-2">
                                <Lightbulb className="w-4 h-4 text-blue-600 mt-1" />{" "}
                                "Is your goal specific enough to know exactly what you're
                                working toward?"
                            </li>
                            <li className="flex items-start gap-2">
                                <Lightbulb className="w-4 h-4 text-blue-600 mt-1" />{" "}
                                "How will you measure your progress toward this goal?"
                            </li>
                            <li className="flex items-start gap-2">
                                <Lightbulb className="w-4 h-4 text-blue-600 mt-1" />{" "}
                                "Is this goal achievable given your current resources and
                                constraints?"
                            </li>
                            <li className="flex items-start gap-2">
                                <Lightbulb className="w-4 h-4 text-blue-600 mt-1" />{" "}
                                "How does this goal connect to your Journeyer's Statement?"
                            </li>
                            <li className="flex items-start gap-2">
                                <Lightbulb className="w-4 h-4 text-blue-600 mt-1" />{" "}
                                "What's your deadline for achieving this goal?"
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Navigation buttons */}
            <div className="flex justify-between w-full gap-2 text-center">
                {/* Previous always visible */}
                <CustomButton
                    onClickFunc={previous}
                    title="previous"
                    className="rounded-none justify-end"
                    type="move"
                />

                <CustomButton
                    onClickFunc={next}
                    title="next"
                    className="rounded-none justify-end"
                    type="move"
                    disabled={!isFormValid}
                />
            </div>
        </div>
    );
}

export default OasisExploration;
