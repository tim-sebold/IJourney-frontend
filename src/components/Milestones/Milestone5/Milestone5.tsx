

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { ListChecks } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../../../context/AuthContext';
import { getMilestone, submitMilestone, unlockNext } from "../../../controllers/courseController";
import toast from "react-hot-toast";
import { CustomButton } from "../../../elements/buttons";
import { MilitaryPathsCard } from "../shared/MilitaryPathsCard";

const ACTION_STEPS = [
    "Research 3 colleges/programs that match my interests",
    "Check admission requirements for each",
    "Apply for at least 5 scholarships",
    "Complete FAFSA application",
    "Schedule a meeting with my counselor",
] as const;

const TOP_PATHWAY_PLACEHOLDERS = [
    "e.g., Greenville Technical College — Nursing",
    "e.g., The Citadel — Criminal Justice",
    "e.g., Local HVAC apprenticeship",
] as const;

interface PlanState {
    preferredPath: string;
    scholarships: string;
    grants: string;
    loanStrategy: string;
    /** The participant's three shortlisted schools, programmes, or training paths. */
    topPathways: string[];
}

const initialPlanState: PlanState = {
    preferredPath: "",
    scholarships: "",
    grants: "",
    loanStrategy: "",
    topPathways: ["", "", ""],
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
                if (response) {
                    const saved = (response.responses?.plan ?? {}) as Partial<PlanState>;
                    setPlan({
                        ...initialPlanState,
                        ...saved,
                        topPathways: [0, 1, 2].map((i) => saved.topPathways?.[i] ?? ""),
                    });
                }
            }
            getResponse();
        }
    }, [user])

    // Derived state: is the form complete?
    const isFormComplete = useMemo(() => {
        const { preferredPath, scholarships, grants, loanStrategy, topPathways } = plan;

        return (
            preferredPath.trim() !== "" &&
            scholarships.trim() !== "" &&
            grants.trim() !== "" &&
            loanStrategy.trim() !== "" &&
            topPathways.every((pathway) => pathway.trim() !== "")
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

    const handleTopPathwayChange = useCallback(
        (index: number, value: string) => {
            setPlan((prev) => ({
                ...prev,
                topPathways: prev.topPathways.map((pathway, i) => (i === index ? value : pathway)),
            }));
        },
        []
    );

    const handlePrevious = useCallback(() => {
        navigate("/milestones/milestone5/4");
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
    }, [user, isFormComplete, navigate, plan]);

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
                                <option value="military">Military School / Service Academy</option>
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
                        <div className="mb-6 rounded-lg bg-white p-4 shadow">
                            <h5 className="mb-2 font-semibold">Action Steps</h5>
                            <ul className="list-disc space-y-2 pl-5 text-sm">
                                {ACTION_STEPS.map((label) => (
                                    <li key={label}>{label}</li>
                                ))}
                            </ul>
                        </div>

                        {/* Top 3 Educational Pathways */}
                        <div className="rounded-lg bg-white p-4 shadow">
                            <div className="mb-2 flex items-center gap-2">
                                <ListChecks className="h-5 w-5 text-blue-600" />
                                <h5 className="font-semibold">My Top 3 Educational Pathways</h5>
                            </div>
                            <p className="mb-4 text-sm text-gray-600">
                                List the three schools, programs, or training paths you are most serious about
                                — for example a college, a technical program, a military path, or an apprenticeship.
                            </p>
                            <div className="space-y-3">
                                {plan.topPathways.map((pathway, index) => (
                                    <div key={index}>
                                        <label
                                            htmlFor={`top-pathway-${index}`}
                                            className="mb-1 block text-sm font-medium text-gray-700"
                                        >
                                            Pathway {index + 1}
                                        </label>
                                        <input
                                            id={`top-pathway-${index}`}
                                            type="text"
                                            value={pathway}
                                            onChange={(e) => handleTopPathwayChange(index, e.target.value)}
                                            placeholder={TOP_PATHWAY_PLACEHOLDERS[index]}
                                            className="w-full rounded-md border p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <MilitaryPathsCard />
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
