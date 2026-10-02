import { RECAP_GROUPS } from "./recapData";

const TITLES: Record<string, string> = Object.fromEntries(
    RECAP_GROUPS.flatMap((group) => group.steps.map((step) => [step.key, step.title]))
);

/** `milestone3/6` -> `M3.6: Lifestyle Calculator`. Falls back to the key itself. */
export const milestoneTitle = (key: string): string => TITLES[key] ?? key;

/** `milestone3/6` -> `/milestones/milestone3/6`. */
export const milestoneRoute = (key: string): string => `/milestones/${key}`;
