import {apiClient} from '@/shared/api/client';
import type {PresignedUrlRequest, PresignedUrlResponse} from '../model/types';

export const getPresignedUrl = async (file: File) => {
  const response = await apiClient<PresignedUrlResponse, PresignedUrlRequest>(
    '/api/file/presigned-url',
    {
      method: 'POST',
      body: {
        fileName: file.name,
        contentType: file.type,
      },
    }
  );

  return response;
};
