import type { UserProfile } from "./types";
export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

export const validateName = (name: string): string => {
  if (!name) return "Name is required.";
  // Matches the server, which accepts two characters: a six-character minimum
  // turned away anyone called Sam or Maria.
  if (name.trim().length < 2) return "Name must be at least 2 characters long.";
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

/** Mirrors the server's rule; the server is still what decides the code is real. */
export const validateSchoolCode = (schoolCode: string): string => {
  const code = schoolCode.trim().replace(/[\s-]+/g, "");
  if (!code) return "";
  if (!/^[A-Za-z0-9]{4,20}$/.test(code)) return "A school code is 4 to 20 letters and numbers.";
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
  confirmPassword: string,
  schoolCode = ""
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

  const schoolCodeError = validateSchoolCode(schoolCode);
  if (schoolCodeError) errors.schoolCode = schoolCodeError;

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

