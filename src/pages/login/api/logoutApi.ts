import {apiClient} from '@/shared/api';
import {LogoutResponse} from '../model/types';

export const logout = async (): Promise<LogoutResponse> => {
  const response = await apiClient<LogoutResponse>('/api/auth/logout', {
    method: 'POST',
  });

  localStorage.removeItem('authToken');

  return response;
};
