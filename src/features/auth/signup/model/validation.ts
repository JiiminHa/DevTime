export type ValidationResult = {
  text: string;
  type: 'error' | 'success';
};

export const validateEmail = (value: string): ValidationResult => {
  if (!value) return {text: '이메일 형식으로 작성해 주세요', type: 'error'};
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(value))
    return {text: '이메일 형식으로 작성해 주세요', type: 'error'};
  return {text: '', type: 'success'};
};

export const validateNickname = (value: string): ValidationResult => {
  if (!value) return {text: '닉네임을 입력해 주세요', type: 'error'};
  return {text: '', type: 'success'};
};

export const validatePassword = (value: string): ValidationResult => {
  if (!value) return {text: '비밀번호를 입력해 주세요', type: 'error'};
  if (value.length < 8 || !/[A-Za-z]/.test(value) || !/[0-9]/.test(value))
    return {
      text: '비밀번호는 8자 이상, 영문과 숫자 조합이어야 합니다',
      type: 'error',
    };
  return {text: '', type: 'success'};
};

export const validateConfirmPassword = (
  confirmValue: string,
  originalPassword: string
): ValidationResult => {
  if (!confirmValue)
    return {text: '비밀번호를 다시 입력해 주세요', type: 'error'};
  if (confirmValue !== originalPassword)
    return {text: '비밀번호가 일치하지 않습니다', type: 'error'};
  return {text: '', type: 'success'};
};
