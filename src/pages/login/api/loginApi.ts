import {LoginRequest, LoginResponse} from '../model/types';

export const login = async (data: LoginRequest): Promise<LoginResponse> => {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(data),
  });

  return response.json();
};
