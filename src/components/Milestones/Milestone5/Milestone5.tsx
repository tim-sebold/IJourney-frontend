

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Lightbulb } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../../../context/AuthContext';
import { getMilestone, submitMilestone, unlockNext } from "../../../controllers/courseController";
import toast from "react-hot-toast";
import { CustomButton } from "../../../elements/buttons";

const ACTION_STEPS = [
    "Research 3 colleges/programs that match my interests",
    "Check admission requirements for each",
    "Apply for at least 5 scholarships",
    "Complete FAFSA application",
    "Schedule a meeting with my counselor",
] as const;

type ActionStepKey = `step${number}`;

interface PlanState {
    preferredPath: string;
    scholarships: string;
    grants: string;
    loanStrategy: string;
    steps: Record<ActionStepKey, boolean>;
}

const initialPlanState: PlanState = {
    preferredPath: "",
    scholarships: "",
    grants: "",
    loanStrategy: "",
    steps: {
        step1: false,
        step2: false,
        step3: false,
        step4: false,
        step5: false,
    },
};

const EducationalPlan: React.FC = () => {
    const navigate = useNavigate();
    const { user } = useAuth();

    const [plan, setPlan] = useState<PlanState>(initialPlanState);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if(user) {
            const getResponse = async () => {
                const response = await getMilestone('milestone5_5');
                console.log(response);
                
                if (response) {
                    setPlan(response.responses.plan as PlanState);
                }
            }
            getResponse();
        }
    }, [user])

    // Derived state: is the form complete?
    const isFormComplete = useMemo(() => {
        const { preferredPath, scholarships, grants, loanStrategy, steps } = plan;

        const allStepsChecked =
            steps.step1 && steps.step2 && steps.step3 && steps.step4 && steps.step5;

        return (
            preferredPath.trim() !== "" &&
            scholarships.trim() !== "" &&
            grants.trim() !== "" &&
            loanStrategy.trim() !== "" &&
            allStepsChecked
        );
    }, [plan]);

    const handleSelectChange = useCallback(
        (e: React.ChangeEvent<HTMLSelectElement>) => {
            const { name, value } = e.target;
            setPlan((prev) => ({
                ...prev,
                [name]: value,
            }));
        },
        []
    );

    const handleInputChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const { name, value } = e.target;
            setPlan((prev) => ({
                ...prev,
                [name]: value,
            }));
        },
        []
    );

    const handleCheckboxChange = useCallback(
        (key: ActionStepKey) => {
            setPlan((prev) => ({
                ...prev,
                steps: {
                    ...prev.steps,
                    [key]: !prev.steps[key],
                },
            }));
        },
        []
    );

    const handlePrevious = useCallback(() => {
        navigate("/milestones/milestone5/3");
    }, [navigate]);

    const handleNext = useCallback(async () => {
        if (!user) {
            toast.error("You need to log in to unlock the next milestone.");
            return;
        }

        if (!isFormComplete) {
            // Guard just in case; should not be reachable if button is hidden.
            toast.error("Please complete all fields before continuing.");
            return;
        }

        try {
            await submitMilestone('milestone5_5', { userId: user.uid, responses: { plan } });
            setIsSubmitting(true);
            const result = await unlockNext({
                userId: user.uid,
                milestoneId: "milestone6/1",
                prevMilestoneId: "milestone5/5",
            });
            toast.success(result.message);
            navigate("/milestones/milestone6/1");
        } catch (error: any) {
            console.error(error);
            toast.error(error?.message || "Something went wrong.");
        } finally {
            setIsSubmitting(false);
        }
    }, [user, isFormComplete, navigate]);

    return (
        <div className="flex flex-col gap-6">
            {/* Header */}
            <div className="flex flex-col items-center text-center">
                <h3 className="font-bold">M5.5: Your Educational Journey Plan</h3>
                <h6>Creating Your Personalized Path Forward</h6>
            </div>

            {/* Content */}
            <div className="flex flex-col gap-4">
                <div className="space-y-6">
                    {/* Main Plan Card */}
                    <div className="rounded-lg border-l-4 border-blue-500 bg-gradient-to-r from-blue-50 to-indigo-50 p-6">
                        <h4 className="text-xl font-bold">Create Your Personalized Plan</h4>
                        <p className="mb-4">
                            Based on what you've learned, create your personalized educational journey plan. Think
                            about your goals, interests, and financial situation.
                        </p>

                        <div className="mb-6">
                            <p className="font-bold">Goal:</p>
                            {/* You can attach this to state later if needed */}
                            <p className="text-sm text-gray-700">
                                Write down your long-term education and career goal here mentally or in your notes.
                            </p>
                        </div>

                        {/* Preferred Path */}
                        <div className="mb-6 rounded-lg bg-white p-4 shadow">
                            <h5 className="mb-2 font-semibold">My Preferred Path</h5>
                            <select
                                name="preferredPath"
                                value={plan.preferredPath}
                                onChange={handleSelectChange}
                                className="w-full rounded-md border p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                            >
                                <option value="">Select your preferred educational path</option>
                                <option value="vocational">Vocational/Technical School</option>
                                <option value="associate">Associate Degree</option>
                                <option value="bachelor">Bachelor&apos;s Degree</option>
                                <option value="graduate">Graduate/Professional Degree</option>
                                <option value="other">Other</option>
                            </select>
                        </div>

                        {/* Financial Planning */}
                        <div className="mb-6 rounded-lg bg-white p-4 shadow">
                            <h5 className="mb-2 font-semibold">Financial Planning</h5>
                            <div className="grid gap-4 md:grid-cols-2">
                                <div>
                                    <label className="mb-1 block text-sm font-medium text-gray-700">
                                        Scholarships I&apos;ll Apply For
                                    </label>
                                    <input
                                        type="text"
                                        name="scholarships"
                                        value={plan.scholarships}
                                        onChange={handleInputChange}
                                        placeholder="e.g., Merit-based scholarships"
                                        className="w-full rounded-md border p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    />
                                </div>
                                <div>
                                    <label className="mb-1 block text-sm font-medium text-gray-700">
                                        Grants I&apos;m Eligible For
                                    </label>
                                    <input
                                        type="text"
                                        name="grants"
                                        value={plan.grants}
                                        onChange={handleInputChange}
                                        placeholder="e.g., Pell Grant"
                                        className="w-full rounded-md border p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    />
                                </div>
                            </div>

                            <div className="mt-4">
                                <label className="mb-1 block text-sm font-medium text-gray-700">
                                    Loan Strategy
                                </label>
                                <select
                                    name="loanStrategy"
                                    value={plan.loanStrategy}
                                    onChange={handleSelectChange}
                                    className="w-full rounded-md border p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                                >
                                    <option value="">Select loan strategy</option>
                                    <option value="federal">Federal loans first</option>
                                    <option value="minimal">Minimal borrowing</option>
                                    <option value="none">No loans if possible</option>
                                </select>
                            </div>
                        </div>

                        {/* Action Steps */}
                        <div className="rounded-lg bg-white p-4 shadow">
                            <h5 className="mb-2 font-semibold">Action Steps</h5>
                            <div className="space-y-3">
                                {ACTION_STEPS.map((label, index) => {
                                    const key = `step${index + 1}` as ActionStepKey;
                                    return (
                                        <div key={key} className="flex items-start gap-2">
                                            <input
                                                id={key}
                                                type="checkbox"
                                                checked={plan.steps[key]}
                                                onChange={() => handleCheckboxChange(key)}
                                                className="mt-1 h-4 w-4 cursor-pointer rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                            />
                                            <label htmlFor={key} className="cursor-pointer text-sm">
                                                {label}
                                            </label>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* AI Chatbot Assistance */}
                    <div className="rounded-lg border-l-4 border-green-500 bg-green-50 p-6">
                        <h5 className="mb-3 text-xl font-bold">AI Chatbot Assistance</h5>
                        <p className="mb-4">
                            Our AI chatbot can help you with your educational journey planning:
                        </p>
                        <div className="space-y-2 text-sm">
                            <div className="flex items-start gap-2">
                                <Lightbulb className="mt-1 h-5 w-5" />
                                Ask about specific colleges or programs
                            </div>
                            <div className="flex items-start gap-2">
                                <Lightbulb className="mt-1 h-5 w-5" />
                                Get personalized scholarship recommendations
                            </div>
                            <div className="flex items-start gap-2">
                                <Lightbulb className="mt-1 h-5 w-5" />
                                Help with financial planning questions
                            </div>
                            <div className="flex items-start gap-2">
                                <Lightbulb className="mt-1 h-5 w-5" />
                                Connect you with resources for your specific interests
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex w-full items-center justify-between gap-2 text-center">
                <CustomButton
                    onClickFunc={handlePrevious}
                    title="previous"
                    className="rounded-none justify-end"
                    type="move"
                />
                {/* NEXT BUTTON ONLY VISIBLE WHEN FORM IS COMPLETE */}
                <CustomButton
                    onClickFunc={handleNext}
                    title={isSubmitting ? "processing..." : "next"}
                    className="rounded-none justify-end disabled:opacity-60"
                    type="move"
                    disabled={!isFormComplete}
                />
            </div>
        </div>
    );
};

export default React.memo(EducationalPlan);
