import { api, ApiError, apiBlob } from '../lib/api';

export type Milestone = {
    id: string;
    title: string;
    description?: string;
    fields?: Array<{ name: string; label: string; type: string; options?: string[] }>;
    order?: number;
};

export type MilestoneResponse = {
    message: string,
    responses: Record<string, unknown>;
};

export const listMilestones = () =>
    api<{ milestones: Milestone[] }>("/api/courses");

/**
 * The saved response for a milestone, or `null` when there is none to restore.
 *
 * A 404 is the normal answer on a first visit — nothing has been saved yet — so
 * it is not an error here. Restoring saved work is optional behaviour: any other
 * failure also resolves to `null`, leaving the page usable with empty fields
 * rather than rejecting inside an effect where nothing can catch it.
 */
export const getMilestone = async (milestoneId: string): Promise<MilestoneResponse | null> => {
    try {
        return await api<MilestoneResponse>(`/api/courses/${milestoneId}/getResponse`);
    } catch (error) {
        if (!(error instanceof ApiError && error.status === 404)) {
            console.error(`Could not load saved work for ${milestoneId}:`, error);
        }
        return null;
    }
};

export const getMilestoneContent = (milestoneId: string) =>
    api<Milestone>(`/api/courses/${milestoneId}`);

export type RecapEntry = {
    responses: Record<string, unknown>;
    status: 'draft' | 'submitted';
    submittedAt: string | null;
};

export type RecapPayload = {
    /** Keyed by progress-form milestone key (`milestone1/4`). */
    responses: Record<string, RecapEntry>;
    /** Milestones that collect work, so unanswered ones can be called out. */
    required: string[];
};

/** Every saved answer in one request — what the recap page renders. */
export const getAllResponses = () => api<RecapPayload>("/api/courses/responses");

// `userId` is accepted for call-site compatibility but never sent: the backend
// derives the acting user from the verified token and ignores any client-supplied id.
export const submitMilestone = async (milestoneId: string, payload: {
    userId?: string;
    responses: Record<string, unknown>;
}) =>
    await api<{ message: string }>(`/api/courses/${milestoneId}/submit`, {
        method: "POST",
        body: JSON.stringify({ responses: payload.responses }),
    });

export const saveDraft = async (milestoneId: string, payload: {
    userId?: string;
    responses: Record<string, unknown>;
}) =>
    await api<{ message: string }>(`/api/courses/${milestoneId}/draft`, {
        method: "POST",
        body: JSON.stringify({ responses: payload.responses }),
    });

export const unlockNext = async (payload: { userId?: string; milestoneId: string, prevMilestoneId: string }) =>
    api<{ message: string }>("/api/courses/unlock", {
        method: "POST",
        body: JSON.stringify({
            milestoneId: payload.milestoneId,
            prevMilestoneId: payload.prevMilestoneId,
        }),
    });

export type JourneyerStatement = {
    iAm: string;
    iBelieve: string;
    iWill: string;
    iAmConfident: string;
    iAmCapable: string;
};

export type StatementSectionFeedback = {
    key: keyof JourneyerStatement;
    label: string;
    status: "empty" | "needs-work" | "strong";
    wordCount: number;
    /** Blocking: what has to change before the section reads as finished. */
    suggestions: string[];
    /** Worth trying, but the section is not wrong without it. */
    optional: string[];
};

export type StatementFeedback = {
    score: number;
    summary: string;
    strengths: string[];
    sections: StatementSectionFeedback[];
};

export const getStatementFeedback = async (statement: JourneyerStatement) =>
    api<{ feedback: StatementFeedback }>("/api/courses/statement-feedback", {
        method: "POST",
        body: JSON.stringify({ statement }),
    });

export const downloadCertificate = async (): Promise<Blob> => {
    return apiBlob("/api/certificates/download", {
        method: "POST",
    });
};

