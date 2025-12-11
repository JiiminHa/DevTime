import {CheckDuplicateResponse} from '@/entities/user';

export const checkEmail = async (
  email: string
): Promise<CheckDuplicateResponse> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/signup/check-email?email=${encodeURIComponent(email)}`
  );
  const data = await response.json();
  return data;
};

export const checkNickname = async (
  nickname: string
): Promise<CheckDuplicateResponse> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/signup/check-nickname?nickname=${encodeURIComponent(nickname)}`
  );
  const data = await response.json();
  return data;
};
