import { Trophy, CheckCircle, Sparkles } from "lucide-react";

type Props = {
    title?: string;
    subtitle?: string;
    accomplishments?: string[];
};

export function CompletionCard({
    title = "You've Completed Your iJourney!",
    subtitle = `You've successfully completed "iJourney: A Path to Purpose" and have created a powerful foundation for your future.`,
    accomplishments = [
        "Completed all 7 milestones of self-discovery",
        "Created your personal Journeyer's Statement",
        "Developed your Career Project Fair presentation",
        "Set 3 SMART goals for your continued growth",
        "Built a network of accountability partners",
    ],
}: Props) {
    return (
        <section className="relative overflow-hidden rounded-3xl border-2 border-amber-200 bg-white shadow-[0_18px_55px_rgba(245,158,11,0.18)]">
            <div className="relative bg-linear-to-r from-amber-50 via-yellow-50 to-orange-50 p-6 sm:p-7">
                <div className="pointer-events-none absolute -left-14 -top-14 h-44 w-44 rounded-full bg-yellow-300/25 blur-2xl" />
                <div className="pointer-events-none absolute -right-14 -bottom-14 h-44 w-44 rounded-full bg-orange-300/25 blur-2xl" />
                <div className="pointer-events-none absolute left-1/2 top-0 h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-200/35 blur-2xl" />

                <div className="absolute right-5 top-5 rotate-6">
                    <div className="relative rounded-2xl bg-white px-3 py-2 shadow-[0_10px_24px_rgba(0,0,0,0.14)]">
                        <div className="absolute -left-2 top-1/2 h-3 w-3 -translate-y-1/2 rotate-45 bg-white" />
                        <div className="flex items-center gap-2 text-xs font-extrabold text-amber-700">
                            <Sparkles className="h-4 w-4" />
                            Level Complete
                        </div>
                    </div>
                </div>

                <h4 className="text-xl font-extrabold tracking-tight text-amber-900">
                    {title}
                </h4>

                <div className="mt-5 flex flex-col items-center justify-center text-center">
                    <div className="relative mb-4 grid h-20 w-20 place-items-center rounded-full bg-amber-400 text-white shadow-[0_18px_40px_rgba(245,158,11,0.35)] ring-4 ring-white">
                        <Trophy className="h-10 w-10" />
                        <div className="pointer-events-none absolute right-3 top-3 h-3 w-3 rounded-full bg-white/60" />
                    </div>

                    <h2 className="text-2xl font-extrabold text-zinc-900">
                        Congratulations, Graduate!
                    </h2>

                    <p className="mt-2 max-w-2xl text-base text-zinc-700">
                        {subtitle}
                    </p>
                </div>
            </div>

            <div className="relative p-6 sm:p-7">
                <div className="relative rounded-2xl border border-black/5 bg-white p-5 shadow-sm">
                    <div className="flex items-center justify-between gap-3">
                        <h5 className="text-sm font-extrabold text-amber-800">
                            Your Accomplishments
                        </h5>
                        <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-bold text-amber-800">
                            {accomplishments.length} wins
                        </span>
                    </div>

                    <ul className="mt-4 space-y-2.5 text-sm">
                        {accomplishments.map((item) => (
                            <li
                                key={item}
                                className="flex items-start gap-3 rounded-xl border border-black/5 bg-amber-50/40 px-4 py-3"
                            >
                                <div className="mt-0.5 grid h-7 w-7 place-items-center rounded-full bg-white shadow-sm">
                                    <CheckCircle className="h-4 w-4 text-amber-600" />
                                </div>
                                <div className="text-zinc-800">{item}</div>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="pointer-events-none absolute -bottom-10 -left-10 h-24 w-24 rounded-full bg-yellow-200/70 blur-xl" />
                <div className="pointer-events-none absolute -bottom-10 -right-10 h-24 w-24 rounded-full bg-orange-200/70 blur-xl" />
            </div>
        </section>
    );
}
