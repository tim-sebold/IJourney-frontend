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

export const introduce = async (payload: {
    userId: string;
    responses: Record<string, unknown>;
}) =>
    await api<{ message: string }>(`/api/courses/introduction`, {
        method: "POST",
        body: JSON.stringify(payload),
    })

export const submitMilestone = async (milestoneId: string, payload: {
    userId: string;
    responses: Record<string, unknown>;
}) =>
    await api<{ message: string }>(`/api/courses/${milestoneId}/submit`, {
        method: "POST",
        body: JSON.stringify(payload),
    });

export const saveDraft = async (milestoneId: string, payload: {
    userId: string;
    responses: Record<string, unknown>;
}) =>
    await api<{ message: string }>(`/api/courses/${milestoneId}/draft`, {
        method: "POST",
        body: JSON.stringify(payload),
    });

export const unlockNext = async (payload: { userId: string; milestoneId: string, prevMilestoneId: string }) =>
    await api<{ message: string }>("/api/courses/unlock", {
        method: "POST",
        body: JSON.stringify(payload),
    });

export const downloadCertificate = async (): Promise<Blob> => {
    return apiBlob("/api/certificates/download", {
        method: "POST",
    });
};

export const makeCertificateId = async () => {
    const year = new Date().getFullYear;
    const rand = Math.floor(100000 + Math.random() * 900000);
    return `IJ-${year}-${rand}`;
}