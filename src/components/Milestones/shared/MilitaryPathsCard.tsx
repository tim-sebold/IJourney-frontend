import { Shield, CheckCircle, ExternalLink } from "lucide-react";

/**
 * Military education paths.
 *
 * Shared rather than copied because this has to appear in every module that
 * lists the other kinds of school, so the copy and links only live in one place.
 */

const POINTS = [
    "Service academies (West Point, Naval Academy, Air Force Academy, Coast Guard, Merchant Marine) — a full bachelor's degree at no tuition cost, with a service commitment after graduation",
    "Senior military colleges, including The Citadel here in South Carolina — a regular degree earned in a corps of cadets",
    "Junior military academies and prep schools — structured boarding programmes for high school students",
    "ROTC — a scholarship that pays for college at a regular university while you train alongside your degree",
    "Enlisting after high school — paid training in a trade, plus the GI Bill toward college later",
] as const;

const LINKS = [
    { label: "Explore military careers and schools (Today's Military)", href: "https://www.todaysmilitary.com/" },
    { label: "Service academy nominations (U.S. Service Academies)", href: "https://www.todaysmilitary.com/education-training/service-academies" },
    { label: "The Citadel — South Carolina's military college", href: "https://www.citadel.edu/" },
] as const;

type Props = {
    /** Set on pages that already open with their own section heading. */
    className?: string;
};

export function MilitaryPathsCard({ className = "" }: Props) {
    return (
        <div className={`bg-slate-50 p-6 rounded-lg border-l-4 border-slate-600 ${className}`}>
            <div className="flex items-center gap-2 mb-3">
                <Shield className="w-6 h-6 text-slate-700" />
                <h4 className="text-xl font-bold text-slate-800">Military School &amp; Service Paths</h4>
            </div>
            <p className="mb-3">
                If you are drawn to structure, service, and leadership, the military offers real
                educational paths — several of which pay for your degree.
            </p>
            <ul className="space-y-2 mb-4">
                {POINTS.map((point) => (
                    <li key={point} className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-slate-600 mt-1 shrink-0" /> {point}
                    </li>
                ))}
            </ul>
            <div className="flex flex-col gap-2">
                {LINKS.map((link) => (
                    <a
                        key={link.href}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 font-bold text-slate-700 hover:text-slate-900 underline"
                    >
                        {link.label} <ExternalLink className="w-4 h-4" />
                    </a>
                ))}
            </div>
        </div>
    );
}

export default MilitaryPathsCard;
