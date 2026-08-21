
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import {
    getMilestone,
    getStatementFeedback,
    submitMilestone,
    unlockNext,
} from '../../../controllers/courseController';
import type { JourneyerStatement, StatementFeedback } from '../../../controllers/courseController';
import toast from 'react-hot-toast';

import { CustomButton } from "../../../elements/buttons";
import { CheckCircle, CircleAlert, CircleDashed } from 'lucide-react';

const EMPTY_STATEMENT: JourneyerStatement = {
    iAm: '',
    iBelieve: '',
    iWill: '',
    iAmConfident: '',
    iAmCapable: '',
};

const SECTIONS: Array<{ key: keyof JourneyerStatement; label: string; hint: string }> = [
    { key: 'iAm', label: 'I AM...', hint: 'Your identity and values.' },
    { key: 'iBelieve', label: 'I BELIEVE...', hint: 'The convictions you want to act from.' },
    { key: 'iWill', label: 'I WILL...', hint: 'The action you are committing to.' },
    { key: 'iAmConfident', label: 'I AM CONFIDENT...', hint: 'What you already know you can do.' },
    { key: 'iAmCapable', label: 'I AM CAPABLE...', hint: 'The capability you are growing into.' },
];

const STATUS_ICON = {
    strong: <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-green-600" />,
    'needs-work': <CircleAlert className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />,
    empty: <CircleDashed className="mt-0.5 h-4 w-4 shrink-0 text-gray-400" />,
} as const;

