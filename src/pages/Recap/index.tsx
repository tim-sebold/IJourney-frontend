import { useCallback, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpenCheck, Pencil } from 'lucide-react';
import toast from 'react-hot-toast';

import { useAuth } from '../../context/AuthContext';
import { useProgress } from '../../context/ProgressContext';
import { getAllResponses, type RecapEntry } from '../../controllers/courseController';
import { useCertificateDownload } from '../../hooks/useCertificateDownload';
import { RECAP_GROUPS } from '../../datas/recapData';
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
    (Array.isArray(value) && value.length === 0) ||
    (typeof value === 'object' && !Array.isArray(value) && Object.keys(value as object).length === 0);

const EmptyValue = () => <span className="italic text-zinc-400">Not answered</span>;

/**
 * Answers are stored per milestone with no shared schema — strings, numbers,
 * lists of picks, and nested objects all appear. Rather than hand-write a view
 * for each of the ~30 milestones, this renders whatever shape it is handed.
 */
function AnswerValue({ value }: { value: unknown }) {
    if (isEmptyValue(value)) return <EmptyValue />;

    if (typeof value === 'boolean') return <span>{value ? 'Yes' : 'No'}</span>;

    if (typeof value === 'string' || typeof value === 'number') {
        return <span className="whitespace-pre-wrap wrap-break-word">{String(value)}</span>;
    }

    if (Array.isArray(value)) {
        const allPrimitive = value.every((item) => item === null || typeof item !== 'object');
        if (allPrimitive) {
            return (
                <ul className="list-disc space-y-1 pl-5">
                    {value.map((item, index) => (
                        <li key={index}>
                            <AnswerValue value={item} />
                        </li>
                    ))}
                </ul>
            );
        }
        return (
            <div className="space-y-3">
                {value.map((item, index) => (
                    <div key={index} className="rounded-lg border border-black/5 bg-zinc-50 p-3">
                        <AnswerValue value={item} />
                    </div>
                ))}
            </div>
        );
    }

    if (typeof value === 'object') {
        return <AnswerFields data={value as Record<string, unknown>} />;
    }

    return <EmptyValue />;
}

function AnswerFields({ data }: { data: Record<string, unknown> }) {
    const entries = Object.entries(data);
    if (!entries.length) return <EmptyValue />;

    return (
        <dl className="space-y-3">
            {entries.map(([key, value]) => (
                <div key={key} className="grid gap-1 sm:grid-cols-[minmax(0,180px)_1fr] sm:gap-4">
                    <dt className="text-sm font-semibold text-zinc-500">{humanize(key)}</dt>
                    <dd className="text-sm text-zinc-800">
                        <AnswerValue value={value} />
                    </dd>
                </div>
            ))}
        </dl>
    );
}

