type FetchOptions<TBody> = {
  headers?: Record<string, string>;
  body?: TBody;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
};

export const apiClient = async <TResponse, TBody = never>(
  endpoint: string,
  options: FetchOptions<TBody> = {}
): Promise<TResponse> => {
  const token =
    typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || '';

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const config: RequestInit = {
    method: options.method || 'GET',
    headers,
  };

  if (options.body) {
    config.body = JSON.stringify(options.body);
  }

  const response = await fetch(`${baseUrl}${endpoint}`, config);

  if (!response.ok) {
    const errorData = await response
      .json()
      .catch(() => ({message: '에러 응답을 처리할 수 없습니다.'}));
    throw new Error(errorData.message || 'API 요청 중 오류가 발생했습니다.');
  }

  if (response.status === 204) {
    return Promise.resolve(null as TResponse);
  }

  return response.json();
};
