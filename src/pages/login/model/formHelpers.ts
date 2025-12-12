import {
  validateEmail,
  validatePassword,
  ValidationResult,
} from '@/shared/lib/validation';

export interface LoginFormData {
  email: string;
  password: string;
}

export interface ValidationMessages {
  email: ValidationResult;
  password: ValidationResult;
}

export function validateAllFields(formData: LoginFormData): ValidationMessages {
  return {
    email: validateEmail(formData.email),
    password: validatePassword(formData.password),
  };
}

export function hasValidationError(messages: ValidationMessages): boolean {
  return !!(messages.email.text || messages.password.text);
}
