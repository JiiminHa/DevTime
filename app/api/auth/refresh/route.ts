import {cookies} from 'next/headers';

export async function POST() {
  try {
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get('refreshToken')?.value;

    if (!refreshToken) {
      return Response.json(
        {success: false, message: '인증 정보가 없습니다.'},
        {status: 401}
      );
    }

    // 백엔드에 토큰 갱신 요청
    const response = await fetch(`${process.env.API_URL}/api/auth/refresh`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({refreshToken}),
    });

    if (!response.ok) {
      const errorData = await response.json();

      return Response.json(
        {
          success: false,
          message: errorData.error?.message || '토큰 갱신 실패',
        },
        {status: errorData.error?.statusCode || 500}
      );
    }

    const data = await response.json();

    // 새로운 accessToken을 쿠키에 저장
    cookieStore.set('accessToken', data.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 15, // 15분
    });

    return Response.json({
      success: data.success,
      accessToken: data.accessToken,
    });
  } catch (error) {
    console.error('토큰 갱신 에러:', error);
    return Response.json(
      {success: false, message: '서버 오류'},
      {status: 500}
    );
  }
}