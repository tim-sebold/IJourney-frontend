import { api, apiBlob } from '../lib/api';

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

export const getMilestone = (milestoneId: string) =>
    api<MilestoneResponse>(`/api/courses/${milestoneId}/getResponse`);

export const getMilestoneContent = (milestoneId: string) =>
    api<Milestone>(`/api/courses/${milestoneId}`);

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
    suggestions: string[];
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

