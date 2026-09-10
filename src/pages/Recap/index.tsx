import { useCallback, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpenCheck, Pencil, Quote } from 'lucide-react';
import toast from 'react-hot-toast';

import { useAuth } from '../../context/AuthContext';
import { useProgress } from '../../context/ProgressContext';
import { getAllResponses, type RecapEntry } from '../../controllers/courseController';
import { useCertificateDownload } from '../../hooks/useCertificateDownload';
import { RECAP_GROUPS } from '../../datas/recapData';
import { HIDDEN_RESPONSE_KEYS, questionFor } from '../../datas/recapQuestions';
import { CustomButton } from '../../elements/buttons';
import LoadingSpinner from '../../components/Loader';

/** `careerPaths` -> `Career paths`; good enough for every answer key we store. */
const humanize = (key: string) =>
    key
        .replace(/[_-]+/g, ' ')
        .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
        .replace(/\s+/g, ' ')
        .trim()
        .replace(/^./, (c) => c.toUpperCase());

const formatDate = (value: string | null) => {
    if (!value) return null;
    const date = new Date(value);
    return Number.isNaN(date.getTime())
        ? null
        : date.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
};

const isEmptyValue = (value: unknown): boolean =>
    value === null ||
    value === undefined ||
    (typeof value === 'string' && value.trim() === '') ||
    (Array.isArray(value) && value.every(isEmptyValue)) ||
    (typeof value === 'object' &&
        !Array.isArray(value) &&
        Object.entries(value as Record<string, unknown>)
            .filter(([key]) => !HIDDEN_RESPONSE_KEYS.has(key))
            .every(([, nested]) => isEmptyValue(nested)));

/**
 * The quick assessments store their scale as `sqs`: four options, one flagged
 * `selected`. Shown raw that is four rows of noise under every question, so it
 * collapses to the single answer the participant actually picked.
 */
const selectedScaleAnswer = (value: unknown): string | null => {
    if (!Array.isArray(value)) return null;
    const options = value as Array<Record<string, unknown>>;
    const looksLikeScale = options.every(
        (option) => option && typeof option === 'object' && 'title' in option && 'selected' in option
    );
    if (!looksLikeScale) return null;
    const picked = options.find((option) => option.selected);
    return picked ? String(picked.title) : null;
};

/** Response fields worth showing: the participant's own work, nothing else. */
const meaningfulEntries = (data: Record<string, unknown>) =>
    Object.entries(data).filter(
        ([key, value]) => !HIDDEN_RESPONSE_KEYS.has(key) && !isEmptyValue(value)
    );

const hasAnswers = (entry?: RecapEntry) =>
    Boolean(entry) && meaningfulEntries(entry!.responses).length > 0;

/**
 * Answers are stored per milestone with no shared schema — strings, numbers,
 * lists of picks, and nested objects all appear. Rather than hand-write a view
 * for each of the ~30 milestones, this renders whatever shape it is handed.
 */
function AnswerValue({ value, stepKey }: { value: unknown; stepKey: string }) {
    if (isEmptyValue(value)) return null;

    if (typeof value === 'boolean') return <span>{value ? 'Yes' : 'No'}</span>;

    if (typeof value === 'string' || typeof value === 'number') {
        return (
            <p className="whitespace-pre-wrap wrap-break-word text-[15px] leading-relaxed text-zinc-800">
                {String(value)}
            </p>
        );
    }

    if (Array.isArray(value)) {
        const scaleAnswer = selectedScaleAnswer(value);
        if (scaleAnswer) {
            return (
                <span className="inline-flex rounded-full bg-[#16697A]/10 px-3 py-1 text-sm font-semibold text-[#16697A]">
                    {scaleAnswer}
                </span>
            );
        }

        const items = value.filter((item) => !isEmptyValue(item));
        if (!items.length) return null;

        const allPrimitive = items.every((item) => item === null || typeof item !== 'object');
        if (allPrimitive) {
            return (
                <ul className="list-disc space-y-1 pl-5 text-[15px] leading-relaxed text-zinc-800">
                    {items.map((item, index) => (
                        <li key={index}>{String(item)}</li>
                    ))}
                </ul>
            );
        }
        return (
            <div className="space-y-3">
                {items.map((item, index) => (
                    <div key={index} className="rounded-xl border border-zinc-200/80 bg-zinc-50/70 p-4">
                        <AnswerValue value={item} stepKey={stepKey} />
                    </div>
                ))}
            </div>
        );
    }

    if (typeof value === 'object') {
        return <AnswerFields data={value as Record<string, unknown>} stepKey={stepKey} />;
    }

    return null;
}

