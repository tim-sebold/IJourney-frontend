import { beforeEach, describe, expect, it, vi } from "vitest";

const { api, ApiError } = vi.hoisted(() => {
    class ApiError extends Error {
        readonly status: number;
        readonly body: unknown;
        constructor(message: string, status: number, body: unknown = null) {
            super(message);
            this.status = status;
            this.body = body;
        }
    }
    return { api: vi.fn(), ApiError };
});

vi.mock("../lib/api", () => ({ api, apiBlob: vi.fn(), ApiError }));

const { getMilestone, submitMilestone, unlockNext } = await import("./courseController");

beforeEach(() => {
    api.mockReset();
    vi.spyOn(console, "error").mockImplementation(() => undefined);
});

describe("getMilestone", () => {
    it("returns the saved response", async () => {
        const saved = { message: "", responses: { reflection: "mine" } };
        api.mockResolvedValue(saved);

        await expect(getMilestone("milestone2_5")).resolves.toEqual(saved);
        expect(api).toHaveBeenCalledWith("/api/courses/milestone2_5/getResponse");
    });

    // Every milestone 404s until its first submission, so a first visit is the
    // normal path. Pages await this inside an effect, where a rejection has
    // nothing to catch it.
    it("resolves to null on a first visit instead of rejecting", async () => {
        api.mockRejectedValue(new ApiError("Milestone response not found", 404));

        await expect(getMilestone("milestone7_2")).resolves.toBeNull();
        expect(console.error).not.toHaveBeenCalled();
    });

    it("resolves to null, and logs, when the server or network fails", async () => {
        api.mockRejectedValue(new ApiError("Server Error", 500));
        await expect(getMilestone("milestone7_2")).resolves.toBeNull();

        api.mockRejectedValue(new TypeError("Failed to fetch"));
        await expect(getMilestone("milestone7_2")).resolves.toBeNull();

        expect(console.error).toHaveBeenCalledTimes(2);
    });
});

describe("requests never carry a client-chosen user id", () => {
    it("drops userId from a submission", async () => {
        api.mockResolvedValue({ message: "ok" });
        await submitMilestone("milestone1_5", { userId: "someone-else", responses: { a: 1 } });

        expect(JSON.parse(api.mock.calls[0][1].body)).toEqual({ responses: { a: 1 } });
    });

    it("drops userId from an unlock", async () => {
        api.mockResolvedValue({ message: "ok" });
        await unlockNext({ userId: "someone-else", milestoneId: "milestone1/2", prevMilestoneId: "milestone1/1" });

        expect(JSON.parse(api.mock.calls[0][1].body)).toEqual({
            milestoneId: "milestone1/2",
            prevMilestoneId: "milestone1/1",
        });
    });
});
