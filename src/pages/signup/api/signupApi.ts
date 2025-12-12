import {SignupRequest, SignupResponse} from '../model/types';

export const signup = async (data: SignupRequest): Promise<SignupResponse> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/signup`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }
  );
  return response.json();
};
