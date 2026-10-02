import { useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Copy, School as SchoolIcon } from 'lucide-react';

import {
    adminCreateSchool,
    adminListSchools,
    adminUpdateSchool,
    type School,
    type SchoolsReport,
} from '../../controllers/adminController';
import { CustomButton } from '../../elements/buttons';
import { Input } from '../../elements/input';
import { Label } from '../../elements/label';
import LoadingSpinner from '../../components/Loader';

const messageOf = (error: unknown, fallback: string) =>
    error instanceof Error && error.message ? error.message : fallback;

/**
 * Where school codes are created and counted. A student types their school's
 * code when signing up; the number beside each school is how many accounts did.
 * It is a count of signups under the code, not of the school's enrolment —
 * accounts made without a code are reported separately rather than guessed at.
 */
function Admin() {
    const [report, setReport] = useState<SchoolsReport | null>(null);
    const [loadError, setLoadError] = useState<string | null>(null);

    const [schoolName, setSchoolName] = useState('');
    const [customCode, setCustomCode] = useState('');
    const [creating, setCreating] = useState(false);

    const [editingCode, setEditingCode] = useState<string | null>(null);
    const [editingName, setEditingName] = useState('');
    const [busyCode, setBusyCode] = useState<string | null>(null);

    const load = useCallback(async () => {
        try {
            setReport(await adminListSchools());
            setLoadError(null);
        } catch (error) {
            setLoadError(messageOf(error, 'Could not load the schools.'));
        }
    }, []);

    useEffect(() => {
        void load();
    }, [load]);

    const handleCreate = async (event: React.FormEvent) => {
        event.preventDefault();
        if (schoolName.trim().length < 2) {
            toast.error('Enter the school name.');
            return;
        }

        setCreating(true);
        try {
            const { school } = await adminCreateSchool({
                schoolName: schoolName.trim(),
                ...(customCode.trim() ? { code: customCode.trim() } : {}),
            });
            toast.success(`${school.schoolName} added — its code is ${school.code}.`);
            setSchoolName('');
            setCustomCode('');
            await load();
        } catch (error) {
            toast.error(messageOf(error, 'Could not add the school.'));
        } finally {
            setCreating(false);
        }
    };

    const update = async (school: School, patch: { schoolName?: string; active?: boolean }, done: string) => {
        setBusyCode(school.code);
        try {
            await adminUpdateSchool(school.code, patch);
            toast.success(done);
            setEditingCode(null);
            await load();
        } catch (error) {
            toast.error(messageOf(error, 'Could not update the school.'));
        } finally {
            setBusyCode(null);
        }
    };

    const saveName = (school: School) => {
        if (editingName.trim().length < 2) {
            toast.error('Enter the school name.');
            return;
        }
        return update(school, { schoolName: editingName.trim() }, 'School renamed.');
    };

    const copyCode = async (code: string) => {
        try {
            await navigator.clipboard.writeText(code);
            toast.success(`Copied ${code}`);
        } catch {
            toast.error('Could not copy — select the code and copy it by hand.');
        }
    };

    if (!report && !loadError) return <LoadingSpinner />;

    const schools = report?.schools ?? [];
    const withCode = (report?.totalUsers ?? 0) - (report?.unassigned ?? 0);

    return (
        <div className="mx-auto w-full max-w-5xl px-4 pb-16 pt-[130px] font-ib-1">
            <header className="mb-6">
                <h1 className="flex items-center gap-3 text-3xl font-extrabold text-zinc-900">
                    <SchoolIcon className="h-8 w-8 text-[#16697A]" aria-hidden="true" /> School codes
                </h1>
                <p className="mt-2 max-w-3xl text-zinc-700">
                    Give each school its code. Students type it when they sign up, and the number
                    beside the school is how many accounts were created with it.
                </p>
            </header>

            {loadError && (
                <div role="alert" className="mb-6 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-800">
                    <p className="font-bold">{loadError}</p>
                    <button type="button" onClick={() => void load()} className="mt-1 cursor-pointer font-semibold underline">
                        Try again
                    </button>
                </div>
            )}

            {report && (
                <>
                    <section aria-label="Totals" className="mb-6 grid gap-px overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-200 sm:grid-cols-3">
                        {[
                            { value: report.totalUsers, label: 'Accounts in total' },
                            { value: withCode, label: 'Signed up with a school code' },
                            { value: report.unassigned, label: 'No school code' },
                        ].map((stat) => (
                            <div key={stat.label} className="bg-white px-6 py-5 text-center">
                                <p className="text-3xl font-extrabold tracking-tight text-[#16697A]">{stat.value}</p>
                                <p className="text-sm text-zinc-600">{stat.label}</p>
                            </div>
                        ))}
                    </section>

                    <section className="mb-6 rounded-2xl border border-zinc-200 bg-white p-6">
                        <h2 className="text-lg font-extrabold text-zinc-900">Add a school</h2>
                        <form onSubmit={handleCreate} className="mt-4 grid gap-4 sm:grid-cols-[2fr_1fr_auto] sm:items-end">
                            <div>
                                <Label htmlFor="schoolName">School name</Label>
                                <Input
                                    id="schoolName"
                                    value={schoolName}
                                    onChange={(e) => setSchoolName(e.target.value)}
                                    placeholder="West Middle School"
                                    maxLength={120}
                                    className="mt-1 text-black"
                                />
                            </div>
                            <div>
                                <Label htmlFor="customCode">Code (optional)</Label>
                                <Input
                                    id="customCode"
                                    value={customCode}
                                    onChange={(e) => setCustomCode(e.target.value.toUpperCase())}
                                    placeholder="Made for you if blank"
                                    maxLength={20}
                                    className="mt-1 text-black"
                                />
                            </div>
                            <CustomButton
                                title={creating ? 'Adding...' : 'Add school'}
                                onClickFunc={() => undefined}
                                className="rounded-full"
                                type="green"
                                disabled={creating}
                            />
                        </form>
                        <p className="mt-3 text-sm text-zinc-600">
                            A code is 4 to 20 letters and numbers. Codes made for you leave out
                            look-alike characters such as 0 and O, so they are easy to copy off a handout.
                        </p>
                    </section>

                    <section className="overflow-hidden rounded-2xl border border-zinc-200 bg-white">
                        {schools.length === 0 ? (
                            <p className="p-6 text-zinc-700">
                                No schools yet. Add one above to get its code.
                            </p>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full text-left text-sm">
                                    <thead className="bg-zinc-50 text-zinc-600">
                                        <tr>
                                            <th scope="col" className="px-4 py-3 font-semibold">School</th>
                                            <th scope="col" className="px-4 py-3 font-semibold">Code</th>
                                            <th scope="col" className="px-4 py-3 text-right font-semibold">Signups</th>
                                            <th scope="col" className="px-4 py-3 font-semibold">Status</th>
                                            <th scope="col" className="px-4 py-3 font-semibold"><span className="sr-only">Actions</span></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {schools.map((school) => {
                                            const editing = editingCode === school.code;
                                            const busy = busyCode === school.code;

                                            return (
                                                <tr key={school.code} className="border-t border-zinc-100 align-middle">
                                                    <td className="px-4 py-3 font-semibold text-zinc-900">
                                                        {editing ? (
                                                            <Input
                                                                aria-label={`New name for ${school.schoolName}`}
                                                                value={editingName}
                                                                onChange={(e) => setEditingName(e.target.value)}
                                                                maxLength={120}
                                                                className="text-black"
                                                                autoFocus
                                                            />
                                                        ) : school.schoolName}
                                                    </td>
                                                    <td className="px-4 py-3">
                                                        <button
                                                            type="button"
                                                            onClick={() => void copyCode(school.code)}
                                                            className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-zinc-100 px-3 py-1 font-mono text-base font-bold tracking-widest text-zinc-900 hover:bg-zinc-200"
                                                            aria-label={`Copy code ${school.code}`}
                                                        >
                                                            {school.code} <Copy className="h-4 w-4" aria-hidden="true" />
                                                        </button>
                                                    </td>
                                                    <td className="px-4 py-3 text-right text-lg font-extrabold tabular-nums text-[#16697A]">
                                                        {school.signups}
                                                    </td>
                                                    <td className="px-4 py-3">
                                                        <span className={`rounded-full px-3 py-1 text-xs font-bold ${school.active ? 'bg-emerald-100 text-emerald-800' : 'bg-zinc-200 text-zinc-700'}`}>
                                                            {school.active ? 'Accepting signups' : 'Switched off'}
                                                        </span>
                                                    </td>
                                                    <td className="px-4 py-3">
                                                        <div className="flex flex-wrap justify-end gap-3 font-semibold text-indigo-700">
                                                            {editing ? (
                                                                <>
                                                                    <button type="button" disabled={busy} onClick={() => void saveName(school)} className="cursor-pointer underline disabled:opacity-50">Save</button>
                                                                    <button type="button" disabled={busy} onClick={() => setEditingCode(null)} className="cursor-pointer underline disabled:opacity-50">Cancel</button>
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <button
                                                                        type="button"
                                                                        disabled={busy}
                                                                        onClick={() => { setEditingCode(school.code); setEditingName(school.schoolName); }}
                                                                        className="cursor-pointer underline disabled:opacity-50"
                                                                    >
                                                                        Rename
                                                                    </button>
                                                                    <button
                                                                        type="button"
                                                                        disabled={busy}
                                                                        onClick={() => void update(
                                                                            school,
                                                                            { active: !school.active },
                                                                            school.active ? 'Code switched off.' : 'Code switched back on.'
                                                                        )}
                                                                        className="cursor-pointer underline disabled:opacity-50"
                                                                    >
                                                                        {school.active ? 'Switch off' : 'Switch on'}
                                                                    </button>
                                                                </>
                                                            )}
                                                        </div>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </section>

                    <p className="mt-4 text-sm text-zinc-600">
                        Signups counts accounts created with that school's code. Accounts made
                        before codes existed, or by signing in with Google, have no code and are
                        counted under "No school code" — so a school's number can be lower than
                        the number of its students using iJOURNEY. Switching a code off stops new
                        signups with it and keeps its count.
                    </p>
                </>
            )}
        </div>
    );
}

export default Admin;
