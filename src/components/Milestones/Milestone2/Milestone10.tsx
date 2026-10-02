import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { getMilestone } from '../../../controllers/courseController';
import { useMilestoneNav } from '../../../hooks/useMilestoneNav';
import { MilestonePageShell } from '../MilestonePageShell';

/** The groups M2.8 saves its ticked traits under, in the order they are shown. */
const CONFIDENCE_GROUPS = [
    { id: 'healthy', label: 'Healthy confidence' },
    { id: 'overlyHigh', label: 'Overly high confidence' },
    { id: 'low', label: 'Low confidence' },
] as const;

type Reflection = { question: string; answer: string; href: string };

/**
 * The close of Milestone 2. Everything on it is the student's own work, read
 * back from the steps that collected it — the traits ticked on the Confidence
 * Compass (M2.8) and the reflections written on M2.5 and M2.9. Where a step has
 * nothing saved, the page says so and links to it rather than filling the gap.
 */
function SummaryOasis() {
    const { user } = useAuth();
    const [traits, setTraits] = useState<Record<string, string[]>>({});
    const [reflections, setReflections] = useState<Reflection[]>([]);
    const [loaded, setLoaded] = useState(false);

    const { previous, next, isNextLoading } = useMilestoneNav({
        previousRoute: "/milestones/milestone2/9",
        nextRoute: "/milestones/milestone3/1",
        unlock: { milestoneId: "milestone3/1", prevMilestoneId: "milestone2/10" },
    });

    useEffect(() => {
        if (!user) return;
        let active = true;

        (async () => {
            const [compass, eq, character] = await Promise.all([
                getMilestone('milestone2_8'),
                getMilestone('milestone2_5'),
                getMilestone('milestone2_9'),
            ]);
            if (!active) return;

            const selected = (compass?.responses?.selected ?? {}) as Record<string, unknown>;
            setTraits(Object.fromEntries(
                CONFIDENCE_GROUPS.map(({ id }) => [
                    id,
                    Array.isArray(selected[id])
                        ? (selected[id] as unknown[]).filter((trait): trait is string => typeof trait === 'string')
                        : [],
                ])
            ));

            const answerOf = (value: unknown) => (typeof value === 'string' ? value.trim() : '');
            setReflections([
                {
                    question: 'How does Emotional Intelligence affect your actions?',
                    answer: answerOf(eq?.responses?.reflection),
                    href: '/milestones/milestone2/5',
                },
                {
                    question: 'A time your character was tested, and the traits you showed',
                    answer: answerOf(character?.responses?.reflection),
                    href: '/milestones/milestone2/9',
                },
            ]);
            setLoaded(true);
        })();

        return () => { active = false; };
    }, [user]);

    const hasTraits = CONFIDENCE_GROUPS.some(({ id }) => (traits[id] ?? []).length > 0);

    return (
        <MilestonePageShell
            title="M2.10: Oasis Summary & Commit"
            subtitle="A look back at what you discovered about yourself in your Oasis."
            onPrevious={previous}
            onNext={next}
            isNextLoading={isNextLoading}
        >
            <div>
                <h4 className='font-bold'>My Confidence Compass</h4>
                {!loaded ? (
                    <h6>Loading what you chose...</h6>
                ) : hasTraits ? (
                    <div className="mt-2 flex flex-col gap-3">
                        <h6>These are the statements you chose as true for you right now:</h6>
                        {CONFIDENCE_GROUPS.filter(({ id }) => (traits[id] ?? []).length > 0).map(({ id, label }) => (
                            <div key={id}>
                                <h6 className='font-bold text-ib-1'>{label}</h6>
                                <ul className="list-disc pl-6">
                                    {traits[id].map((trait) => <li key={trait}>{trait}</li>)}
                                </ul>
                            </div>
                        ))}
                    </div>
                ) : (
                    <h6>
                        You have not chosen any statements on the Confidence Compass yet.{' '}
                        <Link to="/milestones/milestone2/8" className="font-bold text-ib-1 underline">Go to M2.8</Link>
                    </h6>
                )}
            </div>

            <div>
                <h4 className='font-bold'>My Oasis Reflection Notes</h4>
                {!loaded ? (
                    <h6>Loading what you wrote...</h6>
                ) : (
                    <div className="mt-2 flex flex-col gap-4">
                        {reflections.map(({ question, answer, href }) => (
                            <div key={href}>
                                <h6 className='font-bold'>{question}</h6>
                                {answer ? (
                                    <p className="whitespace-pre-wrap">{answer}</p>
                                ) : (
                                    <h6>
                                        Nothing written yet.{' '}
                                        <Link to={href} className="font-bold text-ib-1 underline">Write it now</Link>
                                    </h6>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <h6>
                Your Oasis is yours to return to. When you are ready, press Next to carry
                what you have learned about yourself into Milestone 3.
            </h6>
        </MilestonePageShell>
    );
}

export default SummaryOasis;
