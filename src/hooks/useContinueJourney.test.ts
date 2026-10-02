import { describe, expect, it, vi } from "vitest";

// The hook's module pulls in Firebase through the auth context; only the pure
// route decision is under test here.
vi.mock("../context/AuthContext", () => ({ useAuth: () => ({ user: null }) }));
vi.mock("../context/ProgressContext", () => ({ useProgress: () => ({}) }));
vi.mock("../controllers/courseController", () => ({ unlockNext: vi.fn() }));

const { continueRouteFor } = await import("./useContinueJourney");

describe("continueRouteFor", () => {
    it("has nowhere to continue to before progress has loaded", () => {
        expect(continueRouteFor(undefined)).toBeNull();
        expect(continueRouteFor(null)).toBeNull();
    });

    it("starts a new user from the beginning", () => {
        expect(continueRouteFor({ completed: 0, total: 46, currentMilestone: "milestone0/1" })).toBeNull();
    });

    // `milestone0` is the Introduction. Reading the milestone number as a boolean
    // sent everyone still in it back to the first page.
    it("resumes inside the Introduction", () => {
        expect(continueRouteFor({ completed: 1, total: 46, currentMilestone: "milestone0/2" }))
            .toBe("/milestones/milestone0/2");
    });

    it("resumes at the first unfinished step", () => {
        expect(continueRouteFor({ completed: 20, total: 46, currentMilestone: "milestone3/2" }))
            .toBe("/milestones/milestone3/2");
    });

    it("sends a finished user to the completion page, not back to the start", () => {
        expect(continueRouteFor({ completed: 46, total: 46, currentMilestone: null }))
            .toBe("/milestones/complete");
    });
});