function StepCard({ title, href, entry, isRequired }: {
    title: string;
    href: string;
    entry?: RecapEntry;
    isRequired: boolean;
}) {
    const savedOn = formatDate(entry?.submittedAt ?? null);

    return (
        <article className="recap-card rounded-2xl border border-black/5 bg-white p-5 shadow-sm">
            <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                    <h3 className="text-base font-bold text-zinc-900">{title}</h3>
                    {savedOn && <p className="mt-1 text-xs text-zinc-500">Saved {savedOn}</p>}
                </div>
                <div className="flex items-center gap-2">
                    {entry && (
                        <span
                            className={`rounded-full px-3 py-1 text-xs font-semibold ${entry.status === 'submitted'
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-amber-100 text-amber-800'
                                }`}
                        >
                            {entry.status === 'submitted' ? 'Submitted' : 'Draft'}
                        </span>
                    )}
                    <Link
                        to={href}
                        className="recap-no-print flex items-center gap-1 text-xs font-semibold text-indigo-600 hover:underline"
                    >
                        <Pencil className="h-3.5 w-3.5" /> Open
                    </Link>
                </div>
            </div>

            <div className="mt-4">
                {entry ? (
                    <AnswerFields data={entry.responses} />
                ) : (
                    <p className="text-sm italic text-zinc-500">
                        {isRequired ? 'Not completed yet.' : 'Reading only — nothing to save on this page.'}
                    </p>
                )}
            </div>
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
    const [required, setRequired] = useState<string[]>([]);
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
                setRequired(data.required ?? []);
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

    const requiredSet = useMemo(() => new Set(required), [required]);

    // Groups the participant has not reached yet would print as pages of "not
    // completed yet" — the recap only shows what has actually been worked through.
    const groups = useMemo(
        () => RECAP_GROUPS
            .map((group) => ({
                ...group,
                answered: group.steps.filter((step) => entries[step.key]).length,
            }))
            .filter((group) => group.answered > 0),
        [entries]
    );

    const answeredCount = useMemo(
        () => Object.keys(entries).length,
        [entries]
    );

    const percent = Math.floor(progress?.summary?.percent ?? 0);
    const displayName = userProfile?.displayName?.trim() || user?.displayName?.trim() || '';

    const handlePrint = useCallback(() => window.print(), []);

    if (loading) return <LoadingSpinner />;

    return (
        <div className="recap-page container mx-auto px-4 py-10">
            <header className="rounded-3xl border border-black/5 bg-white p-6 shadow-sm sm:p-8">
                <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                        <div className="flex items-center gap-2 text-[#16697A]">
                            <BookOpenCheck className="h-6 w-6" />
                            <span className="text-sm font-bold uppercase tracking-wide">Journey Recap</span>
                        </div>
                        <h1 className="mt-2 text-3xl font-extrabold text-zinc-900">
                            {displayName ? `${displayName}'s iJOURNEY` : 'Your iJOURNEY'}
                        </h1>
                        <p className="mt-2 max-w-2xl text-sm text-zinc-600">
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

                <div className="mt-6 grid gap-3 sm:grid-cols-3">
                    <div className="rounded-2xl bg-emerald-50 p-4">
                        <p className="text-2xl font-extrabold text-emerald-800">{percent}%</p>
                        <p className="text-xs font-semibold text-emerald-900/70">Journey complete</p>
                    </div>
                    <div className="rounded-2xl bg-indigo-50 p-4">
                        <p className="text-2xl font-extrabold text-indigo-800">{answeredCount}</p>
                        <p className="text-xs font-semibold text-indigo-900/70">Steps with saved work</p>
                    </div>
                    <div className="rounded-2xl bg-amber-50 p-4">
                        <p className="text-2xl font-extrabold text-amber-800">{groups.length}</p>
                        <p className="text-xs font-semibold text-amber-900/70">Sections started</p>
                    </div>
                </div>
            </header>

            {error && (
                <p className="mt-6 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                    {error}
                </p>
            )}

            {!error && !groups.length && (
                <div className="mt-6 rounded-3xl border border-black/5 bg-white p-8 text-center shadow-sm">
                    <h2 className="text-xl font-bold text-zinc-900">Nothing to recap yet</h2>
                    <p className="mx-auto mt-2 max-w-md text-sm text-zinc-600">
                        Once you save your first answers, they will appear here — milestone by milestone.
                    </p>
                    <Link
                        to="/milestones/milestone0/1"
                        className="mt-5 inline-block rounded-full bg-[#16697A] px-6 py-3 text-sm font-bold text-white hover:opacity-90"
                    >
                        Start your journey
                    </Link>
                </div>
            )}

            <div className="mt-8 space-y-10">
                {groups.map((group) => (
                    <section key={group.title} className="recap-section space-y-4">
                        <div className="flex items-baseline justify-between gap-3 border-b border-black/10 pb-2">
                            <h2 className="text-xl font-extrabold text-zinc-900">{group.title}</h2>
                            <span className="text-xs font-semibold text-zinc-500">
                                {group.answered} of {group.steps.length} steps saved
                            </span>
                        </div>

                        <div className="space-y-4">
                            {group.steps.map((step) => (
                                <StepCard
                                    key={step.key}
                                    title={step.title}
                                    href={step.href}
                                    entry={entries[step.key]}
                                    isRequired={requiredSet.has(step.key)}
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
