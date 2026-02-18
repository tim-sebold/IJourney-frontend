import { api } from '../lib/api';

export type ChatMessage = { role: "user" | "ai"; text: string; createdAt?: string };
export type ChatResponse = { response: string; formFields?: Record<string, unknown> };

export const startChatSession = (payload: { userId: string; milestoneId?: string }) =>
    api<{ sessionId: string }>("/api/chatbot/session/start", {
        method: "POST",
        body: JSON.stringify(payload),
    });

export const sendChatMessage = (payload: { userId: string; sessionId: string; message: string }) =>
    api<ChatResponse>("/api/chatbot/message", {
        method: "POST",
        body: JSON.stringify(payload),
    });

export const getChatHistory = (sessionId: string) =>
    api<{ messages: ChatMessage[] }>(`/api/chatbot/session/${sessionId}/history`);

export const endChatSession = (sessionId: string) =>
    api<{ message: string }>("/api/chatbot/session/end", {
        method: "POST",
        body: JSON.stringify({ sessionId }),
    });
