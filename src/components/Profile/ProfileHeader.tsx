export function ProfileHeader({
    welcomeName,
    dateLabel,
}: {
    welcomeName: string;
    dateLabel: string;
}) {
    return (
        <header className="pt-10 pb-24">
            <div className="mx-auto w-full max-w-6xl px-4">
                <h1 className="text-xl font-semibold text-zinc-900">Welcome, {welcomeName}</h1>
                <p className="mt-1 text-sm text-zinc-700/70">{dateLabel}</p>
            </div>
        </header>
    );
}
