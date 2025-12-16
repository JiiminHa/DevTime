import {apiClient} from '@/shared/api';
import {LoginRequest, LoginResponse} from '../model/types';

export const login = async (data: LoginRequest): Promise<LoginResponse> => {
  const response = await apiClient<LoginResponse, LoginRequest>(
    '/api/auth/login',
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
