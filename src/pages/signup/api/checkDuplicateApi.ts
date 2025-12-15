import {apiClient} from '@/src/shared/api/client';
import {CheckDuplicateResponse} from '../model/types';

export const checkEmail = async (
  email: string
): Promise<CheckDuplicateResponse> => {
  return apiClient<CheckDuplicateResponse>(
    `/api/signup/check-email?email=${encodeURIComponent(email)}`
  );
};

export const checkNickname = async (
  nickname: string
): Promise<CheckDuplicateResponse> => {
  return apiClient<CheckDuplicateResponse>(
    `/api/signup/check-nickname?nickname=${encodeURIComponent(nickname)}`
  );
};
