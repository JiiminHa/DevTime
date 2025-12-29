import {cookies} from 'next/headers';

export async function POST() {
  try {
    const cookieStore = await cookies();

    // 백엔드에 로그아웃 요청
    const response = await fetch(`${process.env.API_URL}/api/auth/logout`, {
      method: 'POST',
    });

    const data = await response.json();

    // 쿠키에서 토큰 삭제
    cookieStore.delete('accessToken');
    cookieStore.delete('refreshToken');

    return Response.json({
      success: data.success,
      message: data.message,
    });
  } catch (error) {
    console.error('로그아웃 에러:', error);
    return Response.json(
      {success: false, message: '로그아웃 실패'},
      {status: 500}
    );
  }
}
