export interface CheckDuplicateResponse {
  success: boolean;
  available: boolean;
  message: string;
}

export interface SignupRequest {
  email: string;
  nickname: string;
  password: string;
  confirmPassword: string;
}

export interface SignupResponse {
  success: boolean;
  message: string;
}
