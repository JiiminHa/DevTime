import {apiClient} from '@/src/shared/api/client';
import {SignupRequest, SignupResponse} from '../model/types';

export const signup = async (data: SignupRequest): Promise<SignupResponse> => {
  return apiClient<SignupResponse, SignupRequest>('/api/signup', {
    method: 'POST',
    body: data,
  });
};
