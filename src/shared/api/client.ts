import {refreshToken} from '@/src/pages/login/api';

type FetchOptions<TBody> = {
  headers?: Record<string, string>;
  body?: TBody;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
};

export const apiClient = async <TResponse, TBody = never>(
  endpoint: string,
  options: FetchOptions<TBody> = {},
  isRetry = false
): Promise<TResponse> => {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  const config: RequestInit = {
    method: options.method || 'GET',
    headers,
    credentials: 'include', // 쿠키 포함
  };

  if (options.body) {
    config.body = JSON.stringify(options.body);
  }

  const response = await fetch(endpoint, config);

  // 401 처리
  if (response.status === 401 && !isRetry) {
    try {
      const refreshResult = await refreshToken();

      if (refreshResult.success) {
        // 원래 요청 재시도 (isRetry=true로 무한 루프 방지)
        return apiClient<TResponse, TBody>(endpoint, options, true);
      }
    } catch (error) {
      // refresh 실패 → 로그인 페이지로
      if (typeof window !== 'undefined') {
        window.location.href = '/login';
      }
      throw new Error('인증이 만료되었습니다.');
    }
  }

  if (!response.ok) {
    // 기존 에러 처리 로직...
    throw new Error('API 요청 실패');
  }

  return response.json();
};
