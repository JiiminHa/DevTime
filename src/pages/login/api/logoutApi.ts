import {LogoutResponse} from '../model/types';

export const logout = async (accessToken: string): Promise<LogoutResponse> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/auth/logout`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  return response.json();
};
