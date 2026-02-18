import type { User } from 'firebase/auth';
export type Role = 'user' | 'admin';
export type GenderOption = "female" | "male" | "nonbinary" | "prefer_not_say" | "";
export type CountryOption = "us" | "ca" | "uk" | "au" | "in" | "";

export interface InputValues {
  name: string,
  email: string;
  password: string;
  confirmPassword: string;
}

export interface AuthContextType {
  user: User | null;
  loading: boolean;
}

export interface ProgressContextValue {
  currentMilestone: number | null;
  currentMilestoneChild: number | null;
  progress: any;
  loadingProgress: boolean;
  refreshProgress: () => Promise<void>;
};

export interface UserProfile {
  uid: string;
  name: string;
  email: string;
  
  gender: GenderOption;
  country: CountryOption;

  avatarBase64?: string;
  avatarUpdatedAt?: string;
  role: Role;
  displayName?: string;
  preferences?: Record<string, unknown>;
  createdAt?: string;
  lastLogin?: string;
  progress?: UserProgressDoc;
  currentMilestone: string;
}

// src/types/courses.ts
export interface Milestone {
  id: string;
  title: string;
  description?: string;
  fields?: Array<{ name: string; label: string; type: 'text' | 'textarea' | 'select' | 'radio' | 'checkbox'; options?: string[] }>;
  order?: number;
}

export interface MilestoneResponse {
  userId: string;
  milestoneId: string;
  responses: Record<string, unknown>;
  status: 'draft' | 'submitted';
  submittedAt?: string;
  updatedAt?: string;
}

export interface UserProgressDoc { // Option A (single doc)
  [milestoneId: string]: {
    completed?: boolean;
    unlocked?: boolean;
    submittedAt?: string;
    unlockedAt?: string;
  };
}

export interface ProgressSummary {
  total: number;
  completed: number;
  currentMilestone: number;
}

export interface ChatMessage {
  userId: string;
  message: string;
  aiResponse: string;
  formFields?: Record<string, unknown>;
  createdAt: string;
}

export interface ChatResponse {
  response: string;
  formFields?: Record<string, unknown>;
}

export interface EmotionNode {
  id: string,
  name: string,
  color?: string,
  level?: number,
  description?: string,
  experience?: string,
  children?: EmotionNode[],
  emoji?: string
}

export interface FeelingsWheelProps {
  selection: boolean;
  selectedEmotion: EmotionNode | null;
  onSelectEmotion: (emotion: EmotionNode) => void;
}

export type Navkey = "overview" | "security";