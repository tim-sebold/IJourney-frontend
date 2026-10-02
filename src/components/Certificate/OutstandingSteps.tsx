import { Link } from "react-router-dom";
import { milestoneRoute, milestoneTitle } from "../../datas/milestoneTitles";

/**
 * Shown when the certificate is refused. The server names the steps whose answers
 * are missing; each one links straight back to its page. This matters most for
 * someone who believes they finished — a page they passed may have started
 * collecting an answer after they were through it — so the wording says what to
 * do, not what went wrong.
 */
export function OutstandingSteps({ steps }: { steps: string[] }) {
    if (steps.length === 0) return null;

    return (
        <div role="alert" className="mt-4 rounded-2xl border border-amber-300 bg-amber-50 p-4 text-left">
            <p className="text-sm font-bold text-amber-900">
                {steps.length === 1
                    ? "One step still needs your answer before your certificate unlocks."
                    : `${steps.length} steps still need your answers before your certificate unlocks.`}
            </p>
            <p className="mt-1 text-sm text-amber-900">
                Open each one, fill it in and press Next. Everything else you wrote is still saved.
            </p>
            <ul className="mt-3 flex flex-col gap-1">
                {steps.map((step) => (
                    <li key={step}>
                        <Link to={milestoneRoute(step)} className="text-sm font-semibold text-indigo-700 underline">
                            {milestoneTitle(step)}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
