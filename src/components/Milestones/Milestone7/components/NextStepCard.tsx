import { Sparkles, LayoutDashboard, Users, BookOpen, Megaphone } from "lucide-react";

type Step = {
    title: string;
    description: string;
    icon: React.ElementType;
};

type Props = {
    title?: string;
    subtitle?: string;
    steps?: Step[];
};

export function NextStepsCard({
    title = "Next Steps",
    subtitle = "Your journey doesn't end here! Here are some ways to continue your growth:",
    steps = [
        {
            title: "Review Your Dashboard",
            description: "Access your saved responses, Journeyer's Statement, and SMART goals anytime.",
            icon: LayoutDashboard,
        },
        {
            title: "Connect with Community",
            description: "Join our alumni network to share experiences and support each other.",
            icon: Users,
        },
        {
            title: "Continue Learning",
            description: "Explore additional resources and workshops to deepen your skills.",
            icon: BookOpen,
        },
        {
            title: "Share Your Story",
            description: "Inspire others by sharing your journey and accomplishments.",
            icon: Megaphone,
        },
    ],
}: Props) {
    return (
        <section className="relative overflow-hidden rounded-3xl border-2 border-emerald-200 bg-white shadow-[0_18px_55px_rgba(16,185,129,0.16)]">
            <div className="relative bg-linear-to-r from-emerald-50 via-green-50 to-lime-50 p-6 sm:p-7">
                <div className="pointer-events-none absolute -left-16 -top-16 h-52 w-52 rounded-full bg-emerald-300/25 blur-2xl" />
                <div className="pointer-events-none absolute -right-16 -bottom-16 h-52 w-52 rounded-full bg-lime-300/25 blur-2xl" />
                <div className="pointer-events-none absolute left-1/2 top-0 h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full bg-green-200/35 blur-2xl" />

                <div className="absolute right-5 top-5 -rotate-6">
                    <div className="relative rounded-2xl bg-white px-3 py-2 shadow-[0_10px_24px_rgba(0,0,0,0.14)]">
                        <div className="absolute -right-2 top-1/2 h-3 w-3 -translate-y-1/2 rotate-45 bg-white" />
                        <div className="flex items-center gap-2 text-xs font-extrabold text-emerald-700">
                            <Sparkles className="h-4 w-4" />
                            Keep Growing
                        </div>
                    </div>
                </div>

                <h4 className="text-xl font-extrabold tracking-tight text-emerald-950">
                    {title}
                </h4>
                <p className="mt-2 max-w-2xl text-sm text-emerald-900/70">
                    {subtitle}
                </p>
            </div>

            <div className="relative p-6 sm:p-7">
                <div className="relative grid gap-4 md:grid-cols-2">
                    {steps.map((s) => {
                        const Icon = s.icon;
                        return (
                            <div
                                key={s.title}
                                className={[
                                    "group relative overflow-hidden rounded-2xl border border-black/5 bg-white p-5",
                                    "shadow-sm transition-transform hover:-translate-y-0.5 hover:shadow-[0_14px_35px_rgba(16,185,129,0.16)]",
                                ].join(" ")}
                            >
                                <div className="pointer-events-none absolute -right-10 -top-10 h-24 w-24 rounded-full bg-emerald-200/40 blur-xl transition-opacity group-hover:opacity-100 opacity-70" />

                                <div className="flex items-start gap-4">
                                    <div className="relative grid h-12 w-12 place-items-center rounded-2xl bg-emerald-400 text-white shadow-[0_14px_30px_rgba(16,185,129,0.30)] ring-4 ring-white">
                                        <Icon className="h-6 w-6" />
                                        <div className="pointer-events-none absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-white/60" />
                                    </div>

                                    <div className="flex-1">
                                        <h5 className="text-base font-extrabold text-emerald-900">
                                            {s.title}
                                        </h5>
                                        <p className="mt-1 text-sm text-zinc-600">
                                            {s.description}
                                        </p>
                                    </div>
                                </div>

                                <div className="mt-4 h-2 w-full rounded-full bg-linear-to-r from-emerald-100 via-lime-100 to-green-100" />
                            </div>
                        );
                    })}
                </div>

                <div className="pointer-events-none absolute -bottom-10 -left-10 h-24 w-24 rounded-full bg-emerald-200/70 blur-xl" />
                <div className="pointer-events-none absolute -bottom-10 -right-10 h-24 w-24 rounded-full bg-lime-200/70 blur-xl" />
            </div>
        </section>
    );
}
