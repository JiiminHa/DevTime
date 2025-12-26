import {apiClient} from '@/shared/api';
import {
  ProfileRequest,
  ProfileResponse,
  ProfileGetResponse,
} from '../model/types';

export const submitProfile = async (
  data: ProfileRequest
): Promise<ProfileResponse> => {
  return apiClient<ProfileResponse, ProfileRequest>('/api/profile', {
    method: 'POST',
    body: data,
  });
};

export const updateProfile = async (
  data: ProfileRequest
): Promise<ProfileResponse> => {
  return apiClient<ProfileResponse, ProfileRequest>('/api/profile', {
    method: 'PUT',
    body: data,
  });
};

export const getProfile = async (): Promise<ProfileGetResponse> => {
  return apiClient<ProfileGetResponse>('/api/profile', {
    method: 'GET',
  });
};
