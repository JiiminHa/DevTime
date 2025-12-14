import {
  validateEmail,
  validateNickname,
  validatePassword,
  validateConfirmPassword,
  type ValidationResult,
} from '@/src/shared/form/validation';

export interface SignupFormData {
  email: string;
  nickname: string;
  password: string;
  confirmPassword: string;
  agreeToTerms: boolean;
}

export interface ValidationMessages {
  email: ValidationResult;
  nickname: ValidationResult;
  password: ValidationResult;
  confirmPassword: ValidationResult;
  terms: ValidationResult;
}

export function validateAllFields(
  formData: SignupFormData
): ValidationMessages {
  return {
    email: validateEmail(formData.email),
    nickname: validateNickname(formData.nickname),
    password: validatePassword(formData.password),
    confirmPassword: validateConfirmPassword(
      formData.confirmPassword,
      formData.password
    ),
    terms: formData.agreeToTerms
      ? {text: '', type: 'success'}
      : {text: '약관에 동의해 주세요', type: 'error'},
  };
}

export function hasValidationError(messages: ValidationMessages): boolean {
  return !!(
    messages.email.text ||
    messages.nickname.text ||
    messages.password.text ||
    messages.confirmPassword.text ||
    messages.terms.text
  );
}
