import { api } from '../lib/api';

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

export const introduce = (payload: {
    userId: string;
    responses: Record<string, unknown>;
}) =>
    api<{ message: string }>(`/api/courses/introduction`, {
        method: "POST",
        body: JSON.stringify(payload),
})

export const submitMilestone = (milestoneId: string, payload: {
    userId: string;
    responses: Record<string, unknown>;
}) =>
    api<{ message: string }>(`/api/courses/${milestoneId}/submit`, {
        method: "POST",
        body: JSON.stringify(payload),
    });

export const saveDraft = (milestoneId: string, payload: {
    userId: string;
    responses: Record<string, unknown>;
}) =>
    api<{ message: string }>(`/api/courses/${milestoneId}/draft`, {
        method: "POST",
        body: JSON.stringify(payload),
    });

export const unlockNext = (payload: { userId: string; milestoneId: string, prevMilestoneId: string }) =>
    api<{ message: string }>("/api/courses/unlock", {
        method: "POST",
        body: JSON.stringify(payload),
    });
