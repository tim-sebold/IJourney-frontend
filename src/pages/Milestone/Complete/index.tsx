import { Link } from 'react-router-dom';
import { Award, GraduationCap, Home, Sparkles, User } from 'lucide-react';

import { useAuth } from '../../../context/AuthContext';
import { useCertificateDownload } from '../../../hooks/useCertificateDownload';
import { CustomButton } from '../../../elements/buttons';

/**
 * The single, unambiguous end of the programme. M7.4 congratulates the participant
 * mid-module and M7.5 closes it out; this is where the journey actually finishes, and
 * the certificate lives here permanently so nobody has to walk back into the module to
 * download their PDF.
 */
function Complete() {
    const { user } = useAuth();
    const { download, loading } = useCertificateDownload();

    const displayName = user?.displayName?.trim();

    return (
        <div className="flex w-full justify-center">
            <div className="w-full">
                <section className="relative overflow-hidden rounded-3xl border border-amber-200 bg-white">
                    <div className="relative bg-linear-to-r from-amber-50 via-yellow-50 to-orange-50 p-8 text-center">
                        <div className="pointer-events-none absolute -left-14 -top-14 h-44 w-44 rounded-full bg-yellow-300/25 blur-2xl" />
                        <div className="pointer-events-none absolute -right-14 -bottom-14 h-44 w-44 rounded-full bg-orange-300/25 blur-2xl" />

                        <div className="mx-auto mb-5 grid h-24 w-24 place-items-center rounded-full bg-amber-400 text-white shadow-[0_18px_40px_rgba(245,158,11,0.35)] ring-4 ring-white">
                            <GraduationCap className="h-12 w-12" />
                        </div>

                        <h2 className="text-3xl font-extrabold text-zinc-900">
                            {displayName ? `Congratulations, ${displayName}!` : 'Congratulations, Graduate!'}
                        </h2>
                        <p className="mx-auto mt-3 max-w-xl text-zinc-700">
                            You have finished <span className="font-bold">iJourney: A Path to Purpose</span> —
                            all seven milestones, start to finish. This is the end of the programme, and
                            everything you wrote stays saved to your account.
                        </p>
                    </div>

                    <div className="space-y-5 p-6 sm:p-8">
                        <div className="rounded-2xl border-2 border-indigo-200 bg-indigo-50/40 p-6">
                            <div className="flex items-start gap-4">
                                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-emerald-400 text-white ring-4 ring-white">
                                    <Award className="h-6 w-6" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-lg font-extrabold text-indigo-950">Your certificate</h3>
                                    <p className="mt-1 text-sm text-zinc-700">
                                        Download it as often as you like. This page stays available on your
                                        account, so you never have to go back through the module for it.
                                    </p>
                                    <div className="mt-4">
                                        <CustomButton
                                            title="Download Certificate"
                                            onClickFunc={download}
                                            className="rounded-full"
                                            type="green"
                                            loading={loading}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="rounded-2xl border border-black/5 bg-emerald-50/50 p-6">
                            <h3 className="flex items-center gap-2 text-lg font-extrabold text-emerald-900">
                                <Sparkles className="h-5 w-5" /> Where to next
                            </h3>
                            <div className="mt-4 grid gap-3 sm:grid-cols-2">
                                <Link
                                    to="/user-profile"
                                    className="flex items-center gap-3 rounded-xl border border-black/5 bg-white px-4 py-3 text-sm font-semibold text-zinc-800 shadow-sm transition-transform hover:-translate-y-0.5"
                                >
                                    <User className="h-5 w-5 text-emerald-600" /> Review your profile and progress
                                </Link>
                                <Link
                                    to="/"
                                    className="flex items-center gap-3 rounded-xl border border-black/5 bg-white px-4 py-3 text-sm font-semibold text-zinc-800 shadow-sm transition-transform hover:-translate-y-0.5"
                                >
                                    <Home className="h-5 w-5 text-emerald-600" /> Back to the iJourney home page
                                </Link>
                            </div>
                        </div>

                        <p className="text-center text-sm text-zinc-600">
                            "Your journey will be guided by your commitment to yourself."
                            <span className="block font-semibold text-zinc-700">— Asha McMillan, LPC</span>
                        </p>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default Complete;
