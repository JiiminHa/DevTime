import {apiClient} from '@/src/shared/api/client';
import {RefreshTokenRequest, RefreshTokenResponse} from '../model/types';

export const refreshToken = async (
  data: RefreshTokenRequest
): Promise<RefreshTokenResponse> => {
  const response = await apiClient<RefreshTokenResponse, RefreshTokenRequest>(
    '/api/auth/refresh',
    {
      method: 'POST',
      body: data,
    }
  );

  if (response.accessToken) {
    localStorage.setItem('authToken', response.accessToken);
  }

  return response;
};
