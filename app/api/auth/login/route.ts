import {cookies} from 'next/headers';

export async function POST(request: Request) {
  try {
    const {email, password} = await request.json();
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({email, password}),
    });

    if (!response.ok) {
      const errorData = await response.json();

      return Response.json(
        {success: false, message: errorData.message || '로그인 실패'},
        {status: 401}
      );
    }

    const data = await response.json();
    const cookieStore = await cookies();

    cookieStore.set('accessToken', data.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 15,
    });

    cookieStore.set('refreshToken', data.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7,
    });

    return Response.json({
      success: true,
      isDuplicateLogin: data.isDuplicateLogin,
    });
  } catch (error) {
    console.error('에러 발생:', error);
    return Response.json({success: false, message: '서버 오류'}, {status: 500});
  }
}
