import {RefreshTokenResponse} from '../model/types';

export const refreshToken = async (): Promise<RefreshTokenResponse> => {
  const response = await fetch('/api/auth/refresh', {
    method: 'POST',
  });

  return response.json();
};