function AnswerFields({ data, stepKey }: { data: Record<string, unknown>; stepKey: string }) {
    const entries = meaningfulEntries(data);
    if (!entries.length) return null;

    // The quick assessments save each item as `{ description, sqs }` — the
    // question and the scale it was answered on. Shown as two labelled fields
    // that reads as "Description / Sqs"; shown as a pair it reads as the
    // question and the participant's answer.
    const scaleEntry = entries.find(([, value]) => selectedScaleAnswer(value) !== null);
    if (scaleEntry && typeof data.description === 'string' && data.description.trim()) {
        return (
            <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="text-sm font-medium text-zinc-700">{data.description}</p>
                <span className="inline-flex rounded-full bg-[#16697A]/10 px-3 py-1 text-sm font-semibold text-[#16697A]">
                    {selectedScaleAnswer(scaleEntry[1])}
                </span>
            </div>
        );
    }

    return (
        <dl className="space-y-5">
            {entries.map(([key, value]) => {
                const question = questionFor(stepKey, key);
                const scaleAnswer = selectedScaleAnswer(value);

                // A scale answer belongs on the same line as the question it answers.
                if (scaleAnswer) {
                    return (
                        <div key={key} className="flex flex-wrap items-center justify-between gap-3">
                            <dt className="text-sm font-medium text-zinc-600">{question ?? humanize(key)}</dt>
                            <dd>
                                <AnswerValue value={value} stepKey={stepKey} />
                            </dd>
                        </div>
                    );
                }

                return (
                    <div key={key}>
                        <dt className="mb-1.5 flex items-start gap-1.5">
                            {question && <Quote className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#16697A]/60" />}
                            <span
                                className={
                                    question
                                        ? 'text-sm font-semibold leading-snug text-[#16697A]'
                                        : 'text-xs font-bold uppercase tracking-wide text-zinc-500'
                                }
                            >
                                {question ?? humanize(key)}
                            </span>
                        </dt>
                        <dd className="border-l-2 border-zinc-200 pl-4">
                            <AnswerValue value={value} stepKey={stepKey} />
                        </dd>
                    </div>
                );
            })}
        </dl>
    );
}

function StepCard({ stepKey, title, href, entry }: { stepKey: string; title: string; href: string; entry: RecapEntry }) {
    const savedOn = formatDate(entry.submittedAt ?? null);

    return (
        <article className="recap-card group rounded-2xl border border-zinc-200/80 bg-white p-5 shadow-[0_1px_3px_rgba(0,0,0,0.04)] transition-shadow sm:p-6">
            <div className="mb-4 flex flex-wrap items-start justify-between gap-3 border-b border-zinc-100 pb-4">
                <div>
                    <h3 className="text-base font-bold text-zinc-900">{title}</h3>
                    {savedOn && <p className="mt-0.5 text-xs text-zinc-500">Saved {savedOn}</p>}
                </div>
                <div className="flex items-center gap-2">
                    <span
                        className={`rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide ${entry.status === 'submitted'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-amber-100 text-amber-800'
                            }`}
                    >
                        {entry.status === 'submitted' ? 'Submitted' : 'Draft'}
                    </span>
                    <Link
                        to={href}
                        className="recap-no-print flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold text-[#16697A] hover:bg-[#16697A]/10"
                    >
                        <Pencil className="h-3.5 w-3.5" /> Open
                    </Link>
                </div>
            </div>

            <AnswerFields data={entry.responses} stepKey={stepKey} />
        </article>
    );
}

/**
 * One page holding every answer the participant has saved across the whole
 * programme. Read-only on purpose: editing happens in the milestone itself, and
 * this is the place to look back at — or print — the journey as a whole.
 */
function Recap() {
    const { user, userProfile } = useAuth();
    const { progress } = useProgress();
    const { download, loading: downloading } = useCertificateDownload();

    const [entries, setEntries] = useState<Record<string, RecapEntry>>({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!user) return;

        let cancelled = false;

        const load = async () => {
            setLoading(true);
            try {
                const data = await getAllResponses();
                if (cancelled) return;
                setEntries(data.responses ?? {});
                setError(null);
            } catch (err: any) {
                if (cancelled) return;
                setError(err?.message ?? 'Could not load your recap.');
                toast.error(err?.message ?? 'Could not load your recap.');
            } finally {
                if (!cancelled) setLoading(false);
            }
        };

        void load();
        return () => { cancelled = true; };
    }, [user]);

    // The recap only shows work the participant actually did: steps with nothing
    // saved — and groups where nothing was saved at all — are left out entirely
    // rather than printing pages of "not completed yet".
    const groups = useMemo(
        () => RECAP_GROUPS
            .map((group) => ({
                ...group,
                steps: group.steps.filter((step) => hasAnswers(entries[step.key])),
            }))
            .filter((group) => group.steps.length > 0),
        [entries]
    );

    const answeredCount = useMemo(
        () => groups.reduce((total, group) => total + group.steps.length, 0),
        [groups]
    );

    const percent = Math.floor(progress?.summary?.percent ?? 0);
    const displayName = userProfile?.displayName?.trim() || user?.displayName?.trim() || '';

    const handlePrint = useCallback(() => window.print(), []);

    if (loading) return <LoadingSpinner />;

    return (
        <div className="recap-page container mx-auto px-4 pb-16 pt-32 sm:pt-36">
            <header className="recap-hero overflow-hidden rounded-3xl border border-zinc-200/80 bg-white shadow-[0_2px_10px_rgba(0,0,0,0.05)]">
                <div className="bg-linear-to-br from-[#16697A] via-[#1c7f8f] to-[#489FB5] px-6 py-8 text-white sm:px-10 sm:py-10">
                    <div className="flex flex-wrap items-end justify-between gap-6">
                        <div>
                            <div className="flex items-center gap-2 text-white/85">
                                <BookOpenCheck className="h-5 w-5" />
                                <span className="text-xs font-bold uppercase tracking-[0.18em]">Journey Recap</span>
                            </div>
                            <h1 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
                                {displayName ? `${displayName}'s iJOURNEY` : 'Your iJOURNEY'}
                            </h1>
                            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/85">
                                Everything you have written across all seven milestones, gathered in one place.
                                To change an answer, open the milestone it belongs to.
                            </p>
                        </div>

                        <div className="recap-no-print flex flex-wrap gap-2">
                            <CustomButton
                                title="Print / Save as PDF"
                                onClickFunc={handlePrint}
                                className="rounded-full"
                                type="green"
                            />
                            <CustomButton
                                title="Certificate"
                                onClickFunc={download}
                                className="rounded-full"
                                type="move"
                                loading={downloading}
                            />
                        </div>
                    </div>
                </div>

                <div className="grid gap-px bg-zinc-200/80 sm:grid-cols-3">
                    {[
                        { value: `${percent}%`, label: 'Journey complete' },
                        { value: answeredCount, label: 'Steps with saved work' },
                        { value: groups.length, label: 'Sections started' },
                    ].map((stat) => (
                        <div key={stat.label} className="bg-white px-6 py-5 text-center">
                            <p className="text-3xl font-extrabold tracking-tight text-[#16697A]">{stat.value}</p>
                            <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-zinc-500">
                                {stat.label}
                            </p>
                        </div>
                    ))}
                </div>
            </header>

            {error && (
                <p className="mt-6 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                    {error}
                </p>
            )}

            {!error && !groups.length && (
                <div className="mt-8 rounded-3xl border border-zinc-200/80 bg-white p-10 text-center shadow-sm">
                    <h2 className="text-xl font-bold text-zinc-900">Nothing to recap yet</h2>
                    <p className="mx-auto mt-2 max-w-md text-sm text-zinc-600">
                        Once you save your first answers, they will appear here — milestone by milestone.
                    </p>
                    <Link
                        to="/milestones/milestone0/1"
                        className="recap-no-print mt-6 inline-block rounded-full bg-[#16697A] px-6 py-3 text-sm font-bold text-white hover:opacity-90"
                    >
                        Start your journey
                    </Link>
                </div>
            )}

            <div className="mt-10 space-y-12">
                {groups.map((group, index) => (
                    <section key={group.title} className="recap-section">
                        <div className="mb-5 flex items-center gap-3">
                            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-[#16697A] text-sm font-extrabold text-white">
                                {index + 1}
                            </span>
                            <h2 className="text-xl font-extrabold tracking-tight text-zinc-900">{group.title}</h2>
                            <span className="h-px flex-1 bg-zinc-200" />
                            <span className="shrink-0 text-xs font-semibold text-zinc-500">
                                {group.steps.length} {group.steps.length === 1 ? 'entry' : 'entries'}
                            </span>
                        </div>

                        <div className="space-y-4">
                            {group.steps.map((step) => (
                                <StepCard
                                    key={step.key}
                                    stepKey={step.key}
                                    title={step.title}
                                    href={step.href}
                                    entry={entries[step.key]}
                                />
                            ))}
                        </div>
                    </section>
                ))}
            </div>
        </div>
    );
}

export default Recap;
