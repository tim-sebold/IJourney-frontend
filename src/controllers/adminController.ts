import { api } from '../lib/api';

export type School = {
    code: string;
    schoolName: string;
    active: boolean;
    createdAt?: string | null;
    /** Accounts that registered with this school's code. */
    signups: number;
};

export type SchoolsReport = {
    schools: School[];
    totalUsers: number;
    /** Accounts with no school code — older accounts and Google sign-ins. */
    unassigned: number;
};

export const adminListSchools = () => api<SchoolsReport>("/api/admin/schools");

/** Leave `code` out to have the server generate one. */
export const adminCreateSchool = (payload: { schoolName: string; code?: string }) =>
    api<{ school: School }>("/api/admin/schools", {
        method: "POST",
        body: JSON.stringify(payload),
    });

export const adminUpdateSchool = (code: string, payload: { schoolName?: string; active?: boolean }) =>
    api<{ school: Omit<School, 'signups'> }>(`/api/admin/schools/${encodeURIComponent(code)}`, {
        method: "PATCH",
        body: JSON.stringify(payload),
    });
