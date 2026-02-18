import { Award, Sparkles, Stars } from 'lucide-react';
import { CustomButton } from '../../../../elements';

type Props = {
    name?: string | null;
    dateLabel?: string;
    signatureLabel?: string;
    downloadFunc: () => Promise<void>
};

export function CertificateCard({
    name,
    dateLabel = new Date().toLocaleDateString(),
    signatureLabel = "Asha McMillan, LPC",
    downloadFunc,
}: Props) {
    const displayName = name?.trim() || "—";

    return (
        <div className="border-l-4 border-ib-1 relative overflow-hidden rounded-3xl border-2 p-6 sm:p-7 bg-white shadow-[0_18px_55px_rgba(245,158,11,0.18)]">
            <h4 className="text-xl font-bold text-purple-800 mb-3">Your Digital Certificate</h4>
            <div className="relative overflow-hidden rounded-3xl border-2 border-indigo-200 bg-white shadow-[0_18px_55px_rgba(79,70,229,0.20)]">
                <div className="relative bg-linear-to-r from-sky-100 via-indigo-100 to-fuchsia-100 p-6">
                    <div className="pointer-events-none absolute -left-16 -top-16 h-48 w-48 rounded-full bg-sky-300/25 blur-2xl" />
                    <div className="pointer-events-none absolute -right-16 -bottom-16 h-48 w-48 rounded-full bg-fuchsia-300/25 blur-2xl" />

                    <div className="absolute right-5 top-5 rotate-6">
                        <div className="relative rounded-2xl bg-white px-3 py-2 shadow-[0_10px_24px_rgba(0,0,0,0.14)]">
                            <div className="absolute -left-2 top-1/2 h-3 w-3 -translate-y-1/2 rotate-45 bg-white" />
                            <div className="flex items-center gap-2 text-xs font-bold text-indigo-700">
                                <Sparkles className="h-4 w-4" />
                                Certified!
                            </div>
                        </div>
                    </div>

                    <div className="flex items-start justify-between gap-4">
                        <div>
                            <h5 className="text-2xl font-extrabold tracking-tight text-indigo-950">
                                iJourney: A Path to Purpose
                            </h5>
                            <p className="mt-1 text-sm font-medium text-indigo-800/70">
                                Certificate of Completion
                            </p>
                        </div>

                        <div className="grid h-14 w-14 place-items-center rounded-2xl bg-white shadow-[0_12px_28px_rgba(0,0,0,0.12)]">
                            <Stars className="h-6 w-6 text-indigo-700" />
                        </div>
                    </div>
                </div>

                <div className="relative p-6 sm:p-7">
                    <div className="relative">
                        <div className="mx-auto max-w-md">
                            <div className="mx-auto mb-5 grid h-24 w-24 place-items-center rounded-full bg-emerald-400 text-white shadow-[0_18px_40px_rgba(16,185,129,0.35)] ring-4 ring-white">
                                <Award className="h-12 w-12" />
                            </div>

                            <div className="text-center">
                                <p className="text-sm font-semibold text-zinc-700">
                                    This certifies that
                                </p>

                                <div className="mt-2 inline-flex items-center justify-center">
                                    <span className="relative inline-block rounded-2xl bg-indigo-50 px-5 py-2 text-xl font-extrabold text-indigo-700 shadow-[0_10px_25px_rgba(99,102,241,0.20)]">
                                        {displayName}
                                        <span className="pointer-events-none absolute -bottom-2 left-1/2 h-2 w-24 -translate-x-1/2 rounded-full bg-fuchsia-300/60 blur-[0.5px]" />
                                    </span>
                                </div>

                                <p className="mt-4 text-sm text-zinc-600">
                                    has successfully completed the iJourney program
                                </p>
                            </div>

                            <div className="mt-6 flex flex-col gap-2 rounded-2xl border border-black/5 bg-white/70 p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
                                <div className="text-sm text-zinc-700">
                                    <span className="font-semibold">Date:</span> {dateLabel}
                                </div>
                                <div className="text-sm text-zinc-700">
                                    <span className="font-semibold">Signature:</span> {signatureLabel}
                                </div>
                            </div>
                        </div>

                        <div className="pointer-events-none absolute -bottom-10 -left-10 h-24 w-24 rounded-full bg-sky-200/70 blur-xl" />
                        <div className="pointer-events-none absolute -bottom-10 -right-10 h-24 w-24 rounded-full bg-fuchsia-200/70 blur-xl" />
                    </div>
                </div>
            </div>
            <div className="flex justify-center mt-4">
                <CustomButton onClickFunc={downloadFunc} title='Download Certificate' className='rounded-none uppercase justify-end bg-ib-2 hover:bg-ib-2/80' type='sky'></CustomButton>
            </div>
        </div>

    );
}