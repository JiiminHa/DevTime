import {LogoutResponse} from '../model/types';

export const logout = async (): Promise<LogoutResponse> => {
  const response = await fetch('/api/auth/logout', {
    method: 'POST',
  });

  return response.json();
};
