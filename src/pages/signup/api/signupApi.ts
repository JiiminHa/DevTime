import {apiClient} from '@/shared/api';
import {SignupRequest, SignupResponse} from '../model/types';

export const signup = async (data: SignupRequest): Promise<SignupResponse> => {
  return apiClient<SignupResponse, SignupRequest>(
    `${process.env.NEXT_PUBLIC_API_URL}/api/signup`,
    {
      method: 'POST',
      body: data,
    }
  );
};
