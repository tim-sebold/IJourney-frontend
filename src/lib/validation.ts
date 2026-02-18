import type { UserProfile } from "./types";
export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

export const validateName = (name: string): string => {
  if (!name) return "Name is required.";
  if (name.length < 6) return "Name must be at least 6 characters long.";
  return "";
}

export const validateEmail = (email: string): string => {
  if (!email) return "Email is required.";
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) return "Please enter a valid email address.";
  return "";
};

export const validatePassword = (password: string): string => {
  if (!password) return "Password is required.";
  if (password.length < 6) return "Password must be at least 6 characters long.";
  if (!/[A-Z]/.test(password)) return "Password must contain an uppercase letter.";
  if (!/[0-9]/.test(password)) return "Password must include a number.";
  return "";
};

export const validateConfirmPassword = (password: string, confirmPassword: string): string => {
  if (!confirmPassword) return "Please confirm your password.";
  if (password !== confirmPassword) return "Passwords do not match.";
  return "";
};

export const validateLoginForm = (email: string, password: string): ValidationResult => {
  const errors: Record<string, string> = {};

  const emailError = validateEmail(email);
  if (emailError) errors.email = emailError;

  const passwordError = validatePassword(password);
  if (passwordError) errors.password = passwordError;

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

export const validateRegisterForm = (
  name: string,
  email: string,
  password: string,
  confirmPassword: string
): ValidationResult => {
  const errors: Record<string, string> = {};

  const nameError = validateName(name);
  if(nameError) errors.name = nameError;

  const emailError = validateEmail(email);
  if (emailError) errors.email = emailError;

  const passwordError = validatePassword(password);
  if (passwordError) errors.password = passwordError;

  const confirmError = validateConfirmPassword(password, confirmPassword);
  if (confirmError) errors.confirmPassword = confirmError;

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

export function validateProfileDraft(draft?: UserProfile | null) {
    const errors: Record<string, string> = {};
    if (!draft) return errors;

    if (!draft.name?.trim()) errors.name = "Name is required.";
    if (!draft.email?.includes("@")) errors.email = "Invalid email.";

    if (draft.displayName && draft.displayName.length > 40) {
        errors.displayName = "Display name must be 40 characters or less.";
    }

    return errors;
}