function RefineFinalize() {
    const navigate = useNavigate();
    const { user } = useAuth();

    // M6.4 refines the draft written on M6.3; both live in the same response document.
    const [journeyerStatement, setJourneyerStatement] = useState<JourneyerStatement>(EMPTY_STATEMENT);
    const [loaded, setLoaded] = useState<boolean>(false);
    const [feedback, setFeedback] = useState<StatementFeedback | null>(null);
    const [feedbackLoading, setFeedbackLoading] = useState<boolean>(false);
    const [finalized, setFinalized] = useState<boolean>(false);
    const [finalizing, setFinalizing] = useState<boolean>(false);

    useEffect(() => {
        if (!user) return;
        const getResponse = async () => {
            try {
                const response = await getMilestone('milestone6_3');
                const saved = response?.responses?.journeyerStatement as Partial<JourneyerStatement> | undefined;
                if (saved) setJourneyerStatement({ ...EMPTY_STATEMENT, ...saved });
                setFinalized(response?.responses?.finalized === true);
            } catch {
                // Nothing drafted on M6.3 yet; the empty statement below prompts for it.
            } finally {
                setLoaded(true);
            }
        };
        getResponse();
    }, [user]);

    const isComplete = SECTIONS.every(({ key }) => journeyerStatement[key].trim() !== '');

    const updateSection = (key: keyof JourneyerStatement, value: string) => {
        setJourneyerStatement((prev) => ({ ...prev, [key]: value }));
        setFinalized(false);
    };

    const handleGetAIFeedback = async () => {
        if (!user) {
            toast.error("You need to log in to get feedback.");
            return;
        }

        try {
            setFeedbackLoading(true);
            const result = await getStatementFeedback(journeyerStatement);
            setFeedback(result.feedback);
        } catch (error: unknown) {
            toast.error(error instanceof Error ? error.message : "Could not get feedback.");
        } finally {
            setFeedbackLoading(false);
        }
    };

    const handleFinalizeStatement = async () => {
        if (!user) {
            toast.error("You need to log in to finalize your statement.");
            return;
        }
        if (!isComplete) {
            toast.error("Fill in all five sections before finalizing.");
            return;
        }

        try {
            setFinalizing(true);
            // `milestone6/4` is a content-only page in the course manifest, so the
            // finalized text belongs to the milestone that owns the statement: M6.3.
            await submitMilestone('milestone6_3', {
                userId: user.uid,
                responses: {
                    journeyerStatement,
                    finalized: true,
                    finalizedAt: new Date().toISOString(),
                },
            });
            setFinalized(true);
            toast.success("Statement finalized. You can still revise it any time.");
        } catch (error: unknown) {
            toast.error(error instanceof Error ? error.message : "Could not finalize your statement.");
        } finally {
            setFinalizing(false);
        }
    };

    const next = async () => {
        if (!user) {
            toast.error("You need to log in to unlock the next milestone.");
            return;
        }

        try {
            // Carry any refinement made on this page forward rather than silently
            // leaving it behind when the user clicks straight through.
            if (isComplete) {
                await submitMilestone('milestone6_3', {
                    userId: user.uid,
                    responses: { journeyerStatement, finalized },
                });
            }
            const result = await unlockNext({ userId: user.uid, milestoneId: "milestone6/5", prevMilestoneId: "milestone6/4" });
            toast.success(result.message);
        } catch (error: unknown) {
            toast.error(error instanceof Error ? error.message : "Could not unlock the next milestone.");
        }
        navigate('/milestones/milestone6/5');
    };

    const previous = () => {
        navigate('/milestones/milestone6/3');
    };

    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col items-center text-center">
                <h3 className="font-bold">M6.4: Refine &amp; Finalize Your Statement</h3>
                <h6>Polish Your Vision with Feedback</h6>
            </div>
            <div className="flex flex-col gap-6">
                <div className="space-y-6">
                    <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500">
                        <h4 className="text-xl font-bold text-blue-800 mb-3">Get Feedback</h4>
                        <p className="mb-4">
                            Your draft from M6.3 is below. Edit it here, then ask for feedback — you'll get a
                            note on each section covering how specific, committed and measurable it reads.
                        </p>

                        {loaded && !isComplete && (
                            <p className="mb-4 rounded-lg bg-white p-4 text-sm">
                                Some sections are still blank.{" "}
                                <button
                                    type="button"
                                    onClick={previous}
                                    className="cursor-pointer font-bold text-blue-700 underline"
                                >
                                    Go back to M6.3
                                </button>{" "}
                                to draft them, or write them in below.
                            </p>
                        )}

                        <div className="space-y-4">
                            {SECTIONS.map(({ key, label, hint }) => (
                                <div key={key} className="rounded-lg bg-white p-4">
                                    <label
                                        htmlFor={`statement-${key}`}
                                        className="mb-2 block text-sm font-semibold text-blue-700"
                                    >
                                        {label} <span className="font-normal text-gray-500">{hint}</span>
                                    </label>
                                    <textarea
                                        id={`statement-${key}`}
                                        value={journeyerStatement[key]}
                                        onChange={(e) => updateSection(key, e.target.value)}
                                        rows={3}
                                        className="w-full resize-none rounded-md border border-gray-300 p-3 focus:border-blue-500 focus:ring-blue-500"
                                    />
                                </div>
                            ))}
                        </div>

                        <div className="mt-4">
                            <CustomButton
                                title="Get Feedback"
                                onClickFunc={handleGetAIFeedback}
                                type='green'
                                className='rounded-full'
                                loading={feedbackLoading}
                            />
                        </div>

                        {feedback && (
                            <div className="mt-4 rounded-lg bg-white p-4">
                                <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                                    <h5 className="font-semibold text-blue-700">Feedback on your statement</h5>
                                    <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-800">
                                        {feedback.score}% ready
                                    </span>
                                </div>
                                <p className="mb-3 text-sm">{feedback.summary}</p>

                                {feedback.strengths.length > 0 && (
                                    <ul className="mb-3 space-y-1">
                                        {feedback.strengths.map((s) => (
                                            <li key={s} className="flex items-start gap-2 text-sm text-green-800">
                                                <CheckCircle className="mt-0.5 h-4 w-4 shrink-0" />
                                                {s}
                                            </li>
                                        ))}
                                    </ul>
                                )}

                                <ul className="space-y-3">
                                    {feedback.sections.map((section) => (
                                        <li key={section.key} className="rounded-md border border-gray-200 p-3">
                                            <div className="flex items-start gap-2">
                                                {STATUS_ICON[section.status]}
                                                <div className="flex-1">
                                                    <p className="text-sm font-bold">{section.label}</p>
                                                    {section.suggestions.length === 0 && (
                                                        <p className="text-sm text-gray-600">
                                                            Specific and committed — leave this as it is.
                                                        </p>
                                                    )}
                                                    {section.suggestions.length > 0 && (
                                                        <ul className="mt-1 list-disc space-y-1 pl-4 text-sm text-gray-700">
                                                            {section.suggestions.map((s) => (
                                                                <li key={s}>{s}</li>
                                                            ))}
                                                        </ul>
                                                    )}
                                                    {/* Visibly secondary: a green-ticked section must not
                                                        look as though it still has something wrong with it. */}
                                                    {section.optional?.length > 0 && (
                                                        <ul className="mt-2 space-y-1 border-t border-dashed border-gray-200 pt-2 pl-0 text-xs text-gray-500">
                                                            {section.optional.map((s) => (
                                                                <li key={s}>
                                                                    <span className="font-semibold uppercase tracking-wide">
                                                                        Optional
                                                                    </span>{" "}
                                                                    — {s}
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    )}
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>

                    <div className="bg-purple-50 p-6 rounded-lg border-l-4 border-purple-500">
                        <h4 className="text-xl font-bold text-purple-800 mb-3">Finalize Your Statement</h4>
                        <p className="mb-4">Once you're satisfied with your statement, save it as your final version. You can always come back and revise it as you grow and evolve.</p>
                        <div className="bg-white p-4 rounded-lg">
                            <h5 className="font-semibold text-purple-700 mb-2">Final Statement Preview:</h5>
                            <div className="space-y-3 text-sm">
                                {SECTIONS.map(({ key, label }) => (
                                    <p key={key}>
                                        <strong>{label}</strong>{" "}
                                        {journeyerStatement[key].trim() || (
                                            <span className="italic text-gray-400">not written yet</span>
                                        )}
                                    </p>
                                ))}
                            </div>
                        </div>
                        <div className="mt-4 flex flex-col items-center gap-3 sm:flex-row sm:justify-end">
                            {finalized && (
                                <span className="flex items-center gap-2 text-sm font-semibold text-green-700">
                                    <CheckCircle className="h-4 w-4" /> Finalized
                                </span>
                            )}
                            <CustomButton
                                title={finalized ? "Save Again" : "Finalize Statement"}
                                onClickFunc={handleFinalizeStatement}
                                type='red'
                                className='rounded-full'
                                disabled={!isComplete}
                                loading={finalizing}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex justify-between w-full gap-2 text-center">
                <CustomButton onClickFunc={previous} title='previous' className='rounded-none justify-end' type='move'></CustomButton>
                <CustomButton onClickFunc={next} title='next' className='rounded-none justify-end' type='move'></CustomButton>
            </div>
        </div>
    )
}

export default RefineFinalize;
