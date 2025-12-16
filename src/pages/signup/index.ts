export {SignupPage} from './ui/SignupPage';
export {
  validateEmail,
  validateNickname,
  validatePassword,
  validateConfirmPassword,
  type ValidationResult,
} from '@/shared/form';
export {TERMS_SECTIONS, type TermsSection} from './model/constants';
export type {
  CheckDuplicateResponse,
  SignupRequest,
  SignupResponse,
} from '@/pages/signup/model/types';
