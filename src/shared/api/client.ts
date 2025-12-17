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
    type ErrorPayload = {
      message?: string;
      error?: string | {message?: string};
    };
    let errorData: ErrorPayload;
    try {
      errorData = await response.json();
    } catch {
      errorData = {message: '에러 응답을 처리할 수 없습니다.'};
    }

    // 다양한 에러 응답 형식 처리
    const errorMessage =
      (typeof errorData.error === 'object' && errorData.error.message) ||
      (typeof errorData.error === 'string' && errorData.error) ||
      errorData.message ||
      'API 요청 중 오류가 발생했습니다.';

    console.error('API 에러 응답:', {
      status: response.status,
      statusText: response.statusText,
      errorData,
      errorMessage,
      url: `${baseUrl}${endpoint}`,
    });

    throw new Error(errorMessage);
  }

  // 대부분의 API가 JSON 바디를 돌려준다는 가정.
  // 204(No Content) 같은 특수 케이스는 현재 프로젝트에선 사용하지 않는다고 보고 단순화.
  return response.json();
};
