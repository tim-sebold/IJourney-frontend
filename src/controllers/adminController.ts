import { api } from '../lib/api';

export const adminGetUsers = () =>
    api<{ totalUsers: number; users: any[] }>("/api/admin/users");

export const adminGetUserProgress = (userId: string) =>
    api<any>(`/api/admin/progress/${userId}`);

export const adminGetAnalytics = () =>
    api<{ totalUsers: number; totalChats: number; avgCompletion: string }>("/api/admin/analytics");

export const adminGetChatlogs = () =>
    api<any[]>("/api/admin/chatlogs");

export const adminUpsertMilestone = (payload: { milestoneId?: string; data: any }) =>
    api<{ message: string; id?: string }>("/api/admin/milestones", {
        method: "POST",
        body: JSON.stringify(payload),
    });

export const adminDeleteUser = (userId: string) =>
    api<{ message: string }>(`/api/admin/user/${userId}`, {
        method: "DELETE",
    });
